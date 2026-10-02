# Builds the Macrometa case study: writes src/sections.html and patches the hero, At a glance and next card in src/shell.html.
# Run from case-studies/macrometa, then python3 src/build.py. Pin regions are % of each image (x, y, w, h).
# Every claim here traces to copy/macrometa-facts.md. Unknowns are marked with <span class="todo">.
import re
from html import escape
from PIL import Image

from PIL import ImageFilter
import os, shutil

# Image prep from source/. App screens are trimmed to the app. The collection pop-ups and function detail stay whole, set back in their frame (see diagrams.css).
# Tight crops only where needed: the survey (respondent emails), the spreadsheet (app chrome), and empty space. Boxes are source pixels.
CROP = {
    "new-collection-data": (43, 152, 1957, 1530), "new-managed-keys": (43, 152, 1957, 1530),
    "new-collections-empty": (43, 152, 1957, 1292), "new-dashboard": (40, 138, 1781, 1218),
    "old-graphs": (0, 0, 2000, 640),
    "research-survey": (0, 152, 1164, 1806), "research-competitive": (58, 150, 1262, 605),
}
BLUR = {"new-query-worker": [(60, 955, 320, 1010)]}  # a staff email in the account menu
USED = ["feedback-permissions", "feedback-docs", "feedback-changes", "old-dashboard", "old-collections", "old-graphs", "old-login", "old-new-graph",
        "research-competitive", "research-survey", "new-dashboard", "new-collection-data", "new-query-worker", "new-managed-keys", "new-function-detail",
        "new-signup", "new-invite", "new-welcome-a", "new-welcome-b", "new-collections-empty", "new-collection-type", "new-sample-datasets", "new-kv-samples", "new-kv-form"]
os.makedirs("images", exist_ok=True)
for name in USED:
    src = next(f"source/{name}.{e}" for e in ("webp", "png") if os.path.exists(f"source/{name}.{e}"))
    if name in CROP or name in BLUR or src.endswith(".png"):
        im = Image.open(src).convert("RGB")
        for box in BLUR.get(name, []):
            im.paste(im.crop(box).filter(ImageFilter.GaussianBlur(9)), box[:2])
        if name in CROP: im = im.crop(CROP[name])
        im.save(f"images/{name}.webp", lossless=True)
    else:
        shutil.copyfile(src, f"images/{name}.webp")

# Pins were measured against these boxes (source pixels); map them onto whatever crop is used now
PINBASE = {
    "new-collection-data": (43, 152, 1957, 1530), "new-managed-keys": (43, 152, 1957, 1530),
    "new-collections-empty": (43, 152, 1957, 1292), "new-dashboard": (40, 138, 1781, 1218),
    "new-collection-type": "full", "new-sample-datasets": "full", "new-kv-samples": "full", "new-kv-form": "full", "new-function-detail": "full",
}
def _src_size(n):
    return Image.open(next(f"source/{n}.{e}" for e in ("webp", "png") if os.path.exists(f"source/{n}.{e}"))).size
def conv(img, r):
    if img not in PINBASE: return r
    W, H = _src_size(img)
    bx0, by0, bx1, by1 = (0, 0, W, H) if PINBASE[img] == "full" else PINBASE[img]
    cx0, cy0, cx1, cy1 = CROP.get(img, (0, 0, W, H))
    x, y, w, h = [float(v) for v in r.split(",")]
    sx = bx0 + x / 100 * (bx1 - bx0); sy = by0 + y / 100 * (by1 - by0)
    sw = w / 100 * (bx1 - bx0); sh = h / 100 * (by1 - by0)
    cw, ch = cx1 - cx0, cy1 - cy0
    return f"{(sx - cx0) / cw * 100:.1f},{(sy - cy0) / ch * 100:.1f},{sw / cw * 100:.1f},{sh / ch * 100:.1f}"

def size(img):
    return Image.open(f"images/{img}.webp").size

def shot(img, alt):
    w, h = size(img)
    return (f'<div class="shot" data-zoom aria-label="View full size" style="--ar:{w/h:.4f}"><img src="images/{img}.webp" '
            f'width="{w}" height="{h}" loading="lazy" alt="{escape(alt)}"></div>')

