@echo off
title Pauza Level Up - Build Installer
echo ==========================================
echo    Pauza Level Up - Creare Installer
echo ==========================================
echo.

:: Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [EROARE] Node.js nu este instalat!
    echo Descarca Node.js de la: https://nodejs.org/
    echo Instaleaza versiunea LTS si reporneste acest script.
    pause
    exit /b 1
)

echo [1/4] Instalare dependinte...
call npm install
if %ERRORLEVEL% neq 0 (
    echo [EROARE] Instalarea dependintelor a esuat!
    pause
    exit /b 1
)
echo.

echo [2/4] Generare iconite...
call node scripts/generate-icons.js
echo.

echo [3/4] Construire aplicatie web...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo [EROARE] Build-ul a esuat!
    pause
    exit /b 1
)
echo.

echo [4/4] Creare installer Windows...
call npx electron-builder --win
if %ERRORLEVEL% neq 0 (
    echo [EROARE] Crearea installerului a esuat!
    pause
    exit /b 1
)
echo.

echo ==========================================
echo    SUCCES! Installerul a fost creat!
echo ==========================================
echo.
echo Gasesti installerul in folderul: installer\
echo.
dir /b installer\*.exe 2>nul
echo.
pause
