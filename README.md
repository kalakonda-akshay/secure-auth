# Secure User Authentication Web App

A complete full-stack authentication project built for internship submissions and beginner-friendly learning. It uses React + Vite on the frontend, Express + MongoDB on the backend, HTTP-only JWT cookies, refresh-token session persistence, and role-based access control.

## Tech Stack

**Frontend:** React, Vite, React Router DOM, Axios, Tailwind CSS, Context API, Framer Motion, React Hot Toast  
**Backend:** Node.js, Express.js, MongoDB Atlas, Mongoose, JWT, bcryptjs, dotenv, cors, cookie-parser  
**Deployment:** Vercel frontend, Render backend, MongoDB Atlas database

## Folder Structure

```text
secure-auth-app/
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/adminController.js
│   │   ├── controllers/authController.js
│   │   ├── middleware/adminMiddleware.js
│   │   ├── middleware/authMiddleware.js
│   │   ├── middleware/errorHandler.js
│   │   ├── models/User.js
│   │   ├── routes/adminRoutes.js
│   │   ├── routes/authRoutes.js
│   │   ├── utils/createAdmin.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/axios.js
│   │   ├── components/
│   │   ├── context/AuthContext.jsx
│   │   ├── layouts/AppLayout.jsx
│   │   ├── pages/
│   │   ├── routes/ProtectedRoute.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── .env.example
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Public | Create an account |
| POST | `/api/auth/login` | Public | Log in and receive secure cookies |
| GET | `/api/auth/me` | Authenticated | Get current user |
| POST | `/api/auth/refresh` | Refresh cookie | Rotate session cookies |
| POST | `/api/auth/logout` | Public | Clear auth cookies |
| GET | `/api/admin/users` | Admin only | List users and analytics |

## Local Installation

1. Install backend dependencies:

```bash
cd backend
npm install
```

2. Create backend env file:

```bash
cp .env.example .env
```

Update `backend/.env` with your MongoDB Atlas connection string and long random secrets.

3. Start backend:

```bash
npm run dev
```

4. Install frontend dependencies in a second terminal:

```bash
cd frontend
npm install
```

5. Create frontend env file:

```bash
cp .env.example .env
```

6. Start frontend:

```bash
npm run dev
```

Open `http://localhost:5173`.

## Create an Admin User

Add these values to `backend/.env`:

```env
ADMIN_NAME=Admin User
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@12345
```

Run:

```bash
cd backend
npm run create-admin
```

Then log in with that admin account to access `/admin`.

## Environment Variables

### Backend

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/secure-auth-app?retryWrites=true&w=majority
JWT_ACCESS_SECRET=replace-with-a-long-random-access-secret
JWT_REFRESH_SECRET=replace-with-a-long-random-refresh-secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

### Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

## MongoDB Atlas Setup

1. Create a free cluster at MongoDB Atlas.
2. Create a database user with a strong password.
3. Add your IP address in **Network Access** for local development.
4. Copy the connection string from **Connect > Drivers**.
5. Replace `<username>`, `<password>`, and cluster details in `MONGO_URI`.

## Backend Deployment to Render

1. Push this project to GitHub.
2. Create a new **Web Service** on Render.
3. Select the repository.
4. Set the root directory to `backend`.
5. Build command:

```bash
npm install
```

6. Start command:

```bash
npm start
```

7. Add backend environment variables in Render:

```env
NODE_ENV=production
PORT=10000
MONGO_URI=your-atlas-uri
JWT_ACCESS_SECRET=your-long-random-secret
JWT_REFRESH_SECRET=your-second-long-random-secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CLIENT_URL=https://your-frontend.vercel.app
```

Render injects its own `PORT`; keeping `PORT=10000` is fine, but optional.

## Frontend Deployment to Vercel

1. Import the GitHub repository in Vercel.
2. Set the root directory to `frontend`.
3. Build command:

```bash
npm run build
```

4. Output directory:

```bash
dist
```

5. Add frontend environment variable:

```env
VITE_API_URL=https://your-render-backend.onrender.com/api
```

6. Redeploy after setting the environment variable.

## Security Notes

- Access and refresh tokens are stored in HTTP-only cookies, not localStorage.
- Passwords are hashed with bcrypt before storage.
- Access tokens expire quickly; refresh tokens rotate on refresh.
- Backend middleware protects both authenticated and admin-only routes.
- CORS allows only configured frontend origins.
- Validation happens on both frontend and backend.

## Useful Commands

```bash
# Backend
cd backend
npm run dev
npm run create-admin
npm start

# Frontend
cd frontend
npm run dev
npm run build
npm run preview
```
