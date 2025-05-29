import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import type {
  WordPressPost,
  WordPressPage,
  WordPressCategory,
  WordPressTag,
  WordPressUser,
  WordPressMedia,
  WordPressMenu,
  WordPressMenuItem,
  WordPressConfig,
  WordPressAPIResponse
} from '../types/wordpress';

export class WordPressAPI {
  private client: AxiosInstance;
  private config: WordPressConfig;

  constructor(config: WordPressConfig) {
    this.config = config;

    // Create axios instance with base configuration
    this.client = axios.create({
      baseURL: `${config.baseUrl}/wp-json/wp/v2`,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add authentication if provided
    if (config.applicationPassword) {
      this.client.defaults.headers.common['Authorization'] =
        `Bearer ${config.applicationPassword}`;
    } else if (config.username && config.password) {
      this.client.defaults.auth = {
        username: config.username,
        password: config.password,
      };
    }

    // Add request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        console.log(`Making request to: ${config.url}`);
        return config;
      },
      (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Get all posts with pagination support
   */
  async getPosts(params: {
    page?: number;
    per_page?: number;
    search?: string;
    categories?: number[];
    tags?: number[];
    status?: string;
    orderby?: string;
    order?: 'asc' | 'desc';
    _embed?: boolean;
  } = {}): Promise<WordPressAPIResponse<WordPressPost>> {
    const defaultParams = {
      page: 1,
      per_page: 100,
      status: 'publish',
      _embed: true,
      ...params,
    };

    const response: AxiosResponse<WordPressPost[]> = await this.client.get('/posts', {
      params: defaultParams,
    });

    return {
      data: response.data,
      total: parseInt(response.headers['x-wp-total'] || '0'),
      totalPages: parseInt(response.headers['x-wp-totalpages'] || '0'),
    };
  }

  /**
   * Get all posts (handles pagination automatically)
   */
  async getAllPosts(params: Omit<Parameters<typeof this.getPosts>[0], 'page'> = {}): Promise<WordPressPost[]> {
    const allPosts: WordPressPost[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await this.getPosts({ ...params, page });
      allPosts.push(...response.data);

      hasMore = page < response.totalPages;
      page++;
    }

    return allPosts;
  }

  /**
   * Get a single post by slug
   */
  async getPostBySlug(slug: string): Promise<WordPressPost | null> {
    try {
      const response = await this.getPosts({
        slug: slug as any,
        per_page: 1,
        _embed: true
      });
      return response.data[0] || null;
    } catch (error) {
      console.error(`Error fetching post with slug ${slug}:`, error);
      return null;
    }
  }

  /**
   * Get all pages with pagination support
   */
  async getPages(params: {
    page?: number;
    per_page?: number;
    search?: string;
    parent?: number;
    status?: string;
    orderby?: string;
    order?: 'asc' | 'desc';
    _embed?: boolean;
  } = {}): Promise<WordPressAPIResponse<WordPressPage>> {
    const defaultParams = {
      page: 1,
      per_page: 100,
      status: 'publish',
      _embed: true,
      ...params,
    };

    const response: AxiosResponse<WordPressPage[]> = await this.client.get('/pages', {
      params: defaultParams,
    });

    return {
      data: response.data,
      total: parseInt(response.headers['x-wp-total'] || '0'),
      totalPages: parseInt(response.headers['x-wp-totalpages'] || '0'),
    };
  }

  /**
   * Get all pages (handles pagination automatically)
   */
  async getAllPages(params: Omit<Parameters<typeof this.getPages>[0], 'page'> = {}): Promise<WordPressPage[]> {
    const allPages: WordPressPage[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await this.getPages({ ...params, page });
      allPages.push(...response.data);

      hasMore = page < response.totalPages;
      page++;
    }

    return allPages;
  }

  /**
   * Get a single page by slug
   */
  async getPageBySlug(slug: string): Promise<WordPressPage | null> {
    try {
      const response = await this.getPages({
        slug: slug as any,
        per_page: 1,
        _embed: true
      });
      return response.data[0] || null;
    } catch (error) {
      console.error(`Error fetching page with slug ${slug}:`, error);
      return null;
    }
  }

  /**
   * Get all categories
   */
  async getCategories(params: {
    page?: number;
    per_page?: number;
    search?: string;
    parent?: number;
    orderby?: string;
    order?: 'asc' | 'desc';
  } = {}): Promise<WordPressCategory[]> {
    const defaultParams = {
      per_page: 100,
      ...params,
    };

    const response: AxiosResponse<WordPressCategory[]> = await this.client.get('/categories', {
      params: defaultParams,
    });

    return response.data;
  }

  /**
   * Get all tags
   */
  async getTags(params: {
    page?: number;
    per_page?: number;
    search?: string;
    orderby?: string;
    order?: 'asc' | 'desc';
  } = {}): Promise<WordPressTag[]> {
    const defaultParams = {
      per_page: 100,
      ...params,
    };

    const response: AxiosResponse<WordPressTag[]> = await this.client.get('/tags', {
      params: defaultParams,
    });

    return response.data;
  }

  /**
   * Get all users
   */
  async getUsers(params: {
    page?: number;
    per_page?: number;
    search?: string;
    orderby?: string;
    order?: 'asc' | 'desc';
  } = {}): Promise<WordPressUser[]> {
    const defaultParams = {
      per_page: 100,
      ...params,
    };

    const response: AxiosResponse<WordPressUser[]> = await this.client.get('/users', {
      params: defaultParams,
    });

    return response.data;
  }

  /**
   * Get media items
   */
  async getMedia(params: {
    page?: number;
    per_page?: number;
    search?: string;
    media_type?: string;
    mime_type?: string;
    orderby?: string;
    order?: 'asc' | 'desc';
  } = {}): Promise<WordPressMedia[]> {
    const defaultParams = {
      per_page: 100,
      ...params,
    };

    const response: AxiosResponse<WordPressMedia[]> = await this.client.get('/media', {
      params: defaultParams,
    });

    return response.data;
  }

  /**
   * Get menus (requires menu endpoints plugin or custom implementation)
   */
  async getMenus(): Promise<WordPressMenu[]> {
    try {
      const response: AxiosResponse<WordPressMenu[]> = await this.client.get('/menus');
      return response.data;
    } catch (error) {
      console.warn('Menus endpoint not available. Install WP REST API Menus plugin for menu support.');
      return [];
    }
  }

  /**
   * Get menu items for a specific menu
   */
  async getMenuItems(menuId: number): Promise<WordPressMenuItem[]> {
    try {
      const response: AxiosResponse<WordPressMenuItem[]> = await this.client.get(`/menu-items`, {
        params: { menus: menuId }
      });
      return response.data;
    } catch (error) {
      console.warn('Menu items endpoint not available. Install WP REST API Menus plugin for menu support.');
      return [];
    }
  }

  /**
   * Test the connection to WordPress
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.client.get('/');
      console.log('✅ WordPress connection successful');
      return true;
    } catch (error) {
      console.error('❌ WordPress connection failed:', error);
      return false;
    }
  }
}

// Create and export a configured instance
export function createWordPressAPI(): WordPressAPI {
  const config: WordPressConfig = {
    baseUrl: process.env.WORDPRESS_URL || 'http://localhost:8080',
    username: process.env.WORDPRESS_USERNAME,
    password: process.env.WORDPRESS_PASSWORD,
    applicationPassword: process.env.WORDPRESS_APP_PASSWORD,
  };

  return new WordPressAPI(config);
}

// Export default instance
export const wordpressAPI = createWordPressAPI();
