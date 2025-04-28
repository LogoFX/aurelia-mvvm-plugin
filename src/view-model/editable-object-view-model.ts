import { computedFrom } from 'aurelia-binding';
import { IEditableModel } from '../model/model';
import { ObjectViewModel } from './object-view-model';

/**
 * EditableObjectViewModel
 */
export abstract class EditableObjectViewModel<T extends IEditableModel<unknown>> extends ObjectViewModel<T> {

  constructor(model: T) {
    super(model);
  }

  public canCancelChanges = false;

  private _isEditing = false;
  @computedFrom("_isEditing")
  public get isEditing() {
    return this._isEditing;
  }
  private set isEditing(value: boolean) {
    this._isEditing = value;
  }

  public beginEdit(): void {
    this.model.beginEdit();
    this.isEditing = true;
  }

  public cancelEdit(): void {
    //this.copyModel(this.originalModel);
    //this.discard(this.model);
    this.model.cancelEdit();
    this.isEditing = false;
  }

  public async endEdit(): Promise<boolean> {
    const validation = await this.validationController.validate();
    if (validation.valid) {
      await this.save(this.model);
      this.model.commitEdit();
      await this.afterSave(this.model);
      this.isEditing = false;
      return true;
    } else {
      await this.showError(new Error(validation.results.toString()));
      return false;
    }
  }

  protected abstract save(model: T): Promise<void>;

  protected abstract afterSave(model: T): Promise<void>;

  protected abstract discard(model: T): Promise<void>;

  protected abstract showError(error: unknown): Promise<void>;
}
