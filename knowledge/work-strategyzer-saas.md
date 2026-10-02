# Case study: Two days to thirty minutes

Strategyzer · Program templates and live cohort deliveries (enterprise SaaS admin)

Source for the Ask Olaide chat. Every fact here comes from the approved, published case study (`case-studies/strategyzer-saas`, `copy/strategyzer-copy-final.md`). The chat may only use what's written here.

- **Link:** `case-studies/strategyzer-saas/index.html`
- **Link card:** "Cutting a two-day workflow to thirty minutes" · Case study · Strategyzer
- **In one line:** One change to a live enterprise program could take two days, and only two people knew how to make it. I redesigned how program templates and live cohort deliveries stay in sync, and a full round of changes now takes about thirty minutes.

---

## The basics

| | |
|---|---|
| Company | Strategyzer |
| My role | Senior product designer, and the only designer. I led the work end to end, from discovery to delivery. |
| Team | Me and one engineer, with our Head of Product advising |
| Timeline | About 3 months. My first project at Strategyzer. |
| Status | Live |

## The problem

- Strategyzer runs strategy programs for large companies. A small team of program designers builds each one from playbooks, and one program can have **10 to 20 client teams** working through it at once.
- Every program has four layers: the program template, the cohort delivery (one client's live run), team projects (one per team) and workspaces (where teams work). Once a cohort delivery was created, these layers stopped talking to each other.
- Programs change while they're live. So a coach's two-minute decision turned into four jobs: update the template, edit the delivery's settings by hand **in code**, repeat that for every team, then open every workspace to hunt for broken links.
- A full round of changes could take **two to three days**, and only two people knew how to do it.
- Kurt Bostelaar, Program Designer: "If there's a 12-team cohort and there's changes, it ends up being 2 to 3 days sometimes."

## Research

- I didn't ask people what they wanted. I asked the program designers who ran deliveries most often, especially Kurt and Latif, to share their screens and walk me through a real program from start to finish.
- I also spoke with Dora in customer success, and with Alex, our CEO, who runs live deliveries with clients.
- Watching the work showed habits nobody thought to mention: deleting events to hide them, doing every change twice, building a whole separate program just to share one workspace, and opening every workspace before each session to check links.
- **Many symptoms, four causes:**
  1. The template and the cohort delivery lost touch.
  2. Effort grew with every team: one decision became 20 edits.
  3. Staying safe meant deleting things.
  4. Everything depended on a name: one stray space sent a team to a dead end.
- Underneath it all: program designers had two jobs at once, keeping the live delivery moving and keeping a clean template for the next client, and the platform made them do both by hand. That made a process only experts could run, while the business wanted coaches, partners and eventually clients to run programs themselves.

## The idea

**The program template is the single source of truth, and every cohort delivery chooses what to take from it.**

Four principles followed:
- **Change it once:** effort never grows with the number of teams.
- **Stay in control:** nothing is forced onto a live delivery.
- **Nothing is destructive:** hiding replaces deleting, and every action can be undone.
- **Always know where you are.**

## Choosing what not to build

With one engineer and three months, I ranked every opportunity by three questions: how often does it happen, would a failure be visible to clients, and can we build it well in the time we have? Changing live programs came out on top on all three. The e-learning system, exercise tracking, a reusable exercise library and reorganising playbooks were left for later. Making the trade-offs visible kept the release focused, and nobody felt their problem had been ignored.

## What shipped: four features

1. **Template updates, reviewed and applied.** Cohort deliveries are told when their template changes. Program designers review each update and choose to apply or ignore it. No more editing code by hand.
   - **The strategic call:** review, not automatic sync. Automatic sync would have saved a step, but it would have changed a live client program without anyone choosing to. So every update waits until the people running the delivery decide.
2. **Copy workspaces to many team projects at once.** Pick several workspaces, search for the team projects, and copy them all in one action, instead of once per team.
3. **Hide and show timeline events.** Hiding replaces deleting. Events stay in place and stay editable while hidden; one event, several, or a whole week at once.
4. **Breadcrumbs inside workspaces.** Every step of the path is a menu, so you can jump to any workspace or run without going back. Before this, even our CEO got lost.

Kurt called the result "a MASSIVE game changer".

## Testing

- Tested with **six** of the people who deliver programs most often, program designers and coaches, using scenarios from real deliveries.
- The response was strongly positive. It confirmed the core decisions, including reviewing updates before they apply.
- I stayed with the work through the build and kept gathering feedback for months after launch.

## Results

| Result | Before | After | How it was measured |
|---|---|---|---|
| A full round of changes to a live cohort delivery | 2 days | **about 30 minutes** | Reported by program designers |
| Copying workspaces to every team | 4 hours | **20 minutes** | From Kurt's Slack message |
| Satisfaction | — | **9.5 / 10** | Average across six frequent users, a small internal test |
| Business | — | **Six-figure** enterprise deals supported | Per enterprise program |

People also reported fewer mistakes and more confidence in what they sent to clients. During an enterprise client's workshops, the platform held up through a full day of live changes, and Kurt, who had been nervous about live events for years, used the new admin all day.

## Beyond the numbers

These were shared results. My part was removing what slowed the team down in the product.
- **Enterprise:** faster building and more reliable delivery gave the team confidence to commit to and close more enterprise programs, each worth six figures.
- **Individual subscribers:** faster turnaround put more playbooks into the library.
- **Scale:** coaches can now change a program mid-delivery without waiting for a program designer, the first real step toward clients running their own programs.

## What this shows about how I work

- I look for causes, not symptoms.
- I simplify the model before the screens.
- I treat scope as a design decision.
- I stay close to the people doing the work.

## What's next

Search across the product, linking workspaces by a fixed ID instead of by name, reliable links between workspaces, and a simpler structure for playbooks and projects. The goal: someone who first heard the word "playbook" last week should be able to run one with confidence.

---

## Rules for the chat

- The six-figure deals were **supported** by the work. Never say I closed, won or generated them.
- The times are what program designers reported for their own work. Say "about thirty minutes" and "two days", not precise savings or percentages.
- The 9.5 / 10 comes from a small internal test with six people. If asked, say so.
- Kurt's words can be quoted as written. Name colleagues only as the case study does: Kurt Bostelaar (Program Designer), Latif, Dora (customer success), Alex (CEO).
- The engineer built it with me. Never say I built it alone.
