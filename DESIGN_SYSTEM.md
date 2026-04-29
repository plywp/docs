# PlyWP Design System

## Quick Reference Guide

### Color Palette

#### Primary Colors
- **Background**: `oklch(0.08 0 0)` - Deep charcoal
- **Foreground**: `oklch(0.95 0 0)` - Bright white
- **Card**: `oklch(0.12 0 0)` - Slightly lighter background
- **Accent**: `oklch(0.5 0.15 263)` - Vibrant blue

#### Secondary Colors
- **Border**: `oklch(0.2 0 0)` - Subtle divider
- **Muted Foreground**: `oklch(0.65 0 0)` - Secondary text
- **Input**: `oklch(0.15 0 0)` - Form backgrounds

### Typography Scale

| Element | Size | Weight | Usage |
|---------|------|--------|-------|
| H1 | 5xl-7xl | Bold | Page titles |
| H2 | 3xl-5xl | Bold | Section titles |
| H3 | 2xl | Bold | Subsection titles |
| H4 | lg | Bold | Minor headings |
| Body | base | Regular | Paragraph text |
| Small | sm | Regular | Secondary text |
| Code | sm | Mono | Code blocks |

### Spacing System

All spacing uses Tailwind's standard scale (4px base unit):

| Class | Value | Usage |
|-------|-------|-------|
| p-4 | 1rem | Standard padding |
| p-6 | 1.5rem | Increased padding |
| p-8 | 2rem | Large padding (cards) |
| gap-4 | 1rem | Standard gap |
| gap-8 | 2rem | Large gap (sections) |
| gap-12 | 3rem | Extra large gap |

### Responsive Breakpoints

```css
/* Mobile first */
/* Base styles apply to all screens */

/* Tablet and up */
@media (min-width: 768px) { /* md: */ }

/* Desktop and up */
@media (min-width: 1024px) { /* lg: */ }
```

### Component Patterns

#### Hero Section
```tsx
<section className="py-32 md:py-48 border-b border-border bg-gradient-to-b from-background to-card/20">
  <div className="container max-w-5xl">
    <div className="ml-0 md:ml-8 lg:ml-12">
      {/* Content */}
    </div>
  </div>
</section>
```

#### Feature Card
```tsx
<Card className="border border-border bg-card/50 hover:bg-card hover:border-accent/50 transition-all duration-300 p-8">
  <div className="w-14 h-14 bg-accent/15 rounded-xl flex items-center justify-center mb-6">
    <Icon className="w-7 h-7 text-accent" />
  </div>
  <h3 className="text-2xl font-bold mb-4">Title</h3>
  <p className="text-foreground/70 leading-relaxed mb-6">Description</p>
</Card>
```

#### Button Styles
```tsx
/* Primary CTA */
<Button className="bg-accent hover:bg-accent/90 text-white gap-2 px-8">
  Action <Icon className="w-5 h-5" />
</Button>

/* Secondary */
<Button variant="outline" className="px-8">
  Learn More
</Button>
```

#### Code Block
```tsx
<div className="rounded-xl border border-border/50 overflow-hidden bg-card/40 backdrop-blur-sm my-6">
  <div className="px-6 py-3 bg-background/50 border-b border-border/50">
    filename.ext
  </div>
  <pre className="p-6">
    <code>{code}</code>
  </pre>
</div>
```

### Left Margin Guidelines

For proper visual balance, apply left margins to:
- Hero section content: `ml-0 md:ml-8 lg:ml-12`
- Section titles: `ml-0 md:ml-8 lg:ml-12`
- Main content containers: `ml-0 md:ml-8`
- Sidebar on docs: Fixed 256px (w-64)

### Accessibility Checklist

- [ ] Color contrast ratio ≥ 4.5:1 for text
- [ ] Interactive elements have proper hover states
- [ ] Links are underlined or have color distinction
- [ ] Headings follow proper hierarchy (h1 → h2 → h3)
- [ ] Images have alt text
- [ ] Form labels are associated with inputs
- [ ] Focus states are visible on all interactive elements
- [ ] Content is readable at 200% zoom

### Animation Guidelines

- Use `transition-all duration-300` for hover effects
- Use `transition-colors` for color-only changes
- Prefer GPU-accelerated properties (transform, opacity)
- Avoid animations on page load (reduce motion preference)

### Mobile-First Development

1. Design for mobile first (320px)
2. Add `md:` prefixes for tablet improvements (768px)
3. Add `lg:` prefixes for desktop enhancements (1024px)
4. Test at common breakpoints:
   - 375px (iPhone SE)
   - 768px (iPad)
   - 1024px (iPad Pro)
   - 1440px (Desktop)

### Common Utility Classes

```css
/* Spacing */
.container { @apply px-4 md:px-6; }
.prose p { @apply mb-5 leading-relaxed; }

/* Visual Effects */
.backdrop-blur { backdrop-filter: blur(12px); }
.bg-card/50 { background-color: rgba(var(--card), 0.5); }

/* Text */
.text-pretty { text-wrap: pretty; }
.text-balance { text-wrap: balance; }

/* Interactive */
.transition-all { transition: all 300ms ease; }
.hover:opacity-80 { opacity: 0.8 on :hover }
```

### Dark Theme (Default)

The site uses a dark theme by default. The theme is applied via:

```html
<html className="bg-background dark">
```

CSS variables in `:root` and `.dark` class define all colors.

### Layout Constants

- **Sidebar Width**: 256px (w-64)
- **Max Container Width**: max-w-6xl (1152px)
- **Content Max Width**: max-w-4xl (896px)
- **Standard Section Padding**: py-32 md:py-48
- **Standard Gap**: gap-8 for grid items

### Text Opacity Levels

- **Primary**: Full opacity (text-foreground)
- **Secondary**: 70% opacity (text-foreground/70)
- **Tertiary**: 50% opacity (text-foreground/50)
- **Muted**: Custom muted-foreground color

---

**Use this guide when**:
- Creating new pages or components
- Making design updates
- Ensuring consistency across the site
- Onboarding new developers
