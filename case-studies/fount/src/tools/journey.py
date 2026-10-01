# Puts the real journey maps (08a before, 08b after Fount AI) into the turn section, and relabels the vote as planned, not shipped.
# Run from case-studies/fount, then python3 src/build.py. Regions are % of each image.
from html import escape
src = open("src/tools/act1.py").read()
ns = {"escape": escape}
exec(src[src.index("IMG = {"):src.index("def tabs(")], ns)
ns["IMG"].update({"journey-before": (2000, 1186), "journey-after": (2000, 1069)})
xp = ns["xp"]
before = xp("journey-before",
  "Current-state journey map for Sarah, VP People Operations. Six stages over twelve weeks: trigger event, manual review, analysis, discussion, planning and implementation, each with its key frustrations, and an emotion curve that stays low throughout.",
  [("It starts once the damage is done.", "The process only began when someone left or a complaint escalated. There was no early warning.", "6.2,39.2,13.8,50.8"),
   ("Most of the time went on gathering.", "HR pulled exit interviews, surveys and Slack together by hand, from six to eight tools. 80% of the time went on collecting, not analysing.", "20.9,39.2,13.9,50.8"),
   ("Weeks of debate.", "Spreadsheet analysis with no benchmark led to meetings where people argued over what the data meant.", "35.6,39.2,28.6,50.8"),
   ("Twelve weeks, and the mood never lifts.", "Sarah stays frustrated at every stage. Even at the end, she can’t measure whether the fix worked.", "6.2,74,87.5,10.5")])
after = xp("journey-after",
  "Future-state journey map for Sarah with Fount AI. Four stages over about two weeks: AI detection in real time, insights review on day 1, action planning on days 2 to 3 and implementation in weeks 1 to 2, each with its key benefits, and an emotion curve that stays positive.",
  [("Found in real time.", "Fount AI watches every source and spots patterns before they escalate, instead of waiting for an exit.", "6.2,29.5,21.2,58"),
   ("Reasons, not just answers.", "Each summary explains itself in plain language, with a confidence score and its reasoning, so Sarah can check it.", "28.4,29.5,21.1,58"),
   ("Options she can shape.", "Recommended solutions come with resource estimates and chances of success, and Sarah can adjust them.", "50.5,29.5,21.2,58"),
   ("About two weeks, start to finish.", "Progress and impact are tracked as the fix rolls out, so course corrections happen straight away.", "72.6,29.5,21.2,58")])
p = "src/sections.html"; s = open(p).read()
R = [
 ('<figure class="steps ost-steps" data-steps>\n          <div class="fig-head"><b>The journey, before and after Fount AI</b>',
  '<figure class="steps ost-steps" data-steps data-dz="key moments">\n          <div class="fig-head"><b>The journey, before and after Fount AI</b>'),
 ('<span>From spotting a problem to solving it. Switch between them with the tabs.</span>',
  '<span>Sarah, a VP of People Operations, from spotting a problem to solving it. Switch between them with the tabs.</span>'),
 ('data-caption="Before Fount AI: the current-state journey map"><div class="slot"><b>08a</b><span>Journey map: current state, before Fount AI</span><i>Research artefact</i></div></div>',
  'data-caption="Before Fount AI: twelve weeks from a problem to a fix">' + before + '</div>'),
 ('data-caption="After Fount AI: the future-state journey map"><div class="slot"><b>08b</b><span>Journey map: future state, after Fount AI</span><i>Research artefact</i></div></div>',
  'data-caption="After Fount AI: about two weeks, start to finish">' + after + '</div>'),
 ('aria-live="polite">Before Fount AI: the current-state journey map<', 'aria-live="polite">Before Fount AI: twelve weeks from a problem to a fix<'),
 # vote: the circle was the plan; version one shipped part of it
 ('<div class="eyebrow">Built first</div>', '<div class="eyebrow">Planned first</div>'),
 ('<li>Survey creation</li><li>Pulse surveys</li><li>Data and insights dashboard</li>',
  '<li class="vs">Survey creation</li><li class="vs">Pulse surveys</li><li class="vs">Data and insights dashboard</li>'),
 ('<li>Roles and permissions</li><li>Integrations</li></ul></div>',
  '<li>Roles and permissions</li><li>Integrations</li></ul><p class="note"><span class="vk" aria-hidden="true"></span><b>Shipped in version one.</b> We shipped these first, and planned the rest to follow.</p></div>'),
 ('The outcome of the prioritisation vote: what we built first, and what waited', 'The outcome of the prioritisation vote: what we planned first, and what waited'),
 ('Eight features made the cut for version one, built around two things: quick pulse surveys, and a journey view that turns the answers into priorities. Four waited, including an AI agent.',
  'Eight features made the first plan, and four waited for later, including an AI agent. Within that plan, version one shipped the core: quick pulse surveys, and a journey view that turns the answers into priorities.'),
]
for a, b in R:
    assert a in s, a[:70]; s = s.replace(a, b)
open(p, "w").write(s)
t = open("src/shell.html").read()
a = 'const what = fig.querySelector(".before") ? "problems" : "design decisions";'
assert a in t
t = t.replace(a, 'const what = fig.dataset.dz || (fig.querySelector(".before") ? "problems" : "design decisions");')
open("src/shell.html", "w").write(t)
c = open("src/diagrams.css").read()
c += '''  .vote li.vs { box-shadow: inset 0 0 0 1.5px #000; }
  .vote .vk { display: inline-block; width: 22px; height: 12px; margin-right: 8px; vertical-align: -1px; border-radius: 999px; box-shadow: inset 0 0 0 1.5px #000; background: var(--panel); }
'''
open("src/diagrams.css", "w").write(c)
print("ok")
