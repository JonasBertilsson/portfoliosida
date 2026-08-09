// Live klocka — visar lokal tid i Linköping/Sverige oavsett var besökaren är
const clockEl = document.getElementById('clock');

function updateClock() {
  if (!clockEl) return;
  const now = new Date();
  const time = new Intl.DateTimeFormat('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Stockholm'
  }).format(now);
  clockEl.textContent = time;
}

updateClock();
setInterval(updateClock, 1000 * 15);

// Nav: bakgrund + blur när man scrollat ner, samt highlight av aktiv sektion
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav__links a');
const sections = document.querySelectorAll('main section[id]');

window.addEventListener('scroll', () => {
  nav.classList.toggle('is-scrolled', window.scrollY > 40);
}, { passive: true });

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => link.classList.remove('active'));
      const active = document.querySelector(`.nav__links a[data-target="${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

sections.forEach((section) => navObserver.observe(section));

// Subtil parallax på hero-bilden
const heroBg = document.querySelector('.hero__bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const offset = Math.min(window.scrollY, 800);
    heroBg.style.transform = `scale(1.08) translateY(${offset * 0.12}px)`;
  }, { passive: true });
}

// Scroll-reveal med stagger
const revealTargets = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('is-visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach((el) => revealObserver.observe(el));