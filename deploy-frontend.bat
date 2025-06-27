@echo off
echo.
echo 🌐 DEPLOYING FRONTEND TO VERCEL
echo ================================
echo.
echo This will deploy your React frontend to Vercel
echo so it can connect to your Railway backend!
echo.
echo Opening Vercel for deployment...
echo.
start https://vercel.com
echo.
echo 📋 FRONTEND DEPLOYMENT STEPS:
echo.
echo 1. Sign up/Login to Vercel with GitHub
echo 2. Click "New Project"
echo 3. Import your repository: saisabbarapu/PROJECTHUB
echo 4. Set root directory to: frontend
echo 5. Click "Deploy"
echo.
echo 6. After deployment, go to "Settings" > "Environment Variables"
echo 7. Add this environment variable:
echo.
echo    VITE_API_URL=https://YOUR_RAILWAY_URL.railway.app/api
echo.
echo    (Replace YOUR_RAILWAY_URL with your actual Railway URL)
echo.
echo 8. Redeploy the project
echo.
echo 🌍 Your frontend will be accessible worldwide!
echo.
pause 