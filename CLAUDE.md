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
- Home (`index.html`) — red hero with photo, wavy manifesto card, three
  offering cards, red testimonial band, FAQ accordion.
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

## Design tokens (exact — see style.css :root, mirrors the design system's tokens/*.css)
- Colors verified from the client's actual logo pixels: `--sbf-red`
  #BF2026, `--sbf-blush` #F6DCDC, `--sbf-pink` #F59798. Full palette also
  includes red-deep #8E1519, red-bright #D62B27, cherry #C80203, blush-deep
  #EFC9C9, bubblegum #E878AA, cotton #FF9FCD, cream #FDF6F3 (page bg), ink
  #2A1618 (body text — a plum-brown, never grey/black), ink-soft #6B4A4C,
  line #E4C7C7 (hairline borders). Support accents coral #E8481F and apricot
  #F2A488 appear at most once per page. A page carries at most two
  background colors plus the red footer.
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
