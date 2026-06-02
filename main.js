// OMEGA Website Global Interaction Logic

document.addEventListener("DOMContentLoaded", () => {
  initAnimations();
  initCopyToClipboard();
  initTableOfContents();
  initSearchPalette();
  initTypewriter();
  initSpotlight();
  initTextScramble();
  initScrollProgress();
  initOceanEcosystem();
  initLiveTerminalFeed();
  initMagneticButtons();
  initSubmarineAlert();
});

/* -------------------------------------
   1. Scroll Animations (IntersectionObserver)
------------------------------------- */
function initAnimations() {
  const elements = document.querySelectorAll('.section, .fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Unobserve once animated to keep it visible
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  elements.forEach(el => {
    observer.observe(el);
  });
}

/* -------------------------------------
   1.5. Typewriter Effect
------------------------------------- */
function initTypewriter() {
  const typer = document.getElementById('hero-typer');
  if (!typer) return;

  const words = [
    "Systems Architecture & Engineering",
    "Embedded Hardware Design",
    "Data Infrastructure & AI",
    "Deterministic Evaluation Frameworks"
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  
  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typer.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typer.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = 80;
    if (isDeleting) typeSpeed /= 2;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2500;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  // Start typing
  setTimeout(type, 500);
}

/* -------------------------------------
   2. Copy to Clipboard
------------------------------------- */
function initCopyToClipboard() {
  const preBlocks = document.querySelectorAll('pre');
  preBlocks.forEach((pre) => {
    // Check if there is a code block inside
    const code = pre.querySelector('code');
    if (!code) return;

    // Create wrapper to handle absolute positioning
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    pre.parentNode.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    // Create button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>`;
    wrapper.appendChild(copyBtn);

    // Copy event
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.innerText);
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>`;
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>`;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    });
  });
}

/* -------------------------------------
   3. Table of Contents
------------------------------------- */
function initTableOfContents() {
  const sections = Array.from(document.querySelectorAll('main.main-shell .section'));
  // Only build ToC if there are at least 3 sections to justify it
  if (sections.length < 3) return;

  const mainShell = document.querySelector('main.main-shell');
  if (!mainShell) return;

  // Modify layout to accommodate sidebar
  mainShell.classList.add('has-toc');
  
  const tocWrapper = document.createElement('aside');
  tocWrapper.className = 'toc-sidebar';
  
  const tocTitle = document.createElement('h4');
  tocTitle.className = 'toc-title';
  tocTitle.textContent = 'On this page';
  tocWrapper.appendChild(tocTitle);

  const tocList = document.createElement('ul');
  tocList.className = 'toc-list';
  
  const links = [];

  sections.forEach((sec, idx) => {
    const h2 = sec.querySelector('h2');
    if (!h2) return;
    
    // Give section an ID if it doesn't have one
    if (!sec.id) {
      sec.id = 'section-' + idx;
    }

    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#' + sec.id;
    // Extract text, remove any trailing periods if present
    a.textContent = h2.textContent.replace(/\.$/, '');
    
    li.appendChild(a);
    tocList.appendChild(li);
    links.push({ el: sec, link: a });
  });

  tocWrapper.appendChild(tocList);
  mainShell.appendChild(tocWrapper);

  // Active state highlighting
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active from all
        links.forEach(l => l.link.classList.remove('is-active'));
        // Find matching link and add active
        const match = links.find(l => l.el === entry.target);
        if (match) match.link.classList.add('is-active');
      }
    });
  }, { rootMargin: "-20% 0px -70% 0px" });

  sections.forEach(sec => observer.observe(sec));
}

