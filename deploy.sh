#!/bin/bash

echo "🚀 Starting Node.js deployment process..."

# Build CSS
echo "📦 Building CSS..."
npm run build:css

# Create deployment package
echo "📦 Creating deployment package..."
node deploy.js

# Create zip file for upload
echo "🗜️ Creating zip file..."
cd deploy
zip -r ../portfolio-nodejs.zip .
cd ..

echo "✅ Deployment package created: portfolio-nodejs.zip"
echo ""
echo "📋 Deployment Instructions:"
echo "1. Upload portfolio-nodejs.zip to your cPanel File Manager"
echo "2. Extract it in your public_html directory"
echo "3. SSH into your server and run:"
echo "   cd public_html"
echo "   npm install --production"
echo "   npm start"
echo ""
echo "🔧 Environment Variables to set in cPanel:"
echo "   NODE_ENV=production"
echo "   SESSION_SECRET=your-secret-key"
echo "   PORT=3000 (or as required by your host)"
echo ""
echo "🌐 Your Node.js portfolio will be live!"
