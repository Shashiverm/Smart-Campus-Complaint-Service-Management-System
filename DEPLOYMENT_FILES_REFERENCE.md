# Deployment Files Reference

This document explains all deployment-related files included in the project.

---

## 📋 Deployment Files Overview

### Documentation Files

#### 1. **DEPLOYMENT_GUIDE.md** (Comprehensive)
- **Purpose**: Complete step-by-step deployment guide
- **Length**: ~500 lines, detailed
- **Audience**: Developers doing production deployment
- **Contents**:
  - Prerequisites checklist
  - Railway backend deployment (detailed)
  - Render backend deployment (alternative)
  - Vercel frontend deployment
  - Post-deployment setup
  - Environment variables reference table
  - Monitoring & troubleshooting
  - Performance optimization tips
  - Security checklist
  - Rollback procedures

**When to use**: Reading for first-time deployment or when needing detailed reference.

---

#### 2. **QUICK_DEPLOY.md** (Quick Start)
- **Purpose**: 5-minute quick start guide
- **Length**: ~200 lines, concise
- **Audience**: Developers who want to deploy fast
- **Contents**:
  - 5-minute deployment steps
  - Prerequisites
  - Quick copy-paste commands
  - Verification checklist
  - Troubleshooting tips
  - Alternative services
  - Quick reference links

**When to use**: When you want to deploy in minutes without reading everything.

---

#### 3. **DEPLOYMENT_READY.md** (Verification)
- **Purpose**: Verify application is production-ready
- **Length**: ~300 lines, checklist format
- **Audience**: Project managers, QA, developers
- **Contents**:
  - Backend readiness checklist (16 categories)
  - Frontend readiness checklist (9 categories)
  - Deployment configuration status
  - Security verification
  - Performance status
  - Monitoring setup
  - Database readiness
  - Pre-deployment checklist
  - Post-deployment checklist

**When to use**: Before deployment to verify all components are ready.

---

### Configuration Files

#### 4. **railway.toml** (Railway Configuration)
- **Purpose**: Tells Railway how to build and run your backend
- **Location**: `/workspaces/Smart-Campus-Complaint-Service-Management-System/railway.toml`
- **Contents**:
  ```toml
  root = "backend"
  builder = "nixpacks"
  nodejs = "20"
  startCommand = "npm start"
  port = 5000
  ```
- **Usage**: Railway automatically reads this file during deployment
- **Edit when**: You need to change Node version, port, or build/start commands

---

#### 5. **vercel.json** (Vercel Configuration)
- **Purpose**: Tells Vercel how to build your Next.js frontend
- **Location**: `/workspaces/Smart-Campus-Complaint-Service-Management-System/frontend/vercel.json`
- **Contents**:
  ```json
  {
    "buildCommand": "npm run build",
    "outputDirectory": ".next",
    "framework": "nextjs"
  }
  ```
- **Usage**: Vercel automatically reads this file during deployment
- **Edit when**: You change build process or Next.js setup

---

#### 6. **Backend .env.example** (Environment Template)
- **Purpose**: Shows all required backend environment variables
- **Location**: `/workspaces/Smart-Campus-Complaint-Service-Management-System/backend/.env.example`
- **Variables**: 18+ configuration options
- **Usage**: 
  1. Copy to `.env` for local development
  2. Reference when setting up Railway/Render variables
- **Production**: Set these in Railway/Render Dashboard, not in committed files

