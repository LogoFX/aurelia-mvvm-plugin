import { defineFeature, loadFeature } from "jest-cucumber";
import { arrays } from 'logofx/core/collections';

const feature = loadFeature('./test/features/collections-array.feature');

defineFeature(feature, test => {

  test('The IndexOf method should return the right position', ({
    given,
    when,
    then
  }) => {

    let _testArray: string[] = [];
    let _item: string;
  
    given(/^I have an array of numbers '(.*)'$/, (arg0: string) => {
      arg0.split(', ').forEach((s: string) => _testArray.push(s));      
    });

    when(/^I try to find index of the (.*)$/, (arg0: string) => {
      _item = arg0;
    });

    then(/^The index is (.*)$/, (arg0) => {
      expect(arrays.indexOf(_testArray, _item).toString()).toBe(arg0);
    });
  });
});
