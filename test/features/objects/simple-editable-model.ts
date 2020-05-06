import { EditableModel } from './../../../src/model/model';

export class SimpleEditableModel extends EditableModel<string> {

  public constructor (name: string) {
    super();
    this._name = name;
  }

  private _name :string;

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
