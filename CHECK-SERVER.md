# ⚠️ "Failed to fetch" Error - Quick Fix

## The Problem
"Failed to fetch" means your **backend server is not running** or not accessible.

## ✅ Solution (3 Steps)

### Step 1: Make sure backend is running

Open a terminal and run:
```bash
cd C:\Users\Aniveshjaiswal\.cursor\easelife
npm run dev
```

**You should see TWO things start:**
1. Backend: `Server running on port 5000`
2. Frontend: `ready - started server on 0.0.0.0:3000`

### Step 2: Verify backend is working

Open browser and visit: **http://localhost:5000/health**

You should see:
```json
{"status":"ok","message":"EASELIFE API is running"}
```

**If you get an error**, the backend is not running properly.

### Step 3: Check your .env.local file

Make sure `client/.env.local` exists with:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🚨 Most Common Issue

**You're only running the frontend, not the backend!**

The `npm run dev` command should start BOTH servers. If you only see the frontend starting, the backend isn't running.

## ✅ Quick Test

1. **Stop everything** (Ctrl+C in terminal)
2. **Run:** `npm run dev`
3. **Wait for BOTH to start**
4. **Try registration again**

## 📞 Still Not Working?

Check the terminal where you ran `npm run dev`:
- Do you see "Server running on port 5000"?
- Any error messages?

If you see errors, share them and I'll help fix them!

---

**99% of the time, this is because the backend server isn't running!** 🚀

