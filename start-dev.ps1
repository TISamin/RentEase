<#
.SYNOPSIS
    One-click RentEase development launcher.
    No Docker required! Uses H2 embedded database.

.DESCRIPTION
    Starts the Spring Boot backend (with dev profile) and the Vite frontend
    in parallel. Press Ctrl+C to stop everything.

.EXAMPLE
    .\start-dev.ps1
#>

$Host.UI.RawUI.WindowTitle = "RentEase Dev Server"

Write-Host ""
Write-Host "  ╔══════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "  ║        🏠  RentEase Dev Launcher         ║" -ForegroundColor Cyan
Write-Host "  ║   No Docker needed • H2 embedded DB      ║" -ForegroundColor DarkCyan
Write-Host "  ╚══════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$projectRoot = $PSScriptRoot

# ── Dependency Check ─────────────────────────────────────
if (-not (Test-Path "$projectRoot\frontend\node_modules")) {
    Write-Host "  [!] node_modules not found. Installing dependencies..." -ForegroundColor Cyan
    
    $pkgMgr = "npm"
    if (Get-Command pnpm -ErrorAction SilentlyContinue) {
        $pkgMgr = "pnpm"
    }
    
    Write-Host "      Using $pkgMgr to install. This may take a minute..." -ForegroundColor Gray
    
    Push-Location "$projectRoot\frontend"
    try {
        & $pkgMgr install
        if ($LASTEXITCODE -ne 0) {
            Write-Host "  ❌ ERROR: $pkgMgr install failed!" -ForegroundColor Red
            Pop-Location
            Pause
            exit $LASTEXITCODE
        }
    } finally {
        Pop-Location
    }
    Write-Host "  ✅ Dependencies installed successfully.`n" -ForegroundColor Green
}

# ── Start Backend ────────────────────────────────────────
Write-Host "  [1/2] Starting Spring Boot backend..." -ForegroundColor Yellow
$backendJob = Start-Job -ScriptBlock {
    param($root)
    Set-Location "$root\java-backend"
    & .\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=dev" 2>&1
} -ArgumentList $projectRoot

# Give backend a head start
Start-Sleep -Seconds 5

# ── Start Frontend ───────────────────────────────────────
Write-Host "  [2/2] Starting Vite frontend..." -ForegroundColor Yellow
$frontendJob = Start-Job -ScriptBlock {
    param($root)
    Set-Location "$root\frontend"
    & npm run dev 2>&1
} -ArgumentList $projectRoot

Start-Sleep -Seconds 3

Write-Host ""
Write-Host "  ✅ Both servers are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "  Frontend  → http://localhost:5173" -ForegroundColor White
Write-Host "  Backend   → http://localhost:8080" -ForegroundColor White
Write-Host "  H2 Console→ http://localhost:8080/h2-console" -ForegroundColor DarkGray
Write-Host ""
Write-Host "  Press Ctrl+C to stop all servers." -ForegroundColor DarkGray
Write-Host "  ─────────────────────────────────────────────" -ForegroundColor DarkGray
Write-Host ""

# ── Stream logs from both jobs ───────────────────────────
try {
    while ($true) {
        # Backend logs
        $backendOutput = Receive-Job -Job $backendJob -ErrorAction SilentlyContinue
        if ($backendOutput) {
            foreach ($line in $backendOutput) {
                Write-Host "  [API] $line" -ForegroundColor DarkYellow
            }
        }

        # Frontend logs
        $frontendOutput = Receive-Job -Job $frontendJob -ErrorAction SilentlyContinue
        if ($frontendOutput) {
            foreach ($line in $frontendOutput) {
                Write-Host "  [WEB] $line" -ForegroundColor DarkCyan
            }
        }

        # Check if either job has failed
        if ($backendJob.State -eq 'Failed') {
            Write-Host "  ❌ Backend crashed! Check errors above." -ForegroundColor Red
            break
        }
        if ($frontendJob.State -eq 'Failed') {
            Write-Host "  ❌ Frontend crashed! Check errors above." -ForegroundColor Red
            break
        }

        Start-Sleep -Milliseconds 500
    }
}
finally {
    # ── Cleanup on Ctrl+C ────────────────────────────────
    Write-Host ""
    Write-Host "  Shutting down servers..." -ForegroundColor Yellow
    Stop-Job -Job $backendJob -ErrorAction SilentlyContinue
    Stop-Job -Job $frontendJob -ErrorAction SilentlyContinue
    Remove-Job -Job $backendJob -Force -ErrorAction SilentlyContinue
    Remove-Job -Job $frontendJob -Force -ErrorAction SilentlyContinue
    Write-Host "  ✅ All servers stopped. Goodbye!" -ForegroundColor Green
}
