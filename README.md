# 🚀 ProjectHub - Student Project Showcase Platform

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.5-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.8-010101?logo=socket.io&logoColor=white)](https://socket.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**ProjectHub** is a modern, full-stack web application designed for students and academic institutions to showcase innovative projects, exchange constructive feedback, discover technical ideas, and celebrate academic achievements.

---

## 📑 Table of Contents

- [Features](#-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Directory Structure](#-directory-structure)
- [Prerequisites](#-prerequisites)
- [Quick Start (Local Development)](#-quick-start-local-development)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Deployment Guide](#-deployment-guide)
  - [1. Database: MongoDB Atlas](#1-database-setup-mongodb-atlas)
  - [2. Backend: Render / Railway](#2-backend-deployment-render--railway)
  - [3. Frontend: Vercel / Netlify](#3-frontend-deployment-vercel--netlify)
- [Troubleshooting](#-troubleshooting)
- [Contributing & License](#-contributing--license)

---

## ✨ Features

- **🎓 Comprehensive Project Showcase**: Browse projects across multiple departments (CSE, EEE, ECE, MECH, CIVIL, AI/ML, etc.).
- **🏆 Top-Liked Leaderboard**: Dedicated ranking page celebrating the top 3 most liked and impactful student innovations.
- **⚡ Real-Time Updates**: Instant notification and feed update via Socket.IO when new projects are published.
- **📄 Document & Media Support**: Upload project banners and project documentation PDFs with in-browser preview links.
- **🔐 User Authentication**: Secure user registration, credential validation, login persistence, and password reset flows with email verification via Nodemailer.
- **💬 Feedback & Engagement**: Like projects, leave community feedback, and track engagement.
- **🔍 Search & Filtering**: Fast filtering by department and searching by author email.
- **📱 Responsive UI**: Polished CSS Modules design optimized for desktops, tablets, and mobile devices.

---

## 🏗️ Architecture & Tech Stack

```
┌─────────────────────────────────┐
│     Client (React + Vite)       │
│  - React Router v6 (SPA)        │
│  - Axios (Configurable API)     │
│  - Socket.IO Client (Realtime)  │
└───────────────┬─────────────────┘
                │ HTTP REST / WebSocket
                ▼
┌─────────────────────────────────┐
│    Backend (Node.js + Express)  │
│  - REST API Routes              │
│  - Multer (File Uploads)        │
│  - Socket.IO Server             │
│  - Nodemailer (Gmail SMTP)      │
└───────────────┬─────────────────┘
                │ Mongoose
                ▼
┌─────────────────────────────────┐
│    Database (MongoDB / Atlas)   │
│  - Users Collection             │
│  - Projects Collection          │
└─────────────────────────────────┘
```

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite 5, React Router DOM 6, Axios, Socket.IO Client, React Icons, CSS Modules |
| **Backend** | Node.js (ES Modules), Express 4, Mongoose 7, Multer, Socket.IO 4, Nodemailer, BcryptJS |
| **Database** | MongoDB (Local MongoDB Server or MongoDB Atlas Cloud) |
| **Deployment** | Vercel / Netlify (Frontend), Render / Railway (Backend), MongoDB Atlas (Database) |

---

## 📁 Directory Structure

```text
PROJECTHUB/
├── backend/                        # Node.js + Express Backend
│   ├── controllers/                # Business logic for projects & users
│   ├── models/                     # Mongoose database models (Project, User)
│   ├── routes/                     # Express API routes (projects, users, uploads)
│   ├── uploads/                    # Local storage directory for PDFs and images
│   ├── .env.example                # Backend environment template
│   ├── package.json                # Backend dependencies & start scripts
│   ├── railway.json                # Railway deployment config
│   ├── render.yaml                 # Render infrastructure-as-code config
│   └── server.js                   # Main application entry point & Socket.IO
│
├── frontend/                       # React + Vite Frontend
│   ├── public/                     # Static assets & SPA routing rules
│   │   ├── image/                  # Application images & icons
│   │   └── _redirects              # Netlify SPA rewrite configuration
│   ├── src/
│   │   ├── components/             # Reusable UI components & API client
│   │   │   ├── api.js              # Centralized Axios instance with env fallback
│   │   │   ├── MainHome.jsx        # Project grid & department filter
│   │   │   ├── ProjectCard.jsx     # Project display card with like & feedback
│   │   │   ├── SubmitProjectModal.jsx # Multi-field project upload modal
│   │   │   └── ToasterContext.jsx  # Global toast notifications
│   │   ├── pages/                  # Top-level view routes
│   │   │   ├── HomePage.jsx        # Landing hero page
│   │   │   ├── loginpage.jsx       # User login page
│   │   │   ├── sign.jsx            # User registration page
│   │   │   ├── TopLikedPage.jsx    # Leaderboard of top projects
│   │   │   └── UserDashboard.jsx   # Profile & user's submitted projects
│   │   ├── App.jsx                 # Routing configuration
│   │   └── main.jsx                # React root mount
│   ├── .env.example                # Frontend environment template
│   ├── package.json                # Frontend dependencies & Vite scripts
│   ├── vercel.json                 # Vercel SPA rewrite configuration
│   └── vite.config.js              # Vite server & build configuration
│
├── .gitignore                      # Git exclusion rules
├── package.json                    # Monorepo root workspace scripts
├── vercel.json                     # Root Vercel deployment fallback
└── README.md                       # Complete documentation (this file)
```

---

## ⚙️ Prerequisites

Before getting started, make sure you have the following installed on your machine:
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)
- **MongoDB** (Local MongoDB Community Server running on port 27017 **OR** a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)
- **Git**

---

## 🚀 Quick Start (Local Development)

### 1. Clone the Repository
```bash
git clone https://github.com/saisabbarapu/PROJECTHUB.git
cd PROJECTHUB
```

### 2. Install Dependencies
You can install dependencies for both frontend and backend using the root helper script:
```bash
npm run install:all
```
*(Alternatively: run `npm install` inside both `backend` and `frontend` folders).*

### 3. Configure Environment Variables

**Backend (`backend/.env`):**
```bash
cp backend/.env.example backend/.env
```
Default local configuration:
```env
PORT=4000
MONGODB_URL=mongodb://127.0.0.1:27017/project-showcase
FRONTEND_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000,http://127.0.0.1:3000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

**Frontend (`frontend/.env`):**
```bash
cp frontend/.env.example frontend/.env
```
Default local configuration:
```env
VITE_API_URL=http://localhost:4000/api
```

### 4. Start the Application

**Terminal 1 — Start the Backend Server:**
```bash
cd backend
npm start
```
*Backend runs at `http://localhost:4000` (Health check at `http://localhost:4000/health`).*

**Terminal 2 — Start the Frontend Development Server:**
```bash
cd frontend
npm run dev
```
*Frontend runs at `http://localhost:3000`.*

Open **[http://localhost:3000](http://localhost:3000)** in your browser! 🎉

---

## 🔑 Environment Variables

### Frontend Variables (`frontend/.env`)

| Variable | Description | Default (Local) | Production Example |
| :--- | :--- | :--- | :--- |
| `VITE_API_URL` | Base URL for backend REST API | `http://localhost:4000/api` | `https://projecthub-api.onrender.com/api` |
| `VITE_SOCKET_URL` | *(Optional)* Socket.IO server base URL | Auto-derived from `VITE_API_URL` | `https://projecthub-api.onrender.com` |

### Backend Variables (`backend/.env`)

| Variable | Description | Default (Local) | Production Example |
| :--- | :--- | :--- | :--- |
| `PORT` | Port for Express server | `4000` | Assigned automatically by host |
| `MONGODB_URL` | MongoDB connection URI | `mongodb://127.0.0.1:27017/project-showcase` | `mongodb+srv://user:pass@cluster.mongodb.net/project-showcase` |
| `FRONTEND_URL` | Production frontend domain for CORS | `http://localhost:3000` | `https://projecthub.vercel.app` |
| `CORS_ORIGIN` | Allowed CORS origins (comma-separated) | `http://localhost:3000,http://127.0.0.1:3000` | `https://projecthub.vercel.app,https://projecthub.netlify.app` |
| `EMAIL_USER` | Gmail address for password reset emails | *(Optional)* | `your-app@gmail.com` |
| `EMAIL_PASS` | Gmail App Password (16-char code) | *(Optional)* | `abcd efgh ijkl mnop` |

---

## 📡 API Documentation

### System Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Server status and MongoDB connection state |
| `GET` | `/test-db` | Database ping check |

### Authentication Routes (`/api/users`)
| Method | Endpoint | Description | Payload |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/users/signup` | Register new user | `{ firstName, lastName, email, password }` |
| `POST` | `/api/users/login` | Authenticate user | `{ email, password }` |
| `POST` | `/api/users/forgot-password` | Request password reset email | `{ email }` |
| `POST` | `/api/users/reset-password` | Reset password using token | `{ token, newPassword }` |

### Project Routes (`/api/projects`)
| Method | Endpoint | Description | Payload |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/projects` | Fetch all submitted projects | None |
| `POST` | `/api/projects` | Upload new project (multipart/form-data) | Form fields + `image` and `pdf` files |
| `GET` | `/api/projects/top-liked` | Fetch top 3 highest-liked projects | None |
| `POST` | `/api/projects/:id/like` | Toggle or add like to project | `{ userEmail }` |
| `POST` | `/api/projects/:id/feedback` | Post feedback comment on project | `{ feedback }` |
| `DELETE`| `/api/projects/:id` | Delete a project by ID | None |

---

## 🌐 Deployment Guide

### 1. Database Setup: MongoDB Atlas

1. Visit [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free account.
2. Create a free shared cluster (**M0**).
3. Under **Security > Database Access**, add a new database user (note username and password).
4. Under **Security > Network Access**, click **Add IP Address** and select **Allow Access from Anywhere** (`0.0.0.0/0`).
5. Under **Deployment > Database**, click **Connect** > **Drivers** > **Node.js**.
6. Copy the connection string. Replace `<password>` with your database user password and set the database name to `project-showcase`:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/project-showcase?retryWrites=true&w=majority
   ```

---

### 2. Backend Deployment (Render / Railway)

#### Option A: Deploy on [Render](https://render.com)
1. Sign up/Log in to Render and link your GitHub account.
2. Click **New +** > **Web Service**.
3. Select your `PROJECTHUB` repository.
4. Configure the service settings:
   - **Name**: `projecthub-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Under **Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `MONGODB_URL`: *your MongoDB Atlas connection string*
   - `FRONTEND_URL`: *your deployed frontend URL (or `*` during initial setup)*
   - `EMAIL_USER`: *your Gmail address (optional)*
   - `EMAIL_PASS`: *your Gmail App Password (optional)*
6. Click **Create Web Service**. Once deployed, copy your backend URL (e.g., `https://projecthub-backend.onrender.com`).

#### Option B: Deploy on [Railway](https://railway.app)
1. Create a new project on Railway from GitHub repo `PROJECTHUB`.
2. Set the Root Directory to `/backend`.
3. Add the environment variables (`MONGODB_URL`, `NODE_ENV=production`).
4. Generate a public domain under service **Settings > Networking**.

---

### 3. Frontend Deployment (Vercel / Netlify)

#### Option A: Deploy on [Vercel](https://vercel.com) (Recommended)
1. Log in to Vercel and click **Add New** > **Project**.
2. Import the `PROJECTHUB` repository.
3. Configure project settings:
   - **Root Directory**: Click edit and select `frontend`.
   - **Framework Preset**: `Vite` (automatically detected).
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Under **Environment Variables**, add:
   - `VITE_API_URL`: `https://your-backend-url.onrender.com/api`
5. Click **Deploy**. Vercel will build and deploy your site with SPA routing preconfigured via `vercel.json`.

#### Option B: Deploy on [Netlify](https://netlify.com)
1. Log in to Netlify and click **Add new site** > **Import an existing project**.
2. Select GitHub and choose `PROJECTHUB`.
3. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
4. Under **Site configuration > Environment variables**, add:
   - `VITE_API_URL`: `https://your-backend-url.onrender.com/api`
5. Click **Deploy Site**. Single-page routing is automatically handled by `frontend/public/_redirects`.

---

## 🛠️ Troubleshooting

<details>
<summary><b>1. CORS Errors in the Browser Console</b></summary>

- Ensure `VITE_API_URL` in your frontend environment matches your backend URL exactly, including `https://` and `/api`.
- Ensure your backend `FRONTEND_URL` or `CORS_ORIGIN` environment variable includes your frontend domain (e.g., `https://your-project.vercel.app`).
</details>

<details>
<summary><b>2. MongoDB Connection Timeout or DNS Resolution Failure</b></summary>

- If using Atlas, verify network access is open to `0.0.0.0/0` in the Atlas console.
- Check that your Atlas cluster is active and not paused.
- For local development, make sure MongoDB is running locally (`Get-Service MongoDB` on Windows or `systemctl status mongod` on Linux).
</details>

<details>
<summary><b>3. Page Refresh Gives 404 on Vercel / Netlify</b></summary>

- This occurs when client-side routing routes are requested directly from the host.
- Both `frontend/vercel.json` and `frontend/public/_redirects` are already included in this repository to automatically rewrite all requests back to `/index.html`.
</details>

<details>
<summary><b>4. Email Verification Not Sending</b></summary>

- Gmail requires an **App Password** when 2-Factor Authentication is enabled.
- Generate one under Google Account > Security > 2-Step Verification > App passwords.
- Paste the 16-character code into `EMAIL_PASS` in your backend `.env`.
</details>

---

## 📄 License & Author

Developed with ❤️ by **Sai Sabbarapu**.

Distributed under the **MIT License**. See `LICENSE` for more information.
