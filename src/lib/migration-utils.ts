/**
 * Migration utilities for converting WordPress content to FrontMatter markdown
 */

import fs from 'fs';
import path from 'path';

// WordPress post structure from our audit
interface WordPressPost {
  id: number;
  title: string;
  slug: string;
  date: string;
  status: string;
  sticky: boolean;
  categories: Array<{ name: string; slug: string }>;
  tags: Array<{ name: string; slug: string }>;
  featuredImage?: {
    url: string;
    alt: string;
    caption?: string;
  };
  wordCount: number;
  imageCount: number;
  shortcodes: {
    key_insight: number;
    stats_cards: number;
    stat: number;
    quote: number;
    callout: number;
    highlight: number;
    references: number;
  };
  hasShortcodes: boolean;
  content: string;
  excerpt: string;
}

/**
 * Convert WordPress shortcodes to Astro components
 */
export function convertShortcodesToComponents(content: string): string {
  let processedContent = content;

  // Convert [key_insight] shortcodes
  processedContent = processedContent.replace(
    /\[key_insight(?:\s+icon="([^"]*)")?(?:\s+title="([^"]*)")?\](.*?)\[\/key_insight\]/gs,
    (match, icon, title, content) => {
      const iconAttr = icon ? ` icon="${icon}"` : '';
      const titleAttr = title ? ` title="${title}"` : '';
      return `<KeyInsight${iconAttr}${titleAttr}>\n${content.trim()}\n</KeyInsight>`;
    }
  );

  // Convert [stats_cards] and [stat] shortcodes
  processedContent = processedContent.replace(
    /\[stats_cards\](.*?)\[\/stats_cards\]/gs,
    (match, content) => {
      // Convert individual [stat] shortcodes within
      const statsContent = content.replace(
        /\[stat\s+value="([^"]*)"(?:\s+label="([^"]*)")?(?:\s+color="([^"]*)")?\]/g,
        (statMatch: string, value: string, label: string, color: string) => {
          const colorAttr = color ? ` color="${color}"` : '';
          return `  <Stat value="${value}" label="${label || ''}"${colorAttr} />`;
        }
      );
      return `<StatsCards>\n${statsContent}\n</StatsCards>`;
    }
  );

  // Convert [quote] shortcodes
  processedContent = processedContent.replace(
    /\[quote\s+author="([^"]*)"(?:\s+title="([^"]*)")?\](.*?)\[\/quote\]/gs,
    (match, author, title, content) => {
      const titleAttr = title ? ` title="${title}"` : '';
      return `<Quote author="${author}"${titleAttr}>\n${content.trim()}\n</Quote>`;
    }
  );

  // Convert [callout] shortcodes
  processedContent = processedContent.replace(
    /\[callout(?:\s+type="([^"]*)")?(?:\s+title="([^"]*)")?\](.*?)\[\/callout\]/gs,
    (match, type, title, content) => {
      const typeAttr = type ? ` type="${type}"` : '';
      const titleAttr = title ? ` title="${title}"` : '';
      return `<Callout${typeAttr}${titleAttr}>\n${content.trim()}\n</Callout>`;
    }
  );

  // Convert [highlight] shortcodes
  processedContent = processedContent.replace(
    /\[highlight(?:\s+color="([^"]*)")?\](.*?)\[\/highlight\]/gs,
    (match, color, content) => {
      const colorAttr = color ? ` color="${color}"` : '';
      return `<Highlight${colorAttr}>${content.trim()}</Highlight>`;
    }
  );

  // Convert [references] shortcodes
  processedContent = processedContent.replace(
    /\[references\](.*?)\[\/references\]/gs,
    (match, content) => {
      return `<References>\n${content.trim()}\n</References>`;
    }
  );

  return processedContent;
}

/**
 * Clean WordPress HTML and convert to markdown-friendly format
 */
