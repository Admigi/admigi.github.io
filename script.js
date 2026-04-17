// ── Hamburger menu ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function closeMobileMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', closeMobileMenu);
});

// ── Orb scroll behavior ──
const orbColors = {
  hero: {
    orb1: 'rgba(124,109,250,0.18)',
    orb2: 'rgba(250,109,138,0.10)',
  },
  about: {
    orb1: 'rgba(109,200,250,0.14)',
    orb2: 'rgba(124,109,250,0.12)',
  },
  projects: {
    orb1: 'rgba(250,109,138,0.14)',
    orb2: 'rgba(109,250,180,0.10)',
  },
  contact: {
    orb1: 'rgba(250,180,109,0.12)',
    orb2: 'rgba(124,109,250,0.15)',
  },
};

const orb1 = document.querySelector('.orb-1');
const orb2 = document.querySelector('.orb-2');

// ── Language toggle ──
function setLang(lang) {
  document.documentElement.lang = lang === 'ja' ? 'ja' : 'en';
  document.body.classList.toggle('ja', lang === 'ja');
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const isActive = btn.getAttribute('data-lang-btn') === lang;
    btn.classList.toggle('active', isActive);
  });
  localStorage.setItem('lang', lang);
  updateOrbColors(getCurrentSection());
}

// Restore saved language on load
const savedLang = localStorage.getItem('lang');
if (savedLang === 'ja') setLang('ja');

// ── Scroll reveal ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => { observer.observe(el); });

function getCurrentSection() {
  const sections = ['contact', 'projects', 'about', 'hero'];
  for (const id of sections) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.5) return id;
  }
  return 'hero';
}

function updateOrbColors(section) {
  const colors = orbColors[section] || orbColors.hero;
  if (orb1) orb1.style.background = `radial-gradient(circle, ${colors.orb1} 0%, transparent 70%)`;
  if (orb2) orb2.style.background = `radial-gradient(circle, ${colors.orb2} 0%, transparent 70%)`;
}

function updateActiveNav(section) {
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('nav-active', a.getAttribute('href') === `#${section}`);
  });
}

let lastSection = 'hero';
updateActiveNav('hero');
window.addEventListener('scroll', () => {
  const current = getCurrentSection();
  if (current !== lastSection) {
    lastSection = current;
    updateOrbColors(current);
    updateActiveNav(current);
  }
}, { passive: true });