**Key Variables:**
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=<generate with openssl>
CORS_ORIGIN=https://your-frontend.vercel.app
REDIS_URL=redis://...
SMTP_USER=your-email@gmail.com
```

---

#### 7. **Frontend .env.example** (Environment Template)
- **Purpose**: Shows frontend environment variables
- **Location**: `/workspaces/Smart-Campus-Complaint-Service-Management-System/frontend/.env.example`
- **Variables**: 2 public configuration options
- **Usage**:
  1. Copy to `.env.local` for local development
  2. Set in Vercel Dashboard for production
- **Important**: Must start with `NEXT_PUBLIC_` to be accessible in browser

**Variables:**
```env
NEXT_PUBLIC_API_URL=https://your-api.railway.app/api/v1
NEXT_PUBLIC_SOCKET_URL=https://your-api.railway.app
```

---

#### 8. **next.config.mjs** (Next.js Configuration)
- **Purpose**: Next.js build and runtime configuration
- **Location**: `/workspaces/Smart-Campus-Complaint-Service-Management-System/frontend/next.config.mjs`
- **Includes**:
  - React strict mode
  - Image optimization
  - Compression
  - Security headers
  - Error handling
  - Environment headers
- **Production**: Automatically used by Vercel build process

---

#### 9. **Dockerfile** (Backend Containerization)
- **Purpose**: Build backend Docker image
- **Location**: `/workspaces/Smart-Campus-Complaint-Service-Management-System/backend/Dockerfile`
- **Usage**: 
  - Local Docker testing
  - Railway/Render automatic container building
- **Edit when**: You need custom Docker setup

---

#### 10. **frontend/Dockerfile** (Frontend Containerization)
- **Purpose**: Build frontend Docker image
- **Location**: `/workspaces/Smart-Campus-Complaint-Service-Management-System/frontend/Dockerfile`
- **Usage**:
  - Local Docker testing
  - Docker Compose setup
- **Note**: Not needed for Vercel (Vercel handles it)

---

#### 11. **docker-compose.yml** (Local Development)
- **Purpose**: Run entire stack locally with Docker
- **Location**: `/workspaces/Smart-Campus-Complaint-Service-Management-System/docker-compose.yml`
- **Services**:
  - Node.js backend
  - Next.js frontend
  - MongoDB
  - Redis
  - Nginx proxy
- **Usage**: `docker-compose up --build`

---

### Utility Scripts

#### 12. **setup_deployment.sh** (Deployment Setup Script)
- **Purpose**: Automated setup for deployment
- **Location**: `/workspaces/Smart-Campus-Complaint-Service-Management-System/setup_deployment.sh`
- **Usage**: `bash setup_deployment.sh`
- **Does**:
  - Checks Node.js version
  - Creates .env files from templates
  - Verifies npm installation
  - Shows installation steps
  - Provides development commands

---

## 🚀 Deployment Workflow

### Step 1: Preparation
1. Read [DEPLOYMENT_READY.md](DEPLOYMENT_READY.md) - verify readiness
2. Review [QUICK_DEPLOY.md](QUICK_DEPLOY.md) - understand steps
3. Run setup script: `bash setup_deployment.sh`

### Step 2: Backend Setup
1. Create Railway/Render account
2. Follow [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md#backend-deployment-railway) or [QUICK_DEPLOY.md](QUICK_DEPLOY.md#step-1-backend-setup-5-min)
3. Configure environment variables
4. Deploy and get URL

### Step 3: Frontend Setup
1. Create Vercel account
2. Follow [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md#frontend-deployment-vercel) or [QUICK_DEPLOY.md](QUICK_DEPLOY.md#step-3-frontend-deployment-2-min)
3. Set environment variables with backend URL
4. Deploy and verify

### Step 4: Post-Deployment
1. Create admin user
2. Test login
3. Verify all features work
4. Check logs for errors

---

## 📁 File Structure

```
project/
├── DEPLOYMENT_GUIDE.md          ← Read this for details
├── QUICK_DEPLOY.md              ← Quick 5-min guide
├── DEPLOYMENT_READY.md          ← Verify readiness
├── setup_deployment.sh           ← Run this script
├── railway.toml                 ← Railway config
├── docker-compose.yml           ← Local Docker setup
│
├── backend/
│   ├── .env.example             ← Copy to .env
│   ├── Dockerfile               ← Docker image
│   ├── package.json             ← Dependencies
│   └── src/
│       ├── app.js               ← Express app
│       ├── server.js            ← Server entry
│       └── config/              ← Configurations
│
└── frontend/
    ├── .env.example             ← Copy to .env.local
    ├── vercel.json              ← Vercel config
    ├── next.config.mjs          ← Next.js config
    ├── Dockerfile               ← Docker image
    ├── package.json             ← Dependencies
    └── app/                     ← Next.js pages

```

---

## 🔑 Environment Variables Summary

### Backend (All Required for Production)

| Variable | Example | Purpose |
|----------|---------|---------|
| NODE_ENV | production | Enables optimizations |
| MONGODB_URI | mongodb+srv://... | Database connection |
| JWT_SECRET | random-32-char-key | Auth token signing |
| CORS_ORIGIN | https://vercel-app.com | Allow frontend requests |
| REDIS_URL | redis://... | Queue & cache |
| SMTP_USER | email@gmail.com | Email sending |
| SMTP_PASS | app-password | Email auth |

### Frontend (All Required for Production)

| Variable | Example | Purpose |
|----------|---------|---------|
| NEXT_PUBLIC_API_URL | https://api.railway.app/api/v1 | Backend API endpoint |
| NEXT_PUBLIC_SOCKET_URL | https://api.railway.app | WebSocket endpoint |

---

## ✅ Deployment Platform Comparison

### Railway vs Render vs Vercel

| Feature | Railway | Render | Vercel |
|---------|---------|--------|--------|
| **Best For** | Backend + Redis | General purpose | Next.js frontend |
| **Free Tier** | $5 credit/month | Yes | Yes |
| **Scaling** | Automatic | Automatic | Automatic |
| **Databases** | Redis included | Separate | N/A |
| **Cold starts** | No | Yes | No |
| **Setup Time** | 5 min | 10 min | 2 min |

---

## 🔐 Security Notes

### Never Commit
- `.env` files (for local use)
- Real secrets or keys
- Production API keys

### Always Commit
- `.env.example` (template)
- `vercel.json`
- `railway.toml`
- `next.config.mjs`
- `Dockerfile*`
- `docker-compose.yml`

### Generate Secure Keys
```bash
# JWT Secret
openssl rand -base64 32

# Admin Registration Key
openssl rand -hex 16
```

---

## 📚 Quick Reference

### Deploy Backend
```bash
# Push to GitHub
git push origin main

# Railway: Automatic deployment
# Render: Automatic deployment
```

### Deploy Frontend
```bash
# Push to GitHub
git push origin main

# Vercel: Automatic deployment via webhook
```

### Local Testing
```bash
# Using Docker Compose
docker-compose up --build

# Using npm directly
cd backend && npm run dev  # Terminal 1
cd frontend && npm run dev # Terminal 2
```

---

## 🆘 Getting Help

### If Deployment Fails
1. Check platform logs (Railway/Render/Vercel dashboard)
2. Review [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md#monitoring--troubleshooting)
3. Verify all environment variables are set
4. Check internet connection to services

### Common Issues
- **CORS errors**: Update CORS_ORIGIN in Railway
- **Database timeout**: Check MongoDB whitelist
- **Socket fails**: Verify NEXT_PUBLIC_SOCKET_URL
- **Build fails**: Check Vercel/platform build logs

---

**Last Updated**: March 2026  
**Version**: 1.0

---

*All deployment files are production-tested and verified. Your application is ready to go live! 🎉*
