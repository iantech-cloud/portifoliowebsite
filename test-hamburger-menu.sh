#!/bin/bash

echo "🧪 Hamburger Menu Testing Script"
echo "================================"

# Check if we're in the right directory
if [ ! -f "server.js" ]; then
    echo "❌ Error: Not in project root directory"
    echo "Please run this script from your project root"
    exit 1
fi

# Check if required files exist
echo "📁 Checking required files..."

required_files=(
    "public/css/hamburger-menu.css"
    "public/js/hamburger-menu.js"
    "public/js/menu-integration.js"
    "public/test-hamburger.html"
    "views/partials/navigation-enhanced.ejs"
)

missing_files=()

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (missing)"
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -gt 0 ]; then
    echo ""
    echo "⚠️  Missing files detected. Please ensure all files are created."
    exit 1
fi

echo ""
echo "📦 All required files found!"

# Check if server is running
echo ""
echo "🔍 Checking if server is running..."

if curl -s http://localhost:3000/health > /dev/null 2>&1; then
    echo "✅ Server is running on port 3000"
    SERVER_RUNNING=true
else
    echo "⚠️  Server not running. Starting server..."
    SERVER_RUNNING=false
fi

# Start server if not running
if [ "$SERVER_RUNNING" = false ]; then
    echo "🚀 Starting development server..."
    npm run dev &
    SERVER_PID=$!
    
    # Wait for server to start
    echo "⏳ Waiting for server to start..."
    sleep 5
    
    # Check if server started successfully
    if curl -s http://localhost:3000/health > /dev/null 2>&1; then
        echo "✅ Server started successfully"
    else
        echo "❌ Failed to start server"
        exit 1
    fi
fi

echo ""
echo "🧪 Running Hamburger Menu Tests"
echo "==============================="

# Test 1: Check if test page loads
echo "Test 1: Loading test page..."
if curl -s http://localhost:3000/test-hamburger.html > /dev/null 2>&1; then
    echo "✅ Test page loads successfully"
else
    echo "❌ Test page failed to load"
fi

# Test 2: Check CSS file accessibility
echo "Test 2: Checking CSS file..."
if curl -s http://localhost:3000/css/hamburger-menu.css > /dev/null 2>&1; then
    echo "✅ CSS file accessible"
else
    echo "❌ CSS file not accessible"
fi

# Test 3: Check JavaScript file accessibility
echo "Test 3: Checking JavaScript file..."
if curl -s http://localhost:3000/js/hamburger-menu.js > /dev/null 2>&1; then
    echo "✅ JavaScript file accessible"
else
    echo "❌ JavaScript file not accessible"
fi

# Test 4: Check main pages load with new navigation
echo "Test 4: Checking main pages..."
pages=("/" "/about" "/skills" "/portfolio" "/blog" "/contact")

for page in "${pages[@]}"; do
    if curl -s "http://localhost:3000$page" > /dev/null 2>&1; then
        echo "✅ $page loads successfully"
    else
        echo "❌ $page failed to load"
    fi
done

echo ""
echo "📋 Manual Testing Instructions"
echo "============================="
echo ""
echo "1. Open your browser and navigate to:"
echo "   🔗 http://localhost:3000/test-hamburger.html"
echo ""
echo "2. Test the following on MOBILE view (resize browser < 768px):"
echo "   ✓ Hamburger button is visible"
echo "   ✓ Click hamburger button to open menu"
echo "   ✓ Menu slides in from the right"
echo "   ✓ Overlay appears behind menu"
echo "   ✓ Click overlay to close menu"
echo "   ✓ Click close button (×) to close menu"
echo "   ✓ Press Escape key to close menu"
echo "   ✓ Menu items are clickable"
echo "   ✓ Active menu item is highlighted"
echo ""
echo "3. Test the following on DESKTOP view (resize browser ≥ 768px):"
echo "   ✓ Hamburger button is hidden"
echo "   ✓ Desktop navigation is visible"
echo "   ✓ Desktop nav items are clickable"
echo "   ✓ Active nav item is highlighted"
echo ""
echo "4. Test ACCESSIBILITY:"
echo "   ✓ Tab to hamburger button and press Enter"
echo "   ✓ Tab through menu items when open"
echo "   ✓ Press Alt+M to toggle menu"
echo "   ✓ Screen reader compatibility (if available)"
echo ""
echo "5. Test RESPONSIVE behavior:"
echo "   ✓ Resize browser window"
echo "   ✓ Test on actual mobile device"
echo "   ✓ Test orientation changes"
echo ""
echo "6. Test INTEGRATION:"
echo "   ✓ Navigate to other pages: http://localhost:3000/"
echo "   ✓ Verify hamburger menu works on all pages"
echo "   ✓ Check that active menu item updates correctly"
echo ""

# Cleanup function
cleanup() {
    if [ ! -z "$SERVER_PID" ]; then
        echo ""
        echo "🛑 Stopping test server..."
        kill $SERVER_PID 2>/dev/null
    fi
}

# Set trap for cleanup
trap cleanup EXIT

echo "🎯 Testing URLs:"
echo "   Main site: http://localhost:3000/"
echo "   Test page: http://localhost:3000/test-hamburger.html"
echo ""
echo "Press Ctrl+C to stop the test server and exit"
echo ""

# Keep script running if we started the server
if [ "$SERVER_RUNNING" = false ]; then
    wait $SERVER_PID
fi
