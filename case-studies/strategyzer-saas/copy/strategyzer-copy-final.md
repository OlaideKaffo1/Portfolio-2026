<!-- Approved copy for the Strategyzer SaaS case study ("Two days to thirty minutes"), exported from the built page with every toggle and tab opened. The source of truth for wording is src/sections.html and src/shell.html; regenerate this file after editing them. -->

# Two days to thirty minutes
One change to a live enterprise program could take two days, and only two people knew how to make it. I redesigned how Strategyzer’s program templates and live cohort deliveries stay in sync, and a full round of changes now takes about thirty minutes.
Role — Senior product designer — The only designer. I led the work end to end, from discovery to delivery.
Team — Me and one engineer — With our Head of Product advising
Timeline — About 3 months — My first project at Strategyzer
Status — Live
Click any image to see it full size.

## At a glance
- The problem — Strategyzer's enterprise programs run with up to 20 client teams at once. Changing one after teams had started meant editing code by hand, repeating it for every team and checking every link. A full round of changes could take two to three days.
- What I found — A long list of complaints came down to four causes. One explained most of the pain: once a cohort delivery started, it lost its connection to the template it came from.
- The idea — Turning point — The program template is the single source of truth, and every cohort delivery chooses what to take from it.
- What shipped — Four features built on that idea: template updates you review before applying, copying workspaces to many team projects at once, hiding and showing timeline events, and breadcrumbs inside workspaces.
2d → 30m — for a full round of changes to a live cohort delivery
4h → 20m — to copy workspaces to every team
9.5/10 — satisfaction from six of our most frequent users
6 figures — enterprise deals supported by faster, more reliable delivery

## One change, twenty copies, two days
Building a program was manageable. Changing one after teams had started was not.
Strategyzer runs strategy programs for large companies. A small team of program designers builds each one from playbooks, which mix learning content, exercises and shared workspaces where teams do the work. A single program can have 10 to 20 client teams working through it at once.
Every program has four layers, and the moment a cohort delivery was created, they stopped talking to each other.
1 · Program template — The reusable program — Timeline and workspaces
2 · Cohort delivery — One client’s live run of the program — Created when a client books it
3 · Team projects — One per team — Up to 20 at once
4 · Workspaces — Where teams work — Linked by exact name
In the product, a cohort delivery’s timeline is called its playbook instance, so you’ll see that name in the screens below.
Programs change while they’re live. An exercise doesn't land, a presentation gets reworked overnight, or a client asks for something new on day two. So a coach's two-minute decision turned into four jobs:
- Update the template, so it stays clean for the next client.
- Edit the cohort delivery's settings by hand, in code, because the admin couldn't see anything added after the delivery was created.
- Repeat that edit for every team, all 10, 15 or 20 of them.
- Open every team's workspaces to hunt for broken links.
"If there's a 12-team cohort and there's changes, it ends up being 2 to 3 days sometimes." — Kurt Bostelaar, Program Designer

## What watching the work revealed

### The workarounds nobody mentioned
I didn't ask people what they wanted. I asked the program designers who ran deliveries most often, especially Kurt and Latif, to share their screens and walk me through a real program from start to finish. At every step I asked what it was for, and why it happened there. I also spoke with Dora in customer success, who heard clients’ complaints first, and with Alex, our CEO, who runs live deliveries with clients.
"I literally sometimes spend 2 to 3 days just copying stuff around." — Kurt Bostelaar, Program Designer
Watching the work showed habits so routine that nobody thought to mention them:
Deleting to hide — Later timeline events were deleted so teams couldn't see them yet, then pasted back from the template when it was time.
Doing everything twice — Every change was made in the template and in the cohort delivery, because copying it back later could drag client data into the template.
Building around the system — A whole separate program was built just so teams could share one workspace.
Checking every link by hand — Before each session, every workspace for every team was opened, because at least one link was almost always broken.
The discovery board. Interview synthesis, a journey map, screen-by-screen audits of the program editor and admin, and the opportunity solution tree. Click to see it full size.

### Many symptoms, four causes
Cause 1 — The template and the cohort delivery lost touch — Once a cohort delivery was created, it had no link to its template, so every improvement was carried across by hand.
Cause 2 — Effort grew with every team — One decision became 20 edits, and each edit was another chance for a mistake.
Cause 3 — Staying safe meant deleting things — The only way to release content in stages was to remove it.
Cause 4 — Everything depended on a name — Timeline events found their workspaces by exact name, so one stray space or a leftover "Copy" sent a team to a dead end. That one detail explained the broken links, the code edits and the fear of renaming anything.
Underneath it all
Program designers had two jobs at once: keep the live delivery moving, and keep a clean template ready for the next client. The platform made them do both by hand.
Together, this made a process only experts could run, while the business wanted coaches, partners and eventually clients to run programs themselves.

