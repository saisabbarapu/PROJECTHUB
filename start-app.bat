@echo off
echo ========================================
echo    ProjectHub - Cross-Device Access
echo ========================================
echo.
echo Your app will be accessible from any device on your network!
echo.

REM Kill any existing Node.js processes
echo Stopping any existing servers...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul

REM Start backend server
echo Starting Backend Server...
start "Backend Server" cmd /c "cd backend && npm start"

REM Wait for backend to start
echo Waiting for backend to start...
timeout /t 8 /nobreak >nul

REM Start frontend server
echo Starting Frontend Server...
start "Frontend Server" cmd /c "cd frontend && npm run dev"

echo.
echo ========================================
echo Both servers are starting...
echo.
echo Wait 10-15 seconds, then try these URLs:
echo.
echo Frontend (try these in order):
echo 1. http://192.168.187.84:3000
echo 2. http://192.168.187.84:3001  
echo 3. http://192.168.187.84:3002
echo.
echo Backend: http://192.168.187.84:4000
echo.
echo Your friend can access from their device using the same URLs!
echo ========================================
echo.
pause 