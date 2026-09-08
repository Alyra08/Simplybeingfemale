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
- Shared: top marquee announcement band, centred-wordmark navbar (links
  split either side), "Join us" opens a shared Dialog (`#join-dialog`) with
  a two-step success state, red footer with columns + stamp.

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
  grey, never a hard black offset shadow.
- The `.wavy-card` scalloped quote card (SVG path, 1.6px outline, no
  shadow) is used once per page maximum, for a manifesto/mission line.
- No gradients anywhere in the real spec.

## Content status
Photography: no usable real photos yet — the design system's actual
lifestyle photos (`women-picnic.png`, `women-hiking.png`) and the logo
files exceeded what could be pulled through this session's file-read tool
(256KB cap; manual base64 transcription of the larger files proved
unreliable and was abandoned). Every photo slot on the live site is
currently a `.photo-mask` color-plate placeholder (labeled "photo — ...")
using the correct oval/arch/soft shape — swap in real images by replacing
those divs with `<img>` tags once the actual files can be added directly
to `assets/`. Logo: navbar/footer currently use a styled text wordmark, not
the real logo files, for the same reason.
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
