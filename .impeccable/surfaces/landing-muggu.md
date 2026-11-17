---
version: 1
slug: "landing-muggu"
primary_target: "components/Muggu.tsx"
related_targets: []
---

## Brief for the finish reviewer
The older `app-page-tsx.md` is stale (navy gateway, theme toggle, an email link) and is not the brief. Judge only the muggu in the landing, with PRODUCT.md.

## Concept
Morning muggu: the Telugu spelling of the given name, drawn as one pale line over a faint dot grid, like rice flour at a doorstep. Traced from an OFL face, paths only: no font file, no text element, no tagline, no second word.

## Motion (owner timings, page time)
- First draw 0.6 s to 3.1 s, after the name wipe. Rest 3.1 s to 7.1 s. Sweep 7.1 s to 8.1 s from the line start. Redraw at 8.1 s. Cycle 7.5 s, forever.
- Only stroke-dashoffset animates. CSS only; one small script (MugguPause) pauses it off-screen and in a hidden tab, then resumes.
- Reduced motion and no script: the full line, still.

## Look
- Line and dots use the existing foreground token. Line 2.6 units, round caps. Dots pitch 12, radius 1.1, opacity 0.16.
- No glow, blur, shadow, gradient or new colour. Line contrast at least 3:1.

## Placement
- 1024 px and wider: right column above the role line, about one name line tall.
- Phone: under the English name, about half the width (150 to 170 px at 360). Reserved box, so nothing shifts.
- Decorative: aria-hidden, no focus stop. The h1 stays the accessible name. The speed budget stays green and the LCP element stays text.
