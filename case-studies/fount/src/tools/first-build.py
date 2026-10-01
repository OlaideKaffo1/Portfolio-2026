# One-off: generated the first sections.html and shell edits with placeholders. Kept for reference; edit src/ directly from now on.
# Builds the first Fount sections.html (placeholders everywhere images will go) and edits the shell.
import os
ROOT = "/home/user/Portfolio-2026/case-studies/fount"
T = lambda s: f'<span class="todo">[? {s}]</span>'

def slot(code, text, kind, cls=""):
    return f'<div class="slot{(" " + cls) if cls else ""}"><b>{code}</b><span>{text}</span><i>{kind}</i></div>'

def feature(fid, n, title, principle, before, now, before_slot, after_slot, tabs, lead=""):
    btns, pans = [], []
    for k, (name, cap, code) in enumerate(tabs, 1):
        sel = "true" if k == 1 else "false"; ti = "" if k == 1 else ' tabindex="-1"'; on = " on" if k == 1 else ""
        btns.append(f'<button type="button" role="tab" id="{fid}-t{k}" aria-controls="{fid}-p{k}" aria-selected="{sel}"{ti}>{name}</button>')
        pans.append(f'            <div class="step-panel{on}" role="tabpanel" id="{fid}-p{k}" aria-labelledby="{fid}-t{k}" data-caption="{name}: {cap}">{slot(code, cap + " · design decisions sit behind the toggle", "Design screen")}</div>')
    lead_html = f"        <p>{lead}</p>\n" if lead else ""
    return f'''
        <h3 class="sl">{n}. {title}</h3>
        <p class="fprin"><span>Principle</span>{principle}</p>
{lead_html}        <div class="vx-cmp vxb rv">
          <div class="vx-side weak"><div class="vx-k">Before</div><p>{before}</p></div>
          <div class="vx-side"><div class="vx-k">Now</div><p>{now}</p></div>
        </div>
        <div class="layers">
          <figure class="layer m"><div class="layer-k"><span>1</span>Before</div>{slot(before_slot[0], before_slot[1], "Screenshot or recording", "before")}</figure>
          <figure class="layer m"><div class="layer-k"><span>2</span>After</div>{slot(after_slot[0], after_slot[1], "Screen recording")}</figure>
          <figure class="layer steps" data-steps>
            <div class="layer-k"><span>3</span>The designs<em>Click a tab to see each screen and the decisions behind it</em></div>
            <div class="step-tabs" role="tablist" aria-label="The designs">{"".join(btns)}</div>
            <div class="step-stage">
{chr(10).join(pans)}
            </div>
            <figcaption class="caption" aria-live="polite">{tabs[0][0]}: {tabs[0][1]}</figcaption>
          </figure>
        </div>
'''

