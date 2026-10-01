# Case study: Two days to thirty minutes (Strategyzer SaaS admin)

Approved standalone prototype of the second case study. It's kept here as the source of truth until it's built into the Next.js site. Published preview: version 49 of the Strategyzer SaaS Case Study artifact (https://claude.ai/artifact/QtjhytdmhxdKx9wXs9VWwY).

It reuses the Strattie system as is (see `../strattie/README.md`): same shell, type, layout and components. Only the content and a few additions in `src/diagrams.css` are new.

## Build and preview

```sh
python3 src/build.py                 # writes index.html next to images/
python3 -m http.server 3203          # then open http://localhost:3203/index.html
```

- `src/shell.html`: page frame, hero, At a glance and all shared CSS and JS. It's the Strattie shell plus three changes:
  - count-ups keep decimals
  - the toggle on "before" figures reads "Show the problems"
  - the note for the moment a video is playing is highlighted
- `src/sections.html`: the case study content, one `<section class="sec" data-title>` per chapter.
- `src/diagrams.css`: this page's additions:
  - the four-layer diagram (`.vx-layers`)
  - the Slack feed wall (`.wall`, `.feed`, `.msg`)
  - the before / after / designs layers (`.layers`, `.layer-k`)
  - the principle labels (`.fprin`)
  - the strategic call box (`.hardcall`)
  - the warm before backgrounds (`.before`)
  - design tabs that wrap on phones
- `src/tools/tabs-feature2.py`, `tabs-feature3.py`, `tabs-feature4.py`: regenerate those features' design tabs (screens, pins and decisions). Run them from this folder, then rebuild.
- `copy/strategyzer-copy-final.md`: the approved copy, exported from the built page with every toggle and tab opened.
- `images/`: only the media the page uses.
  - Videos are H.264 MP4 plus VP9 WebM, 30fps, 2000px wide, with a WebP poster.
  - Screens are the original exports, copied byte for byte or cropped losslessly. Re-encoding them dulled saturated colours.
- `mockups/`: layout mock-ups shared during the build.

## How each feature is laid out

Each of the four features has a heading, a principle label, Before / Now cards, then three layers:

1. **Before.** The old screen or recording on a warm background, with its problems behind "Show the problems".
2. **After.** A screen recording of the new flow, with timed design decision notes behind "Show the design decisions". Clicking a note jumps the video, and the current note is highlighted as it plays.
3. **The designs.** Tabs of design screens, with the decisions pinned to each screen behind the same toggle.

## Decisions to keep when building the site

- **One name per layer:** program template, cohort delivery, team project, workspace. "Live" is used wherever the point is that teams are in the room. The product's own name, "playbook instance", appears only in screenshots and is explained once under the four-layer diagram.
- **Toggles:** every Before and After figure keeps its toggle. Olaide wants the reasoning available on every recording. The toggle pulses whenever the notes are hidden.
- **Results:** "6 figures" stays the highlighted card, by Olaide's choice. The workspace metric is Kurt's "4 hours → 20 minutes", which his Slack message on the page backs up.
- **Feature 1's "A strategic call":** review, not automatic sync. Present it as design maturity, not as a struggle.
- **Left as is after review:** feature heading size, feature links in the side menu, the size of the before media, and phone crops.
- **Preview only:** the Motion and Desktop/Phone bar at the bottom is only for reviewing prototypes, so leave it out of the site.

## Open item

"6 figures" is the one result the page doesn't back with evidence. If a concrete example becomes shareable (a client type, a deal it helped win, a renewal), add it to the Results card.
