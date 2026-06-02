// OMEGA Website Global Interaction Logic

document.addEventListener("DOMContentLoaded", () => {
  initAnimations();
  initCopyToClipboard();
  initTableOfContents();
  initSearchPalette();
  initTypewriter();
  initOceanEcosystem();
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

  function openSearch() {
    overlay.classList.add('is-open');
    input.value = '';
    renderResults('');
    setTimeout(() => input.focus(), 50);
  }

  function closeSearch() {
    overlay.classList.remove('is-open');
  }

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
   5. Ocean Ecosystem Background
------------------------------------- */
function initOceanEcosystem() {
  // Only run on pages that have the hero section (e.g. index.html) to save resources
  if (!document.querySelector('.hero-animated')) return;

  const container = document.createElement('div');
  container.id = 'ocean-ecosystem';
  document.body.prepend(container);

  const emojis = ['🐟', '🦈', '📡', '🤖', '⛴️'];
  const numParticles = 15;

  for (let i = 0; i < numParticles; i++) {
    createParticle(container, emojis);
  }
}

function createParticle(container, emojis) {
  const particle = document.createElement('div');
  particle.className = 'ocean-particle';
  particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  
  // Random starting position
  const startX = Math.random() * 100; // vw
  const startY = Math.random() * 100; // vh
  
  particle.style.left = startX + 'vw';
  particle.style.top = startY + 'vh';
  
  // Randomize size and opacity slightly
  const scale = 0.5 + Math.random() * 1.5;
  particle.style.transform = `scale(${scale})`;
  particle.style.opacity = (0.02 + Math.random() * 0.05).toFixed(2);
  
  container.appendChild(particle);

  // Animation logic
  animateParticle(particle);
}

function animateParticle(particle) {
  // Random drift vector
  const moveX = (Math.random() - 0.5) * 20; // -10 to 10 vw
  const moveY = (Math.random() - 0.5) * 10; // -5 to 5 vh
  const duration = 20000 + Math.random() * 30000; // 20s to 50s

  const startLeft = parseFloat(particle.style.left);
  const startTop = parseFloat(particle.style.top);

  particle.style.transition = `left ${duration}ms linear, top ${duration}ms linear`;
  
  // Trigger layout to ensure transition applies
  void particle.offsetWidth;

  particle.style.left = (startLeft + moveX) + 'vw';
  particle.style.top = (startTop + moveY) + 'vh';

  // Loop
  setTimeout(() => {
    // Reset if it went too far off screen
    const currentLeft = parseFloat(particle.style.left);
    const currentTop = parseFloat(particle.style.top);
    if (currentLeft < -10 || currentLeft > 110 || currentTop < -10 || currentTop > 110) {
      particle.style.transition = 'none';
      particle.style.left = (Math.random() * 100) + 'vw';
      particle.style.top = (Math.random() * 100) + 'vh';
      void particle.offsetWidth;
    }
    animateParticle(particle);
  }, duration);
}
