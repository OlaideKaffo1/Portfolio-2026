# Solving the first-step problem — approved copy (v5)

Source of truth after the copy rewrite review (doc rev 56). Supersedes the copy in strattie-copy-v4.md; v4's visual build notes still apply.

## Title, intro and project facts
- **Title.** Solving the first-step problem
- **Intro.** We set out to build an AI assistant. I made the case to ship a three-question Playbook Recommender first, and it moved every number that mattered.
- **Role.** Senior product designer, and the only designer. I led the work end to end: research, strategy, design and the front-end build.
- **Team.** Me, our Head of Product and one engineer, with input from our coaching and customer teams.
- **Timeline.** About 6 weeks, spring 2026
- **Hint under the hero.** Click any image to see it full size. Under some images, turn on “Show the design decisions” to see why it looks the way it does.

## At a glance
- **The problem.** About 43% of new customers never started a project. They came with a real business problem, found a library of playbooks, and couldn't tell which one was right for them.
- **What I built first.** A full AI thinking partner, built as a working prototype with Claude. It could help people shape their ideas, brainstorm, summarise their work and check their ideas against evidence.
- **The decision.** Engineering couldn't build the full assistant in the time frame we needed. My research showed the job that mattered most: helping people find the right playbook, whether they were new or starting their next project. So I made the case to our CEO and Head of Product to build that first.
- **What shipped.** The Playbook Recommender: two or three quick questions, one recommendation, and one click to start. Behind it is a question map I built from the research, and AI handles anything people type in their own words.
- **Results.** 85% of new customers start a project (was 57%) · 95% satisfaction (was 68%) · 4× more people come back within 30 days (10% → 40%) · about 18% of customers who had cancelled came back

## The problem
- **Opening.** **People were getting stuck on the very first choice: which playbook to start with.** Each playbook takes hours, like running customer interviews or testing a price. Picking the wrong one wastes that time, so people hesitated, guessed, or gave up.
- **Why it matters.** For Strategyzer, this was the costliest place to lose people. If nobody starts a playbook, nobody gets value from the product, and every number that matters, from sign-up to renewal, depends on that first step.
- **Enterprise vs self-serve (lead-in).** How people found their first playbook depended on what kind of customer they were.
- **Enterprise card.** Guided by a coach. A coach asks two or three questions, then says _start here_.
- **Self-serve card.** Left on their own. They get the full library and have to choose alone, just when they know the least.
- **Library image caption.** **A wall of options.** What a new customer sees first: long descriptions, then the whole library, and nothing to immediately say which one fits their problem.
- **Data.** The numbers showed the scale: about 43% of new customers never started a project.
- **Research.** Interviews showed why. I spoke to eight customers, plus our customer success and coaching teams.
- **Group 1.** Solo founders, testing an idea before pitching investors. New to Strategyzer's terms.
- **Group 2.** Heads of strategy and innovation, testing an idea before presenting to senior leaders, often with half the work already done.
- **Shared card.** Very different people, the same problem: too many ideas · no clear first step · an important meeting coming up.
- **Quote.** In every conversation, the most common complaint was choosing a playbook. Even our own coaches said it.
- **Close.** If our coaches found it hard, the problem wasn't our customers. It was the product. And it wasn't only new customers: returning ones faced the same choice every time they started something new.

