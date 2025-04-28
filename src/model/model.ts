import { Container } from 'aurelia-dependency-injection';
import * as R from 'ramda';
import { Rule } from 'aurelia-validation';
import { getDefaultBindingEngine, makeString } from '../index';
import { Disposable } from "aurelia-binding";
import { EventAggregator } from 'aurelia-event-aggregator';

export interface IModel<T> {
  id: T;

  rules: Rule<object, any>[][];
}

export interface ICanBeDirty {

  readonly isDirty: boolean;

  makeDirty(): void;

  cleanDirty(): void;
}

function instanceOfICanBeDirty(object: any): object is ICanBeDirty {
  return (
    "isDirty" in object && typeof object.isDirty === "boolean" &&
    "makeDirty" in object && typeof object.makeDirty === "function" &&
    "cleanDirty" in object && typeof object.cleanDirty === "function"
  );
}

export interface IEditableObject {
  beginEdit(eventChannel?: string): void;

  cancelEdit(): void;

  commitEdit(): void;

  makeNotNew(): void;
}

function instanceOfIEditableObject(object: any): object is IEditableObject {
  return (
    "beginEdit" in object && typeof object.beginEdit === "function" &&
    "cancelEdit" in object && typeof object.cancelEdit === "function" &&
    "commitEdit" in object && typeof object.commitEdit === "function"
  );
}

export interface IEditableModel<T> extends IModel<T>, ICanBeDirty, IEditableObject {
  isNew: boolean;
}

/**
 * Represents the model with ID
 */
export class Model<T> implements IModel<T> {

  public id: T;

  private _rules: Rule<object, any>[][];

  public get rules(): Rule<object, any>[][] {
    return this._rules;
  }

  public set rules(value: Rule<object, any>[][]) {
    if (value === this._rules) {
      return;
    }

    this._rules = value;
  }

  public toString(): string {
    return makeString(this);
  }
}

export interface EditableModelChangedPayload<T> {
  readonly model: T;
}

/**
 * EditableModel
 */
export class EditableModel<T, TState = unknown> extends Model<T> implements IEditableModel<T> {

  private readonly eventAggregator: EventAggregator = Container.instance.get(EventAggregator);

  private _isDirty = false;
  private _isNew = false;
  private _isEditing = false;

  private readonly _disposables: Disposable[] = [];
  private _oldState?: TState;

  private _eventChannels: readonly string[] = [];

  constructor() {
    super();
  }

  public get isNew(): boolean {
    return this._isNew;
  }

  public get isDirty(): boolean {
    return this._isDirty;
  }
  private set isDirty(value: boolean) {
    if (this._isDirty === value) {
      return;
    }

    this._isDirty = value;
  }

  public get isEditing(): boolean {
    return this._isEditing;
  }
  private set isEditing(value: boolean) {
    if (this._isEditing === value) {
      return;
    }

    this._isEditing = value;
  }

  private publishIsDirtyChanged(): void {
    if (this._eventChannels.length > 0) {
      const payload: EditableModelChangedPayload<IEditableModel<T>> = {
        model: this,
      };
      this._eventChannels.forEach(channel => this.eventAggregator.publish(channel, payload));
    }
  }

  public makeDirty(): void {
    this.isDirty = this.isEditing;
    this.publishIsDirtyChanged();
  }

  public cleanDirty(): void {
    this.isDirty = false;
    this.applyToChildren(instanceOfICanBeDirty, v => v.cleanDirty());
    this.publishIsDirtyChanged();
  }

  public beginEdit(eventChannel?: string): void {
    // if (this._isEditing) {
    //   throw new Error("Model is already in editing state.");
    // }

    this.applyToChildren(instanceOfIEditableObject, v => v.beginEdit());
    this.cleanDirty();
    this.isEditing = true;
    if (R.isNotNil(eventChannel)) {
      this.pushEventChannel(eventChannel);
    }
    this.attachObservers();

    this._oldState = this.saveState();
  }

