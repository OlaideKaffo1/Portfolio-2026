# Articles

Source for the Ask Olaide chat. Both articles were written by Olaide about her work at Strategyzer. Every fact here comes from the approved, published articles (`articles/only-designer`, `articles/prototypes-that-ship`). The chat may only use what's written here.

---

# The Only Designer in the Room

How I scaled design across sales, marketing and client delivery.

- **Link:** `articles/only-designer/index.html`
- **Link card:** "The Only Designer in the Room" · Article · 10 min read
- **In one line:** A sales deck at Strategyzer used to take a full day. I built a set of Claude skills that give our sales, marketing and client delivery teams our design system, including the design decisions, and a rep now goes from finished content to a polished deck in about thirty minutes.

## The problem: design work nobody owned

- Strategyzer's product team is two developers, a head of product and me. I was hired to design the product. The website, sales decks and client reports had no designer.
- **Marketing** brought in a freelance designer for every new web page: a brief, revisions, a cost and a wait.
- **Sales** built decks in PowerPoint. A deck took a full day from start to finish, two to three hours of it hands-on design. A lead who waits for a proposal is a lead that cools.
- **Client delivery** spent hours on formatting and presenting data in client reports.
- None of this was anyone's failure. The teams had the expertise and the content. What they lacked was a design system built for the way they work.

## The idea: hand over judgment, not just assets

A component library doesn't assemble itself into a deck. The hard part to hand over is a designer's judgment: which layout suits the content, when a chart beats a table, how much weight a heading needs. A Claude skill, a packaged set of instructions and assets Claude loads for a kind of work, let me capture how the brand behaves as well as how it looks. I had already proven the approach with FondUI, our product design system.

## Three skills, built around three outputs

One design system underneath, one skill per team:

| Skill | Ships | Used by |
|---|---|---|
| Website design system | Web pages | Marketing |
| Sales proposals | Sales decks | Sales |
| Brochures and PDFs | Client reports and brochures | Client delivery |

- **Marketing:** the team writes the content and gets back an on-brand page from the first draft. Our Events page: the first version was built in Webflow by a freelance developer; the second was made by Claude in one go with the marketing skill, and it's what we used to update the page. Claude matched the developer's event card exactly, because the skill holds the design system's rules.
- **Sales:** a rep brings the content, and Claude produces a polished deck in about thirty minutes. Each rep can turn around two or three decks a day. The decks themselves are confidential under NDA, so they aren't shown.
- **Client delivery:** the reporting skill handles how findings and data are laid out, so the team focuses on substance. The same skill makes print brochures: I made three versions of a masterclass brochure from one set of content, each in a different brand colour pairing.

## How I built it

- **A single source of truth.** For the product and marketing skills, I pulled tokens and components straight from Figma. Sales already had a style, so I built on it and improved it. For reports, I designed a more professional style from the design system, drawing on recent editorial design.
- **Semantic tokens,** so every value is chosen by its role.
- **Embedded brand assets,** including the TWK Everett fonts.
- **Explicit rules.** Loose guidance is where AI output drifts, so I kept room for interpretation to a minimum.
- **Testing with the teams.** Early versions went to members of the sales team. They loved them, and most feedback was about how a deck tells its story, so I reworked the hierarchy and flow to read like a conversation with the prospect.
- **Versioning.** Each skill is maintained centrally; the marketing skill is on v2.3. I update a rule once and every team gets it.

## Impact

| Team | Before | After |
|---|---|---|
| Sales | A full day per deck, 2–3 hours of it hands-on design | **About 30 minutes** per deck, 2–3 decks a day per rep |
| Marketing | A freelance designer for each new page | On-brand pages from the first draft |
| Client delivery | Hours per report on formatting | Layout and visuals handled by the skill, saving hours on every report |

- With five to seven people in sales, the team can now send roughly **50 to 100 decks a week**, up from about 25 to 35. Our pipeline has grown significantly since. The exact figures are confidential.
- Quality improved too: a prospect reading a deck and a client reading a report now see the same Strategyzer.
- **My role changed:** I'm still the product's senior product designer, and I now also act as design lead for the wider company, by choice.
- **Supporting the teams:** I work closely with sales and marketing so they get the most from the skills. I take them through best practices and help them use the skills well, so their work keeps improving. It isn't managing designers, but it is leading how design is done across the company.

