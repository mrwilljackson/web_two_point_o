# 📝 Playphysio Content Management Guide

## 🎯 Overview

Your Playphysio website now uses **FrontMatter CMS** - a file-based content management system that stores all content as markdown files with YAML frontmatter. This guide covers everything you need to know about managing content.

---

## 📁 Content Structure

```
src/content/
├── blog/           # Blog posts (.mdx files)
│   ├── 2017/
│   ├── 2018/
│   ├── ...
│   └── 2025/
├── authors/        # Author profiles (.md files)
├── categories/     # Category definitions (.md files)
└── tags/          # Tag definitions (.md files)

public/images/blog/ # Blog images organized by year
├── 2017/
├── 2018/
├── ...
└── 2025/
```

---

## ✍️ Adding New Blog Posts

### Step 1: Create the Post File

1. **Navigate to the correct year folder:**
   ```bash
   cd src/content/blog/2025/
   ```

2. **Create a new .mdx file:**
   ```bash
   # Use kebab-case for filenames
   touch my-new-blog-post.mdx
   ```

### Step 2: Add Frontmatter

Open your new file and add the frontmatter header:

```yaml
---
title: "Your Post Title Here"
date: 2025-07-02
status: "published"
excerpt: "A brief description of your post content that will appear in listings and previews. Keep it under 160 characters for best SEO."
wordCount: 450
categories: ["news"]
tags: ["gamification", "respiratory-therapy"]
author: "will-jackson"
featuredImage:
  src: "/images/blog/2025/my-new-blog-post-featured.png"
  alt: "Descriptive alt text for the image"
featured: false
hasShortcodes: true
---
```

### Step 3: Add Content with Components

```mdx
import { KeyInsight, StatsCards, Stat, Quote, Callout, Highlight, References, InlineRef } from '../../../components/content';

## Your Main Heading

Your introduction paragraph goes here. You can use **bold text**, *italic text*, and [links](https://example.com).

### Using Components

<KeyInsight icon="💡" title="Important Point">
  This creates a highlighted insight box with an icon and colored background.
</KeyInsight>

<StatsCards>
  <Stat value="94%" label="therapy adherence rates" color="green" />
  <Stat value="67%" label="improvement in outcomes" color="blue" />
  <Stat value="89%" label="patient satisfaction" color="purple" />
</StatsCards>

<Quote author="Dr. Sarah Johnson" title="Respiratory Specialist, Children's Hospital">
  This is a professional quote with proper attribution and styling.
</Quote>

### Adding References

You can add inline references <InlineRef refId="1" /> that link to your reference list.

<References>
1. Smith, J. et al. (2024). "Study Title Here." *Journal Name*, 15(3), 123-145.
2. Johnson, A. (2023). "Another Study." *Medical Journal*, 8(2), 67-89.
</References>
```

### Step 4: Add Images

1. **Place images in the correct year folder:**
   ```bash
   cp my-image.png public/images/blog/2025/
   ```

2. **Reference in frontmatter:**
   ```yaml
   featuredImage:
     src: "/images/blog/2025/my-image.png"
     alt: "Descriptive alt text"
   ```

3. **Use in content:**
   ```markdown
   ![Alt text](/images/blog/2025/my-image.png)
   ```

---

## 🗑️ Removing Blog Posts

### Method 1: Delete the File
```bash
# Simply delete the .mdx file
rm src/content/blog/2025/unwanted-post.mdx
```

### Method 2: Change Status to Draft
```yaml
---
title: "Post Title"
status: "draft"  # Change from "published" to "draft"
---
```

### Method 3: Archive the Post
```yaml
---
title: "Post Title"
status: "archived"  # Change to "archived"
---
```

---

## 🏷️ Managing Categories and Tags

### Adding New Categories

1. **Create category file:**
   ```bash
   touch src/content/categories/new-category.md
   ```

2. **Add category definition:**
   ```yaml
   ---
   name: "New Category"
   slug: "new-category"
   description: "Description of what this category covers"
   color: "#4DBBFA"
   ---
   
   Detailed description of the category goes here.
   ```

### Adding New Tags

1. **Create tag file:**
   ```bash
   touch src/content/tags/new-tag.md
   ```

2. **Add tag definition:**
   ```yaml
   ---
   name: "New Tag"
   slug: "new-tag"
   description: "Brief description of the tag"
   ---
   
   More detailed information about this tag.
   ```

---

## 👤 Managing Authors

### Adding New Authors

1. **Create author file:**
   ```bash
   touch src/content/authors/new-author.md
   ```

