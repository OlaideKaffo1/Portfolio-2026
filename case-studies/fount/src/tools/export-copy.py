# Exports the page's copy to copy/fount-copy-final.md, with every tab, toggle and pinned decision written out.
# Run from case-studies/fount after python3 src/build.py.
import re, html

def clean(x):
    x = re.sub(r'<cite[^>]*>', ' — ', x)
    x = re.sub(r'<[^>]+>', ' ', x)
    x = re.sub(r'\s+', ' ', html.unescape(x)).strip()
    return re.sub(r'\s+([,.;:!?%])', r'\1', x)

sh = open("src/shell.html").read(); se = open("src/sections.html").read()
head = sh[sh.index('<header class="top"'):sh.index('__SECTIONS__')]
tail = sh[sh.index('__SECTIONS__') + len('__SECTIONS__'):]
tail = tail[:tail.index('</article>')] if '</article>' in tail else tail[:tail.index('<script')]
src = head + se + tail
src = re.sub(r'<script.*?</script>|<style.*?</style>', '', src, flags=re.S)
src = re.sub(r'<button[^>]*class="xp-pin".*?</button>', '', src)
src = re.sub(r'<div class="xp-k">.*?</div>|<button type="button" class="xp-(reset|full)".*?</button>', '', src, flags=re.S)
src = re.sub(r'<div class="step-tabs".*?</div>', '', src, flags=re.S)

out = []
tok = re.compile(r'<h1[^>]*>(.*?)</h1>|<h2[^>]*>(.*?)</h2>|<h3[^>]*>(.*?)</h3>|data-caption="([^"]*)"|<img [^>]*src="images/([^"]+)"|'
                 r'<li><button type="button" class="xp-item"[^>]*><span class="n">(\d+)</span><span class="tx">(.*?)</span></button></li>|'
                 r'<b>([^<]+)</b>(?=<p)|<(p|blockquote|cite|figcaption|dt|dd)\b[^>]*>(.*?)</\9>|<div class="(k|v|what|ctx|vx-k|layer-k|fig-head|lab|eyebrow|grp-h|bn-k|fill|fill after)"[^>]*>(.*?)</div>|<li[^>]*>(.*?)</li>', re.S)
for m in tok.finditer(src):
    g = m.groups()
    if g[0]: out.append(f"\n# {clean(g[0])}\n")
    elif g[1]: out.append(f"\n## {clean(g[1])}\n")
    elif g[2]: out.append(f"\n### {clean(g[2])}\n")
    elif g[3]: out.append(f"\n**Tab · {clean(g[3])}**\n")
    elif g[4]: out.append(f"*Image: {g[4]}*")
    elif g[5]: out.append(f"{g[5]}. {clean(g[6])}")
    elif g[7]: out.append(f"**{clean(g[7])}**")
    elif g[8]:
        t = clean(g[9])
        if t: out.append(("> " if g[8] == "blockquote" else "— " if g[8] == "cite" else "*" if g[8] == "figcaption" else "") + t + ("*" if g[8] == "figcaption" else ""))
    elif g[10]:
        t = clean(g[11])
        if t: out.append(f"**{t}**" if g[10] in ("vx-k", "layer-k", "fig-head", "eyebrow", "grp-h", "k") else t)
    elif g[12] is not None:
        t = clean(g[12])
        if t: out.append(f"- {t}")
md = "\n".join(out)
md = re.sub(r'\n{3,}', '\n\n', md).strip() + "\n"
open("copy/fount-copy-final.md", "w").write("# Fount case study: final copy\n\nExported from the built page by `src/tools/export-copy.py`. Every tab, toggle and pinned decision is written out.\n\n" + md)
print("written", len(md.splitlines()), "lines")
