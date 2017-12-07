import { IModel } from './../model';
import { ObjectViewModel } from './objectViewModel';
export declare class WrappingCollection extends Array {
    factoryMethod: (item: IModel<any> | any) => ObjectViewModel<IModel<any>> | any | null | undefined;
    private _bindingEngine;
    private _source;
    private _internalMap;
    private _selectedItems;
    constructor(factoryMethod?: (item: IModel<any>) => ObjectViewModel<IModel<any>>, source?: Array<any>);
    getSelectedItems: () => any[];
    canSelectAll: () => boolean;
    selectAll: () => void;
    canUnselectAll: () => boolean;
    unselectAll: () => void;
    private pushCore;
    private containsWrapper;
    private addCore;
    private removeCore;
    private onSubscribe;
    private clbk(changes);
    private static createWrapper(item, factoryMethod);
}
