Feature: The Array
   In order to support additional operations with Array
   As an app developer
   I want to extend the Array class

  Scenario Outline: The indexOf method should return the right position
  Given I have an array of numbers '1, 8, 10'
  When I try to find index of the <number>
  Then The index is <index>

  Examples:
  | number | index |
  | 1      | 0     |
  | 8      | 1     |
  | 10     | 2     |
  | 11     | -1    |
