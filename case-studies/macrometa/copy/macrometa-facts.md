# Macrometa: confirmed facts

The source of truth for case study 4. Everything on the page has to trace back to this file, Olaide's write-up (the Macrometa PDF) or her screens. Anything else gets a "[?]" and a question to Olaide.

## Context
- **Company:** Macrometa, a cloud development platform. Spelled with an "e", as in the write-up.
- **When:** 2022 to 2023. Olaide was there about a year, and this project took about 3 months.
- **Role:** Product designer. Worked with the Head of Design (both hired around the same time), the Head of Product and engineers.
- **Ownership:**
  - **Olaide's own work:** onboarding and activation.
  - **Shared with the Head of Design:** the platform-wide UI refresh, which Olaide contributed to significantly.
- **Focus of the page:** orientation, meaning how new users found their way and how the product carried them along. The developer tools updates stay in the background.

## Results (measured with product analytics, after 6 months of use)
- **Customer retention:** up 54%. This is the headline number.
- **Support tickets:** down 72% in the write-up, and "seventy" in conversation, so the exact figure needs confirming. Customer success confirmed the drop.
- **Onboarding:** 73% faster, measured as sign-up completion in product analytics.
- **User satisfaction:** up 50%. This replaces the write-up's conflicting 80% and 40%.
- **Revenue:** $2.3M in annual recurring revenue. Keep it. Olaide links it to better onboarding, which marketing also promoted. Describe it as a result the work contributed to, not one it caused alone.
- **Templates:** many users started projects from templates. The write-up says 85% adoption, which needs confirming.

## Dropped
- Customer acquisition cost ($47K) and lifetime value ($220K). They're business numbers, not design results.
- "After 12 months of platform use". The correct period is 6 months.
- The 82% retention figure. 54% is the one to use.

## Still to confirm
- Support tickets: 72% or 70%?
- 87% more sales leads: keep or drop?
- 85% template adoption: is that the right figure?
- "84% preferred the command line, 91% were frustrated": where did these come from?
- The three quotes in the write-up: are they real, and from whom? The latency one is about platform speed, not the design.
- The write-up promises four key insights but lists three.

## Research (from the write-up)
- Analysed support feedback with the customer success team.
- Walked through the product as a first-time user.
- Ran user interviews and quantitative surveys with developers. 70% of Macrometa's own staff were developers, and they were a resource too.
- Ran a competitive analysis of onboarding in cloud and database products.
- Ran usability tests with 15 developers across experience levels.
- Personas: Alex, an engineering manager at a mid-sized company, and Tom, a junior engineer at a new startup.

## Customer feedback on the old product (source/feedback-*.png)
Real messages from customers to the Macrometa team. The customers aren't named. The staff they wrote to are named (James, Shannon).
- **feedback-permissions:** "your user interface for this is very confusing and unhelpful." The customer wanted to give a non-technical third party access to one collection only. Top-level access didn't carry down to individual collections, and the person could still see the rest of the system, such as queries and API keys.
- **feedback-docs:** "I remain frustrated I'm not able to find some of these solutions for myself using your documentation." With "so many ways of achieving things", the customer couldn't tell the options apart on cost or speed (search index vs fulltext index vs search worker).
- **feedback-changes:** the customer found out by chance, through a support ticket, that the result limit had gone from 500 to 1,000. "I would love to be in the loop on what MM is doing and changing, like the way Cloudflare continually keeps me feeling like I'm part of the dev process."

## Old UI screens (source/old-*.webp)
- **old-login:** a plain login card with email, password and "Remember me". Sign-up is a small link underneath.
- **old-dashboard:** the first screen after logging in. A world map of regions, a throughput chart, and tenant metrics (regions, geo fabrics, streams, collections, query workers, storage, latency). Nothing tells a new user what to do first.
- **old-collections:** a table of collections with filters for Key-Value, Document, Dynamo and Edge. Documentation is a grey button next to "New Collection".
- **old-graphs:** a list of graphs with Edit links.
- **old-new-graph:** the New Graph modal. It asks for required fields in database terms (edge definitions, from collections, to collections, vertex collections), with only small info icons for help. An "Examples" tab is tucked in the corner.
- **Navigation:** 12 all-caps items in the sidebar (Dashboard, Collections, Queries, Streams, Stream Workers, Search, Graphs, Geo Fabrics, Account, API Reference, Support).
