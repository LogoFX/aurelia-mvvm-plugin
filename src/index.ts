/** 
 * The LogoFx module.
 * 
 * @moduledefinition LogoFX
*/

import * as __utils__ from './utils';

export { __utils__ as utils };
export * from './model/model';
export * from './core';
export * from './view-model';
export * from './ui-services';

/**
 * Checks if the given argument is undefined.
 *
 * @module LogoFX
 */
export function isUndefined(obj: any): boolean {
  return (typeof obj) === 'undefined';
}

/**
 * Checks if the given argument is a string.
 *
 * @module LogoFX
 */
export function isString(obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object String]';
}

const _hasOwnProperty = Object.prototype.hasOwnProperty;
export const has = (obj: any, prop: any) => {
  return _hasOwnProperty.call(obj, prop);
};

export function makeString<T>(item: T, join: string = ','): string {
  if (item === null) {
      return 'COLLECTION_NULL';
  } else if (isUndefined(item)) {
      return 'COLLECTION_UNDEFINED';
  } else if (isString(item)) {
      return item.toString();
  } else {
      let toret = '{';
      let first = true;
      for (const prop in item) {
          if (has(item, prop)) {
              if (first) {
                  first = false;
              } else {
                  toret = toret + join;
              }
              toret = `${toret} ${prop}: ${(<any>item)[prop]}`;
          }
      }
      return `${toret}` + '}';
  }
}