/* -------------------------------------
   4. Search Command Palette
------------------------------------- */
const SEARCH_INDEX = [
  { title: "RF Physics & Propagation", url: "rf-physics.html", keywords: "fresnel zone saltwater lora thermal thermodynamics HPA" },
  { title: "System Architecture", url: "system-architecture.html", keywords: "overview 4-layer stack topology hardware transport gateway presentation layer" },
  { title: "Gateway", url: "gateway.html", keywords: "fastapi sqlite wal dtn copilot honu" },
  { title: "Mesh Core", url: "mesh-core.html", keywords: "lora cbor compression tlv predictive coding csma-ca rf" },
  { title: "Mission Portal", url: "mission-portal.html", keywords: "react webgl dashboard data UI deckgl mapbox" },
  { title: "Hardware", url: "hardware.html", keywords: "firmware esp32 sx1262 gps t-beam lora-relay battery solar thermal" },
  { title: "Security", url: "security.html", keywords: "rbac crypto ecdh aes gcm zero-trust" },
  { title: "Analytics", url: "analytics.html", keywords: "qartod data pipeline science validation" },
  { title: "Data Providers", url: "data-providers.html", keywords: "satellite ndbc iridum starlink cost economics" },
  { title: "Simulation", url: "simulation.html", keywords: "digital twin hitl time dilation testing" },
  { title: "JANUS Acoustics", url: "janus-acoustic.html", keywords: "underwater acoustic modem nato sonar" },
  { title: "Bathymetry", url: "bathymetry.html", keywords: "mapping offline pipeline kmz png depth contours" },
  { title: "Event Bus", url: "event-bus.html", keywords: "redis pubsub streams architecture" }
];

function initSearchPalette() {
  // Create modal HTML
  const overlay = document.createElement('div');
  overlay.className = 'search-overlay';
  overlay.innerHTML = `
    <div class="search-modal">
      <div class="search-input-wrapper">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ink-soft)" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input type="text" id="search-input" placeholder="Search documentation... (Esc to close)">
      </div>
      <div class="search-results" id="search-results"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  const input = document.getElementById('search-input');
  const resultsDiv = document.getElementById('search-results');

  // Add search button to nav
  const nav = document.querySelector('.nav');
  if (nav) {
    const searchBtn = document.createElement('button');
    searchBtn.className = 'nav-search-btn';
    searchBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> <span>Search...</span> <kbd>Ctrl K</kbd>`;
    nav.appendChild(searchBtn);
    searchBtn.addEventListener('click', openSearch);
  }

  // New matrix easter egg tracking
  let isMatrixActive = false;

  function openSearch() {
    overlay.classList.add('is-open');
    input.value = '';
    setTimeout(() => input.focus(), 50);
  }

  function closeSearch() {
    overlay.classList.remove('is-open');
  }

  // Handle Input Commands
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value.trim().toLowerCase();
      
      if (val === '/matrix' && !isMatrixActive) {
        // Trigger Matrix Easter Egg
        isMatrixActive = true;
        closeSearch();
        triggerMatrixRain();
      } else if (val.startsWith('/')) {
        console.log("Command not found:", val);
      }
    }
  });

  // Keyboard bindings
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeSearch();
    }
  });
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeSearch();
  });

  // Search logic
  input.addEventListener('input', (e) => {
    renderResults(e.target.value.toLowerCase());
  });

  function renderResults(query) {
    if (!query) {
      resultsDiv.innerHTML = '<div class="search-empty">Type to search...</div>';
      return;
    }

    const matches = SEARCH_INDEX.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.keywords.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      resultsDiv.innerHTML = '<div class="search-empty">No results found for "'+query+'"</div>';
      return;
    }

    resultsDiv.innerHTML = '';
    matches.forEach((match, idx) => {
      const a = document.createElement('a');
      a.className = 'search-result-item';
      a.href = match.url;
      a.innerHTML = `
        <span class="search-result-title">${match.title}</span>
        <span class="search-result-url">${match.url}</span>
      `;
      // Allow enter to trigger first result
      if (idx === 0) a.classList.add('is-highlighted');
      resultsDiv.appendChild(a);
    });
  }
}

// ==========================================
// Easter Egg: Konami Code -> Terminal
// ==========================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      // Trigger glitch
      document.body.classList.add('terminal-glitch');
      setTimeout(() => {
        window.location.href = 'terminal.html';
      }, 1500);
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

/* -------------------------------------
   5. Futuristic Effects & Easter Eggs
------------------------------------- */

