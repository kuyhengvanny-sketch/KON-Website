// ═══════════════════════════════════════════
// KON · គូន — script.js
// ═══════════════════════════════════════════


// ── MOBILE MENU ──────────────────────────────
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');

hamburger.addEventListener('click', function () {
  mobileMenu.classList.toggle('open');
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function (e) {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('open');
  }
});


// ── SCROLL REVEAL ANIMATION ───────────────────
// Elements with class "reveal" fade in when they scroll into view
const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.08
});

document.querySelectorAll('.reveal').forEach(function (el) {
  revealObserver.observe(el);
});


// ── SMOOTH NAV HIGHLIGHT ──────────────────────
// Highlights the active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function () {
  let current = '';

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove('active-link');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active-link');
    }
  });
});


// ── NAV BACKGROUND ON SCROLL ─────────────────
// Makes nav slightly more opaque when user scrolls down
const nav = document.querySelector('nav');

window.addEventListener('scroll', function () {
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(26,21,53,0.98)';
  } else {
    nav.style.background = 'rgba(26,21,53,0.92)';
  }
});


// ── GALLERY LIGHTBOX ──────────────────────────
// Click any gallery image to see it larger
const galleryItems = document.querySelectorAll('.gallery-item img');

galleryItems.forEach(function (img) {
  img.style.cursor = 'pointer';
  img.addEventListener('click', function () {
    openLightbox(img.src, img.alt);
  });
});

function openLightbox(src, alt) {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: rgba(10,8,30,0.92);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    cursor: pointer;
  `;

  const image = document.createElement('img');
  image.src = src;
  image.alt = alt;
  image.style.cssText = `
    max-width: 90%;
    max-height: 90vh;
    border-radius: 16px;
    object-fit: contain;
    box-shadow: 0 24px 80px rgba(0,0,0,0.6);
  `;

  const closeBtn = document.createElement('div');
  closeBtn.textContent = '✕';
  closeBtn.style.cssText = `
    position: absolute;
    top: 1.5rem;
    right: 2rem;
    font-size: 24px;
    color: rgba(175,169,236,0.7);
    cursor: pointer;
    transition: color 0.2s;
  `;
  closeBtn.addEventListener('mouseover', function () { this.style.color = '#fff'; });
  closeBtn.addEventListener('mouseout',  function () { this.style.color = 'rgba(175,169,236,0.7)'; });

  overlay.appendChild(image);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  // Close on click anywhere
  overlay.addEventListener('click', function () {
    document.body.removeChild(overlay);
  });

  // Close on Escape key
  document.addEventListener('keydown', function handler(e) {
    if (e.key === 'Escape') {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
      document.removeEventListener('keydown', handler);
    }
  });
}


// ── TEAM PHOTO FALLBACK ───────────────────────
// Shows initials placeholder when team photo fails to load
document.querySelectorAll('.team-photo img').forEach(function (img) {
  img.addEventListener('error', function () {
    img.style.display = 'none';
    const placeholder = img.nextElementSibling;
    if (placeholder) placeholder.style.display = 'flex';
  });
});
