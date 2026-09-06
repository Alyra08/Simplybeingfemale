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

- Palette (updated 2026-09-06): red/pink tonal family only — no purple, no
  mustard/yellow as distinct hues. Pinkish cream base (#fff3f2), hot pink
  (#ff4f8b), blush/rose pink (#ffd6e6, #f7c6d9), red-orange coral (#ff4d3d),
  crimson (#e0263f), deep rose (#c1123f), near-black wine (#5c0a22 / ink
  #2b0f1a). CSS variables `--purple`/`--purple-deep`/`--purple-soft` and
  `--mustard`/`--mustard-soft` are kept as internal names in style.css but
  now hold red/rose/crimson values, not purple or yellow — don't reintroduce
  actual purple or mustard/gold hues under those names.
- Fonts: Fraunces (serif, editorial headings) + Caveat (handwritten script,
  used as inline accent words) + Anton (bold condensed display, used for
  punchy one-line "mantra"/quote statements) + Inter (sans, body).
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
