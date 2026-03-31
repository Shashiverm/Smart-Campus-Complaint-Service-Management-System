#!/bin/bash

# Smart Campus Deployment Setup Script
# This script helps you prepare the application for deployment

set -e

echo "================================"
echo "Smart Campus Deployment Setup"
echo "================================"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
  echo -e "${GREEN}✓${NC} $1"
}

print_error() {
  echo -e "${RED}✗${NC} $1"
}

print_warning() {
  echo -e "${YELLOW}!${NC} $1"
}

# Check if .env files exist
echo ""
echo "Checking environment files..."

if [ -f "backend/.env" ]; then
  print_status "Backend .env found"
else
  print_warning "Backend .env not found"
  echo "  Creating from template..."
  cp backend/.env.example backend/.env
  echo "  Please update backend/.env with your values"
fi

if [ -f "frontend/.env.local" ]; then
  print_status "Frontend .env.local found"
else
  print_warning "Frontend .env.local not found"
  echo "  Creating from template..."
  cp frontend/.env.example frontend/.env.local
  echo "  Please update frontend/.env.local with your values"
fi

echo ""
echo "Checking dependencies..."

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -ge 20 ]; then
  print_status "Node.js v$NODE_VERSION (required: v20+)"
else
  print_error "Node.js version $NODE_VERSION is too old (required: v20+)"
  exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
  NPM_VERSION=$(npm -v)
  print_status "npm v$NPM_VERSION found"
else
  print_error "npm not found"
  exit 1
fi

echo ""
echo "Installation steps:"
echo ""

echo "1. Backend Installation"
echo "   cd backend"
echo "   npm install"
echo ""

echo "2. Frontend Installation"
echo "   cd frontend"
echo "   npm install"
echo ""

echo "3. Environment Configuration"
echo "   - Update backend/.env with database credentials"
echo "   - Update frontend/.env.local with API URL"
echo ""

echo "4. Local Development"
echo "   Terminal 1: cd backend && npm run dev"
echo "   Terminal 2: cd frontend && npm run dev"
echo ""

echo "5. Production Build"
echo "   cd frontend && npm run build"
echo ""

echo "6. Deployment"
echo "   - Frontend: Push to GitHub and deploy to Vercel"
echo "   - Backend: Push to GitHub and deploy to Railway/Render"
echo ""

print_status "Setup script completed!"
echo ""
echo "For detailed deployment instructions, see DEPLOYMENT_GUIDE.md"
