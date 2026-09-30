# Case study: Solving the first-step problem (Strattie / Playbook Recommender)

Approved standalone prototype of the first case study. It's kept here as the source of truth until it's built into the Next.js site. Published preview: version 85 of the Strattie Case Study artifact.

## Build and preview

```sh
python3 src/build.py                 # writes index.html next to images/
python3 -m http.server 3201          # then open http://localhost:3201/index.html
```

- `src/shell.html`: page frame, all CSS and JS (index, motion, zoom, video playback, decisions toggle, explorable images).
- `src/sections.html`: the case study content, one `<section class="sec" data-title>` per chapter.
- `src/diagrams.css`, `src/tree.js`: the question map diagram. `src/geist.b64`: the inlined Geist font.
- `src/steps-edit2.py`: regenerates the four-tab step viewer (Question 1 to Recommendation) inside `sections.html`.
- `copy/strattie-copy-v5.md`: approved copy, the source of truth for wording. v4 keeps the older visual build notes.
- `flow/`: source for the Strattie assistant animation (`flow.html` renders the timeline, and `rec.js` records it at 30fps through ffmpeg).
- `images/`: only the media the page uses. Videos are H.264 MP4 plus VP9 WebM with a WebP poster.

## Reusing it for the next case studies

The structure, type, hierarchy and components are settled. New case studies reuse `shell.html` as is and only write a new `sections.html`.

Page flow: hero (title, one-paragraph hook, facts, hero image) → At a glance → problem → the bets and decisions → design detail → how it was built → results → beyond the numbers → how I work → what's next → closing line.

Components available in `shell.html`:
- **Frames and media:** framed media on a grey panel (10px radius, soft shadow, no stroke) and click to zoom.
- **Video:** autoplaying looping video with pause, video notes with timestamps, chapter scrubbers, and synced before/after pairs.
- **Explorable images and decisions:** explorable images (`data-xp`) behind the pulsing "Show the design decisions" toggle, plus the tabbed step viewer.
- **Comparisons and results:** explored-vs-shipped pairs (`.duo`), comparison and ledger visuals (`.vx-*`), animated result counters and "beyond the numbers" cards.

Copy rules, from the copy review:
- Plain words first.
- One point, one place.
- Bold lead-ins state the decision, not a riddle.
- Short sentences.
- Confident, not showy.
- Body text is #333 for accessibility.
