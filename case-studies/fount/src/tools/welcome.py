# Adds the welcome screen (first thing a new user sees) to the top of Act 1, and fixes copy that called templates the first screen.
# Run from case-studies/fount after act1.py, then python3 src/build.py.
import importlib.util, sys
from html import escape
src = open("src/tools/act1.py").read()
ns = {"escape": escape}
exec(src[src.index("IMG = {"):src.index("def tabs(")], ns)  # reuse IMG + xp()
ns["IMG"]["welcome"] = (2000, 1453)
fig = ('        <p>Every new user lands on the same welcome screen. It shows both halves side by side, each with a preview of the real thing, so people know what they’re getting before they click.</p>\n'
       '        <figure class="sheet-fig">' + ns["xp"]("welcome",
    "Welcome, Olaide: a short note on what Fount helps with and a View Docs button, then two cards. Pulse Micro Surveys shows a preview of a vacation policy question with a five-point mood scale. Data-Driven Dashboard shows a preview of a team heatmap split by gender, job code and location. Each card has a Get Started button.",
    [("A welcome that says why.", "The first words explain what Fount is for, in one short paragraph, with docs one click away.", "6.4,8.1,92.2,15.7"),
     ("Two ways in, one loop.", "The two cards match the two halves of the product: surveys to collect feedback, and the dashboard to make sense of it.", "8,35,31,53"),
     ("Show, don’t describe.", "Each card previews the real screen, a survey question and a heatmap, so the choice is easy without reading.", "52.4,31,46.2,66.9"),
     ("One clear next step.", "Each card has a single Get Started button, so nobody wonders where to begin.", "8,46.8,8,3.9")])
    + '<figcaption class="caption">The welcome screen: where every new user starts</figcaption></figure>\n')
p = "src/sections.html"; s = open(p).read()
R = [
 ('which moments are working, which aren’t, and why.</p>\n\n        <h3 class="sl">1. Pulse',
  'which moments are working, which aren’t, and why.</p>\n' + fig + '\n        <h3 class="sl">1. Pulse'),
 ('<p>A new user’s first screen asks them to create a survey, so the product starts with the thing that brings in data.</p>',
  '<p>Get Started on surveys opens straight into templates, so the product starts with the thing that brings in data.</p>'),
 ('data-caption="Start from a template: The first screen a new user sees"', 'data-caption="Start from a template: Where Get Started leads"'),
 ('aria-live="polite">Start from a template: The first screen a new user sees<', 'aria-live="polite">Start from a template: Where Get Started leads<'),
 ('A new user’s first screen offers ready-made surveys, so the first one goes out in minutes.',
  'Get Started opens on ready-made surveys, so the first one goes out in minutes.'),
]
for a, b in R:
    assert a in s, a[:60]; s = s.replace(a, b)
open(p, "w").write(s); print("ok")
