# 🚀 Playphysio Content Management - Quick Reference

## ⚡ Common Tasks

### 📝 Add New Blog Post
```bash
# 1. Create file
touch src/content/blog/2025/my-new-post.mdx

# 2. Add frontmatter (copy from existing post and modify)
# 3. Add content with components
# 4. Add images to public/images/blog/2025/
# 5. Test locally: npm run dev
# 6. Build: npm run build
# 7. Deploy: upload dist/ folder
```

### 🗑️ Remove Blog Post
```bash
# Option 1: Delete file
rm src/content/blog/2025/unwanted-post.mdx

# Option 2: Change status in frontmatter
status: "draft"  # or "archived"
```

### 🖼️ Add Images
```bash
# 1. Place in correct year folder
cp image.png public/images/blog/2025/

# 2. Reference in frontmatter
featuredImage:
  src: "/images/blog/2025/image.png"
  alt: "Description"

# 3. Use in content
![Alt text](/images/blog/2025/image.png)
```

---

## 📋 Frontmatter Template

```yaml
---
title: "Your Post Title"
date: 2025-07-02
status: "published"
excerpt: "Brief description under 160 characters for SEO and previews."
wordCount: 450
categories: ["news"]
tags: ["gamification", "respiratory-therapy"]
author: "will-jackson"
featuredImage:
  src: "/images/blog/2025/post-image.png"
  alt: "Descriptive alt text"
featured: false
hasShortcodes: true
---
```

---

## 🎨 Component Quick Reference

### KeyInsight
```mdx
<KeyInsight icon="💡" title="Important Point">
  Your insight content here
</KeyInsight>
```

### StatsCards
```mdx
<StatsCards>
  <Stat value="94%" label="success rate" color="green" />
  <Stat value="2.5x" label="improvement" color="blue" />
</StatsCards>
```

### Quote
```mdx
<Quote author="Dr. Smith" title="Medical Director">
  Professional quote with attribution
</Quote>
```

### References
```mdx
Text with reference <InlineRef refId="1" /> in content.

<References>
1. Smith, J. (2024). "Study Title." Journal Name, 15(3), 123-145.
2. Johnson, A. (2023). "Another Study." Medical Journal, 8(2), 67-89.
</References>
```

---

## 🔧 Development Commands

```bash
# Start development server
npm run dev
# → http://localhost:4322

# Build for production
npm run build

# Preview production build
npm run preview
# → http://localhost:4321

# Update dependencies
npm update
```

---

## 📁 File Structure

```
src/content/blog/YYYY/post-name.mdx    # Blog posts
public/images/blog/YYYY/image.png      # Blog images
src/content/authors/author-name.md     # Author profiles
src/content/categories/category.md     # Categories
src/content/tags/tag-name.md          # Tags
```

---

## ✅ Pre-Deployment Checklist

- [ ] Post has proper frontmatter
- [ ] Images are optimized and in correct folder
- [ ] All links work correctly
- [ ] Content previews correctly with `npm run dev`
- [ ] Build completes without errors: `npm run build`
- [ ] Production preview works: `npm run preview`
- [ ] Ready to upload `dist/` folder

---

## 🆘 Quick Fixes

### Build Fails
1. Check frontmatter syntax (YAML format)
2. Verify all required fields are present
3. Check image paths exist

### Images Not Loading
1. Verify file exists in `public/images/blog/YYYY/`
2. Check path starts with `/images/blog/`
3. Ensure correct file extension

### Components Not Working
1. Check import statement at top of file
2. Verify component syntax matches examples
3. Ensure proper closing tags

---

## 📊 Content Guidelines

### Titles
- Clear and descriptive
- Include target keywords
- Under 60 characters for SEO

### Excerpts
- Under 160 characters
- Compelling and informative
- Include call-to-action

### Images
- Use WebP format when possible
- Include descriptive alt text
- Optimize for web (under 500KB)

### Categories
- Use existing categories when possible
- Create new ones sparingly
- Keep names consistent

### Tags
- 2-5 tags per post
- Use specific, relevant terms
- Maintain consistent naming

---

## 🎯 Status Options

- `"published"` - Live on website
- `"draft"` - Hidden from public
- `"archived"` - Removed from listings

---

## 🌈 Color Options for Components

### Stat Colors
- `"green"` - Success/positive metrics
- `"blue"` - Information/neutral metrics  
- `"purple"` - Brand/special metrics
- `"cyan"` - Technology/innovation
- `"orange"` - Warning/attention

### Component Types
- `"info"` - Blue informational
- `"warning"` - Orange attention
- `"success"` - Green positive
- `"error"` - Red important

---

This quick reference covers 90% of your daily content management tasks! 🎉
