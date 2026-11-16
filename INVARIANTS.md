# Invariants

Rules that hold for this site. A change that conflicts with one is stopped and discussed first.

## 1. The content shape is the contract

The content files under `content/` share one typed shape (`content/types.ts`, `content/ids.ts`, `content/index.ts`). The web pages and the PDF read it only through `content`. The shape changes only by a logged contract drop.

Enforced by: `pnpm typecheck` rejects a wrong shape; `node scripts/check-content.ts` checks the values.

## 2. Original look only

The look is Marvel-inspired from original assets only: no official logos, artwork, fonts or screenshots, no full movie quotes, and the owner's private phrase about facing loss together is never page copy.

Enforced by: the banned-phrase lines of `scripts/banned.txt` and its public file-name rule catch listed phrases and file names; design review judges logos, artwork and fonts.

## 3. Privacy

No phone number and no server code on the site. Email appears only as a mailto link. No tracking scripts or cookies. The owner's family name, a dropped skill and the lapsed personal domain stay out of `app/`, `components/` and `styles/`.

Enforced by: the phone-pattern rule in `scripts/check-content.ts`, which reads every content string, and the three guard lines of `scripts/banned.txt`, which the build runs over those three folders.

## 4. Asset paths go through the base-path helper

Every raw asset path in the pages goes through `withBase` from `lib/base-path.ts`, so the site works under the repository path on GitHub Pages.

Enforced by: design review now; the post-build path check in the deploy workflow once that workflow lands.

## 5. Main changes only through a human-merged pull request

No agent pushes to main and no agent merges. A person reviews and merges every change to main.

Enforced by: the host's pull request review; this is a permanent rule.

## 6. Withheld figures stay out, and open flags are settled before launch

Two Innovapptive timing figures from interview prep and the Wexa context-size figure are not published (the context-size figure is omitted, not held). The resume's own figures stay. Any entry with an open flag is resolved or held before launch.

Enforced by: the withheld-figure line of `scripts/banned.txt` for the literal forms; design review for paraphrases; `node scripts/check-content.ts --strict` for open flags and placeholder sections.
