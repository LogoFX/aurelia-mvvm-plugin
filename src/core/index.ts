
import { ObserverLocator } from 'aurelia-binding';
import { BindingEngine } from 'aurelia-framework';
import { resolve } from './resolve';

/**
 * The Core module.
 */

export * from './guid';
export * from './collections';
export * from "./resolve";

/**
 * @returns The default instance of the Binding Engine.
 */
export function getDefaultBindingEngine(): BindingEngine {
  return resolve<BindingEngine>(BindingEngine);
}

/**
 * @returns The default instance of the Observer Locator.
 */
export function getDefaultObserverLocator(): ObserverLocator {
  return resolve<ObserverLocator>(ObserverLocator);
}

declare global {
  interface StringConstructor {
    empty: string;
    isEmptyOrWhitespace(s: string): boolean;
  }
}

String.empty = ''.toString();

String.isEmptyOrWhitespace = (s: string): boolean => {
  return (s !== undefined && s !== null) && s.trim().length === 0;
};
