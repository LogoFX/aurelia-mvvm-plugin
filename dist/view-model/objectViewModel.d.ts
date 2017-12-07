import { ValidationController } from 'aurelia-validation';
import { IModel } from './../model';
export interface IObjectWrapper<T extends IModel<any>> {
    model: T;
}
export declare abstract class ObjectViewModel<T extends IModel<any>> implements IObjectWrapper<T> {
    private _model;
    private _isSelected;
    private _isEnabled;
    controller: ValidationController;
    constructor(model: T);
    model: T;
    isSelected: boolean;
    isEnabled: boolean;
}