def xp(img, alt, items):
    pins, lis = [], []
    for n, (b, x, r) in enumerate(items):
        r = conv(img, r)
        rx, ry, rw, rh = [float(v) for v in r.split(",")]
        px = min(rx + rw, 95.5); py = max(ry, 3.0)
        pins.append(f'<button type="button" class="xp-pin" data-i="{n}" style="--px:{px:.1f}%;--py:{py:.1f}%;--k:{n}" aria-label="{n+1}: {escape(b)}" tabindex="-1">{n+1}</button>')
        lis.append(f'<li><button type="button" class="xp-item" data-i="{n}" aria-pressed="false" data-r="{r}"><span class="n">{n+1}</span><span class="tx"><b>{b}</b> {x}</span></button></li>')
    return (f'<div class="xp" data-xp><div class="xp-media framed"><div class="xp-win">{shot(img, alt)}'
            f'<div class="xp-layer"><span class="xp-hole" aria-hidden="true"></span><span class="xp-tag" aria-hidden="true"></span>{"".join(pins)}</div></div><button type="button" class="xp-full" aria-label="View full size">⤢ Full size</button></div>'
            f'<div class="xp-side"><div class="xp-k"><span class="xp-cue" aria-hidden="true"></span><span class="hover-only">Hover a decision to see it in the design</span><span class="touch-only">Tap a decision to see it in the design</span></div><ol class="xp-list">{"".join(lis)}</ol><button type="button" class="xp-reset" hidden>Show the full design</button></div></div>')

def plain(img, alt):
    return f'<div class="xp-media framed"><div class="xp-win">{shot(img, alt)}</div></div>'

def tabs(fid, k, label, hint, panels, cls="layer steps", extra=""):
    btn, pan = [], []
    for i, (name, cap, body) in enumerate(panels, 1):
        sel = "true" if i == 1 else "false"; ti = "" if i == 1 else ' tabindex="-1"'; on = " on" if i == 1 else ""
        btn.append(f'<button type="button" role="tab" id="{fid}-t{i}" aria-controls="{fid}-p{i}" aria-selected="{sel}"{ti}>{name}</button>')
        pan.append(f'            <div class="step-panel{on}" role="tabpanel" id="{fid}-p{i}" aria-labelledby="{fid}-t{i}" data-caption="{name}: {cap}">{body}</div>')
    head = (f'<div class="layer-k"><span>{k}</span>{label}<em>{hint}</em></div>' if k else f'<div class="fig-head"><b>{label}</b><span>{hint}</span></div>')
    return (f'          <figure class="{cls}" data-steps{extra}>\n            {head}\n'
            f'            <div class="step-tabs" role="tablist" aria-label="{label}">{"".join(btn)}</div>\n            <div class="step-stage">\n' + "\n".join(pan) +
            f'\n            </div>\n            <figcaption class="caption" aria-live="polite">{panels[0][0]}: {panels[0][1]}</figcaption>\n          </figure>\n')

def single(k, label, body, cap=""):
    c = f'<figcaption class="caption">{cap}</figcaption>' if cap else ""
    return f'          <figure class="layer m"><div class="layer-k"><span>{k}</span>{label}</div>{body}{c}</figure>\n'

def head(n, title, principle, lead, b, now, old=None):
    h = f'\n        <h3 class="sl">{n}. {title}</h3>\n        <p class="fprin"><span>Principle</span>{principle}</p>\n        <p>{lead}</p>\n'
    if old:
        img, alt = old
        h += (f'        <div class="bn vxb rv"><div class="vx-side weak bn-b"><div class="vx-k">Before</div><p>{b}</p></div>'
              f'<figure class="bn-fig m">{plain(img, alt)}<figcaption class="caption">The old product.</figcaption></figure>'
              f'<div class="vx-side bn-n"><div class="vx-k">Now</div><p>{now}</p></div></div>\n')
    else:
        h += (f'        <div class="vx-cmp vxb rv">\n          <div class="vx-side weak"><div class="vx-k">Before</div><p>{b}</p></div>\n'
              f'          <div class="vx-side"><div class="vx-k">Now</div><p>{now}</p></div>\n        </div>\n')
    return h + '        <div class="layers">\n'

S = []

