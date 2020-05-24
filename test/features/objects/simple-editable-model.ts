import { EditableModel } from './../../../src/model/model';

/**
 * Represents the mock editable model useful for testing purposes.
 */
export class SimpleEditableModel extends EditableModel<string> {

  private _name: string;

  public constructor (name: string) {
    super();
    this._name = name;
  }

  public get name() : string {
    return this._name;
  }

  public set name(value: string) {
    if (value === this._name) {
      return;
    }
    this.makeDirty();
    this._name = value;
  }
}
