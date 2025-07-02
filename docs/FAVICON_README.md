# Playphysio Favicon Setup

## 🎨 Design Elements

The Playphysio favicon uses the **official Playphysio P logo** design:

### **Colors**
- **Brand Purple**: `#812C7C` (official Playphysio brand color)
- **White**: `#FFFFFF` (for the P design)

### **Design Features**
- **Official P Logo**: Exact reproduction of the Playphysio P logo from `src/assets/playphysio-p-logo.svg`
- **Rounded Rectangle**: Matches the official logo's rounded corner design
- **Brand Consistency**: 100% faithful to the official brand identity
- **Optimized Scaling**: Adjusted for maximum visibility at small favicon sizes

## 📁 Files Included

- `favicon.svg` - Vector version (scalable, modern browsers)
- `favicon.png` - 32x32 PNG version (fallback)
- `favicon.ico` - 16x16 ICO version (legacy browsers)
- `site.webmanifest` - PWA manifest for app-like experience

## 🔧 Implementation

The favicon is implemented in `src/layouts/Layout.astro` with proper fallbacks:

```html
<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" href="/favicon.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
<link rel="manifest" href="/site.webmanifest" />
```

## 🎯 Browser Support

- **Modern browsers**: Use SVG version for crisp scaling
- **Older browsers**: Fall back to PNG version
- **Legacy browsers**: Use ICO version
- **Mobile devices**: Use PNG for app icons

## 🔄 Updating the Favicon

To update the favicon:

1. Edit `public/favicon.svg` for the main design
2. Generate new PNG/ICO versions using the provided HTML generator
3. Update colors in `site.webmanifest` if brand colors change

The favicon perfectly represents PlayPhysio's mission of making respiratory therapy engaging and accessible through gamification! 🎮💨