**Michal Setkowski, Head of Sales, Strategyzer** (quote approved for use):
> "This has been easily one of the largest quality leaps in the Sales Team's work since my time at Strategyzer."
>
> "What used to take 2–3 hours on average (with mediocre-to-good effects) is now taking 2–3 fifteen-minute iterations with Claude."
>
> "Does it do the whole work for us? No, but it helps us focus where it's truly important and ensures that the entire team works from the same baseline."
>
> "Olaide took less than a week to build a working prototype of the skill and in total, it took less than 3 weeks from the idea to full rollout across the entire sales team."

LinkedIn: linkedin.com/in/michal-setkowski

## What I took away

1. Internal teams deserve the same design rigour as customers.
2. Judgment is harder to hand over than assets.
3. Constraints build trust.
4. A system needs an owner.
5. Business terms carry the argument.

---

# Prototypes That Ship

How I moved Strategyzer's product discovery into code.

- **Link:** `articles/prototypes-that-ship/index.html`
- **Link card:** "Prototypes That Ship" · Article · 10 min read
- **In one line:** I rebuilt our product design system as a Claude skill, so discovery at Strategyzer now happens in working code: we test more ideas, decide faster, catch edge cases early, and engineers carry the code into the platform.

## The gap

- On a team of one designer, two developers and a head of product, comparing two approaches meant designing both, wiring clickable prototypes, walking the team through them, then waiting for engineering before anyone saw real behaviour.
- Good alternatives were set aside because they were costly to validate, and edge cases surfaced late. Figma remains central to how I work; the aim was to move the learning earlier.

## Teaching Claude our design system

- AI tools can generate interfaces, but not *your* interface.
- With the Figma MCP connected, I had Claude pull FondUI's tokens, variables and components from our Figma library, and rebuilt them as a Claude skill. Where it fell short, I corrected it, sometimes with SVGs or screenshots. I worked as Claude's design lead. It took **a couple of days**.
- The tokens match the variables engineering uses in the codebase, so what Claude designs with is what we ship.
- The real design work was the rules: for every token and component, when to use it, when not to, and how it behaves in each state. The skill has fourteen core rules, starting with "Never invent a value."

## How I work now

- I describe a flow to Claude, it builds a working version with FondUI, and I review it like a developer's build.
- Where I used to take one or two directions to high fidelity, I now build several and compare them as working flows.
- **Decisions in hours:** often I don't start in Figma at all. A working version takes minutes, I record a short Loom, and the team responds the same day.
- This only works because I start with a deep understanding of the user and the problem. The speed comes from the system; the judgment still comes from me.
- **The Recommender example:** I compared three panel shapes and two approaches (a tour and a tool) as working flows, and caught edge cases like changing an answer and finding no match before development.

## Code that engineering keeps

- The Playbook Recommender's front end, built by me with Claude, went into the product as it was. No handover, no rebuild. Our engineer connected it to the data.
- Handoff used to be a file and a walkthrough; now it's a working version we review side by side, and conversations move sooner to architecture, data and performance.

**Ashley Underwood, Head of Product, Strategyzer.** Feedback summarised in Olaide's words, not a direct quote:
> The biggest change is our velocity, especially on the engineering side. Ashley describes Claude as working almost like a junior designer: the front end Olaide has designed arrives built, and engineering connects it to the back end. For a team our size, we can do more without growing, and he sees the impact across the whole organisation.

LinkedIn: linkedin.com/in/ashley-underwood-66581040

## Testing and impact

- About **24** research sessions on working prototypes for the Recommender. People used the real thing, so their feedback changed the design directly.
- The Recommender project took about six weeks from research to launch, and the team now works **at least twice as fast**.

## What it doesn't replace

Figma and design judgment still matter. Claude doesn't decide what's worth building. Code that reaches the platform still goes through engineering review.

---

## Rules for the chat

- Michal's words may be quoted exactly as above. Ashley's feedback is a **summary**, never in quote marks, and always introduced as "Ashley has said…" or "In Ashley's words, roughly…".
- The sales decks are confidential under NDA. Never describe a client or a deck's contents.
- The pipeline numbers are confidential. Say "grown significantly" and nothing more specific.
- The 50 to 100 decks a week is an estimate from team size and decks per rep. Present it as roughly.
- Credit stays precise: the skills are mine; the engineer connected the Recommender to the data; results belong to the teams and products.
