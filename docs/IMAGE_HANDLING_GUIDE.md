# Image Handling for WordPress → Astro Static Site

## 🔍 **Current Challenge**
WordPress images are stored at `http://localhost:8080/wp-content/uploads/...` but your static site needs them to work in production without WordPress running.

## 🛠️ **Solution Options**

### **Option 1: Build-Time Download (Implemented)**
✅ **Best for: Production sites, SEO, Performance**

**How it works:**
1. During build, download all WordPress images
2. Store in `/public/images/blog/`
3. Update URLs to point to local copies
4. Deploy with static files

**Pros:**
- ✅ Works without WordPress in production
- ✅ Fast loading (local images)
- ✅ SEO friendly
- ✅ Reliable (no external dependencies)

**Cons:**
- ⚠️ Increases build time
- ⚠️ Larger deployment size

### **Option 2: CDN/External Hosting**
✅ **Best for: Large image libraries, multiple sites**

**Setup:**
1. Upload WordPress images to CDN (Cloudinary, AWS S3, etc.)
2. Update WordPress to use CDN URLs
3. Static site uses CDN URLs directly

**Pros:**
- ✅ Fast global delivery
- ✅ Image optimization
- ✅ Smaller deployments

**Cons:**
- ⚠️ Additional service cost
- ⚠️ External dependency

### **Option 3: WordPress as Headless CMS**
✅ **Best for: Dynamic content, team editing**

**Setup:**
1. Keep WordPress running on subdomain (cms.yoursite.com)
2. Configure CORS for image access
3. Static site loads images from WordPress

**Pros:**
- ✅ Real-time content updates
- ✅ Team can edit content
- ✅ No build-time processing

**Cons:**
- ⚠️ WordPress must stay online
- ⚠️ Slower image loading
- ⚠️ Additional hosting cost

## 🚀 **Recommended Implementation**

### **For Production: Option 1 (Build-Time Download)**

```bash
# Build process will:
npm run build

# 1. Fetch WordPress content
# 2. Download all images
# 3. Update image URLs
# 4. Generate static site
```

### **Image Processing Features:**
- **Smart naming**: `post-slug-image-name.jpg`
- **Duplicate detection**: Skip already downloaded images
- **Fallback handling**: Use original URL if download fails
- **Format preservation**: Maintains original image formats
- **Organized storage**: `/public/images/blog/` directory

### **Usage in Components:**
```astro
---
import { processFeaturedImage } from '../lib/image-processor.js';

// Process featured image
const processedImage = await processFeaturedImage(featuredImage, post.slug);
---

<img src={processedImage.source_url} alt={processedImage.alt_text} />
```

## 📁 **File Structure**
```
public/
  images/
    blog/
      post-slug-featured-image.jpg
      post-slug-content-image-1.jpg
      post-slug-content-image-2.jpg
```

## 🔧 **Build Configuration**

Add to `package.json`:
```json
{
  "scripts": {
    "build": "astro build",
    "build:images": "node scripts/download-images.js && astro build"
  }
}
```

## 🎯 **Next Steps**

1. **Test locally**: Run `npm run build` to see image processing
2. **Check output**: Verify images in `/public/images/blog/`
3. **Deploy**: Images will be included in static deployment
4. **Monitor**: Check build logs for any failed downloads

## 🚨 **Important Notes**

- **WordPress must be running** during build time
- **Images are cached** - delete `/public/images/blog/` to re-download
- **Large images** may slow build time
- **Consider image optimization** for better performance
