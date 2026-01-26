$owner = 'superswiss'
$repo = 'epic-universe-mission'
$headers = @{ 'User-Agent' = 'monitor-script' }

$resp = Invoke-WebRequest -UseBasicParsing -Uri "https://api.github.com/repos/$owner/$repo/actions/runs" -Headers $headers
$json = $resp.Content
$r = ConvertFrom-Json $json
if (-not $r.workflow_runs) { Write-Output 'No workflow runs found'; exit 0 }

$run = $r.workflow_runs[0]
$run | Format-List id,status,conclusion,workflow_name,head_branch,html_url,created_at,updated_at

if ($run.conclusion -ne 'success') {
    $jobsResp = Invoke-WebRequest -UseBasicParsing -Uri $run.jobs_url -Headers $headers
    $jobs = ConvertFrom-Json $jobsResp.Content
    foreach ($job in $jobs.jobs) {
        Write-Output ""
        Write-Output "Job: $($job.name)"
        $job | Format-List *
    }
}
