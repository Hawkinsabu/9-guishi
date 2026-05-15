$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = if ($env:PORT) { [int]$env:PORT } else { 8787 }

$types = @{
  ".html" = "text/html; charset=utf-8"
  ".css" = "text/css; charset=utf-8"
  ".js" = "application/javascript; charset=utf-8"
  ".svg" = "image/svg+xml; charset=utf-8"
  ".png" = "image/png"
  ".jpg" = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".gif" = "image/gif"
  ".webp" = "image/webp"
}

function Send-Response($stream, [int]$status, [string]$statusText, [byte[]]$body, [string]$contentType) {
  $header = "HTTP/1.1 $status $statusText`r`nContent-Type: $contentType`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
  $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
  $stream.Write($headerBytes, 0, $headerBytes.Length)
  if ($body.Length -gt 0) {
    $stream.Write($body, 0, $body.Length)
  }
}

$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Parse("127.0.0.1"), $port)
$listener.Start()
Write-Host "No.9 dev server started: http://127.0.0.1:$port/"

try {
  while ($true) {
    $client = $listener.AcceptTcpClient()
    try {
      $stream = $client.GetStream()
      $buffer = New-Object byte[] 4096
      $read = $stream.Read($buffer, 0, $buffer.Length)
      if ($read -le 0) { continue }
      $requestText = [System.Text.Encoding]::ASCII.GetString($buffer, 0, $read)
      $firstLine = ($requestText -split "`r?`n")[0]
      $parts = $firstLine -split " "
      $requestPath = if ($parts.Length -ge 2) { $parts[1] } else { "/" }
      $requestPath = ($requestPath -split "\?")[0]
      $requestPath = [System.Uri]::UnescapeDataString($requestPath)
      if ($requestPath -eq "/") { $requestPath = "/index.html" }

      $relative = $requestPath.TrimStart("/") -replace "/", [System.IO.Path]::DirectorySeparatorChar
      $filePath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($root, $relative))

      if (-not $filePath.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase)) {
        Send-Response $stream 403 "Forbidden" ([System.Text.Encoding]::UTF8.GetBytes("Forbidden")) "text/plain; charset=utf-8"
        continue
      }
      if (-not [System.IO.File]::Exists($filePath)) {
        Send-Response $stream 404 "Not Found" ([System.Text.Encoding]::UTF8.GetBytes("Not found")) "text/plain; charset=utf-8"
        continue
      }

      $extension = [System.IO.Path]::GetExtension($filePath).ToLowerInvariant()
      $contentType = if ($types.ContainsKey($extension)) { $types[$extension] } else { "application/octet-stream" }
      $body = [System.IO.File]::ReadAllBytes($filePath)
      Send-Response $stream 200 "OK" $body $contentType
    }
    catch {
      try {
        Send-Response $stream 500 "Internal Server Error" ([System.Text.Encoding]::UTF8.GetBytes("Server error")) "text/plain; charset=utf-8"
      } catch {}
    }
    finally {
      $client.Close()
    }
  }
}
finally {
  $listener.Stop()
}
