param(
  [string]$ResetAt = "",
  [string]$WindowTitleRegex = "Claude|claude|Anthropic|Push github",
  [int]$PollSeconds = 30,
  [int]$MaxHours = 12,
  [int]$PostInvokeCheckSeconds = 90,
  [switch]$KeepTrying
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

Add-Type -AssemblyName UIAutomationClient
Add-Type -AssemblyName UIAutomationTypes

Add-Type @"
using System;
using System.Runtime.InteropServices;
public static class Win32 {
  [DllImport("user32.dll")]
  public static extern bool SetForegroundWindow(IntPtr hWnd);
  [DllImport("user32.dll")]
  public static extern bool ShowWindowAsync(IntPtr hWnd, int nCmdShow);
}
"@

function Get-NextResetTime {
  param([string]$TimeText)

  if ([string]::IsNullOrWhiteSpace($TimeText)) {
    return $null
  }

  $formats = @("H:mm", "HH:mm", "h:mmtt", "h:mm tt", "hh:mmtt", "hh:mm tt")
  $parsed = $null

  foreach ($fmt in $formats) {
    try {
      $parsed = [datetime]::ParseExact(
        $TimeText.Trim(),
        $fmt,
        [Globalization.CultureInfo]::InvariantCulture,
        [Globalization.DateTimeStyles]::None
      )
      break
    } catch {}
  }

  if ($null -eq $parsed) {
    throw "Could not parse ResetAt '$TimeText'. Use examples like 01:10, 1:10am, or 1:10 AM."
  }

  $now = Get-Date
  $target = Get-Date -Hour $parsed.Hour -Minute $parsed.Minute -Second 0
  if ($target -lt $now.AddMinutes(-1)) {
    $target = $target.AddDays(1)
  }
  return $target
}

function Find-ClaudeWindow {
  param([string]$TitleRegex)

  Get-Process |
    Where-Object { $_.MainWindowHandle -ne 0 -and $_.MainWindowTitle -match $TitleRegex } |
    Sort-Object ProcessName, MainWindowTitle |
    Select-Object -First 1
}

function Find-DescendantByName {
  param(
    [System.Windows.Automation.AutomationElement]$Root,
    [string]$Name
  )

  $condition = New-Object System.Windows.Automation.PropertyCondition(
    [System.Windows.Automation.AutomationElement]::NameProperty,
    $Name
  )
  return $Root.FindFirst([System.Windows.Automation.TreeScope]::Descendants, $condition)
}

function Test-TryAgainVisible {
  param([System.Diagnostics.Process]$Process)

  [Win32]::ShowWindowAsync($Process.MainWindowHandle, 9) | Out-Null
  Start-Sleep -Milliseconds 250
  [Win32]::SetForegroundWindow($Process.MainWindowHandle) | Out-Null
  Start-Sleep -Milliseconds 500

  $root = [System.Windows.Automation.AutomationElement]::FromHandle($Process.MainWindowHandle)
  if ($null -eq $root) {
    Write-Host "Window found, but UI Automation could not inspect it."
    return $null
  }

  $button = Find-DescendantByName -Root $root -Name "Try again"
  if ($null -eq $button) {
    return $null
  }

  return $button
}

function Invoke-TryAgain {
  param([System.Diagnostics.Process]$Process)

  $button = Test-TryAgainVisible -Process $Process
  if ($null -eq $button) {
    Write-Host "No visible 'Try again' button found in '$($Process.MainWindowTitle)'."
    return $false
  }

  $pattern = $null
  if ($button.TryGetCurrentPattern([System.Windows.Automation.InvokePattern]::Pattern, [ref]$pattern)) {
    Write-Host "Invoking 'Try again' in '$($Process.MainWindowTitle)'..."
    $pattern.Invoke()
    return $true
  }

  Write-Host "Found 'Try again', but it is not invokable yet."
  return $false
}

$deadline = (Get-Date).AddHours($MaxHours)
$targetReset = Get-NextResetTime -TimeText $ResetAt

if ($null -ne $targetReset) {
  $wait = [Math]::Max(0, [int]($targetReset - (Get-Date)).TotalSeconds)
  Write-Host "Waiting until reset time $($targetReset.ToString('yyyy-MM-dd HH:mm:ss')) before retrying..."
  while ((Get-Date) -lt $targetReset) {
    $remaining = [int]($targetReset - (Get-Date)).TotalSeconds
    Write-Host "Reset countdown: $remaining seconds"
    Start-Sleep -Seconds ([Math]::Min($PollSeconds, [Math]::Max(1, $remaining)))
  }
}

Write-Host "Starting Claude auto-retry loop. WindowTitleRegex='$WindowTitleRegex'."
$invokeCount = 0

do {
  if ((Get-Date) -gt $deadline) {
    Write-Host "Stopped after MaxHours=$MaxHours."
    exit 2
  }

  $window = Find-ClaudeWindow -TitleRegex $WindowTitleRegex
  if ($null -eq $window) {
    Write-Host "Claude/browser window not found. Waiting..."
    Start-Sleep -Seconds $PollSeconds
    continue
  }

  $ok = Invoke-TryAgain -Process $window
  if ($ok) {
    $invokeCount += 1
    if (-not $KeepTrying) {
      Write-Host "Retry invoked. Waiting $PostInvokeCheckSeconds seconds to verify whether the limit cleared..."
      Start-Sleep -Seconds $PostInvokeCheckSeconds

      $refreshedWindow = Find-ClaudeWindow -TitleRegex $WindowTitleRegex
      if ($null -eq $refreshedWindow) {
        Write-Host "Window disappeared after retry. Assuming handoff succeeded; exiting."
        exit 0
      }

      $stillVisible = Test-TryAgainVisible -Process $refreshedWindow
      if ($null -eq $stillVisible) {
        Write-Host "'Try again' is gone after retry. Exiting."
        exit 0
      }

      Write-Host "'Try again' is still visible after retry. Continuing loop."
    }
  } elseif ($invokeCount -gt 0 -and -not $KeepTrying) {
    Write-Host "'Try again' no longer visible after a prior retry. Exiting."
    exit 0
  }

  Start-Sleep -Seconds $PollSeconds
} while ($true)
