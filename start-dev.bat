@echo off
title RentEase Dev Server (No Docker)
color 0B

echo.
echo   ========================================
echo     RentEase Dev Launcher (No Docker)
echo     Uses H2 embedded database
echo   ========================================
echo.

:: Detect Package Manager
set PKG_MGR=npm
where pnpm >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    set PKG_MGR=pnpm
)

:: Auto-install dependencies if node_modules is missing
if not exist "%~dp0frontend\node_modules" (
    echo   [!] node_modules not found. Installing dependencies with %PKG_MGR%...
    echo       This may take a minute...
    cd /d "%~dp0frontend" && call %PKG_MGR% install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo   [X] ERROR: %PKG_MGR% install failed! 
        echo       Please check your internet connection and make sure Node.js is installed.
        pause
        exit /b %ERRORLEVEL%
    )
    cd /d "%~dp0"
)

:: Detect Maven or use Wrapper
set MVN_CMD=mvn
where mvn >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo   [!] Maven not found in PATH. Using Maven Wrapper...
    set MVN_CMD=mvnw.cmd
)

:: Start Backend in a new window
echo   [1/2] Starting Backend (Spring Boot + H2)...
start "RentEase Backend" cmd /k "cd /d %~dp0java-backend && call %MVN_CMD% spring-boot:run -Dspring-boot.run.profiles=dev"

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