## One idea to hold it together
The platform didn't need more controls. It needed one simple rule that people could understand at a glance:
The program template is the single source of truth, and every cohort delivery chooses what to take from it.
Four principles followed from that:
Change it once — Effort should never grow with the number of teams.
Stay in control — Nothing is forced onto a live delivery.
Nothing is destructive — Hiding replaces deleting, and every action can be undone.
Always know where you are — In a platform this deep, knowing where you are is a feature.

### Choosing what not to build
With one engineer and three months, I ranked every opportunity by three questions: How often does it happen? Would a failure be visible to clients? Can we build it well in the time we have? Changing live programs came out on top on all three. The opportunity solution tree below shows how it all fits together.
- Template updates, reviewed and applied
- Copying workspaces to many team projects at once
- Hiding and showing timeline events
- Breadcrumbs inside workspaces
- The e-learning course system
- Exercise tracking
- A library of reusable exercises
- How playbooks and projects are organised
Making the trade-offs visible kept the release focused, and nobody felt their problem had been ignored.

*Tab: Changing live programs: all three opportunities shipped in this release. Click to see it full size.*

*Tab: Finding your way: navigation shipped as breadcrumbs, while search and linking across cohort deliveries lead the next phases. Click to see it full size.*
Changing live programs: all three opportunities shipped in this release. Click to see it full size.

## Four features, one model
Each feature puts one of the principles into the product. Together they work as one job: send the workspaces, bring the updated timeline into the cohort delivery, then choose when teams see it. Kurt called the result “a MASSIVE game changer”.

### 1. Template updates, reviewed and applied
Principle — Stay in control
The heart of the redesign. It reconnects the template and the cohort delivery, ends the double work and takes code out of the job.
Before — Every template change was carried into each cohort delivery by hand, by editing its settings in code. A new workspace stayed invisible to the timeline until someone typed its exact name.
Now — Cohort deliveries are told when their template changes. Program designers review each update and choose to apply or ignore it, and any new workspace they accept appears in the delivery's timeline, ready to link.
A strategic call — Review, not automatic sync. Syncing template changes into every cohort delivery automatically was an option. It would have saved a step, but it would also have changed a live client program without anyone choosing to. So I designed a review step: every update waits until the people running the delivery decide what to apply and what to ignore.

#### Before
1. It started in the template. To carry an update into a cohort delivery, the program designer opened the program template and switched on Show JSON Editor, a view made for engineers. (0:01)
2. Code, not a page. The whole program, every week and every event, opened as one long block of JSON. (0:02)
3. Found by scrolling. There was no search or outline. Finding the right event meant scrolling through hundreds of lines. (0:04)
4. Copied by hand. Program designers aren’t coders, yet they had to drag to select the code and paste it into the cohort delivery’s own JSON. One stray comma or missing bracket and the whole timeline broke. (0:14)
5. Linked by exact name. Each event found its workspace by exact name (the matchBy line), so one stray space sent a team to a dead end. (0:22)

#### After
1. The update comes to you. A notice on the page says the template has changed, without blocking the work. (0:02)
2. Each change listed on its own. Review changes shows every update separately, so nothing arrives as one big lump. (0:07)
3. See it before you take it. Expanding an update shows exactly what’s new, down to the workspace and its activities. (0:12)
4. You choose what to apply. Only the updates you select are applied. Nothing is forced onto a live delivery. (0:19)
5. Clear confirmation. A message confirms the delivery has been updated. (0:22)

#### The designs
Click a tab to see each screen and the decisions behind it

*Tab: Update notice: The notice on the cohort delivery’s timeline that the template has changed*
1. A notice, not an interruption. The update appears as a quiet banner above the work, not a pop-up that blocks it.
2. One clear next step. Review Changes is the only action, so it’s obvious what to do.
3. The delivery keeps running. The timeline stays fully editable while the update waits. Nothing changes until someone reviews it.

