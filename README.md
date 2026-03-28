# Citizen sathi

# 🏛️ Citizen Sathi — Complaint & Enquiry Management System

<div align="center">

![Tech](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)
![Backend](https://img.shields.io/badge/Backend-Render-blue?style=for-the-badge)
![License](https://img.shields.io/badge/Type-College%20Project-orange?style=for-the-badge)

**A full-stack web application where citizens can file complaints and enquiries, and officers can manage and resolve them.**

🔗 **Live Site:** [https://college-pro-client.vercel.app](https://college-pro-client.vercel.app)
📁 **GitHub Repo:** [https://github.com/dharmapal25/College-project](https://github.com/dharmapal25/College-project)

</div>

---

## 📌 About the Project

**Citizen Sathi** is a government-style complaint and enquiry management portal. The idea is simple — citizens should be able to raise issues with government departments online, and officers should be able to respond to them efficiently.

This is a **B.Tech college project** built using the **MERN stack** with role-based access for 3 types of users: Citizens, Officers, and Admins.

---

## ✨ Features

### 👤 For Citizens (Users)
- Register and log in securely
- Submit complaints or enquiries to government departments
- View personal complaint history
- Filter submitted complaints by status or date
- **Daily submission limit** — prevents spam

### 🧑‍💼 For Officers
- Separate officer login portal
- View complaints assigned to their department
- Update complaint status: `Pending → In Progress → Resolved`
- Filter user activity logs

### 🛡️ For Admins
- Dedicated dark-themed Admin Dashboard
- View and manage all users, officers, and complaints
- Monitor platform activity

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, React Router, CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (via Mongoose) |
| **Authentication** | JWT (JSON Web Tokens) + bcrypt |
| **Session Handling** | cookie-parser |
| **Frontend Hosting** | Vercel |
| **Backend Hosting** | Render |

---

## 📁 Project Structure

```
College-project/
│
├── Frontend/                # React.js Client
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route-level pages (Login, Dashboard, etc.)
│   │   ├── context/         # Auth state management
│   │   └── App.jsx          # Main app with routing
│   └── package.json
│
├── Backend/                 # Node.js + Express Server
│   ├── models/              # Mongoose schemas (User, Officer, Complaint)
│   ├── routes/              # API route handlers
│   ├── middleware/          # JWT auth middleware
│   ├── controllers/         # Business logic
│   ├── .env                 # Environment variables (not committed)
│   └── index.js             # Server entry point
│
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Git](https://git-scm.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/dharmapal25/College-project.git
cd College-project
```

---

### 2. Setup Backend

```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend:

```bash
npm start
```

Backend runs at: `http://localhost:5000`

---

### 3. Setup Frontend

```bash
cd Frontend
npm install
```

Create a `.env` file inside `Frontend/`:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🔐 Authentication Flow

```
User/Officer logs in
        ↓
Server verifies credentials → Issues JWT token
        ↓
Token stored in HTTP-only cookie
        ↓
Every protected API request → Auth middleware verifies token
        ↓
Role check → Citizen / Officer / Admin access granted
```

---

## 🌐 Deployment

| Part | Platform | URL |
|---|---|---|
| Frontend | Vercel | [college-pro-client.vercel.app](https://college-pro-client.vercel.app) |
| Backend | Render | *(your render URL here)* |
| Database | MongoDB Atlas | *(cloud hosted)* |

---

## ⚙️ API Overview

### Auth Routes
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login (User or Officer) |
| POST | `/api/auth/logout` | Logout and clear cookie |

### Complaint Routes
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/enquiry/` | Submit a new complaint |
| GET | `/api/user-logs/` | Get current user's complaints |
| GET | `/api//admin-dashboard` | Get all complaints (Officer/Admin) |

---

## 💡 Key Learnings

- Built **role-based auth** (Citizen / Officer / Admin) from scratch
- Implemented **JWT + HTTP-only cookies** for secure session management
- Added **daily complaint submission limit** to prevent abuse
- Designed a full **dark-themed Admin Dashboard**
- Handled **user activity logs** with filtering
- Successfully deployed a **MERN app** — React on Vercel, Express on Render, DB on Atlas

---

## 📸 Screenshots

<!-- None -->
---

## 👨‍💻 Team - Developers

**Dharmapal** — B.Tech 2nd Year, LIT Lucknow
**Alok** — B.Tech 2nd Year, LIT Lucknow
**Nikhil** — B.Tech 2nd Year, LIT Lucknow
**Ashish P** — B.Tech 2nd Year, LIT Lucknow

🔗 [GitHub: dharmapal25](https://github.com/dharmapal25)

---

## 📄 License

This project is built for educational/college purposes only.

---

