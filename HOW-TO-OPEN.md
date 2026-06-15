# How to Open Your EASELIFE Website

## Quick Steps to Open Your Website

### Step 1: Open Terminal/Command Prompt
- Press `Windows Key + R`
- Type `cmd` and press Enter
- Or use the terminal in Cursor/VS Code (Ctrl + `)

### Step 2: Navigate to Your Project
```bash
cd C:\Users\Aniveshjaiswal\.cursor\easelife
```

### Step 3: Install Dependencies (First Time Only)
```bash
npm run install-all
```
This installs all packages for root, server, and client.

### Step 4: Setup Environment Files

**Create `server/.env` file:**
```env
MONGODB_URI=mongodb://localhost:27017/easelife
PORT=5000
JWT_SECRET=your_secret_key_123
NODE_ENV=development
```

**Create `client/.env.local` file:**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Step 5: Start MongoDB
Make sure MongoDB is installed and running:
- If you have MongoDB installed locally, start the MongoDB service
- Or use MongoDB Atlas (cloud) and update MONGODB_URI in server/.env

### Step 6: Start the Website
```bash
npm run dev
```

This will start:
- **Backend Server** on http://localhost:5000
- **Frontend Website** on http://localhost:3000

### Step 7: Open in Browser
Open your web browser and visit:
**http://localhost:3000**

---

## Alternative: Start Separately

If you want to start backend and frontend separately:

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

---

## Troubleshooting

### "npm: command not found"
- Install Node.js from https://nodejs.org
- Restart your terminal after installation

### "MongoDB connection error"
- Make sure MongoDB is running
- Check MONGODB_URI in server/.env
- For Windows: Start MongoDB service from Services

### "Port already in use"
- Change PORT in server/.env to a different number (e.g., 5001)
- Update NEXT_PUBLIC_API_URL in client/.env.local accordingly

### "Module not found"
- Run `npm run install-all` again
- Delete node_modules folders and reinstall

---

## What You'll See

Once running, you'll see:
- ✅ Backend server running on port 5000
- ✅ Frontend Next.js app running on port 3000
- ✅ MongoDB connected (if configured)

Open http://localhost:3000 in your browser to see your website!

