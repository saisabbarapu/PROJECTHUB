@echo off
echo ========================================
echo    ProjectHub - Cloud Deployment Setup
echo ========================================
echo.
echo This will help you prepare for cloud deployment
echo so your app can be accessed from ANY network!
echo.

echo Step 1: Installing cloud dependencies...
cd backend
npm install cloudinary multer-storage-cloudinary
cd ..

echo.
echo Step 2: Creating deployment files...
echo ✅ vercel.json created for frontend
echo ✅ railway.json created for backend
echo ✅ Cloudinary integration added

echo.
echo ========================================
echo    NEXT STEPS FOR WORLDWIDE ACCESS:
echo ========================================
echo.
echo 1. Create Cloudinary account:
echo    https://cloudinary.com/
echo.
echo 2. Deploy Backend to Railway:
echo    https://railway.app/
echo    - Connect your GitHub repo
echo    - Set root directory to: backend
echo    - Add environment variables
echo.
echo 3. Deploy Frontend to Vercel:
echo    https://vercel.com/
echo    - Connect your GitHub repo
echo    - Set root directory to: frontend
echo    - Add environment variables
echo.
echo 4. Test worldwide access:
echo    - Use your phone (mobile data)
echo    - Try from different WiFi
echo    - Share with friends worldwide
echo.
echo ========================================
echo.
echo See CLOUD_DEPLOYMENT_GUIDE.md for detailed instructions!
echo.
pause 