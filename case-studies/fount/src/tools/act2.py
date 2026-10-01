# Rebuilds Act 2 (Fount AI) from the three real screens and drops the recording slots.
# Run from case-studies/fount after act1.py, welcome.py and journey.py, then python3 src/build.py.
import re
from html import escape
src = open("src/tools/act1.py").read()
ns = {"escape": escape}
exec(src[src.index("IMG = {"):src.index("A = []")], ns)
ns["IMG"].update({"ai-problems": (2000, 1422), "ai-fixes": (2000, 1422), "ai-roi": (2000, 1422)})
xp, tabs, single, before, head = ns["xp"], ns["tabs"], ns["single"], ns["before"], ns["head"]

A = []
A.append(head(5, "Ask Fount AI", "A conversation, not another dashboard",
    "HR asks in plain words. Fount AI reads the comments behind the moments that matter most, names the main problems, and suggests what to do.",
    "HR checked six dashboards a day and pulled data into Excel to find patterns.",
    "Ask a question and get the main problems, the comments behind them, and fixes with their sources."))
A.append(before("old-dashboards", "An illustration of six separate tools, from a pulse survey tool and an HR attrition report to exit interview notes, with a merged spreadsheet on top full of mismatched department names and error cells.").replace("<span>1</span>Before", "<span>1</span>Before"))
A.append(tabs("b1", 2, "One conversation", "Click a tab to follow the conversation, and see the decisions behind each answer", [
    ("The problems", "What employees are struggling with, and the proof", xp("ai-problems",
        "Fount AI: I have analysed 32 comments related to the top five moments. For the moment Take parental leave, three challenges, each with a count of supporting comments: inefficient approval process, inconsistent policies on extended leave, and lack of support with life changes. Below them, five solution recommendations.",
        [("It says what it read.", "Before it answers, Fount AI says what it looked at: the comments on the top five moments.", "11.1,15.6,36.2,9.2"),
         ("Tied to a moment.", "Every answer is tied to a moment from the journey map, so it links back to the rest of Fount.", "13.4,30.3,15.3,2.6"),
         ("Problems, with proof.", "Each challenge shows how many comments back it, and opens to show them, so HR can check the source.", "13.4,39.4,54.4,15.8"),
         ("Fixes that match the problems.", "Recommendations sit right under the problems they answer. E-signatures speak straight to the slow approvals.", "13.4,58.4,52,19.7")])),
    ("The fixes", "Ideas from feedback and proven practice, with sources", xp("ai-fixes",
        "Fount AI asks: would you like me to generate a list of solution recommendations for each moment, based on employee feedback and proven industry practice? The user says yes. After an Analyzing state, six recommendations for Take parental leave, followed by Resources linking to HR resources, Reddit and LinkedIn.",
        [("It asks before it acts.", "Fount AI offers the next step and waits for a yes, so HR stays in charge.", "11.1,15.3,36.2,9.1"),
         ("Feedback plus proven practice.", "Each fix draws on what employees said and on approaches that have worked elsewhere.", "13.4,52,49,22.5"),
         ("Sources you can open.", "Links show where the ideas came from, so HR can read more before deciding.", "13.4,76.4,34,7.1"),
         ("The next question is one line away.", "Every answer ends at the message box, so following up feels like talking to a colleague.", "28.6,93,47.3,5.3")])),
]))
A.append("        </div>\n")
A.append(head(6, "What to fix first, and why", "Help people decide",
    "Knowing what to do isn’t enough when budgets are tight. HR has to know what to do first, and be able to defend it.",
    "Dashboards showed what was happening, but not what to do about it, or where to start.",
    "For each moment, Fount AI picks the fix with the highest return, shows the hours and money it saves, and explains why."))
A.append(before("old-charts", "An illustration of a people analytics dashboard: falling engagement, sentiment by department, top themes, a dropping response rate and a high turnover risk score, with nothing that says what to do next."))
A.append(single(2, "The highest return first", xp("ai-roi",
    "The user asks which recommendations have the highest ROI if done first, for each moment. Fount AI says Gotcha and shows Calculating. For Discuss career progression, the top fix is to set clear, measurable criteria for promotions, marked Highest ROI, with hours saved yearly and annual cost saved, and three supporting reasons.",
    [("The question HR really has.", "Olaide asks which fixes give the best return if done first, for every moment at once.", "59.6,14.6,36.2,6.4"),
     ("One fix, clearly ranked.", "The top recommendation for each moment is labelled Highest ROI, so the order is never in doubt.", "13.4,50,54.4,4.5"),
     ("A case leadership can fund.", "Hours and money saved a year turn a people problem into a business case.", "13.4,56,54.4,9.2"),
     ("The reasons behind it.", "Supporting reasons explain why it works, so HR can defend the choice, not just repeat it.", "13.4,66.8,47,13.5")]) + '<figcaption class="caption">The highest return first: the top fix for one moment, and why</figcaption>'))
A.append("        </div>\n")
new = "".join(A)

p = "src/sections.html"; s = open(p).read()
s, n = re.subn(r'\n        <h3 class="sl">5\. Ask Fount AI</h3>.*?(?=\n        <h3 class="sl">Tested with)', lambda m: new, s, flags=re.S)
assert n == 1
R = [
 ('Every recommendation shows a confidence level, the reasoning behind it, and a way to override it.</p>',
  'Fount AI asks before it acts, and every answer shows the comments and sources behind it.</p>'),
 ('So recommendations come in three tiers: immediate actions, short-term strategies and long-term initiatives.</p>',
  'So Fount AI suggests fixes for each moment, then ranks them by return, so HR knows where to start.</p>'),
 ('<p>The AI recommends and explains itself. People decide, and can always override it.</p>',
  '<p>The AI shows its evidence and asks before it acts. People make the call.</p>'),
]
for a, b in R:
    assert a in s, a[:60]; s = s.replace(a, b)
open(p, "w").write(s)
t = open("src/shell.html").read()
a = 'Fount AI: a business partner that spots friction early and recommends what to do next.'
assert a in t
t = t.replace(a, 'Fount AI: a conversation that finds the main problems in employee comments, suggests fixes with their sources, and ranks them by return.')
open("src/shell.html", "w").write(t)
print("ok")