*Tab: Review: The list of template updates, each with its own checkbox*
1. Each change on its own. Updates are listed separately, so program designers can take some and leave others.
2. Named in plain words. Each update says what changed and where, like “New workspace added to Week One”.
3. Take everything at once. Select all is there when every update is wanted.
4. Nothing applies by default. Apply Selected starts at zero and counts up, so nothing lands on a live delivery by accident.

*Tab: Update details: An update opened to show exactly what’s new*
1. The open update stands out. The expanded row is highlighted, so it’s clear which change you’re looking at.
2. What’s new, in a sentence. A short summary explains the change before anyone decides.
3. The details that matter. The new workspace shows its name and what’s inside it: 4 activities and 2 exercises.

*Tab: Applied: The cohort delivery’s timeline after the update, with the confirmation*
1. Clear confirmation. A message confirms the delivery was updated, and can be dismissed.
2. The notice clears. Once applied, the update banner disappears, so there’s nothing left to review.
3. Straight back to work. The timeline is ready to use, with no reload and no code to check.
Update notice: The notice on the cohort delivery’s timeline that the template has changed

### 2. Copy workspaces to many team projects at once
Principle — Change it once
Before — One workspace could go to one team project at a time. Twenty teams meant doing it twenty times, for every workspace.
Now — Pick several workspaces, search for the team projects, and copy them all in one action.

#### Before
1. The browser’s menu, not ours. The picker used the operating system’s default dropdown, with none of our design system, so it looked and behaved unlike the rest of the product.
2. No search. There was no way to type a name. The only way to find a project was to scroll for it.
3. Scroll, scroll, scroll. Every project in the account sat in one long list. With hundreds of projects, finding the right one could take ages.
4. Grouped by owner, not by need. Projects were sorted by who manages them, so you had to know where a team’s project lived before you could find it.
5. One project at a time. Only one destination could be picked, so the same workspace had to be copied again for every team.

#### After
1. Pick as many as you need. Each workspace card has a checkbox, so you can select several at once. (0:01)
2. Actions follow the selection. A bar shows how many workspaces are selected and what you can do with them: copy, move or delete. (0:02)
3. Your selection carries over. Copy opens with the chosen workspaces already filled in. (0:07)
4. Search, then pick many. Find team projects by name and tick every one that needs the workspaces. (0:10)
5. Done in one go. One click copies every workspace to every team project, and a message confirms it. (0:15)

#### The designs
Click a tab to see each screen and the decisions behind it

*Tab: Select workspaces: Ticking several workspaces at once*
1. Select from the cards. Every workspace card has a checkbox, so selecting happens right where people already work.
2. Selected is obvious. Ticked cards turn blue, title and all, so it’s clear what’s about to be copied.
3. Actions in one bar. A bar shows how many workspaces are selected and everything you can do with them.
4. Delete stands apart. Delete is red, so the risky action can’t be mistaken for the others.

*Tab: Copy dialog: The dialog opens with the selection filled in*
1. Your selection carries over. The chosen workspaces arrive already filled in, as chips you can remove.
2. Plural from the start. The field reads Target project(s) and asks for one or more, so it’s clear you can pick many.
3. You don’t lose your place. The dialog sits over the workspaces, and the selection bar stays in view below it.

*Tab: Pick projects: Searching for projects and ticking several*
1. Search by name. With hundreds of projects, typing a name beats scrolling for it.
2. Tick as many as you need. Checkboxes instead of a single choice, so one copy reaches every team.
3. Choices show as chips. Each ticked project appears in the field, with an x to remove it.
4. Our own dropdown. Built with our design system, unlike the browser’s menu in the old version.

*Tab: Ready to copy: Every workspace and project, checked before copying*
1. A last look before copying. Every workspace and every project sits in one place, so it’s easy to check before anything happens.
2. Easy to change. Any workspace or project can be removed with its x, without starting again.
3. One button for all of it. Copy sends every workspace to every project at once.

*Tab: Copied: The confirmation once the workspaces are copied*
1. Ready for the next task. The checkboxes clear and the bar disappears, with no reload and no new page.
Select workspaces: Ticking several workspaces at once

### 3. Hide and show timeline events
Principle — Nothing is destructive
Before — Releasing content in stages meant deleting events, with no undo, then pasting them back from the template’s code when it was time.
Now — Program designers build the whole program up front, then hide or show one event, several at once or a whole week, and keep editing while they’re hidden.

