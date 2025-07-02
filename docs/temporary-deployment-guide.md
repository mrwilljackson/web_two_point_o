# 🚀 Temporary Deployment Guide

## 🎯 Overview

This guide covers the current temporary deployment setup using your personal GitHub repository and Vercel for hosting the static Playphysio website.

**Current Setup:**
- **Source:** Local Astro project
- **Repository:** https://github.com/mrwilljackson/web_two_point_o
- **Hosting:** Vercel (connected to personal GitHub account)
- **Domain:** Temporary Vercel domain (can be upgraded to custom domain)

---

## 📋 Current Architecture

### **Deployment Flow:**
```
Local Development
    ↓ (npm run build)
Static Files (dist/)
    ↓ (git push)
GitHub Repository (mrwilljackson/web_two_point_o)
    ↓ (auto-deploy)
Vercel Hosting
    ↓
Live Website
```

### **Repository Structure:**
```
mrwilljackson/web_two_point_o/
├── index.html                    ← Astro homepage
├── blog/                         ← Astro blog pages
│   ├── index.html
│   └── 2025/post-name/index.html
├── _astro/                       ← Optimized assets
├── images/                       ← Blog and site images
├── 404.html                      ← Custom 404 page
└── robots.txt                    ← SEO configuration
```

---

## 🔧 Quick Deployment Commands

### **Standard Deployment Process:**
```bash
# 1. Navigate to your project directory
cd "/Users/willjackson/Documents/Playphysio/website design/web3"

# 2. Build the static site
npm run build

# 3. Navigate to dist directory
cd dist

# 4. Add all changes
git add .

# 5. Commit with descriptive message
git commit -m "Update content - $(date '+%Y-%m-%d %H:%M')"

# 6. Push to GitHub (triggers Vercel deployment)
git push origin master

# 7. Return to main project directory
cd ..
```

### **One-Line Deployment:**
```bash
# Quick deployment script (run from project root)
npm run build && cd dist && git add . && git commit -m "Deploy $(date '+%Y-%m-%d %H:%M')" && git push origin master && cd ..
```

---

## 🛠️ Deployment Scenarios

### **Scenario 1: Content Updates**
*When you've added/edited blog posts or updated content*

```bash
# 1. Make your content changes in src/content/blog/
# 2. Test locally
npm run dev
# Visit http://localhost:4322 to verify changes

# 3. Build and deploy
npm run build
cd dist
git add .
git commit -m "Update blog content - new post about [topic]"
git push origin master
cd ..
```

### **Scenario 2: Design/Component Changes**
*When you've modified components, styles, or site structure*

```bash
# 1. Make your changes to components/styles
# 2. Test thoroughly
npm run dev
# Test all pages and functionality

# 3. Build and deploy
npm run build
cd dist
git add .
git commit -m "Update site design - [description of changes]"
git push origin master
cd ..
```

### **Scenario 3: Image Updates**
*When you've added new images or optimized existing ones*

```bash
# 1. Add optimized images to public/images/blog/YYYY/
# 2. Update any references in blog posts
# 3. Test image loading
npm run dev

# 4. Build and deploy
npm run build
cd dist
git add .
git commit -m "Add optimized images for [post name]"
git push origin master
cd ..
```

### **Scenario 4: Emergency Fixes**
*When you need to quickly fix a critical issue*

```bash
# 1. Make the fix
# 2. Quick test
npm run build && npm run preview
# Visit http://localhost:4321 to verify fix

# 3. Emergency deploy
cd dist
git add .
git commit -m "HOTFIX: [description of urgent fix]"
git push origin master
cd ..
```

---

## 📊 Vercel Integration

### **Current Vercel Configuration:**
- **Framework:** Other (static site)
- **Build Command:** Not needed (pre-built)
- **Output Directory:** `.` (root)
- **Auto-Deploy:** Enabled on push to master branch

### **Vercel Dashboard Access:**
1. **Visit:** https://vercel.com/dashboard
2. **Sign in** with your personal account
3. **Find project:** web_two_point_o
4. **View deployments:** See all deployment history and status

### **Deployment Status:**
- **Success:** Green checkmark, site is live
- **Building:** Yellow indicator, deployment in progress
- **Failed:** Red X, check logs for errors

---

## 🔍 Monitoring & Verification

### **After Each Deployment:**

#### **1. Check Deployment Status:**
```bash
# Vercel will show deployment status in terminal output
# Or check Vercel dashboard for confirmation
```

#### **2. Verify Live Site:**
```bash
# Visit your Vercel URL (provided in dashboard)
# Test key functionality:
# - Homepage loads
# - Blog listing works
# - Individual blog posts load
# - Images display correctly
# - Navigation functions properly
```

