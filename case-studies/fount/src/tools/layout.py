# Applies the approved layout changes to the Fount page:
# A) each old-way illustration sits at half width beside its Before/Now cards (layers renumber),
# B) the Fount AI results as before-and-after bars in Results.
# Run once from case-studies/fount after the other tools, then python3 src/build.py.
import re, os
S = "src"
p = os.path.join(S, "sections.html"); s = open(p).read()
assert 'class="bn ' not in s, "already applied"
# A: old-way illustration sits beside Before/Now at half width; layers renumber
pat = re.compile(r'        <div class="vx-cmp vxb rv">\n(?P<cards>.*?)        </div>\n        <div class="layers">\n          <figure class="layer m"><div class="layer-k"><span>1</span>Before</div>(?P<body>.*?)</figure>\n', re.S)
def rep(m):
    cards = re.findall(r'          (<div class="vx-side.*?</div><p>.*?</p></div>)\n', m.group("cards"))
    assert len(cards) == 2, cards
    return ('        <div class="bn vxb rv">' + cards[0].replace('class="vx-side weak"', 'class="vx-side weak bn-b"')
            + '<figure class="bn-fig m">' + m.group("body") + '</figure>'
            + cards[1].replace('class="vx-side"', 'class="vx-side bn-n"') + '</div>\n        <div class="layers">\n')
s, n = pat.subn(rep, s); print("A features", n)
parts = s.split('<h3 class="sl">')
for i, part in enumerate(parts):
    if 'class="bn vxb' in part:
        part = part.replace('<div class="layer-k"><span>2</span>', '<div class="layer-k"><span>1</span>').replace('<div class="layer-k"><span>3</span>', '<div class="layer-k"><span>2</span>')
        parts[i] = part
s = '<h3 class="sl">'.join(parts)

# B: Fount AI result as before/after bars
a = ' With Fount AI, HR’s time spent analysing data fell from 14 hours a week to 3.'
assert a in s; s = s.replace(a, '')
bars = '''        <figure class="sheet-fig ai-bars">
          <div class="fig-head"><b>Fount AI, after 3 months</b><span>Measured with our customers, three months after launch.</span></div>
          <div class="panel funnel rv">
            <div class="grp-h"><b>Time from spotting an issue to resolving it</b><em>77% faster</em></div>
            <div class="row"><div class="lab">Before</div><div class="track"><div class="fill" style="width:100%">6.2 weeks</div></div></div>
            <div class="row"><div class="lab">With Fount AI</div><div class="track"><div class="fill after" style="width:22.6%">1.4 wks</div></div></div>
            <div class="grp-h"><b>HR time spent analysing data, each week</b><em>79% less</em></div>
            <div class="row"><div class="lab">Before</div><div class="track"><div class="fill" style="width:100%">14 hours</div></div></div>
            <div class="row"><div class="lab">With Fount AI</div><div class="track"><div class="fill after" style="width:21.4%">3 hrs</div></div></div>
          </div>
        </figure>
'''
a = '        <h3 class="sl" id="said">'
assert a in s; s = s.replace(a, bars + a, 1)

open(p, "w").write(s)
c = open(os.path.join(S, "diagrams.css")).read()
c += '''  /* Old way beside Before/Now: the illustration at half width, so the real screens lead */
  .bn { display: grid; grid-template-columns: minmax(0, 1fr); gap: 12px; margin-top: 20px !important; }
  @container (min-width: 700px) { .bn { grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); grid-template-rows: auto 1fr; grid-template-areas: "fig b" "fig n"; gap: 12px 16px; } .bn .vx-side { align-self: start; } .bn-fig { grid-area: fig; } .bn-b { grid-area: b; } .bn-n { grid-area: n; } }
  .bn-fig { margin: 0; }
  .bn-fig .xp-media.framed { padding: 16px; }
  .bn .vx-side p:first-of-type { margin-top: 8px !important; }
  /* Fount AI results: before and after bars */
  .ai-bars .funnel { padding: 24px 20px; }
  .ai-bars .grp-h { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin: 0 0 10px; font-size: 14px; line-height: 20px; }
  .ai-bars .grp-h b { font-weight: 500; }
  .ai-bars .grp-h em { font-style: normal; white-space: nowrap; font-size: 22px; letter-spacing: -0.02em; color: var(--ink); }
  .ai-bars .row + .grp-h { margin-top: 26px; }
  @container (max-width: 599px) { .ai-bars .grp-h { flex-direction: column; gap: 2px; } .ai-bars .grp-h em { font-size: 18px; } }
  .ai-bars .row + .row { margin-top: 8px !important; }
  html.motion .ai-bars .funnel .row:nth-child(5) .fill { transition-delay: 900ms; }
  html.motion .ai-bars .funnel .row:nth-child(6) .fill { transition-delay: 1250ms; }
  html.motion .ai-bars .funnel .row:nth-child(3) .fill { transition-delay: 600ms; }
  html.motion .ai-bars .funnel .row:nth-child(2) .fill { transition-delay: 250ms; }
'''
open(os.path.join(S, "diagrams.css"), "w").write(c)
print("ok")
