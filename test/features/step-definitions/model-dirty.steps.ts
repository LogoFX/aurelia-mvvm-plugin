import { ModelSteps } from './../steps/model-steps';
import { SimpleEditableModel } from './../objects/simple-editable-model';
import { DataGenerator } from '../../helpers/DataGenerator';
import { defineFeature, loadFeature, DefineStepFunction } from "jest-cucumber";

const feature = loadFeature('./test/features/model-dirty.feature');

defineFeature(feature, test => {

  let modelSteps : ModelSteps = new ModelSteps();
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
      model = modelSteps.createValidSimpleEditableModel();
    });   
  
    then('The simple editable model is not marked as dirty', () => {
      modelSteps.assertModelIsNotDirty(model);  
    });
  });

  test(`Making simple editable model dirty outside of editing lifecycle should not mark model as dirty`, ({
    when,
    and,
    then
  }) => {
    when('The simple editable model is created with valid name', () => {
      model = modelSteps.createValidSimpleEditableModel();
    });
  
    and('The simple editable model is made dirty', () => {
      modelSteps.makeDirty(model);
    });
  
    then('The simple editable model is not marked as dirty', () => {
      modelSteps.assertModelIsNotDirty(model);
    });
  });

  test('Making simple editable model dirty during editing lifecycle should mark model as dirty', ({
    when,
    and,
    then
  }) => {
    when('The simple editable model is created with valid name', () => {
      model = modelSteps.createValidSimpleEditableModel();
    });
  
    and('The editing is started for the simple editable model', () => {
      modelSteps.beginEdit(model);
    });
  
    and('The simple editable model is made dirty', () => {
      modelSteps.makeDirty(model);
    });
  
    then('The simple editable model is marked as dirty', () => {
      modelSteps.assertModelIsDirty(model);
    });
  });

  test('Setting property to invalid value to a valid simple editable model results in model which is marked as dirty', ({
    when,
    and,
    then
  }) => {
    when('The simple editable model is created with valid name', () => {
      model = modelSteps.createValidSimpleEditableModel();
    });
  
    and('The editing is started for the simple editable model', () => {
      modelSteps.beginEdit(model);
    });
  
    and('The simple editable model is updated with invalid value for property', () => {
      modelSteps.updateName(model, DataGenerator.InvalidName);
    });
  
    then('The simple editable model is marked as dirty', () => {
      modelSteps.assertModelIsDirty(model);
    });
  });
})

