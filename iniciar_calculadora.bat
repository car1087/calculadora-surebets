@echo off
REM Este script inicia el servidor y abre la calculadora.

REM Cambia al directorio donde se encuentra este script
cd /d "%~dp0"

REM Inicia el servidor web de Python en una ventana minimizada
start "Calculadora Surebets Server" /min python -m http.server 8000

REM Espera 2 segundos para dar tiempo a que el servidor se inicie
timeout /t 2 /nobreak >nul

REM Abre la calculadora en el navegador predeterminado
start http://localhost:8000