2. **Add author information:**
   ```yaml
   ---
   name: "Author Name"
   slug: "author-slug"
   bio: "Brief bio of the author"
   avatar: "/images/authors/author-name.jpg"
   social:
     twitter: "https://twitter.com/username"
     linkedin: "https://linkedin.com/in/username"
   ---
   
   Extended biography and background information.
   ```

---

## 🎨 Available Content Components

### KeyInsight
```mdx
<KeyInsight icon="💡" title="Important Point">
  Highlighted insight with colored background
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

### Callout
```mdx
<Callout type="info" title="Important Note">
  Highlighted information box
</Callout>
```

### Highlight
```mdx
<Highlight color="yellow">
  Highlighted text with background color
</Highlight>
```

### References
```mdx
<References>
1. Citation format here
2. Another citation
</References>
```

### Inline References
```mdx
Text with reference <InlineRef refId="1" /> that links to reference list.
```

---

## 🚀 Publishing Workflow

### 1. Development and Testing
```bash
# Start development server
npm run dev

# Visit http://localhost:4322 to preview changes
```

### 2. Build for Production
```bash
# Build the static site
npm run build

# Preview the built site
npm run preview
# Visit http://localhost:4321 to test production build
```

### 3. Deploy to Production
```bash
# Upload the entire 'dist' folder to your hosting provider
# The site is fully static and works with any hosting service
```

---

## 🔧 Maintenance Tasks

### Regular Content Updates

1. **Review and update old posts** - Check for outdated information
2. **Add new categories/tags** as content grows
3. **Optimize images** - Compress large images for better performance
4. **Update author bios** - Keep author information current

### Technical Maintenance

1. **Update dependencies** periodically:
   ```bash
   npm update
   ```

2. **Check for broken links** in content
3. **Monitor build performance** and optimize if needed
4. **Backup content** - All content is in version control

### SEO Optimization

1. **Write compelling excerpts** - Keep under 160 characters
2. **Use descriptive alt text** for all images
3. **Choose relevant categories and tags**
4. **Include target keywords** naturally in content

---

## 📊 Content Best Practices

### Writing Guidelines

- **Use clear, descriptive titles**
- **Write engaging excerpts** that encourage clicks
- **Structure content** with proper headings (H2, H3, etc.)
- **Include relevant images** with proper alt text
- **Add references** for credibility when citing studies

### Technical Guidelines

- **Use kebab-case** for file names (my-blog-post.mdx)
- **Organize images** by year in public/images/blog/YYYY/
- **Keep frontmatter consistent** across all posts
- **Test locally** before deploying
- **Use semantic HTML** in markdown content

### Performance Guidelines

- **Optimize images** before uploading (use WebP when possible)
- **Limit component usage** - don't overuse interactive elements
- **Keep excerpts concise** for faster loading
- **Use appropriate image sizes** for different contexts

---

## 🆘 Troubleshooting

### Common Issues

1. **Build fails** - Check frontmatter syntax and required fields
2. **Images not loading** - Verify file paths and image existence
3. **Components not working** - Check import statements
4. **Styling issues** - Ensure proper markdown formatting

### Getting Help

1. **Check build logs** for specific error messages
2. **Validate frontmatter** syntax using YAML validators
3. **Test components** individually if issues arise
4. **Review this guide** for proper syntax and structure

---

## 📋 Quick Reference

### Required Frontmatter Fields
- `title` (string)
- `date` (YYYY-MM-DD)
- `status` ("published", "draft", or "archived")
- `excerpt` (string, under 160 chars)
- `categories` (array)
- `tags` (array)
- `author` (string, must match author slug)

### Optional Frontmatter Fields
- `wordCount` (number)
- `featuredImage` (object with src and alt)
- `featured` (boolean)
- `hasShortcodes` (boolean)

### File Naming Convention
- Use kebab-case: `my-blog-post.mdx`
- Include year in folder structure
- Use descriptive, SEO-friendly names

---

## 📚 Additional Resources

### Documentation Files
- **[Quick Reference](./quick-reference.md)** - Common tasks and commands
- **[First Post Tutorial](./tutorial-first-post.md)** - Step-by-step guide for beginners
- **[WordPress Independence Guide](./wordpress-independence-complete.md)** - Migration summary

### Example Files
- Check existing blog posts in `src/content/blog/` for examples
- Review component usage in recent posts
- Study frontmatter structure in published posts

### Support
- Build logs provide detailed error information
- Component documentation in `src/components/content/`
- Astro documentation: https://docs.astro.build

Your content management system is now fully documented and ready for use! 🎉
