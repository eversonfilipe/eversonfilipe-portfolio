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

echo Installing Git pre-commit hook...
copy hooks\pre-commit .git\hooks\pre-commit > nul

if %ERRORLEVEL% NEQ 0 (
  echo ❌ Failed to copy pre-commit hook. Check permissions.
  echo.
  pause
  exit /b 1
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
echo ✅ Git Hooks installed successfully!
echo - The "pre-commit" hook will automatically validate JS syntax, rebuild
echo   static blocks, and stage index.html/llms.txt before every "git commit".
echo - The "pre-push" hook will double check consistency before code upload.
echo.
pause
