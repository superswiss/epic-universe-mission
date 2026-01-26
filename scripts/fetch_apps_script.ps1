$url = 'https://script.google.com/macros/s/AKfycbzy_LD4sIdB58MdWlX8J-ikPCCetSgIoROb3XWmCXIX3buEChJhxXCPlm8cFCuKtcVd/exec'
try {
  $j = Invoke-RestMethod -Uri $url -ErrorAction Stop
  Write-Output 'OK'
  $type = $j.GetType().Name
  Write-Output "Type: $type"
  if ($j -is [System.Array]) { Write-Output "Rows: $($j.Length)" }
  else { 
    $json = $j | ConvertTo-Json -Depth 5
    $len = [Math]::Min(2000, $json.Length)
    Write-Output "JSON (truncated $len chars):"
    Write-Output $json.Substring(0,$len)
  }
} catch {
  Write-Output 'ERROR'
  Write-Output $_.Exception.Message
}
