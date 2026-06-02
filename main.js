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
  initMagneticButtons();
  initArcadeEasterEgg();
  initGlobalMap();
  initReadingProgress();
  initAmbientBackground();
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

// Removed conflicting Konami Code listener

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
   7. Hidden Arcade (Konami Code)
------------------------------------- */
function initArcadeEasterEgg() {
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
        triggerBioluminescence();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  function triggerBioluminescence() {
    if (document.getElementById('bio-overlay')) return;

    const style = document.createElement('style');
    style.innerHTML = `
      #bio-overlay {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: #010409;
        z-index: 10000;
        cursor: crosshair;
        opacity: 0;
        transition: opacity 2s ease;
      }
      .bio-close { 
        position: absolute; top: 2rem; right: 2rem; 
        color: rgba(56,189,248,0.5); cursor: pointer; font-size: 2.5rem; 
        line-height: 1; transition: all 0.3s; z-index: 10001; 
        font-family: var(--font-mono, monospace);
      }
      .bio-close:hover { color: #fff; transform: scale(1.2); text-shadow: 0 0 15px #38bdf8; }
      #bio-canvas { width: 100%; height: 100%; display: block; }
      .bio-msg {
        position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
        color: rgba(56, 189, 248, 0.2); font-family: var(--font-mono, monospace);
        font-size: 1.5rem; letter-spacing: 0.2em; pointer-events: none;
        transition: opacity 1s; text-align: center;
      }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.id = 'bio-overlay';
    overlay.innerHTML = `
      <div class="bio-close" id="bio-close">&times;</div>
      <div class="bio-msg" id="bio-msg">SYSTEM: BIOLUMINESCENCE DETECTED<br><span style="font-size: 0.8rem; opacity: 0.5;">AGITATE THE WATER</span></div>
      <canvas id="bio-canvas"></canvas>
    `;
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
    });

    const canvas = document.getElementById('bio-canvas');
    const ctx = canvas.getContext('2d', { alpha: false });
    
    let w, h;
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const count = Math.min(window.innerWidth * window.innerHeight / 2000, 1500);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5,
        glow: 0
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    let isMoving = false;
    let moveTimeout;

    const mouseHandler = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMoving = true;
      document.getElementById('bio-msg').style.opacity = '0';
      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => { isMoving = false; }, 100);
    };
    window.addEventListener('mousemove', mouseHandler);

    let loopId;
    function render() {
      ctx.fillStyle = 'rgba(1, 4, 9, 0.15)'; 
      ctx.fillRect(0, 0, w, h);

      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        let dx = p.x - mouseX;
        let dy = p.y - mouseY;
        let dist = Math.sqrt(dx*dx + dy*dy);

        if (dist < 120 && isMoving) {
          p.x += dx * 0.03;
          p.y += dy * 0.03;
          p.glow = 1.0;
        }

        p.glow = Math.max(0, p.glow - 0.012);

        let alpha = 0.1 + p.glow * 0.9;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        if (p.glow > 0.4) {
          ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`; 
          ctx.shadowBlur = 10 * p.glow;
          ctx.shadowColor = '#38bdf8';
        } else {
          ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`; 
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      
      loopId = requestAnimationFrame(render);
    }
    
    render();

    document.getElementById('bio-close').addEventListener('click', () => {
      cancelAnimationFrame(loopId);
      window.removeEventListener('mousemove', mouseHandler);
      window.removeEventListener('resize', resize);
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 2000);
    });
  }
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
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      // Snap back to center
      btn.style.transform = `translate(0px, 0px)`;
    });
  });
}

/* -------------------------------------
   9. Global Node Map
------------------------------------- */
function initGlobalMap() {
  const canvas = document.getElementById('global-node-map');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  const nodes = [];
  const packets = [];

  function resize() {
    width = canvas.parentElement.offsetWidth;
    height = canvas.parentElement.offsetHeight;
    canvas.width = width;
    canvas.height = height;
  }
  
  window.addEventListener('resize', resize);
  resize();

  // Generate Nodes (distributed to look like global ocean coverage)
  const numNodes = 120;
  for (let i = 0; i < numNodes; i++) {
    nodes.push({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      connections: [],
      pingAlpha: 0
    });
  }

  // Connect nearest neighbors to form a mesh
  nodes.forEach(node => {
    // Sort all other nodes by distance
    const others = nodes.filter(n => n.id !== node.id).map(n => {
      const dx = n.x - node.x;
      const dy = n.y - node.y;
      return { node: n, dist: Math.sqrt(dx*dx + dy*dy) };
    });
    others.sort((a, b) => a.dist - b.dist);
    
    // Connect to 2-4 closest
    const numConnections = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < numConnections; i++) {
      if (others[i].dist < 200) { // Max connection distance
        if (!node.connections.includes(others[i].node)) {
          node.connections.push(others[i].node);
        }
      }
    }
  });

  function spawnPacket() {
    // Pick random starting node with connections
    const validNodes = nodes.filter(n => n.connections.length > 0);
    if (validNodes.length === 0) return;
    
    const startNode = validNodes[Math.floor(Math.random() * validNodes.length)];
    const targetNode = startNode.connections[Math.floor(Math.random() * startNode.connections.length)];
    
    startNode.pingAlpha = 1; // Flash the sending node

    packets.push({
      x: startNode.x,
      y: startNode.y,
      target: targetNode,
      progress: 0,
      speed: Math.random() * 0.01 + 0.01
    });

    // Schedule next packet
    setTimeout(spawnPacket, Math.random() * 500 + 100);
  }

  // Start spawning
  setTimeout(spawnPacket, 1000);
  setTimeout(spawnPacket, 1500);
  setTimeout(spawnPacket, 2000);

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw grid background (subtle)
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 50) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += 50) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    // Draw Links
    ctx.lineWidth = 0.5;
    nodes.forEach(node => {
      node.connections.forEach(target => {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(target.x, target.y);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
        ctx.stroke();
      });
    });

    // Draw Packets
    for (let i = packets.length - 1; i >= 0; i--) {
      const p = packets[i];
      p.progress += p.speed;
      
      if (p.progress >= 1) {
        p.target.pingAlpha = 1; // Flash target node on receive
        packets.splice(i, 1);
        continue;
      }

      // Current position along the line
      const currentX = p.x + (p.target.x - p.x) * p.progress;
      const currentY = p.y + (p.target.y - p.y) * p.progress;

      ctx.beginPath();
      ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#38bdf8';
      ctx.fill();
      ctx.shadowBlur = 0; // reset
    }

    // Draw Nodes
    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.5)';
      ctx.fill();

      // Draw Ping Aura
      if (node.pingAlpha > 0) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size + (1 - node.pingAlpha) * 15, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${node.pingAlpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        node.pingAlpha -= 0.05; // Fade out
      }
    });

    requestAnimationFrame(draw);
  }

  draw();
}

/* -------------------------------------
   10. Site-Wide Progress Bar
------------------------------------- */
function initReadingProgress() {
  const bar = document.createElement('div');
  bar.id = 'reading-progress';
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (height <= 0) return;
    const scrolled = (winScroll / height) * 100;
    bar.style.width = scrolled + '%';
  });
}

/* -------------------------------------
   11. Ambient Inner-Page Background
------------------------------------- */
function initAmbientBackground() {
  // Only inject if this is NOT the homepage (which has ocean-ecosystem or a large hero)
  if (document.getElementById('ocean-ecosystem')) return;
  if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') return;

  const canvas = document.createElement('canvas');
  canvas.id = 'ambient-canvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let width, height;
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  window.addEventListener('resize', resize);
  resize();

  let offset = 0;
  function draw() {
    ctx.clearRect(0, 0, width, height);
    
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.1)';
    ctx.lineWidth = 1;
    
    // Draw slowly moving grid
    offset = (offset + 0.5) % 50;
    
    for (let x = offset; x < width; x += 50) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = offset; y < height; y += 50) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }
    
    // Random data blips
    if (Math.random() > 0.95) {
      ctx.fillStyle = 'rgba(56, 189, 248, 0.5)';
      ctx.fillRect(
        Math.floor(Math.random() * (width / 50)) * 50 + offset, 
        Math.floor(Math.random() * (height / 50)) * 50 + offset, 
        50, 50
      );
    }
    
    requestAnimationFrame(draw);
  }
  
  draw();
}
