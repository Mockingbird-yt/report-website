$ErrorActionPreference = 'Stop'

# Make sure ffmpeg is installed and available in PATH.
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
  throw 'ffmpeg was not found. Install FFmpeg and add its bin directory to PATH.'
}

$videoDir = Join-Path $PSScriptRoot 'assets\video'
$inputs = 2..5 | ForEach-Object {
  Join-Path $videoDir "$_.mp4"
}

foreach ($input in $inputs) {
  if (-not (Test-Path -LiteralPath $input)) {
    Write-Warning "Skipping missing file: $input"
    continue
  }

  $name = [IO.Path]::GetFileNameWithoutExtension($input)
  $output = Join-Path $videoDir "${name}-web.mp4"

  if (Test-Path -LiteralPath $output) {
    Write-Host "Already exists, skipping: $output"
    continue
  }

  Write-Host "Converting: $([IO.Path]::GetFileName($input)) -> $([IO.Path]::GetFileName($output))"
  & ffmpeg -hide_banner -y `
    -i $input `
    -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p `
    -c:a aac -b:a 128k `
    -movflags +faststart `
    $output

  if ($LASTEXITCODE -ne 0) {
    throw "Conversion failed: $input"
  }
}

Write-Host 'All conversions completed.'