S = []
# ---------- The problem
S.append(f'''      <section class="sec" id="problem" data-title="The problem">
        <h2 class="sl">Feedback that went nowhere</h2>
        <p><strong>Every company collected feedback. Almost none of it turned into change.</strong></p>
        <p>Average employee turnover had risen 28% in two years {T("source")}, and 65% of exit interviews named “unaddressed workplace frustrations” as a reason for leaving {T("source")}. The feedback was there. It just never led anywhere.</p>
        <p>The problem looked different depending on who you asked:</p>
        <div class="quotes vxb rv">
          <blockquote class="qt"><p>“I feel like my voice isn’t really heard, as I don’t see any changes in my department, even though I’ve given feedback and suggestions several times.”</p><cite>Software Engineer, mid-sized company</cite></blockquote>
          <blockquote class="qt"><p>“My team is struggling, and I don’t feel like I’m doing my best as a manager. I can’t turn their feedback into action plans, because I don’t know what’s causing the friction.”</p><cite>Team Lead, customer success</cite></blockquote>
          <blockquote class="qt"><p>“I’ve spent three months trying to get executive buy-in for our improvement plan, because I can’t show data on its impact.”</p><cite>HR Leader, manufacturing company</cite></blockquote>
        </div>
        <p><strong>Three people, one broken loop.</strong> Employees spoke up, managers couldn’t tell what to fix first, and HR couldn’t prove the value of fixing it. So nothing moved.</p>
      </section>
''')
# ---------- Research
S.append(f'''      <section class="sec" id="research" data-title="Research">
        <h2 class="sl">What the research showed</h2>
        <h3 class="sl">Listening across companies, roles and levels</h3>
        <p>I led the research myself, starting at INGKA {T("can we name INGKA?")} and then widening it to other industries:</p>
        <ul>
          <li><strong>24 contextual interviews at INGKA</strong> across departments and seniority levels. I ran 14 of them.</li>
          <li><strong>8 interviews at other organisations</strong> in tech, healthcare, finance and manufacturing.</li>
          <li><strong>16 sessions with HR and leadership stakeholders</strong>, all facilitated by me.</li>
          <li><strong>A review of existing survey data and exit interviews</strong>, and a competitive analysis of the feedback tools on the market.</li>
        </ul>
        <figure class="sheet-fig">{slot("02", "Research board or competitive analysis matrix: where existing feedback tools fell short", "Research artefact")}<figcaption class="caption">{T("caption once the image is in")}</figcaption></figure>

        <h3 class="sl">Many complaints, four causes</h3>
        <div class="vx-conv vx-causes vxb rv">
          <div class="vx-people">
            <div class="vx-p"><div class="vx-k">Cause 1</div><b>A trust gap</b><p>People didn’t believe honest feedback would lead to change, so they stopped giving it.</p></div>
            <div class="vx-p"><div class="vx-k">Cause 2</div><b>Feedback fatigue</b><p>Long surveys, with nothing visible coming out of them.</p></div>
            <div class="vx-p"><div class="vx-k">Cause 3</div><b>Problems seen too late</b><p>Managers only found out about issues once they were already critical.</p></div>
            <div class="vx-p"><div class="vx-k">Cause 4</div><b>Data, but no decisions</b><p>HR had plenty of data but couldn’t turn it into clear priorities.</p></div>
          </div>
          <svg class="vx-merge" viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true"><path d="M25 0 V10 Q25 14 29 14 H71 Q75 14 75 10 V0 M50 14 V28" fill="none" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke"/></svg>
          <div class="vx-shared">
            <div class="vx-k">Underneath it all</div>
            <p class="big">Feedback was treated as a survey to run, not a loop to close. Nobody could see what happened after they spoke up.</p>
          </div>
        </div>
        <p>Three groups needed different things from the same loop. <strong>Employees</strong> wanted to be heard without extra work. <strong>Managers</strong> wanted to know what to fix first. <strong>HR partners</strong> wanted a clear story that drives decisions and proves impact.</p>
      </section>
''')
# ---------- The idea
S.append(f'''      <section class="sec" id="idea" data-title="The idea">
        <h2 class="sl">One loop to close</h2>
        <p>Another survey tool wouldn’t fix this. The product had to make the whole loop visible, from the moment someone speaks up to the moment something changes:</p>
        <blockquote>Every piece of feedback should lead to an action people can see. {T("confirm this is the core idea")}</blockquote>
        <p>Four principles followed from that:</p>
        <div class="vx-how vxb rv">
          <div class="card"><b>Quick to give</b><p>Feedback takes a minute, not a morning.</p></div>
          <div class="card"><b>Clear what to fix first</b><p>Managers see priorities, not raw data.</p></div>
          <div class="card"><b>Visible follow-through</b><p>Employees see what changed because they spoke up.</p></div>
          <div class="card"><b>Impact you can prove</b><p>HR can show leadership the return.</p></div>
        </div>

        <h3 class="sl">Choosing what to build first</h3>
        <p>With Fount’s decision makers, I ran a prioritisation vote on what was most feasible, most valuable and most likely to bring in revenue at our stage. Then I ran an ideation workshop with stakeholders on the journey and flow for each group. {T("what made V1, and what was left for later?")}</p>
        <figure class="sheet-fig">{slot("03", "Prioritisation vote or ideation workshop board (Miro)", "Process artefact")}<figcaption class="caption">{T("caption once the image is in")}</figcaption></figure>
      </section>
''')
# ---------- Act 1
act1 = f'''      <section class="sec" id="act1" data-title="Act 1: Fount">
        <h2 class="sl">Act 1 · Fount: closing the loop</h2>
        <p>Fount gave each group its part of the loop: employees give quick feedback, managers see what to fix first, everyone can follow the action plans, and HR can prove the impact. {T("confirm the four features below; they’re my best reading of your write-up")}</p>
'''
act1 += feature("a1", 1, "Micro-surveys", "Quick to give",
    "Long, infrequent surveys that people rushed through and never heard back from.",
    "Short, frequent questions that take a minute and fit into the working day.",
    ("04a", "The old way: a long survey or annual engagement form"), ("04b", "Answering a micro-survey"),
    [("Survey", "A micro-survey as an employee sees it", "04c"), ("Done", "What employees see after answering", "04d")])
