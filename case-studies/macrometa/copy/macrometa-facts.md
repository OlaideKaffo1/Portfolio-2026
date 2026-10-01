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
- **Navigation:** 11 all-caps items in the sidebar (Dashboard, Collections, Queries, Streams, Stream Workers, Search, Graphs, Geo Fabrics, Account, API Reference, Support).

## What the redesign covered (Olaide, in conversation)
- **Onboarding and activation:** templates, tutorials and guidance to start from.
  - If a user has never created a collection, the empty state points them to a tutorial.
  - Creating a new collection offers sample data sets as templates to start from.
- **The UI refresh:** a major part of the work, and the page should highlight it as much as the onboarding. The split between the two isn't even, and the exact balance will follow from the screens.
- **Next step:** Olaide is sending all her images first. Wait until she says she's sent them all, then propose where each goes and how the page is arranged.

## New UI, batch 1 (source/new-*.webp)
- **new-collections-empty:** the empty state for someone with no collections yet. "Get Started with Collections", a one-line explanation, a "Create a Collection" button, and three cards: Intro to Collections, Developer Tools and Sample Apps. A Playground banner offers an upgrade to the Scale tier. The new sidebar groups items under Data, Compute, Access and Network, with fabric and region pickers at the top. There's a docs icon at the top right.
- **new-collection-type:** the New Collection modal. Five cards (Key-Value, Document, Redis Mode, Dynamo Mode, Graph Edge), each with a one-line description in plain words, and a "Learn about collection types and data models" link.
- **new-sample-datasets:** New Document Collection, then Sample Datasets. "Learn more about document collections with a sample dataset": Transactions (e-commerce) and Users, each with its own Create button, plus a "Learn about document collections" link.
- **new-kv-form:** New Key-Value Collection. One required field with its naming rules shown underneath, four options as checkboxes with info icons, and a "Learn about key-value collections" link.
- **new-collection-data:** a collection's Data tab (test_doc1). A breadcrumb, tabs for Data, Indexes, Stream and Settings, a "PostgreSQL Connector activated" banner, counts for documents (12,123) and storage (124.8 MB), document search and filter, New Document with Import and Export, and a menu on each row to move or delete.

## New UI, batch 2
- **new-kv-samples:** New Key-Value Collection, then Sample Datasets: Recommendations, Sensors, Users and User Preferences, each with a Create button. There's a copy slip in the screen: Recommendations and Sensors share the same description ("Connected device sensor readings"), and so do Users and User Preferences ("Collection of user accounts"). Mention it to Olaide if this screen is used large.
- **new-dashboard:** the new Dashboard. A Locations map with active locations listed as checkboxes and a "Manage Locations" link, a "Pulse, last 10 minutes" chart (requests per second, bytes received and sent), and Global Metrics with a date range. There's an Upgrade button at the top right. The sidebar here groups items under Activity (Dashboard, Alerts), which differs from the other new screens.
- **new-function-detail:** the Function Detail modal for an Akamai edge function. Name, description, resource URL with copy buttons, dates, and Test Execution and Versions tabs. Versions shows Active and Inactive badges, and each version has a menu to activate it, download its source bundle or delete it.
- **new-invite:** "You have been invited to Macrometa". A teammate invite with one "Create an account" button, a fallback link, and "Need help?" pointing to support. A Learn More link sits at the top right for people new to Macrometa.
- **new-managed-keys:** the Managed Keys table under Access (Users, API Keys, Managed Keys, Secrets, Connections). Filters for service, tenant and fabric, coloured badges for service and status, and a row menu.
