import { playIn } from './motion.js';

/* Shared behaviour: the mobile nav, the sticky-nav shade and scroll reveals.
   Everything here degrades to a perfectly readable page without JS. */

const nav = document.getElementById('nav');
const toggle = document.getElementById('navToggle');
const menu = document.getElementById('navMenu');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('is-open', !open);
  });
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
    }
  });
}

if (nav) {
  const shade = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
  shade();
  addEventListener('scroll', shade, { passive: true });
}

const motionOK = !matchMedia('(prefers-reduced-motion: reduce)').matches;

export function reveal(root = document) {
  const targets = root.querySelectorAll('.reveal:not(.is-in)');
  if (!motionOK) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }
  targets.forEach((el) => playIn(el, 'is-in'));
}

window.__antarvanReady = true;
reveal();
