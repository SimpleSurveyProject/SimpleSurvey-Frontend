Feature: Share survey

Background:
 Given Survey must have been created
 And Sufficient user rights must be available

Scenario: User shares survey
 When User navigates to the dashboard
 And User clicks on the "Share" Button
 And User presses the "Create link" button
 Then Request will be sent to the server
 And User gets the link

Scenario: User disables link
 When User navigates to the dashboard
 And User clicks on the "Disable Link" Button
 Then Request will be sent to the server
 And User gets a notification