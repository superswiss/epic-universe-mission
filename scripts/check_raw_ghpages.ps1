$url = 'https://raw.githubusercontent.com/superswiss/epic-universe-mission/gh-pages/index.html'
$r = Invoke-WebRequest -Uri $url -UseBasicParsing -ErrorAction SilentlyContinue
if ($r -eq $null) { Write-Output 'NO RESPONSE or ERROR' } else { Write-Output '--- Raw gh-pages/index.html (first 1200 chars) ---'; $len = [Math]::Min(1200,$r.Content.Length); Write-Output $r.Content.Substring(0,$len) }