#### Before
1. Deleting was the only way to hide. To keep an event from teams until it was needed, the program designer had to delete it.
2. No undo. The dialog warns there’s no undo, so the event and its links were simply gone.
3. Delete looks safe. Delete is styled like any other main button, not marked as a risky action.
4. Bringing it back meant code. To show the event later, it was copied from the template’s JSON and pasted into the cohort delivery, the workflow from feature 1.

#### After
1. Select several at once. Tick the events and a bar offers Hide, Duplicate or Delete for all of them. (0:01)
2. Hidden, not deleted. Hidden events fade and get a Hidden label, but stay in place. A message confirms the change. (0:05)
3. Still editable. Hidden events keep their edit tools, so content can be finished before teams see it. (0:06)
4. Show them just as easily. Select hidden events and the same bar offers Show. (0:09)
5. One at a time. The eye icon on each event hides or shows just that one. (0:14)
6. A whole week in one go. Ticking an event group hides every event in it, and the group is labelled Hidden too. (0:24)

#### The designs
Click a tab to see each screen and the decisions behind it

*Tab: Timeline: A cohort delivery’s timeline before anything is hidden*
1. An eye on every event. Each event has its own hide and show control, next to edit, duplicate and delete.
2. And on every group. The group header has one too, so a whole week can be hidden at once.
3. Checkboxes for working in bulk. Every event and group can be ticked, so several can be changed together.

*Tab: Select: Two events selected, with the actions bar*
1. Selection is clear. Ticked events are tinted blue, so it’s obvious which ones will change.
2. Actions appear in context. A bar appears above the timeline with the count and what you can do.
3. Hide comes first. Hide leads the bar as the most common action, and Delete sits last, in red.

*Tab: Hidden: The two events hidden, still in place*
1. Hidden, but still in place. Hidden events fade to grey instead of disappearing, so the program keeps its shape.
2. A clear label. A Hidden label says what the fading means, so no one wonders if something broke.
3. The eye closes. The eye icon changes to a closed eye, showing the state and how to undo it.

*Tab: Edit while hidden: Hidden events stay fully editable*
1. Still fully editable. Edit, duplicate and delete stay active on hidden events, so content can be finished before teams see it.
2. The bar adapts. With hidden events selected, Hide becomes Show.
3. Both states at once. Selected hidden events are faded and tinted blue, so you can see both states together.

*Tab: Hide one: Hiding a single event from its card*
1. Right on the card. Hide sits with edit, duplicate and delete on every event, so hiding one takes one click, with no selecting.
2. Named on hover. A tooltip says Hide Event, so the icon is never a guess.

*Tab: One hidden: A single event hidden, the rest unchanged*
1. Only that event changes. The hidden event fades while the others stay exactly as they were.

*Tab: Select a group: Selecting a whole week at once*
1. Tick the group, get every event. Ticking Week One ticks all three of its events, so nothing in the week is missed.
2. The count says group. The bar reads 1 event group selected, not 3 events, so it’s clear the whole week is the target.
3. The same actions. Hide, Duplicate and Delete work the same for a group as for single events.

*Tab: Group hidden: A whole week hidden, still editable*
1. One label for the week. The group gets a Hidden label next to its name, so you can see it’s hidden without opening the week.
2. Everything inside fades. All three events go grey, so it’s clear the whole week is hidden from teams.
Timeline: A cohort delivery’s timeline before anything is hidden

### 4. Breadcrumbs inside workspaces
Principle — Always know where you are
Before — Inside a workspace there was no navigation. To reach another one, you clicked the Strategyzer logo to get back to the project, picked a run, then picked a workspace. Even our CEO got lost inside custom playbooks.
Now — Every step of the breadcrumb is a menu. From inside a workspace you can reach any workspace in the run, or any run in the project, without going back. Alex and Carol both called it out.

#### Before
1. The logo was the way out. Clicking the Strategyzer logo was the only way back to the project, and nothing said so.
2. A name, but no path. The workspace showed its own name, but not which run or project it belonged to.
3. Three steps to switch. To open another workspace, you went back to the project, picked a run, then picked a workspace. Every switch meant leaving the work.

#### After
1. Every level is a menu. Clicking the playbook run in the breadcrumb lists every run in this project. (0:01)
2. Look before you leap. Hovering a run shows its workspaces beside it, so you can see inside without leaving the page. (0:02)
3. You always know where you are. A tick marks the current run and the current workspace. (0:05)
4. Jump straight across. The last step lists every workspace in this run. Going from one to the next takes one click. (0:12)
5. Names in full. Long workspace names wrap instead of being cut off, because many of them start the same way. (0:14)

