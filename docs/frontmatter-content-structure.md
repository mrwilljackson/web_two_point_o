# FrontMatter CMS Content Structure

## Overview
This document outlines the content structure for migrating from WordPress to FrontMatter-based content management in VSCode.

## Directory Structure

```
src/
├── content/
│   ├── blog/
│   │   ├── 2024/
│   │   │   ├── burden-of-care-for-parents.md
│   │   │   ├── science-behind-gamified-therapy.md
│   │   │   └── ...
│   │   ├── 2023/
│   │   │   └── ...
│   │   └── index.ts (content utilities)
│   ├── categories/
│   │   ├── blog.md
│   │   ├── news.md
│   │   └── research.md
│   ├── tags/
│   │   ├── cystic-fibrosis.md
│   │   ├── gamification.md
│   │   └── ...
│   └── authors/
│       └── will-jackson.md
├── assets/
│   └── blog/
│       ├── 2024/
│       └── 2023/
└── components/
    └── content/
        ├── KeyInsight.astro
        ├── StatsCards.astro
        ├── Quote.astro
        ├── Callout.astro
        ├── Highlight.astro
        └── References.astro
```

## FrontMatter Schema

### Blog Posts (`src/content/blog/*.md`)

```yaml
---
# Required fields
title: "Post Title"
slug: "post-slug"
date: 2024-01-15
status: "published" # draft, published, archived

# Content metadata
excerpt: "Brief description of the post content"
wordCount: 521

# Categorization
categories: ["blog", "research"]
tags: ["cystic fibrosis", "gamification", "physiotherapy"]

# Author information
author: "will-jackson"

# Media
featuredImage: 
  src: "/assets/blog/2024/featured-image.jpg"
  alt: "Image description"
  caption: "Optional caption"

# Special flags
featured: true # replaces WordPress sticky posts
hasShortcodes: true # indicates rich content components

# SEO
metaDescription: "SEO description"
metaKeywords: ["keyword1", "keyword2"]

# Social sharing
socialImage: "/assets/blog/2024/social-share.jpg"
---
```

### Categories (`src/content/categories/*.md`)

```yaml
---
name: "Blog"
slug: "blog"
description: "In-depth articles and insights"
color: "#3B82F6" # for UI theming
postCount: 4 # auto-calculated
---
```

### Tags (`src/content/tags/*.md`)

```yaml
---
name: "Cystic Fibrosis"
slug: "cystic-fibrosis"
description: "Content related to cystic fibrosis treatment and research"
postCount: 3 # auto-calculated
---
```

### Authors (`src/content/authors/*.md`)

```yaml
---
name: "Will Jackson"
slug: "will-jackson"
email: "will@playphysio.com"
bio: "Founder and CEO of PlayPhysio"
avatar: "/assets/authors/will-jackson.jpg"
social:
  twitter: "@willjackson"
  linkedin: "willjackson"
---
```

## Content Components

### Rich Content Elements (replacing WordPress shortcodes)

#### 1. KeyInsight Component
```astro
<!-- Usage in markdown -->
<KeyInsight icon="💡" title="Important Point">
Your insight content here
</KeyInsight>
```

#### 2. StatsCards Component
```astro
<StatsCards>
  <Stat value="94%" label="Therapy Adherence Rate" color="cyan" />
  <Stat value="67%" label="Improvement in Lung Function" color="emerald" />
  <Stat value="89%" label="Families Found Therapy Enjoyable" color="purple" />
</StatsCards>
```

#### 3. Quote Component
```astro
<Quote author="Dr. Michael Rodriguez" title="Children's Hospital of Philadelphia">
PlayPhysio has transformed our approach to pediatric respiratory therapy.
</Quote>
```

#### 4. Callout Component
```astro
<Callout type="info" title="Important Note">
Your callout content here
</Callout>
```

#### 5. References Component
```astro
<References>
1. Smith, J. et al. (2023). "Gamification in Healthcare"
2. Johnson, A. (2022). "Pediatric Respiratory Therapy"
</References>
```

## Content Processing Utilities

### File: `src/content/index.ts`

```typescript
import { z, defineCollection } from 'astro:content';

// Blog posts collection
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.date(),
    status: z.enum(['draft', 'published', 'archived']),
    excerpt: z.string(),
    categories: z.array(z.string()),
    tags: z.array(z.string()),
    author: z.string(),
    featuredImage: z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    }).optional(),
    featured: z.boolean().default(false),
    hasShortcodes: z.boolean().default(false),
  }),
});

// Categories collection
const categoriesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    color: z.string().optional(),
  }),
});

// Tags collection
const tagsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
  }),
});

// Authors collection
const authorsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    email: z.string().email(),
    bio: z.string(),
    avatar: z.string().optional(),
    social: z.object({
      twitter: z.string().optional(),
      linkedin: z.string().optional(),
    }).optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  categories: categoriesCollection,
  tags: tagsCollection,
  authors: authorsCollection,
};
```

## Migration Benefits

### What We Gain:
1. **No WordPress dependency** - Eliminate local server requirement
2. **Version control** - All content tracked in Git
3. **Type safety** - Zod schema validation
4. **Better performance** - No API calls during build
5. **Simplified deployment** - Just build and upload dist/

### What We Preserve:
1. **Rich content** - All shortcodes become Astro components
2. **Categorization** - Categories and tags maintained
3. **Featured posts** - Sticky posts become `featured: true`
4. **SEO** - All metadata preserved and enhanced
5. **Images** - Organized in assets directory

## Next Steps

1. Create the directory structure
2. Build the Astro components for rich content
3. Set up content collections and utilities
4. Migrate existing WordPress content
5. Update Astro pages to use new content system