export function cleanWordPressContent(content: string): string {
  let cleaned = content;

  // Remove WordPress-specific CSS classes
  cleaned = cleaned.replace(/class="[^"]*wp-[^"]*"/g, '');
  cleaned = cleaned.replace(/class="[^"]*alignleft[^"]*"/g, '');
  cleaned = cleaned.replace(/class="[^"]*alignright[^"]*"/g, '');
  cleaned = cleaned.replace(/class="[^"]*aligncenter[^"]*"/g, '');

  // Clean up empty class attributes
  cleaned = cleaned.replace(/class=""\s*/g, '');

  // Convert WordPress image captions
  cleaned = cleaned.replace(
    /\[caption[^\]]*\](.*?)<img([^>]*)>(.*?)\[\/caption\]/gs,
    (match, before, imgAttrs, after) => {
      return `<img${imgAttrs}>\n${after.trim()}`;
    }
  );

  // Remove WordPress gallery shortcodes (we'll handle these manually)
  cleaned = cleaned.replace(/\[gallery[^\]]*\]/g, '<!-- Gallery removed - add manually -->');

  // Clean up extra whitespace
  cleaned = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n');

  return cleaned.trim();
}

/**
 * Generate frontmatter for a WordPress post
 */
export function generateFrontmatter(post: WordPressPost): string {
  const frontmatter = [
    '---',
    `title: "${post.title.replace(/"/g, '\\"')}"`,
    `slug: "${post.slug}"`,
    `date: ${new Date(post.date).toISOString().split('T')[0]}`,
    `status: "published"`,
    '',
    `excerpt: "${post.excerpt.replace(/"/g, '\\"')}"`,
    `wordCount: ${post.wordCount}`,
    '',
    `categories: [${post.categories.map(cat => `"${cat.slug}"`).join(', ')}]`,
    `tags: [${post.tags.map(tag => `"${tag.slug}"`).join(', ')}]`,
    '',
    `author: "will-jackson"`,
    ''
  ];

  // Add featured image if present
  if (post.featuredImage) {
    frontmatter.push(
      'featuredImage:',
      `  src: "${post.featuredImage.url}"`,
      `  alt: "${post.featuredImage.alt.replace(/"/g, '\\"')}"`,
      post.featuredImage.caption ? `  caption: "${post.featuredImage.caption.replace(/"/g, '\\"')}"` : '',
      ''
    );
  }

  // Add special flags
  frontmatter.push(
    `featured: ${post.sticky}`,
    `hasShortcodes: ${post.hasShortcodes}`,
    '---',
    ''
  );

  return frontmatter.filter(line => line !== '').join('\n');
}

/**
 * Convert a WordPress post to markdown file
 */
export function convertPostToMarkdown(post: WordPressPost): string {
  const frontmatter = generateFrontmatter(post);
  const cleanedContent = cleanWordPressContent(post.content);
  const convertedContent = convertShortcodesToComponents(cleanedContent);

  return `${frontmatter}\n${convertedContent}`;
}

/**
 * Generate filename for a post based on date and slug
 */
export function generatePostFilename(post: WordPressPost): string {
  const date = new Date(post.date);
  const year = date.getFullYear();
  return `${year}/${post.slug}.md`;
}

/**
 * Save a converted post to the content directory
 */
export function savePostToFile(post: WordPressPost, contentDir: string = 'src/content/blog'): void {
  const markdown = convertPostToMarkdown(post);
  const filename = generatePostFilename(post);
  const fullPath = path.join(contentDir, filename);
  
  // Ensure directory exists
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(fullPath, markdown, 'utf8');
  console.log(`✅ Saved: ${filename}`);
}

/**
 * Batch convert WordPress posts from audit JSON
 */
export function convertWordPressAudit(auditFilePath: string, contentDir: string = 'src/content/blog'): void {
  const auditData = JSON.parse(fs.readFileSync(auditFilePath, 'utf8'));
  const posts = auditData.posts as WordPressPost[];
  
  console.log(`🔄 Converting ${posts.length} WordPress posts to markdown...`);
  
  posts.forEach((post, index) => {
    try {
      savePostToFile(post, contentDir);
      console.log(`✅ ${index + 1}/${posts.length}: ${post.title}`);
    } catch (error) {
      console.error(`❌ Failed to convert ${post.title}:`, error);
    }
  });
  
  console.log(`🎉 Conversion complete! ${posts.length} posts converted.`);
}