#### The designs
Click a tab to see each screen and the decisions behind it

*Tab: Breadcrumbs: The path at the top of every workspace*
1. The full path, always there. Project, run and workspace sit in one line at the top of every workspace.
2. A clear way back. The project name, with a folder icon, replaces the logo as the way out, and says where it goes.
3. Each step opens a menu. The circled arrow shows that a step opens a menu, not just a link.
4. You are here. The current workspace is in dark text and the steps above it are grey. Long names are shortened so the path fits on one line.

*Tab: Playbook runs: One level down: every run in the project*
1. Every run in the project. Opening the run step lists all the playbook runs in this project.
2. Names in full. Names are shortened in the breadcrumb, but shown whole in the menu.
3. A tick for where you are. The run you’re in is ticked, so you can see your place before you move.
4. An arrow means more inside. Each run has an arrow, showing it opens its own list of workspaces.

*Tab: Workspaces: Two levels down: every workspace in a run*
1. Hover to open. Hovering a run highlights it and opens its workspaces beside it, with no extra click.
2. Every workspace in the run. Pick one and you’re there, without going back to the project first.
3. Two ticks, two levels. Ticks mark both the current run and the current workspace, so you always know where you started.
Breadcrumbs: The path at the top of every workspace

### Tested with the people who do the work
I tested with six of the people who deliver programs most often, a mix of program designers and coaches, using scenarios from real deliveries. The response was strongly positive. It confirmed the core decisions, including reviewing updates before they apply, and helped us decide which parts of the opportunity tree to take on next. I stayed with the work through the build and kept gathering feedback for months after launch.
9.5/10 — average satisfaction across six program designers and coaches

## Days back on every delivery
Program designers got days back on every delivery, and the business could promise more.
Changing a live delivery — 2 days → 30 min — for a full round of changes — As reported by program designers
Copying workspaces — 4 hrs → 20 min — to send a set of workspaces to every team — From Kurt’s message below
Satisfaction — 9.5/10 — average score — Six of our most frequent users
Business — 6 figures — enterprise deals supported by faster, more reliable delivery — Per enterprise program
How we measured: the times are what program designers reported for their own workflows. Satisfaction comes from a small internal test on a 10-point scale.
People also reported fewer mistakes and more confidence in what they sent to clients.

### What the team said
Straight from Slack, in their own words. Click any message to see it full size.
“The UX has improved”
What participants said during an enterprise client’s workshops, reported by the program designer and coach who ran them. The platform, including the new admin, held up through a full day of live changes. Kurt, who had been nervous about the platform during live events for years, used the new admin all day to change the program on the fly.
Program Designer, with a reply from a Strategyzer Coach
Program Designer
Program Designer
Program Designer
CEO
Program Designer
Program Director
Head of Product
Program Designer
Program Designer

### Beyond the numbers
Program designers are Strategyzer's scarcest resource, so giving them back days changed what the business could take on. These were shared results. My part was removing what slowed the team down in the product, so they could build and deliver more.
Enterprise — More programs, with confidence — Faster program building and more reliable delivery gave the team confidence to commit to and close more enterprise programs, each worth six figures.
Individual subscribers — A richer library — Faster turnaround put more playbooks into the library, which made the subscription more valuable for individual users.
Scale — Coaches can change programs themselves — Coaches can now change a program mid-delivery without waiting for a program designer. It's the first real step toward clients running their own programs.

## What this project shows about how I work
I look for causes, not symptoms. — A long list of complaints came down to four causes, and those pointed to one idea. That's how one designer and one engineer made a change this big. — Four causes
I simplify the model before the screens. — Better screens alone wouldn't have fixed this. A clear relationship between a template and its cohort deliveries did, and then the screens could stay simple. — The one idea
I treat scope as a design decision. — With a small team, what we left out mattered as much as what we built. Clear criteria made the trade-offs easy to explain and agree on. — What we didn't build
I stay close to the people doing the work. — From the first screen share to feedback months after launch. — What they said

## Where the work goes next
The rest of the opportunity tree points to the next phases:
- Search across the product.
- Linking workspaces by a fixed ID instead of by name, so renaming a workspace never breaks a link.
- Reliable links between workspaces.
- A simpler structure for playbooks and projects.
The goal behind all of it: someone who first heard the word "playbook" last week should be able to run one with confidence.

## From 12 weeks of spreadsheets to 2 weeks of action