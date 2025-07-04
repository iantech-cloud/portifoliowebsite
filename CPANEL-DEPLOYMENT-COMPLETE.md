# Complete cPanel Node.js Deployment Guide

## 🎯 Overview

This guide covers deploying your Node.js portfolio with hamburger menu to cPanel shared hosting. The process is designed to work without SSH access, using only cPanel's web interface and terminal.

## 📦 Pre-Deployment Preparation

### Step 1: Create Deployment Package

\`\`\`bash
# Run the enhanced deployment script
node cpanel-deploy-enhanced.js

# Or use the deployment guide script
chmod +x cpanel-deployment-guide.sh
./cpanel-deployment-guide.sh
\`\`\`

This creates:
- `cpanel-deploy/` folder with all necessary files
- `portfolio-cpanel-complete.zip` for upload

### Step 2: Verify Package Contents

Your deployment package includes:
- ✅ `server.js` - Main application
- ✅ `package.json` - Dependencies
- ✅ `routes/` - All route handlers
- ✅ `views/` - EJS templates with hamburger menu
- ✅ `public/` - CSS, JS, and static assets
- ✅ `data/` - JSON data storage
- ✅ `.htaccess` - Apache configuration
- ✅ `install.sh` - Automated installation
- ✅ `start.sh` - Application startup
- ✅ `DEPLOYMENT-GUIDE.md` - Detailed instructions

## 🚀 cPanel Deployment Process

### Step 1: Upload Files

1. **Login to cPanel**
   - Access your hosting control panel
   - Navigate to "File Manager"

2. **Upload Package**
   - Go to `public_html` directory
   - Click "Upload"
   - Select `portfolio-cpanel-complete.zip`
   - Wait for upload to complete

3. **Extract Files**
   - Right-click the uploaded zip file
   - Select "Extract"
   - Choose "Extract Files"
   - Delete the zip file after extraction

### Step 2: Configure Node.js Application

1. **Find Node.js Section**
   - Look for "Node.js Apps", "Node.js Selector", or similar
   - Different hosts may name this differently

2. **Create Application**
   \`\`\`
   Node.js Version: 16.x or higher (latest LTS recommended)
   Application Mode: Production
   Application Root: public_html
   Application URL: yourdomain.com
   Application Startup File: server.js
   \`\`\`

3. **Set Environment Variables**
   \`\`\`
   NODE_ENV=production
   PORT=3000
   SESSION_SECRET=your-secure-random-string
   SITE_URL=https://yourdomain.com
   \`\`\`

   **Generate secure SESSION_SECRET:**
   \`\`\`bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   \`\`\`

### Step 3: Install Dependencies

1. **Open cPanel Terminal**
   - Find "Terminal" in cPanel tools
   - Click to open terminal

2. **Navigate and Install**
   \`\`\`bash
   cd public_html
   chmod +x install.sh
   ./install.sh
   \`\`\`

   **Manual installation if script fails:**
   \`\`\`bash
   npm install --production
   mkdir -p data
   echo "[]" > data/blog-posts.json
   chmod 644 data/blog-posts.json
   \`\`\`

### Step 4: Start Application

**Method 1: cPanel Interface**
1. Go to Node.js Apps section
2. Find your application
3. Click "Start"
4. Verify status shows "Running"

**Method 2: Terminal**
\`\`\`bash
cd public_html
chmod +x start.sh
./start.sh
\`\`\`

### Step 5: Verify Deployment

1. **Test Homepage**
   - Visit your domain
   - Should see portfolio homepage

2. **Test Hamburger Menu**
   - Resize browser to mobile width
   - Click hamburger button (☰)
   - Verify menu opens/closes smoothly

3. **Test All Pages**
   - Navigate through all sections
   - Test contact form
   - Check blog functionality

## 🔧 Troubleshooting

### Common Issues

**"Cannot find module" errors:**
\`\`\`bash
cd public_html
rm -rf node_modules
npm install --production
\`\`\`

**Permission errors:**
\`\`\`bash
chmod 755 *.sh
chmod 644 *.js *.json *.css
find . -type d -exec chmod 755 {} \;
\`\`\`

**Application won't start:**
- Check Node.js version (must be 16+)
- Verify environment variables
- Check cPanel error logs
- Ensure startup file is `server.js`

**Static files not loading:**
- Verify `.htaccess` file exists
- Check file permissions
- Test direct file access: `yourdomain.com/css/hamburger-menu.css`

**Hamburger menu not working:**
- Check CSS loads: `yourdomain.com/css/hamburger-menu.css`
- Check JS loads: `yourdomain.com/js/hamburger-menu.js`
- Open browser console for JavaScript errors

### Checking Logs

**cPanel Error Logs:**
1. cPanel → Error Logs
2. Look for recent Node.js errors
3. Check application-specific logs

**Application Health:**
\`\`\`bash
# Test application startup
cd public_html
node -e "require('./server.js')"
\`\`\`

## 📱 Testing Checklist

### Desktop (≥768px width)
- [ ] Homepage loads correctly
- [ ] Desktop navigation visible
- [ ] Hamburger menu hidden
- [ ] All pages accessible
- [ ] Contact form works
- [ ] Blog section functions

### Mobile (<768px width)
- [ ] Hamburger menu visible
- [ ] Desktop navigation hidden
- [ ] Menu opens on hamburger click
- [ ] Menu closes on overlay click
- [ ] Menu items are clickable
- [ ] Smooth animations work
- [ ] Touch interactions responsive

### Cross-Browser
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

## 🔒 Security & Performance

### Security Features Included
- Security headers in `.htaccess`
- Protected sensitive files
- Session security
- XSS protection
- CSRF protection

### Performance Optimizations
- Gzip compression enabled
- Static asset caching
- Optimized file permissions
- Efficient routing

## 🚀 Going Live

### Final Steps
1. **Update Contact Info**
   - Edit email addresses in templates
   - Update phone numbers
   - Set correct social media links

2. **Configure Email (Optional)**
   \`\`\`
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   CONTACT_EMAIL=your-email@example.com
   \`\`\`

3. **Test Everything**
   - All pages load correctly
   - Forms submit properly
   - Mobile menu works
   - Contact form sends emails

### Maintenance
- **Regular Updates**: Keep dependencies updated
- **Monitoring**: Check application status
- **Backups**: Regular file and data backups
- **Security**: Monitor for updates

## 📞 Support Resources

### Hosting Provider
- Contact for Node.js version issues
- cPanel configuration help
- Server resource questions

### Application Issues
- Check browser console for errors
- Review server logs
- Test step-by-step functionality

## 🎉 Success!

Your Node.js portfolio with responsive hamburger menu is now live on cPanel shared hosting!

**Key Features Working:**
- ✅ Responsive design
- ✅ Mobile hamburger menu
- ✅ Desktop navigation
- ✅ Contact form
- ✅ Blog system
- ✅ Professional styling
- ✅ Accessibility features
- ✅ SEO optimization

Visit your domain to see your professional portfolio in action! 🌐