function initSpotlight() {
  const panels = document.querySelectorAll('.panel');
  
  panels.forEach(panel => {
    panel.addEventListener('mousemove', (e) => {
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      panel.style.setProperty('--mouse-x', `${x}px`);
      panel.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

function initTextScramble() {
  const elements = document.querySelectorAll('.scramble-text');
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  
  elements.forEach(el => {
    const originalText = el.innerText;
    el.addEventListener('mouseenter', () => {
      let iterations = 0;
      const interval = setInterval(() => {
        el.innerText = originalText.split('')
          .map((letter, index) => {
            if(index < iterations) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        
        if(iterations >= originalText.length){
          clearInterval(interval);
        }
        iterations += 1 / 3; // speed
      }, 30);
    });
  });
}

function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.prepend(progressBar);

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
  });
}

function initDevModeSecret() {
  const nameEl = document.getElementById('hero-name');
  if (!nameEl) return;

  let clicks = 0;
  let clickTimeout;

  nameEl.addEventListener('click', () => {
    clicks++;
    clearTimeout(clickTimeout);
    
    if (clicks >= 5) {
      document.documentElement.style.setProperty('--accent', '#10b981'); // Change accent to hacker green
      document.documentElement.style.setProperty('--accent-ocean', '#10b981'); 
      console.log("%c[DEV MODE UNLOCKED]", "color: #10b981; font-size: 20px; font-weight: bold;");
      console.log("%cWelcome to the underground. The system is yours.", "color: #10b981; font-size: 14px;");
      clicks = 0;
    } else {
      clickTimeout = setTimeout(() => { clicks = 0; }, 500);
    }
  });
}

function triggerMatrixRain() {
  const canvas = document.createElement('canvas');
  canvas.id = 'matrix-canvas';
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'#&_(),.;:?!\\|{}<>[]^~';
  const fontSize = 16;
  const columns = canvas.width / fontSize;
  const drops = Array.from({length: columns}).fill(1);
  
  let animationId;
  function draw() {
    ctx.fillStyle = 'rgba(3, 7, 18, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#10b981';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    animationId = requestAnimationFrame(draw);
  }
  
  draw();
  
  setTimeout(() => {
    cancelAnimationFrame(animationId);
    canvas.style.transition = 'opacity 1s ease';
    canvas.style.opacity = '0';
    setTimeout(() => canvas.remove(), 1000);
  }, 5000);
}

/* -------------------------------------
   6. Realistic Ocean Ecosystem Background
------------------------------------- */
function initOceanEcosystem() {
  if (!document.querySelector('.hero-animated')) return;

  const container = document.createElement('div');
  container.id = 'ocean-ecosystem';
  document.body.prepend(container);

  const numParticles = 20; // More fish, but very distant

  for (let i = 0; i < numParticles; i++) {
    createFishParticle(container);
  }
}

function createFishParticle(container) {
  const particle = document.createElement('div');
  particle.className = 'ocean-particle fish';
  
  // Clean SVG Fish - naturally faces left (head at X=0, tail at X=100)
  particle.innerHTML = `
    <svg viewBox="0 0 100 40" width="40" height="16" xmlns="http://www.w3.org/2000/svg">
      <path d="M 0 20 Q 30 5, 80 20 Q 30 35, 0 20 Z" fill="rgba(148, 163, 184, 0.4)" />
      <path class="fish-tail" d="M 75 20 L 100 8 L 100 32 Z" fill="rgba(148, 163, 184, 0.4)" />
    </svg>
  `;
  
  // Random starting position (mostly off-screen left or right)
  const isMovingRight = Math.random() > 0.5;
  const startX = isMovingRight ? -10 : 110; 
  const startY = Math.random() * 100; // vh
  
  particle.style.left = startX + 'vw';
  particle.style.top = startY + 'vh';
  
  // Z-Depth / Scale logic
  const scale = 0.1 + Math.random() * 0.4; // Extremely small/distant (0.1) to mid-distance (0.5)
  
  // Orientation: if moving left, scaleX(1). if moving right, scaleX(-1)
  const dirScale = isMovingRight ? -1 : 1;
  particle.style.transform = `scaleX(${dirScale}) scale(${scale})`;
  
  // Blur and Opacity based on distance (scale). Smaller = blurrier and more transparent.
  const baseOpacity = scale * 0.15; // 0.1 scale = 0.015 opacity. 0.5 scale = 0.075 opacity.
  particle.style.opacity = baseOpacity.toFixed(3);
  
  const blurAmt = (0.6 - scale) * 3; // 0.1 scale = 1.5px blur. 0.5 scale = 0.3px blur.
  particle.style.filter = `blur(${blurAmt.toFixed(1)}px)`;
  
  container.appendChild(particle);

  animateFish(particle, isMovingRight, scale, dirScale);
}

function animateFish(particle, isMovingRight, scale, dirScale) {
  // Slower for distant fish (smaller scale). 
  // Base duration 30s to 60s, divided by scale so distant fish take up to 200s.
  const baseDuration = 30000 + Math.random() * 30000; 
  const duration = baseDuration / (scale * 2); 
  
  const endX = isMovingRight ? 110 : -10;

  particle.style.transition = `left ${duration}ms linear`;
  
  // Trigger layout to ensure transition applies
  void particle.offsetWidth;

  particle.style.left = endX + 'vw';

  // Loop
  setTimeout(() => {
    particle.style.transition = 'none';
    particle.style.top = (Math.random() * 100) + 'vh';
    
    // Switch direction randomly on respawn
    const newMovingRight = Math.random() > 0.5;
    particle.style.left = (newMovingRight ? -10 : 110) + 'vw';
    
    const newDirScale = newMovingRight ? -1 : 1;
    particle.style.transform = `scaleX(${newDirScale}) scale(${scale})`;
    
    void particle.offsetWidth;
    animateFish(particle, newMovingRight, scale, newDirScale);
  }, duration);
}

/* -------------------------------------
   7. Live Telemetry Terminal
------------------------------------- */
function initLiveTerminalFeed() {
  const terminal = document.getElementById('live-terminal-feed');
  if (!terminal) return;

  const messages = [
    "[SYS] Initializing OMEGA uplink protocol...",
    "[DTN] Establishing bundle protocol to Node-07 (Mid-Atlantic)...",
    "[DTN] Connection established. Latency: 42ms.",
    "[DATA] Ingesting telemetry payload (Size: 45kb, Format: CBOR)",
    "[OK] Payload signature verified. Decrypting AES-GCM.",
    "[DB] Writing to SQLite WAL...",
    "[WARN] Acoustic anomaly detected in Sector 4 (Frequency: 14.5kHz)",
    "[AI] Triggering Honu anomaly classification...",
    "[AI] Classification: Biological (Cetacean signature matched)",
    "[SYS] Entering low-power sleep state for 300s...",
    "[DTN] Polling Node-12 (Pacific Array)...",
    "[ERR] Packet timeout. Retrying with spreading factor 10.",
    "[OK] Handshake successful. SNR: -12dB."
  ];

  let msgIndex = 0;

  function addTerminalLine() {
    const p = document.createElement('p');
    p.style.margin = '0.2rem 0';
    p.innerText = '> ' + messages[msgIndex];
    terminal.appendChild(p);

    // Keep only last 10 lines
    if (terminal.children.length > 10) {
      terminal.removeChild(terminal.firstChild);
    }

    msgIndex = (msgIndex + 1) % messages.length;

    // Random typing delay
    setTimeout(addTerminalLine, 1000 + Math.random() * 2500);
  }

  // Start feed
  setTimeout(addTerminalLine, 1500);
}

/* -------------------------------------
   8. Magnetic Buttons
------------------------------------- */
function initMagneticButtons() {
  const magnets = document.querySelectorAll('.magnetic-btn');

  magnets.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const h = rect.width / 2;
      const v = rect.height / 2;
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - v;

      // Pull button towards cursor
      btn.style.transform = \`translate(\${x * 0.3}px, \${y * 0.3}px)\`;
    });

    btn.addEventListener('mouseleave', () => {
      // Snap back to center
      btn.style.transform = \`translate(0px, 0px)\`;
    });
  });
}

/* -------------------------------------
   9. Submarine Red Alert (Konami Code)
------------------------------------- */
function initSubmarineAlert() {
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        triggerRedAlert();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  function triggerRedAlert() {
    // Inject emergency CSS
    const style = document.createElement('style');
    style.innerHTML = \`
      html { background-color: #2a0808 !important; }
      body { background-color: transparent !important; }
      .red-alert-overlay {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: radial-gradient(circle at center, transparent 0%, rgba(255, 0, 0, 0.4) 100%);
        pointer-events: none; z-index: 9998;
        animation: pulse-red 2s infinite alternate;
      }
      @keyframes pulse-red {
        0% { opacity: 0.3; }
        100% { opacity: 1; }
      }
      * { color: #ff5555 !important; border-color: rgba(255,0,0,0.3) !important; }
      .panel { background: rgba(40, 0, 0, 0.5) !important; }
    \`;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.className = 'red-alert-overlay';
    document.body.appendChild(overlay);

    console.log("RED ALERT: EMERGENCY PROTOCOL INITIATED.");
  }
}
