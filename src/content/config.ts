import { z, defineCollection } from 'astro:content';

// Blog posts collection
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Required fields
    title: z.string(),
    slug: z.string(),
    date: z.date(),
    status: z.enum(['draft', 'published', 'archived']).default('published'),
    
    // Content metadata
    excerpt: z.string(),
    wordCount: z.number().optional(),
    
    // Categorization
    categories: z.array(z.string()),
    tags: z.array(z.string()),
    
    // Author information
    author: z.string().default('will-jackson'),
    
    // Media
    featuredImage: z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    }).optional(),
    
    // Special flags
    featured: z.boolean().default(false), // replaces WordPress sticky posts
    hasShortcodes: z.boolean().default(false), // indicates rich content components
    
    // SEO
    metaDescription: z.string().optional(),
    metaKeywords: z.array(z.string()).optional(),
    
    // Social sharing
    socialImage: z.string().optional(),
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
    postCount: z.number().optional(), // auto-calculated
  }),
});

// Tags collection
const tagsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    postCount: z.number().optional(), // auto-calculated
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
      website: z.string().optional(),
    }).optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  categories: categoriesCollection,
  tags: tagsCollection,
  authors: authorsCollection,
};
