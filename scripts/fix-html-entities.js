#!/usr/bin/env node

/**
 * Fix HTML Entities in Blog Post Frontmatter
 * Decodes HTML entities like &amp;, &#8217;, etc. in title and excerpt fields
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BLOG_CONTENT_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');

/**
 * Comprehensive HTML entity decoder
 */
function decodeHtmlEntities(text) {
  if (!text) return text;
  
  const entities = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#8217;': "'",      // Right single quotation mark (apostrophe)
    '&#8216;': "'",      // Left single quotation mark
    '&#8221;': '"',      // Right double quotation mark
    '&#8220;': '"',      // Left double quotation mark
    '&#8211;': '–',      // En dash
    '&#8212;': '—',      // Em dash
    '&#8230;': '...',    // Horizontal ellipsis
    '&hellip;': '...',   // Horizontal ellipsis (named entity)
    '&#8243;': '"',      // Double prime
    '&#039;': "'",       // Apostrophe
    '&nbsp;': ' ',       // Non-breaking space
    '&038;': '&'         // Another ampersand encoding
  };

  return text.replace(/&[#\w]+;/g, (entity) => entities[entity] || entity);
}

/**
 * Recursively find all .md and .mdx files
 */
function findBlogFiles(dir) {
  const files = [];
  
  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
        files.push(fullPath);
      }
    }
  }
  
  scanDirectory(dir);
  return files;
}

/**
 * Extract and fix frontmatter from file content
 */
function fixFrontmatterEntities(content) {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  
  if (!frontmatterMatch) {
    return content; // No frontmatter found
  }
  
  const frontmatter = frontmatterMatch[1];
  const restOfContent = content.substring(frontmatterMatch[0].length);
  
  // Fix HTML entities in frontmatter
  const fixedFrontmatter = frontmatter
    .split('\n')
    .map(line => {
      // Only fix entities in title and excerpt fields
      if (line.trim().startsWith('title:') || line.trim().startsWith('excerpt:')) {
        return decodeHtmlEntities(line);
      }
      return line;
    })
    .join('\n');
  
  return `---\n${fixedFrontmatter}\n---${restOfContent}`;
}

/**
 * Process a single blog file
 */
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixedContent = fixFrontmatterEntities(content);
    
    // Only write if content changed
    if (content !== fixedContent) {
      fs.writeFileSync(filePath, fixedContent, 'utf8');
      return true; // File was modified
    }
    
    return false; // No changes needed
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Main function to fix HTML entities in all blog posts
 */
function fixHtmlEntitiesInBlogPosts() {
  console.log('🔧 Fixing HTML entities in blog post frontmatter...\n');
  
  const blogFiles = findBlogFiles(BLOG_CONTENT_DIR);
  let processedCount = 0;
  let modifiedCount = 0;
  
  console.log(`📁 Found ${blogFiles.length} blog files\n`);
  
  for (const filePath of blogFiles) {
    const relativePath = path.relative(process.cwd(), filePath);
    const wasModified = processFile(filePath);
    
    processedCount++;
    
    if (wasModified) {
      modifiedCount++;
      console.log(`✅ Fixed: ${relativePath}`);
    } else {
      console.log(`⚪ No changes: ${relativePath}`);
    }
  }
  
  console.log('\n📊 SUMMARY:');
  console.log(`  Files processed: ${processedCount}`);
  console.log(`  Files modified: ${modifiedCount}`);
  console.log(`  Files unchanged: ${processedCount - modifiedCount}`);
  
  if (modifiedCount > 0) {
    console.log('\n✨ HTML entities have been fixed in frontmatter!');
    console.log('📋 Next steps:');
    console.log('1. Test the blog listing page to verify entities are decoded');
    console.log('2. Run npm run build to ensure everything still works');
    console.log('3. Check individual blog posts for proper display');
  } else {
    console.log('\n✅ No HTML entities found that needed fixing.');
  }
}

// Run the fix
console.log('🚀 Starting HTML entities fix script...');
try {
  fixHtmlEntitiesInBlogPosts();
} catch (error) {
  console.error('❌ Script failed:', error.message);
  console.error(error.stack);
  process.exit(1);
}