# ---------------- The problem
S.append('''      <section class="sec" id="problem" data-title="The problem">
        <h2 class="sl">Powerful, but on your own</h2>
        <p>Macrometa is a cloud platform for building fast, global apps and APIs. It could do a lot, but it showed new users very little of it. There was no real onboarding, the interface wasn’t consistent, and support tickets were piling up on the customer success team. People dropped off, and customers left.</p>
        <p>Customers said it in their own words:</p>
        <div class="quotes vxb rv">
          <blockquote class="qt"><p>“I have to say your user interface for this is very confusing and unhelpful.”</p><cite>Customer, setting up access for a teammate</cite></blockquote>
          <blockquote class="qt"><p>“I remain frustrated I’m not able to find some of these solutions for myself using your documentation.”</p><cite>Customer, choosing between search options</cite></blockquote>
          <blockquote class="qt"><p>“I would love to be in the loop on what MM is doing and changing.”</p><cite>Customer, after finding a change through a support ticket</cite></blockquote>
        </div>
''')
S.append(tabs("msg", None, "The messages, in full", "Real emails from customers to our team. Switch between them with the tabs.", [
    ("Access", "a customer trying to give one person access to one collection", plain("feedback-permissions", "A customer email: your user interface for this is very confusing and unhelpful. They wanted a non-technical third party to access only one collection, but top-level access didn’t carry down and the person could still see the rest of the system, such as queries and API keys.")),
    ("Documentation", "a customer who couldn’t tell the options apart", plain("feedback-docs", "A customer email: I remain frustrated I’m not able to find some of these solutions for myself using your documentation. With so many ways of achieving things, they couldn’t tell the difference in cost or speed between a search index, a fulltext index and a search worker.")),
    ("Updates", "a customer who found out about a change by accident", plain("feedback-changes", "A customer email: they found out through a support ticket that the result limit had changed from 500 to 1,000, and asked to be kept in the loop the way Cloudflare does.")),
], cls="steps sheet-fig"))
S.append('''        <p>And the first screen after logging in didn’t say what to do next:</p>
        <figure class="sheet-fig">''' + plain("old-dashboard", "The old Macrometa dashboard: a dark sidebar of eleven all-caps links, a world map of regions, an empty throughput chart, and tenant metrics such as geo fabrics, query workers, storage and latency.") + '''<figcaption class="caption">The old dashboard: a map, empty charts and terms like “geo fabrics” and “query workers”, with no next step.</figcaption></figure>
      </section>
''')

# ---------------- Research
S.append('''
      <section class="sec" id="research" data-title="Research">
        <h2 class="sl">What the research showed</h2>
        <h3 class="sl">Four ways in</h3>
        <p>I led the research myself:</p>
        <ul>
          <li><strong>Support feedback.</strong> With the customer success team, I went through what customers had sent to support and documented the common pain points.</li>
          <li><strong>A first-time walkthrough.</strong> I used the product as a brand-new user to see the gaps for myself.</li>
          <li><strong>Interviews and a survey</strong> with developers, including Macrometa’s own engineers. Developers made up 70% of the company, which made them a useful first group.</li>
          <li><strong>A competitive analysis</strong> of onboarding at Fauna, Hasura and Confluent.</li>
        </ul>
        <h3 class="sl">Where we stood</h3>
        <p>Macrometa had a get-started guide, documentation and tutorials. It had no guided landing page, no walkthrough, no onboarding pointers, no templates, and copy that wasn’t clear. Each competitor had most of these.</p>
        <figure class="sheet-fig">''' + plain("research-competitive", "My competitive analysis spreadsheet. Twelve onboarding features compared across Macrometa, Fauna, Hasura and Confluent. Macrometa has no for directional landing page, product walkthrough, onboarding pointers, 24/7 support, clear copy, easy to navigate features, continuous onboarding, templates or blueprints, and inclusive copy, and yes for get started guide, helpful documentation and tutorials.") + '''<figcaption class="caption">My competitive analysis of onboarding. Every red cell in Macrometa’s column became something to design.</figcaption></figure>
        <h3 class="sl">What developers told us</h3>
''')
S.append('        <figure class="sheet-fig" data-dz="findings">' + xp("research-survey",
    "Survey results from 12 developers: how they find out about new technology, whether they want onboarding after the first visit, what they’ll share at sign-up, where they want documentation, and examples of onboarding they liked or disliked.",
    [("Keep guiding after day one.", "58% wanted pointers beyond the first visit, not a one-time tour.", "21.9,19.2,56.3,16.2"),
     ("Ask for less at sign-up.", "92% would share an email, but only 25% their organisation’s name or size.", "21.9,36.3,56.3,19.4"),
     ("Docs in either place.", "Two thirds didn’t mind whether docs lived in the console or on a separate site, so the console links to docs where questions come up.", "21.9,56.6,56.3,17.3"),
     ("What good looks like.", "AWS was praised for learning links on its dashboard, Google Cloud criticised for having none, and one person asked for a short video of key capabilities.", "21.9,74.8,56.3,24.5")])
    + '<figcaption class="caption">My survey of 12 developers. Respondents’ details are cropped out.</figcaption></figure>\n')
