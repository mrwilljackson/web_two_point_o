# 📋 WordPress Proxy Setup - Todo List

## 🎯 Overview

This guide covers setting up a WordPress instance on a separate host while maintaining your static Astro site, using proxy forwarding to make it appear as a seamless subdirectory.

**Architecture:**
- **Main site:** `yourdomain.com` → Vercel (Static Astro)
- **WordPress:** `yourdomain.com/wordpress/` → Separate hosting (Proxied)

---

## ✅ **Phase 1: Planning & Preparation**

### **1.1 Choose URL Structure**
- [ ] **Decide WordPress subdirectory path** (recommended: `/wordpress/`, `/cms/`, or `/admin/`)
- [ ] **Verify no URL conflicts** with existing Astro routes:
  - ❌ Don't use `/blog/` (already used by Astro)
  - ❌ Don't use `/` (Astro homepage)
  - ❌ Don't use `/_astro/` or `/images/` (Astro assets)
  - ✅ Safe options: `/wordpress/`, `/cms/`, `/wp/`, `/admin/`, `/backend/`

### **1.2 Choose Hosting Strategy**
- [ ] **Option A:** Traditional hosting with subdirectory installation
- [ ] **Option B:** Separate WordPress hosting + proxy forwarding
- [ ] **Option C:** Same server, different directory (if using VPS/dedicated)

### **1.3 Domain & DNS Planning**
- [ ] **Confirm domain ownership** and DNS access
- [ ] **Plan subdomain strategy** (optional: `cms.yourdomain.com` as intermediate)
- [ ] **SSL certificate planning** for WordPress subdirectory

---

## 🚀 **Phase 2: WordPress Hosting Setup**

### **2.1 WordPress Installation**
- [ ] **Choose WordPress hosting provider:**
  - Traditional shared hosting (cPanel)
  - WordPress-specific hosting (WP Engine, Kinsta)
  - VPS/Cloud hosting (DigitalOcean, AWS)
  - Local development (XAMPP, Local by Flywheel)

- [ ] **Install WordPress:**
  ```bash
  # If using cPanel/traditional hosting:
  # 1. Create subdirectory: /public_html/wordpress/
  # 2. Upload WordPress files
  # 3. Run installation wizard
  
  # If using WordPress hosting:
  # 1. Create new WordPress instance
  # 2. Configure for subdirectory access
  ```

- [ ] **Configure WordPress settings:**
  - [ ] Set **WordPress Address (URL):** `https://your-wp-host.com/wordpress/`
  - [ ] Set **Site Address (URL):** `https://yourdomain.com/wordpress/`
  - [ ] Update `.htaccess` for subdirectory operation
  - [ ] Configure database connection

### **2.2 WordPress Security & Configuration**
- [ ] **Install security plugins** (Wordfence, Sucuri)
- [ ] **Configure user accounts** and permissions
- [ ] **Set up SSL certificate** for WordPress host
- [ ] **Configure WordPress for proxy operation:**
  ```php
  // Add to wp-config.php
  define('WP_HOME','https://yourdomain.com/wordpress');
  define('WP_SITEURL','https://yourdomain.com/wordpress');
  
  // Handle proxy headers
  if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
      $_SERVER['HTTPS'] = 'on';
  }
  ```

---

## 🌐 **Phase 3: Proxy Configuration**

### **3.1 Vercel Proxy Setup (Recommended)**
- [ ] **Create `vercel.json` in your main project root:**
  ```json
  {
    "rewrites": [
      {
        "source": "/wordpress/(.*)",
        "destination": "https://your-wordpress-host.com/wordpress/$1"
      },
      {
        "source": "/wp-admin/(.*)",
        "destination": "https://your-wordpress-host.com/wp-admin/$1"
      },
      {
        "source": "/wp-content/(.*)",
        "destination": "https://your-wordpress-host.com/wp-content/$1"
      },
      {
        "source": "/wp-includes/(.*)",
        "destination": "https://your-wordpress-host.com/wp-includes/$1"
      }
    ]
  }
  ```

- [ ] **Test proxy configuration:**
  ```bash
  # Deploy to Vercel with proxy config
  vercel --prod
  
  # Test URLs:
  # https://yourdomain.com/wordpress/ → Should show WordPress
  # https://yourdomain.com/wp-admin/ → Should show WordPress admin
  ```

### **3.2 Alternative: Cloudflare Proxy**
- [ ] **Set up Cloudflare account** and add domain
- [ ] **Configure Page Rules:**
  ```
  Rule 1: yourdomain.com/wordpress/*
  → Forwarding URL (301): https://your-wp-host.com/wordpress/$1
  
  Rule 2: yourdomain.com/wp-admin/*
  → Forwarding URL (301): https://your-wp-host.com/wp-admin/$1
  ```

