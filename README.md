# Smart Campus Complaint & Service Management System

Production-ready full-stack platform for real-time campus complaint handling with role-based workflows and modern futuristic UI.

## Objective

This system replaces manual complaint channels (registers, emails, chats) with a centralized, trackable, secure workflow where:

- Students submit and track complaints in real time.
- Staff receive assignments and update progress.
- Admins register users, assign complaints, monitor analytics, and ensure accountability.

All powered by a sleek, modern, and intuitive user interface with smooth animations and glassmorphic design.

## Tech Stack

### Frontend

- Next.js (`latest`, supports v14+) - React framework with App Router
- React (`latest`, supports v18+) - UI library
- Tailwind CSS (`latest`, supports v3.4+) - Utility-first CSS framework
- Axios (`latest`) - HTTP client
- Chart.js (`latest`) - Analytics visualization
- Socket.io Client (`latest`) - Real-time UI refresh
- React Hook Form (`latest`) - Form state management
- Zod (`latest`) - Schema validation

**UI/UX Features:**
- **Modern Futuristic Design** - Dark navy theme with gradient accents
- **Glassmorphism Effects** - Frosted glass card styling with backdrop blur
- **Smooth Animations** - Fade-in, slide-in transitions and hover effects
- **Responsive Layout** - Mobile-first design with responsive grid system
- **Dark Theme** - Eye-friendly dark mode with cyan/teal accents
- **Interactive Elements** - Animated buttons, status badges, and expandable cards
- **Accessibility** - High contrast ratios and semantic HTML

### Backend

- Node.js (target: v20 LTS+)
- Express.js (`latest`, supports v4.19+)
- REST API architecture

### Database

- MongoDB (`latest`, supports v7+)
- Mongoose (`latest`, supports v8+)

### Security / Auth

- JWT (`latest`, supports v9+)
- bcryptjs (`latest`, supports v2.4+)
- RBAC (Student, Staff, Admin)
- Helmet, rate limiting, validation middleware

### Notifications / Real-Time

- Socket.io (`latest`, supports v4.7+)
- Nodemailer (`latest`, supports v6.9+)
- BullMQ + Redis for async notification jobs

### File Upload

- Cloudinary + Multer storage adapter

### DevOps

- Dockerfiles for frontend/backend
- Docker Compose (MongoDB + Redis + App + Nginx)
- Nginx reverse proxy config

## User Roles

- **Student**: Login, submit complaints, track status, view complaint history
- **Staff/Faculty**: View assigned complaints, update status and progress, respond to complaints
- **Admin**: Register all users, assign complaints to staff, monitor analytics, oversee system

## UI/UX Design

### Pages & Components

**Home Page (Landing)**
- Gradient hero section with call-to-action
- Feature showcase cards (4 key features)
- 4-step process visualization
- Role-based login cards with icons
- Professional navigation bar and footer

**Login Page**
- Modern split-screen design (left: info, right: form)
- Role-specific welcome messages with emojis
- Enhanced form validation with helpful error messages
- Security information cards
- Glassmorphic card styling

**Dashboard**
- Stat cards showing complaint metrics (Total, Open, In Progress, Resolved)
- Color-coded statistics (Red, Yellow, Green)
- Role-specific views for Student, Staff, and Admin
- Real-time WebSocket updates

**Complaint Form** (Student)
- Multi-field form with validation
- Priority level selector with color indicators
- Detailed description textarea
- Location and department fields
- Stylized input fields with focus rings

**Complaint Table**
- Card-based expandable design
- Priority and status badges with color coding
- Quick view of metadata (Created date, Location, Department)
- Expandable rows for full details
- Admin: Assign to staff and update status
- Staff: Update complaint status

**Analytics Dashboard** (Admin)
- Status distribution doughnut chart
- Department-wise complaint breakdown bar chart
- Summary statistics cards
- Dark theme chart styling with custom colors