## The first bet
- **Opening.** Customers were asking for AI, so we started there. The first idea was ambitious: Strattie AI, an assistant across the whole platform, like having a Strategyzer coach beside you at every step. I designed it and built a working prototype with Claude, using FondUI, our design system.
- **Bullet 1.** **A coach you could chat with.** Available on every page and aware of your project. It helped people shape ideas, brainstorm and challenge their own thinking.
- **Bullet 2.** **Help on the canvas.** It could summarise people's work, point to the evidence behind it, check their ideas, draft sticky notes and flag what was missing.
- **Bullet 3.** **Recommending playbooks** was one of its many jobs, not the whole product.
- **Video caption.** **The full assistant, start to finish.** From "I'm not sure who my customers are" to a finished workspace: Strattie recommends a playbook, prepares interview questions, turns the interview notes into a customer profile, and sets up the workspace. Fully prototyped, but not in the first release.
- **Lead-in.** Building it for real taught us three things a static design would have hidden:
- **Lesson 1.** **The value was in the questions.** A good coach asks two or three questions before recommending anything. In an open chat, the assistant often answered before it had asked them.
- **Lesson 2.** **Doing it well was a much bigger job than it looked.** Vague requests, a changing library and knowing when to say "I don't know" were more than our small team could take on at the time.
- **Lesson 3.** **Chatting isn't the right tool for "where do I start?"** People came to us because they couldn't put their problem into words. A chat box asks them to do exactly that.

## The reframe
- **Opening.** Engineering couldn't build the full assistant in the time frame we needed. The team's first instinct, a fair one, was to build a smaller version of it.
- **Pushback headline.** **I pushed back.** A smaller chatbot is just a worse chatbot.
- **Table: columns.** Smaller chatbot · Guided Recommender
- **Table row 1.** Designing the conversation: still needed in full / a few fixed questions
- **Table row 2.** Recommending playbooks that don't exist: still possible / not possible
- **Table row 3.** Describing the problem: people have to type it / people pick from options
- **Table row 4.** Shows whether guidance helps: not clearly / yes
- **The question swap.** So I changed the question. **What's the one job that matters most right now?**
- **Swap explanation.** Of everything the assistant could do, one job came first every time: finding the right playbook. It's where every new project starts, and it's where people kept getting stuck.
- **Blockquote.** Remove (the swap above already says it).
- **How I made the case.** I needed to convince our CEO and our Head of Product, who was keen on the assistant. On a call, I showed them the working prototype and my research. Every group we spoke to had the same need: help choosing where to start.
- **The pushback.** Customers were asking for AI, and a set of guided questions could look like we were falling behind.
- **My answer.** I wasn't against AI. The platform will need it. But choosing a playbook comes first. **If people get stuck there, they'll leave before they ever see an AI feature.** Fix that first, and every AI feature we add later reaches people who are already getting value.
- **Decision.** Ship the Recommender first. The assistant comes next.
- **Ledger lead-in.** It was a trade-off, and I made it knowingly.
- **What it bought us.** **Only real playbooks.** It can only recommend playbooks that exist. · **Honest when nothing fits.** It says so instead of guessing. · **Faster than typing.** Three taps instead of explaining a problem you can't yet put into words. · **Less risk.** It proved guidance helps before we invested in the full assistant.
- **What it cost.** Moved to a later release: the full assistant · help on the canvas, which our coaches had asked for · the chat panel · the onboarding tour
- **Ledger close.** That was hard to let go of. But one job done well beats ten half-done. The first release didn't need to be the assistant. It needed to work.

## Designing the Recommender

## The form
- **Shapes.** **1. A small panel in the corner.** I tried three shapes. A pop-up in the middle of the screen covered the library people were choosing from. A tall side panel looked like a chat that wasn't there. A small panel in the corner won: easy to find, and the page stays usable behind it.
- **Shape cards.** Pop-up in the middle / Tall side panel / Small corner panel
- **Borrowed behaviour.** **2. Answers shrink as you go.** Borrowed from Asana's AI menu: once you pick an answer, it shrinks to a short message and the next question appears below. The panel stays short and easy to read.
- **Clip caption.** Three questions to a recommendation, recorded in the working prototype.
- **What I cut.** **3. A tool, not a tutorial.** I removed anything that promised more than it did: a chat box, a history list and expandable sections. I also dropped the tour-style version I first explored, with its progress bar and "three easy steps", because this is a tool people return to whenever they're stuck, not a one-time tour.
- **Slider caption.** The tour-style version I explored first, with its progress bar and big welcome screen, and the small panel that shipped. (Side-by-side pair: Explored · Tour-style / Shipped · Tool; images onboarding-explored.webp, recommender-shipped.webp)

