import type { APIRoute } from 'astro';
import { wordpressAPI } from '../lib/wordpress';

export const GET: APIRoute = async () => {
  try {
    // Fetch all posts and pages
    const posts = await wordpressAPI.getAllPosts();
    let pages = [];

    try {
      pages = await wordpressAPI.getPages();
    } catch (error) {
      console.warn('Could not fetch pages for sitemap:', error);
      pages = [];
    }

    const siteUrl = process.env.SITE_URL || 'https://playphysio.com';

    // Generate sitemap entries
    const sitemapEntries = [
      // Homepage
      {
        url: siteUrl,
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: '1.0'
      },
      // Blog index
      {
        url: `${siteUrl}/blog`,
        lastmod: posts.length > 0 ? new Date(posts[0].modified).toISOString() : new Date().toISOString(),
        changefreq: 'daily',
        priority: '0.9'
      },
      // Blog posts
      ...posts.map(post => ({
        url: `${siteUrl}/blog/${post.slug}`,
        lastmod: new Date(post.modified).toISOString(),
        changefreq: 'weekly',
        priority: '0.7'
      })),
      // Pages
      ...pages.map(page => ({
        url: `${siteUrl}/${page.slug}`,
        lastmod: new Date(page.modified).toISOString(),
        changefreq: 'monthly',
        priority: page.slug === 'home' ? '1.0' : '0.8'
      }))
    ];

    // Generate categories
    try {
      const categories = await wordpressAPI.getCategories();
      categories.forEach(category => {
        sitemapEntries.push({
          url: `${siteUrl}/category/${category.slug}`,
          lastmod: new Date().toISOString(),
          changefreq: 'weekly',
          priority: '0.6'
        });
      });
    } catch (error) {
      console.warn('Could not fetch categories for sitemap:', error);
    }

    // Generate XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);

    // Fallback minimal sitemap
    const siteUrl = process.env.SITE_URL || 'https://playphysio.com';
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${siteUrl}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

    return new Response(fallbackSitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml'
      }
    });
  }
};
