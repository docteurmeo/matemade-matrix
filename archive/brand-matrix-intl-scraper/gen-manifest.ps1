# Quét toàn bộ folder ảnh theo brand slug -> sinh manifest.js cho ma trận
# Chạy lại mỗi khi thêm/bớt/đổi ảnh trong images\<slug>\
$base = Join-Path $PSScriptRoot "images"
$out  = Join-Path $PSScriptRoot "manifest.js"
$exts = @(".jpg",".jpeg",".png",".webp")

$map = [ordered]@{}
Get-ChildItem $base -Directory | Sort-Object Name | ForEach-Object {
  $slug = $_.Name
  $files = Get-ChildItem $_.FullName -File |
    Where-Object { $exts -contains $_.Extension.ToLower() } |
    Sort-Object Name |
    ForEach-Object { "brand-matrix/images/$slug/$($_.Name)" }
  $map[$slug] = @($files)
}

$json = $map | ConvertTo-Json -Depth 4
"window.BRAND_IMAGES = $json;" | Out-File -FilePath $out -Encoding utf8
Write-Host "Wrote $out  ($($map.Keys.Count) brands)"
