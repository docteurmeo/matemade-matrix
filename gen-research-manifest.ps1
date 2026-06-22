# Quét research-brands\<slug>\ -> sinh research-manifest.js
# Chạy lại mỗi khi thêm/bớt/đổi ảnh trong research-brands\<slug>\
$root = $PSScriptRoot
$base = Join-Path $root "research-brands"
$out  = Join-Path $root "research-manifest.js"
$exts = @(".jpg",".jpeg",".png",".webp")

$map = [ordered]@{}
Get-ChildItem $base -Directory | Sort-Object Name | ForEach-Object {
  $slug = $_.Name
  $files = Get-ChildItem $_.FullName -File |
    Where-Object { $exts -contains $_.Extension.ToLower() } |
    Sort-Object Name |
    ForEach-Object { "research-brands/$slug/$($_.Name)" }
  $map[$slug] = @($files)
}
$json = $map | ConvertTo-Json -Depth 4
"window.BRAND_IMAGES = $json;" | Out-File -FilePath $out -Encoding utf8
Write-Host "Wrote $out  ($($map.Keys.Count) brands)"
