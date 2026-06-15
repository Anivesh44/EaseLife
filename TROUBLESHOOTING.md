# 🔧 Troubleshooting "Failed to fetch" Error

## Problem: "Failed to fetch" when registering

This error means the frontend cannot connect to the backend server.

## ✅ Quick Fixes

### 1. **Check if Backend Server is Running**

The backend must be running on port 5000. Check your terminal:

```bash
# You should see:
Server running on port 5000
```

**If not running:**
```bash
cd easelife
npm run dev
```

This starts both frontend and backend.

### 2. **Check Port Numbers**

- **Backend**: Should be on port 5000
- **Frontend**: Should be on port 3000 (or 3001, 3002, etc.)

If your frontend is on a different port (like 3002), that's fine, but backend must be on 5000.

### 3. **Verify API URL**

Check `client/.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**If the file doesn't exist**, create it with the above content.

### 4. **Restart Everything**

1. Stop both servers (Ctrl+C)
2. Start again:
   ```bash
   npm run dev
   ```

### 5. **Check Server Console**

Look for errors in the backend terminal:
- MongoDB connection errors (OK - file storage will work)
- Port already in use
- Module not found errors

## 🔍 Detailed Checks

### Check 1: Is Backend Running?

Open browser and visit: http://localhost:5000/health

You should see:
```json
{"status":"ok","message":"EASELIFE API is running"}
```

**If you get an error**, the backend is not running.

### Check 2: CORS Issues

The backend has CORS enabled, but if you see CORS errors:
- Make sure `app.use(cors())` is in `server/index.js`
- Check browser console for CORS errors

### Check 3: Firewall/Antivirus

Sometimes firewalls block localhost connections:
- Temporarily disable firewall
- Or add exception for Node.js

## 🚀 Step-by-Step Solution

1. **Open Terminal**
2. **Navigate to project:**
   ```bash
   cd C:\Users\Aniveshjaiswal\.cursor\easelife
   ```

3. **Stop any running servers** (Ctrl+C)

4. **Start the application:**
   ```bash
   npm run dev
   ```

5. **Wait for both to start:**
   - Backend: `Server running on port 5000`
   - Frontend: `ready - started server on 0.0.0.0:3000`

6. **Open browser:** http://localhost:3000

7. **Try registration again**

## 📝 Common Issues

### Issue: "Port 5000 already in use"
**Solution:**
- Find and kill the process using port 5000
- Or change PORT in `server/.env` to 5001
- Update `client/.env.local` to match

### Issue: "Module not found"
**Solution:**
```bash
npm run install-all
```

### Issue: Backend starts but frontend can't connect
**Solution:**
- Check `client/.env.local` exists and has correct URL
- Restart frontend: `cd client && npm run dev`

## ✅ Success Indicators

When everything works:
- ✅ Backend console shows: "Server running on port 5000"
- ✅ Frontend console shows: "ready - started server"
- ✅ http://localhost:5000/health returns JSON
- ✅ Registration form submits successfully
- ✅ No "Failed to fetch" error

## 🆘 Still Not Working?

1. **Check browser console** (F12) for detailed errors
2. **Check network tab** to see the actual request
3. **Verify both terminals** are running
4. **Try accessing API directly:** http://localhost:5000/api/providers

---

**Most common fix:** Just restart both servers with `npm run dev` from the root directory! 🚀

