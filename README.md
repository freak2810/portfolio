# Aditya Manikanth Rao - Portfolio

A static portfolio site for Aditya Manikanth Rao, a senior backend engineer and tech lead. Live at <https://freak2810.github.io/Portfolio/>.

It is a Next.js App Router site exported to plain files (`output: "export"`), with typed content in `content/`, one black theme and no tracking. The base path is `/Portfolio/`.

## Run it

Install [Node](https://nodejs.org) 22.19 or newer and [pnpm](https://pnpm.io), then:

```
pnpm install
pnpm dev
NEXT_PUBLIC_BASE_PATH=/Portfolio pnpm build
```

The last line makes the static build in `out/` the way GitHub Pages serves it.

## Scripts

- `pnpm dev`: the Next.js dev server.
- `pnpm typecheck`: generate route types, then `tsc --noEmit`.
- `pnpm build`: `scripts/check-content.ts`, then `scripts/build-resume.ts`, then `next build`.
- `pnpm measure`: first-load JavaScript size of `out/` (fails over 200 KB gzip).
- `NEXT_PUBLIC_BASE_PATH=/Portfolio pnpm serve`: serve `out/` on `127.0.0.1:4173` under the base path, with the host's 404 and gzip behaviour. It exits 1 without the variable.
- `NEXT_PUBLIC_BASE_PATH=/Portfolio pnpm lighthouse`: after a build with the base path, run Lighthouse (3 runs, median) on the served page and an accessibility run on the 404 page. It needs Chrome at the default macOS path or `CHROME_PATH`, and exits 1 without the variable. `node scripts/lighthouse-check.ts --url <https-url>` audits a live page instead, with no server and no variable.
- `node scripts/check-content.ts [--self-test]`: content rules.
- `node scripts/check-base-path.ts`: every root-relative asset path in `out/` carries the base path.

## Content

Copy lives in `content/*.ts`.

## Deploy

A push to `main` runs the GitHub Actions workflow in `.github/workflows/pages.yml`, which builds the site and publishes it. Set Settings > Pages > Source to GitHub Actions once. A person merges; nothing deploys from a topic branch.

## Project rules

See `INVARIANTS.md` for the rules a change must keep, `PRODUCT.md` for what the site is for, and `AGENTS.md` for the Next.js notes agents read first.

## Acknowledgments

Third-party works used in this repository.

- **Kakatiya thoranam**: outline traced from a photo by Ms Sarah Welch, [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/), via Wikimedia Commons: [File:A_torana,_gate_to_sacred_precinct,_Warangal_Fort_Park_and_Museum,_Telangana,_India_-_7.jpg](https://commons.wikimedia.org/wiki/File:A_torana,_gate_to_sacred_precinct,_Warangal_Fort_Park_and_Museum,_Telangana,_India_-_7.jpg). Changes: outline traced to vector. The traced file is `public/art/torana.svg`.
- **Grand i10 hatchback**: outline traced from "Hyundai AI3 Grand i10.jpg" by Bull-Doser, public domain, via Wikimedia Commons ([file page](https://commons.wikimedia.org/wiki/File:Hyundai_AI3_Grand_i10.jpg)). Changes: outline traced and simplified to a line drawing; badge, plate and lettering left out. It is the `nios` path in `components/Doodles.tsx`.
- **Pomeranian**: face and ruff traced from "Pomeranian Gerry.jpg" by Zikmund105, [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/), via Wikimedia Commons ([file page](https://commons.wikimedia.org/wiki/File:Pomeranian_Gerry.jpg)). Changes: outline and facial features traced and simplified; lower ruff extended past the photo edge. It is the `pom` path in `components/Doodles.tsx`.
- **Simple Icons** 16.38.0, [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/), from [simpleicons.org](https://simpleicons.org/). Technology logos are trademarks of their owners and appear only to name the technology.
- **Lucide** 1.73.0, [ISC](https://github.com/lucide-icons/lucide/blob/main/LICENSE), from [lucide.dev](https://lucide.dev/). Copyright (c) Lucide Icons and Contributors; some icons derive from Feather, copyright (c) 2013-present Cole Bemis, [MIT](https://github.com/feathericons/feather/blob/main/LICENSE). Used for the skills with no brand logo and for the guitar, headphones and pizza line drawings behind the closing section. Changes: the elements of each icon are merged into one path, and ellipses and relative starts are rewritten.
- **Noto Sans Telugu**, [SIL OFL 1.1](https://openfontlicense.org/), Copyright 2022 The Noto Project Authors (https://github.com/notofonts/telugu). The Telugu letter in the closing-section line drawings is traced from one glyph outline, merged and rescaled. The font file is not shipped.
- **Lakki Reddy**, by Appaji Ambarisha Darbha, [SIL OFL 1.1](https://openfontlicense.org/), Copyright (c) 2011 Silicon Andhra (fonts.siliconandhra.org). Copyright (c) 2010 by Font Diner, Inc DBA Sideshow. Source: [google/fonts](https://github.com/google/fonts/tree/main/ofl/lakkireddy). The landing drawing of the Telugu spelling of the given name is centre-traced from this face, simplified to one line. No font file is shipped.
- **Kalam**, by Indian Type Foundry, [SIL OFL 1.1](https://openfontlicense.org/), Copyright (c) 2014, Indian Type Foundry (info@indiantypefoundry.com). Source: [google/fonts](https://github.com/google/fonts/tree/main/ofl/kalam). The landing drawing of the Hindi spelling of the given name is centre-traced from this face, simplified to one line. No font file is shipped.
- **Big Shoulders Display** and **Hanken Grotesk**, [SIL OFL 1.1](https://openfontlicense.org/), from [Google Fonts](https://fonts.google.com/), self-hosted through `next/font`. The site's display and body text faces. Source: [google/fonts](https://github.com/google/fonts/tree/main/ofl/bigshouldersdisplay) and [google/fonts](https://github.com/google/fonts/tree/main/ofl/hankengrotesk).
- **OpenAI, AWS, AWS SQS, DynamoDB and LlamaIndex marks** from [SVG Logos](https://github.com/gilbarbara/logos), [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/). The marks are trademarks of their owners and appear only to name the technology. Changes: the AWS mark's two coloured paths are merged into one path, the SQS and DynamoDB marks drop their gradient tile and the LlamaIndex mark keeps only its llama silhouette, so all draw in the page text colour; coordinates are rounded to two decimals.
- **LinkedIn mark**: Material Design Icons 7.4.47 (`@mdi/svg`), [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0), from [pictogrammers.com](https://pictogrammers.com/library/mdi/). Used for the LinkedIn mark in the landing icon row.

Some icons are trademarks of their owners and are shown only to name the technology. A used mark is not an endorsement.

