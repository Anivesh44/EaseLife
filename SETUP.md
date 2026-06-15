# EASELIFE Setup Guide

## Quick Start

### Step 1: Install Dependencies

```bash
cd easelife
npm run install-all
```

This will install dependencies for:
- Root project
- Server (backend)
- Client (frontend)

### Step 2: Setup MongoDB

**Option A: Local MongoDB**
1. Install MongoDB on your system
2. Start MongoDB service
3. MongoDB will run on `mongodb://localhost:27017`

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in server/.env

### Step 3: Configure Environment Variables

**Backend (.env file in server directory):**
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/easelife
PORT=5000
JWT_SECRET=your_random_secret_key_here
NODE_ENV=development
```

**Frontend (.env.local file in client directory):**
```bash
cd client
cp .env.local.example .env.local
```

Edit `client/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Step 4: Run the Application

From the root directory:
```bash
npm run dev
```

This starts:
- Backend server on http://localhost:5000
- Frontend on http://localhost:3000

### Step 5: Access the Application

Open your browser and visit:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in server/.env
- Verify MongoDB port (default: 27017)

### Port Already in Use
- Change PORT in server/.env
- Or kill the process using the port

### Module Not Found
- Run `npm run install-all` again
- Delete node_modules and reinstall

### CORS Errors
- Ensure backend is running on port 5000
- Check NEXT_PUBLIC_API_URL in client/.env.local

## Development Tips

1. **Backend Only**: `cd server && npm run dev`
2. **Frontend Only**: `cd client && npm run dev`
3. **Both**: `npm run dev` (from root)

## First Use

1. Visit http://localhost:3000
2. Click "Register as Provider"
3. Fill in the form with test data
4. Submit to create your first service provider
5. Browse providers on the homepage

## Sample Data

You can manually add providers via API:
```bash
curl -X POST http://localhost:5000/api/providers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "9876543210",
    "aadharNumber": "123456789012",
    "serviceType": "electrician",
    "areas": ["Delhi", "Noida"],
    "priceRange": {"min": 500, "max": 1000, "currency": "INR"},
    "workType": "daily",
    "dutyHours": 8,
    "experience": 5,
    "description": "Experienced electrician"
  }'
```

