# Regenerates feature 2's design tabs (screens, pins and decisions) inside src/sections.html.
# Run from case-studies/strategyzer-saas, then python3 src/build.py. Coordinates are % of each image.

from html import escape
p = "src/sections.html"
s = open(p).read()
i = s.index('id="f2-t1"'); i = s.rfind('<figure', 0, i); j = s.index('</figure>', i) + 9
tabs = [
 ("Select workspaces", "Ticking several workspaces at once", "cw-select",
  "The Workspaces tab of the program editor. Customer Discovery and Idea Validation are ticked and shown in blue, Go To Market Strategy is not. A bar at the bottom reads 2 workspaces selected, with Copy, Move and a red Delete.",
  [("Select from the cards.", "Every workspace card has a checkbox, so selecting happens right where people already work.", "25.8,14.6,2.2,2.8", (29.4, 17.6)),
   ("Selected is obvious.", "Ticked cards turn blue, title and all, so it’s clear what’s about to be copied.", "25.5,13.9,41.3,25.0", (67.2, 15.0)),
   ("Actions in one bar.", "A bar shows how many workspaces are selected and everything you can do with them.", "34.8,92.0,34.3,4.8", (34.4, 92.0)),
   ("Delete stands apart.", "Delete is red, so the risky action can’t be mistaken for the others.", "60.7,93.1,4.9,2.6", (70.6, 94.4))]),
 ("Copy dialog", "The dialog opens with the selection filled in", "cw-dialog",
  "The Copy Workspaces dialog over the workspaces page. Select Workspaces already holds Customer Discovery and Idea Validation as removable chips. Target project(s) is empty and asks to select one or more projects. Cancel and Copy sit at the bottom, and the selection bar is still visible below.",
  [("Your selection carries over.", "The chosen workspaces arrive already filled in, as chips you can remove.", "28.0,27.3,43.9,5.4", (72.4, 28.0)),
   ("Plural from the start.", "The field reads Target project(s) and asks for one or more, so it’s clear you can pick many.", "28.0,37.2,43.9,4.5", (72.4, 37.6)),
   ("You don’t lose your place.", "The dialog sits over the workspaces, and the selection bar stays in view below it.", "34.8,92.1,34.3,4.8", (34.4, 92.0))]),
 ("Pick projects", "Searching for projects and ticking several", "cw-projects",
  "The Target project(s) dropdown open in the dialog. It has a Search by project name box and a list where Sprint Team One and Sprint Team Two are ticked and Sprint Team Three is not. The two ticked projects also appear as chips in the field above.",
  [("Search by name.", "With hundreds of projects, typing a name beats scrolling for it.", "28.9,45.0,42.0,4.6", (71.4, 45.2)),
   ("Tick as many as you need.", "Checkboxes instead of a single choice, so one copy reaches every team.", "28.7,52.4,43.1,12.1", (72.2, 52.8)),
   ("Choices show as chips.", "Each ticked project appears in the field, with an x to remove it.", "28.9,38.5,21.7,2.7", (51.0, 38.0)),
   ("Our own dropdown.", "Built with our design system, unlike the browser’s menu in the old version.", "28.0,43.3,43.9,22.7", (72.4, 65.0))]),
 ("Ready to copy", "Every workspace and project, checked before copying", "cw-ready",
  "The Copy Workspaces dialog with the dropdown closed. Select Workspaces shows Customer Discovery and Idea Validation, and Target project(s) shows Sprint Team One and Sprint Team Two. Cancel and Copy sit below.",
  [("A last look before copying.", "Every workspace and every project sits in one place, so it’s easy to check before anything happens.", "28.0,27.3,43.9,15.2", (72.4, 28.0)),
   ("Easy to change.", "Any workspace or project can be removed with its x, without starting again.", "28.9,38.5,21.7,2.7", (51.0, 38.0)),
   ("One button for all of it.", "Copy sends every workspace to every project at once.", "67.1,44.2,4.8,4.5", (72.6, 44.0))]),
 ("Copied", "The confirmation once the workspaces are copied", "cw-copied",
  "The workspaces page after copying. A dark message at the top right says workspaces copied successfully, with a close button. The checkboxes on the cards are cleared and the selection bar is gone.",
  [("Ready for the next task.", "The checkboxes clear and the bar disappears, with no reload and no new page.", "25.5,13.9,62.5,25.0", (88.4, 15.0))]),
]
btn = []; pan = []
for k, (name, cap, img, alt, items) in enumerate(tabs, 1):
    sel = "true" if k == 1 else "false"
    ti = "" if k == 1 else ' tabindex="-1"'
    on = " on" if k == 1 else ""
    btn.append(f'<button type="button" role="tab" id="f2-t{k}" aria-controls="f2-p{k}" aria-selected="{sel}"{ti}>{name}</button>')
    pins = "".join(f'<button type="button" class="xp-pin" data-i="{n}" style="--px:{px}%;--py:{py}%;--k:{n}" aria-label="{n+1}: {escape(b)}" tabindex="-1">{n+1}</button>' for n, (b, x, r, (px, py)) in enumerate(items))
    lis = "".join(f'<li><button type="button" class="xp-item" data-i="{n}" aria-pressed="false" data-r="{r}"><span class="n">{n+1}</span><span class="tx"><b>{b}</b> {x}</span></button></li>' for n, (b, x, r, _) in enumerate(items))
    pan.append(f'<div class="step-panel{on}" role="tabpanel" id="f2-p{k}" aria-labelledby="f2-t{k}" data-caption="{name}: {cap}"><div class="xp" data-xp><div class="xp-media framed"><div class="xp-win"><div class="shot" data-zoom aria-label="View full size" style="--ar:1.4663"><img src="images/{img}.webp" width="2000" height="1364" loading="lazy" alt="{escape(alt)}"></div><div class="xp-layer"><span class="xp-hole" aria-hidden="true"></span><span class="xp-tag" aria-hidden="true"></span>{pins}</div></div><button type="button" class="xp-full" aria-label="View full size">⤢ Full size</button></div><div class="xp-side"><div class="xp-k"><span class="xp-cue" aria-hidden="true"></span><span class="hover-only">Hover a decision to see it in the design</span><span class="touch-only">Tap a decision to see it in the design</span></div><ol class="xp-list">{lis}</ol><button type="button" class="xp-reset" hidden>Show the full design</button></div></div></div>')
new = ('<figure class="layer steps" data-steps>\n            <div class="layer-k"><span>3</span>The designs<em>Click a tab to see each screen and the decisions behind it</em></div>\n'
       f'            <div class="step-tabs" role="tablist" aria-label="The designs">{"".join(btn)}</div>\n            <div class="step-stage">\n'
       + "".join("            " + x + "\n" for x in pan)
       + f'            </div>\n            <figcaption class="caption" aria-live="polite">{tabs[0][0]}: {tabs[0][1]}</figcaption>\n          </figure>')
open(p, "w").write(s[:i] + new + s[j:])
print("ok")
