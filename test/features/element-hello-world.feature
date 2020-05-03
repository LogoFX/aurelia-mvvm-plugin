Feature: The hello-world element

Scenario: It says hello world with bound message

  When I have the model with message David
  Then I expect to see the text Hello world David



Scenario: It says hello world with message

  When I have the model with message David
  Then I expect to see the text Hello world David

