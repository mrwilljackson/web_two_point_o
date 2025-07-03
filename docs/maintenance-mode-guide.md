# 🚧 Maintenance Mode Guide

## 🎯 Overview

The maintenance mode feature allows you to quickly take your entire website offline with a single environment variable change. When enabled, all visitors will see a professional maintenance page instead of your regular content.

---

## 🚀 Quick Start

### **Enable Maintenance Mode:**
```bash
# In your .env file, change:
MAINTENANCE_MODE=true

# Then rebuild and deploy:
npm run build
./deploy.sh
```

### **Disable Maintenance Mode:**
```bash
# In your .env file, change:
MAINTENANCE_MODE=false

# Then rebuild and deploy:
npm run build
./deploy.sh
```

---

## 🔧 How It Works

### **Architecture:**
1. **Middleware Check** - Every request is intercepted by `src/middleware.ts`
2. **Environment Variable** - Checks `MAINTENANCE_MODE` setting
3. **Conditional Response** - Shows maintenance page or normal content
4. **HTTP Status 503** - Proper "Service Unavailable" status for SEO

### **What Visitors See:**
- 🎨 **Professional maintenance page** with PlayPhysio branding
- 📅 **Current date/time** when maintenance started
- ⏰ **Auto-refresh** every 5 minutes to check if site is back
- 📧 **Contact information** for urgent inquiries
- 🔄 **Loading animation** to indicate temporary status

---

## ⚙️ Configuration Options

### **Environment Variables:**

#### **MAINTENANCE_MODE**
```bash
# Enable maintenance mode
MAINTENANCE_MODE=true
MAINTENANCE_MODE=1

# Disable maintenance mode
MAINTENANCE_MODE=false
MAINTENANCE_MODE=0
# (or remove the variable entirely)
```

#### **SITE_NAME**
```bash
# Used in maintenance page title
SITE_NAME=PlayPhysio
```

#### **CONTACT_EMAIL**
```bash
# Displayed on maintenance page for urgent contact
CONTACT_EMAIL=hello@playphysio.com
```

---

## 📝 Deployment Scenarios

### **Scenario 1: Emergency Maintenance**
```bash
# 1. Enable maintenance mode locally
echo "MAINTENANCE_MODE=true" >> .env

# 2. Quick deploy
npm run build && ./deploy.sh

# 3. Site is now in maintenance mode
# 4. Fix the issue
# 5. Disable maintenance mode
sed -i '' 's/MAINTENANCE_MODE=true/MAINTENANCE_MODE=false/' .env

# 6. Deploy fix
npm run build && ./deploy.sh
```

### **Scenario 2: Scheduled Maintenance**
```bash
# 1. Plan ahead - enable maintenance mode
# 2. Notify users in advance (optional)
# 3. At scheduled time, deploy with maintenance mode
# 4. Perform maintenance work
# 5. Test everything works
# 6. Disable maintenance mode and deploy
```

### **Scenario 3: Content Updates**
```bash
# 1. Enable maintenance mode
# 2. Make content changes
# 3. Test locally with maintenance mode off
# 4. Deploy with maintenance mode off
```

---

## 🌐 Production Deployment

### **For Vercel (Current Setup):**

#### **Method 1: Environment File**
```bash
# Update .env file
MAINTENANCE_MODE=true

# Deploy
./deploy.sh
```

#### **Method 2: Vercel Dashboard**
1. Go to Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add/Update: `MAINTENANCE_MODE` = `true`
5. Redeploy from dashboard

#### **Method 3: Vercel CLI**
```bash
# Set environment variable
vercel env add MAINTENANCE_MODE

# Enter value: true
# Select environments: Production

# Redeploy
vercel --prod
```

---

## 🔍 Testing Maintenance Mode

### **Local Testing:**
```bash
# 1. Enable maintenance mode
echo "MAINTENANCE_MODE=true" > .env

# 2. Start dev server
npm run dev

# 3. Visit http://localhost:4322
# Should show maintenance page

# 4. Disable maintenance mode
echo "MAINTENANCE_MODE=false" > .env

# 5. Refresh browser
# Should show normal site
```

