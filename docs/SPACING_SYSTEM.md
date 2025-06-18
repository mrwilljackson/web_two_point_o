# Homepage Spacing System

## Overview
This document defines the systematic spacing approach for all homepage sections to ensure visual consistency and maintainability.

## Spacing Classes

### Section Header Container
```css
.section-header
```
- **Purpose**: Consistent spacing for all section headers
- **Spacing**: `text-center mb-16` (64px bottom margin)
- **Usage**: Wrap the entire header area (badge + title + description)

### Section Badge
```css
.section-badge
```
- **Purpose**: Consistent styling and spacing for section badges
- **Styling**: Purple gradient background, rounded pill shape
- **Spacing**: `mb-6` (24px bottom margin to title)
- **Usage**: Replace individual badge styling

### Section Title
```css
.section-title
```
- **Purpose**: Consistent title styling and spacing
- **Typography**: `text-4xl md:text-5xl font-black text-slate-800`
- **Spacing**: `mb-6` (24px bottom margin to description)
- **Usage**: Main section headings

### Section Description
```css
.section-description
```
- **Purpose**: Consistent description styling
- **Typography**: `text-xl text-slate-600`
- **Layout**: `max-w-3xl mx-auto` (centered, max width)
- **Usage**: Section description paragraphs

### Content Section
```css
.content-section
```
- **Purpose**: Spacing between major content blocks
- **Spacing**: `mb-20` (80px bottom margin)
- **Usage**: Major content sections within a page section

### Card Grid
```css
.card-grid
```
- **Purpose**: Consistent grid and spacing for card layouts
- **Layout**: `grid gap-8` (32px gap between cards)
- **Spacing**: `mb-16` (64px bottom margin)
- **Usage**: Replace `grid gap-8 mb-16` patterns

### Subsection
```css
.subsection
```
- **Purpose**: Spacing for content within sections
- **Spacing**: `mb-12` (48px bottom margin)
- **Usage**: Smaller content blocks within major sections

## Implementation Examples

### Before (Inconsistent)
```jsx
<div className="text-center mb-16">
  <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
    🎮 HOW IT WORKS
  </div>
  <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6">
    Section Title
  </h2>
  <p className="text-xl text-slate-600 max-w-3xl mx-auto">
    Description text
  </p>
</div>
```

### After (Systematic)
```jsx
<div className="section-header">
  <div className="section-badge">
    🎮 HOW IT WORKS
  </div>
  <h2 className="section-title">
    Section Title
  </h2>
  <p className="section-description">
    Description text
  </p>
</div>
```

## Spacing Scale

| Class | Tailwind | Pixels | Usage |
|-------|----------|--------|-------|
| `mb-4` | 1rem | 16px | Small gaps |
| `mb-6` | 1.5rem | 24px | Badge to title, title to description |
| `mb-8` | 2rem | 32px | Medium gaps |
| `mb-12` | 3rem | 48px | Subsections |
| `mb-16` | 4rem | 64px | Section headers, card grids |
| `mb-20` | 5rem | 80px | Major content sections |

## Components Updated

✅ **HowItWorks.tsx** - Section header, content sections, card grid
✅ **Testimonials.tsx** - Section header, card grid  
✅ **FoundersJourney.tsx** - Section header
✅ **CTASection.tsx** - Section header, card grid
✅ **BenefitsSection.tsx** - Section header

## Benefits

1. **Consistency**: All sections follow the same spacing pattern
2. **Maintainability**: Easy to update spacing globally
3. **Readability**: Clear semantic class names
4. **Flexibility**: Can override individual cases when needed
5. **Performance**: Tailwind optimizes repeated patterns

## Usage Guidelines

1. **Always use** `.section-header` for section headers
2. **Prefer** semantic classes over individual Tailwind classes
3. **Override** only when specific design requirements demand it
4. **Document** any deviations from the system
5. **Test** spacing on mobile and desktop breakpoints

## Future Enhancements

- Add responsive spacing variants
- Create animation-aware spacing classes
- Extend system to blog and other pages
- Add vertical rhythm utilities
