# EASELIFE - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm run install-all
```

### 2. Setup Environment

**Backend:**
```bash
cd server
# Create .env file with:
# MONGODB_URI=mongodb://localhost:27017/easelife
# PORT=5000
# JWT_SECRET=your_secret_key
```

**Frontend:**
```bash
cd client
# Create .env.local file with:
# NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Start MongoDB
Make sure MongoDB is running on your system.

### 4. Run the App
```bash
# From root directory
npm run dev
```

### 5. Open Browser
Visit: **http://localhost:3000**

## ✨ Key Features

### For Service Seekers:
- 🔍 **Search & Filter**: Find providers by area, price, work type, hours
- 📱 **Direct Contact**: Get phone numbers for cash payment
- ✅ **Verified Providers**: See Aadhar-verified service providers
- 🎯 **Simple Interface**: Easy to use for everyone

### For Service Providers:
- 📝 **Easy Registration**: Simple form with Aadhar verification
- 🎨 **Beautiful Profile**: Showcase your services with cards
- 📍 **Area Selection**: List all areas where you work
- 💰 **Price Setting**: Set your price range
- ⏰ **Work Schedule**: Choose daily/weekly/monthly/yearly

## 📋 Registration Requirements

When registering as a service provider, you'll need:
- Full Name
- Phone Number (10 digits)
- Aadhar Number (12 digits) - for verification
- Service Type (Labour, Tailoring, Electrician, etc.)
- Areas of Service (comma-separated)
- Price Range (Min - Max in ₹)
- Work Type (Daily/Weekly/Monthly/Yearly)
- Duty Hours per Day (1-24)
- Experience (optional)
- Description (optional)

## 🎨 Design Features

- **Modern UI**: Beautiful gradient backgrounds and cards
- **Responsive**: Works on mobile, tablet, and desktop
- **Visual Icons**: Emojis and icons for easy understanding
- **Color Coding**: Different colors for different service types
- **Smooth Animations**: Hover effects and transitions

## 🔧 Troubleshooting

**MongoDB Connection Error?**
- Check if MongoDB is running
- Verify MONGODB_URI in server/.env

**Port Already in Use?**
- Change PORT in server/.env
- Or kill the process: `lsof -ti:5000 | xargs kill`

**Module Not Found?**
- Run `npm run install-all` again
- Delete node_modules and reinstall

## 📞 Support

For issues or questions, check the main README.md or SETUP.md files.

---

**Happy Connecting! 🎉**

