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
│   ├── favicon.svg
│   └── images/blog/              # Local blog images organized by year
├── src/
│   ├── content/
│   │   ├── blog/                 # FrontMatter blog posts (.mdx files)
│   │   ├── authors/              # Author profiles
│   │   ├── categories/           # Category definitions
│   │   └── tags/                 # Tag definitions
│   ├── lib/
│   │   ├── content.ts            # FrontMatter content utilities
│   │   └── utils.ts              # General utilities
│   ├── components/
│   │   ├── content/              # Blog content components (Quote, Stats, etc.)
│   │   └── ...                   # Other UI components
│   └── pages/
│       ├── index.astro           # Homepage (fully static)
│       ├── 404.astro             # 404 page with featured content
│       └── blog/
│           ├── index.astro       # Blog listing page
│           └── [...slug].astro   # Individual blog posts
├── scripts/                      # Migration and utility scripts
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

### Content Management
The `src/lib/content.ts` file provides FrontMatter content utilities for:
- Fetching published blog posts
- Getting featured posts
- Filtering by categories and tags
- Formatting dates
- Processing content components

### Content Components
The `src/components/content/` directory contains reusable blog components:
- KeyInsight panels with colored backgrounds
- StatsCards for displaying metrics
- Quote components with author attribution
- References for academic citations
- Interactive inline references

## 🚀 Deployment

### Static Site Deployment
1. **Add new content**: Create `.mdx` files in `src/content/blog/YYYY/`
2. **Add images**: Place in `public/images/blog/YYYY/`
3. **Build the site**: `npm run build`
4. **Deploy**: Upload the `dist/` folder to your hosting provider

### Hosting Options
- **FTP Upload**: Upload `dist/` contents to your web server
- **GitHub Pages**: Deploy `dist/` folder to GitHub Pages
- **Netlify/Vercel**: Connect your repository for automatic deployments
- **Any static hosting**: The site is fully static and works anywhere

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

1. **Missing Content**: Check that `.mdx` files exist in `src/content/blog/`
2. **Image Issues**: Verify images are in `public/images/blog/` and paths are correct
3. **Build Issues**: Run `npm run dev` to test locally before building

### Content Management Workflow

1. **Create new posts**: Add `.mdx` files in `src/content/blog/YYYY/`
2. **Add frontmatter**: Include title, date, excerpt, categories, etc.
3. **Add images**: Place in `public/images/blog/YYYY/` and reference in frontmatter
4. **Use components**: Import and use Quote, StatsCards, References, etc.
5. **Test locally**: Run `npm run dev` to preview changes
6. **Build and deploy**: Run `npm run build` then upload `dist/`

## 📚 Documentation

For comprehensive documentation, guides, and references, visit the **[docs/](docs/)** directory:

- **[Complete Documentation Index](docs/README.md)** - Overview of all available documentation
- **[Shortcodes Guide](docs/SHORTCODES_GUIDE.md)** - Rich content elements for blog posts
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Production deployment instructions
- **[Category System](docs/CATEGORY_SYSTEM_README.md)** - Blog organization and filtering
- **[Image Handling](docs/IMAGE_HANDLING_GUIDE.md)** - Image optimization and processing
- **[Favicon Setup](docs/FAVICON_README.md)** - Brand consistency and favicon management
- **[Sticky Posts](docs/STICKY_POSTS_FEATURE.md)** - Featured posts management

## 📚 Learn More

- [Astro Documentation](https://docs.astro.build)
- [WordPress REST API Handbook](https://developer.wordpress.org/rest-api/)
- [WordPress Application Passwords](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/)

## 🤝 Contributing

Feel free to submit issues and enhancement requests! When contributing, please update the relevant documentation in the [docs/](docs/) directory.
