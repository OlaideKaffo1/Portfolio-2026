# Case study: Making speaking up at work worth it (Fount and Fount AI)

Approved standalone prototype of the third case study. It's kept here as the source of truth until it's built into the Next.js site. Published preview: version 24 of the Fount Case Study artifact (https://claude.ai/artifact/XHzEtRuLZpiMCdkRHDdmoZ).

It reuses the Strattie and Strategyzer system (see `../strattie/README.md` and `../strategyzer-saas/README.md`): same shell, type, layout and components. Only the content and a few additions are new.

## Build and preview

```sh
python3 src/build.py                 # writes index.html next to images/
python3 src/tools/export-copy.py     # refreshes copy/fount-copy-final.md from the page
python3 -m http.server 3203          # then open http://localhost:3203/index.html
```

- `src/shell.html`: page frame, hero, At a glance and all shared CSS and JS. On top of the Strategyzer shell it adds:
  - tabbed figures that size to the open tab and ease between heights
  - `data-dz` on a figure to rename its toggle, such as "Show the key moments" or "Show the findings"
- `src/sections.html`: the case study content, one `<section class="sec" data-title>` per chapter.
- `src/diagrams.css`: this page's additions:
  - the prioritisation vote (`.vote`)
  - the old-way illustration beside its Before and Now cards (`.bn`)
  - the Fount AI before-and-after bars (`.ai-bars`, built on `.funnel`)
  - side-by-side transcript screenshots (`.duo`)
- `src/tools/export-copy.py`: writes every heading, tab, caption and pinned decision to `copy/fount-copy-final.md`.
- `src/tools/old-way/`: the generator for the illustrated old-way screens.
- `copy/fount-copy-final.md`: the approved copy, exported from the built page.
- `images/`: only the images the page uses, all lossless WebP.
  - Real screens are Olaide's exports, copied byte for byte or cropped losslessly. The testing screenshots are cropped below the browser bar.
  - The `old-*` images are the generated illustrations.

There are no screen recordings. Olaide only has images for this case study and for the developer tooling one, so the layout and the pinned decisions do the work recordings did in Strategyzer.

## How the page is built

- **Two acts.** Act 1 is Fount (features 1 to 3). Then "A year later" with the before-and-after journey maps. Act 2 is Fount AI (features 4 and 5), opened by three strategic calls.
- **Each feature** has a heading, a principle label, the old-way illustration at half width beside its Before and Now cards, then tabs of real screens with numbered decisions pinned to each one.
- **Toggles** start hidden on every figure and pulse until opened. Olaide chose not to open any by default.

## Decisions to keep when building the site

- **Every claim is sourced.** Numbers come from Olaide's two write-ups (Fount SaaS and Fount AI PDFs), the screens, or her own answers. The page was audited claim by claim, so don't add totals, durations or "in person" wording that she hasn't given. Where something is unknown, mark it and ask.
- **Dropped figures:** $22M, 840% ROI, 67% turnover, 340%, $2.3M/$1.8M and 312% stay out. They weren't measured in a way she can stand behind.
- **Wording that's intentional:**
  - The 28% and 65% figures came from one customer, and the page says so.
  - The research was remote, over Zoom.
  - The status is "Shipped", not "Live".
  - Results were reported by customers during sprints with them.
  - The $3M+ is Fount only. Fount AI was sold as an add-on to every enterprise customer, priced by contract.
  - "63% of friction points" stays as is, by Olaide's choice.
  - The testing outcome ("top five first") is described as a request plus how the product works, not as cause and effect.
- **Names:** INGKA can be named. Testers' first names and companies can stay. Emilie Bastrup is Head of Customer Success, and Trish Delude is a Customer Success Manager.
- **Headline:** "Making speaking up at work worth it". Strategyzer's next-project card points here with the same title.
- **Preview only:** the Motion and Desktop/Phone bar at the bottom is only for reviewing prototypes, so leave it out of the site.

## Open items

- The "Next project" card still has placeholders for the developer tooling case study: its company name, title and thumbnail (13).
- A before-and-after pair showing how one design changed through testing would strengthen the page. The AI testing page mentions "Dashboard Redesign V1 – Old", if an export of it exists.
- "24 contextual interviews" is Olaide's wording from her write-up. Check it still fits, since the interviews were over Zoom.
