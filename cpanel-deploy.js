const fs = require("fs-extra")
const path = require("path")

async function createCPanelDeployment() {
  console.log("🚀 Creating cPanel-compatible deployment...")

  try {
    // Create deployment directory
    const deployDir = path.join(__dirname, "cpanel-deploy")
    await fs.ensureDir(deployDir)
    await fs.emptyDir(deployDir)

    // Copy all necessary files
    const filesToCopy = ["server.js", "package.json", "routes", "views", "public", "data"]

    for (const file of filesToCopy) {
      const srcPath = path.join(__dirname, file)
      const destPath = path.join(deployDir, file)

      if (await fs.pathExists(srcPath)) {
        await fs.copy(srcPath, destPath)
        console.log(`✅ Copied ${file}`)
      }
    }

    // Create startup script for cPanel
    const startupScript = `#!/bin/bash
# cPanel Node.js startup script

echo "🚀 Starting Portfolio Application..."

# Set environment variables
export NODE_ENV=production
export PORT=3000
export SESSION_SECRET=your-secret-key-change-this

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install --production
fi

# Start the application
echo "🌟 Starting server on port $PORT..."
node server.js
`

    await fs.writeFile(path.join(deployDir, "start.sh"), startupScript)

    // Create .htaccess for Apache configuration
    const htaccess = `# Node.js Application Configuration
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

# Cache Control
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

<FilesMatch "\\.(env|log)$">
    Order Allow,Deny
    Deny from all
</FilesMatch>
`

    await fs.writeFile(path.join(deployDir, ".htaccess"), htaccess)

    // Create environment configuration file
    const envConfig = `# Environment Configuration
# Copy this content to your cPanel environment variables or .env file

NODE_ENV=production
PORT=3000
SESSION_SECRET=change-this-to-a-secure-random-string

# Email Configuration (Optional)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password
# CONTACT_EMAIL=your-email@example.com

# Site Configuration
SITE_URL=https://yourdomain.com
`

    await fs.writeFile(path.join(deployDir, "env-config.txt"), envConfig)

    // Create installation script for cPanel terminal
    const installScript = `#!/bin/bash
# Installation script for cPanel Terminal

echo "🚀 Portfolio Installation Script"
echo "================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the correct directory."
    exit 1
fi

# Install dependencies
echo "📦 Installing Node.js dependencies..."
npm install --production

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Error installing dependencies. Check your Node.js version."
    exit 1
fi

# Create data directory if it doesn't exist
if [ ! -d "data" ]; then
    echo "📁 Creating data directory..."
    mkdir -p data
    echo "[]" > data/blog-posts.json
    chmod 644 data/blog-posts.json
fi

# Set proper permissions
echo "🔐 Setting file permissions..."
find . -type f -name "*.js" -exec chmod 644 {} \\;
find . -type f -name "*.json" -exec chmod 644 {} \\;
find . -type f -name "*.ejs" -exec chmod 644 {} \\;
find . -type f -name "*.css" -exec chmod 644 {} \\;
find . -type f -name "*.html" -exec chmod 644 {} \\;
find . -type d -exec chmod 755 {} \\;
chmod 755 start.sh
chmod 755 install.sh

echo "✅ Installation completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Configure your Node.js app in cPanel:"
echo "   - App Root: $(pwd)"
echo "   - Startup File: server.js"
echo "   - Node.js Version: 16 or higher"
echo ""
echo "2. Set environment variables in cPanel Node.js section"
echo "3. Start your application"
echo ""
echo "🌐 Your portfolio will be available at your domain!"
`

    await fs.writeFile(path.join(deployDir, "install.sh"), installScript)

    // Create comprehensive deployment guide
    const deploymentGuide = `# cPanel Deployment Guide (No SSH Required)

## Step 1: Upload Files

1. **Compress the deployment folder:**
   - Zip the entire 'cpanel-deploy' folder contents
   - Name it: portfolio-nodejs.zip

2. **Upload via cPanel File Manager:**
   - Login to cPanel → File Manager
   - Navigate to public_html
   - Upload portfolio-nodejs.zip
   - Extract the zip file
   - Delete the zip file after extraction

## Step 2: Configure Node.js Application

1. **In cPanel, find "Node.js" or "Node.js Apps"**
2. **Click "Create Application"**
3. **Configure:**
   - Node.js Version: 16.x or higher
   - Application Mode: Production
   - Application Root: public_html
   - Application URL: yourdomain.com
   - Application Startup File: server.js

## Step 3: Set Environment Variables

In the Node.js application settings, add these variables:

\`\`\`
NODE_ENV=production
PORT=3000
SESSION_SECRET=your-secure-random-string-here
SITE_URL=https://yourdomain.com
\`\`\`

Optional email variables:
\`\`\`
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=your-email@example.com
\`\`\`

## Step 4: Install Dependencies

1. **Open cPanel Terminal**
2. **Navigate to your directory:**
   \`\`\`bash
   cd public_html
   \`\`\`

3. **Run the installation script:**
   \`\`\`bash
   chmod +x install.sh
   ./install.sh
   \`\`\`

   OR manually install:
   \`\`\`bash
   npm install --production
   \`\`\`

## Step 5: Start Application

1. **In cPanel Node.js section, click "Start"**
2. **Or use terminal:**
   \`\`\`bash
   chmod +x start.sh
   ./start.sh
   \`\`\`

## Step 6: Verify Installation

Visit your domain to see your portfolio!

## Troubleshooting

### Common Issues:

1. **"Cannot find module" errors:**
   - Run: \`npm install --production\`
   - Check Node.js version is 16+

2. **Permission errors:**
   - Run: \`chmod 755 *.sh\`
   - Run: \`chmod 644 *.js *.json\`

3. **Application won't start:**
   - Check environment variables are set
   - Verify startup file is "server.js"
   - Check cPanel error logs

4. **Static files not loading:**
   - Verify .htaccess file is present
   - Check file permissions

### File Permissions:
- Directories: 755
- Script files (.sh): 755  
- Other files (.js, .json, .ejs, .css): 644

### Required Files:
- server.js (main application)
- package.json (dependencies)
- .htaccess (Apache configuration)
- routes/ (route handlers)
- views/ (templates)
- public/ (static assets)
- data/ (JSON storage)

## Support

If you encounter issues:
1. Check cPanel Node.js documentation
2. Contact your hosting provider
3. Check application logs in cPanel

Your portfolio should now be live at your domain!
`

    await fs.writeFile(path.join(deployDir, "DEPLOYMENT-GUIDE.md"), deploymentGuide)

    // Create a simple test script
    const testScript = `#!/bin/bash
# Test script to verify installation

echo "🧪 Testing Portfolio Installation..."

# Check if Node.js is available
if command -v node &> /dev/null; then
    echo "✅ Node.js is available: $(node --version)"
else
    echo "❌ Node.js is not available"
    exit 1
fi

# Check if npm is available
if command -v npm &> /dev/null; then
    echo "✅ npm is available: $(npm --version)"
else
    echo "❌ npm is not available"
    exit 1
fi

# Check if package.json exists
if [ -f "package.json" ]; then
    echo "✅ package.json found"
else
    echo "❌ package.json not found"
    exit 1
fi

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo "✅ node_modules directory exists"
else
    echo "⚠️  node_modules not found - run 'npm install --production'"
fi

# Check if server.js exists
if [ -f "server.js" ]; then
    echo "✅ server.js found"
else
    echo "❌ server.js not found"
    exit 1
fi

# Check if data directory exists
if [ -d "data" ]; then
    echo "✅ data directory exists"
else
    echo "📁 Creating data directory..."
    mkdir -p data
    echo "[]" > data/blog-posts.json
fi

echo ""
echo "🎉 Installation test completed!"
echo "Ready to start your portfolio application."
`

    await fs.writeFile(path.join(deployDir, "test.sh"), testScript)

    console.log("✅ cPanel deployment package created!")
    console.log("📁 Location: ./cpanel-deploy")
    console.log("")
    console.log("📋 Next Steps:")
    console.log("1. Zip the contents of ./cpanel-deploy folder")
    console.log("2. Upload to cPanel File Manager")
    console.log("3. Extract in public_html")
    console.log("4. Follow DEPLOYMENT-GUIDE.md")
  } catch (error) {
    console.error("❌ Error creating deployment package:", error)
  }
}

// Run the deployment creation
createCPanelDeployment()
