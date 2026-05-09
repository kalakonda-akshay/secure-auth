@echo off
cd /d "%~dp0"
start "Secure Auth Backend" cmd /k "cd /d %~dp0backend && npm install && npm run dev"
start "Secure Auth Frontend" cmd /k "cd /d %~dp0frontend && npm install && npm run dev"
echo Starting backend and frontend...
echo Open http://localhost:5173 after both terminals finish installing.
pause
