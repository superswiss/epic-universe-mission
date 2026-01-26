param(
  [string]$token
)
$headers = @{ Authorization = "token $token"; 'User-Agent'='pages-script' }
try {
  $resp = Invoke-RestMethod -Uri 'https://api.github.com/repos/superswiss/epic-universe-mission/pages' -Headers $headers -Method Get
  $resp | ConvertTo-Json -Depth 10 | Out-File pages_info.json -Encoding utf8
  Write-Output 'Wrote pages_info.json'
} catch {
  Write-Output "GET failed: $($_.Exception.Message)"
  if ($_.Exception.Response) { Write-Output "Status: $($_.Exception.Response.StatusCode.Value__) - $($_.Exception.Response.StatusDescription)" }
}

# Attempt to set Pages source to gh-pages branch
$body = @{ source = @{ branch = 'gh-pages'; path = '/' } } | ConvertTo-Json
try {
  $put = Invoke-RestMethod -Uri 'https://api.github.com/repos/superswiss/epic-universe-mission/pages' -Headers $headers -Method Put -Body $body -ContentType 'application/json'
  $put | ConvertTo-Json -Depth 10 | Out-File pages_put.json -Encoding utf8
  Write-Output 'Updated Pages site; wrote pages_put.json'
} catch {
  Write-Output "PUT failed: $($_.Exception.Message)"
  if ($_.Exception.Response) { Write-Output "Status: $($_.Exception.Response.StatusCode.Value__) - $($_.Exception.Response.StatusDescription)" }
}
