# Genereaza icon.ico din icon.svg folosind .NET (fara dependinte externe)
# Ruleaza: powershell -ExecutionPolicy Bypass -File create-icon.ps1

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Add-Type -AssemblyName System.Drawing

# Cream un icon simplu 256x256 cu litera P pe fundal violet
$sizes = @(16, 32, 48, 256)
$icoPath = Join-Path $scriptDir "icon.ico"

# Cream bitmap-ul principal
$bmp = New-Object System.Drawing.Bitmap(256, 256)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'HighQuality'
$g.TextRenderingHint = 'AntiAlias'

# Fundal violet cu colturi rotunjite
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(124, 58, 237))
$g.FillRectangle($brush, 0, 0, 256, 256)

# Litera P
$font = New-Object System.Drawing.Font("Arial", 140, [System.Drawing.FontStyle]::Bold)
$textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$format = New-Object System.Drawing.StringFormat
$format.Alignment = 'Center'
$format.LineAlignment = 'Center'
$rect = New-Object System.Drawing.RectangleF(0, -15, 256, 256)
$g.DrawString("P", $font, $textBrush, $rect, $format)

# Text "LEVEL UP"
$font2 = New-Object System.Drawing.Font("Arial", 28, [System.Drawing.FontStyle]::Bold)
$rect2 = New-Object System.Drawing.RectangleF(0, 75, 256, 256)
$textBrush2 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 255, 255, 255))
$g.DrawString("LEVEL UP", $font2, $textBrush2, $rect2, $format)

$g.Dispose()

# Salvam ca ICO
$icon = [System.Drawing.Icon]::FromHandle($bmp.GetHicon())
$fs = [System.IO.File]::Create($icoPath)
$icon.Save($fs)
$fs.Close()
$icon.Dispose()
$bmp.Dispose()

Write-Host "icon.ico creat cu succes!" -ForegroundColor Green
