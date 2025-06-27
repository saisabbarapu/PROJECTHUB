# 🚀 RAILWAY DEPLOYMENT GUIDE - Step by Step

## ✅ Your Complete Credentials Ready:

### Cloudinary:
- **Cloud Name**: `dr4ine8em`
- **API Key**: `419255423438389`
- **API Secret**: `DaUhSLkzsk-4Rph6J-_Sol7emZw`

### MongoDB:
- **URL**: `mongodb+srv://24m11mc150:Sabbarapu%40123@cluster0.zmuwm5s.mongodb.net/project-showcase?retryWrites=true&w=majority`

### Email:
- **User**: `projecthubs983@gmail.com`
- **Pass**: `lcby vvej cmzf rgbe`

---

## 📋 STEP 1: Go to Railway

1. **Open your browser**
2. **Go to**: https://railway.app
3. **Click "Start a New Project"**

---

## 📋 STEP 2: Connect GitHub

1. **Click "Deploy from GitHub repo"**
2. **Sign in with GitHub** (if not already signed in)
3. **Authorize Railway** to access your GitHub account
4. **Select your repository**: `saisabbarapu/PROJECTHUB`

---

## 📋 STEP 3: Configure Project

1. **Set root directory to**: `backend`
   - Click on the folder icon
   - Select `backend` folder
   - Click "Deploy"

2. **Wait for deployment** (2-3 minutes)
   - Railway will automatically install dependencies
   - It will detect Node.js and run `npm start`

---

## 📋 STEP 4: Add Environment Variables

**After deployment completes:**

1. **Go to your project dashboard**
2. **Click "Variables" tab**
3. **Add these variables one by one:**

### Variable 1:
- **Name**: `CLOUDINARY_CLOUD_NAME`
- **Value**: `dr4ine8em`

### Variable 2:
- **Name**: `CLOUDINARY_API_KEY`
- **Value**: `419255423438389`

### Variable 3:
- **Name**: `CLOUDINARY_API_SECRET`
- **Value**: `DaUhSLkzsk-4Rph6J-_Sol7emZw`

### Variable 4:
- **Name**: `MONGODB_URL`
- **Value**: `mongodb+srv://24m11mc150:Sabbarapu%40123@cluster0.zmuwm5s.mongodb.net/project-showcase?retryWrites=true&w=majority`

### Variable 5:
- **Name**: `EMAIL_USER`
- **Value**: `projecthubs983@gmail.com`

### Variable 6:
- **Name**: `EMAIL_PASS`
- **Value**: `lcby vvej cmzf rgbe`

---

## 📋 STEP 5: Get Your Railway URL

1. **Go to "Settings" tab**
2. **Copy your Railway URL**
   - It will look like: `https://your-app-name.railway.app`
   - **Save this URL** - you'll need it for Vercel deployment

---

## 📋 STEP 6: Test Your Backend

1. **Open your Railway URL** in browser
2. **Add `/health` to the URL**
   - Example: `https://your-app-name.railway.app/health`
3. **You should see**: `{"status":"ok","database":"connected",...}`

---

## 🎉 Success!

Your backend is now deployed and accessible worldwide!

### Next Steps:
1. **Deploy frontend to Vercel** (next guide)
2. **Connect frontend to this Railway URL**
3. **Test worldwide access**

---

## 🆘 Troubleshooting

### If deployment fails:
1. **Check logs** in Railway dashboard
2. **Verify environment variables** are set correctly
3. **Make sure repository is public**
4. **Try redeploying**

### If health check fails:
1. **Check environment variables** are added
2. **Wait a few minutes** for deployment to complete
3. **Check Railway logs** for errors

---

## 🔗 Your Railway URL

After successful deployment, your backend will be at:
```
https://your-app-name.railway.app
```

**Save this URL for the next step (Vercel deployment)!** 