$files = Get-ChildItem -Recurse -Include '*.jsx','*.tsx','*.css' | Where-Object { $_.FullName -notmatch 'node_modules' }

$replacements = @(
  @('rgba(6,182,212','rgba(168,85,247'),
  @('rgba(56,189,248','rgba(168,85,247'),
  @('text-cyan-200','text-violet-200')
)

foreach ($file in $files) {
  $content = Get-Content $file.FullName -Raw -Encoding UTF8
  $changed = $false
  foreach ($pair in $replacements) {
    $old = $pair[0]
    $new = $pair[1]
    if ($content.Contains($old)) {
      $content = $content.Replace($old, $new)
      $changed = $true
    }
  }
  if ($changed) {
    Set-Content -Path $file.FullName -Value $content -NoNewline -Encoding UTF8
    Write-Host "Updated: $($file.Name)"
  }
}
Write-Host "Done."
