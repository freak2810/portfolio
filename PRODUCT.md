# Product

<!-- impeccable:product-schema 1 -->

## Platform
web

## Stack
Next.js 16.4.6 static export, React 19.3.1, TypeScript only, deployed by GitHub Actions to GitHub Pages project page freak2810.github.io/Portfolio. Plain CSS with CSS-only motion and no motion library (owner decision, 2026-11-16); one black theme on every visit, with no light theme and no toggle. No CMS, no ESLint in this cut. Exception (owner, 2026-11-17): one small pause and resume script, `MugguPause`, that only toggles `animation-play-state` and never animates; and `NavSpy`, which only sets `aria-current` on the nav link of the section in view.

## Users
Two equal audiences: recruiters and hiring managers (want the resume fast, one click to the PDF) and developer peers (want to see real projects and open each repo from its card).

## Product Purpose
A personal resume-style portfolio for Aditya Manikanth Rao, Senior Backend Engineer | Tech Lead, based in Hyderabad, born in Warangal. Success is both equal: a hiring action (PDF download or a LinkedIn or GitHub visit within a minute, repo opened from a project card) and the visitor remembering the person and the voice.

## Positioning
A senior backend and tech-lead record told in a Captain America code ("if we lose, we lose it together"), rooted in Warangal and Hyderabad. No other engineer's portfolio can truthfully copy that voice or those roots. The wording is the owner's own paraphrase of the Captain America idea of facing loss together; site copy stays original, with one exception: the landing role line may carry the quote lines listed in `content/landing.ts`, by the owner's decision of 2026-11-17.

## Operating Context
Visitors arrive from a resume, LinkedIn or a link; many on phones and slow data. The site is also the source of a build-time PDF resume made from the same content files.

## Capabilities and Constraints
- Sections: landing screen, top two projects plus this portfolio as a third card after the first scroll, then Experience, Education, Skills, About; resume PDF linked in one click.
- Contact is LinkedIn, GitHub and the resume PDF only, as icon links on the landing. No email address and no mailto link. No form, no server code. Phone number is never published.
- First-load JavaScript at most 200 KB gzipped (measured baseline 138.5 KB). Lighthouse mobile 90 or more, layout shift under 0.1.
- Static export under /Portfolio/ base path; all asset paths go through a base-path helper.
- Display name "Aditya Manikanth Rao". Title "Senior Backend Engineer | Tech Lead". Innovapptive figures are not published. Angular is out of the kit, by owner decision on 2026-11-17.
- Telugu touch stays small: no Telugu tagline (owner decision). The landing muggu alternates the Telugu line with a Hindi companion, both drawn as paths with no font file shipped. The PDF carries no Telugu and no Hindi.
- Undecided: the top three projects are provisional (Wexa engine, EventDesk, this portfolio); old project names will come from the owner later. A 2019 to 2020 intern role is unconfirmed and held back.

## Brand Commitments
Original or licensed art only: no official Marvel logos, artwork or fonts. Captain America voice in the copy, restrained but visible. Photo-traced vector art of local landmarks (the Kakatiya gateway for Warangal) shows only on the not-found page; its credit lives in the README Acknowledgments (a respectful landmark image, never played for a joke). The portrait in the closing chapter is the owner's own photograph in an arch frame, not art; the crown-and-sparkles line overlay drawn on it is original (aria-hidden), with no official Marvel art, Autobot insignia, Hyundai badge or show logos. These commit to existence, not to a look.

## Evidence on Hand
Resume and LinkedIn facts in the feature notes (identity, summary, skills, five experience entries, education, three certifications, languages). No testimonials, metrics from Innovapptive, or customer logos exist; do not fabricate them. Old code is archived on branch chore/archive-old-portfolio.

## Product Principles
1. Hiring action first, personality second, never one at the cost of the other.
2. Every claim comes from the owner's resume or LinkedIn; unconfirmed items stay held back.
3. Motion and graphics are core, and always have a still, no-JavaScript fallback.
4. Small and fast beats heavy: the budget is a feature.
5. The voice is brave and team-first; it never mocks or boasts.

## Accessibility & Inclusion
WCAG AA as the floor on the single black theme, with AAA text contrast on body copy where it is cheap. Full keyboard path, a still fallback for prefers-reduced-motion, content readable with JavaScript off, a skip option for the landing screen.
