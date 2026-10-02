# Builds each standalone article page: shell + page + diagrams + inlined Geist font.
# Usage: python3 articles/src/build.py  -> articles/<slug>/index.html next to its images/
import os, re, html
here = os.path.dirname(os.path.abspath(__file__)); root = os.path.dirname(here)
r = lambda *p: open(os.path.join(*p)).read()
ARTICLES = {
    'only-designer': dict(title='The Only Designer in the Room', tag='AI Transformation', date='September 2026',
        card='The Only Designer in the Room: How I Scaled Design Across Sales, Marketing and Client Delivery'),
    'prototypes-that-ship': dict(title='Prototypes That Ship', tag='AI Transformation', date='September 2026',
        card="Prototypes That Ship: How I Moved Strategyzer's Product Discovery into Code"),
}
def read_time(page):
    body = re.search(r'<article class="prose">(.*?)</article>', page, re.S).group(1)
    words = len(html.unescape(re.sub(r'<[^>]+>', ' ', body)).split())
    return max(1, round(words / 230)), words
times = {s: read_time(r(root, s, 'src', 'page.html')) for s in ARTICLES}
for slug, a in ARTICLES.items():
    other = next(s for s in ARTICLES if s != slug); o = ARTICLES[other]
    end = f'''    <section class="end" aria-label="Read next">
      <div class="lab">Read next</div>
      <div class="grid">
        <a class="acard" href="#" data-article="{other}"><span class="card-bg" aria-hidden="true"></span>
          <div class="row"><span class="tagpill">{o['tag']}</span><span>{times[other][0]} Min Read</span></div>
          <h3>{html.escape(o['card'])}</h3>
          <div class="foot"><span>{o['date']}</span><span class="go">Read Article <i aria-hidden="true">→</i></span></div>
        </a>
        <a class="homecard" href="#" data-home><span>Back to the portfolio<strong>Selected work and writing</strong></span><span class="go">Home →</span></a>
      </div>
    </section>'''
    page = r(root, slug, 'src', 'page.html').replace('__READ__', f'{times[slug][0]} min read').replace('__END__', end)
    s = r(here, 'shell.html').replace('__TITLE__', a['title']).replace('__DIAGRAMS__', r(here, 'diagrams.css')).replace('__PAGE__', page)
    open(os.path.join(root, slug, 'index.html'), 'w').write(s.replace('__GEIST__', r(here, 'geist.b64').strip()))
    print('built', slug, times[slug])