S.append('''        <h3 class="sl">Three insights</h3>
        <div class="vx-three vxb rv">
          <div class="card"><div class="vx-k">Insight 1</div><b>No real first experience</b><p>There was no onboarding flow, so a new user’s first visit didn’t lead anywhere productive.</p></div>
          <div class="card"><div class="vx-k">Insight 2</div><b>Nothing for every level</b><p>No tutorials, templates or guides that worked for developers of all experience levels.</p></div>
          <div class="card"><div class="vx-k">Insight 3</div><b>An inconsistent interface</b><p>The product lacked visual consistency, and there was plenty of room to improve the experience.</p></div>
        </div>
        <h3 class="sl">Who it was for</h3>
        <div class="vx-cmp vxb rv">
          <div class="vx-side"><div class="vx-k">Tom, junior software engineer at a new startup</div><p>“I am just starting out my software development career. I need a tool that provides as much support as possible.”</p></div>
          <div class="vx-side"><div class="vx-k">Alex, engineering manager at a mid-sized company</div><p>“I am constantly looking for the best developer tooling solutions to help my team produce quality work in minimal time.”</p></div>
        </div>
      </section>

      <section class="sec" id="idea" data-title="The idea">
        <h2 class="sl">Show the way</h2>
        <p>The product didn’t need more features. It needed to show developers what it could do, and give them something to start from.</p>
        <blockquote>A clearer, consistent interface, and a guided start, so no developer has to figure it out alone.</blockquote>
        <p>Four principles followed from that:</p>
        <div class="vx-how vxb rv">
          <div class="card"><b>Find your way</b><p>Group the product the way people think about their work.</p></div>
          <div class="card"><b>One calm system</b><p>The same patterns on every screen, from the simplest to the most technical.</p></div>
          <div class="card"><b>Show the way</b><p>Every first visit ends with a clear next step.</p></div>
          <div class="card"><b>Start from something</b><p>Templates, samples and tutorials instead of a blank page.</p></div>
        </div>
      </section>
''')

# ---------------- Part 1: the UI refresh
S.append('''
      <section class="sec" id="part1" data-title="Part 1: A clearer product">
        <h2 class="sl">Part 1 · A clearer product</h2>
        <p><strong>With our Head of Design, I redesigned the whole platform’s interface.</strong> It was the bigger share of the project, and everything in Part 2 is built on it.</p>
''')
S.append(head(1, "A layout that groups the work", "Find your way",
    "The sidebar went from one flat list to a few groups, and the dashboard became something you can read at a glance.",
    "Eleven all-caps links in one flat list, in a dark, dense interface.",
    "A few groups that open when you need them, with the fabric and region you’re working in at the top.",
    old=("old-collections", "The old collections screen: a dark sidebar of eleven all-caps links next to a plain table of collections with filters for Key-Value, Document, Dynamo and Edge.")))
S.append(single(1, "The new dashboard", xp("new-dashboard",
    "The new Macrometa dashboard: a light sidebar grouped into Activity, Data, Compute, Access and Network, a Locations map with active locations listed by name, a Pulse chart of the last ten minutes, and Global Metrics with a date range.",
    [("Grouped, not flat.", "Activity, Data, Compute, Access and Network open when you need them, instead of eleven links at once.", "0.5,6.7,19.5,36"),
     ("Locations by name.", "Active locations are listed by name next to the map, so you don’t have to read pins.", "84.7,15,12.4,18.5"),
     ("Is it working right now?", "Pulse shows the last ten minutes of traffic at a glance.", "19.9,54.4,78.4,30")])))
S.append("        </div>\n")

S.append(head(2, "One system, every screen", "One calm system",
    "The same patterns run from the simplest list to the most technical tools: clear headings, plain labels, and actions where you expect them.",
    "Plain tables with small type, and each area looking a little different.",
    "Breadcrumbs, tabs, badges and menus that work the same way everywhere.",
    old=("old-graphs", "The old graphs screen: the dark sidebar and a plain list of graph names, each with an Edit link.")))
