# Rebuilds Act 1 (Fount) in src/sections.html from the real screens: surveys, then the journey insights.
# Run from case-studies/fount, then python3 src/build.py. Region and pin coordinates are % of each image.
import re
from html import escape

IMG = {  # name: (width, height)
    "su-list": (2000, 1422), "su-templates": (2000, 1364), "su-edit": (2000, 1751), "su-settings": (2000, 1422),
    "su-phone": (2000, 1364), "su-desktop": (2000, 1364), "in-overview": (2000, 1453),
    "in-heatmap": (1634, 955), "in-drivers": (1634, 1010), "in-list": (1684, 922), "in-pick": (1684, 922),
    "mo-trend": (1767, 878), "mo-detail": (1767, 1085),
}

def xp(img, alt, items):
    w, h = IMG[img]
    pins, lis = [], []
    for n, (b, x, r) in enumerate(items):
        rx, ry, rw, rh = [float(v) for v in r.split(",")]
        px = min(rx + rw, 95.5); py = max(ry, 3.0)
        pins.append(f'<button type="button" class="xp-pin" data-i="{n}" style="--px:{px:.1f}%;--py:{py:.1f}%;--k:{n}" aria-label="{n+1}: {escape(b)}" tabindex="-1">{n+1}</button>')
        lis.append(f'<li><button type="button" class="xp-item" data-i="{n}" aria-pressed="false" data-r="{r}"><span class="n">{n+1}</span><span class="tx"><b>{b}</b> {x}</span></button></li>')
    return (f'<div class="xp" data-xp><div class="xp-media framed"><div class="xp-win"><div class="shot" data-zoom aria-label="View full size" style="--ar:{w/h:.4f}"><img src="images/{img}.webp" width="{w}" height="{h}" loading="lazy" alt="{escape(alt)}"></div>'
            f'<div class="xp-layer"><span class="xp-hole" aria-hidden="true"></span><span class="xp-tag" aria-hidden="true"></span>{"".join(pins)}</div></div><button type="button" class="xp-full" aria-label="View full size">⤢ Full size</button></div>'
            f'<div class="xp-side"><div class="xp-k"><span class="xp-cue" aria-hidden="true"></span><span class="hover-only">Hover a decision to see it in the design</span><span class="touch-only">Tap a decision to see it in the design</span></div><ol class="xp-list">{"".join(lis)}</ol><button type="button" class="xp-reset" hidden>Show the full design</button></div></div>')

def tabs(fid, k, label, hint, panels):
    btn, pan = [], []
    for i, (name, cap, body) in enumerate(panels, 1):
        sel = "true" if i == 1 else "false"; ti = "" if i == 1 else ' tabindex="-1"'; on = " on" if i == 1 else ""
        btn.append(f'<button type="button" role="tab" id="{fid}-t{i}" aria-controls="{fid}-p{i}" aria-selected="{sel}"{ti}>{name}</button>')
        pan.append(f'            <div class="step-panel{on}" role="tabpanel" id="{fid}-p{i}" aria-labelledby="{fid}-t{i}" data-caption="{name}: {cap}">{body}</div>')
    return (f'          <figure class="layer steps" data-steps>\n            <div class="layer-k"><span>{k}</span>{label}<em>{hint}</em></div>\n'
            f'            <div class="step-tabs" role="tablist" aria-label="{label}">{"".join(btn)}</div>\n            <div class="step-stage">\n' + "\n".join(pan) +
            f'\n            </div>\n            <figcaption class="caption" aria-live="polite">{panels[0][0]}: {panels[0][1]}</figcaption>\n          </figure>\n')

def single(k, label, body):
    return f'          <figure class="layer m"><div class="layer-k"><span>{k}</span>{label}</div>{body}</figure>\n'

