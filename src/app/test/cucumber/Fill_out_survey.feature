Feature: Fill out survey

Background:
 Given Survey must have been created
 And User has to know the link
 And Sufficient user rights must be available

Scenario: User fills out survey
 When User clicks on the survey link
 And User answers all questions
 And User presses the send survey button
 Then Answers gets sent to the server
 And Success-Page will be shown

Scenario: User clicks on wrong link
 When User clicks on a wrong link
 Then Error-Page will be shown

Scenario: User stops filling out survey
 When User clicks on the survey link
 And User does not complete all questions
 And Page will be closed
 Then Nothing will be sent to the server