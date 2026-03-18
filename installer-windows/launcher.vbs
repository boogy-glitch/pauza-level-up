' Pauza Level Up - Launcher
' Deschide aplicatia in browserul implicit fara fereastra de consola

Set objShell = CreateObject("WScript.Shell")
strPath = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
objShell.Run """" & strPath & "\web\index.html""", 0, False
