# Invariants

Rules that hold for this site. A change that conflicts with one is stopped and discussed first.

## 1. The content shape is the contract

The content files under `content/` share one typed shape (`content/types.ts`, `content/ids.ts`, `content/index.ts`). The web pages and the PDF read it only through `content`. The shape changes only by a logged contract drop. Note: `Profile.origin` was removed in commit f120f7f (the closing chapter dropped the route line).

Enforced by: `pnpm typecheck` rejects a wrong shape; `node scripts/check-content.ts` checks the values.

## 2. Original or licensed art only, no Marvel assets

The look stays Marvel-inspired: no official logos, artwork, fonts or screenshots, no full movie quotes (one exception: the landing role line may carry the five quotes listed in `content/landing.ts` items 8, 9, 11, 12 and 13 (item 10 is the owner's own line) by the owner's decision of 2026-11-17; the ban stays in force everywhere else, including all other copy and the PDF), and the owner's private phrase about facing loss together is never page copy.

Art is either original or traced from a photo or a font outline whose licence allows it, and its credit is published in the `README.md` Acknowledgments section. The Telugu letter in the closing section is traced from the Noto Sans Telugu outline (SIL OFL 1.1); no font file is shipped. No photo comes from a commercial site. No share-alike licence is used unless the human says yes in writing. The portrait in the closing chapter is the owner's own photograph, not third-party art, so it needs no credit.

Enforced by: the banned-phrase lines of `scripts/banned.txt` (its "I can do this all day" line was removed for the landing role line exception) and its public file-name rule catch listed phrases and file names; design review judges logos, artwork and fonts; credits are checked by the credits row of the art sourcing note and by the `README.md` Acknowledgments section, which holds one entry per third-party work, and by the build check named in spec 002, once that check exists.

## 3. Privacy

No phone number and no server code on the site. No email address and no mailto link appear on the site or in the PDF. No tracking scripts or cookies. The owner's family name, a skill the owner has not confirmed and the lapsed personal domain stay out of `app/`, `components/` and `styles/`.

Enforced by: the phone-pattern and no-`@` rules in `scripts/check-content.ts`, which read every content string, and the `mailto:` line and the two guard lines of `scripts/banned.txt`, which the build runs over those three folders.

## 4. Asset paths go through the base-path helper

Every raw asset path in the pages goes through `withBase` from `lib/base-path.ts`, so the site works under the repository path on GitHub Pages.

Enforced by: design review now; the post-build path check in the deploy workflow once that workflow lands.

## 5. Main changes only through a human-merged pull request

No agent pushes to main and no agent merges. A person reviews and merges every change to main.

Enforced by: the host's pull request review; this is a permanent rule.

## 6. Withheld figures stay out, and open flags are settled before launch

Two Innovapptive timing figures from interview prep and the Wexa context-size figure are not published (the context-size figure is omitted, not held). The resume's own figures stay. Any entry with an open flag is resolved or held before launch.

Enforced by: the withheld-figure line of `scripts/banned.txt` for the literal forms; design review for paraphrases; `node scripts/check-content.ts --strict` for open flags, plus the owner's sign-off of all sections on 2026-11-17.

## 7. One photo of the owner, no photo metadata

The only photo of the owner on the site is the owner's own portrait: two JPEG sizes under `public/photo/` (480 and 640 pixels wide), the background replaced by a flat panel, with an original crown-and-sparkles SVG overlay (aria-hidden) drawn on top. No other source photo is in the repo or in `out/`. No EXIF, GPS or camera metadata is in the repo or in `out/`: the two files are re-encoded and stripped.

Enforced by: design review; the original upload stays outside the repo.
