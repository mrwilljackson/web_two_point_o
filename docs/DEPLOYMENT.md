# 📚 **PlayPhysio Static Site Deployment Guide**

## 🎯 **Overview**
This guide provides step-by-step instructions for deploying your PlayPhysio website as static HTML files to a live web server.

---

## 📋 **Prerequisites**

### **Required:**
- ✅ Completed PlayPhysio website (current project)
- ✅ Web hosting account with FTP access
- ✅ FTP client software (FileZilla, WinSCP, or similar)
- ✅ Your hosting provider's FTP credentials

### **Optional but Recommended:**
- ✅ Your PlayPhysio graphics (logo, hero image, favicon)
- ✅ Domain name configured to point to your hosting

---

## 🖼️ **Step 1: Add Your Graphics (Optional)**

Before building, add your PlayPhysio graphics to ensure they're included in the build:

### **1.1 Add Required Images:**
```bash
# Place your graphics in these locations:
public/images/playphysio-logo-horizontal.svg    # Main logo
public/images/bubbles-child.jpg                 # Hero section image
public/favicon.png                              # Site favicon (32x32px or 64x64px)
```

### **1.2 Verify Image Paths:**
- Logo should be SVG format for crisp scaling
- Hero image should be high quality (600x400px minimum)
- Favicon should be PNG format

---

## 🔨 **Step 2: Build the Static Site**

### **2.1 Open Terminal/Command Prompt:**
Navigate to your project directory:
```bash
cd /path/to/your/playphysio-website
```

### **2.2 Install Dependencies (if needed):**
```bash
npm install
```

### **2.3 Build the Static Site:**
```bash
npm run build
```

### **2.4 Verify Build Success:**
You should see output similar to:
```
✓ 26 page(s) built in 2.03s
✓ Build Complete!
```

### **2.5 Check the Output:**
A `dist/` folder should be created containing:
```
dist/
├── index.html                    # Homepage
├── blog/
│   ├── index.html               # Blog listing
│   └── [post-slug]/index.html   # Individual blog posts
├── _astro/                      # Optimized assets
├── images/                      # Your graphics
└── favicon.png                  # Site icon
```

---

## 🌐 **Step 3: Prepare for Upload**

### **3.1 Gather FTP Credentials:**
Contact your hosting provider or check your hosting control panel for:
- **FTP Server/Host:** (e.g., `ftp.yourdomain.com` or IP address)
- **Username:** Your FTP username
- **Password:** Your FTP password
- **Port:** Usually 21 (standard) or 22 (SFTP)
- **Upload Directory:** Usually `public_html`, `www`, or `htdocs`

### **3.2 Download FTP Client (if needed):**
**Recommended FTP Clients:**
- **FileZilla** (Free) - [filezilla-project.org](https://filezilla-project.org/)
- **WinSCP** (Windows, Free) - [winscp.net](https://winscp.net/)
- **Cyberduck** (Mac, Free) - [cyberduck.io](https://cyberduck.io/)

---

## 📤 **Step 4: Upload to Live Server**

### **4.1 Connect to Your Server:**

**Using FileZilla:**
1. Open FileZilla
2. Enter your FTP credentials:
   - **Host:** `ftp.yourdomain.com`
   - **Username:** Your FTP username
   - **Password:** Your FTP password
   - **Port:** 21 (or as provided)
3. Click **"Quickconnect"**

### **4.2 Navigate to Web Directory:**
1. In the **Remote site** panel (right side), navigate to your web directory:
   - Common names: `public_html`, `www`, `htdocs`, or `web`
2. This is where your website files should go

### **4.3 Clear Existing Files (if any):**
⚠️ **Important:** If this is an existing website, backup current files first!
1. Select all files in the web directory
2. Delete them (or move to a backup folder)

### **4.4 Upload Static Files:**
1. In the **Local site** panel (left side), navigate to your project's `dist/` folder
2. Select **ALL contents** inside the `dist/` folder (not the folder itself)
3. Drag and drop to the **Remote site** panel, or right-click and select **"Upload"**

### **4.5 Monitor Upload Progress:**
- FileZilla will show upload progress in the bottom panel
- Ensure all files transfer successfully
- Large images may take longer

---

## ✅ **Step 5: Verify Deployment**

### **5.1 Test Your Website:**
1. Open your web browser
2. Navigate to your domain: `https://yourdomain.com`
3. Verify the homepage loads correctly

### **5.2 Test All Sections:**
- **✅ Homepage:** Check hero section, gradients, buttons
- **✅ Navigation:** Test all nav links work
- **✅ Blog:** Visit `/blog` and test blog listing
- **✅ Blog Posts:** Click on individual blog posts
- **✅ Mobile:** Test on mobile devices

### **5.3 Check for Issues:**
**Common Issues & Solutions:**

| Issue | Solution |
|-------|----------|
| Images not loading | Verify images uploaded to `images/` folder |
| CSS not working | Check `_astro/` folder uploaded completely |
| 404 errors | Ensure `index.html` is in root directory |
| Blog posts 404 | Verify `blog/` folder structure uploaded |

---

## 🔄 **Step 6: Future Updates**

### **6.1 Content Updates:**
When you update blog content or make changes:
1. Run `npm run build` locally
2. Upload new `dist/` contents to server
3. Clear browser cache to see changes

### **6.2 WordPress Content Updates:**
To update blog posts from WordPress:
1. Make changes in WordPress
2. Run `npm run build` (fetches latest content)
3. Upload new files to server

### **6.3 Design Updates:**
For design or code changes:
1. Make changes to your local files
2. Test with `npm run dev`
3. Build with `npm run build`
4. Upload updated `dist/` contents

---

## 🚨 **Troubleshooting**

### **Build Issues:**
```bash
# Clear cache and rebuild
rm -rf dist/
rm -rf node_modules/
npm install
npm run build
```

### **Upload Issues:**
- **Slow upload:** Use SFTP (port 22) if available
- **Permission errors:** Contact hosting provider
- **Partial upload:** Re-upload missing files

### **Website Issues:**
- **White screen:** Check browser console for errors
- **Missing styles:** Verify `_astro/` folder uploaded
- **404 errors:** Check file paths and folder structure

---

## 📞 **Support**

### **Hosting Provider:**
Contact your hosting provider for:
- FTP credential issues
- Server configuration problems
- Domain pointing issues

### **Technical Issues:**
For PlayPhysio website specific issues:
- Check browser developer console for errors
- Verify all files uploaded correctly
- Test locally first with `npm run dev`

---

## 🎉 **Congratulations!**

Your PlayPhysio website is now live! 🌟

**Your static site includes:**
- ✅ Beautiful homepage with animations
- ✅ Complete blog with 24 posts
- ✅ SEO optimized pages
- ✅ Mobile responsive design
- ✅ Fast loading static files

**Next Steps:**
- Monitor website performance
- Update content as needed
- Consider setting up automated deployments
- Add analytics tracking if desired

---

*This documentation covers deployment to any standard web hosting provider that supports static HTML files. The process may vary slightly depending on your specific hosting provider.*
