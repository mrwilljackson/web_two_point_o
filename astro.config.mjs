// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// Load environment variables
const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: env.SITE_URL || 'https://yourdomain.com',

  build: {
    format: 'directory',
  },

  vite: {
    define: {
      'process.env.WORDPRESS_URL': JSON.stringify(env.WORDPRESS_URL),
      'process.env.WORDPRESS_USERNAME': JSON.stringify(env.WORDPRESS_USERNAME),
      'process.env.WORDPRESS_PASSWORD': JSON.stringify(env.WORDPRESS_PASSWORD),
      'process.env.WORDPRESS_APP_PASSWORD': JSON.stringify(env.WORDPRESS_APP_PASSWORD),
      'process.env.SITE_URL': JSON.stringify(env.SITE_URL),
      'process.env.SITE_NAME': JSON.stringify(env.SITE_NAME),
    },

    plugins: [tailwindcss()],
  },

  integrations: [react()],
});