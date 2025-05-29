#!/usr/bin/env node

import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testWordPressConnection() {
  console.log('🔄 Testing WordPress connection...\n');

  // Display configuration
  const wpUrl = process.env.WORDPRESS_URL || 'http://localhost:8080';
  const username = process.env.WORDPRESS_USERNAME;
  const password = process.env.WORDPRESS_PASSWORD;
  const appPassword = process.env.WORDPRESS_APP_PASSWORD;

  console.log('Configuration:');
  console.log(`  WordPress URL: ${wpUrl}`);
  console.log(`  Username: ${username || 'Not set'}`);
  console.log(`  Password: ${password ? '***' : 'Not set'}`);
  console.log(`  App Password: ${appPassword ? '***' : 'Not set'}`);
  console.log('');

  // Create axios instance
  const api = axios.create({
    baseURL: `${wpUrl}/wp-json/wp/v2`,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add authentication
  if (appPassword) {
    api.defaults.headers.common['Authorization'] = `Bearer ${appPassword}`;
  } else if (username && password) {
    api.defaults.auth = { username, password };
  }

  try {
    // Test basic connection
    console.log('🔄 Testing basic connection...');
    await api.get('/');
    console.log('✅ WordPress connection successful');

    // Test fetching posts
    console.log('🔄 Fetching posts...');
    const postsResponse = await api.get('/posts', { params: { per_page: 5, _embed: true } });
    const posts = postsResponse.data;
    const totalPosts = postsResponse.headers['x-wp-total'] || posts.length;
    console.log(`✅ Found ${totalPosts} posts (showing first ${posts.length})`);

    posts.forEach((post, index) => {
      console.log(`  ${index + 1}. ${post.title.rendered} (${post.slug})`);
    });
    console.log('');

    // Test fetching pages
    console.log('🔄 Fetching pages...');
    const pagesResponse = await api.get('/pages', { params: { per_page: 5, _embed: true } });
    const pages = pagesResponse.data;
    const totalPages = pagesResponse.headers['x-wp-total'] || pages.length;
    console.log(`✅ Found ${totalPages} pages (showing first ${pages.length})`);

    pages.forEach((page, index) => {
      console.log(`  ${index + 1}. ${page.title.rendered} (${page.slug})`);
    });
    console.log('');

    // Test fetching categories
    console.log('🔄 Fetching categories...');
    const categoriesResponse = await api.get('/categories', { params: { per_page: 100 } });
    const categories = categoriesResponse.data;
    console.log(`✅ Found ${categories.length} categories`);

    categories.slice(0, 5).forEach((category, index) => {
      console.log(`  ${index + 1}. ${category.name} (${category.count} posts)`);
    });
    console.log('');

    // Test fetching tags
    console.log('🔄 Fetching tags...');
    const tagsResponse = await api.get('/tags', { params: { per_page: 100 } });
    const tags = tagsResponse.data;
    console.log(`✅ Found ${tags.length} tags`);

    tags.slice(0, 5).forEach((tag, index) => {
      console.log(`  ${index + 1}. ${tag.name} (${tag.count} posts)`);
    });
    console.log('');

    // Test fetching users
    console.log('🔄 Fetching users...');
    const usersResponse = await api.get('/users', { params: { per_page: 100 } });
    const users = usersResponse.data;
    console.log(`✅ Found ${users.length} users`);

    users.slice(0, 3).forEach((user, index) => {
      console.log(`  ${index + 1}. ${user.name} (${user.slug})`);
    });
    console.log('');

    // Test fetching media
    console.log('🔄 Fetching media...');
    const mediaResponse = await api.get('/media', { params: { per_page: 5 } });
    const media = mediaResponse.data;
    console.log(`✅ Found ${media.length} media items`);

    media.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item.title.rendered} (${item.mime_type})`);
    });
    console.log('');

    console.log('🎉 All tests passed! Your WordPress connection is working correctly.');
    console.log('');
    console.log('Next steps:');
    console.log('1. Copy .env.example to .env and configure your WordPress settings');
    console.log('2. Run "npm run build" to generate your static site');
    console.log('3. Run "npm run preview" to preview the generated site');

  } catch (error) {
    console.error('❌ Error during testing:', error.message);

    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }

    console.log('\nTroubleshooting tips:');
    console.log('1. Make sure your WordPress site is running and accessible');
    console.log('2. Check that the WordPress REST API is enabled');
    console.log('3. Verify your credentials are correct');
    console.log('4. If using application passwords, make sure they are enabled in WordPress');
    console.log('5. Check for any CORS issues if running on different domains');

    process.exit(1);
  }
}

// Run the test
testWordPressConnection();
