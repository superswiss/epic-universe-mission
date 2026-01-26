$url = 'https://api.github.com/repos/superswiss/epic-universe-mission/pages'
$r = Invoke-WebRequest -Uri $url -UseBasicParsing -Headers @{'User-Agent'='curl'} -ErrorAction SilentlyContinue
if ($r -eq $null) { Write-Output 'NO RESPONSE or ERROR' } else { Write-Output '--- Pages API JSON ---'; $len = [Math]::Min(2000,$r.Content.Length); Write-Output $r.Content.Substring(0,$len) }
