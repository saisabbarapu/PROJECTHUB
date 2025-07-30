# 🔄 Bidirectional Sharing Guide

## How it works:

### 📤 Your friend can upload projects to your server:
- When your friend submits a project through the frontend
- The project (including images and PDFs) gets uploaded to YOUR backend server
- The files are stored in YOUR computer's `backend/uploads/` folder
- The project data is saved in YOUR MongoDB database
- You can see their projects immediately on your device

### 📥 You can upload projects that your friend sees:
- When you submit a project through your frontend
- The project gets uploaded to YOUR backend server
- Your friend can see your projects immediately on their device
- All projects are stored in the same database and server

## 🔧 Technical Setup:

### Your friend's frontend configuration:
```javascript
// This is already configured in the code
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.187.84:4000/api'
});

export default api;
```

### What this means:
- Your friend's frontend connects to YOUR backend server
- All uploads go to YOUR computer
- All data is stored on YOUR server
- Both of you see the same projects in real-time

## 📁 File Storage:

### Where files are stored on YOUR computer:
```
projecthub/backend/uploads/
├── images/     # All project images (yours + friend's)
└── pdfs/       # All project PDFs (yours + friend's)
```

### Database:
- All project data is stored in YOUR MongoDB Atlas database
- Both of you access the same database
- Real-time updates for both users

## 🚀 How to use:

### For your friend:
1. Start the frontend: `npm run dev`
2. Go to `http://localhost:3000`
3. Click "Submit Project" to upload new projects
4. All uploaded projects will appear on YOUR device immediately

### For you:
1. Start your backend: `npm start` (in backend folder)
2. Start your frontend: `npm run dev` (in frontend folder)
3. Upload projects normally
4. Your friend will see your projects immediately

## ⚡ Real-time Features:

- **Live updates**: When either of you uploads a project, it appears instantly for both
- **Likes**: Both can like/unlike projects
- **Comments**: Both can leave feedback
- **Notifications**: Real-time notifications for new projects

## 🔒 Security & Permissions:

- Both users can view all projects
- Both users can upload new projects
- Both users can like/unlike projects
- Both users can leave feedback
- Only the project owner can delete their own projects

## 🐛 Troubleshooting:

### If uploads don't work:
1. Make sure your backend is running
2. Check if both computers are on the same network
3. Verify the IP address `192.168.187.84` is correct
4. Check browser console for errors

### If images don't load:
1. Ensure your backend is serving static files correctly
2. Check if the upload folders exist
3. Verify file permissions

## 📊 What you'll see:

### On your device:
- All your projects
- All your friend's projects
- Real-time updates when friend uploads
- All images and PDFs from both users

### On your friend's device:
- All your projects
- All their projects
- Real-time updates when you upload
- All images and PDFs from both users

---

**This creates a shared project showcase where both users contribute to the same collection! 🎉** 