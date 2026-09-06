# Simply Being Female — Project Overview

<!-- Fill in the sections below. Claude Code reads this file automatically
     on every future session in this project, so anything you put here
     becomes standing direction — no need to re-explain it each time. -->

## Purpose
Working assumption (not yet confirmed by the site owner): a space for honest,
non-performative reflection on womanhood — essays, journal entries, and
everyday wisdom. Update this once the real purpose/angle is confirmed.

## Audience
Assumed: women looking for a warm, non-judgmental space rather than a
polished lifestyle-brand feel. Confirm actual target audience.

## Tone & Voice
Confirmed direction (2026-09-06): provocative, feminine, thought-provoking,
and unapologetic — not warm/quiet. Bold statements, direct address, no
hedging or corporate softness. Copy should read like it's daring the reader
to agree, not asking permission.

## Pages / Sections
- Home
- About
- Journal (blog-style essay listing)
- Contact (Netlify Forms contact form)

## Design & Style
Confirmed direction (from moodboard the owner shared): bold, maximalist,
feminine-brand aesthetic — think indie Squarespace template shops (Tuesday
Marketing Co, Lucie Fink) crossed with punchy feminist-poster typography
("well behaved women...", "you're doing great bitch" style statement cards).

- Palette (locked 2026-09-06, exact swatches the owner approved — do not
  drift from these without asking): Rojo Intenso #c90018, Cherry #c80203,
  Rosa Algodón #ff9fcd, Bubblegum #e878aa. Every other color in style.css is
  a direct tint/shade of one of these four (light pinks, a deep wine
  #5c0111, near-black ink #240d14, cream #fbe3e7) — no independently
  invented hues. CSS variables `--purple`/`--purple-deep`/`--purple-soft` and
  `--mustard`/`--mustard-soft` are kept as internal names in style.css but
  hold these red/pink values, not purple or yellow — don't reintroduce
  actual purple or mustard/gold hues under those names.
- Fonts (updated 2026-09-06, owner supplied real purchased brand font
  files — see fonts/ folder): **Brolia** (unicase display serif, quirky
  rounded terminals — used for all headings/brand wordmark), **Brolia
  Ligature** (flowing italic/script companion — used for inline accent
  words, e.g. the "Female" in the wordmark), **Silk Serif ExtraLight**
  (thin elegant serif — used for larger intro/lede paragraphs only, too
  thin for small body text), **Anton** (bold condensed display, Google
  Fonts — used for punchy one-line "mantra"/quote statements), **Inter**
  (sans, Google Fonts — body text, nav, buttons, labels).
  IMPORTANT: confirm with the owner that their font license covers
  self-hosted webfont/embedding use (not just desktop use) before this
  site goes fully public — Monotype/MyFonts licenses often gate that
  separately and the license file on hand didn't make the tier clear.
- Signature elements: thick black borders + hard drop-shadows on cards/
  buttons (scrapbook/sticker feel), rotated "photo" collage blocks with a
  washi-tape accent, pill-shaped nav links and buttons, bold poster-style
  quote bands in all-caps Anton.
- Explicitly NOT the look: quiet neutral/cream minimalism, purple/mustard as
  actual hues, muted terracotta-only palette, subtle shadows, hedging or
  "warm and gentle" copy.

## Content
All current copy (hero text, post cards, about story, values) is placeholder
and clearly marked as such. Needs to be replaced with the real story, voice,
and actual journal posts.

## Technical Notes
- Plain static HTML/CSS/JS, no build step or framework.
- Deployed via Netlify, auto-deploying from the `main` branch of
  github.com/Alyra08/Simplybeingfemale.
- Newsletter and Contact forms use Netlify Forms (`data-netlify="true"`,
  honeypot field for spam). No backend needed — submissions land in the
  Netlify dashboard under Forms.
- Domain: custom domain not yet connected; currently on
  simplybeingfemale.netlify.app.

## Things to Avoid
Nothing specified yet — add anything explicitly off-limits here (content,
styles, features).
