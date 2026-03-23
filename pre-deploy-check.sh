#!/bin/bash

# College Pro - Pre-Deployment Verification Script

echo "================================"
echo "College Pro Deployment Checker"
echo "================================"
echo ""

# Check if Git is configured
echo "✓ Checking Git configuration..."
if git config user.email > /dev/null 2>&1; then
    echo "  Git user: $(git config user.name) <$(git config user.email)>"
else
    echo "  ⚠️  Git not configured. Run: git config --global user.email 'email@example.com'"
fi
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
if command -v node &> /dev/null; then
    echo "  Node version: $(node --version)"
else
    echo "  ❌ Node.js not installed"
fi
echo ""

# Check npm
echo "✓ Checking npm..."
if command -v npm &> /dev/null; then
    echo "  npm version: $(npm --version)"
else
    echo "  ❌ npm not installed"
fi
echo ""

# Check Backend
echo "✓ Checking Backend..."
if [ -f "Backend/package.json" ]; then
    echo "  ✓ Backend/package.json exists"
    if grep -q '"start"' Backend/package.json; then
        echo "  ✓ Start script configured"
    fi
    if grep -q '"dev"' Backend/package.json; then
        echo "  ✓ Dev script configured"
    fi
else
    echo "  ❌ Backend/package.json not found"
fi

if [ -f "Backend/.env.example" ]; then
    echo "  ✓ Backend/.env.example exists"
else
    echo "  ⚠️  Backend/.env.example not found"
fi

if [ -f "Backend/render.yaml" ]; then
    echo "  ✓ Backend/render.yaml exists"
else
    echo "  ⚠️  Backend/render.yaml not found"
fi
echo ""

# Check Frontend
echo "✓ Checking Frontend..."
if [ -f "Frontend/package.json" ]; then
    echo "  ✓ Frontend/package.json exists"
    if grep -q '"build"' Frontend/package.json; then
        echo "  ✓ Build script configured"
    fi
else
    echo "  ❌ Frontend/package.json not found"
fi

if [ -f "Frontend/vite.config.js" ]; then
    echo "  ✓ Frontend/vite.config.js exists"
else
    echo "  ⚠️  Frontend/vite.config.js not found"
fi

if [ -f "Frontend/vercel.json" ]; then
    echo "  ✓ Frontend/vercel.json exists"
else
    echo "  ⚠️  Frontend/vercel.json not found"
fi

if [ -f "Frontend/.env.production" ]; then
    echo "  ✓ Frontend/.env.production exists"
else
    echo "  ⚠️  Frontend/.env.production not found"
fi
echo ""

# Check .gitignore
echo "✓ Checking .gitignore..."
if [ -f ".gitignore" ]; then
    if grep -q "\.env" .gitignore; then
        echo "  ✓ .env files are ignored"
    else
        echo "  ⚠️  .env files might be committed"
    fi
    if grep -q "node_modules" .gitignore; then
        echo "  ✓ node_modules is ignored"
    fi
else
    echo "  ⚠️  .gitignore not found"
fi
echo ""

echo "================================"
echo "Pre-deployment check complete!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Create MongoDB Atlas cluster"
echo "2. Set up Render account"
echo "3. Set up Vercel account"
echo "4. Update environment variables"
echo "5. Push to GitHub"
echo "6. Deploy on Render and Vercel"
echo ""
echo "See DEPLOYMENT_GUIDE.md for detailed instructions"
