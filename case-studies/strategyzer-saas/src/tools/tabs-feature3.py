# Regenerates feature 3's design tabs (screens, pins and decisions) inside src/sections.html.
# Run from case-studies/strategyzer-saas, then python3 src/build.py. Coordinates are % of each image.

from html import escape
p = "src/sections.html"
s = open(p).read()
i = s.index('id="f3-t1"'); i = s.rfind('<figure', 0, i); j = s.index('</figure>', i) + 9
tabs = [
 ("Timeline", "A cohort delivery’s timeline before anything is hidden", "he-timeline",
  "A cohort delivery’s timeline. Week One is open with three events, each with a checkbox on the left and eye, edit, duplicate and delete icons on the right. The Week One header has its own checkbox and eye icon. Week Two sits collapsed below, and a progress panel is on the right.",
  [("An eye on every event.", "Each event has its own hide and show control, next to edit, duplicate and delete.", "69.3,37.1,2.2,3.0", (72.4, 39.6)),
   ("And on every group.", "The group header has one too, so a whole week can be hidden at once.", "62.2,23.2,2.2,3.2", (61.4, 21.0)),
   ("Checkboxes for working in bulk.", "Every event and group can be ticked, so several can be changed together.", "6.2,23.6,1.6,46.0", (8.6, 24.0))]),
 ("Select", "Two events selected, with the actions bar", "he-select",
  "The same timeline with Testing Preparation and Prepare for the testing prep workshop ticked and tinted blue. A bar above the timeline reads 2 events selected, with Hide, Duplicate, a red Delete and a close button.",
  [("Selection is clear.", "Ticked events are tinted blue, so it’s obvious which ones will change.", "5.2,36.4,67.3,29.1", (72.8, 37.0)),
   ("Actions appear in context.", "A bar appears above the timeline with the count and what you can do.", "36.8,13.9,35.7,4.9", (36.4, 14.0)),
   ("Hide comes first.", "Hide leads the bar as the most common action, and Delete sits last, in red.", "50.6,15.0,4.4,2.7", (52.8, 21.8))]),
 ("Hidden", "The two events hidden, still in place", "he-hidden",
  "The timeline after hiding. Testing Preparation and Prepare for the testing prep workshop are faded to grey with a Hidden label and a closed eye icon. The third event is unchanged. A dark message at the top right says events updated successfully.",
  [("Hidden, but still in place.", "Hidden events fade to grey instead of disappearing, so the program keeps its shape.", "5.2,36.4,67.3,29.1", (72.8, 37.0)),
   ("A clear label.", "A Hidden label says what the fading means, so no one wonders if something broke.", "63.7,38.2,4.4,2.3", (66.0, 42.4)),
   ("The eye closes.", "The eye icon changes to a closed eye, showing the state and how to undo it.", "69.3,37.1,2.2,3.0", (72.4, 39.6))]),
 ("Edit while hidden", "Hidden events stay fully editable", "he-edit",
  "The two hidden events selected again, faded and tinted blue. The bar now reads 2 events selected with Show, Duplicate and Delete. Each hidden event still has its edit, duplicate and delete icons.",
  [("Still fully editable.", "Edit, duplicate and delete stay active on hidden events, so content can be finished before teams see it.", "69.3,40.6,2.2,24.0", (71.8, 41.0)),
   ("The bar adapts.", "With hidden events selected, Hide becomes Show.", "50.1,15.0,4.9,2.7", (52.6, 21.8)),
   ("Both states at once.", "Selected hidden events are faded and tinted blue, so you can see both states together.", "5.2,36.4,67.3,29.1", (72.8, 50.0))]),
 ("Hide one", "Hiding a single event from its card", "he-one",
  "The timeline with the pointer on the eye icon of Testing Preparation. A dark tooltip reads Hide Event. The icon sits with edit, duplicate and delete on the right of the event.",
  [("Right on the card.", "Hide sits with edit, duplicate and delete on every event, so hiding one takes one click, with no selecting.", "69.3,37.1,2.2,12.8", (72.4, 46.0)),
   ("Named on hover.", "A tooltip says Hide Event, so the icon is never a guess.", "71.7,37.3,6.1,2.8", (78.4, 36.4))]),
 ("One hidden", "A single event hidden, the rest unchanged", "he-one-hidden",
  "The timeline after hiding one event. Testing Preparation is faded to grey with a Hidden label and a closed eye icon. The other two events are unchanged. A dark message at the top right says event updated successfully.",
  [("Only that event changes.", "The hidden event fades while the others stay exactly as they were.", "5.2,36.4,67.3,14.5", (72.8, 44.0))]),
 ("Select a group", "Selecting a whole week at once", "he-group",
  "The Week One group header is ticked, and all three of its events are ticked with it. The bar above reads 1 event group selected, with Hide, Duplicate, a red Delete and a close button.",
  [("Tick the group, get every event.", "Ticking Week One ticks all three of its events, so nothing in the week is missed.", "6.2,23.6,1.6,46.0", (4.2, 30.0)),
   ("The count says group.", "The bar reads 1 event group selected, not 3 events, so it’s clear the whole week is the target.", "35.7,15.0,12.0,2.7", (35.2, 14.6)),
   ("The same actions.", "Hide, Duplicate and Delete work the same for a group as for single events.", "50.6,15.0,18.0,2.7", (69.0, 21.8))]),
 ("Group hidden", "A whole week hidden, still editable", "he-group-hidden",
  "Week One after hiding. The group has a Hidden label next to its name, and all three events are faded to grey but keep their icons. A dark message at the top right says event group updated successfully.",
  [("One label for the week.", "The group gets a Hidden label next to its name, so you can see it’s hidden without opening the week.", "16.9,23.7,4.4,2.3", (24.6, 24.8)),
   ("Everything inside fades.", "All three events go grey, so it’s clear the whole week is hidden from teams.", "5.2,36.4,67.3,43.5", (73.0, 66.0))]),
]
btn = []; pan = []
for k, (name, cap, img, alt, items) in enumerate(tabs, 1):
    sel = "true" if k == 1 else "false"
    ti = "" if k == 1 else ' tabindex="-1"'
    on = " on" if k == 1 else ""
    btn.append(f'<button type="button" role="tab" id="f3-t{k}" aria-controls="f3-p{k}" aria-selected="{sel}"{ti}>{name}</button>')
    pins = "".join(f'<button type="button" class="xp-pin" data-i="{n}" style="--px:{px}%;--py:{py}%;--k:{n}" aria-label="{n+1}: {escape(b)}" tabindex="-1">{n+1}</button>' for n, (b, x, r, (px, py)) in enumerate(items))
    lis = "".join(f'<li><button type="button" class="xp-item" data-i="{n}" aria-pressed="false" data-r="{r}"><span class="n">{n+1}</span><span class="tx"><b>{b}</b> {x}</span></button></li>' for n, (b, x, r, _) in enumerate(items))
    pan.append(f'<div class="step-panel{on}" role="tabpanel" id="f3-p{k}" aria-labelledby="f3-t{k}" data-caption="{name}: {cap}"><div class="xp" data-xp><div class="xp-media framed"><div class="xp-win"><div class="shot" data-zoom aria-label="View full size" style="--ar:1.4663"><img src="images/{img}.webp" width="2000" height="1364" loading="lazy" alt="{escape(alt)}"></div><div class="xp-layer"><span class="xp-hole" aria-hidden="true"></span><span class="xp-tag" aria-hidden="true"></span>{pins}</div></div><button type="button" class="xp-full" aria-label="View full size">⤢ Full size</button></div><div class="xp-side"><div class="xp-k"><span class="xp-cue" aria-hidden="true"></span><span class="hover-only">Hover a decision to see it in the design</span><span class="touch-only">Tap a decision to see it in the design</span></div><ol class="xp-list">{lis}</ol><button type="button" class="xp-reset" hidden>Show the full design</button></div></div></div>')
new = ('<figure class="layer steps" data-steps>\n            <div class="layer-k"><span>3</span>The designs<em>Click a tab to see each screen and the decisions behind it</em></div>\n'
       f'            <div class="step-tabs" role="tablist" aria-label="The designs">{"".join(btn)}</div>\n            <div class="step-stage">\n'
       + "".join("            " + x + "\n" for x in pan)
       + f'            </div>\n            <figcaption class="caption" aria-live="polite">{tabs[0][0]}: {tabs[0][1]}</figcaption>\n          </figure>')
open(p, "w").write(s[:i] + new + s[j:])
print("ok")