## The logic
- **Question map.** **4. The questions come from research, not guesswork.** Behind the questions is a map I built in two days from how customers described their situations: 5 problem areas, 17 goals and 45 paths, leading to 19 playbooks. Because it's written down, not generated by AI, we can trust it and fix it when it's wrong.
- **Tree caption.** The question map at its real size, with one path highlighted.
- **Sheet caption.** **The working file.** Every path, mapped by hand: each question, its answers and the playbook it leads to.
- **Two groups.** **5. Questions anyone can answer.** Question one asks what you're working on in everyday words, so founders new to Strategyzer can answer it. Question three, _where are you now?_, only appears when it changes the answer, so people with work already done can skip ahead.
- **Step viewer captions.** Q1: The first question asks what you're working on, in everyday words.
- **Prerequisites.** Fold into the Recommendation tab's decisions: _"What you'll need is shown up front, before you commit hours to a playbook."_
- **Fixed frame.** **6. Small details that build trust:** _The panel stays the same size._ Early versions grew and shrank with every answer, which felt jumpy. Now it keeps one height and the content scrolls inside.
- **Fixed frame caption.** Before and after: the early panel jumps, the shipped one stays still.
- **Edit.** _You can change an answer without starting over._ Click any earlier answer to edit it.
- **Edit caption.** Hover an earlier answer and click Edit.
- **Own words.** _AI for everything else._ If none of the options fit, people can pick "Something else" and type their situation. AI reads it and finds the closest playbooks from the same map, so it only suggests real ones.
- **Own words caption.** It also explains its pick in plain language.
- **Honest failure.** _Honest when nothing fits._ When there's no good match, it says so and shows the closest options side by side, instead of pretending one is right. It was the hardest call in the project.
- **No-match caption.** The real message people see when nothing fits.
- **No theatre.** _No fake "thinking"._ Questions appear instantly. There's a short pause only before the recommendation, where the work actually happens.

## Tested before it shipped
- **Testing.** Because I built it in code, people could use the real thing, not react to pictures of it.
- **Stat.** About 24 sessions with coaches, customer teams and customers (about 8 each)
- **Biggest change.** I rewrote the questions so they were easier to understand, and so no one worried about picking the wrong answer.

## From recommendation to work
- **Intro.** A recommendation is only useful if people act on it. In the library, the results filter what's shown. Inside a project, one click adds the playbook and starts it.
- **Video 17 caption.** **The library updates too.** It filters to the recommended playbooks.
- **Video 18 caption.** **From recommendation to started.** One click on _Add to this project_, and the playbook appears in the project.
- **15 seconds.** From stuck to started in about fifteen seconds. That's the whole point of the project.
- **Diagram labels.** Stuck · Question 1 · Question 2 · Question 3 · Started

## Designing in code, with AI as a partner
- **Order.** Opening → Who built what → Built-in-Claude video → Claude's wider role → timeline → bullets.
- **Opening.** I designed this in code, not Figma. **I built the front end myself with Claude, and that code went straight into the product.** There was no handover and no rebuild. Our engineer connected it to the data behind it, and it went live.
- **Who built what.** Me: The front end, designed and built in code. Built with Claude on FondUI, our design system, which I'd set up so Claude could use it. It's the code customers use today. · Our engineer: Everything behind it. Data, tracking and connecting it to the rest of the platform.
- **Video caption.** **The prototype became the product.** My conversation with Claude on the left, the working front end on the right. This code went into the product as it was.
- **Claude's wider role.** Claude helped with the rest of the work too, from summarising interview notes to brainstorming directions with me. Building in code changed how the whole project ran.
- **Timeline caption.** About six weeks in total. Black marks what I built in code with Claude: the assistant prototype, in days, and the Recommender that shipped. (Phases: Research 1–2 weeks · Assistant prototype, days · Question map, 2 days · Recommender: built with Claude, tested, refined, 3 weeks · Launch ~1½ weeks)
- **Bullets.** Decisions were made on something real: a working product, not slides. · Tricky cases showed up early, while they were cheap to fix, like changing an answer or finding no match. · Testing was real: people used the actual product, so their feedback changed the design. · Checked automatically: automated tests clicked through every step and caught things that looked right but didn't work.