S.append(tabs("ui", 1, "The system at work", "Click a tab to see each screen and the decisions behind it", [
    ("Your data", "a collection, its numbers and its actions", xp("new-collection-data",
        "A collection called test_doc1: a breadcrumb, tabs for Data, Indexes, Stream and Settings, a connector banner, document and storage counts, a document search, New Document with Import and Export, and a menu on each row to move or delete.",
        [("Always know where you are.", "A breadcrumb and four tabs keep a collection’s data, indexes, stream and settings together.", "20,1.7,18.5,8.3"),
         ("The numbers first.", "Document count and storage sit at the top, before the table.", "20,18.9,78.3,8"),
         ("Actions where you expect them.", "Import and export sit under the main action.", "82.5,29.8,14.6,12"),
         ("Row actions on demand.", "Move and delete appear on a row only when you ask, so the table stays calm.", "83.4,68.8,13.6,12.3")])),
    ("Query editor", "writing and running a query", xp("new-query-worker",
        "A query editor: code with line numbers and syntax colours, a switch between C8QL and SQL, parameters as JSON or a table, a batch size, and Update, Run Query and Clear Results buttons.",
        [("Code that reads like code.", "Line numbers and syntax colours make queries easy to scan.", "21.2,13.7,52,41.3"),
         ("Two languages, one switch.", "Switch between C8QL and SQL without leaving the editor.", "66.8,14.2,6.2,11.4"),
         ("Parameters your way.", "Edit parameters as JSON or as a table.", "74.5,14.2,24.5,17.1"),
         ("Clear next steps.", "Update, Run Query and Clear Results sit in one row under the editor.", "21.2,57.3,30,5.5")])),
    ("Managed keys", "a long, technical list made easy to scan", xp("new-managed-keys",
        "The Managed Keys table: an Access group in the sidebar, search with service, tenant and fabric filters, coloured badges for service and status, and a menu on each row.",
        [("Security in one group.", "Users, API keys, managed keys, secrets and connections sit together under Access.", "0.5,30,17.1,23.6"),
         ("Filter, don’t scroll.", "Search plus service, tenant and fabric filters narrow a long list fast.", "21.1,9.3,50.5,3.5"),
         ("Badges you can scan.", "Each service has its own badge colour.", "42.2,21.3,6.6,67.8"),
         ("Status at a glance.", "Enabled, disabled and deleting each have a distinct badge.", "84.2,21.3,6.9,67.8")])),
    ("Function detail", "an edge function and its versions", xp("new-function-detail",
        "The Function Detail window: name, description, resource URL with copy buttons, type and dates, then Test Execution and Versions tabs, with active and inactive badges and a menu to activate, download or delete a version.",
        [("Copy in one click.", "The name and resource URL each have a copy button.", "68.4,14.2,3.4,12.9"),
         ("Test before you ship.", "Test Execution sits next to Versions.", "28.2,41.3,13.5,3.6"),
         ("Which version is live.", "Active and inactive versions are labelled, so the live one is obvious.", "42.4,57.2,6.2,21.1"),
         ("Every version within reach.", "Activate, download or delete any version from its menu.", "54.3,65.3,16.2,11.2")])),
]))
S.append("        </div>\n      </section>\n")

# ---------------- Part 2: onboarding and activation
S.append('''
      <section class="sec" id="part2" data-title="Part 2: A guided start">
        <h2 class="sl">Part 2 · A guided start</h2>
        <p><strong>I led onboarding and activation:</strong> how developers arrive, what they see first, and how they get to something working.</p>
''')
S.append(head(3, "A clear way in", "Show the way",
    "Sign-up became the first place the product explains itself, for people who arrive on their own and for teammates who are invited.",
    "A small login card, with sign-up as a link underneath.",
    "A free account that leads with what you can build, asks for little, and lets you sign up with GitHub or Google.",
    old=("old-login", "The old login: a small white card with email, password, Remember me and a Log in button, and a Sign up link underneath.")))
