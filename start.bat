@echo off
title Pauza Level Up
echo ==========================================
echo    Pauza Level Up - Pornire aplicatie
echo ==========================================
echo.

:: Check if node_modules exists
if not exist "node_modules" (
    echo Instalare dependinte... (doar prima data)
    call npm install
    echo.
)

:: Check if dist exists
if not exist "dist" (
    echo Construire aplicatie...
    call npm run build
    echo.
)

echo Pornire server pe http://localhost:3000
echo.
echo  >> Deschide Chrome si acceseaza: http://localhost:3000
echo  >> Pentru a opri: inchide aceasta fereastra
echo.

:: Open browser after a short delay
start "" http://localhost:3000

:: Start the preview server
call npx vite preview --port=3000 --host=0.0.0.0
