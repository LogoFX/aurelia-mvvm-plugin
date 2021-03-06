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

  // tslint:disable: no-parameter-properties
  constructor(private readonly dialogService: DialogService) {}

  public async show(viewModel: IObjectViewModel<any>): Promise<DialogCloseResult> {
    // tslint:disable: no-floating-promises

    return new Promise((resolve: (value?: DialogCloseResult | PromiseLike<DialogCloseResult>) => void): void => {
        this.dialogService.open({
                viewModel: Dialog,
                model: viewModel
              })
              .whenClosed((response: any): void => {
                resolve(response);
            });
    });
  }
}