S.append(tabs("su", 1, "Getting in", "Click a tab to see each way in, and the decisions behind it", [
    ("Sign up", "a free developer account", xp("new-signup",
        "Create a free developer account: on the left, the developer platform for the edge, build apps and APIs in minutes not months, no credit card required, apps everywhere, and SOC 2 security. On the right, domain, email and password, and sign-up with GitHub or Google.",
        [("Why it’s worth it, first.", "The left side says what you can build, and how fast, before asking for anything.", "9.6,22.2,35.4,52.6"),
         ("Only what’s needed.", "Domain, email and password. Our survey showed most developers will share an email, but few their organisation.", "63.2,30,28.7,23.6"),
         ("Sign up with what you use.", "GitHub and Google skip the form.", "63.4,73.4,28.3,10.2"),
         ("No card needed.", "Instant access to the playground, with no credit card.", "9.8,45.5,33,8.2")])),
    ("Invited", "joining a teammate’s account", xp("new-invite",
        "You have been invited to Macrometa: the inviting account, a Create an account button, a fallback link, and a Need help line pointing to support. A Learn More button sits at the top for people new to Macrometa.",
        [("Who invited you.", "The invite names the account you’re joining.", "28.6,14.4,41,10"),
         ("One button.", "A single Create an account button, with a plain link as a fallback.", "28.9,27,13.6,5.2"),
         ("Help is one reply away.", "Reply to the email or contact support.", "28.6,41.2,35.6,3.2"),
         ("New here?", "People who’ve never heard of Macrometa can learn more first.", "73.9,2.1,20.9,3.9")])),
]))
S.append("        </div>\n")

S.append(head(4, "A first visit with a next step", "Show the way",
    'New users now land on a welcome with a short intro, a video, and three places to start. A survey answer asked for “a brief video of key capabilities”, and the welcome has one. We went through two iterations of how to point people to blueprints and starting points. <span class="todo">[? what changed between the two, and why]</span>',
    "Straight into a dashboard of maps and metrics, with nothing to do.",
    "A welcome that explains the platform in one line and offers three clear ways to begin."))
S.append(tabs("wl", 1, "The welcome, in two iterations", "Click a tab to compare the first and second iteration", [
    ("First iteration", "build, use a blueprint, or talk to us", xp("new-welcome-a",
        "Welcome to Macrometa: a short intro to the Global Data Network, a 3:32 intro video, and three cards: Create your first collection, Start with a blueprint, and Get in touch.",
        [("The platform in one line.", "A short intro says what Macrometa’s network does.", "18.4,29.2,29.6,16.4"),
         ("A video for the curious.", "A three-and-a-half-minute intro, as a survey answer asked for.", "51.7,35.5,30,11.3"),
         ("Three ways to start.", "Create a collection, start from a blueprint, or get in touch.", "18.4,54.7,63.3,11.3"),
         ("Help, always visible.", "Support is one link away.", "18.2,69.2,18.6,2.9")])),
    ("Second iteration", "learn by doing", xp("new-welcome-b",
        "The same welcome with three different cards: Quickstart Guide, Developer Tools, and Tutorials.",
        [("Three ways to learn.", "The cards became Quickstart Guide, Developer Tools and Tutorials.", "18.4,54.7,63.3,11.3"),
         ("Code-first, if you prefer.", "Developer Tools points to the CLI, SDKs and libraries.", "39.8,54.7,20.5,11.3"),
         ("Start to finish.", "Tutorials are complete exercises for common use cases.", "61.1,54.7,20.6,11.3")])),
]))
S.append("        </div>\n")

S.append(head(5, "Never a blank page", "Start from something",
    "Creating a collection became a guided path: an empty state that teaches, plain-language choices, and sample datasets to start from. 85% of users adopted templates, because one click added a working sample to whatever they were creating.",
    "A form of required fields in database terms, with only small info icons for help.",
    "Choose a type in plain words, start from a sample dataset in one click, and find the docs right where the question comes up.",
    old=("old-new-graph", "The old New Graph form: required fields for name, edge definitions, from collections, to collections and vertex collections, each with a small info icon, and an Examples tab tucked in the corner.")))
