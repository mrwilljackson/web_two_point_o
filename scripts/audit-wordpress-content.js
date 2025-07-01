/**
 * Detailed WordPress Content Audit Script
 * Analyzes posts for shortcode usage, content patterns, and migration requirements
 */

import axios from 'axios';
import fs from 'fs';
import path from 'path';

const WORDPRESS_URL = 'http://astro-wp.local';
const USERNAME = 'mrwilljackson';
const PASSWORD = 't1l3cr0ft';

// Create axios instance
const api = axios.create({
  baseURL: `${WORDPRESS_URL}/wp-json/wp/v2`,
  timeout: 30000,
  auth: {
    username: USERNAME,
    password: PASSWORD
  }
});

/**
 * Analyze shortcode usage in content
 */
function analyzeShortcodes(content) {
  const shortcodes = {
    key_insight: (content.match(/\[key_insight[^\]]*\]/g) || []).length,
    stats_cards: (content.match(/\[stats_cards\]/g) || []).length,
    stat: (content.match(/\[stat[^\]]*\]/g) || []).length,
    quote: (content.match(/\[quote[^\]]*\]/g) || []).length,
    callout: (content.match(/\[callout[^\]]*\]/g) || []).length,
    highlight: (content.match(/\[highlight[^\]]*\]/g) || []).length,
    references: (content.match(/\[references\]/g) || []).length
  };
  
  return shortcodes;
}

/**
 * Analyze content structure
 */
function analyzeContent(post) {
  const content = post.content.rendered;
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const imageCount = (content.match(/<img[^>]*>/g) || []).length;
  const shortcodes = analyzeShortcodes(content);
  
  return {
    wordCount,
    imageCount,
    shortcodes,
    hasShortcodes: Object.values(shortcodes).some(count => count > 0)
  };
}

async function auditContent() {
  console.log('🔍 Starting detailed WordPress content audit...\n');
  
  try {
    // Fetch all posts with embedded data
    const postsResponse = await api.get('/posts', {
      params: {
        per_page: 100,
        _embed: true
      }
    });
    
    const posts = postsResponse.data;
    console.log(`📊 Analyzing ${posts.length} posts...\n`);
    
    // Fetch categories and tags for reference
    const [categoriesResponse, tagsResponse] = await Promise.all([
      api.get('/categories'),
      api.get('/tags')
    ]);
    
    const categories = categoriesResponse.data;
    const tags = tagsResponse.data;
    
    // Analyze each post
    const analysis = {
      totalPosts: posts.length,
      categories: categories.map(cat => ({ id: cat.id, name: cat.name, slug: cat.slug, count: cat.count })),
      tags: tags.map(tag => ({ id: tag.id, name: tag.name, slug: tag.slug, count: tag.count })),
      posts: [],
      shortcodeSummary: {
        key_insight: 0,
        stats_cards: 0,
        stat: 0,
        quote: 0,
        callout: 0,
        highlight: 0,
        references: 0
      },
      contentStats: {
        totalWords: 0,
        totalImages: 0,
        postsWithShortcodes: 0,
        stickyPosts: 0
      }
    };
    
    posts.forEach((post, index) => {
      const contentAnalysis = analyzeContent(post);
      
      // Get categories and tags for this post
      const postCategories = post._embedded?.['wp:term']?.[0] || [];
      const postTags = post._embedded?.['wp:term']?.[1] || [];
      const featuredImage = post._embedded?.['wp:featuredmedia']?.[0] || null;
      
      const postData = {
        id: post.id,
        title: post.title.rendered,
        slug: post.slug,
        date: post.date,
        status: post.status,
        sticky: post.sticky,
        categories: postCategories.map(cat => ({ name: cat.name, slug: cat.slug })),
        tags: postTags.map(tag => ({ name: tag.name, slug: tag.slug })),
        featuredImage: featuredImage ? {
          url: featuredImage.source_url,
          alt: featuredImage.alt_text,
          caption: featuredImage.caption?.rendered
        } : null,
        ...contentAnalysis
      };
      
      analysis.posts.push(postData);
      
      // Update summary stats
      Object.keys(contentAnalysis.shortcodes).forEach(key => {
        analysis.shortcodeSummary[key] += contentAnalysis.shortcodes[key];
      });
      
      analysis.contentStats.totalWords += contentAnalysis.wordCount;
      analysis.contentStats.totalImages += contentAnalysis.imageCount;
      if (contentAnalysis.hasShortcodes) analysis.contentStats.postsWithShortcodes++;
      if (post.sticky) analysis.contentStats.stickyPosts++;
      
      console.log(`✅ ${index + 1}/${posts.length}: ${post.title.rendered}`);
    });
    
    // Save detailed analysis
    const outputPath = 'wordpress-content-audit.json';
    fs.writeFileSync(outputPath, JSON.stringify(analysis, null, 2));
    
    // Print summary
    console.log('\n📋 CONTENT AUDIT SUMMARY');
    console.log('========================');
    console.log(`Total Posts: ${analysis.totalPosts}`);
    console.log(`Sticky Posts: ${analysis.contentStats.stickyPosts}`);
    console.log(`Total Words: ${analysis.contentStats.totalWords.toLocaleString()}`);
    console.log(`Total Images: ${analysis.contentStats.totalImages}`);
    console.log(`Posts with Shortcodes: ${analysis.contentStats.postsWithShortcodes}`);
    
    console.log('\n🏷️ CATEGORIES:');
    analysis.categories.forEach(cat => {
      console.log(`  - ${cat.name} (${cat.count} posts)`);
    });
    
    console.log('\n🏷️ TAGS:');
    analysis.tags.forEach(tag => {
      console.log(`  - ${tag.name} (${tag.count} posts)`);
    });
    
    console.log('\n🔧 SHORTCODE USAGE:');
    Object.entries(analysis.shortcodeSummary).forEach(([shortcode, count]) => {
      if (count > 0) {
        console.log(`  - [${shortcode}]: ${count} instances`);
      }
    });
    
    console.log(`\n💾 Detailed analysis saved to: ${outputPath}`);
    console.log('\n🎯 MIGRATION PRIORITIES:');
    console.log('1. Create Astro components for shortcodes with usage > 0');
    console.log('2. Set up frontmatter schema for categories, tags, and metadata');
    console.log('3. Plan image migration strategy');
    console.log('4. Handle sticky posts feature');
    
  } catch (error) {
    console.error('❌ Error during content audit:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the audit
auditContent();
