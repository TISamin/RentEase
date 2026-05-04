@echo off
title RentEase Dev Server (No Docker)
color 0B

echo.
echo   ========================================
echo     RentEase Dev Launcher (No Docker)
echo     Uses H2 embedded database
echo   ========================================
echo.

:: Auto-install dependencies if node_modules is missing
if not exist "%~dp0frontend\node_modules" (
    echo   [!] node_modules not found. Installing dependencies...
    echo       This may take a minute...
    cd /d "%~dp0frontend" && call npm install
    cd /d "%~dp0"
)

:: Start Backend in a new window
echo   [1/2] Starting Backend (Spring Boot + H2)...
start "RentEase Backend" cmd /k "cd /d %~dp0java-backend && mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=dev"

:: Wait a few seconds for backend to begin starting
timeout /t 5 /nobreak > nul

:: Start Frontend in a new window
echo   [2/2] Starting Frontend (Vite)...
start "RentEase Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo   =============================================
echo     Both servers are starting!
echo.
echo     Frontend   : http://localhost:5173
echo     Backend    : http://localhost:8080
echo     H2 Console : http://localhost:8080/h2-console
echo.
echo     Close the other two windows to stop.
echo   =============================================
echo.
pause
