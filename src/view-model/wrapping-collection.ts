import { transient, View } from 'aurelia-framework';
import * as Core from '../core';

type FactoryMethod<TModel, TWrapped> = (item: TModel) => TWrapped;

const hasIsSelected = (value: any): value is { isSelected: boolean } => {
  return "isSelected" in value && typeof value.isSelected === "boolean";
};

/**
 * Represents the collection, which is automatically observing source collection and wrapping items
 * using provided factory method.
 */
@transient()
export class WrappingCollection<TModel = any, TWrapped = any> extends Array<TWrapped> {

  private readonly _sources: TModel[][];
  private readonly _internalMap = new Map<TModel, TWrapped>();

  constructor(private readonly factoryMethod: FactoryMethod<TModel, TWrapped>, ...sources: TModel[][]) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);

    if (!Array.isArray(sources)) {
      throw new Error("WrappingCollection: 'sources' should be an array.");
    }

    this._sources = sources;

    this._sources.forEach((source, index) => {
      if (!Array.isArray(source)) {
        throw new Error(`WrappingCollection: 'sources[${index}]' should be an array.`);
      }

      Core.getDefaultObserverLocator()
        .getArrayObserver(source)
        .subscribe(source, (changeRecords: any) => this.onSubscribe(source, changeRecords));

      source.forEach(item => this.pushCore(item, this.factoryMethod(item)));
    });
  }

  public getSelectedItems(): TWrapped[] {
    return super.filter(item => hasIsSelected(item) && item.isSelected);
  }

  public canSelectAll(): boolean {
    return this.length > this.getSelectedItems().length;
  }

  public selectAll(): void {
    this.filter(hasIsSelected)
      .map(item => item as { isSelected: boolean })
      .forEach(item => item.isSelected = true);
  }

  public canUnselectAll(): boolean {
    return this.getSelectedItems().length > 0;
  }

  public unselectAll(): void {
    this.filter(hasIsSelected)
      .map(item => item as { isSelected: boolean })
      .forEach(item => item.isSelected = false);
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

  protected bind(bindingContext: object, overrideContext: object): void {
    //console.log('WrappingCollection.bimd called.');
  }

  protected unbind(): void {
    //console.log('WrappingCollection.unbiind called.');
  }

  private readonly pushCore = (model: TModel, wrapped: TWrapped) => {
    this._internalMap.set(model, wrapped);
    this.push(wrapped);
  };

  private readonly containsWrapper = (model: TModel): boolean => {
    return this._internalMap.has(model);
  };

  private readonly addCore = (modelItem: TModel, wrappedItem: TWrapped, indexOfModelItem: number) => {

    if (this.containsWrapper(modelItem)) {
      throw new Error('The duplications are not allowed for the model items.');
    }

    this._internalMap.set(modelItem, wrappedItem);
    this.splice(indexOfModelItem, 0, wrappedItem);
  };

  private readonly removeCore = (index: number, removedItem: TModel) => {
    this._internalMap.delete(removedItem);
    this.splice(index, 1);
  };

  private readonly onSubscribe = (source: TModel[], changes: any) => {
    if (!Array.isArray(changes)) {
      return;
    }

    if (changes.length === 0) {
      return;
    }

    const innerChanges = changes[0] as { index: number, removed: TModel[], addedCount: number };

    let deltaIndex = 0;
    let i = 0;
    while (this._sources[i] !== source) {
      deltaIndex += this._sources[i].length;
      i += 1;
    }

    if (innerChanges.addedCount === 1) {
      this.addCore(
        source[innerChanges.index],
        this.factoryMethod(source[innerChanges.index]),
        innerChanges.index + deltaIndex);
    } else if (innerChanges.addedCount > 1) {
      for (let i = 0; i < innerChanges.addedCount; i++) {
        this.addCore(
          source[innerChanges.index + i],
          this.factoryMethod(source[innerChanges.index + 1]),
          innerChanges.index + i + deltaIndex);
      }
    } else if (innerChanges.removed.length === 1) {
      this.removeCore(innerChanges.index + deltaIndex, innerChanges.removed[0]);
    } else if (innerChanges.removed.length > 1) {
      innerChanges.removed.forEach((originalItem: any) => {
        const index = this.findIndex((item: any) => item.model === originalItem);
        this.removeCore(index, originalItem);
      });
    }
  };
}
