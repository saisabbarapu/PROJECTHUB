# 📋 Step-by-Step Setup for Friend

## Follow these steps exactly:

### Step 1: Install Node.js
- Go to https://nodejs.org/
- Download and install Node.js

### Step 2: Extract the zip file
- Right-click the zip file
- Select "Extract All"
- Choose a folder to extract to

### Step 3: Edit the API file
- Navigate to: `projecthub/frontend/src/components/`
- Open the file called `api.js` with any text editor (Notepad, VS Code, etc.)
- **Delete everything** in the file
- **Copy and paste** this exact code:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.187.84:4000/api'
});

export default api;
```

- **Save the file**

### Step 4: Open terminal/command prompt
- Press `Windows + R`
- Type `cmd` and press Enter

### Step 5: Navigate to the frontend folder
```bash
cd path\to\your\extracted\folder\projecthub\frontend
```

### Step 6: Install dependencies
```bash
npm install
```

### Step 7: Start the application
```bash
npm run dev
```

### Step 8: Open browser
- Go to: `http://localhost:3000`
- You should see the project showcase!

## ✅ Success!
If you see the project showcase website, you're connected to your friend's server!

## 🐛 If it doesn't work:
1. Make sure you edited the `api.js` file correctly
2. Make sure both computers are on the same WiFi
3. Ask your friend if their backend is running
4. Try `ping 192.168.187.84` in terminal

---
**That's it! You can now upload projects that your friend will see! 🎉** 