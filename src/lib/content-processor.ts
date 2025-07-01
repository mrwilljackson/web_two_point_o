/**
 * Content processor for handling UI element placeholders in markdown
 */

import type { BlogPost } from './content';

export interface ProcessedContent {
  html: string;
  components: {
    keyInsights: Array<{ id: string; icon?: string; title?: string; content: string }>;
    statsCards: Array<{ id: string; stats: Array<{ value: string; label: string; color?: string }> }>;
    quotes: Array<{ id: string; author: string; title?: string; content: string }>;
    callouts: Array<{ id: string; type?: string; title?: string; content: string }>;
    references: Array<{ id: string; content: string }>;
  };
}

/**
 * Process markdown content and extract UI component data
 */
export function processContent(post: BlogPost): ProcessedContent {
  const data = post.data;

  // Extract UI components from frontmatter
  const components = {
    keyInsights: data.keyInsights || [],
    statsCards: data.statsCards || [],
    quotes: data.quotes || [],
    callouts: data.callouts || [],
    references: data.references || [],
  };

  return {
    html: '', // We'll handle this differently
    components
  };
}

/**
 * Find a component by ID
 */
export function findComponentById<T extends { id: string }>(components: T[], id: string): T | undefined {
  return components.find(component => component.id === id);
}
