document.getElementById('year').textContent = new Date().getFullYear();

const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.getElementById('primary-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  primaryNav.classList.toggle('is-open', !isOpen);
});

primaryNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    primaryNav.classList.remove('is-open');
  });
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.scroll-reveal');

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -45px' });
  revealItems.forEach((item) => revealObserver.observe(item));

  const orbit = document.querySelector('.hero-orbit');
  let ticking = false;
  const moveOrbit = () => {
    const offset = Math.min(window.scrollY * 0.11, 80);
    orbit.style.transform = `translate3d(0, ${offset}px, 0)`;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(moveOrbit);
      ticking = true;
    }
  }, { passive: true });
}

const query = new URLSearchParams(window.location.search);
if (query.get('message') === 'sent') {
  const success = document.querySelector('.form-success');
  success.hidden = false;
  history.replaceState({}, '', `${window.location.pathname}#contact`);
}


const tourTrack = document.querySelector('.tour-track');
const moveTour = (direction) => {
  if (!tourTrack) return;
  const card = tourTrack.querySelector('figure');
  const gap = 18;
  tourTrack.scrollTo({ left: Math.max(0, Math.min(tourTrack.scrollWidth - tourTrack.clientWidth, tourTrack.scrollLeft + direction * ((card?.getBoundingClientRect().width || 340) + gap))), behavior: reducedMotion ? 'auto' : 'smooth' });
};
document.querySelector('.tour-prev')?.addEventListener('click', () => moveTour(-1));
document.querySelector('.tour-next')?.addEventListener('click', () => moveTour(1));
