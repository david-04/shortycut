@echo off

if exist "%JAVA_HOME%\bin\javaw.exe" (
  start "ShortyCut" /B "%JAVA_HOME%\bin\javaw.exe" -jar web-server.jar
) else (
  start "ShortyCut" /B "javaw.exe" -jar web-server.jar
)
