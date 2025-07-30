# ProjectHub - Setup Instructions for Friends

## 🚀 Quick Start Guide

This is a full-stack project showcase application with React frontend and Node.js backend.

### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)
- MongoDB (local or Atlas)

### 📁 Project Structure
```
projecthub/
├── frontend/          # React + Vite application
├── backend/           # Node.js + Express server
└── SETUP_INSTRUCTIONS.md (this file)
```

## 🔧 Installation Steps

### Step 1: Install Dependencies

**For Frontend:**
```bash
cd projecthub/frontend
npm install
```

**For Backend:**
```bash
cd projecthub/backend
npm install
```

### Step 2: Database Setup

The backend is configured to use MongoDB Atlas by default. If you want to use a local MongoDB:

1. Install MongoDB locally
2. Update the connection string in `backend/server.js`

### Step 3: API Configuration

**IMPORTANT:** The frontend is configured to connect to the backend server at `192.168.187.84:4000`. 

- **For your friend:** The frontend will automatically connect to your backend server
- **For you:** Make sure your backend server is running and accessible on your network

### Step 4: Start the Servers

**Start Backend (Terminal 1) - Only you need to run this:**
```bash
cd projecthub/backend
npm start
```
The backend will run on `http://192.168.187.84:4000`

**Start Frontend (Terminal 2) - Your friend can run this:**
```bash
cd projecthub/frontend
npm run dev
```
The frontend will run on `http://localhost:3000`

### Step 5: Access the Application

Your friend should open their browser and go to: `http://localhost:3000`

## 🌐 Network Requirements

### For your friend to access your data:
1. **Your computer** must be running the backend server
2. **Both computers** must be on the same network (same WiFi/LAN)
3. **Your firewall** must allow connections on port 4000
4. **Your backend** must be accessible from other devices on the network

### To check if your backend is accessible:
1. On your computer, run: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Note your IP address (should be `192.168.187.84`)
3. From your friend's computer, try: `ping 192.168.187.84`
4. If successful, the connection should work

## 🛠️ Development Tips

- **Auto-restart backend**: Install nodemon globally: `npm install -g nodemon`
- **Frontend hot reload**: Already configured with Vite
- **API endpoints**: Backend provides REST API at `http://192.168.187.84:4000/api`
- **Images and files**: Will be served from your backend server

## 📝 Features

- User authentication (login/signup)
- Project submission and management
- File uploads (images and PDFs) - served from your server
- Real-time notifications
- Responsive design

## 🐛 Troubleshooting

1. **Port already in use**: Change the port in `server.js` and update the frontend API URL
2. **MongoDB connection issues**: Check your internet connection and MongoDB Atlas credentials
3. **CORS errors**: Backend is configured to allow requests from common origins
4. **Connection issues**: 
   - Check if your backend is running
   - Verify both computers are on the same network
   - Check your firewall settings
   - Try `ping 192.168.187.84` from your friend's computer

## 📞 Support

If you encounter any issues, check:
1. Node.js version: `node --version`
2. npm version: `npm --version`
3. MongoDB connection
4. Console errors in browser and terminal
5. Network connectivity between computers
6. Firewall settings on your computer

---

**Happy coding! 🎉** 