S.append(tabs("bp", 1, "Creating a collection", "Click a tab to follow the flow, and see the decisions behind each step", [
    ("Empty state", "what you see before your first collection", xp("new-collections-empty",
        "Get Started with Collections: a one-line explanation, a Create a Collection button, and three cards below: Intro to Collections, Developer Tools and Sample Apps.",
        [("An empty screen that teaches.", "A one-line explanation and one clear action, instead of an empty table.", "41.6,40.4,35.2,22.6"),
         ("Learn without leaving.", "Intro to Collections, Developer Tools and Sample Apps sit right below.", "20,90.8,78.3,7.3"),
         ("Docs in the same corner.", "The docs button sits in the same place on every page.", "95.7,6,2.6,4.4")])),
    ("Choose a type", "five collection types in plain words", xp("new-collection-type",
        "New Collection: five cards, Key-Value, Document, Redis Mode, Dynamo Mode and Graph Edge, each with a one-line description, and a link to learn about collection types.",
        [("Choose by what it does.", "Each type has a one-line description in plain words.", "31.7,26.5,36.6,35.4"),
         ("Bring the tools you know.", "Redis and Dynamo modes say they work with the SDKs developers already use.", "31.7,38.8,36.6,10.9"),
         ("Not sure? Learn first.", "A link explains the types and data models.", "31.5,65.5,25,2.8")])),
    ("Sample data", "a document collection from a sample", xp("new-sample-datasets",
        "New Document Collection, Sample Datasets: Transactions and Users, each with a Create button, and a link to learn about document collections.",
        [("A step, not a dead end.", "The breadcrumb shows where you are, and the way back.", "31.7,21.7,30.9,2.5"),
         ("Start with realistic data.", "Samples like e-commerce transactions create a working collection in one click.", "31.7,29.8,36.6,16.3")])),
    ("More samples", "the same pattern for key-value", xp("new-kv-samples",
        "New Key-Value Collection, Sample Datasets: Recommendations, Sensors, Users and User Preferences, each with a Create button.",
        [("The same pattern for every type.", "Key-value collections get their own samples.", "31.7,29.8,36.6,32.7")])),
    ("Name and options", "creating from scratch", xp("new-kv-form",
        "New Key-Value Collection: a required name field with its naming rules underneath, four options as checkboxes with info icons, and a link to learn about key-value collections.",
        [("Rules before mistakes.", "Naming rules sit under the field, so errors are avoided, not reported.", "31.7,34,27,1.9"),
         ("Options, explained.", "Each option has an info icon that explains it in place.", "31.7,38,12.3,10.5"),
         ("Help in context.", "A link to key-value docs, right where the question comes up.", "31.7,51.7,16.9,1.9")])),
]))
S.append("        </div>\n      </section>\n")

# ---------------- Results
S.append('''
      <section class="sec" id="results" data-title="Results">
        <h2 class="sl">Developers who stay</h2>
        <p>I tested key interactions with 15 developers across experience levels before launch. After six months of use, product analytics and the customer success team showed the change:</p>
        <figure>
          <div class="chain" role="list" aria-label="Results">
            <div class="link impact" role="listitem" style="--k:0"><div class="k">Retention</div><div class="v">+<span data-count="54" data-start="0">54</span>%</div><div class="what">customer retention</div><div class="ctx">After 6 months</div></div>
            <div class="link" role="listitem" style="--k:1"><div class="k">Support</div><div class="v">−<span data-count="70" data-start="0">70</span>%</div><div class="what">support tickets</div><div class="ctx">From customer success</div></div>
            <div class="link" role="listitem" style="--k:2"><div class="k">Onboarding</div><div class="v"><span data-count="73" data-start="0">73</span>%</div><div class="what">faster sign-up completion</div><div class="ctx">Product analytics</div></div>
            <div class="link" role="listitem" style="--k:3"><div class="k">Templates</div><div class="v"><span data-count="85" data-start="0">85</span>%</div><div class="what">adoption of templates</div><div class="ctx">Product analytics</div></div>
          </div>
          <figcaption class="caption">How we measured: product analytics and customer success, after six months of use.</figcaption>
        </figure>
        <p>User satisfaction rose 50%, and sales leads rose 55%. Macrometa reached $2.3M in annual recurring revenue, and better onboarding was part of that story: marketing promoted the new flow to bring people in.</p>
      </section>

      <section class="sec" id="how" data-title="How I work">
        <h2 class="sl">What this project shows about how I work</h2>
        <div class="vx-how vxb rv">
          <div class="card"><b>I start where people get stuck.</b><p>Support feedback, and using the product as a brand-new user, showed exactly where developers dropped off.</p><a class="proof" href="#research">The research</a></div>
          <div class="card"><b>I turn gaps into a plan.</b><p>The competitive analysis listed what we lacked. The onboarding work answered most of it.</p><a class="proof" href="#research">Where we stood</a></div>
          <div class="card"><b>I design for every level.</b><p>Samples and tutorials for Tom, starting out. CLI and SDK links for Alex’s team.</p><a class="proof" href="#part2">A guided start</a></div>
          <div class="card"><b>I share the work and own my part.</b><p>The UI refresh was shared with our Head of Design. Onboarding and activation were mine.</p><a class="proof" href="#part1">A clearer product</a></div>
        </div>
        <p class="closing">The goal behind all of it: no developer should have to figure it out alone.</p>
      </section>
''')
open("src/sections.html", "w").write("".join(S))