act1 += feature("a2", 2, "Friction points, ranked for managers", "Clear what to fix first",
    "Managers pieced feedback together from spreadsheets and one-to-ones, and guessed what to fix first.",
    "A dashboard ranks the friction points in each team, so managers know where to start.",
    ("05a", "The old way: feedback in spreadsheets"), ("05b", "A manager reviewing their team’s friction points"),
    [("Dashboard", "The manager dashboard", "05c"), ("Friction point", "One friction point, opened", "05d")])
act1 += feature("a3", 3, "Action plans everyone can follow", "Visible follow-through",
    "Feedback ended in a report. Nobody owned the follow-up, and employees never saw anything change.",
    "Any friction point can become an action plan with an owner and a date, and employees can follow its progress.",
    ("06a", "The old way: improvement plans in documents nobody tracked"), ("06b", "Turning a friction point into an action plan"),
    [("Create a plan", "Creating an action plan from a friction point", "06c"), ("Progress", "How employees see progress", "06d")])
act1 += feature("a4", 4, "Insights HR can take to leadership", "Impact you can prove",
    "HR had data, but no clear story for leadership and no way to show a return.",
    "Patterns across departments and the impact of each action, ready to share with leadership.",
    ("07a", "The old way: exporting survey data into slides"), ("07b", "HR exploring insights across departments"),
    [("Insights", "Patterns across departments", "07c"), ("Impact", "The impact report for leadership", "07d")])
