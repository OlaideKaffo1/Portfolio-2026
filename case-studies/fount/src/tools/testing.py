# Adds the usability testing artefacts for both products (Fount, August 2023; Fount AI, later) to the testing section.
# Re-running replaces the figure.
# Run from case-studies/fount after the other tools, then python3 src/build.py. Images are cropped below the browser bar.
from html import escape
src = open("src/tools/act1.py").read()
ns = {"escape": escape}
exec(src[src.index("IMG = {"):src.index("def tabs(")], ns)
ns["IMG"].update({"test-summary": (2000, 1141), "test-matrix": (2000, 1141), "test-ai-setup": (2000, 1186), "test-ai-matrix": (2000, 1186)})
xp = ns["xp"]
P = [
 ("Fount: findings", "the August 2023 write-up, with a real task and what we decided", xp("test-summary",
   "Confluence page, Usability Testing, August 2023. The task: imagine you have survey data on the root causes of friction for call centre agents, and find two or three stories in the dashboard. The summary: users love seeing colours, great feedback on clarity, simplicity and tidiness, fewer pages, most didn’t realise there were benchmarks at all, and a decision to keep benchmarks as they are for now.",
   [("A real task, not a tour.", "Testers got a real job to do with the data: find two or three stories in it. So we saw how they’d actually use it.", "35.4,31.1,49,16.7"),
    ("Colour and clarity landed.", "People loved the colours, and called the dashboard clear, simple and tidy, with fewer pages.", "36,61.4,50,14.5"),
    ("A finding we didn’t expect.", "Most people didn’t notice the benchmarks at all.", "38.5,85.5,46,5.7"),
    ("A decision, written down.", "We kept benchmarks as they were for now, because showing them over time would open a much bigger problem.", "40,92.5,45,6.5")])),
 ("Fount: matrix", "every assumption, checked with every tester", xp("test-matrix",
   "Assumption matrix in Confluence. The row Overview page: user gets a high-level grasp of the overall experience at the company and how it has changed over time. All five testers, Felix, Dan, Tom, Jill and Emilie, have a green tick, with notes such as we have colour, more intuitive to have promoters on the right, at which point does it flip from green to red, and explain what scores for engagement questions are.",
   [("Every tester, every assumption.", "Each row tests one assumption about a feature, with a result for each person.", "22.2,24.5,73,4.8"),
    ("The assumption, in plain words.", "Each one is written as what the user should get, like a quick grasp of the overall experience and how it changed over time.", "28.6,29.8,12,24.5"),
    ("Confirmed by all five.", "The overview passed with every tester.", "40.5,30.7,54.5,4"),
    ("Questions to design for next.", "Even when it passed, notes like “at which point does it flip from green to red?” showed what to make clearer.", "56.3,35.5,11.5,64")])),
 ("Fount AI: setup", "a working prototype, tested with customers", xp("test-ai-setup",
   "Confluence page, Usability Testing AI Feature: a link to the Figma prototype and its second iteration, then the assumption matrix for customers and external users, prototype iteration 2. Testers: Alyssa from T-Mobile, Elise Dockery from a financial services firm, Michelle from UBS, Bobby from UHG and Carter from Discover. First row, basic navigation, look and feel: user can navigate to the new buttons, ticked for all five.",
   [("Tested on a working prototype.", "Testers clicked through a Figma prototype of the AI features, in its second iteration.", "32,32,51,17.7"),
    ("Customers, not colleagues.", "This round was with customers and external users, not our own team.", "19.6,66.2,34.8,4"),
    ("Names you’d know.", "Testers came from T-Mobile, UBS, UHG and Discover, among others.", "21.1,73.4,75.8,11.8"),
    ("Starting with the basics.", "First check: can people find the new buttons? All five got there. One noticed the change from last year first.", "21.1,85.6,75.8,14")])),
 ("Fount AI: matrix", "what customers understood, valued and asked for", xp("test-ai-matrix",
   "The Fount AI assumption matrix. All five understood the Action recommendations button and the highlighted text. Most found highlighting useful, with requests to show insights within themes and single moments doing badly. On whether themes speed up free-text analysis: yes with export, yes, a request for the top 5 pain points and top 5 opportunities first then all comments, a data summary story, and a question about filters.",
   [("Everyone got it.", "All five understood what the Action recommendations button and the highlighted text were for.", "30.4,17.7,66.4,19.4"),
    ("Useful, with a wish list.", "Most found highlighting useful. Others asked to see insights inside themes, and the single moments doing badly.", "30.4,37.5,66.4,20.7"),
    ("Faster analysis, mostly.", "Does it speed up reading free-text comments? Most said yes, and added ideas like exports and filters.", "21.1,58.6,75.8,41"),
    ("Top five first.", "Michelle at UBS asked for the top five pain points and opportunities first, then all the comments.", "70.8,58.6,9.4,20")])),
]
btn, pan = [], []
for i, (name, cap, body) in enumerate(P, 1):
    sel = "true" if i == 1 else "false"; ti = "" if i == 1 else ' tabindex="-1"'; on = " on" if i == 1 else ""
    btn.append(f'<button type="button" role="tab" id="tt-{i}" aria-controls="tp-{i}" aria-selected="{sel}"{ti}>{name}</button>')
    pan.append(f'            <div class="step-panel{on}" role="tabpanel" id="tp-{i}" aria-labelledby="tt-{i}" data-caption="{name}: {cap}">{body}</div>')
fig = ('        <figure class="steps" data-steps data-dz="findings">\n'
       '          <div class="fig-head"><b>Usability testing, both products</b><span>Fount’s dashboard in August 2023, then the AI features with customers. Switch between them with the tabs.</span></div>\n'
       f'          <div class="step-tabs" role="tablist" aria-label="Usability testing">{"".join(btn)}</div>\n          <div class="step-stage">\n' + "\n".join(pan) +
       f'\n          </div>\n          <figcaption class="caption" aria-live="polite">{P[0][0]}: {P[0][1]}</figcaption>\n        </figure>\n')
p = "src/sections.html"; s = open(p).read()
import re
s, n = re.subn(r'        <figure class="steps" data-steps data-dz="findings">.*?</figure>\n', lambda m: fig, s, flags=re.S)
if n == 0:
    a = '        </div>\n        <blockquote class="qt"><p>“It’s really great work.'
    assert a in s
    s = s.replace(a, '        </div>\n' + fig + '        <blockquote class="qt"><p>“It’s really great work.')
open(p, "w").write(s); print("ok")
