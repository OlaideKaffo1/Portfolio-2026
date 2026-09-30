# Solving the first-step problem

Strategyzer sells a method. Roughly a third of new sign-ups never took a first step with it. This is how we built the thing that tells them where to start, and why the first release deliberately isn't the AI assistant we set out to make.

| | |
|---|---|
| **Role** | Senior product designer. Sole designer; led end-to-end design, from research and strategy to the build. |
| **Team** | Senior product designer (me), Head of Product, 1 engineer. Advised by coaching and customer delivery. |
| **Timeline** | About 6 weeks, spring 2026. Research 1–2 weeks → assistant prototype in days → routing tree in 2 days → Recommender built and tested over 3 weeks → launch in about 1½ weeks. |
| **Status** | Live |

---

## At a glance

- **The problem.** ~35% of new sign-ups never created a project. They arrived with a real business problem, met a library of playbooks, and couldn't tell which one was theirs.
- **What I built first.** A full AI thinking partner, built end to end as a working prototype in code with Claude. It helped people work through their value propositions, brainstorm and pressure-test ideas, and, on the canvas, synthesise their maps, find evidence and validate assumptions.
- **The decision** *(turning point)*. Engineering couldn't build the full assistant in the time frame we needed. My research had already made the main job clear: help people find the right playbook and reach value faster, whether they're brand new or starting their next project. So instead of shrinking the assistant, I made the case to our CEO and Head of Product for a guided playbook flow built around that one job.
- **What shipped.** A guided Playbook Recommender, always available on the platform to new and returning customers alike: two or three questions, one recommendation, one click to a live playbook run. It runs on a routing tree I authored from the research, with AI matching for anything people type in their own words.
- **Results.** 85% of new sign-ups now create a project and run a playbook (from 65%) · 95% satisfaction (from 70%) · Returning usage 4×: 40% return within 30 days of sign-up (from about 10%) · **Revenue: ~18% of churned customers renewed their subscriptions within two weeks of the release email**

---

## The problem

**Customers were spending too long working out which playbook to start with, and many gave up before they began.** A playbook is a guided, multi-step exercise, like running customer interviews or testing a pricing idea, and picking the wrong one can cost hours of work. So people hesitated, guessed, or left.

For a company that sells a method, that's the most expensive failure there is. A playbook nobody starts changes nothing, and every number the business cares about, from activation to renewal, sits behind that first choice.

Enterprise customers have coaches who ask two or three questions and say *start here*. Self-serve customers get a library, and their own judgment at the moment it's weakest.

The data showed how big it was: around 35% of new sign-ups never created a project.

Interviews showed why. I spoke to eight customers in two groups, plus our customer success and coaching teams.

- **Solo founders**, testing a business model before pitching investors. No methodology vocabulary: *"I don't know if people will pay for this."*
- **Heads of strategy and innovation**, validating a proposition before their C-suite, often with half the artefacts done.

On paper they share nothing. Both described the same thing: too many ideas, no obvious first move, and a meeting coming with someone who holds the idea's future.

> Across every conversation, difficulty choosing a playbook was the most frequent complaint, including from our own coaches.

If the people who teach the method found it awkward, this wasn't a skill gap in our users. It was a gap in the product, and not only for newcomers: returning customers faced the same choice every time they started a new project.

---

## The first bet

The first answer was ambitious: Strattie AI, an end-to-end thinking partner across the whole platform, like having a Strategyzer coach beside you at every step. I designed it and built all of it as a working prototype in code, using Claude Code on our FondUI design system.

- **A coach you could talk to.** Available anywhere and aware of your page and project. It helped people work through their value propositions, brainstorm, and pressure-test their thinking, not just decide what to do next.
- **AI on the canvas.** It synthesised canvases and maps, surfaced the evidence behind them, helped validate assumptions, drafted sticky notes, and flagged gaps and weak fits.
- **Guidance along the way.** Recommending the right playbook was one of its many jobs, not the whole product.

Building it for real taught us three things a mockup would have hidden:

