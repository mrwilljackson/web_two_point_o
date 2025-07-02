#!/usr/bin/env node

/**
 * Audit WordPress Images in Blog Posts
 * Scans all blog posts for WordPress image URLs and creates a migration plan
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BLOG_CONTENT_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');
const WORDPRESS_URL_PATTERN = /http:\/\/astro-wp\.local\/wp-content\/uploads\/[^\s"')]+/g;
const FEATURED_IMAGE_PATTERN = /src:\s*"(http:\/\/astro-wp\.local\/wp-content\/uploads\/[^"]+)"/g;

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
 * Extract WordPress image URLs from a file
 */
function extractWordPressImages(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const images = new Set();
  
  // Find featured images in frontmatter
  const featuredMatches = content.matchAll(FEATURED_IMAGE_PATTERN);
  for (const match of featuredMatches) {
    images.add(match[1]);
  }
  
  // Find images in content
  const contentMatches = content.matchAll(WORDPRESS_URL_PATTERN);
  for (const match of contentMatches) {
    images.add(match[0]);
  }
  
  return Array.from(images);
}

/**
 * Generate local filename for an image
 */
function generateLocalFilename(imageUrl, postSlug) {
  const urlParts = new URL(imageUrl);
  const originalFilename = path.basename(urlParts.pathname);
  const extension = path.extname(originalFilename);
  const baseName = path.basename(originalFilename, extension);
  
  // Create safe filename with post slug prefix
  const safeBaseName = baseName.replace(/[^a-zA-Z0-9.-]/g, '_');
  return `${postSlug}-${safeBaseName}${extension}`;
}

/**
 * Extract post slug from file path
 */
function getPostSlug(filePath) {
  const relativePath = path.relative(BLOG_CONTENT_DIR, filePath);
  const parts = relativePath.split(path.sep);
  const filename = parts[parts.length - 1];
  return path.basename(filename, path.extname(filename));
}

/**
 * Extract year from file path
 */
function getPostYear(filePath) {
  const relativePath = path.relative(BLOG_CONTENT_DIR, filePath);
  const parts = relativePath.split(path.sep);
  return parts[0]; // First part should be the year
}

/**
 * Main audit function
 */
function auditWordPressImages() {
  console.log('🔍 Auditing WordPress images in blog posts...\n');
  
  const blogFiles = findBlogFiles(BLOG_CONTENT_DIR);
  const imageAudit = {
    totalFiles: blogFiles.length,
    filesWithImages: 0,
    totalImages: 0,
    images: [],
    migrationPlan: []
  };
  
  console.log(`📁 Found ${blogFiles.length} blog files\n`);
  
  for (const filePath of blogFiles) {
    const postSlug = getPostSlug(filePath);
    const postYear = getPostYear(filePath);
    const images = extractWordPressImages(filePath);
    
    if (images.length > 0) {
      imageAudit.filesWithImages++;
      imageAudit.totalImages += images.length;
      
      console.log(`📄 ${postSlug} (${postYear}): ${images.length} images`);
      
      for (const imageUrl of images) {
        const localFilename = generateLocalFilename(imageUrl, postSlug);
        const localPath = `/images/blog/${postYear}/${localFilename}`;
        
        imageAudit.images.push({
          originalUrl: imageUrl,
          postSlug,
          postYear,
          postFile: path.relative(process.cwd(), filePath),
          localFilename,
          localPath
        });
        
        imageAudit.migrationPlan.push({
          action: 'download',
          from: imageUrl,
          to: `public/images/blog/${postYear}/${localFilename}`,
          updateFile: path.relative(process.cwd(), filePath),
          replaceUrl: imageUrl,
          withUrl: localPath
        });
        
        console.log(`  📸 ${path.basename(imageUrl)} → ${localPath}`);
      }
      console.log('');
    }
  }
  
  // Summary
  console.log('📊 AUDIT SUMMARY:');
  console.log(`  Total files scanned: ${imageAudit.totalFiles}`);
  console.log(`  Files with WordPress images: ${imageAudit.filesWithImages}`);
  console.log(`  Total WordPress images found: ${imageAudit.totalImages}`);
  console.log('');
  
  // Save audit results
  const auditFile = path.join(process.cwd(), 'wordpress-images-audit.json');
  fs.writeFileSync(auditFile, JSON.stringify(imageAudit, null, 2));
  console.log(`💾 Audit results saved to: ${auditFile}`);
  
  // Generate migration script
  generateMigrationScript(imageAudit.migrationPlan);
  
  return imageAudit;
}

/**
 * Generate a migration script
 */
function generateMigrationScript(migrationPlan) {
  const scriptContent = `#!/usr/bin/env node

/**
 * WordPress Images Migration Script
 * Auto-generated by audit-wordpress-images.js
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationPlan = ${JSON.stringify(migrationPlan, null, 2)};

/**
 * Download an image from URL
 */
async function downloadImage(url, localPath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(localPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    const file = fs.createWriteStream(localPath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(\`Failed to download \${url}: \${response.statusCode}\`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
      
      file.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Update file content to replace WordPress URLs with local paths
 */
function updateFileContent(filePath, oldUrl, newUrl) {
  const content = fs.readFileSync(filePath, 'utf8');
  const updatedContent = content.replaceAll(oldUrl, newUrl);
  fs.writeFileSync(filePath, updatedContent, 'utf8');
}

/**
 * Main migration function
 */
async function migrateImages() {
  console.log('🚀 Starting WordPress images migration...\\n');
  
  let downloaded = 0;
  let updated = 0;
  
  for (const item of migrationPlan) {
    try {
      console.log(\`📥 Downloading: \${path.basename(item.from)}\`);
      await downloadImage(item.from, item.to);
      downloaded++;
      
      console.log(\`📝 Updating: \${item.updateFile}\`);
      updateFileContent(item.updateFile, item.replaceUrl, item.withUrl);
      updated++;
      
    } catch (error) {
      console.error(\`❌ Failed to process \${item.from}:\`, error.message);
    }
  }
  
  console.log(\`\\n✅ Migration complete!\`);
  console.log(\`  Images downloaded: \${downloaded}/\${migrationPlan.length}\`);
  console.log(\`  Files updated: \${updated}/\${migrationPlan.length}\`);
}

// Run migration
migrateImages().catch(console.error);
`;

  const scriptFile = path.join(process.cwd(), 'scripts', 'migrate-wordpress-images.js');
  fs.writeFileSync(scriptFile, scriptContent);
  console.log(`🔧 Migration script generated: ${scriptFile}`);
  console.log('');
  console.log('📋 Next steps:');
  console.log('1. Review the audit results in wordpress-images-audit.json');
  console.log('2. Run the migration: node scripts/migrate-wordpress-images.js');
  console.log('3. Test that all images load correctly');
}

// Run the audit
console.log('🚀 Starting audit script...');
try {
  auditWordPressImages();
} catch (error) {
  console.error('❌ Audit failed:', error.message);
  console.error(error.stack);
  process.exit(1);
}