def before(img, alt, w=2000, h=1150):
    return (f'          <figure class="layer m"><div class="layer-k"><span>1</span>Before</div><div class="xp-media framed before"><div class="xp-win"><div class="shot" data-zoom aria-label="View full size" style="--ar:{w/h:.4f}"><img src="images/{img}.webp" width="{w}" height="{h}" loading="lazy" alt="{escape(alt)}"></div></div></div>'
            f'<figcaption class="caption">An illustration of the old way, recreated for this case study.</figcaption></figure>\n')

def head(n, title, principle, lead, b, now):
    return (f'\n        <h3 class="sl">{n}. {title}</h3>\n        <p class="fprin"><span>Principle</span>{principle}</p>\n        <p>{lead}</p>\n'
            f'        <div class="vx-cmp vxb rv">\n          <div class="vx-side weak"><div class="vx-k">Before</div><p>{b}</p></div>\n          <div class="vx-side"><div class="vx-k">Now</div><p>{now}</p></div>\n        </div>\n        <div class="layers">\n')

A = []
A.append('''      <section class="sec" id="act1" data-title="Act 1: Fount">
        <h2 class="sl">Act 1 · Fount: from feedback to a map of the journey</h2>
        <p>Fount had two halves that worked as one loop. Managers and HR send short pulse surveys at the moments that matter, and every answer lands on a map of the employee journey, so anyone can see which moments are working, which aren’t, and why.</p>
''')
# ---------------- Feature 1: pulse surveys
A.append(head(1, "Pulse surveys in minutes", "Quick to give",
    "A new user’s first screen asks them to create a survey, so the product starts with the thing that brings in data.",
    "One long annual survey that took 45 minutes to fill in, with results promised months later.",
    "Short surveys built from templates in minutes, sent to the right people for a set time, and answered in about a minute on any device."))
