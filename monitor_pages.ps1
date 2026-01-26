$owner='superswiss'
$repo='epic-universe-mission'
$headers=@{'User-Agent'='monitor-script'}

Write-Output "Recent workflow runs:"
$runsResp = Invoke-WebRequest -UseBasicParsing -Uri "https://api.github.com/repos/$owner/$repo/actions/runs" -Headers $headers -ErrorAction SilentlyContinue
if ($runsResp -and $runsResp.Content) {
  $runs = ConvertFrom-Json $runsResp.Content
  $runs.workflow_runs | Select-Object -First 6 | Format-Table id,head_branch,conclusion,status,html_url -AutoSize
} else {
  Write-Output 'Could not fetch workflow runs.'
}

Write-Output ""
Write-Output "Pages configuration:"
$pagesResp = Invoke-WebRequest -UseBasicParsing -Uri "https://api.github.com/repos/$owner/$repo/pages" -Headers $headers -ErrorAction SilentlyContinue
if ($pagesResp -and $pagesResp.Content) {
  $pages = ConvertFrom-Json $pagesResp.Content
  Write-Output "Status: $($pages.status)"
  if ($pages.source) { Write-Output "Source: branch=$($pages.source.branch) path=$($pages.source.path)" }
  Write-Output "HTML URL: $($pages.html_url)"
} else {
  Write-Output 'No Pages configuration available or authentication required.'
}

Write-Output ""
Write-Output "Downloading live page HTML..."
$live = Invoke-WebRequest -UseBasicParsing -Uri "https://superswiss.github.io/epic-universe-mission" -ErrorAction SilentlyContinue
if ($live -and $live.Content) { $live.Content | Out-File -FilePath page_live.html -Encoding utf8; Write-Output 'Saved live HTML to page_live.html'; Get-Content page_live.html -TotalCount 80 } else { Write-Output 'Failed to fetch live page HTML' }
