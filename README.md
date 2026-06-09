# 🚀 Client Lead Management System (Mini CRM)

A full-stack CRM application built with the MERN stack for managing client leads.

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Vite + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT Authentication |
| Charts | Recharts |
| Icons | Lucide React |

## ✨ Features

- **Authentication** – JWT-based admin login with protected routes
- **Dashboard** – Live stats: total, new, contacted, converted leads + conversion rate
- **Lead Management** – Full CRUD with search, filter by status, and pagination
- **Lead Details** – View full lead info, update status, manage notes
- **Notes & Follow-ups** – Add dated notes with follow-up reminders per lead
- **Analytics** – Bar charts, pie charts, conversion funnel with Recharts
- **Admin Profile** – Update name, email, and password
- **Dark Mode** – Full dark/light theme toggle
- **Responsive** – Mobile-first design

## 📁 Project Structure

```
crm/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── leadController.js
│   ├── middleware/authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Lead.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── leadRoutes.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── common/
    │   │   ├── dashboard/
    │   │   ├── layout/
    │   │   └── leads/
    │   ├── context/
    │   ├── pages/
    │   ├── utils/api.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env.example
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier works)

### 1. Clone & Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### 2. Setup Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Set VITE_API_URL=http://localhost:5000/api
npm run dev
```

### 3. Create Admin Account

After starting the backend, POST to `/api/auth/register`:

```json
{
  "name": "Admin User",
  "email": "admin@crm.com",
  "password": "admin123",
  "role": "admin"
}
```

Or use the demo credentials: `admin@crm.com` / `admin123`

## 🌐 API Documentation

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new admin |
| POST | `/api/auth/login` | Login and get JWT |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/profile` | Update name/email |
| PUT | `/api/auth/password` | Change password |

### Leads

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/leads` | Get all leads (search, filter, paginate) |
| GET | `/api/leads/:id` | Get single lead |
| POST | `/api/leads` | Create new lead |
| PUT | `/api/leads/:id` | Update lead |
| DELETE | `/api/leads/:id` | Delete lead |
| PATCH | `/api/leads/status/:id` | Update lead status only |
| POST | `/api/leads/:id/notes` | Add note to lead |
| DELETE | `/api/leads/:id/notes/:noteId` | Delete a note |
| GET | `/api/leads/analytics` | Get analytics data |

### Query Parameters for GET /api/leads

| Param | Type | Description |
|-------|------|-------------|
| `search` | string | Search name, email, company |
| `status` | string | Filter by status (New/Contacted/Converted/Lost) |
| `source` | string | Filter by source |
| `page` | number | Page number (default: 1) |
| `limit` | number | Results per page (default: 10) |
| `sort` | string | Sort field (default: -createdAt) |

## ☁️ Deployment

### Backend → Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo, select `backend/` as root
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add Environment Variables:
   - `MONGODB_URI` – your Atlas connection string
   - `JWT_SECRET` – a long random string
   - `FRONTEND_URL` – your Vercel URL
   - `NODE_ENV` – `production`

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Connect your GitHub repo, select `frontend/` as root
3. Add Environment Variable:
   - `VITE_API_URL` – your Render backend URL + `/api`
   - Example: `https://your-backend-url.vercel.app/api`
4. Deploy

> If login fails on the deployed frontend, verify that `VITE_API_URL` is configured in Vercel and that the backend is reachable from the browser. Do not leave `VITE_API_URL` pointing to `http://localhost:5000/api` in production.

## 🔑 Sample Admin Credentials

```
Email:    admin@crm.com
Password: admin123
```
> Create via POST /api/auth/register before first login.

## 📊 Database Schema

### User
```
{ name, email, password (hashed), role, lastLogin, createdAt, updatedAt }
```

### Lead
```
{ name, email, phone, company, source, status, notes[], value, assignedTo, createdAt, updatedAt }
```

### Note (embedded in Lead)
```
{ content, adminName, followUpDate, createdAt }
```

---

Built with ❤️ as Future Interns Task 2 — MERN Stack CRM