A.append(before("old-survey", "An illustration of a long annual engagement survey: question 12 of 64, section 3 of 9, an estimated 35 to 45 minutes to complete, a grid of agree or disagree statements about the manager, and a note that results will be shared in Q3."))
A.append(tabs("s1", 2, "Creating a survey", "Click a tab to follow the flow, and see the decisions behind each step", [
    ("Start from a template", "The first screen a new user sees", xp("su-templates",
        "Create your first survey: four templates, First day experience, AI tools adoption, Career advancement and Vacation policy, each showing a real question, with a Create from scratch button.",
        [("Never a blank page.", "A new user’s first screen offers ready-made surveys, so the first one goes out in minutes.", "7.9,10.6,60,5.2"),
         ("Templates for real moments.", "Each template targets a moment where friction tends to hide, from a first day to a new policy.", "7.9,17.6,44,29.5"),
         ("You see the question before you pick.", "Every template shows a real question and its answer type, not just a name.", "11.2,35.6,37.4,7.3"),
         ("Or start from scratch.", "The blank option is there, but it isn’t the default.", "83.5,11.4,13.4,4")])),
    ("Build it", "Each question with a live preview beside it", xp("su-edit",
        "Edit survey: the question How was your first day? as a required mood scale with five points, its options listed, and a live preview on the right. A second, optional text question sits below it with its own preview.",
        [("See it as you build it.", "Every question has a live preview beside it, exactly as employees will see it.", "58.4,15.3,38.8,48.4"),
         ("Question types, not blank fields.", "Pick a mood scale or a text area, and the right options appear.", "9,29.5,23,3.2"),
         ("A recommended range.", "Five points is marked as recommended, so people don’t have to guess.", "33,29.5,22.9,3.2"),
         ("Required only when it matters.", "The mood question is required. The written one is optional, so a quick answer still counts.", "53.4,16.7,2.5,1.7")])),
    ("Choose who and when", "Name, time range, audience and launch", xp("su-settings",
        "Survey settings: the survey name First Day Experience, a description, a start and end date and time, an Audience section with Create first audience, and a Launch survey button.",
        [("A start and an end.", "Every pulse runs for a set window, so it never becomes another always-open form.", "9,42.2,46.9,17.4"),
         ("Only the right people.", "An audience can be one team, a department or any group, so nobody gets surveys that aren’t for them.", "9,64,27,9.8"),
         ("Launch when it’s ready.", "Setting up and sending are separate, so nothing goes out by accident.", "9,84.1,9.5,3.8")])),
    ("Your surveys", "Every survey in one place", xp("su-list",
        "Pulse surveys: two survey cards, First day experience and Engineering team collaboration, each with a short description of its purpose and a menu, and a New survey button.",
        [("Named by purpose.", "Each survey says what it’s for, like finding friction for new joiners, so a team can tell them apart at a glance.", "13.7,22.5,22,6"),
         ("Everything in one place.", "Every survey a team runs lives here, ready to edit or reuse.", "8.5,18.8,60.6,12.8"),
         ("Always one click from a new one.", "New survey stays in the same place on every screen.", "86.8,11.5,10,3.8")])),
]))
A.append(tabs("s2", 3, "What employees see", "Check the same survey on a phone and on a desktop", [
    ("On a phone", "The survey as employees see it on mobile", xp("su-phone",
        "The survey preview on a phone: First day at Fount, We are excited to hear how it went, a five-point mood scale wrapped onto two rows, a text box and a Submit your response button.",
        [("Two questions, about a minute.", "Short enough to answer between meetings, which is why people kept answering.", "36.7,25.5,26.5,46"),
         ("Built for thumbs.", "The mood scale wraps onto two rows on a phone, so every option stays easy to tap.", "38.9,29,22.2,15.9"),
         ("A warm opening.", "The survey opens with a friendly line, not instructions.", "38.8,17.6,22.3,4.3"),
         ("Check both, then share.", "Switch between phone and desktop, and share the preview before launching.", "85,1.2,13.6,3.2")])),
    ("On a desktop", "The same survey in a browser", xp("su-desktop",
        "The same survey preview in a desktop browser at getfount.com, with the five-point mood scale in one row, a text box and a Submit your response button.",
        [("The same survey everywhere.", "One survey works on any device, so nobody has to install anything.", "30.1,11.9,44.4,2.8"),
         ("One row on a wide screen.", "On a desktop the whole scale fits in one row.", "28.6,39.1,43.1,9.3"),
         ("One clear action.", "A single button to submit, nothing else to decide.", "43.1,69.3,13.6,3.9")])),
]))
A.append("        </div>\n")
# ---------------- Feature 2: the journey at a glance
A.append(head(2, "The whole journey, at a glance", "See what matters most",
    "Answers are grouped into a journey, like Q4 new joiners, then into the moments inside it, like meeting the team or requesting time off.",
    "Feedback copied into spreadsheets by hand, themes guessed, and no way to tell which problem mattered most.",
    "One overview of the journey, then a heatmap and a key driver chart that show which moments to fix first."))
A.append(before("old-spreadsheet", "An illustration of a team feedback spreadsheet called FINAL v3: feedback copied from surveys, one-to-ones, email and Slack, with themes typed by hand, duplicate rows, blank owners, an error cell and 214 more rows."))
A.append(single(2, "The overview", xp("in-overview",
    "The journey overview for Q4 new joiners: an NPS of 72, up 5, split into promoters, passives and detractors; key drivers ranked with high, mid and low impact; the top moments and the bottom touchpoints, each with a response count.",
    [("One score to start from.", "The journey’s NPS, with how it changed since last time.", "8.7,31,7,3.8"),
     ("What drives it, ranked.", "Key drivers are ranked by impact, so the first thing to fix is at the top.", "53,18.4,44.2,38.1"),
     ("Impact in plain words.", "High, mid and low impact, in colour, instead of a statistic to interpret.", "90.1,30.6,6,20.4"),
     ("The best and the worst, side by side.", "Top moments sit next to the weakest touchpoints, so wins and problems get equal attention.", "7.6,58.2,89.6,38.1"),
     ("Every number shows its sample size.", "A response count sits beside each score, so 30 answers aren’t read like 3,000.", "92.5,69.9,3.3,2.1")])))
