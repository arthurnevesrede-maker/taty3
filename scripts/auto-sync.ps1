$ErrorActionPreference = 'Stop'
$SourcePath = "C:\Users\Arthur\Desktop\taty"
$RepoPath   = "C:\Users\Arthur\Documents\GitHub\Taty2"

function Ensure-Git() {
  try { git --version | Out-Null } catch {
    $ghd = Get-ChildItem "$env:LOCALAPPDATA\GitHubDesktop" -Directory -ErrorAction SilentlyContinue | Sort-Object Name -Descending | Select-Object -First 1
    if ($ghd) {
      $gitBin = Join-Path $ghd.FullName "resources\app\git\mingw64\bin"
      $env:PATH = "$gitBin;" + $env:PATH
    }
    git --version | Out-Null
  }
}

Ensure-Git

while ($true) {
  robocopy $SourcePath $RepoPath /MIR /XD ".git" ".trae" /XF "*.zip" "*.log" | Out-Null
  Push-Location $RepoPath
  $changes = git status --porcelain
  if ($changes) {
    git add -A
    $msg = "Auto-sync " + (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
    git commit -m $msg
    git push origin main
  }
  Pop-Location
  Start-Sleep -Seconds 10
}