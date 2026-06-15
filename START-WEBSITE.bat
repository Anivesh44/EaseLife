@echo off
echo ========================================
echo   EASELIFE Website Startup
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)
echo Node.js found!

echo.
echo [2/4] Installing dependencies (if needed)...
call npm run install-all
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [3/4] Checking environment files...
echo Getting network IP address...
for /f "tokens=2 delims=:" %%i in ('ipconfig ^| findstr /R /C:"IPv4 Address"') do (
    set IP=%%i
    goto :found_ip
)
:found_ip
set IP=%IP:~1%
echo Network IP: %IP%

if not exist "server\.env" (
    echo Creating server/.env file...
    copy "server\environment1224" "server\.env" >nul 2>&1
    if not exist "server\.env" (
        echo WARNING: Could not create server/.env
        echo Please create it manually with MongoDB connection details
    )
)

if not exist "client\.env.local" (
    echo Creating client/.env.local file...
    (
        echo NEXT_PUBLIC_API_URL=http://%IP%:5000/api
    ) > "client\.env.local"
    echo API URL set to: http://%IP%:5000/api
)

echo.
echo [4/4] Starting website...
echo.
echo ========================================
echo   Website will open at:
echo   http://localhost:3000
echo   (Mobile/Same WiFi): http://%IP%:3000
echo ========================================
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause

