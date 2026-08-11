---
name: Organic Elegance
colors:
  surface: '#fdf7ff'
  surface-dim: '#ded8e0'
  surface-bright: '#fdf7ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f2fa'
  surface-container: '#f2ecf4'
  surface-container-high: '#ece6ee'
  surface-container-highest: '#e6e0e9'
  on-surface: '#1d1b20'
  on-surface-variant: '#494551'
  inverse-surface: '#322f35'
  inverse-on-surface: '#f5eff7'
  outline: '#7a7582'
  outline-variant: '#cbc4d2'
  surface-tint: '#6750a4'
  primary: '#4f378a'
  on-primary: '#ffffff'
  primary-container: '#6750a4'
  on-primary-container: '#e0d2ff'
  inverse-primary: '#cfbcff'
  secondary: '#63597c'
  on-secondary: '#ffffff'
  secondary-container: '#e1d4fd'
  on-secondary-container: '#645a7d'
  tertiary: '#765b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#c9a74d'
  on-tertiary-container: '#503d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#cfbcff'
  on-primary-fixed: '#22005d'
  on-primary-fixed-variant: '#4f378a'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#cdc0e9'
  on-secondary-fixed: '#1f1635'
  on-secondary-fixed-variant: '#4b4263'
  tertiary-fixed: '#ffdf93'
  tertiary-fixed-dim: '#e7c365'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#594400'
  background: '#fdf7ff'
  on-background: '#1d1b20'
  surface-variant: '#e6e0e9'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 80px
  max-width: 1280px
---

## Brand & Style

This design system evokes a sense of "Organic Elegance"—a sophisticated blend of editorial refinement and natural warmth. It is designed for luxury lifestyle, boutique hospitality, or high-end editorial platforms that require a romantic yet grounded atmosphere. 

The aesthetic is heavily influenced by **Minimalism** and **Modern** sensibilities, utilizing expansive whitespace (reimagined here as "warm space") and high-contrast typography. The transition from sterile whites to a palette of "mashed potatoes" and deep botanical tones creates a rich, sensory experience that feels both historic and contemporary. The goal is to evoke an emotional response of calm, intimacy, and timelessness.

## Colors

The palette moves away from standard neutrals toward a "culinary-botanical" spectrum. 
- **Primary Surface:** "Mashed Potatoes" (#FFF2E6) serves as the canvas, providing a warm, creamy alternative to white that softens the digital glow.
- **Natural Accents:** "Artichoke" (#586357) is used for secondary UI elements and borders, while "Green Bean" (#052102) provides a grounded, almost-black tone for primary text and high-contrast labels.
- **Romantic Contrasts:** A trio of reds—"Cranberry" (#734141), "Cabernet" (#3D0000), and "Mulled Wine" (#280D08)—are reserved for interactive elements, call-to-actions, and deep-layered backgrounds. These colors provide the "heartbeat" of the design, introducing depth and a sense of luxury.

## Typography

The typographic hierarchy is built on the contrast between the classic, high-contrast serifs of **Playfair Display** and the clean, functional proportions of **Manrope**.

Playfair Display is used for all headlines and display text to convey the editorial narrative. Large-scale headings should utilize tighter letter-spacing and substantial line heights to feel airy. Manrope serves as the workhorse for body copy and UI labels, ensuring legibility against the creamy "Mashed Potato" backgrounds. Labels should frequently employ uppercase styling with increased tracking to maintain a sophisticated, curated feel.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop to preserve the intentional whitespace characteristic of editorial design. 
- **Desktop:** A 12-column grid with generous 80px side margins and 24px gutters. Content is often center-aligned or offset to create visual interest.
- **Mobile:** A 4-column fluid grid with 20px margins. 
- **Rhythm:** Spacing follows an 8px base unit. To maintain the "airy" feel, prioritize large vertical paddings between sections (using 80px, 120px, or 160px increments) to allow imagery and typography to breathe.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Low-Contrast Outlines** rather than aggressive shadows. 
- **Surfaces:** Use subtle shifts between the primary background and slightly darker tints of "Artichoke" at 5-10% opacity for container backgrounds.
- **Borders:** Instead of shadows, use 1px solid borders in "Artichoke" or "Cranberry" at low opacity (20%) to define cards and sections.
- **Deep Elevation:** For modals or floating menus, use a very soft, diffused shadow tinted with "Mulled Wine" to suggest a physical presence without breaking the organic aesthetic.

## Shapes

The shape language is **Soft (1)**. This subtle rounding (0.25rem - 0.75rem) bridges the gap between the sharpness of high-end editorial layouts and the organic nature of the color palette. Buttons and input fields use the base 0.25rem radius, while larger cards and image containers may use `rounded-lg` (0.5rem) to feel more approachable and modern.

## Components

- **Buttons:** Primary buttons use a "Cabernet" fill with "Mashed Potato" text. Secondary buttons use an "Artichoke" outline with "Green Bean" text. All buttons should have generous horizontal padding.
- **Inputs:** Fields are defined by a bottom border only (1px solid "Artichoke") to mimic stationery. Labels float above in small-caps Manrope.
- **Cards:** Cards should have no background fill (transparent) with a thin "Artichoke" border, or a solid "Mashed Potato" fill on top of a slightly darker section background.
- **Chips:** Small, pill-shaped tags using "Cranberry" at 10% opacity with "Cranberry" text for a soft, tonal look.
- **Lists:** Separated by thin, horizontal lines in "Artichoke" at 20% opacity. Icons within lists should be "Artichoke" or "Green Bean."
- **Imagery:** Photos should have a slight warm filter applied to harmonize with the "Mashed Potato" surface. Use "rounded-lg" for all featured imagery.