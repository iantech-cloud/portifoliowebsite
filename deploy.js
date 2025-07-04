const fs = require("fs-extra")
const path = require("path")
const archiver = require("archiver")

async function createDeploymentPackage() {
  console.log("🚀 Creating deployment package...")

  try {
    // Create deployment directory
    const deployDir = path.join(__dirname, "deploy")
    await fs.ensureDir(deployDir)
    await fs.emptyDir(deployDir)

    // Copy necessary files
    const filesToCopy = ["server.js", "package.json", "routes", "views", "public", "data"]

    for (const file of filesToCopy) {
      const srcPath = path.join(__dirname, file)
      const destPath = path.join(deployDir, file)

      if (await fs.pathExists(srcPath)) {
        await fs.copy(srcPath, destPath)
        console.log(`✅ Copied ${file}`)
      }
    }

    // Create .htaccess for shared hosting
    const htaccess = `
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ server.js [L]

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain text/html text/xml text/css application/xml application/xhtml+xml application/rss+xml application/javascript application/x-javascript
</IfModule>

# Cache control
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
        `

    await fs.writeFile(path.join(deployDir, ".htaccess"), htaccess.trim())

    // Create deployment instructions
    const instructions = `
# Deployment Instructions for Shared Hosting

## Prerequisites
- Node.js support on your hosting provider
- SSH or terminal access
- File upload capability

## Deployment Steps

1. Upload all files to your hosting directory (usually public_html)

2. Install dependencies:
   npm install --production

3. Set environment variables in your hosting control panel:
   - NODE_ENV=production
   - SESSION_SECRET=your-secret-key
   - SMTP_HOST=your-smtp-host (optional)
   - SMTP_USER=your-smtp-user (optional)
   - SMTP_PASS=your-smtp-password (optional)
   - CONTACT_EMAIL=your-email@example.com

4. Start the application:
   npm start

5. Configure your hosting to run Node.js applications
   - Set the startup file to: server.js
   - Set the port as required by your hosting provider

## File Structure
- server.js - Main application file
- routes/ - Route handlers
- views/ - EJS templates
- public/ - Static assets
- data/ - JSON data files

## Troubleshooting
- Ensure Node.js version is 16+ 
- Check file permissions (644 for files, 755 for directories)
- Verify environment variables are set correctly
- Check hosting provider's Node.js documentation

## Support
Contact your hosting provider for Node.js specific configuration help.
        `

    await fs.writeFile(path.join(deployDir, "DEPLOYMENT.md"), instructions.trim())

    console.log("✅ Deployment package created in ./deploy directory")
    console.log("📋 Next steps:")
    console.log("1. Upload contents of ./deploy directory to your hosting")
    console.log("2. Run: npm install --production")
    console.log("3. Configure environment variables")
    console.log("4. Start with: npm start")
  } catch (error) {
    console.error("❌ Error creating deployment package:", error)
  }
}

// Run deployment
createDeploymentPackage()
