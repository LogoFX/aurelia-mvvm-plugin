Feature: Dirty
	  In order to support various client app scenarios
	  As an app developer
	  I want the framework to manage dirty object state properly

Scenario: Initially created simple editable model is not marked as dirty
	  When The simple editable model is created with valid name
	  Then The simple editable model is not marked as dirty
