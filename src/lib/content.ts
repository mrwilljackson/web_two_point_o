/**
 * Content processing utilities for FrontMatter CMS
 * Replaces WordPress API functionality with file-based content management
 */

import { getCollection, type CollectionEntry } from 'astro:content';

// Type definitions
export type BlogPost = CollectionEntry<'blog'>;
export type Category = CollectionEntry<'categories'>;
export type Tag = CollectionEntry<'tags'>;
export type Author = CollectionEntry<'authors'>;

/**
 * Get all published blog posts, sorted by date (newest first)
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return data.status === 'published';
  });
  
  return posts.sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllPosts();
  return posts.find(post => post.data.slug === slug || post.slug === slug);
}

/**
 * Get featured/sticky posts
 */
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter(post => post.data.featured === true);
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter(post => 
    post.data.categories.includes(categorySlug)
  );
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tagSlug: string): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter(post => 
    post.data.tags.includes(tagSlug)
  );
}

/**
 * Get all categories with post counts
 */
export async function getAllCategories(): Promise<(Category & { postCount: number })[]> {
  const [categories, posts] = await Promise.all([
    getCollection('categories'),
    getAllPosts()
  ]);
  
  return categories.map(category => {
    const postCount = posts.filter(post => 
      post.data.categories.includes(category.data.slug)
    ).length;
    
    return {
      ...category,
      postCount
    };
  });
}

/**
 * Get all tags with post counts
 */
export async function getAllTags(): Promise<(Tag & { postCount: number })[]> {
  const [tags, posts] = await Promise.all([
    getCollection('tags'),
    getAllPosts()
  ]);
  
  return tags.map(tag => {
    const postCount = posts.filter(post => 
      post.data.tags.includes(tag.data.slug)
    ).length;
    
    return {
      ...tag,
      postCount
    };
  });
}

/**
 * Get category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const categories = await getCollection('categories');
  return categories.find(category => category.data.slug === slug);
}

/**
 * Get tag by slug
 */
export async function getTagBySlug(slug: string): Promise<Tag | undefined> {
  const tags = await getCollection('tags');
  return tags.find(tag => tag.data.slug === slug);
}

/**
 * Get author by slug
 */
export async function getAuthorBySlug(slug: string): Promise<Author | undefined> {
  const authors = await getCollection('authors');
  return authors.find(author => author.data.slug === slug);
}

/**
 * Get recent posts (for homepage, etc.)
 */
export async function getRecentPosts(limit: number = 3): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

/**
 * Generate excerpt from content if not provided
 */
export function generateExcerpt(content: string, maxLength: number = 160): string {
  // Remove HTML/markdown tags and get plain text
  const plainText = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/\[([^\]]*)\]/g, '') // Remove markdown links
    .replace(/[#*_`]/g, '') // Remove markdown formatting
    .trim();
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  // Find the last complete word within the limit
  const truncated = plainText.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  if (lastSpaceIndex > 0) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }
  
  return truncated + '...';
}

/**
 * Format date for display
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Generate SEO-friendly slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Get related posts based on shared categories/tags
 */
export async function getRelatedPosts(post: BlogPost, limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();

  // Filter out the current post
  const otherPosts = allPosts.filter(p => p.data.slug !== post.data.slug);

  // Score posts based on shared categories and tags
  const scoredPosts = otherPosts.map(otherPost => {
    let score = 0;

    // Score for shared categories (higher weight)
    const sharedCategories = post.data.categories.filter(cat =>
      otherPost.data.categories.includes(cat)
    );
    score += sharedCategories.length * 3;

    // Score for shared tags
    const sharedTags = post.data.tags.filter(tag =>
      otherPost.data.tags.includes(tag)
    );
    score += sharedTags.length * 1;

    return { post: otherPost, score };
  });

  // Sort by score and return top results
  return scoredPosts
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}

/**
 * Search posts by title or content
 */
export async function searchPosts(query: string): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  const searchTerm = query.toLowerCase();

  return posts.filter(post => {
    const title = post.data.title.toLowerCase();
    const excerpt = post.data.excerpt.toLowerCase();
    const categories = post.data.categories.join(' ').toLowerCase();
    const tags = post.data.tags.join(' ').toLowerCase();

    return title.includes(searchTerm) ||
           excerpt.includes(searchTerm) ||
           categories.includes(searchTerm) ||
           tags.includes(searchTerm);
  });
}

/**
 * Get posts for a specific year
 */
export async function getPostsByYear(year: number): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.filter(post => {
    const postYear = new Date(post.data.date).getFullYear();
    return postYear === year;
  });
}

/**
 * Get all unique years that have posts
 */
export async function getPostYears(): Promise<number[]> {
  const posts = await getAllPosts();
  const years = posts.map(post => new Date(post.data.date).getFullYear());
  return [...new Set(years)].sort((a, b) => b - a);
}
