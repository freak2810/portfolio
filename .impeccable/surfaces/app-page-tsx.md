---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: []
---

## Scope and visitor mode
- Experience mode: a portfolio, the artifact leads.
- Surface: the home route `app/page.tsx`, a single-page scroll (landing, three projects, Experience, Education, Technology, Contact).

## Audience, job, action
- Two equal audiences: recruiters and hiring managers (want the resume fast), and developer peers (want real projects, one click to each repo).
- Job: show a senior backend engineer and tech lead as a real, steady person with a team-first voice, rooted in Warangal, based in Hyderabad.
- Action: Resume PDF download, email (mailto), or a repo opened from a project card, within a minute.

## Proof, content and constraints
- Content comes only from the owner's resume and LinkedIn. No testimonials, Innovapptive figures or customer logos. Phone number never published. Angular is dropped.
- First-load JS at most 200 KB gzip; measured scaffold baseline 138.5 KB. Lighthouse mobile 90 or more, layout shift under 0.1.
- Plain CSS, no Tailwind, no motion library; CSS-only motion.
- Dark first on every visit; light only through the toggle.
- Still fallback for prefers-reduced-motion and for no JavaScript (everything drawn, visible, still).
- Original art only: no Marvel logos, artwork or fonts; copy is original and reproduces no film line.
- Static export under the /Portfolio/ base path. WCAG AA floor in both themes.

## Chosen direction and memorable moment
- Direction: gateway-as-page. One stone gateway in light-on-navy line art; each section is another gate.
- Memorable moment: a glowing star inside an original pointed shield hanging in the arch, with the name below and the Warangal to Hyderabad route line in two scripts.
- Source: /Users/adityamanikanthrao/.local/share/agent-stack/features/portfolio-rebuild/notes/design-direction.md (final version).

## Unresolved decisions
- Old project names (owner will supply later); the top three projects are provisional.
- EventDesk framing and team size.
- A 2019 to 2020 intern role.
- Certification issuers and years.
- A face portrait: the owner asked about it; undecided.
These stay held back from the page until the owner confirms.

## Direction contract
THESIS: The page is one stone gateway in light-on-navy line art; each section is another gate you pass through. It refuses the dark developer template (headline, button, row of equal cards, neon glow).
OWN-WORLD: Navy #09152c field, always dark first, with a faint blueprint grid; 1.25px steel-blue line art; blue marks what you can act on, red appears once per screen as the live mark; the star glows pale cyan-white. Big Shoulders Display 800, uppercase, sets names and heads; Hanken Grotesk sets reading text; Noto Sans Telugu sets only the place names. Shapes: pointed heater shield, five-point star, three-lobed cusped arch, plinth bands; the footer holds one quiet landmark, the Buddha statue on its rock in Hussain Sagar with water-line ripples. Cards are plates with a cusped top edge. Light theme (toggle only) is cool daylight stone.
STORY: A recruiter sees a senior backend engineer and tech lead with a team-first code, rooted in Warangal, based in Hyderabad. They believe the record is real and the person is steady. They download the PDF, email, or open a repo within a minute; peers remember the gateway and the voice.
FIRST VIEWPORT: Full-height gateway. Lintel nav on top (links, Resume PDF, theme toggle). A glowing star inside an original pointed shield hangs centred in the arch, about 390px tall at 1440x900. The name sits big at lower left, the real role line under it; lower right, a Warangal to Hyderabad route line with the Telugu place names. Scroll cue bottom centre, "Skip to resume" bottom right. Primary action: Resume PDF on the lintel.
FORM: gateway-as-page (pinned by brief, no ordered list rolled); seed: none (pinned by brief)
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
