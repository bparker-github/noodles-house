# Note: The title changes based on the commands running too - labeling the tabs is hard.

function startUi {
  # Create the UI tab
  wt -w 0 nt --title UI --inheritEnvironment -d . pwsh -NoExit -c "npm run dev:ui"
  Write-Output "Creating UI Tab..."
  Start-Sleep -Seconds 5

  # Create teh API tab
  wt -w 0 nt --title API --inheritEnvironment -d . pwsh -NoExit -c "npm run dev:api"
  Write-Output "Creating API Tab..."
  Start-Sleep -Seconds 5

  # Start the SWA tab.
  $tabSWA = wt -w 0 nt --title SWA --inheritEnvironment -d . pwsh -NoExit  -c "npm run dev:swa:debug"
  Write-Output "New Tabs have been created... Press enter to continue"
  Read-Host
  $tabSWA.Focus;
  
  Exit-PSSession;
}

# Run on reference
startUI;