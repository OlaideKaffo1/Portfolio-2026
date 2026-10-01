# Regenerates feature 4's design tabs (screens, pins and decisions) inside src/sections.html.
# Run from case-studies/strategyzer-saas, then python3 src/build.py. Coordinates are % of each image.

from html import escape
p = "src/sections.html"
s = open(p).read()
i = s.index('id="f4-t1"'); i = s.rfind('<figure', 0, i); j = s.index('</figure>', i) + 9
tabs = [
 ("Breadcrumbs", "The path at the top of every workspace", "bc-crumbs",
  "The top of a workspace. A breadcrumb reads Olaide’s Project, then Strong Value Propositions and…, then Design your A/B test to identify…, with a small circled arrow after each of the last two. Undo and redo sit below, over an empty canvas.",
  [("The full path, always there.", "Project, run and workspace sit in one line at the top of every workspace.", "5.3,1.9,56.2,6.4", (61.8, 5.1)),
   ("A clear way back.", "The project name, with a folder icon, replaces the logo as the way out, and says where it goes.", "6.2,3.6,10.6,3.2", (17.0, 5.2)),
   ("Each step opens a menu.", "The circled arrow shows that a step opens a menu, not just a link.", "18.0,3.6,19.2,3.2", (37.4, 3.6)),
   ("You are here.", "The current workspace is in dark text and the steps above it are grey. Long names are shortened so the path fits on one line.", "38.4,3.6,19.6,3.2", (58.4, 3.6))]),
 ("Playbook runs", "One level down: every run in the project", "bc-runs",
  "The breadcrumb with the run menu open below it. Under the heading Playbook Runs it lists Customer Interviews, Strong Value Propositions and Differentiation with Gen AI with a tick, and Competing on Business Models, each with an arrow.",
  [("Every run in the project.", "Opening the run step lists all the playbook runs in this project.", "19.1,9.6,34.3,16.9", (53.8, 11.0)),
   ("Names in full.", "Names are shortened in the breadcrumb, but shown whole in the menu.", "19.7,18.6,26.0,2.8", (46.0, 18.0)),
   ("A tick for where you are.", "The run you’re in is ticked, so you can see your place before you move.", "48.2,18.2,2.4,3.0", (46.8, 23.4)),
   ("An arrow means more inside.", "Each run has an arrow, showing it opens its own list of workspaces.", "50.9,14.6,1.7,10.6", (53.0, 25.6))]),
 ("Workspaces", "Two levels down: every workspace in a run", "bc-workspaces",
  "The run menu with Strong Value Propositions and Differentiation with Gen AI highlighted in blue. Beside it, a Workspaces menu lists Learn how customers are using your product, Design your A/B test to identify bottlenecks and gaps with a tick, and Upskill your team with Gen AI.",
  [("Hover to open.", "Hovering a run highlights it and opens its workspaces beside it, with no extra click.", "19.7,18.6,32.8,2.8", (53.6, 16.8)),
   ("Every workspace in the run.", "Pick one and you’re there, without going back to the project first.", "54.5,19.2,29.1,16.9", (84.0, 20.6)),
   ("Two ticks, two levels.", "Ticks mark both the current run and the current workspace, so you always know where you started.", "81.2,27.8,2.6,3.2", (85.2, 29.4))]),
]
btn = []; pan = []
for k, (name, cap, img, alt, items) in enumerate(tabs, 1):
    sel = "true" if k == 1 else "false"
    ti = "" if k == 1 else ' tabindex="-1"'
    on = " on" if k == 1 else ""
    btn.append(f'<button type="button" role="tab" id="f4-t{k}" aria-controls="f4-p{k}" aria-selected="{sel}"{ti}>{name}</button>')
    pins = "".join(f'<button type="button" class="xp-pin" data-i="{n}" style="--px:{px}%;--py:{py}%;--k:{n}" aria-label="{n+1}: {escape(b)}" tabindex="-1">{n+1}</button>' for n, (b, x, r, (px, py)) in enumerate(items))
    lis = "".join(f'<li><button type="button" class="xp-item" data-i="{n}" aria-pressed="false" data-r="{r}"><span class="n">{n+1}</span><span class="tx"><b>{b}</b> {x}</span></button></li>' for n, (b, x, r, _) in enumerate(items))
    pan.append(f'<div class="step-panel{on}" role="tabpanel" id="f4-p{k}" aria-labelledby="f4-t{k}" data-caption="{name}: {cap}"><div class="xp" data-xp><div class="xp-media framed"><div class="xp-win"><div class="shot" data-zoom aria-label="View full size" style="--ar:1.5326"><img src="images/{img}.webp" width="2000" height="1305" loading="lazy" alt="{escape(alt)}"></div><div class="xp-layer"><span class="xp-hole" aria-hidden="true"></span><span class="xp-tag" aria-hidden="true"></span>{pins}</div></div><button type="button" class="xp-full" aria-label="View full size">⤢ Full size</button></div><div class="xp-side"><div class="xp-k"><span class="xp-cue" aria-hidden="true"></span><span class="hover-only">Hover a decision to see it in the design</span><span class="touch-only">Tap a decision to see it in the design</span></div><ol class="xp-list">{lis}</ol><button type="button" class="xp-reset" hidden>Show the full design</button></div></div></div>')
new = ('<figure class="layer steps" data-steps>\n            <div class="layer-k"><span>3</span>The designs<em>Click a tab to see each screen and the decisions behind it</em></div>\n'
       f'            <div class="step-tabs" role="tablist" aria-label="The designs">{"".join(btn)}</div>\n            <div class="step-stage">\n'
       + "".join("            " + x + "\n" for x in pan)
       + f'            </div>\n            <figcaption class="caption" aria-live="polite">{tabs[0][0]}: {tabs[0][1]}</figcaption>\n          </figure>')
open(p, "w").write(s[:i] + new + s[j:])
print("ok")
