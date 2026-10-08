$files = Get-ChildItem -Recurse -Include '*.jsx','*.tsx','*.css' | Where-Object { $_.FullName -notmatch 'node_modules' }

$replacements = @(
  @('cyan-500/30','violet-500/30'),
  @('cyan-500/40','violet-500/40'),
  @('cyan-500/20','violet-500/20'),
  @('cyan-500/10','violet-500/10'),
  @('cyan-500/15','violet-500/15'),
  @('cyan-500/50','violet-500/50'),
  @('cyan-950/40','violet-950/40'),
  @('cyan-400/40','violet-400/40'),
  @('text-cyan-400','text-violet-400'),
  @('text-cyan-300','text-violet-300'),
  @('border-cyan-400','border-violet-400'),
  @('bg-cyan-500','bg-violet-500'),
  @('bg-cyan-950','bg-violet-950'),
  @('shadow-cyan-500','shadow-violet-500'),
  @('shadow-cyan-950','shadow-violet-950'),
  @('hover:bg-cyan-500','hover:bg-violet-500'),
  @('hover:border-cyan-400','hover:border-violet-400'),
  @('hover:text-cyan-300','hover:text-violet-300'),
  @('hover:text-cyan-400','hover:text-violet-400'),
  @('from-cyan-500','from-violet-500'),
  @('from-cyan-400','from-violet-400'),
  @('via-cyan-300','via-fuchsia-300'),
  @('via-sky-300','via-fuchsia-300'),
  @('to-cyan-400','to-violet-400'),
  @('focus:border-cyan-500','focus:border-violet-500'),
  @('focus:ring-cyan-500','focus:ring-violet-500'),
  @('group-hover:text-cyan-300','group-hover:text-violet-300'),
  @('text-sky-400','text-violet-400'),
  @('border-cyan-500','border-violet-500')
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