#### **3. Test Critical Paths:**
- **Homepage:** Hero section, navigation, footer
- **Blog listing:** All posts display, category filtering works
- **Blog posts:** Content renders, images load, components work
- **404 page:** Custom 404 with featured post
- **Mobile:** Responsive design on mobile devices

---

## 🚨 Troubleshooting

### **Common Issues & Solutions:**

#### **Build Fails Locally:**
```bash
# Check for errors in terminal output
npm run build

# Common fixes:
# 1. Check frontmatter syntax in blog posts
# 2. Verify image paths exist
# 3. Check for missing imports in components
# 4. Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### **Deployment Succeeds but Site Broken:**
```bash
# 1. Check Vercel deployment logs
# 2. Verify all files were pushed to GitHub
git status
git log --oneline -5

# 3. Test production build locally
npm run build
npm run preview
# Visit http://localhost:4321
```

#### **Images Not Loading:**
```bash
# 1. Verify image paths in frontmatter and content
# 2. Check images exist in public/images/blog/YYYY/
# 3. Ensure paths start with /images/blog/
# 4. Check file extensions match references
```

#### **Git Push Fails:**
```bash
# If authentication fails:
# 1. Check GitHub personal access token
# 2. Update remote URL if needed
git remote set-url origin https://github.com/mrwilljackson/web_two_point_o.git

# If push rejected:
git pull origin master --rebase
git push origin master
```

---

## 📈 Performance Monitoring

### **Key Metrics to Watch:**
- **Build time:** Should be under 3 minutes
- **Deployment time:** Usually 1-2 minutes on Vercel
- **Site loading speed:** Aim for under 3 seconds
- **Image optimization:** Monitor file sizes

### **Vercel Analytics:**
- **Page views:** Track popular content
- **Performance:** Core Web Vitals scores
- **Errors:** Monitor for 404s or broken functionality

---

## 🔄 Backup & Recovery

### **Current Backup Strategy:**
1. **Git repository:** Full version history on GitHub
2. **Local project:** Complete source code locally
3. **Vercel deployments:** Deployment history and rollback capability

### **Recovery Procedures:**

#### **Rollback to Previous Version:**
```bash
# 1. Find previous commit hash
git log --oneline -10

# 2. Reset to previous commit
git reset --hard [commit-hash]

# 3. Force push (use carefully!)
git push origin master --force
```

#### **Restore from Local Backup:**
```bash
# 1. Rebuild from source
npm run build

# 2. Deploy fresh copy
cd dist
git add .
git commit -m "Restore from local backup"
git push origin master
cd ..
```

---

## 🎯 Best Practices

### **Before Each Deployment:**
- [ ] **Test locally** with `npm run dev`
- [ ] **Build successfully** with `npm run build`
- [ ] **Preview production** with `npm run preview`
- [ ] **Check all images** load correctly
- [ ] **Verify new content** displays properly
- [ ] **Test on mobile** if design changes made

### **Commit Message Guidelines:**
```bash
# Good commit messages:
"Add new blog post about gamification research"
"Update hero section with new imagery"
"Fix broken category links in blog posts"
"Optimize images for faster loading"

# Bad commit messages:
"Update"
"Fix stuff"
"Changes"
"WIP"
```

### **Deployment Timing:**
- **Avoid deploying** during high-traffic periods
- **Test thoroughly** before deploying on Fridays
- **Deploy early in day** when you can monitor for issues
- **Have rollback plan** for critical updates

---

## 🚀 Quick Reference

### **Essential Commands:**
```bash
# Full deployment process
npm run build && cd dist && git add . && git commit -m "Deploy $(date '+%Y-%m-%d')" && git push origin master && cd ..

# Check git status
cd dist && git status && cd ..

# View recent commits
cd dist && git log --oneline -5 && cd ..

# Check remote repository
cd dist && git remote -v && cd ..
```

### **Important URLs:**
- **GitHub Repository:** https://github.com/mrwilljackson/web_two_point_o
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Live Site:** [Your Vercel URL from dashboard]

### **Support Resources:**
- **Vercel Documentation:** https://vercel.com/docs
- **GitHub Help:** https://docs.github.com/
- **Astro Documentation:** https://docs.astro.build/

---

## 🎊 Summary

This temporary deployment setup provides:
- **Fast deployment** (2-3 minutes from push to live)
- **Automatic builds** triggered by GitHub pushes
- **Version control** with full deployment history
- **Easy rollbacks** if issues occur
- **Professional hosting** with global CDN

**Remember: This is your current working deployment system until you set up the final hosting solution!** 🚀✨