### **Production Testing:**
```bash
# 1. Enable on production
# 2. Check site shows maintenance page
# 3. Verify auto-refresh works (wait 5 minutes)
# 4. Check contact email link works
# 5. Disable and verify site returns to normal
```

---

## 🎨 Customizing the Maintenance Page

### **Edit Maintenance Content:**
Edit `src/middleware.ts` to customize:
- **Messages** - Change maintenance text
- **Styling** - Update CSS in the template
- **Contact info** - Modify email or add phone
- **Auto-refresh timing** - Change 5-minute interval

### **Example Customizations:**
```javascript
// In src/middleware.ts, find and modify:

// Custom messages
<h1>Scheduled Maintenance</h1>
<p class="maintenance-message">We're upgrading our servers to serve you better!</p>
<p class="back-soon">Expected completion: 2 hours</p>

// Custom refresh interval (in milliseconds)
setTimeout(() => {
  window.location.reload();
}, 600000); // 10 minutes instead of 5
```

---

## 🚨 Emergency Procedures

### **If Site Goes Down Unexpectedly:**
1. **Enable maintenance mode immediately:**
   ```bash
   MAINTENANCE_MODE=true
   ./deploy.sh
   ```
2. **Investigate the issue** while users see professional maintenance page
3. **Fix the problem**
4. **Test the fix** locally
5. **Disable maintenance mode** and deploy fix

### **If Maintenance Mode Gets Stuck:**
1. **Check environment variables** in Vercel dashboard
2. **Verify .env file** has correct setting
3. **Clear browser cache** and test
4. **Redeploy** with explicit `MAINTENANCE_MODE=false`

---

## 📊 SEO Considerations

### **Maintenance Mode is SEO-Friendly:**
- ✅ **HTTP 503 Status** - Tells search engines it's temporary
- ✅ **Retry-After Header** - Suggests when to check back
- ✅ **No-index Meta Tag** - Prevents indexing maintenance page
- ✅ **No-cache Headers** - Prevents caching of maintenance page

### **Best Practices:**
- **Keep maintenance brief** - Under 24 hours when possible
- **Use during low-traffic times** - Check analytics for best times
- **Communicate in advance** - Notify users via social media/email
- **Monitor after** - Check that normal indexing resumes

---

## 🔧 Troubleshooting

### **Common Issues:**

#### **Maintenance mode not activating:**
```bash
# Check environment variable is set correctly
echo $MAINTENANCE_MODE

# Verify in .env file
cat .env | grep MAINTENANCE_MODE

# Rebuild and redeploy
npm run build && ./deploy.sh
```

#### **Maintenance mode stuck on:**
```bash
# Explicitly set to false
echo "MAINTENANCE_MODE=false" > .env

# Force rebuild and deploy
rm -rf dist/ && npm run build && ./deploy.sh
```

#### **Page not showing correctly:**
- Check browser cache (hard refresh: Ctrl+F5)
- Verify image paths in maintenance page
- Check console for JavaScript errors

---

## 📋 Maintenance Mode Checklist

### **Before Enabling:**
- [ ] **Plan maintenance window** and duration
- [ ] **Notify stakeholders** if needed
- [ ] **Backup current site** (git commit)
- [ ] **Test maintenance mode** locally first

### **During Maintenance:**
- [ ] **Monitor that maintenance page** is showing correctly
- [ ] **Perform maintenance tasks** efficiently
- [ ] **Test fixes** before disabling maintenance mode
- [ ] **Document any changes** made

### **After Maintenance:**
- [ ] **Disable maintenance mode**
- [ ] **Verify site** is working normally
- [ ] **Check all critical pages** and functionality
- [ ] **Monitor for any issues** in the following hours
- [ ] **Update stakeholders** that maintenance is complete

---

## 🎊 Summary

**Maintenance mode gives you:**
- ✅ **One-variable control** - Simple on/off switch
- ✅ **Professional appearance** - Branded maintenance page
- ✅ **SEO protection** - Proper HTTP status codes
- ✅ **User communication** - Clear messaging and contact info
- ✅ **Auto-recovery** - Page refreshes to check if site is back

**Perfect for emergency situations or planned maintenance!** 🚧✨
