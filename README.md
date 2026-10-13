# K's Antarvan — site

Static site, no dependencies. Edit the sources in `src/`, then:

    python tools/build.py

That stitches `src/layout.html` + `src/partials/*.html` + `src/pages/*.html` into
the flat `*.html` files at the root. Then serve the folder with any static server (`python -m http.server`) —
the page scripts are ES modules, so they do not load over `file://`. Opened
straight from disk the site still reads correctly; it just loses the menu
filtering and the scroll animation.

- `css/style.css` — the whole stylesheet.
- `js/core.js` — nav, sticky header, scroll reveals.
- `js/motion.js` — the motion layer: word-by-word headings, parallax, the
  header that tucks away, the pointer lamp on dark sections, the photo
  lightbox, and the open/closed pill that reads the clock in Asia/Kolkata.
  It plays elements in off a scroll-driven rect check rather than
  IntersectionObserver, so a throttled or backgrounded tab can never leave a
  heading stuck invisible, and the whole layer switches itself off under
  `prefers-reduced-motion`.
- `js/menu-data.js` — every dish, transcribed from the PDFs in `assets/menus/`.
- `js/pages/*.js` — one entry per page; `menu.js` renders and filters the menu.
- `_research/` — notes behind the copy, with sources and the two open questions
  (exact closing time, which phone number is current). Read `_research/notes.md`
  before changing any factual copy.