  public cancelEdit(): void {
    // if (!this._isEditing) {
    // if (!this._isEditing) {
    //   throw new Error("Model is not in editing state.");
    // }

    if (this._oldState !== undefined) {
      this.restoreState(this._oldState);
    }

    this.applyToChildren(instanceOfIEditableObject, v => v.cancelEdit());
    this.cleanDirty();
    this.isEditing = false;
    this.clearEventChannels();
    this.detachObservers();
  }

  public commitEdit(): void {
    // if (!this._isEditing) {
    //   throw new Error("Model is not in editing state.");
    // }

    this.applyToChildren(instanceOfIEditableObject, v => v.commitEdit());
    this.cleanDirty();
    this.isEditing = false;
    this.clearEventChannels();
    this.detachObservers();

    this._oldState = undefined;
  }

  protected makeNew(): void {
    this._isNew = true;
  }

  public makeNotNew(): void {
    this._isNew = false;
  }

  protected getPropertyDescriptors(): ModelPropertyDescriptor[] {
    return [];
  }

  protected saveState(): TState {
    return undefined;
  }

  protected restoreState(state: TState): void {
    // Do nothing
  }

  private pushEventChannel(eventChannel: string): void {
    if (this._eventChannels.includes(eventChannel)) {
      return;
    }

    this._eventChannels = [...this._eventChannels, eventChannel];
  }

  private clearEventChannels(): void {
    this._eventChannels = [];
  }

  private attachObservers(): void {
    this.detachObservers();

    this.getPropertyDescriptors().forEach(p => {
      this._disposables.push(...this.mapModelPropertyDescriptor(p));
    });
  }

  private detachObservers(): void {
    this._disposables.forEach(disposable => disposable.dispose());
    this._disposables.splice(0, this._disposables.length);
  }

  private mapModelPropertyDescriptor(descriptor: ModelPropertyDescriptor): Disposable[] {
    switch (descriptor.isCollection) {
      case true: return this.attachCollection(descriptor.handler());
      case false: return [this.attachProperty(descriptor.handler())];
    }
  }

  private attachProperty(value: ICanBeDirty): Disposable {
    const isDirtyUpdateFunc = (newValue: boolean, oldValue: boolean) => {
      if (!this.isDirty && newValue && newValue !== oldValue) {
        this.makeDirty();
      }
    };

    return getDefaultBindingEngine()
      .propertyObserver(value, "isDirty")
      .subscribe(isDirtyUpdateFunc);
  }

  private attachCollection(sequence: AnyCollection): Disposable[] {
    const isDirtyUpdateFunc = (newValue: boolean, oldValue: boolean) => {
      if (!this.isDirty && newValue && newValue !== oldValue) {
        this.makeDirty();
      }
    };

    return [
      ...sequence.map(x => instanceOfICanBeDirty(x) ? x : null).filter(x => x !== null).map(x => this.attachProperty(x)),
      getDefaultBindingEngine()
        .collectionObserver(sequence)
        .subscribe((changes) => {
          changes.forEach(change => {
            if (change.addedCount === 1) {
              this._disposables.push(
                getDefaultBindingEngine()
                  .expressionObserver(sequence[change.index], "isDirty")
                  .subscribe(isDirtyUpdateFunc));
              this.makeDirty();
            } else if (change.addedCount > 1) {
              sequence.forEach(group => {
                this._disposables.push(
                  getDefaultBindingEngine()
                    .expressionObserver(group, "isDirty")
                    .subscribe(isDirtyUpdateFunc));
              });
            }
            if (change.removed.length > 0) {
              this.makeDirty();
            }
          });
        })
    ];
  }

  private applyToChildren<T>(check: (v: unknown) => v is T, func: (v: T) => void): void {
    const process = (value: unknown) => {
      if (check(value)) {
        func(value);
      }
    };

    this.getPropertyDescriptors().forEach(p => {
      switch (p.isCollection) {
        case true:
          p.handler().forEach(process);
          break;
        case false:
          process(p.handler());
          break;
      }
    });
  }
}

export type AnyCollection = any[];// | Map<any, any> | Set<any>;

export type ModelPropertyDescriptor = {
  isCollection: true,
  handler: () => AnyCollection,
} | {
  isCollection: false,
  handler: () => ICanBeDirty,
}
