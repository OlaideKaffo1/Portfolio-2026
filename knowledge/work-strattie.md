# Case study: Solving the first-step problem

Strategyzer · Strattie AI and the Playbook Recommender

Source for the Ask Olaide chat. Every fact here comes from the approved, published case study (`case-studies/strattie`, copy v5). The chat may only use what's written here. **[?]** marks anything that needs Olaide's confirmation.

- **Link:** `case-studies/strattie/index.html`
- **Link card:** "Solving the first-step problem" · Case study · Strategyzer AI
- **In one line:** We set out to build an AI assistant. I made the case to ship a three-question Playbook Recommender first, and it moved every number that mattered.

---

## The basics

| | |
|---|---|
| Company | Strategyzer |
| My role | Senior product designer, and the only designer. I led the work end to end: research, strategy, design and the front-end build. |
| Team | Me, our Head of Product and one engineer, with input from our coaching and customer teams |
| Timeline | About 6 weeks, spring 2026 |
| Status | Live |

## The problem

- About **43%** of new customers never started a project.
- They came with a real business problem, found a library of playbooks, and couldn't tell which one was right for them.
- Each playbook takes hours, like running customer interviews or testing a price. Picking the wrong one wastes that time, so people hesitated, guessed or gave up.
- For Strategyzer this was the costliest place to lose people. If nobody starts a playbook, nobody gets value, and every number from sign-up to renewal depends on that first step.
- Enterprise customers had a coach who asked two or three questions and said "start here". Self-serve customers got the whole library and had to choose alone, just when they knew the least.

## Research

- I interviewed **eight customers**, plus our customer success and coaching teams.
- Two groups: solo founders testing an idea before pitching investors, and heads of strategy and innovation testing an idea before presenting to senior leaders.
- Very different people, the same problem: too many ideas, no clear first step, and an important meeting coming up.
- In every conversation, the most common complaint was choosing a playbook. Even our own coaches said it. So the problem wasn't our customers, it was the product.

## The first bet: Strattie AI

- Customers were asking for AI, so we started there: Strattie AI, an assistant across the whole platform, like having a Strategyzer coach beside you.
- I designed it and built a working prototype with Claude, using FondUI, our design system. It could help people shape ideas, brainstorm, summarise their work and check ideas against evidence.
- Building it for real taught us three things a static design would have hidden:
  1. The value was in the questions. A good coach asks two or three questions before recommending anything; an open chat often answered too soon.
  2. Doing it well was a much bigger job than it looked, more than our small team could take on at the time.
  3. Chat is the wrong tool for "where do I start?" People came to us because they couldn't put their problem into words.

## The decision

- Engineering couldn't build the full assistant in the time we needed. The team's first instinct, a fair one, was a smaller chatbot.
- I pushed back: a smaller chatbot is just a worse chatbot. I changed the question from "what's the smallest assistant we can build?" to "what's the one job that matters most right now?" The answer was finding the right playbook.
- I made the case to our CEO and our Head of Product, who was keen on the assistant, on a call, with the working prototype and my research.
- **The pushback:** customers wanted AI, and guided questions could look like falling behind.
- **My answer:** I wasn't against AI. But if people get stuck choosing a playbook, they'll leave before they ever see an AI feature. Fix that first, and every AI feature we add later reaches people who are already getting value.
- **Decision:** ship the Recommender first; the assistant comes next.

**The trade-off, made knowingly.** It bought us: only real playbooks recommended, honesty when nothing fits, three taps instead of typing, and less risk. It cost us: the full assistant, help on the canvas (which coaches had asked for), the chat panel and the onboarding tour, all moved to a later release. I'd rather ship one job done well than several half-done.

## Key design decisions

1. **A small panel in the corner.** I tried three shapes. A pop-up in the middle covered the library; a tall side panel looked like a chat that wasn't there; the corner panel kept the page usable.
2. **Answers shrink as you go,** so the panel stays short and easy to read.
3. **A tool, not a tutorial.** I dropped the tour-style version I first built (progress bar, big welcome screen) because people return to this whenever they're stuck.
4. **Questions from research, not guesswork.** I built a question map in two days from how customers described their situations: 5 problem areas, 17 goals and 45 paths, leading to 19 playbooks. Because it's written down, not generated by AI, we can trust it and fix it.
5. **Questions anyone can answer,** in everyday words. The third question only appears when it changes the answer.
6. **Small details that build trust:** the panel keeps one height instead of jumping; you can edit an earlier answer without starting over; "Something else" lets people type their situation and AI finds the closest real playbooks; and when nothing fits, it says so instead of guessing. That last one was the hardest call in the project.

## Testing

- Because I built it in code, people used the real thing, not pictures of it.
- **About 24 sessions** with coaches, customer teams and customers, about 8 each.
- Biggest change: I rewrote the questions so they were easier to understand, and so no one worried about picking the wrong answer.
- From stuck to started in about fifteen seconds.

## How it was built

- I designed it in code, not Figma. I built the front end myself with Claude, and that code went straight into the product. No handover and no rebuild.
- Our engineer built everything behind it: data, tracking, and connecting it to the rest of the platform.
- Timeline: research 1–2 weeks, assistant prototype in days, question map 2 days, Recommender built, tested and refined in 3 weeks, launch about 1½ weeks. About six weeks in total.
- Automated tests clicked through every step and caught things that looked right but didn't work.

## Results

Measured over four months, comparing the months before and after launch. Product data for getting started and coming back; customer surveys and the customer success team for satisfaction.

| Result | Before | After |
|---|---|---|
| New customers who start a project and a playbook | 57% | **85%** |
| Customer satisfaction | 68% | **95%** |
| People who return within 30 days of signing up | about 10% | **40%** (4×), most weekly |
| Customers who had cancelled and came back to try it | — | **about 18%**, within two weeks of the release email |

## Beyond the numbers

- **From design to live in days, not 2–3 weeks.** What I built went live as it was. The team now works **at least twice as fast**.
- **The research found a missing playbook.** Mapping every need showed nothing helped people test whether customers want their offer. The Recommender says so instead of guessing, and the team that writes playbooks started on one straight away.

## What this shows about how I work

- I let evidence decide, then bring people with me.
- I design for trust.
- I design for business results.
- I design in the real product.

## What's next

I've recommended building Strattie AI, the assistant I prototyped at the start, to help at every step after the first. It's on the roadmap for the next year, and it can reuse the question map. Shipping one focused thing first kept the bigger vision alive, and gave us the evidence for the next step.

---

## Rules for the chat

- The engineer built the back end. Never say I built it alone.
- Results belong to the product: "new customers starting a project rose from 57% to 85%", not "I raised activation to 85%".
- The ~18% is customers who had cancelled and came back to try the Recommender, within two weeks of the release email. Never call it revenue growth or say they all stayed.
- "Twice as fast" is how the team works now, "at least". Don't turn it into a bigger number.
- Strattie AI, the full assistant, is prototyped and on the roadmap. It is **not** live.
