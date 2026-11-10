param([ValidateSet('Install','Start')][string]$Mode = 'Start')
$ErrorActionPreference = 'Stop'
try {
    Set-Location (Split-Path $PSScriptRoot -Parent)
    if (-not (Get-Command node.exe -ErrorAction SilentlyContinue) -or -not (Get-Command npm.cmd -ErrorAction SilentlyContinue)) {
        throw 'Install Node.js 24 LTS from https://nodejs.org then run this file again.'
    }
    $version = (& node.exe --version | Select-Object -Last 1)
    $major = [int]($version.TrimStart('v').Split('.')[0])
    if ($major -lt 24) { throw 'Node.js 24 or newer is required. Install Node.js 24 LTS.' }
    $pkg = Get-Content -Raw package.json | ConvertFrom-Json
    $script = @('dev','start','preview') | Where-Object { $pkg.scripts.PSObject.Properties.Name -contains $_ } | Select-Object -First 1
    if (-not $script) { throw 'package.json needs a dev, start or preview script.' }
    function Run-Npm([string[]]$Arguments) {
        & npm.cmd @Arguments
        if ($LASTEXITCODE -ne 0) { throw ('npm failed (exit ' + $LASTEXITCODE + '): ' + ($Arguments -join ' ')) }
    }
    if ((Test-Path .env.example) -and -not (Test-Path .env)) { Copy-Item .env.example .env; Write-Host 'Created .env from .env.example. Review its settings.' }
    function File-Hash([string]$Name) {
        $sha = [System.Security.Cryptography.SHA256]::Create()
        try { return [BitConverter]::ToString($sha.ComputeHash([IO.File]::ReadAllBytes((Join-Path (Get-Location) $Name)))) }
        finally { $sha.Dispose() }
    }
    $fingerprint = (File-Hash 'package.json') + (& node.exe --version)
    if (Test-Path package-lock.json) { $fingerprint += File-Hash 'package-lock.json' }
    $stamp = '.factory-windows-installed'
    $installed = (Test-Path node_modules) -and (Test-Path $stamp)
    if ($installed) { $installed = (Get-Content -Raw $stamp).Trim() -eq $fingerprint.Trim() }
    if ($Mode -eq 'Install' -or -not $installed) {
        if (Test-Path package-lock.json) { Run-Npm @('ci','--no-audit','--no-fund') }
        else { Run-Npm @('install','--no-audit','--no-fund') }
        if ($pkg.scripts.PSObject.Properties.Name -contains 'build') { Run-Npm @('run','build') }
        $fingerprint.Trim() | Set-Content -Encoding ASCII $stamp
    }
    if ($Mode -eq 'Start') {
        Write-Host ('Starting npm run ' + $script + '. Open the localhost URL printed below. Ctrl+C stops the app.')
        Run-Npm @('run',$script)
    } else { Write-Host 'Installation complete. Run baslat.bat to start.' }
    exit 0
} catch { Write-Host ('ERROR: ' + $_.Exception.Message) -ForegroundColor Red; exit 1 }