A.append(tabs("s3", 3, "Finding the moments that matter", "Click a tab to see each view and the decisions behind it", [
    ("Heatmap", "Every moment, compared across teams", xp("in-heatmap",
        "Insights in heatmap view: six moments as rows and fifteen job codes as columns, each cell a satisfaction score coloured from red to green, with Gender, Job code and Location filters.",
        [("Hot spots stand out.", "Colour shows where a moment is failing for a group, without reading a single number.", "21,53.9,74.1,35.6"),
         ("Compare any group.", "Switch between gender, job code and location to see who a problem affects.", "9,43.8,17.6,3.7"),
         ("Start broad, then narrow.", "All moments first, then pick one to go deeper.", "9,24.8,20.2,4.7"),
         ("Two views of the same data.", "Switch between the heatmap and a list.", "80.2,36.6,15.6,4")])),
    ("Key drivers", "Where to act first, and how it’s trending", xp("in-drivers",
        "Key driver analysis plotting each moment by impact against satisfaction, split into quadrants by dotted lines, with an NPS selector; below it, satisfaction for three moments over twelve months.",
        [("Where to act first.", "Each moment is plotted by impact and satisfaction. High impact with low satisfaction is where to start.", "7.6,1.2,89.7,48.7"),
         ("Pick the measure.", "Run the analysis against NPS or another outcome.", "86.3,2.9,9.8,4.3"),
         ("Trends, not snapshots.", "Moments over time show whether a change is working.", "7.6,50.7,89.7,48.3")])),
    ("List view", "Every moment with its scores and benchmarks", xp("in-list",
        "Insights in list view: each moment with its response count, impact, whether the impact is significant, CSAT score, difference and benchmark.",
        [("Every score has a benchmark.", "A 65% means little alone. Next to a 72% benchmark, it’s a problem.", "89,45.6,7.1,46.6"),
         ("Up or down, in colour.", "The difference from the benchmark is red or green, so gaps jump out.", "81.4,45.6,3.9,46.6"),
         ("Significant, not just big.", "Impact significance shows which results are worth acting on.", "53.4,45.6,8.9,46.6")])),
    ("Choose a moment", "Picking one moment to go deeper", xp("in-pick",
        "The moment selector open over the list view, showing Receive laptop, Meet team members, which is ticked, Learn about company and Complete onboarding forms.",
        [("Everyday names.", "Moments are named the way people live them, like receive laptop or meet team members.", "9,26.6,19.9,28.2"),
         ("One click to go deeper.", "Pick a moment and everything below it updates.", "10.1,38,17.6,5.4")])),
]))
A.append("        </div>\n")
# ---------------- Feature 3: inside one moment
A.append(head(3, "Inside one moment", "Know why, not just what",
    "Each moment breaks down into touchpoints, the people and things that shape it, and attributes, what people actually felt.",
    "A slide with a chart and “further investigation needed”. Leadership saw what was low, but never why.",
    "Every moment shows its trend, the touchpoints and attributes behind it, how each compares to the benchmark, and the comments behind the numbers."))
