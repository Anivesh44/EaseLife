# 🚀 How to Open Your EASELIFE Website

## Method 1: Easy Way (Double-Click)

1. **Double-click** `START-WEBSITE.bat` file
2. Wait for it to install dependencies and start
3. Open your browser to **http://localhost:3000**

---

## Method 2: Manual Steps

### Step 1: Open Terminal
- Press `Windows Key + R`
- Type `cmd` and press Enter
- Or press `Ctrl + ~` in Cursor/VS Code

### Step 2: Go to Project Folder
```bash
cd ``````C:\Users\Aniveshjaiswal\.cursor\easelife``````
```

### Step 3: Install Dependencies (First Time Only)
```bash
npm run install-all
```

### Step 4: Create Environment Files

**Check if `server/.env` exists:**
- If not, copy `server/environment1224` to `server/.env`
- Or create `server/.env` with:
  ```
  MONGODB_URI=mongodb://localhost:27017/easelife
  PORT=5000
  JWT_SECRET=your_secret_key_123
  NODE_ENV=development
  ```

**Create `client/.env.local`:**
- Create file `client/.env.local` with:
  ```
  NEXT_PUBLIC_API_URL=http://localhost:5000/api
  ```

### Step 5: Start MongoDB
- Make sure MongoDB is running on your computer
- Or use MongoDB Atlas (cloud) and update the connection string

### Step 6: Start the Website
```bash
npm run dev
```

### Step 7: Open Browser
Visit: **http://localhost:3000**

---

## What You'll See

When you run `npm run dev`, you'll see:
```
✓ Backend server running on http://localhost:5000
✓ Frontend running on http://localhost:3000
✓ MongoDB Connected (if configured)
```

Then open **http://localhost:3000** in your browser!

---

## Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| "npm: command not found" | Install Node.js from nodejs.org |
| "MongoDB connection error" | Start MongoDB service or use MongoDB Atlas |
| "Port already in use" | Change PORT in server/.env to 5001 |
| "Module not found" | Run `npm run install-all` again |

---

## Need Help?

Check these files:
- `HOW-TO-OPEN.md` - Detailed instructions
- `QUICKSTART.md` - Quick reference
- `SETUP.md` - Full setup guide

