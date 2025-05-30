import fs from 'fs';
import path from 'path';

/**
 * Astro integration to copy blog images to dist directory
 * This ensures WordPress images are included in the final build
 */
export default function imageCopyIntegration() {
  return {
    name: 'image-copy',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        console.log('🖼️ Copying blog images to dist...');
        
        try {
          const sourceDir = path.join(process.cwd(), 'public', 'images', 'blog');
          const destDir = path.join(dir.pathname, 'images', 'blog');
          
          // Check if source directory exists
          if (!fs.existsSync(sourceDir)) {
            console.log('📁 No blog images directory found, skipping copy');
            return;
          }
          
          // Create destination directory
          if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
          }
          
          // Copy all images
          const files = fs.readdirSync(sourceDir);
          let copiedCount = 0;
          
          for (const file of files) {
            const sourcePath = path.join(sourceDir, file);
            const destPath = path.join(destDir, file);
            
            // Only copy files (not directories)
            if (fs.statSync(sourcePath).isFile()) {
              fs.copyFileSync(sourcePath, destPath);
              copiedCount++;
            }
          }
          
          console.log(`✅ Copied ${copiedCount} blog images to dist directory`);
          
        } catch (error) {
          console.error('❌ Error copying blog images:', error.message);
        }
      }
    }
  };
}
