@echo off
title Pauza Level Up - Creare pachet portabil
echo ==========================================
echo   Pauza Level Up - Pachet Portabil
echo ==========================================
echo.

set "SCRIPT_DIR=%~dp0"
set "PROJECT_DIR=%SCRIPT_DIR%.."
set "OUTPUT_DIR=%PROJECT_DIR%\installer-output"
set "PORTABLE_DIR=%OUTPUT_DIR%\PauzaLevelUp_Portabil"

:: Verifica daca dist/ exista
if not exist "%PROJECT_DIR%\dist\index.html" (
    echo [EROARE] Folderul dist/ nu exista!
    echo Ruleaza mai intai: npm run build
    pause
    exit /b 1
)

echo [1/3] Pregatire folder...
if exist "%PORTABLE_DIR%" rmdir /s /q "%PORTABLE_DIR%"
mkdir "%PORTABLE_DIR%"
mkdir "%PORTABLE_DIR%\web"

echo [2/3] Copiere fisiere aplicatie...
xcopy "%PROJECT_DIR%\dist\*" "%PORTABLE_DIR%\web\" /e /q /y >nul

:: Copiere launcher
copy "%SCRIPT_DIR%launcher.vbs" "%PORTABLE_DIR%\PauzaLevelUp.vbs" >nul
copy "%SCRIPT_DIR%PauzaLevelUp.exe.bat" "%PORTABLE_DIR%\PauzaLevelUp.bat" >nul
if exist "%SCRIPT_DIR%icon.ico" copy "%SCRIPT_DIR%icon.ico" "%PORTABLE_DIR%\icon.ico" >nul

:: Creare README
(
echo ==========================================
echo    PAUZA LEVEL UP - Aplicatie Educationala
echo ==========================================
echo.
echo INSTALARE:
echo   Nu este necesara instalare!
echo.
echo PORNIRE:
echo   Dublu-click pe "PauzaLevelUp.bat"
echo   sau pe "PauzaLevelUp.vbs"
echo.
echo   Aplicatia se va deschide in browserul tau.
echo.
echo DEZINSTALARE:
echo   Sterge acest folder.
echo ==========================================
) > "%PORTABLE_DIR%\CITESTE-MA.txt"

echo [3/3] Creare arhiva ZIP...
powershell -Command "Compress-Archive -Path '%PORTABLE_DIR%\*' -DestinationPath '%OUTPUT_DIR%\PauzaLevelUp_Portabil_1.0.0.zip' -Force"

echo.
echo ==========================================
echo    SUCCES!
echo ==========================================
echo.
echo Fisiere create in: installer-output\
echo.
echo  1. PauzaLevelUp_Portabil\     - folder portabil (copiere directa)
echo  2. PauzaLevelUp_Portabil_1.0.0.zip - arhiva ZIP (de trimis)
echo.
echo Utilizatorul trebuie doar sa extraga ZIP-ul
echo si sa dea dublu-click pe PauzaLevelUp.bat
echo.
pause
