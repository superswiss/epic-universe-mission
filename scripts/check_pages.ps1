$url = 'https://superswiss.github.io/epic-universe-mission/'
$r = Invoke-WebRequest -Uri $url -UseBasicParsing -ErrorAction SilentlyContinue
if ($r -eq $null) {
  Write-Output 'NO RESPONSE or ERROR'
} else {
  Write-Output "Status: $($r.StatusCode)"
  Write-Output '--- Headers ---'
  $r.Headers | Format-List
  Write-Output '--- Body (first 1200 chars) ---'
  $len = [Math]::Min(1200, $r.Content.Length)
  Write-Output $r.Content.Substring(0,$len)
}
