import type { WordPressPost, WordPressPage, WordPressMedia } from '../types/wordpress';

/**
 * Process WordPress content to make it suitable for static site generation
 */
export function processWordPressContent(content: string, baseUrl: string): string {
  let processedContent = content;

  // Replace WordPress site URLs with the new site URL
  const wpUrlPattern = new RegExp(baseUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
  processedContent = processedContent.replace(wpUrlPattern, process.env.SITE_URL || '');

  // Process shortcodes (basic implementation)
  processedContent = processShortcodes(processedContent);

  // Clean up WordPress-specific classes and attributes
  processedContent = cleanWordPressClasses(processedContent);

  // Optimize images
  processedContent = optimizeImages(processedContent);

  return processedContent;
}

/**
 * Basic shortcode processing
 */
function processShortcodes(content: string): string {
  let processedContent = content;

  // Process [gallery] shortcode
  processedContent = processedContent.replace(
    /\[gallery[^\]]*\]/g,
    '<div class="gallery"><!-- Gallery shortcode processed --></div>'
  );

  // Process [caption] shortcode
  processedContent = processedContent.replace(
    /\[caption[^\]]*\](.*?)\[\/caption\]/gs,
    '<figure class="wp-caption">$1</figure>'
  );

  // Process [embed] shortcode
  processedContent = processedContent.replace(
    /\[embed[^\]]*\](.*?)\[\/embed\]/gs,
    '<div class="embed-responsive">$1</div>'
  );

  // Remove any remaining shortcodes
  processedContent = processedContent.replace(/\[[^\]]+\]/g, '');

  return processedContent;
}

/**
 * Clean WordPress-specific CSS classes
 */
function cleanWordPressClasses(content: string): string {
  let processedContent = content;

  // Remove WordPress-specific classes but keep useful ones
  const classesToRemove = [
    'wp-block-',
    'has-text-color',
    'has-background',
    'has-link-color',
  ];

  classesToRemove.forEach(className => {
    const regex = new RegExp(`\\b${className}[\\w-]*`, 'g');
    processedContent = processedContent.replace(regex, '');
  });

  // Clean up empty class attributes
  processedContent = processedContent.replace(/class="\s*"/g, '');
  processedContent = processedContent.replace(/class='\\s*'/g, '');

  return processedContent;
}

/**
 * Optimize image references
 */
function optimizeImages(content: string): string {
  let processedContent = content;

  // Add loading="lazy" to images
  processedContent = processedContent.replace(
    /<img(?![^>]*loading=)/g,
    '<img loading="lazy"'
  );

  // Add responsive image classes
  processedContent = processedContent.replace(
    /<img([^>]*)>/g,
    '<img$1 class="responsive-image">'
  );

  return processedContent;
}

/**
 * Extract excerpt from content if not provided
 */
export function extractExcerpt(content: string, maxLength: number = 160): string {
  // Remove HTML tags
  const textContent = content.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities
  const decodedContent = textContent
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");

  // Truncate to maxLength
  if (decodedContent.length <= maxLength) {
    return decodedContent.trim();
  }

  // Find the last complete word within the limit
  const truncated = decodedContent.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex > 0) {
    return truncated.substring(0, lastSpaceIndex).trim() + '...';
  }

  return truncated.trim() + '...';
}

/**
 * Generate SEO-friendly slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Get featured image from post/page
 */
export function getFeaturedImage(item: WordPressPost | WordPressPage): WordPressMedia | null {
  if (item._embedded?.['wp:featuredmedia']?.[0]) {
    return item._embedded['wp:featuredmedia'][0];
  }
  return null;
}

/**
 * Get author information from post/page
 */
export function getAuthor(item: WordPressPost | WordPressPage) {
  if (item._embedded?.author?.[0]) {
    return item._embedded.author[0];
  }
  return null;
}

/**
 * Get categories from post
 */
export function getCategories(post: WordPressPost) {
  if (post._embedded?.['wp:term']?.[0]) {
    return post._embedded['wp:term'][0].filter(term => term.taxonomy === 'category');
  }
  return [];
}

/**
 * Get tags from post
 */
export function getTags(post: WordPressPost) {
  if (post._embedded?.['wp:term']?.[1]) {
    return post._embedded['wp:term'][1].filter(term => term.taxonomy === 'post_tag');
  }
  return [];
}

/**
 * Format date for display
 */
export function formatDate(dateString: string, locale: string = 'en-US'): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Create breadcrumb navigation for pages
 */
export function createBreadcrumbs(pages: WordPressPage[], currentPage: WordPressPage) {
  const breadcrumbs = [];
  let current = currentPage;

  // Add current page
  breadcrumbs.unshift({
    title: current.title.rendered,
    slug: current.slug,
    url: `/${current.slug}`,
  });

  // Walk up the parent hierarchy
  while (current.parent > 0) {
    const parent = pages.find(page => page.id === current.parent);
    if (parent) {
      breadcrumbs.unshift({
        title: parent.title.rendered,
        slug: parent.slug,
        url: `/${parent.slug}`,
      });
      current = parent;
    } else {
      break;
    }
  }

  // Add home
  breadcrumbs.unshift({
    title: 'Home',
    slug: '',
    url: '/',
  });

  return breadcrumbs;
}

/**
 * Create a hierarchical menu structure from flat menu items
 */
export function createMenuHierarchy(menuItems: any[], parentId: number = 0) {
  return menuItems
    .filter(item => item.parent === parentId)
    .map(item => ({
      ...item,
      children: createMenuHierarchy(menuItems, item.id),
    }));
}

/**
 * Generate sitemap data from posts and pages
 */
export function generateSitemapData(posts: WordPressPost[], pages: WordPressPage[]) {
  const sitemapEntries = [];

  // Add pages
  pages.forEach(page => {
    sitemapEntries.push({
      url: `/${page.slug}`,
      lastmod: page.modified,
      changefreq: 'monthly',
      priority: page.slug === 'home' ? '1.0' : '0.8',
    });
  });

  // Add posts
  posts.forEach(post => {
    sitemapEntries.push({
      url: `/blog/${post.slug}`,
      lastmod: post.modified,
      changefreq: 'weekly',
      priority: '0.6',
    });
  });

  return sitemapEntries;
}
