"""Stitch src/layout.html + src/pages/*.html into the static pages at the root.

Each page file starts with a small header block:

    <!--
    title: Menu — K's Antarvan
    description: ...
    script: js/pages/menu.js
    -->

Any other key in that block (e.g. head) is dropped into {{key}} in the layout.
Run:  python tools/build.py
"""
import pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / 'src'
layout = (SRC / 'layout.html').read_text(encoding='utf-8')
partials = {p.stem: p.read_text(encoding='utf-8') for p in (SRC / 'partials').glob('*.html')}


def render(page_file):
    raw = page_file.read_text(encoding='utf-8')
    m = re.match(r'\s*<!--(.*?)-->\s*', raw, re.S)
    meta, body = {}, raw
    if m:
        body = raw[m.end():]
        key = None
        for line in m.group(1).splitlines():
            km = re.match(r'^(\w+):\s?(.*)$', line)
            if km:
                key = km.group(1); meta[key] = km.group(2)
            elif key and line.strip():
                meta[key] += '\n' + line
    page = page_file.stem
    meta.setdefault('page', page)
    meta.setdefault('script', 'js/pages/%s.js' % page)
    meta['content'] = body
    out = layout
    # partials first: {{> name}}
    out = re.sub(r'\{\{>\s*(\w+)\s*\}\}', lambda k: partials.get(k.group(1), ''), out)
    out = re.sub(r'\{\{(\w+)\}\}', lambda k: meta.get(k.group(1), ''), out)
    # mark the current page in every nav
    out = re.sub(rf'data-nav="{page}"', f'data-nav="{page}" aria-current="page"', out)
    (ROOT / f'{page}.html').write_text(out, encoding='utf-8')
    print('built', f'{page}.html')


for f in sorted((SRC / 'pages').glob('*.html')):
    render(f)
