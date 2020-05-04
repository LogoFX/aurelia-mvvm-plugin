import { SimpleEditableModel } from '../objects/simple-editable-model';
import { defineFeature, loadFeature } from "jest-cucumber";

const feature = loadFeature('./test/features/model-dirty.feature');

defineFeature(feature, test => {

  let model : SimpleEditableModel;  

  test('Initially created simple editable model is not marked as dirty', 
  ({
    given,
    when,
    and,
    then
  }) => {

    when(/^The simple editable model is created with valid name$/, () => {
      model = new SimpleEditableModel('valid-name');
    });   
  
    then(/^The simple editable model is not marked as dirty$/, () => {
      expect(model.isDirty).toBe(false);     
    });
  });

  test(`Making simple editable model dirty outside of editing lifecycle should not mark model as dirty`, ({
    when,
    and,
    then
  }) => {
    when('The simple editable model is created with valid name', () => {
      model = new SimpleEditableModel('valid-name');
    });
  
    and('The simple editable model is made dirty', () => {
      model.makeDirty();
    });
  
    then(`The simple editable model isn't marked as dirty`, () => {
      expect(model.isDirty).toBe(false);
    });
  });

})

