; Pauza Level Up - Inno Setup Installer Script
; Descarca Inno Setup gratuit: https://jrsoftware.org/isinfo.php

[Setup]
AppName=Pauza Level Up
AppVersion=1.0.0
AppPublisher=Pauza Level Up
AppPublisherURL=https://pauzalevelup.ro
DefaultDirName={autopf}\Pauza Level Up
DefaultGroupName=Pauza Level Up
UninstallDisplayIcon={app}\icon.ico
OutputDir=..\installer-output
OutputBaseFilename=PauzaLevelUp_Setup_1.0.0
SetupIconFile=icon.ico
Compression=lzma2
SolidCompression=yes
PrivilegesRequired=lowest
WizardStyle=modern
DisableProgramGroupPage=yes

; Branding
AppId={{B7E2A1F3-9C4D-4E5A-8F6B-1A2B3C4D5E6F}

[Languages]
Name: "romanian"; MessagesFile: "compiler:Languages\Romanian.isl"

[Tasks]
Name: "desktopicon"; Description: "Creaza shortcut pe Desktop"; GroupDescription: "Shortcut-uri:"; Flags: checked
Name: "startmenu"; Description: "Creaza shortcut in Start Menu"; GroupDescription: "Shortcut-uri:"; Flags: checked

[Files]
; Aplicatia (fisierele din dist/)
Source: "..\dist\*"; DestDir: "{app}\web"; Flags: ignoreversion recursesubdirs createallsubdirs
; Launcher
Source: "PauzaLevelUp.exe.bat"; DestDir: "{app}"; Flags: ignoreversion
Source: "launcher.vbs"; DestDir: "{app}"; Flags: ignoreversion
; Icon
Source: "icon.ico"; DestDir: "{app}"; Flags: ignoreversion

[Icons]
Name: "{autodesktop}\Pauza Level Up"; Filename: "{app}\launcher.vbs"; IconFilename: "{app}\icon.ico"; Tasks: desktopicon
Name: "{group}\Pauza Level Up"; Filename: "{app}\launcher.vbs"; IconFilename: "{app}\icon.ico"; Tasks: startmenu
Name: "{group}\Dezinstaleaza Pauza Level Up"; Filename: "{uninstallexe}"

[Run]
Filename: "{app}\launcher.vbs"; Description: "Deschide Pauza Level Up"; Flags: postinstall nowait shellexec
