---
name: Sahil Kumar Portfolio
description: A neon horizon moving from cinematic night to luminous dawn.
colors:
  paper: "#faf5f8"
  paper-2: "#f0e6ef"
  ink: "#24182c"
  muted: "#604d65"
  accent: "#a32267"
  on-accent: "#fff8fc"
  focus: "#006b77"
  field: "#fffafd"
  rule: "#8b7088"
  selection: "#eac2df"
  clear: "transparent"
  night-paper: "#100d18"
  night-paper-2: "#1d1727"
  night-ink: "#f9f1f7"
  night-muted: "#c4afc7"
  night-accent: "#ff86c0"
  night-on-accent: "#291326"
  night-focus: "#76e5ea"
  night-field: "#231a2d"
  night-rule: "#75647e"
  night-hero-ink: "#fff4fb"
  night-selection: "#732950"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(78px, 13vw, 185px)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(34px, 4vw, 56px)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(22px, 2vw, 28px)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    lineHeight: 1.6
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "15px"
    fontWeight: 600
  button:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 700
rounded:
  control: "2px"
spacing:
  gutter: "clamp(20px, 4vw, 64px)"
  section: "clamp(72px, 10vw, 144px)"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  button-primary-night:
    backgroundColor: "{colors.night-accent}"
    textColor: "{colors.night-on-accent}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
  field:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
    height: "52px"
  filter:
    backgroundColor: "{colors.clear}"
    textColor: "{colors.muted}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
  filter-selected:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
  project-row:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.ink}"
    padding: "36px 32px"
---

# Design System: Sahil Kumar Portfolio

## Overview

**Creative North Star: "Neon Horizon"**

You build on a cinematic landscape that moves between neon night and luminous dawn. Original generated sun and horizon imagery supplies the atmosphere; large, tightly spaced type gives the portfolio its identity. Plum and rose surfaces keep project evidence readable below the landscape.

This scan records the active main portfolio implementation in `src/App.js`, `src/styles/tokens.css`, `src/styles/globals.css`, and their imported components. The brand direction comes from `PRODUCT.md`. Trading Lab and Journal are outside this system's scope. Legacy components that the main portfolio does not import are not normative examples.

**Key Characteristics:**

- Theme-specific original landscapes with a matching surface palette.
- One self-hosted type family and a monumental name.
- Flat rectangular rows, restrained controls, and generous section spacing.
- Native keyboard interaction and a reduced-motion alternative.

## Colors

The palette pairs rose-magenta action colors with plum-tinted neutrals. Frontmatter records dawn values without a prefix and night overrides with `night-`; use the corresponding semantic CSS custom properties in implementation so theme changes remain automatic.

### Primary

Use **rose magenta** (`accent`) for primary actions, selected emphasis, and link hover. Use **luminous pink** (`night-accent`) in dark mode. The matching `on-accent` tokens provide button text.

### Neutral

Use `paper` for the page and `paper-2` for project rows and alternate sections. Invert their assignment for nested experience panels. Use `ink` for primary text, `muted` for secondary text, `field` for form interiors, and `rule` for field borders. The hero uses ordinary ink in dawn and `night-hero-ink` at night. The footer explicitly uses the current theme ink on the alternate surface.

### Interaction

Use teal `focus` in dawn and cyan `night-focus` at night for the keyboard outline. Selection uses its own theme token. Error tokens exist in the source but the current form uses browser-native validation; there is no custom error component to reproduce.

**The Paired Theme Rule.** Change the landscape, page surfaces, text, field colors, and focus treatment together. Do not hard-code dawn colors into reusable components.

## Typography

Use self-hosted **Manrope**, with a sans-serif fallback, for display and body text. The variable font is served from `public/fonts/manrope-latin.woff2`, supports weights 200–800, and uses swap loading.

The frontmatter defines the observed hierarchy. Display type belongs to the hero name. Headlines identify sections; titles identify projects. Body text inherits the comfortable global line height. Labels remain mixed case. Section descriptions use muted text and a maximum width of 60 characters.

At widths up to 1000px, the hero display becomes 12.6vw. At widths up to 700px, it wraps within 7ch, uses `clamp(70px, 19vw, 120px)`, and tightens line height to 0.92. The footer repeats the name with its own responsive sizing. Do not apply the desktop no-wrap hero rule to mobile headings.

## Layout

Use a centered frame with a maximum width of 1400px and the fluid gutter token. Section padding follows the fluid section token. Two-column section headings introduce dense content without boxing every paragraph.

