import { DialogService, DialogCloseResult, DialogOpenPromise } from 'aurelia-dialog';
import { IObjectViewModel } from '../view-model/object-view-model';
import { Dialog } from './dialog';
import { autoinject } from 'aurelia-framework';

export interface IWindowManager {
  show(viewModel: IObjectViewModel<any>): void;
}

/**
 * Represents default Window Manager.
 */
@autoinject
export class WindowManager implements IWindowManager {

  constructor(private readonly dialogService: DialogService) { }

  public async show(viewModel: IObjectViewModel<any>): Promise<DialogCloseResult> {
    return await this.dialogService.open({
      viewModel: Dialog,
      model: viewModel
    }).whenClosed();
  }
}
