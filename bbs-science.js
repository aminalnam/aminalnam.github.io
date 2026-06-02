/* ----- Scientific Analysis & Visualization Tools ----- */

function scienceCatalogUnit(metricName, fallback = "") {
  return (state.catalogMetrics.find((metric) => metric.metric_name === metricName) || {}).unit || fallback || "";
}

function scienceDurationLabel(seconds) {
  const value = Number(seconds);
  if (!Number.isFinite(value) || value <= 0) {
    return "-";
  }
  if (value >= 86400) {
    return `${(value / 86400).toFixed(2).replace(/\.?0+$/, "")} d`;
  }
  if (value >= 3600) {
    return `${(value / 3600).toFixed(2).replace(/\.?0+$/, "")} h`;
  }
  return `${value.toFixed(value >= 10 ? 0 : 2).replace(/\.?0+$/, "")} s`;
}

function latestMetricValue(items, names) {
  const wanted = new Set(names);
  const match = (items || []).find((item) => wanted.has(item.metric_name));
  const value = match?.value;
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

/* Fetches tidal constituent analysis for one device + metric. */
async function loadVisualizationTidalAnalysis(deviceKey, metricName, rangeHours) {
  const cacheKey = `tidal::${deviceKey}::${metricName}::${rangeHours}`;
  state.vizSeriesCache = state.vizSeriesCache || {};
  const cached = state.vizSeriesCache[cacheKey];
  if (cached) return cached;

  const { node_id, device_id } = vizSplitDeviceKey(deviceKey);
  const params = { node_id, device_id, metric_name: metricName, data_scope: activeDataScope() };
  const startAt = vizRangeStartParam(rangeHours);
  if (startAt) params.start_at = startAt;

  const payload = await api("/v1/measurements/tidal-analysis", params);
  state.vizSeriesCache[cacheKey] = payload;
  return payload;
}

async function collectTidalAnalysisRows() {
  if (!state.vizDeviceKey || !state.vizMetric) return [];
  const payload = await loadVisualizationTidalAnalysis(state.vizDeviceKey, state.vizMetric, state.vizRangeHours);
  const label = vizDeviceLabel(vizDeviceByKey(state.vizDeviceKey));
  const unit = payload.unit || scienceCatalogUnit(state.vizMetric);
  return (payload.constituents || []).map((item) => ({
    visualization: "tidal-analysis",
    station: label,
    metric_name: state.vizMetric,
    constituent: item.name,
    amplitude: item.amplitude,
    value: item.amplitude,
    unit,
    phase_deg: item.phase_deg,
    period_hours: item.period_hours,
    mean_level: payload.mean_level,
    sample_count: payload.sample_count,
    duration_hours: payload.duration_hours,
  }));
}

/* Fetches tidal prediction based on analysis. */
async function loadVisualizationTidalPrediction(deviceKey, metricName, rangeHours) {
  const cacheKey = `tidal-pred::${deviceKey}::${metricName}::${rangeHours}`;
  state.vizSeriesCache = state.vizSeriesCache || {};
  const cached = state.vizSeriesCache[cacheKey];
  if (cached) return cached;

  const { node_id, device_id } = vizSplitDeviceKey(deviceKey);
  const params = { node_id, device_id, metric_name: metricName, data_scope: activeDataScope(), hours: 48 };
  const startAt = vizRangeStartParam(rangeHours);
  if (startAt) params.start_at = startAt;

  const payload = await api("/v1/measurements/tidal-prediction", params);
  state.vizSeriesCache[cacheKey] = payload;
  return payload;
}

/* Fetches wave spectral analysis for one device + metric. */
async function loadVisualizationWaveSpectrum(deviceKey, metricName, rangeHours) {
  const cacheKey = `wave-spectrum::${deviceKey}::${metricName}::${rangeHours}`;
  state.vizSeriesCache = state.vizSeriesCache || {};
  const cached = state.vizSeriesCache[cacheKey];
  if (cached) return cached;

  const { node_id, device_id } = vizSplitDeviceKey(deviceKey);
  const params = { node_id, device_id, metric_name: metricName, data_scope: activeDataScope() };
  const startAt = vizRangeStartParam(rangeHours);
  if (startAt) params.start_at = startAt;

  const payload = await api("/v1/measurements/wave-spectrum", params);
  state.vizSeriesCache[cacheKey] = payload;
  return payload;
}

async function collectWaveSpectrumRows() {
  if (!state.vizDeviceKey || !state.vizMetric) return [];
  const payload = await loadVisualizationWaveSpectrum(state.vizDeviceKey, state.vizMetric, state.vizRangeHours);
  const label = vizDeviceLabel(vizDeviceByKey(state.vizDeviceKey));
  const unit = payload.unit || scienceCatalogUnit(state.vizMetric);
  const bins = Array.isArray(payload.spectrum) ? payload.spectrum : [];
  if (!bins.length) {
    return [
      {
        visualization: "wave-spectrum",
        station: label,
        metric_name: state.vizMetric,
        value: payload.significant_wave_height,
        unit,
        significant_wave_height: payload.significant_wave_height,
        zero_crossings: payload.zero_crossings,
        sample_count: payload.sample_count,
      },
    ];
  }
  return bins.map((bin) => ({
    visualization: "wave-spectrum",
    station: label,
    metric_name: state.vizMetric,
    frequency_hz: bin.frequency_hz,
    frequency_cph: bin.frequency_cph,
    period_seconds: bin.period_seconds,
    power: bin.power,
    value: bin.power,
    unit: "relative power",
    source_unit: unit,
    significant_wave_height: payload.significant_wave_height,
    zero_crossings: payload.zero_crossings,
    zero_crossing_period_seconds: payload.zero_crossing_period_seconds,
    dominant_frequency_hz: payload.dominant_frequency_hz,
    dominant_period_seconds: payload.dominant_period_seconds,
    dominant_power: payload.dominant_power,
    sample_count: payload.sample_count,
    sample_interval_seconds: payload.sample_interval_seconds,
    transform_size: payload.transform_size,
  }));
}

/* Fetches seawater properties for the latest device readings. */
async function collectSeawaterPropertiesRows() {
  if (!state.vizDeviceKey) return [];
  const { node_id, device_id } = vizSplitDeviceKey(state.vizDeviceKey);
  const latest = await loadVisualizationLatest({ node_id, device_id });
  const label = vizDeviceLabel(vizDeviceByKey(state.vizDeviceKey));

  const salinity = latestMetricValue(latest, ["salinity", "psal", "sea-water-salinity"]);
  const temperature = latestMetricValue(latest, ["temperature", "water-temperature", "sea-water-temperature", "temp"]);
  const conductivity = latestMetricValue(latest, ["conductivity", "specific-conductance"]);
  const depth = latestMetricValue(latest, ["depth", "bathymetry-depth", "water-depth"]) || 0;

  if (temperature === undefined || (salinity === undefined && conductivity === undefined)) {
    return [];
  }

  const params = { temperature, pressure: Math.max(0, depth) };
  if (salinity !== undefined) params.salinity = salinity;
  if (conductivity !== undefined) params.conductivity = conductivity;

  const payload = await api("/v1/measurements/seawater-calculator", params);
  return [
    {
      visualization: "seawater-properties",
      station: label,
      metric_name: "seawater-properties",
      value: payload.density_kg_m3,
      unit: "kg/m3",
      density: payload.density_kg_m3,
      salinity: payload.salinity_psu ?? salinity,
      sigma_t: payload.sigma_t,
      input_temp: temperature,
      input_depth: depth,
      input_conductivity: conductivity,
    },
  ];
}

function drawTidalAnalysisVisualization(rows, token) {
  const device = vizDeviceByKey(state.vizDeviceKey);
  const deviceName = device ? vizDeviceLabel(device) : "the selected device";
  if (!rows.length) {
    setChartEmpty("visualization-canvas", `No tidal constituents found for ${deviceName}.`);
    return;
  }

  const target = $("visualization-canvas");
  if (!target) return;

  target.classList.remove("empty");
  target.innerHTML = `
    <div class="viz-dashboard">
      <div id="viz-tidal-bars" class="viz-dash-item"></div>
      <div id="viz-tidal-prediction" class="viz-dash-item"></div>
    </div>
  `;

  const unit = rows[0]?.unit || scienceCatalogUnit(state.vizMetric, "m");
  const bars = rows.map((row) => ({
    label: row.constituent,
    value: row.amplitude,
    unit,
    note: `${Number(row.phase_deg).toFixed(1)} deg phase, ${Number(row.period_hours).toFixed(2)} h`,
  }));

  renderMiniBarChart(
    "viz-tidal-bars",
    `Constituent amplitudes`,
    `${rows[0].sample_count || rows.length} samples over ${Number(rows[0].duration_hours || 0).toFixed(1)} h.`,
    bars,
    {
      badge: "Harmonics",
      valueFormatter: (value, row) => formatValue(value, row.unit || unit),
    }
  );

  const request = {
    deviceKey: state.vizDeviceKey,
    metric: state.vizMetric,
    rangeHours: state.vizRangeHours,
  };
  const predTarget = $("viz-tidal-prediction");
  if (predTarget) {
    predTarget.classList.add("empty");
    predTarget.innerHTML = `<div>Loading reconstructed tide curve...</div>`;
  }
  loadVisualizationTidalPrediction(request.deviceKey, request.metric, request.rangeHours)
    .then((payload) => {
      if (
        state.visualizationType !== "tidal-analysis" ||
        state.vizDeviceKey !== request.deviceKey ||
        state.vizMetric !== request.metric ||
        state.vizRangeHours !== request.rangeHours ||
        (typeof vizRenderToken !== "undefined" && token !== undefined && token !== vizRenderToken)
      ) {
        return;
      }
      const predItems = payload.items || [];
      const target = $("viz-tidal-prediction");
      if (!target) return;
      target.classList.remove("empty");
      target.innerHTML = `<div id="viz-tidal-pred-canvas"></div>`;
      drawLineChart("viz-tidal-pred-canvas", predItems, {
        title: "Reconstructed tide and 48 h prediction",
        valueKey: "value",
      });
    })
    .catch((error) => {
      const target = $("viz-tidal-prediction");
      if (target && state.visualizationType === "tidal-analysis") {
        target.classList.add("empty");
        target.innerHTML = `<div>${escapeHtml(error?.message || "Prediction failed.")}</div>`;
      }
    });
}

function drawWaveSpectrumVisualization(rows) {
  const device = vizDeviceByKey(state.vizDeviceKey);
  const deviceName = device ? vizDeviceLabel(device) : "the selected device";
  const bins = rows
    .map((row) => ({
      frequency: Number(row.frequency_hz),
      period: Number(row.period_seconds),
      power: Number(row.power),
    }))
    .filter((row) => Number.isFinite(row.frequency) && Number.isFinite(row.power))
    .sort((a, b) => a.frequency - b.frequency);
  if (!rows.length || bins.length < 2) {
    setChartEmpty("visualization-canvas", `No wave spectrum is available for ${deviceName}.`);
    return;
  }

  const width = 680;
  const height = 260;
  const padL = 58;
  const padR = 24;
  const padT = 44;
  const padB = 42;
  const maxPower = Math.max(...bins.map((bin) => bin.power), 1e-9);
  const minFreq = bins[0].frequency;
  const maxFreq = bins[bins.length - 1].frequency;
  const freqRange = Math.max(maxFreq - minFreq, 1e-9);
  const sx = (frequency) => padL + ((frequency - minFreq) / freqRange) * (width - padL - padR);
  const sy = (power) => height - padB - (power / maxPower) * (height - padT - padB);
  const linePath = bins.map((bin, index) => `${index === 0 ? "M" : "L"} ${sx(bin.frequency).toFixed(1)} ${sy(bin.power).toFixed(1)}`).join(" ");
  const areaPath = `${linePath} L ${sx(bins[bins.length - 1].frequency).toFixed(1)} ${height - padB} L ${sx(bins[0].frequency).toFixed(1)} ${height - padB} Z`;
  const dominant = bins.reduce((best, bin) => (bin.power > best.power ? bin : best), bins[0]);
  const first = rows[0] || {};
  const summaryBars = [
    {
      label: "Significant wave height",
      value: first.significant_wave_height,
      unit: first.source_unit || scienceCatalogUnit(state.vizMetric, "m"),
      note: "4 x standard deviation",
    },
    {
      label: "Dominant period",
      value: Number(first.dominant_period_seconds || dominant.period || 0),
      unit: "s",
      note: `${formatValue((first.dominant_frequency_hz || dominant.frequency) * 3600, "cycles/h")}`,
    },
    {
      label: "Zero-crossing period",
      value: Number(first.zero_crossing_period_seconds || 0),
      unit: "s",
      note: `${first.zero_crossings || 0} crossings`,
    },
    {
      label: "FFT bins",
      value: bins.length,
      unit: "",
      note: `${first.transform_size || "-"} point transform`,
    },
  ].filter((row) => Number.isFinite(Number(row.value)) && Number(row.value) >= 0);

  setChartHtml(
    "visualization-canvas",
    `${chartHeader(
      `Wave spectrum - ${deviceName}`,
      `${first.sample_count || rows.length} samples, median interval ${scienceDurationLabel(first.sample_interval_seconds)}.`,
      "PSD"
    )}
    <div class="viz-dashboard">
      <div class="viz-dash-item">
        <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Wave spectrum power by frequency">
          <path d="${areaPath}" fill="#32d0bd" fill-opacity="0.18" stroke="none"></path>
          <path d="${linePath}" fill="none" stroke="#32d0bd" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"></path>
          <line x1="${sx(dominant.frequency).toFixed(1)}" y1="${padT}" x2="${sx(dominant.frequency).toFixed(1)}" y2="${height - padB}" stroke="#f5a524" stroke-width="2" stroke-dasharray="5 5"></line>
          <text x="${padL}" y="24" fill="#edf8f8" font-size="15" font-weight="700">Power spectral density</text>
          <text x="${width - padR}" y="24" text-anchor="end" fill="#f5a524" font-size="12" font-weight="700">dominant ${escapeHtml(scienceDurationLabel(dominant.period))}</text>
          <line x1="${padL}" y1="${height - padB}" x2="${width - padR}" y2="${height - padB}" stroke="#3a5258" stroke-width="1"></line>
          <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${height - padB}" stroke="#3a5258" stroke-width="1"></line>
          <text x="${padL}" y="${height - 14}" fill="#90a9ad" font-size="11">${escapeHtml(formatValue(minFreq * 3600, "cycles/h"))}</text>
          <text x="${width - padR}" y="${height - 14}" text-anchor="end" fill="#90a9ad" font-size="11">${escapeHtml(formatValue(maxFreq * 3600, "cycles/h"))}</text>
          <text transform="translate(18 ${(padT + height - padB) / 2}) rotate(-90)" text-anchor="middle" fill="#90a9ad" font-size="11">Relative power</text>
        </svg>
      </div>
      <div class="viz-dash-item">${miniBarsHtml(summaryBars, { valueFormatter: (value, row) => formatValue(value, row.unit || "") })}</div>
    </div>`
  );
}

function drawSeawaterPropertiesVisualization(rows) {
  const device = vizDeviceByKey(state.vizDeviceKey);
  const deviceName = device ? vizDeviceLabel(device) : "the selected device";
  if (!rows.length || rows[0].density === undefined) {
    setChartEmpty("visualization-canvas", `${deviceName} needs temperature plus salinity or conductivity for seawater properties.`);
    return;
  }
  const p = rows[0];
  const bars = [
    { label: "Density", value: p.density, unit: "kg/m3", note: "EOS-80" },
    { label: "Salinity", value: p.salinity, unit: "PSU", note: p.input_conductivity === undefined ? "reported" : "PSS-78 from conductivity" },
    { label: "Sigma-t", value: p.sigma_t, unit: "kg/m3", note: "density - 1000" },
  ];
  renderMiniBarChart(
    "visualization-canvas",
    `Seawater properties - ${deviceName}`,
    `Derived from ${formatValue(p.input_temp, "degC")} at ${formatValue(p.input_depth, "m")}.`,
    bars,
    {
      badge: "Oceanography",
      valueFormatter: (value, row) => formatValue(value, row.unit || ""),
    }
  );
}
