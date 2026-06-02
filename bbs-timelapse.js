/* OMEGA-wave — buffered overlay time-lapse engine
 * ----------------------------------------------------------------------------
 * Pre-fetches a chosen time range of real provider frames (global Web-Mercator
 * imagery per frame, through the same-origin proxy), keys out no-data, and
 * plays the cached frames back fast with a scrubber. No per-frame network
 * during playback, so the animation is smooth on the 2D map and the 3D globe.
 *
 *  - Works for WMS overlays (one global GetMap per frame) and WMTS overlays
 *    (a low-zoom tile grid assembled per frame).
 *  - The user picks a From/To range AND a step unit (minute/hour/day/week/
 *    month/year), filtered to what the product cadence supports.
 *  - On the 2D map the frame is drawn as repeating world copies, so it tiles
 *    across the antimeridian instead of flipping when the map is panned.
 *  - Controls are embedded in the Master Clock panel (#dto-temporal-control).
 *
 * Loaded as a classic script AFTER portal.js, so it shares portal.js globals.
 */
(function () {
  "use strict";

  const MAX_FRAMES = 180;
  const SPEED_PRESETS = { fast: 80, medium: 140, slow: 260 };
  const PREFETCH_CONCURRENCY = 4;
  const MIN_READY_FRAMES_FOR_PLAYBACK = 3;
  const FRAME_CANVAS_CACHE_LIMIT = 24;
  const WMTS_FRAME_ZOOM = 2; // 4x4 tile grid -> 1024px global overview frame
  const WORLD_BBOX = "-20037508.34,-20037508.34,20037508.34,20037508.34";
  const WORLD_COPY_OFFSETS = [-360, 0, 360]; // image overlays tile across the antimeridian
  const STEP_UNITS = [
    { unit: "minute", label: "Minute", hours: 1 / 60 },
    { unit: "hour", label: "Hour", hours: 1 },
    { unit: "day", label: "Day", hours: 24 },
    { unit: "week", label: "Week", hours: 168 },
    { unit: "month", label: "Month", hours: 730 },
    { unit: "year", label: "Year", hours: 8766 },
  ];
  const frameCanvasCache = new Map();

  function tl() {
    if (!state.timelapse) {
      state.timelapse = {
        layerId: null,
        frames: [],
        index: 0,
        playing: false,
        timer: null,
        speedMs: SPEED_PRESETS.medium,
        stepUnit: "day",
        startTime: null,
        endTime: null,
        buffering: false,
        loaded: 0,
        ready: 0,
        failed: 0,
        cacheHits: 0,
        token: 0,
        imageOverlays: [],
      };
    }
    return state.timelapse;
  }

  function timelapseLayer() {
    const s = tl();
    return s.layerId ? (state.layers || []).find((l) => l.layer_id === s.layerId) : null;
  }

  function layerTimeFormat(layer) {
    return (layer.tags && layer.tags.time_dimension && layer.tags.time_dimension.format) || "ISO8601";
  }

  function layerStepHours(layer) {
    const fmt = layerTimeFormat(layer);
    return fmt === "YYYY-MM-DD" ? 24 : Number(window.layerTimeStepHours(layer)) || 6;
  }

  // Step units that make sense for this product's native cadence.
  function allowedSteps(layer) {
    const nativeHours = layerStepHours(layer);
    const units = STEP_UNITS.filter((s) => s.hours >= nativeHours - 1e-6).map((s) => s.unit);
    return units.length ? units : ["day", "week", "month", "year"];
  }

  function defaultStepUnit(layer) {
    const allowed = allowedSteps(layer);
    // Default to weekly steps so an animation spans a long window, not days.
    if (allowed.indexOf("week") !== -1) return "week";
    if (allowed.indexOf("day") !== -1) return "day";
    return allowed[0];
  }

  function maxFramesForLayer(layer) {
    const raw = Number(layer && layer.tags && layer.tags.animation_frame_count);
    if (Number.isFinite(raw) && raw >= 2) {
      return Math.max(2, Math.min(MAX_FRAMES, Math.round(raw)));
    }
    return MAX_FRAMES;
  }

  // Advance a date by n steps of the given unit (UTC, calendar-correct).
  function addStep(date, unit, n) {
    const d = new Date(date.getTime());
    if (unit === "minute") d.setUTCMinutes(d.getUTCMinutes() + n);
    else if (unit === "hour") d.setUTCHours(d.getUTCHours() + n);
    else if (unit === "day") d.setUTCDate(d.getUTCDate() + n);
    else if (unit === "week") d.setUTCDate(d.getUTCDate() + 7 * n);
    else if (unit === "month") d.setUTCMonth(d.getUTCMonth() + n);
    else if (unit === "year") d.setUTCFullYear(d.getUTCFullYear() + n);
    return d;
  }

  // Default [from, to]: the full practical data span — MAX_FRAMES steps of
  // `stepUnit` ending at the latest data (weekly steps -> a multi-year sweep).
  function defaultRange(layer, stepUnit) {
    const fmt = layerTimeFormat(layer);
    const lagRaw = layer.tags && layer.tags.default_lag_hours;
    const lagHours = Number(lagRaw != null ? lagRaw : fmt === "YYYY-MM-DD" ? 24 : 0) || 0;
    const end = window.alignDateToStepHours(new Date(Date.now() - lagHours * 3600000), layerStepHours(layer));
    const start = addStep(end, stepUnit, -(maxFramesForLayer(layer) - 1));
    return { startMs: start.getTime(), endMs: end.getTime() };
  }

  // Frame times stepping `stepUnit` across [startTime, endTime] (capped/deduped).
  function frameTimes(layer, opts) {
    const fmt = layerTimeFormat(layer);
    const stepUnit = (opts && opts.stepUnit) || defaultStepUnit(layer);
    let startMs = opts && opts.startTime ? new Date(opts.startTime).getTime() : NaN;
    let endMs = opts && opts.endTime ? new Date(opts.endTime).getTime() : NaN;
    if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs <= startMs) {
      const range = defaultRange(layer, stepUnit);
      startMs = range.startMs;
      endMs = range.endMs;
    }
    const stamps = [];
    let cursor = new Date(startMs);
    let guard = 0;
    while (cursor.getTime() <= endMs && guard < 6000) {
      stamps.push(cursor.getTime());
      cursor = addStep(cursor, stepUnit, 1);
      guard += 1;
    }
    if (!stamps.length || stamps[stamps.length - 1] < endMs) stamps.push(endMs);
    // Cap the buffer size by evenly decimating very long ranges.
    const maxFrames = maxFramesForLayer(layer);
    let picked = stamps;
    if (stamps.length > maxFrames) {
      picked = [];
      for (let i = 0; i < maxFrames; i += 1) {
        picked.push(stamps[Math.round((i * (stamps.length - 1)) / (maxFrames - 1))]);
      }
    }
    const out = [];
    for (const ms of picked) {
      const formatted = window.formatLayerFrameTime(new Date(ms), fmt);
      if (formatted && out.indexOf(formatted) === -1) out.push(formatted);
    }
    return { times: out, startMs: startMs, endMs: endMs, stepUnit: stepUnit };
  }

  function isoDate(ms) {
    return new Date(ms).toISOString().slice(0, 10);
  }

  // --- frame imagery -------------------------------------------------------

  function blobToImage(blob) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("frame decode failed"));
      };
      img.src = url;
    });
  }

  function wmsFrameUrl(layer, time) {
    const query = new URLSearchParams({
      crs: "EPSG:3857",
      bbox: WORLD_BBOX,
      width: "1024",
      height: "1024",
      styles: "",
    });
    if (time) query.set("time", time);
    return "/v1/map/layers/" + encodeURIComponent(layer.layer_id) + "/proxy?" + query.toString();
  }

  function wmtsTileUrl(layer, time, zoom, x, y) {
    const query = new URLSearchParams({ z: String(zoom), x: String(x), y: String(y), optional: "1" });
    if (time) query.set("TIME", time);
    return "/v1/map/layers/" + encodeURIComponent(layer.layer_id) + "/proxy?" + query.toString();
  }

  // Returns a global Web-Mercator canvas for one frame, no-data keyed out.
  async function fetchFrameCanvas(layer, time, token) {
    const s = tl();
    if (layer.source_type === "wmts") {
      const tileCount = 1 << WMTS_FRAME_ZOOM;
      const tileSize = 256;
      const canvas = document.createElement("canvas");
      canvas.width = tileCount * tileSize;
      canvas.height = tileCount * tileSize;
      const ctx = canvas.getContext("2d");
      let drew = false;
      const jobs = [];
      for (let x = 0; x < tileCount; x += 1) {
        for (let y = 0; y < tileCount; y += 1) {
          const px = x * tileSize;
          const py = y * tileSize;
          jobs.push(
            fetch(wmtsTileUrl(layer, time, WMTS_FRAME_ZOOM, x, y), { cache: "force-cache" })
              .then((resp) => (resp.ok ? resp.blob() : null))
              .then((blob) => (blob ? blobToImage(blob) : null))
              .then((img) => {
                if (img && (img.naturalWidth || img.width || 0) > 2) {
                  ctx.drawImage(img, px, py, tileSize, tileSize);
                  drew = true;
                }
              })
              .catch(() => null)
          );
        }
      }
      await Promise.all(jobs);
      if (s.token !== token || !drew) return null;
      return window._rasterImageWithoutNoData(canvas);
    }
    const resp = await fetch(wmsFrameUrl(layer, time), { cache: "force-cache" });
    if (!resp.ok) return null;
    const img = await blobToImage(await resp.blob());
    if (s.token !== token || (img.naturalWidth || img.width || 0) <= 2) return null;
    return window._rasterImageWithoutNoData(img);
  }

  function canvasToObjectUrl(canvas) {
    return new Promise((resolve) => {
      try {
        canvas.toBlob((blob) => resolve(blob ? URL.createObjectURL(blob) : null), "image/png");
      } catch (_err) {
        resolve(null);
      }
    });
  }

  function frameCacheKey(layer, time) {
    const entry = window.layerCatalogActiveEntry ? window.layerCatalogActiveEntry(layer.layer_id) : null;
    const params = (entry && entry.params) || {};
    return JSON.stringify([
      layer.layer_id,
      layer.source_type,
      time || "",
      params.depth || "",
      params.palette || "",
      params.color_min || "",
      params.color_max || "",
      layer.source && layer.source.layer || "",
      layer.source && layer.source.layers || "",
    ]);
  }

  function cachedFrameCanvas(layer, time) {
    const key = frameCacheKey(layer, time);
    const cached = frameCanvasCache.get(key);
    if (!cached) return null;
    frameCanvasCache.delete(key);
    frameCanvasCache.set(key, cached);
    return cached.canvas || null;
  }

  function rememberFrameCanvas(layer, time, canvas) {
    if (!canvas) return;
    const key = frameCacheKey(layer, time);
    frameCanvasCache.delete(key);
    frameCanvasCache.set(key, { canvas: canvas, cachedAt: Date.now() });
    while (frameCanvasCache.size > FRAME_CANVAS_CACHE_LIMIT) {
      const oldest = frameCanvasCache.keys().next().value;
      frameCanvasCache.delete(oldest);
    }
  }

  function prioritizedFrameIndexes(length, startIndex) {
    if (!length) return [];
    const start = Math.max(0, Math.min(length - 1, Number(startIndex) || 0));
    const indexes = [start];
    for (let distance = 1; indexes.length < length && distance < length; distance += 1) {
      const before = start - distance;
      const after = start + distance;
      if (before >= 0) indexes.push(before);
      if (after < length) indexes.push(after);
    }
    return indexes;
  }

  function readyFrameCount(s) {
    return (s.frames || []).filter((frame) => frame && frame.canvas).length;
  }

  function maybeStartPlayback(token) {
    const s = tl();
    if (s.token !== token || s.playing || !s.buffering) return;
    const ready = readyFrameCount(s);
    if (ready >= Math.min(MIN_READY_FRAMES_FOR_PLAYBACK, s.frames.length)) {
      play();
      if (typeof setStatus === "function") {
        const layer = timelapseLayer();
        setStatus((layer ? layer.name : "Overlay") + " playback started while the remaining frames continue buffering.");
      }
    }
  }

  async function prefetch(token) {
    const s = tl();
    const layer = timelapseLayer();
    if (!layer) return;
    const queue = prioritizedFrameIndexes(s.frames.length, s.index);
    let cursor = 0;
    const worker = async () => {
      while (cursor < queue.length) {
        const i = queue[cursor];
        cursor += 1;
        if (s.token !== token) return;
        const frame = s.frames[i];
        try {
          const cached = cachedFrameCanvas(layer, frame.time);
          const canvas = cached || await fetchFrameCanvas(layer, frame.time, token);
          if (s.token !== token) return;
          if (canvas) {
            frame.canvas = canvas;
            frame.url = await canvasToObjectUrl(canvas);
            frame.fromCache = Boolean(cached);
            if (!cached) rememberFrameCanvas(layer, frame.time, canvas);
            s.ready += 1;
            if (cached) s.cacheHits += 1;
          } else {
            frame.failed = true;
            s.failed += 1;
          }
        } catch (_err) {
          frame.failed = true;
          s.failed += 1;
        }
        if (s.token !== token) return;
        s.loaded += 1;
        // During buffering, surface the most-recently-loaded frame so the
        // overlay shows the moment the first frame is ready instead of
        // staying blank until the final frame arrives. As later frames buffer
        // they replace what's shown, walking the timeline forward.
        if (frame.canvas && !s.playing && (s.bestLoadedIndex === undefined || i > s.bestLoadedIndex)) {
          s.bestLoadedIndex = i;
          s.index = i;
          renderFrame();
        }
        renderControls();
        maybeStartPlayback(token);
      }
    };
    const workers = [];
    for (let w = 0; w < PREFETCH_CONCURRENCY; w += 1) workers.push(worker());
    await Promise.all(workers);
    if (s.token !== token) return;
    s.buffering = false;
    renderControls();
    if (!s.playing) {
      play();
    }
  }

  // --- rendering -----------------------------------------------------------

  function currentFrame() {
    const s = tl();
    return s.frames[s.index] || null;
  }

  // Used by the 3D globe raster path (portal.js buildGlobeRasterTexture hook).
  function activeCanvasFor(layerId) {
    const s = tl();
    if (!s.layerId || s.layerId !== layerId) return null;
    const frame = currentFrame();
    return frame && frame.canvas ? frame.canvas : null;
  }

  function renderFrame() {
    const s = tl();
    const frame = currentFrame();
    const entry = window.layerCatalogActiveEntry(s.layerId);
    const opacity = Number((entry && entry.opacity) ?? 0.72);
    if (frame && frame.url) {
      for (const overlay of s.imageOverlays) {
        overlay.setUrl(frame.url);
        overlay.setOpacity(opacity);
      }
    }
    if (entry) {
      entry.animation = entry.animation || {};
      entry.animation.mode = "timelapse";
      entry.animation.playing = s.playing;
      entry.animation.frames = s.frames.map((f) => f.time);
      entry.animation.index = s.index;
      entry.animation.timer = null;
    }
    if (state.mapView === "3d" && typeof renderGlobeScene === "function") {
      renderGlobeScene();
    }
  }

  // --- playback ------------------------------------------------------------

  function play() {
    const s = tl();
    if (s.timer) clearInterval(s.timer);
    s.playing = true;
    s.timer = setInterval(() => {
      const st = tl();
      if (!st.playing || !st.frames.length) return;
      let next = st.index;
      for (let step = 0; step < st.frames.length; step += 1) {
        next = (next + 1) % st.frames.length;
        if (st.frames[next] && st.frames[next].canvas) break;
      }
      st.index = next;
      renderFrame();
      renderControls();
    }, s.speedMs);
    renderControls();
  }

  function pause() {
    const s = tl();
    s.playing = false;
    if (s.timer) {
      clearInterval(s.timer);
      s.timer = null;
    }
    renderFrame();
    renderControls();
  }

  function toggle() {
    tl().playing ? pause() : play();
  }

  function scrubTo(index) {
    const s = tl();
    if (!s.frames.length) return;
    s.index = Math.max(0, Math.min(s.frames.length - 1, index | 0));
    renderFrame();
    renderControls();
  }

  // --- lifecycle -----------------------------------------------------------

  function start(layerId, opts) {
    const layer = (state.layers || []).find((l) => l.layer_id === layerId);
    if (!layer || !layer.tags || !layer.tags.time_dimension) {
      if (typeof setStatus === "function") setStatus("Time-lapse needs a time-aware overlay.");
      return false;
    }
    if (layer.source_type !== "wms" && layer.source_type !== "wmts") {
      if (typeof setStatus === "function") {
        setStatus(layer.name + " is not a raster overlay — time-lapse buffers WMS/WMTS layers.");
      }
      return false;
    }
    stop();
    const s = tl();
    s.layerId = layerId;
    s.token += 1;
    const requestedStep = (opts && opts.stepUnit) || defaultStepUnit(layer);
    const built = frameTimes(layer, {
      stepUnit: requestedStep,
      startTime: opts && opts.startTime,
      endTime: opts && opts.endTime,
    });
    s.stepUnit = built.stepUnit;
    s.startTime = built.startMs;
    s.endTime = built.endMs;
    s.frames = built.times.map((time) => ({ time: time, canvas: null, url: null }));
    s.index = Math.max(0, s.frames.length - 1);
    s.loaded = 0;
    s.ready = 0;
    s.failed = 0;
    s.cacheHits = 0;
    s.bestLoadedIndex = -1;
    s.buffering = true;
    s.playing = false;
    const entry = window.layerCatalogActiveEntry(layerId);
    if (entry && typeof stopLayerAnimation === "function") {
      try { stopLayerAnimation(layerId); } catch (_err) {}
    }
    if (state.map) {
      if (entry && entry.leafletLayer && state.map.hasLayer(entry.leafletLayer)) {
        try { entry.leafletLayer.remove(); } catch (_err) {}
      }
      if (!s.imageOverlays.length) {
        s.imageOverlays = WORLD_COPY_OFFSETS.map((offset) =>
          L.imageOverlay("", [[-85.05112878, -180 + offset], [85.05112878, 180 + offset]], {
            opacity: Number((entry && entry.opacity) ?? 0.72),
            interactive: false,
            className: "timelapse-image-overlay",
          })
        );
      }
      if (state.mapView !== "3d") {
        for (const overlay of s.imageOverlays) {
          try { overlay.addTo(state.map); } catch (_err) {}
        }
      }
    }
    ensureControls();
    populateStepSelect(layer);
    showControls();
    renderControls();
    if (typeof setStatus === "function") {
      setStatus("Buffering " + s.frames.length + " frames of " + layer.name + "…");
    }
    prefetch(s.token).then(() => {
      if (tl().token !== s.token) return;
      if (!tl().playing) play();
    });
    return true;
  }

  function stop() {
    const s = tl();
    const hadLayer = s.layerId;
    if (s.timer) {
      clearInterval(s.timer);
      s.timer = null;
    }
    s.playing = false;
    s.token += 1;
    for (const overlay of s.imageOverlays || []) {
      if (state.map && state.map.hasLayer(overlay)) {
        try { overlay.remove(); } catch (_err) {}
      }
    }
    if (hadLayer && state.map) {
      const entry = window.layerCatalogActiveEntry(hadLayer);
      if (entry && entry.leafletLayer && !state.map.hasLayer(entry.leafletLayer) && state.mapView !== "3d") {
        try { entry.leafletLayer.addTo(state.map); } catch (_err) {}
      }
      if (entry && entry.animation && entry.animation.mode === "timelapse") {
        entry.animation = { playing: false, frames: entry.animation.frames || [], index: 0, timer: null };
      }
    }
    for (const frame of s.frames) {
      if (frame.url) {
        try { URL.revokeObjectURL(frame.url); } catch (_err) {}
      }
    }
    s.layerId = null;
    s.frames = [];
    s.index = 0;
    s.buffering = false;
    s.loaded = 0;
    s.ready = 0;
    s.failed = 0;
    s.cacheHits = 0;
    hideControls();
    if (hadLayer && state.mapView === "3d" && typeof renderGlobeScene === "function") {
      renderGlobeScene();
    }
  }

  function restartWith(opts) {
    const s = tl();
    if (!s.layerId) return;
    start(s.layerId, Object.assign({ stepUnit: s.stepUnit, startTime: s.startTime, endTime: s.endTime }, opts || {}));
  }

  function setSpeed(ms) {
    const s = tl();
    s.speedMs = Math.max(40, Math.min(800, ms | 0));
    if (s.playing) play();
    renderControls();
  }

  // --- controls UI (folded into the overlay context panel) ----------------

  function injectStyles() {
    if (document.getElementById("timelapse-styles")) return;
    const style = document.createElement("style");
    style.id = "timelapse-styles";
    style.textContent = [
      "#timelapse-controls{display:flex;flex-direction:column;gap:7px;margin-top:9px;",
      "padding-top:9px;border-top:1px solid rgba(125,211,252,0.22);}",
      "#timelapse-controls[hidden]{display:none;}",
      "#timelapse-controls .tl-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:0.72rem;",
      "color:rgba(218,234,240,0.92);}",
      "#timelapse-controls button{cursor:pointer;border-radius:8px;border:1px solid rgba(125,211,252,0.4);",
      "background:rgba(125,211,252,0.16);color:inherit;padding:5px 10px;font-size:0.72rem;}",
      "#timelapse-controls button.is-primary{background:rgba(125,211,252,0.34);border-color:rgba(125,211,252,0.62);}",
      "#timelapse-controls .tl-scrub{flex:1;min-width:120px;accent-color:#7dd3fc;}",
      "#timelapse-controls .tl-time{font-family:'IBM Plex Mono',monospace;min-width:104px;text-align:center;",
      "color:#7dd3fc;}",
      "#timelapse-controls label{display:flex;align-items:center;gap:4px;color:rgba(125,211,252,0.9);white-space:nowrap;}",
      "#timelapse-controls input,#timelapse-controls select{background:rgba(7,18,24,0.92);color:rgba(218,234,240,0.95);",
      "border:1px solid rgba(125,211,252,0.32);border-radius:6px;padding:3px 5px;font-size:0.7rem;}",
      "#timelapse-controls .tl-progress{flex:0 0 64px;height:3px;border-radius:2px;",
      "background:rgba(125,211,252,0.18);overflow:hidden;}",
      "#timelapse-controls .tl-progress>span{display:block;height:100%;width:0%;background:#7dd3fc;}",
      "#timelapse-controls .tl-status{color:rgba(218,234,240,0.6);font-size:0.65rem;}",
      "#timelapse-controls .tl-frame-count{font-family:'IBM Plex Mono',monospace;font-size:0.65rem;",
      "color:rgba(218,234,240,0.55);min-width:54px;text-align:center;letter-spacing:0.04em;}",
      "#timelapse-controls .tl-icon-btn{padding:3px 8px;font-size:0.72rem;line-height:1;}",
      "#timelapse-controls .tl-icon-btn.is-active{background:rgba(125,211,252,0.32);}",
      "#timelapse-controls .tl-settings-row[hidden]{display:none;}",
    ].join("");
    document.head.appendChild(style);
  }

  function ensureControls() {
    injectStyles();
    let host = document.getElementById("timelapse-controls");
    if (host) return host;
    // Home the controls in the observe time bar so they replace the master
    // clock while an animation runs (falls back to the context panel).
    const panel = document.getElementById("observe-time-bar") || document.getElementById("context-panel") || document.getElementById("map-stage") || document.body;
    host = document.createElement("div");
    host.id = "timelapse-controls";
    host.hidden = true;
    // Single-row timelapse strip. Common controls are visible
    // (play/pause, scrub, date label, frame counter); the secondary
    // settings (From / To / Step / Speed / status) hide inside a
    // "⚙ Settings" popover so the strip stays compact.
    host.innerHTML = [
      '<div class="tl-row">',
      '<button type="button" id="tl-play" class="is-primary" title="Play / pause time-lapse">▶ Play</button>',
      '<input type="range" class="tl-scrub" id="tl-scrub" min="0" max="0" value="0" step="1" aria-label="Scrub" />',
      '<span class="tl-time" id="tl-time" title="Current frame date">—</span>',
      '<span class="tl-frame-count" id="tl-frame-count" title="Frame buffer progress">—/—</span>',
      '<div class="tl-progress" id="tl-progress" title="Buffering"><span></span></div>',
      '<button type="button" id="tl-settings-toggle" class="tl-icon-btn" title="Range / Step / Speed">⚙</button>',
      '<button type="button" id="tl-close" class="tl-icon-btn" title="Close time-lapse">✕</button>',
      "</div>",
      '<div class="tl-row tl-settings-row" id="tl-settings-row" hidden>',
      '<label>From <input type="date" id="tl-from" /></label>',
      '<label>To <input type="date" id="tl-to" /></label>',
      '<label>Step <select id="tl-step"></select></label>',
      '<label>Speed <select id="tl-speed">' +
        '<option value="' + SPEED_PRESETS.fast + '">Fast</option>' +
        '<option value="' + SPEED_PRESETS.medium + '">Medium</option>' +
        '<option value="' + SPEED_PRESETS.slow + '">Slow</option></select></label>',
      '<span class="tl-status" id="tl-status"></span>',
      "</div>",
    ].join("");
    panel.appendChild(host);
    host.querySelector("#tl-play").addEventListener("click", toggle);
    host.querySelector("#tl-close").addEventListener("click", stop);
    host.querySelector("#tl-scrub").addEventListener("input", (event) => {
      pause();
      scrubTo(Number(event.target.value));
    });
    host.querySelector("#tl-step").addEventListener("change", (event) => {
      restartWith({ stepUnit: event.target.value });
    });
    host.querySelector("#tl-speed").addEventListener("change", (event) => {
      setSpeed(Number(event.target.value));
    });
    const onRange = () => {
      const from = host.querySelector("#tl-from").value;
      const to = host.querySelector("#tl-to").value;
      if (from && to && new Date(from).getTime() < new Date(to).getTime()) {
        restartWith({ startTime: from + "T00:00:00Z", endTime: to + "T00:00:00Z" });
      }
    };
    host.querySelector("#tl-from").addEventListener("change", onRange);
    host.querySelector("#tl-to").addEventListener("change", onRange);
    // Toggle the settings row open/closed
    host.querySelector("#tl-settings-toggle").addEventListener("click", () => {
      const row = host.querySelector("#tl-settings-row");
      const btn = host.querySelector("#tl-settings-toggle");
      const open = row.hidden;
      row.hidden = !open;
      btn.classList.toggle("is-active", open);
    });
    return host;
  }

  function populateStepSelect(layer) {
    const select = document.getElementById("tl-step");
    if (!select) return;
    const allowed = allowedSteps(layer);
    select.innerHTML = STEP_UNITS.filter((s) => allowed.indexOf(s.unit) !== -1)
      .map((s) => '<option value="' + s.unit + '">' + s.label + '</option>')
      .join("");
  }

  function showControls() {
    ensureControls().hidden = false;
    // Swap the observe time bar into animation mode (hides the master clock).
    document.body.classList.add("timeline-animating");
  }

  function hideControls() {
    const host = document.getElementById("timelapse-controls");
    if (host) host.hidden = true;
    document.body.classList.remove("timeline-animating");
  }

  function renderControls() {
    const host = document.getElementById("timelapse-controls");
    if (!host || host.hidden) return;
    const s = tl();
    const layer = timelapseLayer();
    const frame = currentFrame();
    const set = (sel, fn) => {
      const el = host.querySelector(sel);
      if (el && document.activeElement !== el) fn(el);
    };
    set("#tl-play", (el) => { el.textContent = s.playing ? "⏸ Pause" : "▶ Play"; });
    set("#tl-scrub", (el) => {
      el.max = String(Math.max(0, s.frames.length - 1));
      el.value = String(s.index);
    });
    set("#tl-time", (el) => { el.textContent = frame ? frame.time : "—"; });
    set("#tl-step", (el) => { el.value = s.stepUnit; });
    set("#tl-speed", (el) => { el.value = String(s.speedMs); });
    set("#tl-from", (el) => { if (s.startTime) el.value = isoDate(s.startTime); });
    set("#tl-to", (el) => { if (s.endTime) el.value = isoDate(s.endTime); });
    const progress = host.querySelector("#tl-progress > span");
    if (progress) {
      const pct = s.frames.length ? Math.round((readyFrameCount(s) / s.frames.length) * 100) : 0;
      progress.style.width = pct + "%";
    }
    set("#tl-status", (el) => {
      const ready = readyFrameCount(s);
      const cacheText = s.cacheHits ? " | cached " + s.cacheHits : "";
      const failedText = s.failed ? " | skipped " + s.failed : "";
      el.textContent = s.buffering
        ? "Buffering " + ready + "/" + s.frames.length + " ready" + cacheText + failedText + " | " + (layer ? layer.name : "")
        : (layer ? layer.name : "") + " | " + ready + "/" + s.frames.length + " frames / " + s.stepUnit + cacheText + failedText;
    });
    // Compact frame counter in the main row: "ready/total"
    set("#tl-frame-count", (el) => {
      const ready = readyFrameCount(s);
      el.textContent = `${ready}/${s.frames.length}`;
      el.title = layer
        ? `${layer.name} — ${ready}/${s.frames.length} frames (${s.stepUnit}-step)`
        : `${ready}/${s.frames.length} frames`;
    });
  }

  // --- exports for portal.js -----------------------------------------------

  injectStyles();
  window.startTimelapse = start;
  window.stopTimelapse = stop;
  window.toggleTimelapseForLayer = function (layerId) {
    const s = tl();
    if (s.layerId === layerId) {
      stop();
      return false;
    }
    return start(layerId);
  };
  window.timelapseActiveCanvasFor = activeCanvasFor;
  window.timelapseIsActive = function (layerId) {
    const s = tl();
    return Boolean(s.layerId) && (layerId === undefined || s.layerId === layerId);
  };
  window.timelapseFrameCacheStats = function () {
    const s = tl();
    return {
      cache_size: frameCanvasCache.size,
      cache_limit: FRAME_CANVAS_CACHE_LIMIT,
      layer_id: s.layerId,
      max_frames: timelapseLayer() ? maxFramesForLayer(timelapseLayer()) : MAX_FRAMES,
      buffering: s.buffering,
      playing: s.playing,
      loaded: s.loaded,
      ready: readyFrameCount(s),
      failed: s.failed || 0,
      cache_hits: s.cacheHits || 0,
      frame_count: (s.frames || []).length,
      current_index: s.index,
    };
  };
})();
