#!/bin/bash

echo "🚀 cPanel Node.js Deployment Guide"
echo "=================================="

# Function to create deployment package
create_deployment_package() {
    echo "📦 Creating cPanel deployment package..."
    
    # Run the deployment script
    node cpanel-deploy.js
    
    if [ $? -eq 0 ]; then
        echo "✅ Deployment package created successfully!"
    else
        echo "❌ Error creating deployment package"
        exit 1
    fi
    
    # Create zip file for upload
    echo "🗜️ Creating zip file for cPanel upload..."
    cd cpanel-deploy
    zip -r ../portfolio-cpanel-complete.zip . -x "*.DS_Store" "node_modules/*" "*.log"
    cd ..
    
    echo "✅ Created: portfolio-cpanel-complete.zip"
}

# Function to show deployment steps
show_deployment_steps() {
    echo ""
    echo "📋 cPanel Deployment Steps"
    echo "========================="
    echo ""
    echo "STEP 1: Upload Files to cPanel"
    echo "------------------------------"
    echo "1. Login to your cPanel"
    echo "2. Open 'File Manager'"
    echo "3. Navigate to 'public_html' directory"
    echo "4. Upload 'portfolio-cpanel-complete.zip'"
    echo "5. Right-click the zip file → Extract"
    echo "6. Delete the zip file after extraction"
    echo ""
    
    echo "STEP 2: Configure Node.js Application"
    echo "------------------------------------"
    echo "1. In cPanel, find 'Node.js Apps' or 'Node.js'"
    echo "2. Click 'Create Application'"
    echo "3. Configure settings:"
    echo "   - Node.js Version: 16.x or higher"
    echo "   - Application Mode: Production"
    echo "   - Application Root: public_html"
    echo "   - Application URL: yourdomain.com"
    echo "   - Application Startup File: server.js"
    echo "4. Click 'Create'"
    echo ""
    
    echo "STEP 3: Set Environment Variables"
    echo "--------------------------------"
    echo "In the Node.js application settings, add:"
    echo "   NODE_ENV=production"
    echo "   PORT=3000"
    echo "   SESSION_SECRET=your-secure-random-string"
    echo "   SITE_URL=https://yourdomain.com"
    echo ""
    echo "Optional email variables:"
    echo "   SMTP_HOST=smtp.gmail.com"
    echo "   SMTP_PORT=587"
    echo "   SMTP_USER=your-email@gmail.com"
    echo "   SMTP_PASS=your-app-password"
    echo "   CONTACT_EMAIL=your-email@example.com"
    echo ""
    
    echo "STEP 4: Install Dependencies via Terminal"
    echo "---------------------------------------"
    echo "1. In cPanel, open 'Terminal'"
    echo "2. Navigate to your directory:"
    echo "   cd public_html"
    echo "3. Run the installation script:"
    echo "   chmod +x install.sh"
    echo "   ./install.sh"
    echo ""
    echo "OR manually install:"
    echo "   npm install --production"
    echo ""
    
    echo "STEP 5: Start the Application"
    echo "---------------------------"
    echo "1. In cPanel Node.js section, click 'Start'"
    echo "2. OR use terminal:"
    echo "   chmod +x start.sh"
    echo "   ./start.sh"
    echo ""
    
    echo "STEP 6: Verify Deployment"
    echo "------------------------"
    echo "1. Visit your domain to see your portfolio"
    echo "2. Test the hamburger menu on mobile"
    echo "3. Check all pages load correctly"
    echo "4. Test contact form functionality"
    echo ""
}

# Function to show troubleshooting tips
show_troubleshooting() {
    echo "🔧 Troubleshooting Common Issues"
    echo "==============================="
    echo ""
    echo "Issue: 'Cannot find module' errors"
    echo "Solution: Run 'npm install --production' in terminal"
    echo ""
    echo "Issue: Permission errors"
    echo "Solution: Run 'chmod 755 *.sh' and 'chmod 644 *.js *.json'"
    echo ""
    echo "Issue: Application won't start"
    echo "Solution: Check environment variables and startup file"
    echo ""
    echo "Issue: Static files not loading"
    echo "Solution: Verify .htaccess file exists and has correct permissions"
    echo ""
    echo "Issue: Database/blog errors"
    echo "Solution: Ensure data/ directory exists with proper permissions"
    echo ""
    echo "Issue: Hamburger menu not working"
    echo "Solution: Check CSS/JS files are accessible via browser"
    echo ""
}

# Main execution
echo "This script will help you deploy your Node.js portfolio to cPanel"
echo ""

# Check if we're in the right directory
if [ ! -f "server.js" ]; then
    echo "❌ Error: server.js not found"
    echo "Please run this script from your project root directory"
    exit 1
fi

# Check if deployment script exists
if [ ! -f "cpanel-deploy.js" ]; then
    echo "❌ Error: cpanel-deploy.js not found"
    echo "Please ensure the deployment script exists"
    exit 1
fi

# Create deployment package
create_deployment_package

# Show deployment steps
show_deployment_steps

# Show troubleshooting
show_troubleshooting

echo "🎉 Deployment package ready!"
echo "📁 Upload file: portfolio-cpanel-complete.zip"
echo "📖 Follow the steps above to complete deployment"
