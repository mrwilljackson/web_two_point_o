import { z, defineCollection } from 'astro:content';

// Blog posts collection
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // Required fields
    title: z.string(),
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

    // Rich content UI elements
    keyInsights: z.array(z.object({
      id: z.string(),
      icon: z.string().optional(),
      title: z.string().optional(),
      content: z.string(),
    })).optional(),

    statsCards: z.array(z.object({
      id: z.string(),
      stats: z.array(z.object({
        value: z.string(),
        label: z.string(),
        color: z.enum(['cyan', 'emerald', 'purple', 'blue', 'green', 'indigo', 'pink', 'yellow', 'red']).optional(),
      })),
    })).optional(),

    quotes: z.array(z.object({
      id: z.string(),
      author: z.string(),
      title: z.string().optional(),
      content: z.string(),
    })).optional(),

    callouts: z.array(z.object({
      id: z.string(),
      type: z.enum(['info', 'warning', 'success', 'error']).optional(),
      title: z.string().optional(),
      content: z.string(),
    })).optional(),

    references: z.array(z.object({
      id: z.string(),
      content: z.string(),
    })).optional(),

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
    description: z.string(),
    postCount: z.number().optional(), // auto-calculated
  }),
});

// Authors collection
const authorsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
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