act1 += "      </section>\n"
S.append(act1)
# ---------- The turn
S.append(f'''      <section class="sec" id="turn" data-title="The turn">
        <h2 class="sl">A year later: what was still slow</h2>
        <p>Fount worked, and people used it. A year of real use also showed where the work was still slow. The feedback was coming in, but HR teams were drowning in it:</p>
        <div class="vx-three vxb rv">
          <div class="card"><div class="vx-k">Scattered</div><b>5 to 8 platforms</b><p>Employee feedback was spread across five to eight different tools.</p></div>
          <div class="card"><div class="vx-k">Stuck in analysis</div><b>73% of HR leaders</b><p>spent more time analysing data than acting on it.</p></div>
          <div class="card ink"><div class="vx-k">Too late</div><b>6 weeks</b><p>On average, that’s how long it took to spot an issue after it started.</p></div>
        </div>
        <p>So I ran a second round of research over three weeks: 18 HR directors and VPs, 12 People Operations managers, 9 team leads and 4 C-suite executives.</p>
        <blockquote class="qt"><p>“I feel like I’m always putting out fires instead of preventing them. By the time we see patterns in our data, the damage is already done.”</p><cite>People Leader, manufacturing company</cite></blockquote>
        <p>That was a real need, and a business opportunity, so we built Fount AI.</p>
        <figure class="steps ost-steps" data-steps>
          <div class="fig-head"><b>The journey, before and after Fount AI</b><span>From spotting a problem to solving it. Switch between them with the tabs.</span></div>
          <div class="step-tabs" role="tablist" aria-label="Journey map">
            <button type="button" role="tab" id="jt-1" aria-controls="jp-1" aria-selected="true">Before Fount AI</button>
            <button type="button" role="tab" id="jt-2" aria-controls="jp-2" aria-selected="false" tabindex="-1">After Fount AI</button>
          </div>
          <div class="step-stage">
            <div class="step-panel on" role="tabpanel" id="jp-1" aria-labelledby="jt-1" data-caption="Before Fount AI: the current-state journey map">{slot("08a", "Journey map: current state, before Fount AI", "Research artefact")}</div>
            <div class="step-panel" role="tabpanel" id="jp-2" aria-labelledby="jt-2" data-caption="After Fount AI: the future-state journey map">{slot("08b", "Journey map: future state, after Fount AI", "Research artefact")}</div>
          </div>
          <figcaption class="caption" aria-live="polite">Before Fount AI: the current-state journey map</figcaption>
        </figure>
      </section>
''')
# ---------- Act 2
act2 = f'''      <section class="sec" id="act2" data-title="Act 2: Fount AI">
        <h2 class="sl">Act 2 · Fount AI: a business partner for HR</h2>
        <p>Fount AI finds friction early across every source of feedback and recommends what to do next, backed by employee data and proven practice. Three strategic calls shaped it:</p>
        <div class="vx-three vxb rv">
          <div class="card"><div class="vx-k">Strategic call 1</div><b>Help people decide, don’t decide for them.</b><p>HR is accountable for its decisions, so full automation was the wrong tool. Every recommendation shows a confidence level, the reasoning behind it, and a way to override it.</p></div>
          <div class="card"><div class="vx-k">Strategic call 2</div><b>Answer “what should I do next?”</b><p>People kept asking for next steps, not more charts. So recommendations come in three tiers: immediate actions, short-term strategies and long-term initiatives.</p></div>
          <div class="card"><div class="vx-k">Strategic call 3</div><b>A conversation, not another dashboard.</b><p>HR already juggled six dashboards a day. Fount AI had to be a place to ask questions, not a seventh screen to read. {T("confirm the real reason")}</p></div>
        </div>
'''
act2 += feature("b1", 5, "Ask Fount AI", "A conversation, not another dashboard",
    "HR checked six dashboards a day and pulled data into Excel to find patterns.",
    "Ask a question in plain words and get an answer drawn from every source of feedback.",
    ("09a", "The old way: six dashboards and an Excel sheet"), ("09b", "Asking Fount AI a question"),
    [("Conversation", "Asking a question in plain words", "09c"), ("Answer", "An answer with its sources", "09d")])
act2 += feature("b2", 6, "Recommendations you can check", "Help people decide",
    "Dashboards showed what was happening, but not what to do about it.",
    "Recommendations in three tiers, each with a confidence level, the reasoning behind it, and a way to override it.",
    ("10a", "The old way: charts with no next step"), ("10b", "Reviewing and acting on a recommendation"),
    [("Recommendations", "Immediate, short-term and long-term recommendations", "10c"), ("Reasoning", "Confidence, reasoning and override on one recommendation", "10d")])
