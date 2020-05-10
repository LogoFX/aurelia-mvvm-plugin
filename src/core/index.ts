

import { ObserverLocator } from 'aurelia-binding';
import { Container, BindingEngine } from 'aurelia-framework';

/** 
 * The Core module.
 * 
 * @moduledefinition Core
*/

export * from './guid';
export * from './collections';

/** 
 * @returns The default instance of the Binding Engine.
 * 
 * @module Core
*/
export function getDefaultBindingEngine(): BindingEngine {
    return Container.instance.get<BindingEngine>(BindingEngine);
}

/** 
 * @returns The default instance of the Observer Locator.
 * 
 * @module Core
*/
export function getDefaultObserverLocator(): ObserverLocator {
    return Container.instance.get<ObserverLocator>(ObserverLocator);
}

declare global {
  interface StringConstructor {
    empty: string;
    isEmptyOrWhitespace(s: string): boolean;
}}

String.empty = ''.toString();

String.isEmptyOrWhitespace = (s: string): boolean => {
  return (s !== undefined && s !== null) && s.trim().length === 0;
};
