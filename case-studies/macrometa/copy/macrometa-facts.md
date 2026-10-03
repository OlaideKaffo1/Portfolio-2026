# Macrometa: confirmed facts

The source of truth for case study 4. Everything on the page has to trace back to this file, Olaide's write-up (the Macrometa PDF) or her screens. Anything else gets a "[?]" and a question to Olaide.

## Context
- **Company:** Macrometa, a cloud development platform. Spelled with an "e", as in the write-up.
- **When:** Olaide was at Macrometa from January to December 2022. This project took the first three months of 2022.
- **Role:** Product designer. Worked with the Head of Design (both hired around the same time), the Head of Product and engineers.
- **Ownership:**
  - **Olaide's own work:** onboarding and activation.
  - **Shared with the Head of Design:** the platform-wide UI refresh, which Olaide contributed to significantly.
- **Focus of the page:** orientation, meaning how new users found their way and how the product carried them along. The developer tools updates stay in the background.

## Results (measured with product analytics, after 6 months of use)
- **Customer retention:** up 54%. This is the headline number.
- **Support tickets:** down 55%. Customer success confirmed the drop.
- **Onboarding:** 73% faster, measured as sign-up completion in product analytics.
- **User satisfaction:** up 50%.
- **Revenue:** $2M in revenue that year. Olaide links it to better onboarding, which marketing also promoted. Describe it as a result the work contributed to, not one it caused alone.
- **Templates:** 85% adoption, confirmed. Olaide's reason: it was easy to click a template and add it to whatever you were creating.
- **Sales leads:** up 57%.

## Still to confirm

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

## New UI, batch 3
- **new-collection-type-gradient:** the same New Collection modal as new-collection-type, on a gradient background instead of the dimmed app.
- **new-welcome-a:** "Welcome to Macrometa!" A one-line intro to the Global Data Network, a 3:32 intro video, and three cards: Create your first collection, Start with a blueprint (ready-made implementations for common use cases) and Get in touch (to discuss capacity while evaluating). Also "Need support? We're here to help" and a Close button.
- **new-welcome-b:** the same welcome with different cards: Quickstart Guide, Developer Tools (CLI, SDKs, libraries) and Tutorials (start-to-finish exercises). Olaide confirmed the two welcomes are two iterations of how to tell users about blueprints and starting points. The first iteration was version A (Create your first collection, Start with a blueprint, Get in touch). Version B (Quickstart Guide, Developer Tools, Tutorials) came second.
- **new-signup:** "Create a free developer account". A split screen with the value on the left ("Build real-time, globally distributed apps and APIs in minutes – not months", no credit card, instant playground access, sample apps, SOC 2) and the form on the right: domain, email and password, plus GitHub and Google sign-up.

## Ordering and balance (Olaide)
- The newest sidebar is the one with the "Activity" group (on new-dashboard and new-query-worker).
- The UI refresh is probably the bigger share of the project. The page should still show that both the UI refresh and the onboarding were prioritised.

## More material, batch 4
- **new-query-worker:** a query editor (Queries, then queryworker_1). Code with line numbers, a C8QL/SQL switch, parameters as JSON or a table, a batch size, and Update, Run Query and Clear Results buttons. It uses the newest sidebar (Activity, Data, and Compute with Containers, Functions, Query Workers and Stream Workers).
- **research-survey:** a Google Forms summary with 12 responses. The respondent emails at the top are Macrometa staff, so blur or crop them before showing.
  - Finding out about new tech: web search 66.7%, word of mouth 50%, blogs 41.7%.
  - Continuous onboarding after the first run: 58.3% said yes, they want ongoing pointers. 41.7% said the first pointers are enough.
  - Information people will give at sign-up: email 91.7%, name 83.3%, role 66.7%, preferred programming language 58.3%, experience level 50%, organisation name and size 25% each.
  - Docs in the console or on a separate site: 66.7% don't mind either, 25% want a separate site, 8.3% want them in the console.
  - Open answers: GCP's onboarding was disliked as "very confusing, no pointers". AWS was liked for its learning links on the dashboard. One person suggested "a brief video of key capabilities", and the welcome screen now has an intro video.
- **research-competitive:** a competitive analysis spreadsheet comparing Macrometa with Fauna, Hasura and Confluent across 12 features.
  - Macrometa had: a get-started guide, helpful documentation and tutorials.
  - Macrometa lacked: a directional landing page, a product walkthrough, onboarding pointers, 24/7 support, clear copy, easy-to-navigate features, continuous onboarding, templates or blueprints, and inclusive copy.
  - Confluent had all twelve.

## Decisions (Olaide)
- There are three key insights, not four.
- Welcome screen order: A first, then B. What changed: both iterations were about finding the quickest way to the first value moment, and B is where we landed.