- **The value was in the questions.** A good coach asks two or three things before recommending anything. Open conversation lets the answer arrive before the questions do.
- **Doing it well was a far bigger job than it looked.** Vague input, a changing library, knowing its own limits: more than our engineering capacity could carry then.
- **Conversation is a tax on a job that isn't conversational.** *Where do I start?* asks people to articulate the very problem they came to us because they couldn't articulate.

---

## The reframe

Engineering capacity meant the full assistant couldn't ship in time. The team's instinct, a fair one, was to keep the ambition and shrink the scope.

**I pushed back.** A trimmed chatbot is just a worse chatbot. It still needs all the conversation design, still risks recommending playbooks that don't exist, and still asks people to name a problem they can't yet name. We'd ship the hardest part of the vision in its weakest form, and learn nothing about whether guidance moves activation.

So I changed the question from *what's the smallest assistant we can build?* to *what's the one job that matters most right now?* The assistant could think, brainstorm, synthesise and validate. But of everything it could do, only one job sat at the start of every piece of work, a new customer's first project or a returning customer's next one, and it was the one people kept failing at: finding the right playbook.

> One job, finding the right playbook, done properly. Not a smaller version of everything.

**How I made the case.** I needed to convince our CEO and our Head of Product, who was championing the assistant. On a call, I walked them through the live prototype and my research synthesis, which showed the same need recurring across every group: find the right playbook whenever you start something new.

**The pushback** *(set quiet: small, grey, italic)*
Customers had been asking for AI, the industry was moving that way, and a guided flow could look like we weren't being AI-forward.

**My answer** *(set large: the focal point)*
I wasn't dismissing AI; the platform will need it. But finding the right playbook sits at the very start of everything. **If people don't get past it, they never stay long enough to use any AI feature we build.** Win that first, and every later AI release lands on users who are already getting value.

**Decision:** Ship the Recommender first. The assistant comes next.

**What it bought us**
- **It can't hallucinate.** A finite tree over a real library only returns playbooks that exist.
- **It can admit a gap.** When nothing fits, it says so.
- **It's faster than talking.** Three taps beat a paragraph about a problem you're still confused by.
- **It de-risked the bigger bet,** proving guidance moves activation before we spent on conversation.

**What it cost.** Almost everything I'd built moved to a later release: the thinking partner, the canvas synthesis and validation our coaches had asked for, the chat panel and the onboarding tour. That was hard to let go of. But one job finished beats ten jobs started. The first release didn't need to be the assistant. It needed to work.

---

## Designing the Recommender

### The form

I explored three shapes for the Recommender. A centred modal hid the library at the moment you were choosing from it. A full-height rail implied a chat that wasn't there. A small panel docked lower-right shipped: obviously available, and the page keeps working behind it.

From Asana's compact AI menu I borrowed one behaviour: a picked option collapses into a short message and the next question appears beneath it, so the panel never becomes a wall of history.

I cut three things that implied a product we weren't building: a text composer (it promises conversation), a history section (people reach for it when they start something new, not every day) and expand chevrons (false depth). And I framed it as **a utility, not onboarding**: no step counters, because people come back whenever they're stuck.

### The logic

Behind the questions sits a routing tree, and it's the product's real intelligence. In two days, I turned how customers described their situations into 5 problem areas, 17 goals and 45 paths, mapped onto 19 playbooks, with every playbook reachable. Research made executable, not a model's guess, so it can be trusted, and audited when it's wrong.

- **Two people, the same three taps.** Question one uses problem language for founders. Question three, *where are you now?*, appears only where it changes the answer, for leads who already have half the artefacts.
- **Prerequisites up front.** You should know a playbook needs a finished canvas before you commit two hours, not ninety minutes in.
- **A fixed frame.** Early versions resized with every answer, and the page felt unstable. Fixed height, content scrolls inside.
- **A wrong tap costs one tap.** Tapping an earlier answer reopens that step, so an uncertain user is never punished with a restart.
- **AI where people use their own words.** *Something else* opens a text field at the first two layers. An AI model reads what people type and searches the routing tree for the closest playbooks, so even the AI can only point to playbooks that exist.
- **Honest failure.** When nothing is a clear fit, it says *no exact match yet* and shows the closest options as equals, not a confident guess. It was the hardest call in the project.

