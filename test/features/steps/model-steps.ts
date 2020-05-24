import { DataGenerator } from './../../helpers/DataGenerator';
import { ICanBeDirty, IEditableObject } from './../../../src';
import { SimpleEditableModel } from './../objects/simple-editable-model';

export class ModelSteps {
  
  createValidSimpleEditableModel() : SimpleEditableModel {
    return new SimpleEditableModel(DataGenerator.ValidName);
  }

  makeDirty(model: ICanBeDirty) {
    model.makeDirty();
  }

  beginEdit(model: IEditableObject) {
    model.beginEdit();
  }

  updateName(model : SimpleEditableModel, value: string) {
    model.name = value;
  }

  assertModelIsNotDirty(model: ICanBeDirty) {
    expect(model.isDirty).toBe(false);
  }

  assertModelIsDirty(model: ICanBeDirty) {
    expect(model.isDirty).toBe(true);
  }  

}
