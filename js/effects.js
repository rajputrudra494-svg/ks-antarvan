/* The effects layer: rain on the glass, the curtain between pages, the lamp
   cursor, scroll-linked chrome. One rAF loop drives all of it, it pauses when
   nothing is on screen, and prefers-reduced-motion switches the whole file off. */

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
const lerp = (a, b, n) => a + (b - a) * n;

/* ---------------- one loop for everything ---------------- */
const jobs = new Set();
let running = false;

export function every(fn) {
  jobs.add(fn);
  if (!running) { running = true; requestAnimationFrame(tick); }
  return () => jobs.delete(fn);
}

function tick(t) {
  jobs.forEach((fn) => fn(t));
  if (jobs.size) requestAnimationFrame(tick);
  else running = false;
}

/* ---------------- rain down the glasshouse roof ---------------- */
export function rain(host) {
  if (!host || reduce) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'rain';
  canvas.setAttribute('aria-hidden', 'true');
  host.append(canvas);
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, drops = [], beads = [], visible = true;

  const size = () => {
    const r = host.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.width = Math.round(r.width * dpr);
    h = canvas.height = Math.round(r.height * dpr);
    canvas.style.width = r.width + 'px';
    canvas.style.height = r.height + 'px';
    ctx.scale(1, 1);
    const n = Math.round((r.width * r.height) / 6500);
    drops = Array.from({ length: Math.min(n, 230) }, () => seed(true));
    beads = Array.from({ length: Math.min(Math.round(n / 5), 26) }, bead);
  };

  const seed = (anywhere) => ({
    x: Math.random() * w,
    y: anywhere ? Math.random() * h : -40,
    len: 12 + Math.random() * 46,
    sp: 7 + Math.random() * 13,
    a: .1 + Math.random() * .34,
    tilt: 0.18 + Math.random() * 0.1
  });

  const bead = () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 1.2 + Math.random() * 3.4,
    sp: .08 + Math.random() * .5,
    a: .14 + Math.random() * .3,
    wait: Math.random() * 240
  });

  size();
  addEventListener('resize', size);
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 }).observe(host);

  every(() => {
    if (!visible) return;
    ctx.clearRect(0, 0, w, h);
    ctx.lineCap = 'round';
    for (const d of drops) {
      ctx.strokeStyle = `rgba(246, 241, 230, ${d.a})`;
      ctx.lineWidth = d.len > 40 ? 1.4 : 1;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x + d.len * d.tilt, d.y + d.len);
      ctx.stroke();
      d.y += d.sp;
      d.x += d.sp * d.tilt;
      if (d.y > h) Object.assign(d, seed(false), { x: Math.random() * w });
    }
    for (const b of beads) {
      ctx.fillStyle = `rgba(246, 241, 230, ${b.a})`;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
      if (b.wait > 0) { b.wait--; continue; }
      b.y += b.sp;
      b.sp *= 1.012;
      if (b.y - b.r > h) Object.assign(b, bead(), { y: -10, sp: .08 });
    }
  });
}

/* ---------------- the curtain: intro, and between pages ---------------- */
export function curtain() {
  const el = document.createElement('div');
  el.className = 'curtain';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML = '<span class="curtain__mark" lang="hi">अंतर्वन</span>';
  document.body.prepend(el);

  const first = (() => {
    try {
      if (sessionStorage.getItem('ka-seen')) return false;
      sessionStorage.setItem('ka-seen', '1');
      return true;
    } catch (e) { return false; }
  })();

  document.body.classList.add(first && !reduce ? 'is-entering' : 'is-here');
  if (first && !reduce) {
    setTimeout(() => {
      document.body.classList.remove('is-entering');
      document.body.classList.add('is-here');
    }, 1150);
  }

  // Page-to-page motion is handed to the browser's own cross-document view
  // transitions (see @view-transition in the stylesheet). Intercepting clicks
  // and navigating from a timer is how a site ends up unclickable when that
  // timer never gets to run; the browser cannot get this wrong.
}

