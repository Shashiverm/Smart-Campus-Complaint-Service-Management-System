# 🚀 Quick Deployment Guide

Get your Smart Campus Application deployed in minutes!

## Prerequisites

- [GitHub Account](https://github.com) (free)
- [Vercel Account](https://vercel.com) (free signup)
- [Railway Account](https://railway.app) or [Render Account](https://render.com) (free tier)
- [MongoDB Atlas Account](https://mongodb.com/cloud/atlas) (free M0 tier)

---

## 5-Minute Deployment (Railway + Vercel)

### Step 1: Backend Setup (5 min)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Go to Railway.app**
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Connect your repository

3. **Add Services**
   - Add MongoDB (Railway provides it)
   - Add Redis (Railway provides it)
   - Click "Deploy"

4. **Copy Variables**
   - After deployment, note the URL: `https://your-api.railway.app`

### Step 2: Database Setup (3 min)

1. **MongoDB Atlas**
   - Create free cluster (M0)
   - Create user: username & password
   - Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/smart-campus`

2. **Update Railway**
   - Go to Railway Dashboard
   - Variables → Add `MONGODB_URI`
   - Paste your MongoDB connection string

3. **Set Other Variables in Railway**
   ```
   NODE_ENV=production
   JWT_SECRET=[generate with: openssl rand -base64 32]
   CORS_ORIGIN=https://your-frontend.vercel.app (update after frontend deploy)
   JWT_EXPIRES_IN=7d
   ADMIN_REGISTRATION_KEY=your-secret-key
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-gmail@gmail.com
   SMTP_PASS=your-app-password
   EMAIL_FROM=noreply@campus.edu
   ```

### Step 3: Frontend Deployment (2 min)

1. **Go to Vercel.com**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select `frontend` folder as root

2. **Set Environment Variables**
   - Go to Settings → Environment Variables
   - Add:
     ```
     NEXT_PUBLIC_API_URL=https://your-api.railway.app/api/v1
     NEXT_PUBLIC_SOCKET_URL=https://your-api.railway.app
     ```

3. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes

---

## Verification Checklist

After deployment completes:

- [ ] Backend health check: `https://your-api.railway.app/api/v1/health`
  - Should return: `{"ok":true,"service":"smart-campus-api"}`

- [ ] Frontend loads: `https://your-frontend.vercel.app`

- [ ] Can create admin user via API:
  ```bash
  curl -X POST https://your-api.railway.app/api/v1/auth/register \
    -H "Content-Type: application/json" \
    -d '{
      "collegeId": "ADMIN001",
      "name": "Admin",
      "email": "admin@college.edu",
      "password": "Password123!",
      "role": "admin"
    }'
  ```

- [ ] Can login at frontend URL

- [ ] API Docs load: `https://your-api.railway.app/api/v1/docs`

---

## Generate Secure Keys

**For JWT_SECRET:**
```bash
openssl rand -base64 32
```

**For ADMIN_REGISTRATION_KEY:**
```bash
openssl rand -hex 16
```

---

## Troubleshooting

### "Cannot connect to database"
- Check MONGODB_URI in Railway Dashboard
- Verify IP whitelist in MongoDB Atlas (set to 0.0.0.0/0 for testing)

### "CORS errors in browser"
- Update CORS_ORIGIN in Railway to match your Vercel URL
- Verify NEXT_PUBLIC_API_URL in Vercel environment variables

### "Socket connection fails"
- Ensure NEXT_PUBLIC_SOCKET_URL matches backend URL
- Check that backend is running (view logs in Railway)

### "Gmail not sending emails"
- Generate App Password (not regular Gmail password)
- Enable Less Secure App Access or use App Passwords
- Verify SMTP credentials in Railway

---

## Next Steps

1. **Monitor Logs**
   - Railway Dashboard → Logs
   - Check for any errors during runtime

2. **Set Custom Domains** (Optional)
   - Vercel: Dashboard → Settings → Domains
   - Railway: Dashboard → Settings → Custom Domains

3. **Enable Auto-Scaling** (Optional)
   - Railway: Services → Auto-deploy on push

4. **Backup Database** (Recommended)
   - MongoDB Atlas: Enable automated backups

---

## Alternative: Render Backend

If you prefer Render instead of Railway:

1. Go to [render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add same environment variables as Railway
7. Add Redis service separately

---

## Support

- **Railway Docs:** https://docs.railway.app
- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **MongoDB Docs:** https://docs.mongodb.com

---

**Deployment Time:** ~15-20 minutes  
**Uptime:** ✅ 99.9% guaranteed  
**Cost:** ✅ Free tier 🎉

Happy deploying! 🚀