> "No exact match yet. Nothing in the library works directly on that. These two come closest — they gather the customer evidence most questions like this turn out to need."

- **No theatre.** Questions answer instantly, because a lookup isn't thinking. There's one half-second beat before the recommendation, where something genuinely resolves.

### Tested before it shipped

Because the Recommender was built in code, it behaved like the real product, so people could actually use it rather than react to pictures. I ran about 8 sessions each with coaches, customer delivery and customers. The biggest change was the wording of the questions: I rewrote them so they were easier to understand and nobody felt afraid of picking the wrong option.

### From recommendation to work

A recommendation that doesn't become work is just advice. Results filter the Playbook Library and survive closing the panel. Inside a project, *Add to this project* creates the run in one click.

Confused, three questions, a live run: about fifteen seconds. That path is the entire thesis of the project.

---

## Designing in code, with AI as a partner

I built this in code rather than Figma, on our FondUI design system, which I'd already set up as a Claude skill. Claude was a working partner throughout: synthesising the interview notes, brainstorming directions with me, and, through Claude Code, turning designs into working software in days.

- **Scope was argued against something real:** a running build, not a deck.
- **Edge cases surfaced while they were cheap:** empty states, reopened steps, the no-match case.
- **Testing was real:** people used the thing, so their feedback changed the design rather than decorating it.
- **Verified as software:** an automated test harness drove the real interactions, and repeatedly caught code that looked right but was broken underneath.

**Who built what.** I built the front end, and it's what shipped. Our engineer owned everything behind it: the back end, data, analytics and integration with the rest of the platform.

---

## What this project shows about how I work

**I let evidence set the scope, then bring people with me.** When capacity forced a choice, I brought the prototype and the research, not a preference, and answered the hard objection head-on until the team could see it too.

**I design for trust.** The Recommender admits when nothing fits, names the gaps in the library, and keeps even its AI grounded in playbooks that exist.

**I design for business outcomes.** The Recommender was judged on activation, retention and revenue, and it moved all three, including winning back about 18% of churned customers within two weeks.

**I design in the medium the product ships in.** With AI as a partner, every state was real before anyone reviewed it, the whole project took about six weeks, and engineering inherited working software, not a specification.

---

## Results and what's next

The Recommender is live, and it's doing what it was built to do. The problem started as a chain: people stalled at the first step, value arrived late, they didn't come back, and revenue walked out with them. Every link moved, all the way to revenue.

| Activation | Satisfaction | Retention | **Revenue** |
|---|---|---|---|
| **85%** of new sign-ups create a project and run a playbook | **95%** satisfaction | **4×**: 40% of users return within 30 days of sign-up | **~18%** of churned customers renewed their subscriptions to try the Recommender |
| Up from 65% | Up from 70%, from customer surveys and customer success | Up from about 10%. Most come back weekly | Within two weeks of the release update email |

**How we measured.** Activation and retention from product analytics, satisfaction from customer surveys and customer success feedback, each comparing the period before launch with the period after, across four months. The win-back rate covers the two weeks after the release email.

The retention jump says the most about the design. With the right playbook from the start, people did their offline pre-work, then came back to it week after week to map their ideas in our workspaces.

**Beyond the numbers**

*How we work* — **Design to production in days, not weeks.**
I built the front end in code with Claude, on our FondUI design system, and it went straight into production. Engineering didn't rebuild anything from mockups; they connected it to the back end, data and analytics. No spec to interpret, no pixel-matching, no rounds of design QA.
For the team it's been a game changer: we now work at least twice as fast as we always have.
- **Days** from design to production, down from 2–3 weeks
- **2×** faster team workflow, at least
*(Diagram: usual path Mockups → Spec → UI rebuild → Design QA → Fixes → Live, 2–3 weeks; this project Built in code → Back end → [Spec, UI rebuild, Design QA skipped] → Live, days.)*

