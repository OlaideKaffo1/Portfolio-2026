# Strattie deck

Presentation of the first case study, "Solving the first-step problem" (Strategyzer, Playbook Recommender). 15 slides, dark keynote style, Geist and Geist Mono. Kept separate from the website; nothing here is used by the site.

- `index.html`: the deck. Open it in a browser, or present from the published link.
- `strattie-case-study.pdf`: the PDF to send afterwards. All slides at their final state, videos shown as poster frames, no speaker notes.
- `media/`: screenshots, clips (MP4 with WebM fallback) and posters, copied from `case-studies/strattie/images/`. `finder-hero-clean.webp` is the hero with the pink border cropped off.
- `outline.md`: the agreed outline and decisions. `directions.html`: the visual directions page used to choose the look.

## Presenting

- Arrow keys, space or the controls bottom right to move. `F` for full screen.
- `N` shows the speaker notes under the slide (for rehearsing).
- `P` opens presenter view in a second window: current slide, next slide title, notes and a timer. The two windows stay in sync. If the browser blocks the window, open the deck link in a second window and add `#presenter` to the end of the address.
- `#7` at the end of the address opens slide 7.
- On a phone the deck becomes a scrolling page.

## Before sending the PDF

Slide 14 has a "Quote to come" slot. Fill it with an exact quote, or remove it, then rebuild the PDF:

```sh
NODE_PATH=$(npm root -g) node tools/export-pdf.js file://$PWD/index.html strattie-case-study.pdf
```
