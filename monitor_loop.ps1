$url = 'https://superswiss.github.io/epic-universe-mission'
$attempts = 40
$delay = 15

Write-Output "Monitoring $url for up to $(($attempts*$delay)/60) minutes..."
for ($i=1; $i -le $attempts; $i++) {
    try {
        $resp = Invoke-WebRequest -UseBasicParsing -Uri $url -Headers @{ 'User-Agent' = 'pages-monitor' } -TimeoutSec 15 -ErrorAction Stop
        $code = $resp.StatusCode
        $body = $resp.Content
        Write-Output "[$i] HTTP $code"
        if ($code -eq 200) {
            # crude check: built site should not reference /src/main.jsx
            if ($body -notmatch '/src/main.jsx') {
                Write-Output "Built site detected on attempt $i. Saving page_live.html"
                $body | Out-File -FilePath page_live.html -Encoding utf8
                exit 0
            } else {
                Write-Output "Page 200 but appears to be raw source index.html (contains /src/main.jsx)."
            }
        }
    } catch {
        Write-Output "[$i] Request failed: $($_.Exception.Message)"
    }
    Start-Sleep -Seconds $delay
}
Write-Output "Timeout reached: site did not serve built assets within allotted time."
exit 1
