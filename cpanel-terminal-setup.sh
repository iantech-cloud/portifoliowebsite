#!/bin/bash

echo "🚀 cPanel Terminal Setup Script"
echo "==============================="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check Node.js
if command_exists node; then
    echo "✅ Node.js found: $(node --version)"
else
    echo "❌ Node.js not found. Please install Node.js through cPanel."
    exit 1
fi

# Check npm
if command_exists npm; then
    echo "✅ npm found: $(npm --version)"
else
    echo "❌ npm not found. Please ensure npm is installed."
    exit 1
fi

# Create deployment package
echo "📦 Creating cPanel deployment package..."
node cpanel-deploy.js

if [ $? -eq 0 ]; then
    echo "✅ Deployment package created successfully!"
else
    echo "❌ Error creating deployment package"
    exit 1
fi

# Create zip file for upload
echo "🗜️ Creating zip file for upload..."
cd cpanel-deploy
zip -r ../portfolio-cpanel.zip . -x "*.DS_Store" "node_modules/*"
cd ..

echo ""
echo "🎉 Setup Complete!"
echo "==================="
echo ""
echo "📁 Files created:"
echo "   - cpanel-deploy/ (deployment folder)"
echo "   - portfolio-cpanel.zip (upload this to cPanel)"
echo ""
echo "📋 Next Steps:"
echo "1. Upload portfolio-cpanel.zip to cPanel File Manager"
echo "2. Extract in public_html directory"
echo "3. Open cPanel Terminal and run:"
echo "   cd public_html"
echo "   chmod +x install.sh"
echo "   ./install.sh"
echo ""
echo "4. Configure Node.js app in cPanel:"
echo "   - App Root: public_html"
echo "   - Startup File: server.js"
echo "   - Node.js Version: 16+"
echo ""
echo "5. Set environment variables and start the app"
echo ""
echo "📖 Read DEPLOYMENT-GUIDE.md for detailed instructions"
