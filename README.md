# Smart Campus Complaint & Service Management System

Production-ready full-stack platform for real-time campus complaint handling with role-based workflows.

## Objective

This system replaces manual complaint channels (registers, emails, chats) with a centralized, trackable, secure workflow where:

- Students submit and track complaints in real time.
- Staff receive assignments and update progress.
- Admins register users, assign complaints, monitor analytics, and ensure accountability.

## Tech Stack

### Frontend

- Next.js (`latest`, supports v14+)
- React (`latest`, supports v18+)
- Tailwind CSS (`latest`, supports v3.4+)
- Axios (`latest`)
- Chart.js (`latest`) for analytics
- Socket.io Client (`latest`) for real-time UI refresh

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

- Student: login, submit complaint, track status.
- Staff/Faculty: view assigned complaints, update status.
- Admin: register all users, assign complaints, monitor analytics.

## Implemented Features

- JWT authentication
- Admin-only user registration
- Complaint CRUD workflow (create/list/assign/status update)
- Real-time updates via Socket.io
- Email notifications via BullMQ or direct fallback
- Analytics endpoint and dashboard charts
- Swagger API docs

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
- `POST /api/v1/complaints` (Student)
- `GET /api/v1/complaints/my` (Student)
- `GET /api/v1/complaints` (Admin/Staff)
- `PATCH /api/v1/complaints/:id/assign` (Admin)
- `PATCH /api/v1/complaints/:id/status` (Admin/Assigned Staff)
- `GET /api/v1/complaints/analytics` (Admin)

## Security Notes

- Passwords are hashed with bcryptjs.
- JWT protects private routes.
- RBAC enforces role permissions.
- Input validation is enforced server-side.
- API rate limit and Helmet headers enabled.

## Next Enhancements

- Firebase Cloud Messaging integration for push notifications.
- Department auto-routing using complaint NLP classification.
- Audit trail export and SLA breach alerts.
- CI pipeline and automated integration tests.
