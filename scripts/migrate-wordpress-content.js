/**
 * Migration script to convert WordPress content to FrontMatter markdown
 * Run this after generating the WordPress audit JSON
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const auditFilePath = path.join(__dirname, '..', 'wordpress-content-audit.json');
const contentDir = path.join(__dirname, '..', 'src', 'content', 'blog');

/**
 * Decode HTML entities
 */
function decodeHtmlEntities(text) {
  const entities = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#8217;': "'",
    '&#8221;': '"',
    '&#8220;': '"',
    '&#8211;': '–',
    '&#8212;': '—',
    '&hellip;': '...',
    '&nbsp;': ' '
  };

  return text.replace(/&[#\w]+;/g, (entity) => entities[entity] || entity);
}

/**
 * Convert WordPress shortcodes to Astro components
 */
function convertShortcodesToComponents(content) {
  let processedContent = content;

  // First decode HTML entities
  processedContent = decodeHtmlEntities(processedContent);

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
        /\[stat\s+value=["']([^"']*)["'](?:\s+label=["']([^"']*)["'])?(?:\s+color=["']([^"']*)["'])?\]/g,
        (statMatch, value, label, color) => {
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
function cleanWordPressContent(content) {
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
function generateFrontmatter(post) {
  // Clean and generate excerpt
  let excerpt = post.excerpt || `${post.title} - Read more about this topic on PlayPhysio.`;

  // Remove HTML tags and decode entities from excerpt
  excerpt = excerpt.replace(/<[^>]*>/g, '').trim();
  excerpt = decodeHtmlEntities(excerpt);

  // Limit excerpt length
  if (excerpt.length > 160) {
    excerpt = excerpt.substring(0, 160).trim() + '...';
  }

  const frontmatter = [
    '---',
    `title: "${post.title.replace(/"/g, '\\"')}"`,
    `date: ${new Date(post.date).toISOString().split('T')[0]}`,
    `status: "published"`,
    '',
    `excerpt: "${excerpt.replace(/"/g, '\\"')}"`,
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
function convertPostToMarkdown(post) {
  const frontmatter = generateFrontmatter(post);

  // Use placeholder content if no content available
  const content = post.content || `# ${post.title}\n\nThis post was migrated from WordPress. Content needs to be added manually.`;
  const cleanedContent = cleanWordPressContent(content);
  const convertedContent = convertShortcodesToComponents(cleanedContent);

  return `${frontmatter}\n${convertedContent}`;
}

/**
 * Generate filename for a post based on date and slug
 */
function generatePostFilename(post) {
  const date = new Date(post.date);
  const year = date.getFullYear();
  return `${year}/${post.slug}.md`;
}

/**
 * Save a converted post to the content directory
 */
function savePostToFile(post, contentDir) {
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
function convertWordPressAudit(auditFilePath, contentDir) {
  const auditData = JSON.parse(fs.readFileSync(auditFilePath, 'utf8'));
  const posts = auditData.posts;

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

// Main execution
console.log('🚀 Starting WordPress to FrontMatter migration...\n');

console.log('📁 Paths:');
console.log(`  Audit file: ${auditFilePath}`);
console.log(`  Content dir: ${contentDir}\n`);

try {
  // Run the conversion
  convertWordPressAudit(auditFilePath, contentDir);

  console.log('\n✅ Migration completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Review the generated markdown files in src/content/blog/');
  console.log('2. Check that shortcodes were converted correctly');
  console.log('3. Verify image paths and update if needed');
  console.log('4. Test the new content system with: npm run dev');
  console.log('5. Update Astro pages to use the new content API');

} catch (error) {
  console.error('❌ Migration failed:', error.message);
  console.error('\n🔧 Troubleshooting:');
  console.error('1. Make sure wordpress-content-audit.json exists');
  console.error('2. Run: node scripts/audit-wordpress-content.js');
  console.error('3. Check that WordPress is running at http://astro-wp.local');
}