### Design Features
- ✨ **Glassmorphism** - Frosted glass cards with backdrop blur (12px)
- 🎨 **Gradient Accents** - Teal and cyan gradients throughout
- ⚡ **Smooth Animations** - Fade-in (600ms), slide-in, and scale transitions
- 🌙 **Dark Navy Theme** - Background gradient (#0f172a to #11212d)
- 🎯 **Status Indicators** - Color-coded badges (Red=Open, Yellow=In Progress, Green=Resolved, Gray=Rejected)
- 🚀 **Hover Effects** - Interactive elements with transform and shadow effects
- 📱 **Responsive** - Mobile-first design with Tailwind breakpoints (md, lg)

## Implemented Features

**Authentication & Authorization**
- JWT-based authentication
- Admin-only user registration
- Role-based access control (RBAC) - Student, Staff, Admin
- Secure password hashing with bcryptjs

**Complaint Management**
- Complaint CRUD workflow (create, read, update)
- Submit complaints (Student)
- Assign complaints to staff (Admin)
- Update complaint status (Staff/Admin)
- Track complaint history and timeline

**Real-Time Features**
- WebSocket (Socket.io) for live updates
- Real-time complaint status notifications
- Activity log updates across connected users
- Instant dashboard refresh

**Notifications**
- Email notifications via Nodemailer
- BullMQ queue for async job processing
- Complaint submission confirmations
- Status update notifications

**Analytics & Reporting**
- Admin dashboard with complaint statistics
- Status distribution charts (Doughnut)
- Department-wise complaint breakdown (Bar chart)
- Summary metrics (Total, Open, In Progress, Resolved)

**User Interface**
- Modern futuristic design with glassmorphism
- Dark theme with gradient accents
- Smooth animations and transitions
- Responsive design (mobile, tablet, desktop)
- Color-coded status indicators
- Interactive expandable components
- Accessible form validation with error messages

**Documentation**
- Swagger API documentation at `/docs`
- Comprehensive project structure comments
- Environment configuration examples

## Project Structure

```text
.
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middlewares
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   ├── app.js
│   │   └── server.js
│   ├── swagger/openapi.yaml
│   ├── .env.example
│   └── Dockerfile
├── frontend
│   ├── app
│   ├── components
│   ├── lib
│   ├── styles
│   ├── .env.example
│   └── Dockerfile
├── docker-compose.yml
└── nginx.conf
```

## Local Setup (Without Docker)

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend default URL: `http://localhost:5000`

Swagger docs: `http://localhost:5000/docs`

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend default URL: `http://localhost:3000`

**Frontend Components:**
- `/app/page.jsx` - Modern landing page with hero section
- `/app/layout.jsx` - Root layout with dark theme
- `/app/(auth)/login/page.jsx` - Enhanced login page with split design
- `/app/dashboard/page.jsx` - Dashboard with stats and role-based views
- `/components/ComplaintForm.jsx` - Form component with validation
- `/components/ComplaintTable.jsx` - Expandable table with inline actions
- `/components/AnalyticsChart.jsx` - Chart visualizations for admin
- `/styles/globals.css` - Global styles with animations and glassmorphism
- `/tailwind.config.js` - Tailwind configuration with custom colors and animations

## Seed Initial Admin

Set in backend `.env`:

```env
ADMIN_EMAIL=admin@college.edu
ADMIN_PASSWORD=Admin@12345
ADMIN_COLLEGE_ID=ADMIN001
```

Then run:

```bash
cd backend
npm run seed:admin
```

## Docker Setup

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
docker compose up --build
```

Endpoints via Nginx:

- App: `http://localhost`
- API proxied at `/api/*`

## Core API Endpoints

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/register` (Admin only)
- `GET /api/v1/auth/me`
- `GET /api/v1/users` (Admin only)
- `POST /api/v1/complaints` (Student/Faculty/Staff)
- `GET /api/v1/complaints/my` (Student/Faculty/Staff)
- `GET /api/v1/complaints` (Admin gets all, Staff/Faculty get assigned)
- `PATCH /api/v1/complaints/:id/assign` (Admin assigns to Staff/Faculty)
- `PATCH /api/v1/complaints/:id/status` (Admin/Assigned Staff/Assigned Faculty)
- `GET /api/v1/complaints/:id/activity` (Owner/Assignee/Admin)
- `GET /api/v1/complaints/analytics` (Admin)

## Security Notes

- Passwords are hashed with bcryptjs.
- JWT protects private routes.
- RBAC enforces role permissions.
- Input validation is enforced server-side.
- API rate limit and Helmet headers enabled.

## UI Customization

### Theme Colors

The application uses a custom color scheme defined in `frontend/tailwind.config.js`:

```javascript
colors: {
  ink: "#11212D",           // Text color
  teal: "#0A7075",          // Primary accent
  mint: "#6BA3BE",          // Secondary accent
  sand: "#F1EBD8",          // Light accent
  ember: "#D94E41",         // Error/warning color
  "dark-navy": "#0f172a",   // Background
  "slate-dark": "#1e293b"   // Secondary background
}
```

### Customizing Animations

Edit `frontend/styles/globals.css` to modify:
- Animation duration: `0.6s` to your preference
- Blur effects: `blur(12px)` for glassmorphism
- Colors: Gradient and shadow colors in CSS variables

### Status Badge Colors

Update colors in component files:
- Open: Red (#ef4444)
- In Progress: Yellow (#f59e0b)
- Resolved: Green (#10b981)
- Rejected: Gray (#64748b)

## 🚀 Production Deployment

The application is **100% production-ready** and can be deployed in minutes to free or paid tiers.

### Quick Start (5 minutes)

**Frontend → Vercel | Backend → Railway**

```bash
# 1. Push code to GitHub
git push origin main

# 2. Deploy Backend to Railway
#    - Visit railway.app → New Project
#    - Select GitHub repository
#    - Set environment variables (see below)

# 3. Deploy Frontend to Vercel
#    - Visit vercel.com → Add Project
#    - Select GitHub repository, select frontend folder
#    - Set NEXT_PUBLIC_API_URL to your Railway URL
#    - Deploy!
```

### Deployment Guides

Choose your guide based on your needs:

1. **[QUICK_DEPLOY.md](QUICK_DEPLOY.md)** ⚡ (5-10 minutes)
   - Step-by-step quick start
   - Best for: First-time deployment
   - Copy-paste commands included

2. **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** 📖 (Comprehensive)
   - Detailed walkthrough with all options
   - Railway and Render backend options
   - Troubleshooting and monitoring
   - Best for: Production setup

3. **[DEPLOYMENT_READY.md](DEPLOYMENT_READY.md)** ✅ (Verification)
   - Complete production readiness checklist
   - Pre/post deployment verification
   - Security validation
   - Best for: QA and verification

4. **[DEPLOYMENT_FILES_REFERENCE.md](DEPLOYMENT_FILES_REFERENCE.md)** 📚 (Reference)
   - Explanation of all deployment files
   - Configuration details
   - File structure reference
   - Best for: Understanding file purposes

### Deployment Targets

| Component | Platform | Free Tier | URL Example |
|-----------|----------|-----------|-------------|
| **Frontend** | Vercel | ✅ Yes | `https://your-app.vercel.app` |
| **Backend** | Railway | ✅ Yes | `https://api.railway.app` |
| **Backend Alt** | Render | ✅ Yes | `https://api.onrender.com` |
| **Database** | MongoDB Atlas | ✅ Yes (M0) | Cloud hosted |
| **Cache** | Railway Redis | ✅ Included | Cloud hosted |

### Environment Variables Required

**Backend (Railway/Render):**
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=<generate: openssl rand -base64 32>
CORS_ORIGIN=https://your-frontend.vercel.app
REDIS_URL=<auto from platform>
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@campus.edu
```

**Frontend (Vercel):**
```env
NEXT_PUBLIC_API_URL=https://your-api.railway.app/api/v1
NEXT_PUBLIC_SOCKET_URL=https://your-api.railway.app
```

### Deployment Features Included

✅ **Automatic Deployments**
- GitHub webhook integration
- Automatic deploys on push
- Environment variable management

✅ **Production Optimizations**
- Image optimization (Vercel)
- Database indexing
- Response caching
- Rate limiting
- Security headers

✅ **Monitoring & Logs**
- Real-time logs accessible
- Error tracking
- Performance metrics
- Database monitoring

✅ **Scaling**
- Automatic horizontal scaling
- Load balancing
- Connection pooling
- Queue management

### Local Docker Testing

Test entire stack locally before deployment:

```bash
docker-compose up --build

# Access points:
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# API Docs: http://localhost:5000/api/v1/docs
# Nginx proxy: http://localhost
```

---

## Next Enhancements

**Backend Features**
- Firebase Cloud Messaging integration for push notifications.
- Department auto-routing using complaint NLP classification.
- Audit trail export and SLA breach alerts.
- CI pipeline and automated integration tests.

**Frontend/UI Enhancements**
- Dark/Light theme toggle
- Advanced filtering and search on complaint table
- Batch complaint actions (admin)
- Comment system for complaint threads
- File attachment support for evidence
- Real-time notification bell with activity feed
- Export complaints to PDF/CSV
- Advanced analytics with date range filtering
- Mobile app (React Native) for complaint submission
- PWA support for offline access