act2 += f'''
        <h3 class="sl">Tested with the people who’d use it</h3>
        <p>I tested both products with the people they were for, at INGKA and beyond. {T("one thing testing changed in each act")}</p>
        <div class="tested">
          <div><div class="k">Fount</div><div class="v">18 + 9</div><div class="what">employees at INGKA, plus 9 participants from other organisations and our internal stakeholders</div></div>
          <div><div class="k">Fount AI</div><div class="v">24 + 23</div><div class="what">people at INGKA, plus 23 participants from other organisations</div></div>
        </div>
        <figure class="sheet-fig">{slot("11", "Assumption matrix or testing findings (optional)", "Research artefact")}</figure>
      </section>
'''
S.append(act2)
# ---------- Results
S.append(f'''      <section class="sec" id="results" data-title="Results">
        <h2 class="sl">Feedback that finally led somewhere</h2>
        <p>People used it every week, and feedback turned into action. These were shared results. My part was designing a loop people trusted enough to use.</p>
        <figure>
          <div class="chain" role="list" aria-label="Results">
            <div class="link" role="listitem" style="--k:0"><div class="k">Participation</div><div class="v"><span data-count="81" data-start="0">81</span>%</div><div class="what">average weekly participation in micro-surveys</div><div class="ctx">Fount, after 12 months</div></div>
            <div class="link" role="listitem" style="--k:1"><div class="k">Follow-through</div><div class="v"><span data-count="63" data-start="0">63</span>%</div><div class="what">of friction points had an action plan within 30 days</div><div class="ctx">Fount, after 12 months</div></div>
            <div class="link" role="listitem" style="--k:2"><div class="k">Fount AI</div><div class="v">6.2 → 1.4 wks</div><div class="what">from spotting an issue to resolving it</div><div class="ctx">After 3 months</div></div>
            <div class="link impact" role="listitem" style="--k:3"><div class="k">Business</div><div class="v">$3M+</div><div class="what">revenue in year one</div><div class="ctx">{T("Fount only, or both?")}</div></div>
          </div>
          <figcaption class="caption">How we measured: {T("one line on where these numbers come from")}</figcaption>
        </figure>
        <p>Use stayed high across every group: 91% of employees used Fount at least once a month, and 74% of managers checked their dashboard every week. With Fount AI, HR’s time spent analysing data fell from 14 hours a week to 3.</p>
        <h3 class="sl" id="said">What people said</h3>
        <figure class="sheet-fig">{slot("12", "Feedback from clients or the team: messages, quotes or emails (optional)", "Evidence")}</figure>
      </section>
''')
# ---------- How I work
S.append('''      <section class="sec" id="how" data-title="How I work">
        <h2 class="sl">What this project shows about how I work</h2>
        <div class="vx-how vxb rv">
          <div class="card"><b>I design the loop, not the survey.</b><p>Four causes pointed to one idea: feedback has to visibly lead somewhere. Every feature closed part of that loop.</p><a class="proof" href="#research">Four causes</a></div>
          <div class="card"><b>I add AI where the data shows a need.</b><p>A year of real use showed where the work was still slow. Fount AI was built for that, not for the hype.</p><a class="proof" href="#turn">The turn</a></div>
          <div class="card"><b>I keep people accountable for decisions.</b><p>The AI recommends and explains itself. People decide, and can always override it.</p><a class="proof" href="#act2">Strategic calls</a></div>
          <div class="card"><b>I research at scale, and in person.</b><p>More than 90 interviews and sessions across two rounds, most of them run by me.</p><a class="proof" href="#research">The research</a></div>
        </div>
      </section>
''')
# ---------- What's next
S.append(f'''      <section class="sec" id="next" data-title="What's next">
        <h2 class="sl">Where the work goes next</h2>
        <p>From the roadmap I proposed, based on ongoing feedback and usage data: {T("what actually happened next?")}</p>
        <ul>
          <li><strong>Industry modules</strong> for industries with high friction, such as manufacturing.</li>
          <li><strong>Integrations</strong> with performance management and learning platforms.</li>
          <li><strong>Enterprise single sign-on</strong> for complex security requirements.</li>
        </ul>
        <p class="closing">The goal behind all of it: nobody should ever wonder whether speaking up was worth it.</p>
      </section>
''')
open(f"{ROOT}/src/sections.html", "w").write("\n".join(S))

# ---------- Shell edits
p = f"{ROOT}/src/shell.html"; s = open(p).read()
def rep(a, b):
    global s
    assert a in s, a[:60]; s = s.replace(a, b)
