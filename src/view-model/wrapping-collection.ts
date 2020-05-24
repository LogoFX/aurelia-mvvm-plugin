import { transient, View } from 'aurelia-framework';
import * as Core from '../core';
import { IEditableModel, IModel } from '../model/model';
import { IObjectViewModel } from '../view-model/object-view-model';

/**
 * Represents the collection, which is automatically observing source collection and wrapping items
 * using provided factory method.
 */
@transient(WrappingCollection)
export class WrappingCollection extends Array {

    public factoryMethod: (item: IModel<any> | IEditableModel<any> | any) => IObjectViewModel<IModel<any>> | any | null | undefined;

    //private _bindingEngine: BindingEngine = Core.getDefaultBindingEngine();
    private readonly _source: any[];
    private readonly _internalMap: WeakMap<any, any> = new WeakMap();
    //private _selectedItems: any[] = [];

    constructor (factoryMethod?: (item: IModel<any>) => IObjectViewModel<IModel<any>>,
                 source?: any[]) {
        super();
        Object.setPrototypeOf(this, new.target.prototype);

        if (factoryMethod === null || factoryMethod === undefined) {
            // tslint:disable-next-line: no-parameter-reassignment
            factoryMethod = (item: any): any => item;
        }

        this.factoryMethod = factoryMethod;

        if (source === null || source === undefined) {
            this._source = [];
        } else {
            this._source = source;
        }

        Core.getDefaultObserverLocator()
            .getArrayObserver(this._source)
            .subscribe('clbk', this.onSubscribe);

        for (const item of this._source) {
            this.pushCore(item, WrappingCollection.createWrapper(item, this.factoryMethod));
        }
    }

    private static createWrapper(
      item: any,
      factoryMethod: { (item: any): any; (item: any): any; (item: any): any; (arg0: any): void }): IObjectViewModel<IModel<any>> | any {
        return factoryMethod(item);
    }

    public getSelectedItems(): any[] {
        // tslint:disable-next-line: no-unsafe-any
        return super.filter((item: any): boolean => item.isSelected);
    }

    public canSelectAll(): boolean {
        return this.length > this.getSelectedItems().length;
    }

    public selectAll (): void {
        this.forEach((item: any): boolean => item.isSelected = true);
    }

    public canUnselectAll(): boolean {
        return this.getSelectedItems().length > 0;
    }

    public unselectAll(): void {
        this.forEach((item: any): boolean => item.isSelected = false);
    }

    protected created(owningView: View, myView: View): void {
        //console.log('WrappingCollection.created called.');
    }

    protected attached(): void {
        //console.log('WrappingCollection.attached called.');
    }

    protected canActivate(params: any, routeConfig: any, navigationInstruction: any): void {
        //console.log('WrappingCollection.canActivate called.');
    }

    protected activate(params: any, routeConfig: any, navigationInstruction: any): void {
        //console.log('WrappingCollection.activate called.');
    }

    protected canDeactivate(): void {
        //console.log('WrappingCollection.canDeactivate called.');
    }

    protected deactivate(): void {
        //console.log('WrappingCollection.deactivate called.');
    }

    protected bind(bindingContext: Object, overrideContext: Object): void {
        //console.log('WrappingCollection.bimd called.');
    }

    protected unbind(): void {
        //console.log('WrappingCollection.unbiind called.');
    }

    private readonly pushCore: (model: any, wrapped: any) => void = (model: any, wrapped: any) => {
        this._internalMap.set(model, wrapped);
        this.push(wrapped);
    }

    private readonly containsWrapper: (model: any) => boolean = (model: any) => {
        return this._internalMap.has(model);
    }

    private readonly addCore: (
      modelItem: any,
      wrappedItem: any,
      indexOfModelItem: number) => void = (modelItem: any, wrappedItem: any, indexOfModelItem: number) => {

        if (this.containsWrapper(modelItem)) {
            throw new Error('The duplications are not allowed for the model items.');
        }

        this._internalMap.set(modelItem, wrappedItem);
        this.splice(indexOfModelItem, 0, wrappedItem);

    }

    private readonly removeCore: (index: number, removedItem: any) => void = (index: number, removedItem: any) => {
        this._internalMap.delete(removedItem);
        this.splice(index, 1);
    }

    private readonly onSubscribe: (changes: any) => void = (changes: any) => {
        if ((<any[]>changes).length === 0) {
                    return;
        }

        const innerChanges: any = changes[0];

        if (innerChanges.addedCount === 1) {

            this.addCore(
              this._source[innerChanges.index],
              WrappingCollection.createWrapper(
                this._source[innerChanges.index],
                this.factoryMethod),
              innerChanges.index);
        } else if (innerChanges.addedCount > 1) {
            for (let i: number = 0; i < innerChanges.addedCount; i++) {
                // tslint:disable: restrict-plus-operands
                this.addCore(
                  this._source[innerChanges.index + i],
                  WrappingCollection.createWrapper(
                    this._source[innerChanges.index + i],
                    this.factoryMethod),
                  innerChanges.index + i);
                  // tslint:enable: restrict-plus-operands
              }
        } else if (innerChanges.removed.length === 1) {
            //this.splice(innerChanges.index, 1);
            this.removeCore(innerChanges.index, innerChanges.removed[0]);
        } else if (innerChanges.removed.length > 1) {
            innerChanges.removed.forEach((originalItem: any): void => {
                const index: number = this.findIndex((item: any): boolean => { return item.model === originalItem; });
                //this.splice(index, 1);
                this.removeCore(index, originalItem);
            });
        }
    }

    private clbk(changes: any): void {
        //console.log(`CHANGES 2:  ${typeof changes}`);
    }
}
