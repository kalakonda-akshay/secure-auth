# Start Here

Your frontend environment is ready.

Your backend environment is almost ready. Open `backend/.env` and replace this line:

```env
MONGO_URI=paste-your-mongodb-atlas-uri-here
```

with your MongoDB Atlas connection string.

Then:

1. Double-click `start-backend.bat`.
2. Double-click `start-frontend.bat`.
3. Open `http://localhost:5173`.

To create an admin account after MongoDB is connected:

```bash
cd backend
npm run create-admin
```

Default admin values are already in `backend/.env`:

```env
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@12345
```
