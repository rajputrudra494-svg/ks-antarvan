import { reveal } from '../core.js';
import { food, drinks } from '../menu-data.js';

const lists = { food, drinks };
const out = document.getElementById('courses');
const jump = document.getElementById('jump');
const tabs = [...document.querySelectorAll('.tab')];
const search = document.getElementById('menuSearch');
const empty = document.getElementById('menuEmpty');

let current = 'food';

const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

function dish(item) {
  const tags = (item.tags || [])
    .map((t) => `<span class="tag tag--${t}">${t === 'new' ? 'New' : esc(t)}</span>`)
    .join('');
  return `<div class="dish" data-find="${esc((item.n + ' ' + (item.d || '')).toLowerCase())}">
      <h3 class="dish__name">${esc(item.n)}${tags}</h3>
      ${item.d ? `<p class="dish__desc">${esc(item.d)}</p>` : ''}
    </div>`;
}

function render(which) {
  current = which;
  const sections = lists[which];
  out.innerHTML = sections.map((s) => `
    <section class="course reveal" id="${s.id}">
      <div class="course__head">
        <h2>${esc(s.name)}</h2>
        ${s.note ? `<p class="course__note">${esc(s.note)}</p>` : ''}
      </div>
      <div class="dishes">${s.items.map(dish).join('')}</div>
    </section>`).join('');
  jump.innerHTML = sections
    .map((s) => `<a href="#${s.id}">${esc(s.name + (s.note ? ' · ' + s.note : ''))}</a>`)
    .join('');
  tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.list === which)));
  reveal(out);
  filter();
}

function filter() {
  const q = (search.value || '').trim().toLowerCase();
  let hits = 0;
  out.querySelectorAll('.course').forEach((course) => {
    let shown = 0;
    course.querySelectorAll('.dish').forEach((d) => {
      const match = !q || d.dataset.find.includes(q);
      d.classList.toggle('is-hidden', !match);
      if (match) shown++;
    });
    course.classList.toggle('is-hidden', shown === 0);
    hits += shown;
  });
  empty.hidden = hits > 0;
  jump.hidden = !!q;
}

tabs.forEach((t) => t.addEventListener('click', () => render(t.dataset.list)));
search.addEventListener('input', filter);

render('food');