# ---------------- Shell: title, hero, At a glance, next card
t = open("src/shell.html").read()
t = re.sub(r"<title>.*?</title>", "<title>Macrometa Case Study</title>", t, count=1)
hero = '''      <header class="top" id="overview" data-title="Overview">
        <h1 class="sl">No developer left to figure it out alone</h1>
        <p class="intro rv" style="--d:180ms">Macrometa’s platform was powerful, but new developers were left to work it out on their own, and many turned to support or left. With our Head of Design, I refreshed the platform’s interface, and I led a new onboarding built on templates, sample data and tutorials. Customer retention rose 54%, and support tickets fell 70%.</p>
        <dl class="facts rv" style="--d:260ms">
          <div><dt>Role</dt><dd>Product designer<span class="sub">UI refresh with the Head of Design. Onboarding and activation, led by me.</span></dd></div>
          <div><dt>Team</dt><dd>Head of Design, Head of Product and engineers</dd></div>
          <div><dt>Timeline</dt><dd>About 3 months<span class="sub">2022 to 2023</span></dd></div>
          <div><dt>Status</dt><dd>Shipped</dd></div>
        </dl>
        <figure class="hero-img hero-top" data-zoom tabindex="0" role="button" aria-label="Enlarge image"><img src="images/new-welcome-b.webp" width="2000" height="1422" alt="The new Macrometa welcome: Welcome to Macrometa, a short intro to the Global Data Network, an intro video, and three cards for the Quickstart Guide, Developer Tools and Tutorials."></figure>
        <p class="zoom-hint">Click any image to see it full size.</p>
      </header>'''
t = re.sub(r'      <header class="top" id="overview".*?</header>', lambda m: hero, t, count=1, flags=re.S)
glance = '''      <section class="sec ov" aria-label="At a glance">
        <h2 class="sl">At a glance</h2>
        <ol class="story">
          <li class="st" style="--k:0"><span class="dot" aria-hidden="true"></span><div class="lab">The problem</div><div class="txt">Macrometa could do a lot, but new developers were left to figure it out alone. They dropped off or turned to support.</div></li>
          <li class="st" style="--k:1"><span class="dot" aria-hidden="true"></span><div class="lab">What I found</div><div class="txt">Three gaps: no real onboarding, nothing to help developers of every level get started, and an interface that wasn’t consistent.</div></li>
          <li class="st key" style="--k:2"><span class="dot" aria-hidden="true"></span><div class="lab">The idea<span class="turn">Turning point</span></div><div class="txt">A clearer, consistent interface, and a guided start, so no developer has to figure it out alone.</div></li>
          <li class="st" style="--k:3"><span class="dot" aria-hidden="true"></span><div class="lab">What shipped</div><div class="txt">A refreshed interface across the platform, with our Head of Design. And a new onboarding I led: a clearer sign-up, a welcome with next steps, and empty states and sample datasets so nobody starts from nothing.</div></li>
          <li class="st end" style="--k:4"><span class="dot" aria-hidden="true"></span><div class="lab">Results</div>
            <div class="txt results" id="results-row" role="list">
              <div class="cell impact" role="listitem"><div class="v">+<span data-count="54" data-start="0">54</span>%</div><div class="what">customer retention</div></div>
              <div class="cell" role="listitem"><div class="v">−<span data-count="70" data-start="0">70</span>%</div><div class="what">support tickets</div></div>
              <div class="cell" role="listitem"><div class="v"><span data-count="73" data-start="0">73</span>%</div><div class="what">faster sign-up completion</div></div>
              <div class="cell" role="listitem"><div class="v">$2.3M</div><div class="what">annual recurring revenue</div></div>
            </div>
          </li>
        </ol>
      </section>'''
t = re.sub(r'      <section class="sec ov" aria-label="At a glance">.*?</section>', lambda m: glance, t, count=1, flags=re.S)
nxt = '      <a class="next" href="#"><div class="thumb"><img src="images/next-strattie.webp" width="2000" height="1365" alt=""></div><div><span class="company">Next project · Strattie</span><h2>Solving the first-step problem</h2><span class="go">Read case study →</span></div></a>'
t = re.sub(r'      <a class="next" href="#">.*?</a>', lambda m: nxt, t, count=1, flags=re.S)
open("src/shell.html", "w").write(t)
print("ok")