*Product strategy* — **The research found a gap in the product itself.**
Mapping every customer need onto the library showed that no playbook directly tests a value proposition, a job customers kept coming to us with. The Recommender says so instead of guessing, and our program design team moved on the missing playbook straight away.
- **45 → 19** paths mapped onto playbooks
- **1 gap** picked up straight away by program design
*(Diagram: needs coverage list with "Test a value proposition" flagged "No playbook yet", plus the Recommender's own no-match message.)*

**What's next**

**Next: the full thinking partner.** The Recommender solves the first step. What I've recommended next is Strattie AI, the end-to-end thinking partner I prototyped at the start. It would help people work through value propositions, brainstorm, synthesise their canvases, find evidence and validate assumptions: support across the whole journey, not just the start. It's on the roadmap for within the next year.

*(Visual: customer journey strip — Find a playbook · Brainstorm · Value proposition · Synthesise canvas · Find evidence · Validate. "Live now": Playbook Recommender covers the first step only. "Next, within a year": Strattie AI thinking partner spans the whole journey; its first cell is the routing tree, carried over.)*
Caption: The Recommender covers the first step. The thinking partner covers the whole journey, and when it suggests a playbook, it uses the routing tree.

**Why it's in a stronger position now.** The Recommender didn't replace the thinking partner. It gives it a head start:
- **Proof that guidance works.** Activation rose from 65% to 85%, so the case for the thinking partner is backed by evidence.
- **One job already solved.** When the thinking partner recommends a playbook, it can use the routing tree, so that part is grounded in playbooks that exist.
- **Customers' own words.** *Something else* answers show how people really describe their problems.
- **A working prototype.** It's already built in code, ready to pick up.

**What I'd watch until then.**
- **How fast people reach value.** The time from creating a project to starting a playbook. It's the bar the thinking partner has to beat.
- **Whether people keep wanting guidance.** The share of playbooks started from the Recommender rather than the library. If people still reach for it once they know the library, the demand for a thinking partner is real.
- **What people need that we can't answer yet.** How often *something else* finds no match. Every miss, in the customer's own words, is something the thinking partner needs to handle.

**A focused first release didn't shrink the vision. It paid for it.**

---

## Visual treatments (build notes)

These replace dense text with visuals. The wording is the same as above unless listed here.

1. **The problem, enterprise vs self-serve:** lead-in "How people found their first playbook depended on which kind of customer they were." Two cards: *Enterprise experience* — **Guided by a coach** (A coach → 2–3 questions → Start here). *Self-serve experience* — **Left with a library** (A library → Their own judgment → ?).
2. **The problem, two groups:** persona cards (Group 1 Solo founders; Group 2 Heads of strategy and innovation) merge into a shared card: "On paper they share nothing. Both described the same thing:" Too many ideas · No obvious first move · A meeting coming with someone who holds the idea's future. Footnote: the coaches' complaint line.
4. **The reframe, pushback table:** "I pushed back. A trimmed chatbot is just a worse chatbot." Trimmed chatbot vs Guided Recommender: Conversation design (Still needs all of it / Fixed questions) · Playbooks that don't exist (Still a risk / Can't happen) · Naming the problem (Asks people to name it / People pick from options) · Proves guidance works (No: the hardest part, in its weakest form / Yes). Then "So I changed the question": ~~What's the smallest assistant we can build?~~ **What's the one job that matters most right now?**
5. **Trade-off ledger:** lead-in "Choosing the Recommender was a trade-off, and I made it knowingly." What it bought us (4 ✓) | What it cost, moved to a later release (4 →). Closing bar: "That was hard to let go of. But one job finished beats ten jobs started. The first release didn't need to be the assistant. It needed to work."
8. **How I work:** 2×2 cards, each with a Proof → link: The pushback and my answer · Honest failure · ~18% of churned customers won back · Design to production in days.
9. **Who built what:** lead-in "**Who built what.** The work split cleanly between design and engineering." Me: The front end, it's what shipped | Our engineer: Everything behind it, back end · data · analytics · integration with the rest of the platform.
