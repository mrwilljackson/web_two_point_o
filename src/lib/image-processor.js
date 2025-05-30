import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create images directory if it doesn't exist
const imagesDir = path.join(process.cwd(), 'public', 'images', 'blog');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Track processed images for copying to dist
const processedImages = new Set();

/**
 * Download and process images from WordPress
 * @param {string} imageUrl - WordPress image URL
 * @param {string} postSlug - Post slug for organizing images
 * @returns {string} - Local image path
 */
export async function processImage(imageUrl, postSlug) {
  try {
    // Skip if not a WordPress image
    if (!imageUrl || !imageUrl.includes('wp-content/uploads')) {
      return imageUrl;
    }

    // Extract filename from URL
    const urlParts = new URL(imageUrl);
    const filename = path.basename(urlParts.pathname);
    const extension = path.extname(filename);

    // Create safe filename
    const safeFilename = `${postSlug}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const localPath = path.join(imagesDir, safeFilename);
    const publicPath = `/images/blog/${safeFilename}`;

    // Check if image already exists
    if (fs.existsSync(localPath)) {
      // Track existing image for dist copying
      processedImages.add(safeFilename);
      console.log(`✅ Image already exists: ${safeFilename}`);
      return publicPath;
    }

    // Download image
    console.log(`📥 Downloading image: ${imageUrl}`);
    const response = await fetch(imageUrl);

    if (!response.ok) {
      console.warn(`⚠️ Failed to download image: ${imageUrl}`);
      return imageUrl; // Return original URL as fallback
    }

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(localPath, Buffer.from(buffer));

    // Track this image for dist copying
    processedImages.add(safeFilename);

    console.log(`✅ Image saved: ${safeFilename}`);
    return publicPath;

  } catch (error) {
    console.error(`❌ Error processing image ${imageUrl}:`, error.message);
    return imageUrl; // Return original URL as fallback
  }
}

/**
 * Process all images in post content
 * @param {string} content - HTML content
 * @param {string} postSlug - Post slug
 * @returns {string} - Updated content with local image paths
 */
export async function processPostImages(content, postSlug) {
  if (!content) return content;

  // Find all img tags
  const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/g;
  let updatedContent = content;
  const matches = [...content.matchAll(imgRegex)];

  for (const match of matches) {
    const originalSrc = match[1];
    const localSrc = await processImage(originalSrc, postSlug);

    if (localSrc !== originalSrc) {
      updatedContent = updatedContent.replace(originalSrc, localSrc);
    }
  }

  return updatedContent;
}

/**
 * Process featured image
 * @param {Object} featuredImage - WordPress featured image object
 * @param {string} postSlug - Post slug
 * @returns {Object} - Updated featured image object
 */
export async function processFeaturedImage(featuredImage, postSlug) {
  if (!featuredImage || !featuredImage.source_url) {
    return featuredImage;
  }

  const localUrl = await processImage(featuredImage.source_url, postSlug);

  return {
    ...featuredImage,
    source_url: localUrl,
    local_url: localUrl
  };
}

/**
 * Copy processed images to dist directory
 * This ensures images are included in the final build
 */
export function copyImagesToDist() {
  try {
    const distImagesDir = path.join(process.cwd(), 'dist', 'images', 'blog');

    // Create dist images directory if it doesn't exist
    if (!fs.existsSync(distImagesDir)) {
      fs.mkdirSync(distImagesDir, { recursive: true });
    }

    // Copy all processed images
    for (const filename of processedImages) {
      const sourcePath = path.join(imagesDir, filename);
      const destPath = path.join(distImagesDir, filename);

      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`📋 Copied to dist: ${filename}`);
      }
    }

    console.log(`🎉 Copied ${processedImages.size} images to dist directory`);
  } catch (error) {
    console.error('❌ Error copying images to dist:', error.message);
  }
}
