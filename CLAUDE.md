# Simply Being Female — Project Overview

## Source of truth (2026-09-06)
The owner has a Claude Design System project — "Simply Being Female Design
System" (project id `e7b028be-5dce-46ec-b03b-465197351f19`, readable via the
DesignSync tool) — built from her actual supplied logo files, purchased
fonts, and moodboard. That project is now the authoritative brand spec.
Everything below is derived from it. Before changing colors, fonts, or
layout again, re-read that project's `readme.md` and `tokens/*.css` rather
than guessing from chat history — several earlier approximations in this
site (different reds, wrong font roles, hard black shadows, gradients,
emoji) were wrong and have been replaced to match the design system exactly.

## Purpose
Simply Being Female (SBF) is a women's community brand offering group
circles, 1:1 coaching, a day-rate service ("The Day"), and a weekly letter.
Positioning line (verbatim from the client's own artwork): "A space for the
unapologetically fierce, beautifully imperfect woman."

## Voice
Second person for the reader, first person singular for the founder ("I
read every one myself"). Sentence case in copy always — UPPERCASE is
applied by the Brolia component/class, never typed by hand. Short
declaratives, often a fragment. Italic emphasis on 2-3 words per headline
(the brand's only emphasis device — no bold, no color change, no
underline). Full stops in headlines. No exclamation marks. British
spelling. No emoji anywhere — the only decorative glyph is ✦.
Avoid: "empower", "journey", "unlock", "elevate", "we're on a mission",
"game-changing". Use: honest, room, table, space, circle, shrinking,
permission, out loud.

## Pages
- Home (`index.html`) — red hero with photo, a floating white signup card
  overlapping the hero/next-section seam (pattern borrowed from
  luciefink.com/work-with-me, 2026-09-08, at the owner's request — "want
  in? The Sunday note" email capture), wavy manifesto card, a "by the
  numbers" community stats band, a short "meet the founder" intro strip
  (pattern borrowed from jennakutcher.com's "I'm Jenna, nice to meet you"),
  three offering cards, red testimonial band, FAQ accordion. The stat
  numbers (500+ women, 40+ circles, 3 cities, weekly letter) are invented
  placeholders, not real figures — confirm with the owner before treating
  them as real claims, same caveat as the testimonial/press content noted
  below.
  Updated 2026-09-08 (owner asked to "emulate luciefink.com/work-with-me
  more"): added a services marquee right after the hero ("The circle /
  Coaching / The day / The Sunday note"), a real tablist/tabpanel
  "offerings" section mirroring Lucie's "Bringing brands to life" section
  exactly (5 tabs — Circle/Coaching/Day/Note/Retreats — each with its own
  description + CTA, reusing the same `.tabs`/`data-tabs` mechanism already
  built for the Circle page's pricing tabs), and a closing "Still have
  questions? Reach out" CTA band + a second bookend marquee ("Simply being
  female" repeated) right before the footer — mirroring Lucie's page
  structure end-to-end (hero → services marquee → offerings tabs → stats →
  founder/FAQ → other-ways cards → closing CTA → closing marquee →
  footer). The pre-existing "Three doors, one room" cards section is now
  framed as the "other ways in" (Lucie's second, simpler offerings list),
  since the new tabs section covers the primary "ways to work with me"
  role Lucie's tabs originally served.
- About (`about.html`) — oval portrait intro, four-belief hairline grid,
  red press band.
- The Circle (`circle.html`) — Tabs-driven plan switcher (Circles /
  Coaching / Retreats) with pricing, next-dates card row.
- The Day (`the-day.html`) — long-scroll sales page: four full-bleed color
  blocks, taped-photo collage, paper checklist panel, orbit-text strip,
  coral closing band.
- Journal (`journal.html`) — category tag filter (functional), post grid,
  red newsletter band.
- Contact (`contact.html`) — full form (Netlify Forms) + wavy card + toast
  on submit.
- Shared: top marquee announcement band, "Join us" opens a shared Dialog
  (`#join-dialog`) with a two-step success state, red footer with columns +
  stamp.
- Header restructured 2026-09-13 (owner supplied a reference site with a
  thin utility nav bar on top and a big centered logo in its own row
  below): replaced the original centered-wordmark-with-links-split-either-
  side pattern (which was the actual client design system's own documented
  "structural signature", sourced from real client website references —
  worth knowing if the owner ever asks to go back to it) with two stacked
  pieces — `.nav-utility` (all 6 nav links left, "Join us" + mobile
  hamburger right, `position: sticky; top: 0`) directly followed by
  `.logo-row` (the big logo alone, centered, NOT sticky — scrolls away
  normally). IMPORTANT STRUCTURAL GOTCHA: both must be direct children of
  `<body>`, NOT wrapped in a `<header>` div. `position: sticky`'s
  containing block is the nearest block-level ancestor regardless of that
  ancestor's own position value — wrapping `.nav-utility` in a short
  `<header>` (just tall enough for the 2-row nav) caused it to only stick
  within that short box's own height, then fall away with it after
  scrolling past ~150px. Removing the wrapper so `.nav-utility`'s
  containing block is `<body>` (full page height) fixed it. If anyone
  reintroduces a wrapping element around `.nav-utility`, the sticky bar
  will silently break the same way — verify by scrolling a real page
  (e.g. `window.scrollTo(0, 2000)` and checking the nav's
  `getBoundingClientRect().top` is still `0`), don't just eyeball the top
  of the page.

## Design tokens (exact — see style.css :root)
Palette redesigned 2026-09-06 as a deliberately tightened system (see
history below for how we got here). The rule going forward: **one
unambiguous signature color, a real light/dark range per hue family, and
every text/background pairing checked against WCAG contrast before
shipping** — don't casually add more near-duplicate accent hues without
running the same check.

- `--sbf-red` #BF2026 — the signature/primary. Verified from the client's
  actual logo pixels; do not change without the owner's explicit say-so.
  `--sbf-red-deep` #8E1519 is its hover/pressed state; `--sbf-red-bright`
  #D8232B is a single brighter variant reserved for large-display emphasis
  only. `--sbf-cherry` is now just an alias of red-deep — it used to be a
  third near-duplicate red and was collapsed to reduce hue clutter.
- `--sbf-pink` #F0609A — the one clear secondary pink (distinct hue from
  red, not a near-duplicate). `--sbf-bubblegum` #E8478F is a slightly
  deeper variant for rare statement emphasis. `--sbf-blush` #FAD3E3 is the
  light tint for soft backgrounds; `--sbf-blush-deep` #F5B8D2 (aliased by
  `--sbf-cotton`) is the hover/mid tint.
- `--sbf-coral` #F2760D — the one energetic orange accent, chosen with a
  hue clearly separated from red so it doesn't read as "another red."
  `--sbf-apricot` #FBCBAE is its light tint. `--sbf-yellow` #F7B733 is a
  third, sparing support accent (added at the owner's request). Coral,
  apricot, and yellow together are "support accents — at most one per
  page," same rule as the original design system.
- `--sbf-cream` #FFF4EE (page background) and `--sbf-ink` #2A1618 / `--sbf-
  ink-soft` #6B4A4C (text — a plum-brown, never grey/black) are the warm
  neutrals. `--sbf-line` #E4C7C7 is the hairline border color.
- Every text/background pairing in actual use has been checked and sits
  at 4.49:1 or better (most well above), including the fixes this pass
  made: footer column titles and the tone-red card eyebrow now use blush
  instead of pink as text-on-red (was ~2.2:1, now 4.49:1); badge-pink and
  the pink marquee now use ink instead of red-deep as text-on-pink (was
  ~3:1, now 5.58:1); the coral section band now uses ink instead of cream
  as its text color (was ~2.6:1, now 6.01:1). If you add a new color
  pairing, check it the same way before shipping — don't assume a hue
  that "looks like it should work" actually clears AA.
- A page carries at most two background colors plus the red footer.

### Palette history (for context, not for re-litigating)
1. Started from moodboard-approximated reds/pinks (not from real assets).
2. Corrected to the client's actual Design System project's exact tokens
   (logo-verified red #BF2026, blush #F6DCDC, pink #F59798, etc.).
3. Owner asked for more vibrant pinks (2026-09-06) — pushed saturation up
   on blush/pink, still same hue family.
4. Owner asked to add a yellow accent — added `--sbf-yellow`.
5. Owner supplied an explicit 8-color list (Pastel Pink, Bubblegum Pink,
   Bright Pink, Soft Peach, Bright Orange, Cherry Red, Bright Red, Warm
   Cream) with "Bright Orange" labeled the *signature* color, asked to
   preview it before committing.
6. On review: that 8-color list had three near-duplicate vivid warm
   pink/reds, two colors competing for "primary" (red vs orange), and
   several pairings testing below WCAG AA. Asked directly whether these
   were the colors I'd choose as a designer — answered honestly: partly,
   but I'd tighten it. Owner asked me to design it properly. Result is the
   tokens documented above: red kept as the one signature (non-negotiable
   given the logo), the 8 supplied colors folded in as a tightened
   secondary-pink + orange-accent system with a real light/dark range and
   verified contrast, rather than used as seven flat co-equal swatches.
- Fonts: **Silk Serif ExtraLight** (`--font-display`) for every heading,
  22px+, one weight only — contrast comes from size and italic, not weight.
  **Brolia** (`--font-deco`) uppercase-only, for eyebrows/buttons/nav/labels/
  marquee — never body copy. **Nunito Sans** (Google Fonts, flagged in the
  source system as a substitution for an unsupplied bold geometric sans) for
  all body copy. Font files are in `fonts/` (Brolia Regular + Silk Serif
  ExtraLight only — Brolia Ligature is unused by the real spec, ignore it).
  UNCONFIRMED: whether the owner's font license covers self-hosted webfont
  use, not just desktop — check before this goes fully public.
- Shape: pills for buttons/inputs, 22px card corners, 32px dialogs, 4px
  checkboxes (only tight radius). Photography is always masked — oval, arch
  (pill-top), or 22px soft rectangle. Never a hard-cornered photo.
- Shadows: warm red-tinted only (`rgba(143,20,25,...)`), offset down, never
  grey. EXCEPTION (added 2026-09-13 at the owner's explicit request, with a
  reference screenshot): buttons (`.btn` and all its variants except
  `.btn-ghost`) intentionally use a hard, unblurred, brand-colored offset
  shadow + a 3px white border + 18px corner radius — a "sticker/neubrutalist"
  button look. This was a deliberate override of the design system's
  original "no hard shadow" rule for this one component; don't revert it
  back to soft/no-shadow buttons without checking with the owner first.
  Shadow color and offset are driven by `--btn-shadow-color`/`--btn-shadow-x`/
  `--btn-shadow-y` custom properties per variant/size so hover/press states
  (button lifts slightly on hover, shadow collapses to 0 on click/press —
  see `.btn:active`) stay in sync automatically.
- The `.wavy-card` quote card is used once per page maximum, for a
  manifesto/mission line. Redesigned 2026-09-13 (owner supplied a
  reference photo of hand-lettered place cards with organic, irregular
  double-line squiggle frames): it's now a plain rounded-rect card
  (background set per-instance via inline `style="--wavy-bg: ..."`) with
  two nested hand-wobbled frame lines drawn on top — `.wavy-squiggle.outer`
  (red) and `.wavy-squiggle.inner` (coral, inset 10px) — each an empty div
  with a solid border run through an SVG `feTurbulence`/`feDisplacementMap`
  filter (`#squiggleA`/`#squiggleB`, different seeds so the two lines don't
  track each other) instead of the old uniform mathematically-scalloped
  SVG path. The two filters must be defined once near the top of `<body>`
  in every page that uses `.wavy-card` (currently index.html and
  contact.html) — copy that `<svg><filter>...</filter></svg>` block into
  any new page before using the component there, or the border renders as
  a plain straight rectangle with no filter applied.
- A second, distinct component — `.wavy-frame` — was added 2026-09-13 for
  a different reference (a "Save the Date" invitation card with a thick,
  smooth, single-color pink wave border, not the thin organic double-line
  of `.wavy-card`). First attempt used a hand-authored square-viewBox SVG
  path with `preserveAspectRatio="none"`, copying the old `.wavy-card`
  technique — this broke badly on a wide/short box (the content column is
  much wider than tall), stretching the wave into an unreadable blob that
  didn't contain the text. Fixed by switching to the same filter-based
  technique as `.wavy-squiggle` instead: a plain `.wavy-frame-border` div
  (border + border-radius) run through a new `#squiggleThick` filter
  (lower baseFrequency / higher scale than squiggleA/B, for a bigger,
  smoother wave) — this adapts correctly to any box's actual aspect ratio
  since it distorts a normal CSS border rather than stretching a
  fixed-proportion path. LESSON: never use the hand-authored
  square-viewBox path + `preserveAspectRatio="none"` approach on a
  non-square or content-sized box — only the turbulence-filter-on-a-normal-
  border technique is safe for arbitrary aspect ratios. `#squiggleThick`
  must be defined in the same shared `<svg>` filter block as squiggleA/B.
- No gradients anywhere in the real spec.

## Content status
Photography: the design system's actual lifestyle photos
(`women-picnic.png`, `women-hiking.png`) and the logo files exceeded what
could be pulled through this session's file-read tool (256KB cap; manual
base64 transcription of the larger files proved unreliable and was
abandoned). Most photo slots on the live site are still a `.photo-mask`
color-plate placeholder (labeled "photo — ...") using the correct
oval/arch/soft shape — swap in real images by replacing those divs with
`<img>` tags once the actual files can be added directly to `assets/`.
The Home hero (`.photo-mask.arch` in index.html) briefly used a hotlinked
Unsplash stock photo, then was replaced 2026-09-13 with the owner's own
real photo — `assets/imagery/SBF - Social Media NOV25.png` (referenced in
HTML with the spaces URL-encoded as `%20`) — a portrait of the founder.
This is the first self-hosted real photo on the site; the owner uploads
her own images into `assets/imagery/` (or `assets/logos/` for logo files)
and tells Claude the filename + which placeholder to swap it into.
`.photo-mask img { object-fit: cover }` in style.css handles cropping any
real `<img>` placed inside these masks, whichever shape (oval/arch/soft).
Logo: the navbar (`.brand-wordmark` in every page's header) now uses the
owner's real two-line logo file — `assets/logos/SBF Logo V2.png` (spaces
URL-encoded as `%20` in the `<img src>`), 42px tall via `.brand-wordmark
img` in style.css — replacing the earlier styled text wordmark. The footer
still uses a plain circular "SBF" text badge (`.footer-stamp`), not a real
image, since the owner has only supplied the wordmark logo so far, not the
round stamp/seal variant referenced in the original design system readme
— swap that in too once/if that file is provided.
Copy: most page copy is the design system's own placeholder text (its
readme says only the hero line, the manifesto line, and the "honey on the
table" testimonial are taken from real supplied artwork — the rest,
including the testimonial name "Renée, Manchester", the press logos, and
all pricing/dates on the Circle page, is invented and needs the owner's
confirmation before publishing as real claims).

## Technical Notes
- Plain static HTML/CSS/JS, no build step or framework.
- Deployed via Netlify, auto-deploying from the `main` branch of
  github.com/Alyra08/Simplybeingfemale.
- Contact form and Join dialog use Netlify Forms (`data-netlify="true"`,
  honeypot field) — the Join dialog's own email field is not yet wired to
  Netlify Forms (it only runs the local two-step JS demo), only the Contact
  page form actually submits.
- Interactions (accordion, tabs, journal tag filter, dialog, mobile nav,
  toast) are vanilla JS in `script.js` — no framework.
- Domain: custom domain not yet connected; currently on
  simplybeingfemale.netlify.app.

## Things to avoid
No gradients. No emoji. No hard black borders/drop-shadows (that was an
earlier wrong direction — now corrected). No purple or mustard/gold as
actual hues. No hedging or "warm and gentle" copy voice.