A.append(before("old-slides", "An illustration of a leadership slide deck with an engagement chart by department pasted in from a survey tool. The recommendation says further investigation needed, and the speaker notes worry about not having turnover numbers."))
A.append(tabs("s4", 2, "One moment, in depth", "Click a tab to see each view and the decisions behind it", [
    ("The moment", "Meet team members: its score and trend", xp("mo-trend",
        "The Meet team members moment: a summary strip with a 61% score, up 9%, against a 52% benchmark and 2,500 responses, an Analyze feedback button, and satisfaction over time from January to July.",
        [("The numbers that matter, in one line.", "Score, change, benchmark and responses sit together at the top.", "30.4,29.3,16,5.5"),
         ("How it’s moving.", "Satisfaction over time shows whether things are improving.", "7.6,39.3,89.6,60"),
         ("Straight to what people wrote.", "Analyze feedback opens the comments behind the numbers, so a score is never the end of the story.", "82.5,29.3,13.6,5.5")])),
    ("Touchpoints and attributes", "Who shaped it, and what people felt", xp("mo-detail",
        "Touchpoints for the moment, such as your supervisor, senior leaders and your colleagues, and attributes, such as helpful conversations and enough feedback, each with response count, impact, significance, CSAT score, difference and benchmark.",
        [("Who shapes the moment.", "Touchpoints show which people and things made the moment good or bad.", "7.6,1.4,89.6,50.7"),
         ("What people felt.", "Attributes turn answers into plain statements, like helpful conversations or enough feedback.", "7.6,54.1,89.6,45"),
         ("The bright spots too.", "Colleagues score 9% above the benchmark, so teams can see what’s working, not just what’s broken.", "7.6,27.9,89.6,5.9")])),
]))
A.append("        </div>\n      </section>\n")
ACT1 = "".join(A)

p = "src/sections.html"; s = open(p).read()
i = s.index('      <section class="sec" id="act1"'); j = s.index("</section>", i) + len("</section>\n")
s = s[:i] + ACT1 + s[j:]
R = [
 ('<blockquote>Every piece of feedback should lead to an action people can see. <span class="todo">[? confirm this is the core idea]</span></blockquote>',
  '<blockquote>Turn feedback into a map of the employee journey, so anyone can see which moments matter most, and why.</blockquote>'),
 ('<p>Another survey tool wouldn’t fix this. The product had to make the whole loop visible, from the moment someone speaks up to the moment something changes:</p>',
  '<p>Another survey tool wouldn’t fix this. People needed to see feedback the way employees live work: as a journey of moments, each one good or bad for a reason.</p>'),
 ('<div class="card"><b>Visible follow-through</b><p>Employees see what changed because they spoke up.</p></div>',
  '<div class="card"><b>Know why, not just what</b><p>Every score breaks down into the people and things behind it.</p></div>'),
 ('<div class="card"><b>Clear what to fix first</b><p>Managers see priorities, not raw data.</p></div>',
  '<div class="card"><b>See what matters most</b><p>Managers see priorities, not raw data.</p></div>'),
 ('<div class="card"><b>Impact you can prove</b><p>HR can show leadership the return.</p></div>',
  '<div class="card"><b>Impact you can prove</b><p>Benchmarks and trends show leadership what changed.</p></div>'),
]
for a, b in R:
    assert a in s, a[:50]; s = s.replace(a, b)
# Choosing what to build first: real V1 scope, no placeholder board
s = re.sub(r' Then I ran an ideation workshop with stakeholders on the journey and flow for each group\. <span class="todo">\[\? what made V1, and what was left for later\?\]</span></p>\n        <figure class="sheet-fig">.*?</figure>\n',
           ' Then I ran an ideation workshop with stakeholders on the journey and flow for each group. Version one focused on two things: quick pulse surveys, and a journey view that turns the answers into priorities.</p>\n', s, flags=re.S)
s = re.sub(r'        <figure class="sheet-fig"><div class="slot"><b>02</b>.*?</figure>\n', '', s, flags=re.S)
open(p, "w").write(s)

t = open("src/shell.html").read()
T = [
 ('<div class="txt">Every piece of feedback should lead to an action people can see.</div>',
  '<div class="txt">Turn feedback into a map of the employee journey, so anyone can see which moments matter most, and why.</div>'),
 ('Fount: micro-surveys, ranked friction points for managers, action plans everyone can follow, and insights HR can take to leadership.',
  'Fount: pulse surveys built in minutes, a journey overview, a heatmap and key driver analysis to find the moments that matter, and a deep dive into each moment.'),
]
for a, b in T:
    assert a in t, a[:50]; t = t.replace(a, b)
open("src/shell.html", "w").write(t)
print("ok")
