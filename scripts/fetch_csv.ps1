$url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSAvOS_1HMgyg0FRGaOorCgge0oGbNDhkhnanqxFKRI0A3vmzM5qIEgeO1rKp7-_QwNJDhANNnHruvY/pub?gid=0&single=true&output=csv'
try {
  $r = Invoke-WebRequest -Uri $url -UseBasicParsing -ErrorAction Stop
  $c = $r.Content
  $lines = $c -split '\r?\n'
  Write-Output "Rows: $($lines.Length)"
  Write-Output 'Preview (first 10 lines):'
  $count = [Math]::Min(10, $lines.Length)
  for ($i=0; $i -lt $count; $i++) { Write-Output $lines[$i] }
} catch {
  Write-Output 'ERROR: ' + $_.Exception.Message
}
