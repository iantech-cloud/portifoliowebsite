const fs = require("fs-extra")
const path = require("path")

async function createEnhancedCPanelDeployment() {
  console.log("🚀 Creating Enhanced cPanel Deployment Package...")

  try {
    // Create deployment directory
    const deployDir = path.join(__dirname, "cpanel-deploy")
    await fs.ensureDir(deployDir)
    await fs.emptyDir(deployDir)

    // Files to copy
    const filesToCopy = ["server.js", "package.json", "routes", "views", "public", "data"]

    // Copy files
    for (const file of filesToCopy) {
      const srcPath = path.join(__dirname, file)
      const destPath = path.join(deployDir, file)

      if (await fs.pathExists(srcPath)) {
        await fs.copy(srcPath, destPath)
        console.log(`✅ Copied ${file}`)
      }
    }

    // Create enhanced .htaccess
    const htaccess = `# Node.js Portfolio Application
RewriteEngine On

# Handle Node.js application
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ /server.js [L,QSA]

# Security Headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
    AddOutputFilterByType DEFLATE application/json
</IfModule>

# Cache Control for Static Assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType application/pdf "access plus 1 month"
    ExpiresByType text/html "access plus 1 hour"
</IfModule>

# Prevent access to sensitive files
<Files "package.json">
    Order Allow,Deny
    Deny from all
</Files>

<Files "server.js">
    Order Allow,Deny
    Deny from all
</Files>

<FilesMatch "\\.(env|log|sh)$">
    Order Allow,Deny
    Deny from all
</FilesMatch>

# Custom error pages
ErrorDocument 404 /404.html
ErrorDocument 500 /500.html
`

    await fs.writeFile(path.join(deployDir, ".htaccess"), htaccess)

    // Create enhanced installation script
    const installScript = `#!/bin/bash
# Enhanced Installation Script for cPanel

echo "🚀 Portfolio Installation Script v2.0"
echo "====================================="

# Color codes for output
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
BLUE='\\033[0;34m'
NC='\\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "\${GREEN}✅ \$1\${NC}"
}

print_error() {
    echo -e "\${RED}❌ \$1\${NC}"
}

print_warning() {
    echo -e "\${YELLOW}⚠️  \$1\${NC}"
}

print_info() {
    echo -e "\${BLUE}ℹ️  \$1\${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Make sure you're in the correct directory."
    exit 1
fi

print_status "Found package.json"

# Check Node.js version
if command -v node &> /dev/null; then
    NODE_VERSION=\$(node --version)
    print_status "Node.js version: \$NODE_VERSION"
    
    # Check if version is 16 or higher
    NODE_MAJOR=\$(echo \$NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
    if [ "\$NODE_MAJOR" -lt 16 ]; then
        print_warning "Node.js version 16+ recommended. Current: \$NODE_VERSION"
    fi
else
    print_error "Node.js not found. Please install Node.js through cPanel."
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=\$(npm --version)
    print_status "npm version: \$NPM_VERSION"
else
    print_error "npm not found. Please ensure npm is installed."
    exit 1
fi

# Install dependencies
print_info "Installing Node.js dependencies..."
npm install --production --no-optional

if [ \$? -eq 0 ]; then
    print_status "Dependencies installed successfully!"
else
    print_error "Error installing dependencies. Check your Node.js version."
    exit 1
fi

# Create data directory if it doesn't exist
if [ ! -d "data" ]; then
    print_info "Creating data directory..."
    mkdir -p data
    echo "[]" > data/blog-posts.json
    chmod 644 data/blog-posts.json
    print_status "Data directory created"
else
    print_status "Data directory exists"
fi

# Create uploads directory
if [ ! -d "public/uploads" ]; then
    print_info "Creating uploads directory..."
    mkdir -p public/uploads
    chmod 755 public/uploads
    print_status "Uploads directory created"
else
    print_status "Uploads directory exists"
fi

# Set proper permissions
print_info "Setting file permissions..."

# Set directory permissions
find . -type d -exec chmod 755 {} \\;

# Set file permissions
find . -type f -name "*.js" -exec chmod 644 {} \\;
find . -type f -name "*.json" -exec chmod 644 {} \\;
find . -type f -name "*.ejs" -exec chmod 644 {} \\;
find . -type f -name "*.css" -exec chmod 644 {} \\;
find . -type f -name "*.html" -exec chmod 644 {} \\;
find . -type f -name "*.md" -exec chmod 644 {} \\;

# Make scripts executable
chmod 755 *.sh 2>/dev/null || true

print_status "File permissions set"

# Verify critical files
print_info "Verifying installation..."

critical_files=(
    "server.js"
    "package.json"
    "public/css/hamburger-menu.css"
    "public/js/hamburger-menu.js"
    "views/layout.ejs"
    "routes/home.js"
)

for file in "\${critical_files[@]}"; do
    if [ -f "\$file" ]; then
        print_status "\$file exists"
    else
        print_error "\$file missing"
    fi
done

# Test Node.js application
print_info "Testing application startup..."
timeout 10s node -e "
const app = require('./server.js');
console.log('✅ Application loads successfully');
process.exit(0);
" 2>/dev/null

if [ \$? -eq 0 ]; then
    print_status "Application test passed"
else
    print_warning "Application test failed - check for syntax errors"
fi

echo ""
print_status "Installation completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "=============="
echo "1. Configure your Node.js app in cPanel:"
echo "   - App Root: \$(pwd)"
echo "   - Startup File: server.js"
echo "   - Node.js Version: 16 or higher"
echo ""
echo "2. Set environment variables in cPanel Node.js section:"
echo "   NODE_ENV=production"
echo "   SESSION_SECRET=your-secure-random-string"
echo "   PORT=3000"
echo ""
echo "3. Start your application in cPanel"
echo ""
echo "🌐 Your portfolio will be available at your domain!"
echo ""
print_info "For troubleshooting, check the logs in cPanel Node.js section"
`

    await fs.writeFile(path.join(deployDir, "install.sh"), installScript)

    // Create startup script
    const startupScript = `#!/bin/bash
# Startup script for cPanel Node.js

echo "🚀 Starting Portfolio Application..."

# Set environment variables if not set
export NODE_ENV=\${NODE_ENV:-production}
export PORT=\${PORT:-3000}
export SESSION_SECRET=\${SESSION_SECRET:-fallback-secret-change-in-production}

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install --production
fi

# Create data directory if needed
if [ ! -d "data" ]; then
    mkdir -p data
    echo "[]" > data/blog-posts.json
fi

# Start the application
echo "🌟 Starting server on port \$PORT..."
echo "🌐 Environment: \$NODE_ENV"
echo "⏰ Started at: \$(date)"

node server.js
`

    await fs.writeFile(path.join(deployDir, "start.sh"), startupScript)

    // Create comprehensive deployment guide
    const deploymentGuide = `# Complete cPanel Node.js Deployment Guide

## 🚀 Quick Start

1. **Upload Files**
   - Upload \`portfolio-cpanel-complete.zip\` to cPanel File Manager
   - Extract in \`public_html\` directory
   - Delete the zip file

2. **Configure Node.js App**
   - cPanel → Node.js Apps → Create Application
   - App Root: \`public_html\`
   - Startup File: \`server.js\`
   - Node.js Version: 16+

3. **Install Dependencies**
   - cPanel → Terminal
   - \`cd public_html\`
   - \`chmod +x install.sh && ./install.sh\`

4. **Set Environment Variables**
   - \`NODE_ENV=production\`
   - \`SESSION_SECRET=your-secure-key\`
   - \`PORT=3000\`

5. **Start Application**
   - cPanel → Node.js Apps → Start

## 📋 Detailed Steps

### Step 1: Prepare Files for Upload

Your deployment package includes:
- \`server.js\` - Main application file
- \`package.json\` - Dependencies
- \`routes/\` - Route handlers
- \`views/\` - EJS templates
- \`public/\` - Static assets (CSS, JS, images)
- \`data/\` - JSON data storage
- \`.htaccess\` - Apache configuration
- \`install.sh\` - Installation script
- \`start.sh\` - Startup script

### Step 2: Upload to cPanel

1. **Login to cPanel**
   - Access your hosting control panel
   - Navigate to File Manager

2. **Upload Files**
   - Go to \`public_html\` directory
   - Upload \`portfolio-cpanel-complete.zip\`
   - Right-click → Extract
   - Delete zip file after extraction

3. **Verify Upload**
   - Ensure all files are in \`public_html\`
   - Check file permissions (should be set automatically)

### Step 3: Configure Node.js Application

1. **Find Node.js Section**
   - Look for "Node.js Apps", "Node.js", or "Node.js Selector"
   - Different hosts may have different names

2. **Create New Application**
   - Click "Create Application" or "+"
   - Fill in the configuration:

   \`\`\`
   Node.js Version: 16.x or higher (latest LTS recommended)
   Application Mode: Production
   Application Root: public_html
   Application URL: yourdomain.com (or subdomain)
   Application Startup File: server.js
   \`\`\`

3. **Save Configuration**
   - Click "Create" or "Save"
   - Note the application path shown

### Step 4: Set Environment Variables

In the Node.js application settings, add these variables:

**Required Variables:**
\`\`\`
NODE_ENV=production
PORT=3000
SESSION_SECRET=your-very-secure-random-string-here
SITE_URL=https://yourdomain.com
\`\`\`

**Optional Email Variables:**
\`\`\`
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=your-email@example.com
\`\`\`

**How to Generate SESSION_SECRET:**
\`\`\`bash
# Use this command to generate a secure secret:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
\`\`\`

### Step 5: Install Dependencies

1. **Open cPanel Terminal**
   - Find "Terminal" in cPanel
   - Click to open

2. **Navigate to Your Directory**
   \`\`\`bash
   cd public_html
   \`\`\`

3. **Run Installation Script**
   \`\`\`bash
   chmod +x install.sh
   ./install.sh
   \`\`\`

   **OR manually install:**
   \`\`\`bash
   npm install --production
   \`\`\`

4. **Verify Installation**
   - Check for \`node_modules\` directory
   - Ensure no error messages

### Step 6: Start the Application

**Method 1: Using cPanel Interface**
1. Go to Node.js Apps section
2. Find your application
3. Click "Start" button
4. Check status shows "Running"

**Method 2: Using Terminal**
\`\`\`bash
cd public_html
chmod +x start.sh
./start.sh
\`\`\`

### Step 7: Verify Deployment

1. **Visit Your Website**
   - Go to your domain
   - Should see your portfolio homepage

2. **Test Functionality**
   - Navigate through all pages
   - Test hamburger menu on mobile
   - Try contact form
   - Check blog section

3. **Test Responsive Design**
   - Resize browser window
   - Test on mobile device
   - Verify hamburger menu works

## 🔧 Troubleshooting

### Common Issues and Solutions

**Issue: "Cannot find module" errors**
\`\`\`bash
# Solution: Reinstall dependencies
cd public_html
rm -rf node_modules
npm install --production
\`\`\`

**Issue: Permission denied errors**
\`\`\`bash
# Solution: Fix permissions
chmod 755 *.sh
chmod 644 *.js *.json *.css *.html
find . -type d -exec chmod 755 {} \\;
\`\`\`

**Issue: Application won't start**
- Check Node.js version (must be 16+)
- Verify environment variables are set
- Check startup file is \`server.js\`
- Review error logs in cPanel

**Issue: Static files not loading**
- Verify \`.htaccess\` file exists
- Check file permissions
- Ensure files are in \`public/\` directory

**Issue: Database/blog errors**
- Ensure \`data/\` directory exists
- Check \`data/blog-posts.json\` file exists
- Verify file permissions

**Issue: Hamburger menu not working**
- Check CSS file loads: \`yourdomain.com/css/hamburger-menu.css\`
- Check JS file loads: \`yourdomain.com/js/hamburger-menu.js\`
- Verify no JavaScript errors in browser console

### Checking Logs

**cPanel Error Logs:**
1. Go to cPanel → Error Logs
2. Look for recent entries
3. Check Node.js application logs

**Application Logs:**
\`\`\`bash
# In terminal:
cd public_html
tail -f logs/app.log  # if logging is enabled
\`\`\`

### Performance Optimization

**Enable Compression:**
- \`.htaccess\` file includes compression rules
- Verify mod_deflate is enabled on your host

**Cache Static Assets:**
- CSS and JS files are cached for 1 year
- Images cached for 1 year
- HTML cached for 1 hour

**Monitor Resource Usage:**
- Check CPU and memory usage in cPanel
- Monitor for any resource limit warnings

## 🔒 Security Considerations

### File Permissions
- Directories: 755
- Scripts (.sh): 755
- Other files: 644
- Sensitive files: Protected by .htaccess

### Environment Variables
- Never commit secrets to version control
- Use strong SESSION_SECRET
- Keep SMTP credentials secure

### Updates
- Regularly update Node.js version
- Keep dependencies updated
- Monitor security advisories

## 📱 Testing Checklist

### Desktop Testing
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Desktop menu displays properly
- [ ] Contact form submits
- [ ] Blog section functions
- [ ] Static assets load (CSS, JS, images)

### Mobile Testing
- [ ] Hamburger menu appears on mobile
- [ ] Menu opens/closes smoothly
- [ ] All menu items clickable
- [ ] Responsive design works
- [ ] Touch interactions work
- [ ] Page scrolling works with menu

### Cross-Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

### Performance Testing
- [ ] Page load times acceptable
- [ ] No JavaScript errors
- [ ] CSS loads properly
- [ ] Images optimize correctly

## 🚀 Going Live

### Final Steps
1. **Update Contact Information**
   - Edit contact details in templates
   - Update social media links
   - Configure email settings

2. **Content Review**
   - Review all text content
   - Check for placeholder text
   - Verify project information

3. **SEO Optimization**
   - Update meta descriptions
   - Set proper page titles
   - Add Google Analytics if desired

4. **Backup**
   - Download a backup of your files
   - Document your configuration
   - Save environment variables securely

### Maintenance
- **Regular Updates**: Keep Node.js and dependencies updated
- **Monitoring**: Check application status regularly
- **Backups**: Regular backups of data and files
- **Security**: Monitor for security updates

## 📞 Support

### Hosting Provider Support
- Contact your hosting provider for:
  - Node.js version issues
  - cPanel configuration help
  - Server resource questions

### Application Support
- Check browser console for JavaScript errors
- Review server logs for application errors
- Test functionality step by step

Your Node.js portfolio is now ready for production! 🎉

Visit your domain to see your professional portfolio with the responsive hamburger menu in action.
`

    await fs.writeFile(path.join(deployDir, "DEPLOYMENT-GUIDE.md"), deploymentGuide)

    // Create a quick reference card
    const quickRef = `# Quick Reference - cPanel Node.js Deployment

## 🚀 Essential Commands

### Terminal Commands
\`\`\`bash
# Navigate to app directory
cd public_html

# Install dependencies
npm install --production

# Check Node.js version
node --version

# Test application
node -e "require('./server.js')"

# Set permissions
chmod +x *.sh
chmod 644 *.js *.json

# Start application
./start.sh
\`\`\`

### cPanel Configuration
\`\`\`
App Root: public_html
Startup File: server.js
Node.js Version: 16+
Environment: production
\`\`\`

### Required Environment Variables
\`\`\`
NODE_ENV=production
PORT=3000
SESSION_SECRET=your-secure-key
SITE_URL=https://yourdomain.com
\`\`\`

## 🔧 Troubleshooting Quick Fixes

### App Won't Start
1. Check Node.js version: \`node --version\`
2. Verify startup file: \`server.js\`
3. Check environment variables
4. Review cPanel error logs

### Dependencies Issues
\`\`\`bash
rm -rf node_modules package-lock.json
npm install --production
\`\`\`

### Permission Issues
\`\`\`bash
find . -type d -exec chmod 755 {} \\;
find . -type f -exec chmod 644 {} \\;
chmod +x *.sh
\`\`\`

### Static Files Not Loading
1. Check .htaccess exists
2. Verify file paths in templates
3. Test direct file access

## 📱 Testing URLs
- Homepage: \`https://yourdomain.com/\`
- Health check: \`https://yourdomain.com/health\`
- CSS test: \`https://yourdomain.com/css/hamburger-menu.css\`
- JS test: \`https://yourdomain.com/js/hamburger-menu.js\`

## 🆘 Emergency Recovery
1. Re-upload deployment package
2. Extract fresh files
3. Run \`./install.sh\`
4. Restart application in cPanel

Remember: Always backup before making changes!
`

    await fs.writeFile(path.join(deployDir, "QUICK-REFERENCE.md"), quickRef)

    console.log("✅ Enhanced cPanel deployment package created!")
    console.log("📁 Location: ./cpanel-deploy")
    console.log("📋 Files included:")
    console.log("   - All application files")
    console.log("   - Enhanced .htaccess")
    console.log("   - Installation script")
    console.log("   - Startup script")
    console.log("   - Comprehensive deployment guide")
    console.log("   - Quick reference card")
  } catch (error) {
    console.error("❌ Error creating deployment package:", error)
  }
}

// Run the enhanced deployment creation
createEnhancedCPanelDeployment()