Project rows use three columns: title, description, and destinations. At 1000px or below they become two columns, with links beneath the description. At 700px or below they become one column with padding of 28px 24px. About and contact layouts also collapse to one column at 700px. Skills move from four columns to three at 1000px and two at 700px.

The header sits absolutely over the hero. Desktop navigation is 92px tall; mobile navigation is 76px tall. The mobile menu opens as a full-width surface below the header. It is an expandable navigation region, not a modal.

The desktop hero uses `min(900px, 100svh)` with a 700px minimum. Mobile uses 94svh, a 740px minimum, and an 860px maximum. Preserve enough height for the name, introduction, action, and social destinations.

## Elevation & Depth

The active portfolio uses tonal layering rather than box shadows. Alternate surfaces distinguish project rows and expandable experience panels. A bottom landscape scrim blends the hero into the page; it is not a translucent content card.

Depth comes from the landscape and subtle movement: buttons lift on hover, project rows move sideways on desktop, and the landscape slowly scales. The shared state transition is 200ms with `cubic-bezier(0.2, 0.7, 0.2, 1)`. Entry animation lasts 700ms; landscape drift lasts 28s and peaks at scale 1.035. With reduced motion, animations and transitions are disabled and scrolling becomes immediate. CSS hover transforms remain direct state changes.

**The Flat Surface Rule.** Use the established surface contrast for hierarchy; do not add shadows to ordinary rows or panels.

## Shapes

Controls have almost square corners, using the shared control radius. Project and experience surfaces have square edges. The wordmark's small circular sun is the deliberate curved exception. Fields have a single rule-colored border; project rows do not need decorative borders or badges.

## Components

### Buttons

Primary buttons use accent fill, matching on-accent text, the button typography role, and a minimum height of 50px. Hover lifts them 3px and sets opacity to 0.9; active moves them down 1px. Keyboard focus uses the shared 3px focus outline with a 5px offset. Focus disables transition.

### Category controls

Project filters and career categories are ordinary buttons with `aria-pressed`, not ARIA tabs. Their selected background uses the alternate surface; inside the alternate About surface, selection uses the page surface. Hover changes text to accent. They wrap onto new lines and remain reachable with Tab and activatable with Enter or Space.

### Project rows

Use flat alternate surfaces and the responsive grid described above. Project categories use accent text, descriptions use ink, and the plain technology list uses muted text. Technology names are text lists, not interactive pill chips. Link destinations remain underlined text with small icons. Desktop hover translates the row 4px; mobile removes that translation.

### Experience disclosure

Use native `details` and `summary` elements. Summary padding is 28px on desktop and 24px on mobile. Dates use muted text and grades use accent. Opening rotates the plus indicator by 45 degrees. Keep the browser's native keyboard activation behavior.

### Inputs / Fields

Scope field rules to the contact form. Labels remain visible above each field; placeholders supplement them. Fields use the field surface, rule border, ink text, accent caret, and shared radius. Single-line inputs use the field dimensions in frontmatter. Inputs and textareas use line height 1.5; textareas retain 16px padding and resize vertically. Native required-field and email validation handle errors; no custom error or disabled state is implemented.

The contact action says **Compose email**. It opens an email draft, and its live status gives conditional instructions because the site cannot confirm that an email app opened or that a message was sent.

### Navigation and theme

Use plain text navigation, a compact sun wordmark, and a theme button with visible text and an accessible name describing the destination mode. Mobile menu state is exposed through `aria-expanded` and `aria-controls`; Escape and section links close it. Preserve the skip link and visible keyboard outlines.

Theme initialization respects a saved `theme` value of `light` or `dark`; otherwise it follows the operating system. System changes continue to apply while no explicit choice is saved. Toggling saves the new preference when storage is available.

### Horizon imagery

Use the original generated `public/images/horizon-light.webp` and `horizon-dark.webp` assets. The hero image is decorative, has empty alternative text, and loads with high priority. The horizon reappears after Skills as a cropped strip. Use theme-matched imagery rather than shipping the watermarked references.

## Do's and Don'ts

- **Do** extend the active semantic CSS tokens when adding matching main-portfolio components.
- **Do** preserve keyboard activation, visible focus, theme persistence, and reduced-motion behavior.
- **Do** pair the night and dawn landscape with its matching palette.
- **Do** keep readable text surfaces below the atmospheric hero.
- **Don't** ship watermarked reference images.
- **Don't** introduce unverified metrics or testimonials as visual filler.
- **Don't** describe email composition as a completed message delivery.
- **Don't** copy unused legacy component styles into the current visual system.

This is a source-derived design record, not a browser-test or accessibility certification. Browser review results belong in the implementation handoff.

