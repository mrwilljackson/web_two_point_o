# WordPress to Static Site Generator with Astro

This project generates static files from a locally hosted WordPress installation using Astro. The static files can then be uploaded via FTP to a live server or pushed to GitHub for deployment.

## 🚀 Features

- **WordPress Integration**: Fetches content from WordPress REST API
- **Static Site Generation**: Converts WordPress content to static HTML files
- **Dynamic Routes**: Automatically generates pages for posts, pages, categories, and tags
- **SEO Optimized**: Includes meta tags, Open Graph, and Twitter Card support
- **Responsive Design**: Mobile-friendly layouts with modern CSS
- **Content Processing**: Handles WordPress shortcodes, images, and formatting
- **TypeScript Support**: Fully typed WordPress API integration

## 📁 Project Structure

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── lib/
│   │   ├── wordpress.ts          # WordPress API client
│   │   └── content-utils.ts      # Content processing utilities
│   ├── types/
│   │   └── wordpress.ts          # TypeScript definitions
│   └── pages/
│       ├── index.astro           # Homepage (fetches from WordPress)
│       ├── [...slug].astro       # Dynamic pages
│       └── blog/
│           ├── index.astro       # Blog listing page
│           └── [...slug].astro   # Individual blog posts
├── scripts/
│   └── test-wordpress.js         # WordPress connection test
├── .env.example                  # Environment variables template
├── astro.config.mjs             # Astro configuration
└── package.json
```

## 🛠️ Setup Instructions

### 1. Environment Configuration

Copy the example environment file and configure your WordPress settings:

```bash
cp .env.example .env
```

Edit `.env` with your WordPress details:

```env
# WordPress Configuration
WORDPRESS_URL=http://localhost:8080
WORDPRESS_USERNAME=your_username
WORDPRESS_PASSWORD=your_password

# Optional: WordPress Application Password (recommended for security)
# WORDPRESS_APP_PASSWORD=your_app_password

# Site Configuration
SITE_URL=https://yourdomain.com
SITE_NAME=Your Site Name
```

### 2. WordPress Setup

Ensure your local WordPress installation:

1. **Has the REST API enabled** (enabled by default in WordPress 4.7+)
2. **Is accessible** at the URL specified in `WORDPRESS_URL`
3. **Has content** (posts, pages, categories, tags)

#### Authentication Options

**Option A: Username/Password**
- Use your WordPress admin username and password
- Less secure but simpler to set up

**Option B: Application Passwords (Recommended)**
- Go to WordPress Admin → Users → Your Profile
- Scroll to "Application Passwords"
- Create a new application password
- Use this in `WORDPRESS_APP_PASSWORD` instead of your regular password

### 3. Test WordPress Connection

Before building, test your WordPress connection:

```bash
npm run test:wordpress
```

This will verify:
- WordPress API accessibility
- Authentication credentials
- Available content (posts, pages, categories, tags, users, media)

### 4. Development

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:4321` to see your site.

### 5. Build Static Site

Generate static files:

```bash
npm run build
```

Or run the production build (includes WordPress connection test):

```bash
npm run build:production
```

Static files will be generated in the `dist/` directory.

### 6. Preview Built Site

Preview the static site locally:

```bash
npm run preview
```

## 🧞 Available Commands

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `npm install`              | Installs dependencies                            |
| `npm run dev`              | Starts local dev server at `localhost:4321`     |
| `npm run build`            | Build your production site to `./dist/`         |
| `npm run preview`          | Preview your build locally, before deploying    |
| `npm run test:wordpress`   | Test WordPress API connection                    |
| `npm run build:production` | Test WordPress connection and build             |

## 📄 Generated Pages

The system automatically generates the following pages:

### Static Routes
- `/` - Homepage (fetches WordPress page with slug "home" or "front-page")
- `/blog/` - Blog listing page with all posts

### Dynamic Routes
- `/blog/[slug]` - Individual blog posts
- `/[slug]` - WordPress pages (excluding home page)

### Future Enhancements (Not Yet Implemented)
- `/category/[slug]` - Category archive pages
- `/tag/[slug]` - Tag archive pages
- `/author/[slug]` - Author archive pages

## 🎨 Customization

### Styling
Each page includes embedded CSS for styling. You can:
- Modify the styles in each `.astro` file
- Extract styles to separate CSS files
- Add a CSS framework like Tailwind CSS

### Content Processing
The `src/lib/content-utils.ts` file contains utilities for:
- Processing WordPress shortcodes
- Cleaning WordPress-specific CSS classes
- Optimizing images
- Extracting excerpts
- Formatting dates

### WordPress API
The `src/lib/wordpress.ts` file provides a comprehensive API client with methods for:
- Fetching posts, pages, categories, tags, users, media
- Handling pagination
- Error handling and retry logic
- Authentication

## 🚀 Deployment

### Option 1: FTP Upload
1. Build the static site: `npm run build`
2. Upload the contents of `dist/` to your web server via FTP

### Option 2: GitHub Pages
1. Push your code to GitHub
2. Build the static site: `npm run build`
3. Deploy the `dist/` folder to GitHub Pages

### Option 3: Netlify/Vercel
1. Connect your repository to Netlify or Vercel
2. Set build command: `npm run build:production`
3. Set publish directory: `dist`
4. Add environment variables in the hosting platform

## 🔧 Troubleshooting

### WordPress Connection Issues

1. **Check WordPress URL**: Ensure your WordPress site is accessible
2. **Verify REST API**: Visit `{WORDPRESS_URL}/wp-json/wp/v2/posts` in your browser
3. **Check Credentials**: Verify username/password or application password
4. **CORS Issues**: If running on different domains, you may need CORS headers
5. **Firewall/Security**: Ensure no security plugins are blocking API access

### Build Issues

1. **Missing Content**: Run `npm run test:wordpress` to verify content is available
2. **Memory Issues**: For large sites, you may need to increase Node.js memory limit
3. **Timeout Issues**: Increase timeout values in `src/lib/wordpress.ts`

### Common WordPress Plugins for Enhanced Functionality

- **WP REST API Menus**: Adds menu endpoints to REST API
- **Advanced Custom Fields**: Adds custom field support to REST API
- **Yoast SEO**: Adds SEO data to REST API responses

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build)
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [WordPress Application Passwords](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/)

## 🤝 Contributing

Feel free to submit issues and enhancement requests!
