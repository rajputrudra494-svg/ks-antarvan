/* The motion layer. Everything here is additive: with JS off, or with
   prefers-reduced-motion, the page still reads exactly the same. */

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse = matchMedia('(hover: none)').matches;

/* ---------- headings that rise a word at a time ---------- */
export function splitHeadings(root = document) {
  root.querySelectorAll('[data-split]:not([data-split-done])').forEach((el) => {
    el.setAttribute('data-split-done', '');
    if (reduce) {
      // no animation wanted: show the heading as it is, unsplit
      el.classList.add('is-split', 'is-shown');
      return;
    }
    const walk = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part.trim()) return frag.append(part);
            const outer = document.createElement('span');
            outer.className = 'w';
            const inner = document.createElement('span');
            inner.className = 'w__i';
            inner.textContent = part;
            outer.append(inner);
            frag.append(outer);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1 && child.tagName !== 'BR') {
          walk(child);
        }
      });
    };
    walk(el);
    el.querySelectorAll('.w__i').forEach((w, i) => {
      w.style.transitionDelay = (i * 55) + 'ms';
    });
    el.classList.add('is-split');
    watch(el);
  });
}

/* Elements play themselves in as they arrive. This runs off scroll rather
   than IntersectionObserver: an observer can stay silent while the tab is
   backgrounded or throttled, and a heading that never fires would stay
   invisible. A rect check always answers. */
const queue = [];

function watch(el, cls = 'is-shown') {
  queue.push({ el, cls });
  check();
}

let queued = false;
function check() {
  if (queued) return;
  queued = true;
  // rAF is paused while the tab is hidden, so fall back to a timer there:
  // a page loaded in a background tab is then already correct on arrival.
  const schedule = document.hidden
    ? (fn) => setTimeout(fn, 60)
    : (fn) => requestAnimationFrame(fn);
  schedule(() => {
    queued = false;
    const edge = innerHeight * 0.92;
    for (let i = queue.length - 1; i >= 0; i--) {
      const { el, cls } = queue[i];
      if (!el.isConnected) { queue.splice(i, 1); continue; }   // re-rendered away
      const r = el.getBoundingClientRect();
      if (r.top < edge && r.bottom > -80) {
        el.classList.add(cls);
        queue.splice(i, 1);
      }
    }
  });
}

addEventListener('scroll', check, { passive: true });
addEventListener('resize', check);
addEventListener('load', check);
document.addEventListener('visibilitychange', check);
setTimeout(check, 300);

export { watch as playIn };

/* ---------- parallax: images drift slower than the page ---------- */
const layers = [...document.querySelectorAll('[data-parallax]')];
let ticking = false;

function parallax() {
  ticking = false;
  const vh = innerHeight;
  layers.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.bottom < -200 || r.top > vh + 200) return;
    const speed = parseFloat(el.dataset.parallax) || 0.12;
    const progress = (r.top + r.height / 2 - vh / 2) / vh;
    el.style.setProperty('--py', (-progress * speed * 100).toFixed(2) + 'px');
  });
}

if (layers.length && !reduce) {
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(parallax);
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  parallax();
}

/* ---------- the header steps out of the way going down ---------- */
const nav = document.getElementById('nav');
if (nav) {
  let last = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY;
    const menuOpen = document.getElementById('navMenu')?.classList.contains('is-open');
    if (!menuOpen && y > 240) nav.classList.toggle('is-tucked', y > last + 4);
    else nav.classList.remove('is-tucked');
    last = y;
  }, { passive: true });
}

/* ---------- a lamp that follows the pointer across dark sections ---------- */
if (!reduce && !coarse) {
  document.querySelectorAll('[data-glow]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--gx', ((e.clientX - r.left) / r.width * 100) + '%');
      el.style.setProperty('--gy', ((e.clientY - r.top) / r.height * 100) + '%');
      el.classList.add('is-lit');
    });
    el.addEventListener('pointerleave', () => el.classList.remove('is-lit'));
  });
}

/* ---------- open now / closed, computed in Surat time ---------- */
export function openState() {
  const host = document.querySelectorAll('[data-open-state]');
  if (!host.length) return;
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false
  }).formatToParts(now);
  const h = +parts.find((p) => p.type === 'hour').value;
  const m = +parts.find((p) => p.type === 'minute').value;
  const mins = h * 60 + m;
  const open = mins >= 12 * 60;           // noon to midnight
  const closingSoon = open && mins >= 23 * 60;
  const until = open
    ? (closingSoon ? 'closing at midnight' : 'open until midnight')
    : 'opens at noon';
  host.forEach((el) => {
    el.textContent = (open ? 'Open now' : 'Closed') + ' \u00b7 ' + until;
    el.classList.toggle('is-open', open);
    el.classList.toggle('is-soon', closingSoon);
    el.hidden = false;
  });
}

/* ---------- a lightbox for the photo tiles ---------- */
export function lightbox(selector = '.tile') {
  const tiles = [...document.querySelectorAll(selector)];
  if (!tiles.length) return;
  const box = document.createElement('div');
  box.className = 'lb';
  box.innerHTML = `
    <button class="lb__close" aria-label="Close">&times;</button>
    <button class="lb__nav lb__nav--prev" aria-label="Previous">&#8249;</button>
    <figure class="lb__fig"><img alt=""><figcaption></figcaption></figure>
    <button class="lb__nav lb__nav--next" aria-label="Next">&#8250;</button>`;
  document.body.append(box);
  const img = box.querySelector('img');
  const cap = box.querySelector('figcaption');
  let i = 0;
  let opener = null;

  const show = (n) => {
    i = (n + tiles.length) % tiles.length;
    const source = tiles[i].querySelector('img');
    img.src = source.currentSrc || source.src;
    img.alt = source.alt;
    cap.textContent = tiles[i].querySelector('figcaption')?.textContent || '';
  };
  const open = (n, from) => {
    opener = from;
    show(n);
    box.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    box.querySelector('.lb__close').focus();
  };
  const close = () => {
    box.classList.remove('is-open');
    document.body.style.overflow = '';
    opener?.focus();
  };

  tiles.forEach((tile, n) => {
    const btn = tile.querySelector('img');
    if (!btn) return;
    tile.classList.add('is-zoomable');
    tile.setAttribute('tabindex', '0');
    tile.setAttribute('role', 'button');
    tile.setAttribute('aria-label', 'Enlarge photo');
    tile.addEventListener('click', () => open(n, tile));
    tile.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(n, tile); }
    });
  });

  box.querySelector('.lb__close').addEventListener('click', close);
  box.querySelector('.lb__nav--prev').addEventListener('click', () => show(i - 1));
  box.querySelector('.lb__nav--next').addEventListener('click', () => show(i + 1));
  box.addEventListener('click', (e) => { if (e.target === box) close(); });
  addEventListener('keydown', (e) => {
    if (!box.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show(i + 1);
    if (e.key === 'ArrowLeft') show(i - 1);
  });
}

splitHeadings();
openState();
