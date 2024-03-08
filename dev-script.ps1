# Note: The title changes based on the commands running too - labeling the tabs is hard.

function startUi {
  # Display the Client IP Firewall warning
  Write-Output "PAUSE: Did you add the Client Ip Firewall rule?"
  Write-Output "    Easiest way to add the rule is via Azure Data Studio connection."
  Write-Output "    Press any key to continue"
  Read-Host;

  # Create the UI tab
  wt -w 0 nt --title UI --inheritEnvironment -d . pwsh -NoExit -c "npm run dev:ui"
  Write-Output "Creating UI Tab..."
  Start-Sleep -Seconds 1

  # Create teh API tab
  wt -w 0 nt --title API --inheritEnvironment -d . pwsh -NoExit -c "npm run dev:api"
  Write-Output "Creating API Tab..."
  Start-Sleep -Seconds 1

  # Start the SWA tab.
  $tabSWA = wt -w 0 nt --title SWA --inheritEnvironment -d . pwsh -NoExit  -c "npm run dev:swa:debug"
  Write-Output "New Tabs have been created... Press enter to continue"
  Read-Host
  $tabSWA.Focus;
  
  Exit-PSSession;
}

# Run on reference
startUI;