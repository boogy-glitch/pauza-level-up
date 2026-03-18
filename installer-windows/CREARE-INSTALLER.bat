@echo off
title Pauza Level Up - Creare Installer Windows
chcp 65001 >nul 2>nul
echo.
echo  ╔══════════════════════════════════════════╗
echo  ║   PAUZA LEVEL UP - Creare Installer      ║
echo  ╚══════════════════════════════════════════╝
echo.

set "SCRIPT_DIR=%~dp0"
set "PROJECT_DIR=%SCRIPT_DIR%.."

:: Verifica daca dist/ exista
if not exist "%PROJECT_DIR%\dist\index.html" (
    echo [EROARE] Folderul dist\ nu exista!
    echo.
    echo Trebuie sa rulezi mai intai pe calculatorul de development:
    echo   npm run build
    echo.
    echo Apoi copiaza folderul dist\ in proiect si ruleaza din nou.
    pause
    exit /b 1
)

echo Ce vrei sa creezi?
echo.
echo   [1] Pachet PORTABIL (ZIP) - fara instalare necesara
echo       Utilizatorul extrage ZIP-ul si da dublu-click.
echo.
echo   [2] Installer PROFESIONAL (EXE) - necesita Inno Setup
echo       Installer clasic cu Next, Next, Finish.
echo.
echo   [3] AMBELE
echo.
set /p choice="Alege optiunea (1/2/3): "

if "%choice%"=="1" goto PORTABLE
if "%choice%"=="2" goto INNOSETUP
if "%choice%"=="3" goto BOTH
echo Optiune invalida!
pause
exit /b 1

:BOTH
call :DO_PORTABLE
call :DO_INNOSETUP
goto DONE

:PORTABLE
call :DO_PORTABLE
goto DONE

:INNOSETUP
call :DO_INNOSETUP
goto DONE

:: ==========================================
:: FUNCTIE: Creare pachet portabil
:: ==========================================
:DO_PORTABLE
echo.
echo ══════════════════════════════════════
echo  Creare pachet PORTABIL...
echo ══════════════════════════════════════

set "OUTPUT_DIR=%PROJECT_DIR%\installer-output"
set "PORTABLE_DIR=%OUTPUT_DIR%\PauzaLevelUp_Portabil"

if exist "%PORTABLE_DIR%" rmdir /s /q "%PORTABLE_DIR%"
mkdir "%PORTABLE_DIR%" 2>nul
mkdir "%PORTABLE_DIR%\web" 2>nul
mkdir "%OUTPUT_DIR%" 2>nul

echo [1/3] Copiere aplicatie...
xcopy "%PROJECT_DIR%\dist\*" "%PORTABLE_DIR%\web\" /e /q /y >nul

echo [2/3] Copiere launcher...
copy "%SCRIPT_DIR%launcher.vbs" "%PORTABLE_DIR%\PauzaLevelUp.vbs" >nul
copy "%SCRIPT_DIR%PauzaLevelUp.exe.bat" "%PORTABLE_DIR%\PauzaLevelUp.bat" >nul

(
echo ==========================================
echo    PAUZA LEVEL UP
echo    Aplicatie Educationala
echo ==========================================
echo.
echo PORNIRE:
echo   Dublu-click pe "PauzaLevelUp.bat"
echo.
echo   Aplicatia se deschide in browser.
echo.
echo DEZINSTALARE:
echo   Sterge acest folder.
echo ==========================================
) > "%PORTABLE_DIR%\CITESTE-MA.txt"

echo [3/3] Creare ZIP...
powershell -Command "if (Test-Path '%OUTPUT_DIR%\PauzaLevelUp_Portabil_1.0.0.zip') { Remove-Item '%OUTPUT_DIR%\PauzaLevelUp_Portabil_1.0.0.zip' }; Compress-Archive -Path '%PORTABLE_DIR%\*' -DestinationPath '%OUTPUT_DIR%\PauzaLevelUp_Portabil_1.0.0.zip'"

echo.
echo [OK] Pachet portabil creat:
echo      installer-output\PauzaLevelUp_Portabil_1.0.0.zip
echo.
exit /b 0

:: ==========================================
:: FUNCTIE: Creare installer cu Inno Setup
:: ==========================================
:DO_INNOSETUP
echo.
echo ══════════════════════════════════════
echo  Creare installer cu Inno Setup...
echo ══════════════════════════════════════

:: Genereaza icon.ico daca nu exista
if not exist "%SCRIPT_DIR%icon.ico" (
    echo [1/3] Generare icon.ico...
    powershell -ExecutionPolicy Bypass -File "%SCRIPT_DIR%create-icon.ps1"
) else (
    echo [1/3] icon.ico exista deja.
)

:: Cauta Inno Setup
set "ISCC="
if exist "%ProgramFiles(x86)%\Inno Setup 6\ISCC.exe" set "ISCC=%ProgramFiles(x86)%\Inno Setup 6\ISCC.exe"
if exist "%ProgramFiles%\Inno Setup 6\ISCC.exe" set "ISCC=%ProgramFiles%\Inno Setup 6\ISCC.exe"

if "%ISCC%"=="" (
    echo.
    echo [EROARE] Inno Setup 6 nu este instalat!
    echo.
    echo Descarca gratuit de la:
    echo   https://jrsoftware.org/isdl.php
    echo.
    echo Instaleaza-l si ruleaza din nou acest script.
    echo.
    exit /b 1
)

echo [2/3] Inno Setup gasit: %ISCC%
echo [3/3] Compilare installer...

"%ISCC%" "%SCRIPT_DIR%PauzaLevelUp.iss"

if %ERRORLEVEL% neq 0 (
    echo [EROARE] Compilarea a esuat!
    exit /b 1
)

echo.
echo [OK] Installer creat:
echo      installer-output\PauzaLevelUp_Setup_1.0.0.exe
echo.
exit /b 0

:DONE
echo.
echo ══════════════════════════════════════════
echo  TOTUL GATA!
echo ══════════════════════════════════════════
echo.
echo Fisierele sunt in folderul: installer-output\
echo.
if exist "%PROJECT_DIR%\installer-output\PauzaLevelUp_Portabil_1.0.0.zip" echo   [ZIP] PauzaLevelUp_Portabil_1.0.0.zip
if exist "%PROJECT_DIR%\installer-output\PauzaLevelUp_Setup_1.0.0.exe" echo   [EXE] PauzaLevelUp_Setup_1.0.0.exe
echo.
echo Trimite fisierul dorit utilizatorilor.
echo.
pause
