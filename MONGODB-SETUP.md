# MongoDB Setup Guide for EASELIFE

## The Error You're Seeing

If you see: **"Operation `serviceproviders.findOne()` buffering timed out after 10000ms"**

This means MongoDB is not running or not connected properly.

---

## Solution: Choose One Option

### Option 1: Install and Run MongoDB Locally (Recommended for Development)

#### Step 1: Install MongoDB
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Install it on your Windows computer
3. During installation, choose "Install MongoDB as a Service"

#### Step 2: Start MongoDB Service
**Windows:**
1. Press `Windows Key + R`
2. Type `services.msc` and press Enter
3. Find "MongoDB" in the list
4. Right-click → Start (if not already running)

**Or use Command Prompt (as Administrator):**
```bash
net start MongoDB
```

#### Step 3: Verify MongoDB is Running
Open a new terminal and type:
```bash
mongosh
```
If it connects, MongoDB is running! Type `exit` to leave.

#### Step 4: Update Your .env File
Make sure `server/.env` has:
```
MONGODB_URI=mongodb://localhost:27017/easelife
```

---

### Option 2: Use MongoDB Atlas (Cloud - Free)

#### Step 1: Create Free Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create a free account
3. Create a free cluster (M0 - Free tier)

#### Step 2: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database password
5. Replace `<dbname>` with `easelife`

#### Step 3: Update Your .env File
Update `server/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/easelife?retryWrites=true&w=majority
```

#### Step 4: Allow Network Access
1. In MongoDB Atlas, go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Or add your specific IP address

---

## Quick Test

After setting up MongoDB, restart your server:

```bash
# Stop the server (Ctrl+C)
# Then start again
npm run dev
```

You should see:
```
✅ MongoDB Connected Successfully
📊 Database: mongodb://...
```

---

## Troubleshooting

### "MongoDB service not found"
- MongoDB is not installed
- Install MongoDB Community Server

### "Connection refused"
- MongoDB service is not running
- Start MongoDB service (see Option 1, Step 2)

### "Authentication failed" (MongoDB Atlas)
- Check your username and password
- Make sure IP address is whitelisted

### Still getting timeout errors?
1. Check if MongoDB is actually running:
   ```bash
   mongosh
   ```
2. Check your connection string in `server/.env`
3. Restart your server after changing .env

---

## For Quick Testing (Without MongoDB)

If you just want to test the website without setting up MongoDB, the code now handles errors gracefully and will show a message instead of crashing.

However, **registration won't work** without MongoDB. You'll need MongoDB to save data.

---

## Need Help?

- Check MongoDB logs: Usually in `C:\Program Files\MongoDB\Server\7.0\log\`
- MongoDB documentation: https://docs.mongodb.com/
- MongoDB Atlas docs: https://docs.atlas.mongodb.com/

