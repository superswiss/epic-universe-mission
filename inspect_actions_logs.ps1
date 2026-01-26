$owner='superswiss'
$repo='epic-universe-mission'
$headers=@{'User-Agent'='monitor-script'}

$r = Invoke-WebRequest -UseBasicParsing -Uri "https://api.github.com/repos/$owner/$repo/actions/runs" -Headers $headers
$runs = ConvertFrom-Json $r.Content

$run = $runs.workflow_runs | Where-Object { $_.status -eq 'completed' -and $_.conclusion -ne 'success' } | Select-Object -First 1
if (-not $run) { $run = $runs.workflow_runs | Select-Object -First 1 }
Write-Output "Selected run: id=$($run.id) conclusion=$($run.conclusion) url=$($run.html_url)"

$jobsResp = Invoke-WebRequest -UseBasicParsing -Uri $run.jobs_url -Headers $headers
$jobs = ConvertFrom-Json $jobsResp.Content
$job = $jobs.jobs | Where-Object { $_.conclusion -ne 'success' } | Select-Object -First 1
if (-not $job) { $job = $jobs.jobs | Select-Object -First 1 }
Write-Output "Selected job: id=$($job.id) name=$($job.name) conclusion=$($job.conclusion) url=$($job.html_url)"

$logsUri = "https://api.github.com/repos/$owner/$repo/actions/jobs/$($job.id)/logs"
$out = 'joblogs.zip'
try {
    Invoke-WebRequest -UseBasicParsing -Uri $logsUri -Headers $headers -OutFile $out -ErrorAction Stop
    Expand-Archive -Force $out -DestinationPath joblogs
    Write-Output 'Extracted logs to joblogs/'
    Get-ChildItem joblogs -Recurse | Select-Object FullName
    $files = Get-ChildItem joblogs -Recurse | Where-Object { -not $_.PSIsContainer } | Select-Object -ExpandProperty FullName
    $matches = Select-String -Path $files -Pattern 'error','Error','FAILED','fail','npm ERR' -CaseSensitive:$false -Context 0,3 -ErrorAction SilentlyContinue
    if (-not $matches) { Write-Output 'No obvious error lines found in logs.'; exit 0 }
    $matches | Select-Object -First 60 | ForEach-Object {
        Write-Output "---- $($_.Path):$($_.LineNumber) ----"
        Write-Output $_.Line
        if ($_.Context.PostContext) { $_.Context.PostContext | ForEach-Object { Write-Output ('  Post: ' + $_) } }
    }
} catch {
    Write-Error "Failed to download or extract logs: $($_.Exception.Message)"
}