/* ---------------- a lamp for a cursor ---------------- */
export function cursor() {
  if (!fine || reduce) return;
  const dot = document.createElement('div');
  const ring = document.createElement('div');
  dot.className = 'cur cur--dot';
  ring.className = 'cur cur--ring';
  document.body.append(dot, ring);

  let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
  addEventListener('pointermove', (e) => {
    x = e.clientX; y = e.clientY;
    dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    const over = e.target.closest('a, button, .tile, .room, .plate, input, .dish');
    ring.classList.toggle('is-big', !!over);
    ring.classList.toggle('is-zoom', !!e.target.closest('.tile'));
  }, { passive: true });
  addEventListener('pointerdown', () => ring.classList.add('is-down'));
  addEventListener('pointerup', () => ring.classList.remove('is-down'));
  document.addEventListener('pointerleave', () => ring.classList.add('is-out'));
  document.addEventListener('pointerenter', () => ring.classList.remove('is-out'));

  every(() => {
    rx = lerp(rx, x, .16);
    ry = lerp(ry, y, .16);
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
  });
}

/* ---------------- a brass line that tracks the page ---------------- */
export function progress() {
  const bar = document.createElement('div');
  bar.className = 'progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.append(bar);
  const set = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(scrollY / max, 1) : 0})`;
  };
  addEventListener('scroll', set, { passive: true });
  addEventListener('resize', set);
  set();
}

/* ---------------- buttons that lean toward the pointer ---------------- */
export function magnetic(selector = '.btn, .nav__cta') {
  if (!fine || reduce) return;
  document.querySelectorAll(selector).forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.transform = `translate(${dx * 10}px, ${dy * 7}px)`;
    });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
  });
}

/* ---------------- cards that tip toward the pointer ---------------- */
export function tilt(selector = '.plate, .tile, .room') {
  if (!fine || reduce) return;
  document.querySelectorAll(selector).forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.setProperty('--rx', (-dy * 5).toFixed(2) + 'deg');
      el.style.setProperty('--ry', (dx * 6).toFixed(2) + 'deg');
      el.classList.add('is-tilting');
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
      el.classList.remove('is-tilting');
    });
  });
}

/* ---------------- numbers that count up ---------------- */
export function counters(root = document) {
  root.querySelectorAll('[data-count]:not([data-counted])').forEach((el) => {
    el.setAttribute('data-counted', '');
    const to = +el.dataset.count;
    if (reduce) { el.textContent = to; return; }
    let shown = false;
    const run = () => {
      if (shown) return;
      const r = el.getBoundingClientRect();
      if (r.top > innerHeight * .95 || r.bottom < 0) return;
      shown = true;
      el.textContent = '0';
      const t0 = performance.now();
      const stop = every((t) => {
        const p = Math.min((t - t0) / 1400, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(to * eased);
        if (p === 1) stop();
      });
    };
    addEventListener('scroll', run, { passive: true });
    run();
  });
}

/* ---------------- back to the top ---------------- */
export function toTop() {
  const btn = document.createElement('button');
  btn.className = 'totop';
  btn.type = 'button';
  btn.innerHTML = '<span aria-hidden="true">\u2191</span><span class="sr">Back to top</span>';
  document.body.append(btn);
  btn.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));
  const show = () => btn.classList.toggle('is-on', scrollY > innerHeight * .8);
  addEventListener('scroll', show, { passive: true });
  show();
}

/* ---------------- the marquee leans with the scroll ---------------- */
export function liveMarquee() {
  const track = document.querySelector('.marquee__track');
  if (!track || reduce) return;
  let last = scrollY, v = 0;
  addEventListener('scroll', () => { v += (scrollY - last) * .04; last = scrollY; }, { passive: true });
  every(() => {
    v = lerp(v, 0, .06);
    track.style.setProperty('--skew', Math.max(-6, Math.min(6, v)).toFixed(2) + 'deg');
    track.style.setProperty('--rate', (1 + Math.min(Math.abs(v) / 6, 1.6)).toFixed(2));
  });
}

/* ---------------- the jump nav follows the course you are reading ------- */
export function spy(navSel, sectionSel) {
  const links = [...document.querySelectorAll(navSel)];
  if (!links.length) return;
  const find = () => {
    const sections = [...document.querySelectorAll(sectionSel)];
    let active = sections[0];
    for (const s of sections) {
      if (s.getBoundingClientRect().top <= innerHeight * .35) active = s;
    }
    links.forEach((a) => {
      const on = active && a.getAttribute('href') === '#' + active.id;
      a.classList.toggle('is-here', !!on);
      if (on) a.scrollIntoView({ block: 'nearest', inline: 'center' });
    });
  };
  addEventListener('scroll', find, { passive: true });
  find();
  return find;
}
