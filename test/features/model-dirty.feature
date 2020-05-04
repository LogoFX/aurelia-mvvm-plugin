Feature: Dirty
	  In order to support various client app scenarios
	  As an app developer
	  I want the framework to manage dirty object state properly

Scenario: Initially created simple editable model is not marked as dirty
	  When The simple editable model is created with valid name
	  Then The simple editable model is not marked as dirty

  Scenario: Trying to make dirty initially created simple editable model doesn't make the model dirty
	  When The simple editable model is created with valid name
	  And The simple editable model is made dirty
	  Then The simple editable model isn't marked as dirty
    