### **3.3 Alternative: Traditional Server Proxy**
- [ ] **Configure Apache/Nginx proxy** (if using VPS):
  ```apache
  # Apache .htaccess
  RewriteEngine On
  RewriteRule ^wordpress/(.*)$ https://your-wp-host.com/wordpress/$1 [P,L]
  RewriteRule ^wp-admin/(.*)$ https://your-wp-host.com/wp-admin/$1 [P,L]
  ```
  
  ```nginx
  # Nginx configuration
  location /wordpress/ {
      proxy_pass https://your-wp-host.com/wordpress/;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
  }
  ```

---

## 🔧 **Phase 4: Integration & Testing**

### **4.1 WordPress Theme Configuration**
- [ ] **Install/configure WordPress theme**
- [ ] **Match branding** to main Astro site:
  - [ ] Use same fonts (if possible)
  - [ ] Match color scheme
  - [ ] Use same logo/branding elements
  - [ ] Configure navigation to link back to main site

### **4.2 Cross-Site Navigation**
- [ ] **Add WordPress link to Astro site:**
  ```html
  <!-- In Astro navigation -->
  <a href="/wordpress/">Admin</a>
  <a href="/wordpress/">CMS</a>
  ```

- [ ] **Add main site links to WordPress:**
  ```php
  // In WordPress theme
  <a href="/">Home</a>
  <a href="/blog/">Blog</a>
  ```

### **4.3 Testing Checklist**
- [ ] **Test main site functionality:**
  - [ ] Homepage loads correctly
  - [ ] Blog section works
  - [ ] All Astro features functional
  - [ ] No broken links or assets

- [ ] **Test WordPress functionality:**
  - [ ] WordPress admin accessible at `/wp-admin/`
  - [ ] WordPress frontend accessible at `/wordpress/`
  - [ ] All WordPress features work
  - [ ] Media uploads work correctly
  - [ ] Plugins function properly

- [ ] **Test proxy functionality:**
  - [ ] URLs appear seamless (same domain)
  - [ ] SSL certificates work for both
  - [ ] No CORS or security issues
  - [ ] Performance is acceptable

---

## 🚨 **Phase 5: Security & Maintenance**

### **5.1 Security Configuration**
- [ ] **WordPress security hardening:**
  - [ ] Change default admin username
  - [ ] Use strong passwords
  - [ ] Install security plugins
  - [ ] Configure firewall rules
  - [ ] Hide wp-admin from unauthorized access

- [ ] **Proxy security:**
  - [ ] Configure proper headers
  - [ ] Set up rate limiting
  - [ ] Monitor for proxy abuse
  - [ ] Implement IP restrictions if needed

### **5.2 Backup Strategy**
- [ ] **Astro site backups:**
  - [ ] Git repository (already handled)
  - [ ] Vercel deployment history
  - [ ] Local project backups

- [ ] **WordPress backups:**
  - [ ] Database backups (automated)
  - [ ] File system backups
  - [ ] Plugin for automated backups
  - [ ] Test restore procedures

### **5.3 Monitoring & Maintenance**
- [ ] **Set up monitoring:**
  - [ ] Uptime monitoring for both sites
  - [ ] Performance monitoring
  - [ ] Error logging and alerts
  - [ ] Security monitoring

- [ ] **Regular maintenance schedule:**
  - [ ] WordPress updates (core, themes, plugins)
  - [ ] Security scans
  - [ ] Performance optimization
  - [ ] Backup verification

---

## 📚 **Phase 6: Documentation & Handoff**

### **6.1 Create Documentation**
- [ ] **Document the setup** for future reference
- [ ] **Create user guides** for WordPress admin
- [ ] **Document proxy configuration** and troubleshooting
- [ ] **Create maintenance procedures**

### **6.2 Training & Access**
- [ ] **Set up user accounts** for content managers
- [ ] **Provide training** on WordPress admin
- [ ] **Document content workflow** between static and dynamic content
- [ ] **Create emergency procedures** for issues

---

## 🎯 **Success Criteria**

### **Technical Requirements:**
- ✅ Main Astro site loads fast and functions perfectly
- ✅ WordPress accessible at chosen subdirectory URL
- ✅ Proxy forwarding works seamlessly
- ✅ SSL certificates work for all URLs
- ✅ No URL conflicts between systems
- ✅ Both systems can be maintained independently

### **User Experience:**
- ✅ Seamless navigation between static and dynamic content
- ✅ Consistent branding across both systems
- ✅ Fast loading times maintained
- ✅ Mobile responsiveness on both systems
- ✅ Search engines can index both appropriately

---

## 🚀 **Quick Start Commands**

### **Deploy Astro with Proxy:**
```bash
# Add vercel.json to project root
# Commit and push
git add vercel.json
git commit -m "Add WordPress proxy configuration"
git push origin master

# Deploy to Vercel
vercel --prod
```

### **Test Proxy Setup:**
```bash
# Test main site
curl -I https://yourdomain.com/

# Test WordPress proxy
curl -I https://yourdomain.com/wordpress/

# Test admin proxy
curl -I https://yourdomain.com/wp-admin/
```

---

**This setup gives you the best of both worlds: static site performance with dynamic WordPress capabilities!** 🎊✨
