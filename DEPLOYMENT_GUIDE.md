# Deployment Guide - Smart Campus Complaint Management System

Complete step-by-step guide to deploy the frontend to Vercel and backend to Railway or Render.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Backend Deployment (Railway)](#backend-deployment-railway)
3. [Backend Deployment (Render)](#backend-deployment-render)
4. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
5. [Post-Deployment Setup](#post-deployment-setup)
6. [Environment Variables](#environment-variables)
7. [Monitoring & Troubleshooting](#monitoring--troubleshooting)

---

## Prerequisites

Before starting, ensure you have:

- ✅ GitHub account with repository access
- ✅ Vercel account (free tier available)
- ✅ Railway or Render account (free tier available)
- ✅ MongoDB Atlas account (free tier: M0)
- ✅ Redis account (Railway/Render provides it)
- ✅ Email service configured (Gmail, SendGrid, etc.)
- ✅ Cloudinary account (for file uploads)
- ✅ All code committed to GitHub

---

## Backend Deployment (Railway)

Railway is the recommended option for Node.js backends. It's simpler than Render with better defaults.

### Step 1: Prepare Backend Environment Variables

1. Visit [Railway Dashboard](https://railway.app)
2. Create a new project → Select "Deploy from GitHub"
3. Connect your GitHub repository
4. Select the backend folder or root (if monorepo)

### Step 2: Create MongoDB Atlas Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (M0 Free tier)
3. Create a database user (username & password)
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/smart-campus?retryWrites=true&w=majority`
5. Whitelist IP: Allow all (0.0.0.0/0) for testing, restrict in production

### Step 3: Get Redis URL

Railway provides Redis automatically:
- In Railway Dashboard, add Redis service
- Copy the connection string (format: `redis://...`)

### Step 4: Configure Environment Variables in Railway

In Railway Dashboard → Variables:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-campus?retryWrites=true&w=majority

JWT_SECRET=your-very-long-random-secret-key-here (generate with: openssl rand -base64 32)
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://your-frontend.vercel.app

ADMIN_REGISTRATION_KEY=another-random-key-here

# Email Configuration (Gmail example)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password (NOT regular password, generate app password)
EMAIL_FROM=noreply@smartcampus.edu

# Cloudinary (Optional)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Redis (automatically provided by Railway)
REDIS_URL=redis://...
```

### Step 5: Deploy on Railway

1. In Railway Dashboard, select your project
2. Click "Deploy" → "Deploy Main Branch"
3. Wait for deployment to complete
4. Check logs: Services → Backend → Logs
5. Get your backend URL: `https://smart-campus-api-prod.railway.app`

### Test Backend

```bash
curl https://your-backend-url.railway.app/api/v1/health
# Should return: {"ok":true,"service":"smart-campus-api"}
```

---

## Backend Deployment (Render)

Alternative to Railway for Node.js deployment.

### Step 1: Create New Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Web Service"
3. Select "Deploy existing repository" → GitHub
4. Select your repository and branch

### Step 2: Configure Service

**Service Environment:**

```env
Environment: Node
Build Command: npm install && npm run build (if applicable)
Start Command: npm start
Node Version: 20
```

**Environment Variables:** (Add same as Railway)

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
CORS_ORIGIN=https://your-frontend.vercel.app
...
```

### Step 3: Add Redis from Render

1. In Render Dashboard, create new Redis instance
2. Copy connection string to `REDIS_URL`
3. Link to web service

### Step 4: Deploy

1. Click "Create Web Service"
2. Wait for deployment to complete
3. Get your backend URL: `https://smart-campus-api.onrender.com`

---

## Frontend Deployment (Vercel)

### Step 1: Connect GitHub to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Select the `frontend` folder as root directory

### Step 2: Configure Build Settings

**Framework Preset:** Next.js (auto-detected)

```
Build Command: npm run build
Output Directory: .next
```

### Step 3: Set Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

```env
NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api/v1
NEXT_PUBLIC_SOCKET_URL=https://your-backend.railway.app
```

**Important:** These must start with `NEXT_PUBLIC_` to be accessible in the browser.

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Get your frontend URL: `https://smart-campus.vercel.app`

---

## Post-Deployment Setup

### Step 1: Create Admin User

After backend is deployed:

```bash
# Option 1: Via API call
POST https://your-backend.railway.app/api/v1/auth/register
{
  "collegeId": "ADMIN001",
  "name": "Admin User",
  "email": "admin@college.edu",
  "password": "SecurePassword123!",
  "role": "admin",
  "department": "Administration"
}

# Option 2: Via seed command (if your backend supports it)
# SSH into backend and run seed:admin script
```

### Step 2: Test User Logins

**Test URLs:**
- Frontend: `https://your-frontend.vercel.app`
- API Docs: `https://your-backend.railway.app/api/v1/docs`
- Health Check: `https://your-backend.railway.app/api/v1/health`

**Test Credentials:**
- Email: admin@college.edu
- Password: SecurePassword123!

### Step 3: Update Frontend .env Production

1. Create `frontend/.env.production` (only if needed for local testing)
2. Or update in Vercel Dashboard for production builds

### Step 4: Setup Custom Domain (Optional)

**Vercel:**
- Dashboard → Settings → Domains
- Add your domain (e.g., campus.yourcompany.com)
- Update DNS records

**Railway/Render:**
- Similar process in Settings → Custom Domains

---

## Environment Variables

### Backend Required Variables

| Variable | Required | Example | Notes |
|----------|----------|---------|-------|
| NODE_ENV | Yes | production | Set to "production" for performance |
| PORT | No | 5000 | Auto-set by platform |
| MONGODB_URI | Yes | mongodb+srv://... | Use MongoDB Atlas |
| JWT_SECRET | Yes | random-string-32+ | Generate with `openssl rand -base64 32` |
| JWT_EXPIRES_IN | No | 7d | Token expiration time |
| CORS_ORIGIN | Yes | https://vercel-app.com | Frontend URL |
| ADMIN_REGISTRATION_KEY | Yes | random-key | For admin registration |
| SMTP_HOST | Yes | smtp.gmail.com | Email provider |
| SMTP_PORT | Yes | 587 | Email port |
| SMTP_USER | Yes | your-email@gmail.com | Email account |
| SMTP_PASS | Yes | app-password | App-specific password (not regular password) |
| EMAIL_FROM | Yes | noreply@campus.edu | Sender email |
| REDIS_URL | Yes | redis://... | For queue/cache |
| CLOUDINARY_* | No | ... | Optional file uploads |

### Frontend Public Variables

```env
# Must start with NEXT_PUBLIC_
NEXT_PUBLIC_API_URL=https://your-api.railway.app/api/v1
NEXT_PUBLIC_SOCKET_URL=https://your-api.railway.app
```

---

## Monitoring & Troubleshooting

### Backend Monitoring

**Railway/Render Logs:**
- Check deployment logs for errors
- Monitor real-time logs: Services → Backend → Logs

**Test Backend Endpoints:**

```bash
# Health check
curl https://your-backend.railway.app/api/v1/health

# Swagger docs
https://your-backend.railway.app/api/v1/docs

# Test login
curl -X POST https://your-backend.railway.app/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@college.edu","password":"password"}'
```

### Frontend Monitoring

**Vercel Logs:**
- Dashboard → Deployments → Select build → Logs

**Common Issues:**

| Issue | Solution |
|-------|----------|
| CORS errors | Update CORS_ORIGIN in backend env vars |
| 404 on API calls | Verify NEXT_PUBLIC_API_URL is correct |
| WebSocket connection fails | Check NEXT_PUBLIC_SOCKET_URL |
| Build failures | Check Vercel build logs for error messages |
| Database timeout | Verify MongoDB Atlas whitelist IP |

### Database Backups

**MongoDB Atlas:**
- Enable automatic backups: Atlas Dashboard → Backup
- Download backup snapshots for safety

**Redis:**
- Railway/Render provide automatic backups
- Consider exporting critical data periodically

---

## Performance Optimization

### Frontend (Vercel)

- Enable Vercel Analytics: Dashboard → Analytics
- Use Image Optimization: Built into Next.js
- Monitor Web Vitals: Vercel Dashboard

### Backend (Railway/Render)

- Enable Redis caching for frequently accessed data
- Monitor database indexes
- Set up rate limiting (already configured)

### Database

- MongoDB: Use indexes on frequently queried fields
- Regular vacuuming and optimization

---

## Security Checklist

- ✅ All secrets changed from defaults
- ✅ CORS_ORIGIN set to production frontend URL
- ✅ MongoDB IP whitelist (restrict to backend IP only)
- ✅ SSL/TLS enabled (automatic on Vercel/Railway)
- ✅ Rate limiting enabled
- ✅ Helmet security headers enabled
- ✅ JWT secrets are strong (32+ characters)
- ✅ Email credentials use app-specific passwords
- ✅ No sensitive data in version control (.env added to .gitignore)

---

## Rollback Procedure

### If Deployment Fails

**Vercel:**
1. Dashboard → Deployments
2. Select previous stable version
3. Click "Redeploy"

**Railway/Render:**
1. Dashboard → Rollback to previous version
2. Or redeploy from git (git push again)

---

## Getting Help

**Resources:**
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment/vercel)
- [MongoDB Atlas Setup](https://docs.atlas.mongodb.com)

**Issues?**
- Check platform logs first
- Verify environment variables
- Test with curl commands
- Check GitHub issues/discussions

---

## Quick Startup Checklist

- [ ] Backend deployed to Railway/Render
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured
- [ ] MongoDB Atlas database created
- [ ] Redis configured
- [ ] Admin user created
- [ ] Health check passes
- [ ] Login works
- [ ] Can submit complaints
- [ ] Real-time updates work
- [ ] Analytics dashboard loads

---

**Last Updated:** March 2024  
**Version:** 1.0
