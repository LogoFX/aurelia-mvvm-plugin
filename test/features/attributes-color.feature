Feature: Color attribute

Scenario: It sets font color with bound value
  Given I have the model with property color set to value "Red"
  When I have the view composed with "p" tag
  And I set the color value to Green
  Then I expect to see the "Green" background

Scenario: It sets font color with hard coded value
  Given I have the view composed with "p" tag
  When I set the color value to Green
  Then I expect to see Green font color  
