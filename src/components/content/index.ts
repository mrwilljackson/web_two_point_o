// Content components for FrontMatter CMS
// These replace WordPress shortcodes with Astro components

export { default as KeyInsight } from './KeyInsight.astro';
export { default as StatsCards } from './StatsCards.astro';
export { default as Stat } from './Stat.astro';
export { default as Quote } from './Quote.astro';
export { default as Callout } from './Callout.astro';
export { default as Highlight } from './Highlight.astro';
export { default as References } from './References.astro';
export { default as InlineRef } from './InlineRef.astro';

// Usage examples:
/*
// KeyInsight
<KeyInsight icon="💡" title="Important Point">
  Your insight content here
</KeyInsight>

// StatsCards with individual Stats
<StatsCards>
  <Stat value="94%" label="Therapy Adherence Rate" color="cyan" />
  <Stat value="67%" label="Improvement in Lung Function" color="emerald" />
  <Stat value="89%" label="Families Found Therapy Enjoyable" color="purple" />
</StatsCards>

// Quote
<Quote author="Dr. Michael Rodriguez" title="Children's Hospital of Philadelphia">
  PlayPhysio has transformed our approach to pediatric respiratory therapy.
</Quote>

// Callout
<Callout type="info" title="Important Note">
  Your callout content here
</Callout>

// Highlight
<Highlight color="yellow">Important highlighted text</Highlight>

// References
<References>
  1. Smith, J. et al. (2023). "Gamification in Healthcare"
  2. Johnson, A. (2022). "Pediatric Respiratory Therapy"
</References>
*/
