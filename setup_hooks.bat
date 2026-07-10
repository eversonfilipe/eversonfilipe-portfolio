@echo off
echo ==============================================
echo  GitOps Hook Installer — Everson Portfolio
echo ==============================================
echo.

if not exist .git (
  echo ❌ Error: .git directory not found!
  echo Make sure you run this script from the root of the repository.
  echo.
  pause
  exit /b 1
)

if not exist .git\hooks (
  mkdir .git\hooks
)

echo Installing Git pre-push hook...
copy hooks\pre-push .git\hooks\pre-push > nul

if %ERRORLEVEL% NEQ 0 (
  echo ❌ Failed to copy pre-push hook. Check permissions.
  echo.
  pause
  exit /b 1
)

echo.
echo ✅ Git pre-push hook installed successfully!
echo The hook will automatically validate JS syntax and run the static builder
echo before every "git push" command.
echo.
pause
