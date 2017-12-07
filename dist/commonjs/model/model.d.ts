import { ValidationRules, Rule } from 'aurelia-validation';
export interface IModel<T> {
    id: T;
    validationRules: ValidationRules;
    rules: Rule<{}, any>[][];
}
export declare class Model<T> implements IModel<T> {
    id: T;
    private _validationRules;
    private _rules;
    validationRules: ValidationRules;
    rules: Rule<{}, any>[][];
    toString(): string;
}
export declare function isUndefined(obj: any): boolean;
export declare function isString(obj: any): boolean;
export declare const has: (obj: any, prop: any) => any;
export declare function makeString<T>(item: T, join?: string): string;