rep("<title>Strategyzer SaaS Case Study</title>", "<title>Fount Case Study</title>")
i = s.index('<header class="top"'); j = s.index("</header>", i) + 9
s = s[:i] + f'''<header class="top" id="overview" data-title="Overview">
        <h1 class="sl">From 12 weeks of spreadsheets to 2 weeks of action</h1>
        <p class="intro rv" style="--d:180ms">Employees kept giving feedback, and nothing changed. I designed Fount, a platform that turns employee feedback into action plans that managers and HR can act on. A year later, I designed Fount AI, a business partner for HR built on top of it. {T("confirm the headline numbers")}</p>
        <dl class="facts rv" style="--d:260ms">
          <div><dt>Role</dt><dd>Senior product designer {T("title")}<span class="sub">The only designer. I led both products end to end.</span></dd></div>
          <div><dt>Team</dt><dd>Head of Product, product team and engineers<span class="sub">Across both products</span></dd></div>
          <div><dt>Timeline</dt><dd>5 months, then 3 months<span class="sub">Fount AI came about a year after Fount launched</span></dd></div>
          <div><dt>Status</dt><dd><span class="live">Live</span></dd></div>
        </dl>
        <figure class="hero-img hero-top">{slot("01", "Hero: the strongest screen from either product", "Design screen")}</figure>
        <p class="zoom-hint">Click any image to see it full size.</p>
      </header>''' + s[j:]
i = s.index('<ol class="story">'); j = s.index("</ol>", i) + 5
s = s[:i] + '''<ol class="story">
          <li class="st" style="--k:0"><span class="dot" aria-hidden="true"></span><div class="lab">The problem</div><div class="txt">Employees gave feedback and never saw it change anything. Managers and HR had the data, but no clear way to turn it into decisions leadership would back.</div></li>
          <li class="st" style="--k:1"><span class="dot" aria-hidden="true"></span><div class="lab">What I found</div><div class="txt">The same four causes came up in every organisation: a trust gap, feedback fatigue, problems seen too late, and data that never became decisions.</div></li>
          <li class="st key" style="--k:2"><span class="dot" aria-hidden="true"></span><div class="lab">The idea<span class="turn">Turning point</span></div><div class="txt">Every piece of feedback should lead to an action people can see.</div></li>
          <li class="st" style="--k:3"><span class="dot" aria-hidden="true"></span><div class="lab">What shipped</div><div class="txt">Fount: micro-surveys, ranked friction points for managers, action plans everyone can follow, and insights HR can take to leadership. A year later, Fount AI: a business partner that spots friction early and recommends what to do next.</div></li>
          <li class="st end" style="--k:4"><span class="dot" aria-hidden="true"></span><div class="lab">Results</div>
            <div class="txt results" id="results-row" role="list">
              <div class="cell" role="listitem"><div class="v"><span data-count="81" data-start="0">81</span>%</div><div class="what">weekly participation in micro-surveys</div></div>
              <div class="cell" role="listitem"><div class="v"><span data-count="63" data-start="0">63</span>%</div><div class="what">of friction points with an action plan within 30 days</div></div>
              <div class="cell" role="listitem"><div class="v">6.2 → 1.4 wks</div><div class="what">from issue to resolution with Fount AI</div></div>
              <div class="cell impact" role="listitem"><div class="v">$3M+</div><div class="what">revenue in year one</div></div>
            </div>
          </li>
        </ol>''' + s[j:]
i = s.index('<a class="next"'); j = s.index("</a>", i) + 4
s = s[:i] + f'''<a class="next" href="#"><div class="thumb">{slot("13", "Thumbnail for the next case study", "Design screen")}</div><div><span class="company">Next project · Developer tooling {T("company name")}</span><h2>{T("next case study title")}</h2><span class="go">Read case study →</span></div></a>''' + s[j:]
open(p, "w").write(s)
print("ok")
