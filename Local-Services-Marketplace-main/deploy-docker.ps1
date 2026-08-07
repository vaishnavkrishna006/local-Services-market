Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$projectPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectPath

Write-Host 'Building and starting Docker containers...'
docker compose down --remove-orphans

docker compose up --build -d

Write-Host 'Containers started.'
Write-Host 'Frontend: http://localhost:3000'
Write-Host 'Backend: http://localhost:8000'
