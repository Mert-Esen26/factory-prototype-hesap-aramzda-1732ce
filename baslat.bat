@echo off
setlocal
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\windows-launch.ps1" -Mode Start
set "result=%errorlevel%"
if not "%result%"=="0" if not defined FACTORY_NO_PAUSE pause
exit /b %result%
