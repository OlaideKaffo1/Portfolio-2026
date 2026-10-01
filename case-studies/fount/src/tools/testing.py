# Adds the August 2023 usability testing write-up and assumption matrix to the testing section.
# Run from case-studies/fount after the other tools, then python3 src/build.py. Images are cropped below the browser bar.
from html import escape
src = open("src/tools/act1.py").read()
ns = {"escape": escape}
exec(src[src.index("IMG = {"):src.index("def tabs(")], ns)
ns["IMG"].update({"test-summary": (2000, 1141), "test-matrix": (2000, 1141)})
xp = ns["xp"]
P = [
 ("The findings", "the write-up, with a real task and what we decided", xp("test-summary",
   "Confluence page, Usability Testing, August 2023. The task: imagine you have survey data on the root causes of friction for call centre agents, and find two or three stories in the dashboard. The summary: users love seeing colours, great feedback on clarity, simplicity and tidiness, fewer pages, most didn’t realise there were benchmarks at all, and a decision to keep benchmarks as they are for now.",
   [("A real task, not a tour.", "Testers got a real job to do with the data: find two or three stories in it. So we saw how they’d actually use it.", "35.4,31.1,49,16.7"),
    ("Colour and clarity landed.", "People loved the colours, and called the dashboard clear, simple and tidy, with fewer pages.", "36,61.4,50,14.5"),
    ("A finding we didn’t expect.", "Most people didn’t notice the benchmarks at all.", "38.5,85.5,46,5.7"),
    ("A decision, written down.", "We kept benchmarks as they were for now, because showing them over time would open a much bigger problem.", "40,92.5,45,6.5")])),
 ("The assumption matrix", "every assumption, checked with every tester", xp("test-matrix",
   "Assumption matrix in Confluence. The row Overview page: user gets a high-level grasp of the overall experience at the company and how it has changed over time. All five testers, Felix, Dan, Tom, Jill and Emilie, have a green tick, with notes such as we have colour, more intuitive to have promoters on the right, at which point does it flip from green to red, and explain what scores for engagement questions are.",
   [("Every tester, every assumption.", "Each row tests one assumption about a feature, with a result for each person.", "22.2,24.5,73,4.8"),
    ("The assumption, in plain words.", "Each one is written as what the user should get, like a quick grasp of the overall experience and how it changed over time.", "28.6,29.8,12,24.5"),
    ("Confirmed by all five.", "The overview passed with every tester.", "40.5,30.7,54.5,4"),
    ("Questions to design for next.", "Even when it passed, notes like “at which point does it flip from green to red?” showed what to make clearer.", "56.3,35.5,11.5,64")])),
]
btn, pan = [], []
for i, (name, cap, body) in enumerate(P, 1):
    sel = "true" if i == 1 else "false"; ti = "" if i == 1 else ' tabindex="-1"'; on = " on" if i == 1 else ""
    btn.append(f'<button type="button" role="tab" id="tt-{i}" aria-controls="tp-{i}" aria-selected="{sel}"{ti}>{name}</button>')
    pan.append(f'            <div class="step-panel{on}" role="tabpanel" id="tp-{i}" aria-labelledby="tt-{i}" data-caption="{name}: {cap}">{body}</div>')
fig = ('        <figure class="steps" data-steps data-dz="findings">\n'
       '          <div class="fig-head"><b>Usability testing, August 2023</b><span>How we tested Fount’s dashboard. Switch between the write-up and the matrix with the tabs.</span></div>\n'
       f'          <div class="step-tabs" role="tablist" aria-label="Usability testing">{"".join(btn)}</div>\n          <div class="step-stage">\n' + "\n".join(pan) +
       f'\n          </div>\n          <figcaption class="caption" aria-live="polite">{P[0][0]}: {P[0][1]}</figcaption>\n        </figure>\n')
p = "src/sections.html"; s = open(p).read()
a = '        </div>\n        <blockquote class="qt"><p>“It’s really great work.'
assert a in s and 'id="tt-1"' not in s
s = s.replace(a, '        </div>\n' + fig + '        <blockquote class="qt"><p>“It’s really great work.')
open(p, "w").write(s); print("ok")
