import { IObjectViewModel } from '../view-model/object-view-model';
import { DialogController } from 'aurelia-dialog';
/**
 * Represents the Dialog View
 */
export class Dialog {

  private viewModel: IObjectViewModel<any>;

  constructor(dialogController: DialogController) { }

  protected activate(viewModel: IObjectViewModel<any>): void {
    this.viewModel = viewModel;
  }
}
