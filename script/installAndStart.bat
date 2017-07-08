@Echo OFF

echo Downloading python if required
python --version 3>NUL
if errorlevel 0 goto NoError
    
:: The default TARGETDIR is [WindowsVolume]Python<version>. 
msiexec /i python-3.6.msi TARGETDIR=r:\python36 /passive /norestart

:NoError
echo Computing the csv file into JSON for the application to run
python csv_to_json.py

:: Go to the index.html directory in the github folder
cd ../src

echo Starting the webserver
start /b python -m http.server 8000

SETLOCAL
SET HREF=http://127.0.0.1:8000

REM Starting the app using default browser
start "" %HREF%