## Results and beyond the numbers
- **Order.** Live video → Results → Beyond the numbers → How I work → What's next
- **Opening.** The Recommender is live. When people got stuck at the first step, they didn't see the value, didn't come back, and some cancelled. Fixing that first step improved every one of those numbers.
- **Card 1 label.** **Getting started:** 85% of new customers now start a project and a playbook (was 57%)
- **Card 2.** **Satisfaction:** 95% (was 68%), from customer surveys and our customer success team
- **Card 3.** **Coming back:** 4×. 40% of people return within 30 days of signing up (was about 10%). Most come back weekly.
- **Card 4.** **Revenue:** about 18% of customers who had cancelled returned to try the Recommender, within two weeks of the release email.
- **How we measured.** How we measured: product data for getting started and coming back, customer surveys and feedback for satisfaction. Each compares the months before and after launch, over four months in total.
- **Why retention matters.** The jump in people coming back says the most about the design. With the right playbook from the start, people had a reason to return, week after week.
- **Card A title.** How we work · From design to live in days, not weeks
- **Card A body.** What I built with Claude went live as it was. Our engineer didn't rebuild it from designs. They connected it to the data behind it. No handover documents, and no back-and-forth to match the design. The team now works at least twice as fast.
- **Card A diagram.** Mockups · Spec · UI rebuild · Design QA · Fixes · Live (this project: Built in code · Back end · Live)
- **Card B title.** Product strategy · The research found a missing playbook
- **Card B body.** Mapping every customer need to a playbook showed a gap: nothing helped people test whether customers want their offer, something many customers came to us needing. The Recommender says so instead of guessing, and the team that writes playbooks started on one straight away.

## How I work
- **Heading.** What this project shows about how I work
- **Card 1.** **I let evidence decide, then bring people with me.** When we had to choose, I brought a working prototype and research, not just an opinion, and answered the hardest objection directly.
- **Card 2.** **I design for trust.** The Recommender says when nothing fits, and its AI only suggests real playbooks.
- **Card 3.** **I design for business results.** The Recommender was measured on getting started, coming back and revenue, and it improved all three.
- **Card 4.** **I design in the real product.** With Claude, I built working software instead of mockups, and my front-end code went straight into the product. The whole project took six weeks.
- **Proof links.** The pushback and my answer · Honest when nothing fits · The results · From design to live in days

## What's next and the closing line
- **Opening.** **Next: the full assistant.** The Recommender fixes the first step. Next, I've recommended building Strattie AI, the assistant I prototyped at the start, to help at every step after that. It's on the roadmap for the next year.
- **Journey caption.** The Recommender covers the first step. The assistant would cover the rest, and reuse the question map whenever it suggests a playbook.
- **Head start.** **Why it's now easier to build.** The Recommender gives the assistant a head start: proof that guidance works (57% → 85%), a question map it can reuse, real examples of how customers describe their problems, and a working prototype.
- **What I'd watch.** **What I'd watch until then:** how quickly people start a playbook, how often they keep using the Recommender, and what people ask for that it can't answer yet.
- **Closing line.** Shipping one focused thing first didn't shrink the vision. It made the case for it.

## Applied in the prototype beyond the doc
- Step viewer notes rewritten to the same rules (e.g. "The frame holds" → "The panel stays the same size"). Recommendation tab caption carries the prerequisites line.
- Funnel: Started a project 57% / 43% stuck / after the Recommender 85%.
- Revenue card: "of customers who had cancelled returned to try the Recommender".