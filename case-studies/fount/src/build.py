# Builds the standalone case study page: shell + sections + diagrams + tree + inlined Geist font.
# Usage: python3 src/build.py  (from case-studies/strattie) -> index.html next to images/
import os
here = os.path.dirname(os.path.abspath(__file__)); root = os.path.dirname(here)
r = lambda n: open(os.path.join(here, n)).read()
s = r('shell.html').replace('__DIAGRAMS__', r('diagrams.css')).replace('__SECTIONS__', r('sections.html')).replace('__TREE__', r('tree.js'))
open(os.path.join(root, 'index.html'), 'w').write(s.replace('__GEIST__', r('geist.b64').strip()))
print('built', os.path.join(root, 'index.html'))
