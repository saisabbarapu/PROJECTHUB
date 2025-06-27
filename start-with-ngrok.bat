@echo off
echo Starting ProjectHub Backend with ngrok tunnel...
echo.

REM Start the backend server
start "Backend Server" cmd /c "cd backend && npm start"

REM Wait a moment for server to start
timeout /t 3 /nobreak > nul

REM Start ngrok tunnel
echo Creating public tunnel with ngrok...
echo Your app will be accessible from anywhere!
echo.
ngrok http 5000

pause 