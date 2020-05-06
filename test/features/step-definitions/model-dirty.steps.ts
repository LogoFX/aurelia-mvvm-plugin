import { SimpleEditableModel } from '../objects/simple-editable-model';
import { defineFeature, loadFeature, DefineStepFunction } from "jest-cucumber";

const feature = loadFeature('./test/features/model-dirty.feature');

defineFeature(feature, test => {

  let model : SimpleEditableModel;  

  const andTheSimpleEditableModelIsMadeDirty = (and: DefineStepFunction) => {
    and('The editing is started for the simple editable model', () => {
      model.beginEdit();
    });
  };

  test('Initially created simple editable model is not marked as dirty', 
  ({
    given,
    when,
    and,
    then
  }) => {

    when('The simple editable model is created with valid name', () => {
      model = new SimpleEditableModel('valid-name');
    });   
  
    then('The simple editable model is not marked as dirty', () => {
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
  
    then('The simple editable model is not marked as dirty', () => {
      expect(model.isDirty).toBe(false);
    });
  });

  test('Making simple editable model dirty during editing lifecycle should mark model as dirty', ({
    when,
    and,
    then
  }) => {
    when('The simple editable model is created with valid name', () => {
      model = new SimpleEditableModel('valid-name');
    });
  
    and('The editing is started for the simple editable model', () => {
      model.beginEdit();
    });
  
    and('The simple editable model is made dirty', () => {
      model.makeDirty();
    });
  
    then('The simple editable model is marked as dirty', () => {
      expect(model.isDirty).toBe(true);
    });
  });

  
})

