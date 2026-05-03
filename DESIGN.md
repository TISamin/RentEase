# Design Brief

## Direction

RentEase — a light, editorial property rental marketplace that prioritizes clarity, trust, and human-centered discovery over corporate polish.

## Tone

Refined minimalism with airy warmth. Content-driven interface inspired by editorial design, avoiding the cold corporate real estate aesthetic while rejecting casual informality.

## Differentiation

Listing cards as editorial focal points with prominent images, semantic color coding for listing categories (terracotta for host actions, teal for browse/rent), and deliberate surface elevation through structural zones rather than decoration.

## Color Palette

| Token           | OKLCH        | Role                                      |
| --------------- | ------------ | ----------------------------------------- |
| background      | 0.98 0.008 230 | Cool off-white light mode canvas         |
| foreground      | 0.18 0.015 230 | Dark cool text and labels                |
| card            | 1.0 0.004 230  | Listing cards, content surfaces          |
| primary         | 0.45 0.12 30   | Host actions, CTAs (warm terracotta)    |
| accent          | 0.6 0.15 170   | Browse/rent actions (teal secondary)    |
| muted           | 0.94 0.01 230  | Section dividers, disabled states        |
| destructive     | 0.55 0.22 25   | Delete, error states                     |

## Typography

- Display: Space Grotesk — geometric, confident, tech-forward headlines and labels
- Body: Figtree — warm, modern, highly readable paragraphs and UI text
- Scale: Hero `text-5xl md:text-6xl font-bold tracking-tight`, h2 `text-3xl md:text-4xl font-semibold`, labels `text-sm font-semibold tracking-widest`, body `text-base leading-relaxed`

## Elevation & Depth

Card-based grid with subtle shadows (`shadow-sm`). Header and footer elevated via 1px border-bottom/top with light secondary background. Alternating section backgrounds (`bg-secondary/20`) create depth through restraint, not decoration.

## Structural Zones

| Zone            | Background              | Border                        | Notes                                      |
| --------------- | ----------------------- | ----------------------------- | ------------------------------------------ |
| Header/Nav      | `bg-card` + border-b    | `border-border`               | Sticky, subtle elevation, logo + auth     |
| Hero/Search     | `bg-background`         | —                             | Search bar, category filter               |
| Content Grid    | `bg-background`         | —                             | Listing cards in responsive grid          |
| Section Divider | `bg-secondary/20`       | `border-b border-border`      | Optional visual breathing room            |
| Footer          | `bg-secondary/10`       | `border-t border-border`      | Links, copyright, contact                 |

## Spacing & Rhythm

Spacious layout (gaps 6–8 between card columns). Section padding `py-12 md:py-16` creates breathing room. Micro-spacing `gap-2` within cards. Category badges and price tags accent-colored for hierarchy.

## Component Patterns

- **Buttons**: Primary (warm terracotta bg, rounded-md) for host post actions; secondary (teal outline) for browse/rent; subtle (muted) for navigation. Hover: slight opacity shift + scale-102.
- **Cards**: Full-bleed image + semantic info grid (name, category badge, location, price). Border-radius `rounded-lg`, box-shadow `shadow-sm`, hover: subtle scale-102 + shadow-md.
- **Category badges**: Colored `bg-primary/10` or `bg-accent/10` with matching text, pill-shaped `rounded-full`, compact sizing.

## Motion

- Entrance: Listing cards fade-in + slide-up on load (stagger 50ms per card)
- Hover: Cards scale to 1.02 with shadow elevation, buttons fade-out underline accent
- Decorative: None — motion serves navigation and state feedback only

## Constraints

- No full-page gradients; depth via layered backgrounds only
- No decoration without functional purpose
- Maintain AA+ contrast in both light/dark modes
- Mobile-first responsive (sm: 1 col, md: 2 cols, lg: 3 cols, xl: 4 cols)
- Listing category tags are semantic color signals (not rainbow)

## Signature Detail

Warm terracotta primary color on a cool off-white background creates trust and human warmth without sacrificing clarity — a deliberate pivot from real estate's blue/corporate cliché.
