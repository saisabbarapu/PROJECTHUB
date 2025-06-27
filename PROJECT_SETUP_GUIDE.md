# Project Hub Setup Guide for Friend

## 📦 What's Included in the Zip

Your friend should receive a zip file containing:
- `frontend/` - React frontend application
- `backend/` - Node.js backend server
- `README.md` - This setup guide

## 🚀 Quick Setup Instructions for Your Friend

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn
- MongoDB (local or Atlas connection)

### Step 1: Extract the Project
1. Extract the zip file to a folder on their computer
2. Open terminal/command prompt in the project folder

### Step 2: Install Dependencies

**Backend Setup:**
```bash
cd backend
npm install
```

**Frontend Setup:**
```bash
cd frontend
npm install
```

### Step 3: Configure API Connection

**Option A: Use Friend's System (Recommended)**
```bash
cd frontend
node switch-api.js friend
```

**Option B: Use Local Development**
```bash
cd frontend
node switch-api.js local
```

### Step 4: Start the Servers

**Start Backend Server:**
```bash
cd backend
npm start
# or
node server.js
```

**Start Frontend Server (in a new terminal):**
```bash
cd frontend
npm run dev
```

### Step 5: Access the Application
- Frontend: http://localhost:5173 (or the port shown in terminal)
- Backend: http://localhost:4000

## 🔧 Configuration Details

### API Configuration
The project includes a flexible API configuration system:

- **Local Development**: `http://localhost:4000/api`
- **Friend's System**: `http://192.168.187.84:4000/api`

### Switching Between Configurations
```bash
# Switch to friend's system
node switch-api.js friend

# Switch to local development
node switch-api.js local

# Check current configuration
node switch-api.js
```

## 📊 Project Management Tools

### View All Projects
```bash
cd backend
node manage-projects.js list
```

### Remove Sample Projects (if any)
```bash
cd backend
node remove-sample-projects.js
```

### Delete Specific Project
```bash
cd backend
node manage-projects.js delete <project-id>
```

## 🔍 Troubleshooting

### Common Issues:

1. **Port Already in Use**
   - Change ports in `backend/server.js` and `frontend/vite.config.js`
   - Or kill processes using those ports

2. **MongoDB Connection Issues**
   - Check if MongoDB is running
   - Verify connection string in `backend/server.js`

3. **API Connection Issues**
   - Run connection test: `node frontend/test-connection.js`
   - Check if backend server is running
   - Verify IP addresses in configuration

4. **Permission Issues (Windows)**
   - Run PowerShell as Administrator
   - Or use Command Prompt instead

### Testing API Connection
```bash
cd frontend
node test-connection.js
```

## 📝 Important Notes

### ✅ What's Been Fixed:
- Sample projects removed from database
- Sample projects removed from frontend
- API configured for friend's system
- CORS settings updated for multiple environments
- Project management tools added

### 🎯 Current Status:
- Only real user projects are displayed
- No automatic sample project seeding
- Flexible API configuration
- Easy project management

### 🔒 Security:
- No hardcoded sample data
- Real-time project fetching
- Proper error handling
- Input validation

## 📞 Support

If your friend encounters issues:
1. Check this guide first
2. Run the test scripts provided
3. Check console logs for errors
4. Verify network connectivity between systems

## 🎉 Ready to Use!

Once setup is complete, your friend can:
- Submit new projects
- View existing projects
- Like and comment on projects
- Manage the project database
- Switch between different API configurations 