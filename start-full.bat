@echo off
title RentEase Full Server (Docker + PostgreSQL)
color 0A

echo.
echo   ========================================
echo     RentEase Full Launcher
echo     Docker + PostgreSQL + Backend + Frontend
echo   ========================================
echo.

:: Auto-install dependencies if node_modules is missing
if not exist "%~dp0frontend\node_modules" (
    echo   [!] node_modules not found. Installing dependencies...
    echo       This may take a minute...
    cd /d "%~dp0frontend" && call npm install
    cd /d "%~dp0"
)

:: Start Docker PostgreSQL
echo   [1/3] Starting PostgreSQL via Docker...
start "RentEase Database" cmd /k "cd /d %~dp0 && docker-compose up"

:: Wait for DB to be ready
echo          Waiting for database to start...
timeout /t 8 /nobreak > nul

:: Start Backend (uses default application.properties = PostgreSQL)
echo   [2/3] Starting Backend (Spring Boot + PostgreSQL)...
start "RentEase Backend" cmd /k "cd /d %~dp0java-backend && mvnw.cmd spring-boot:run"

:: Wait for backend
timeout /t 5 /nobreak > nul

:: Start Frontend
echo   [3/3] Starting Frontend (Vite)...
start "RentEase Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo   =============================================
echo     All three servers are starting!
echo.
echo     Frontend  : http://localhost:5173
echo     Backend   : http://localhost:8080
echo     Database  : PostgreSQL on port 5432
echo.
echo     Close the other windows to stop.
echo   =============================================
echo.
pause
