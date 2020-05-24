import { observable } from 'aurelia-binding';

// tslint:disable-next-line: typedef
// tslint:disable-next-line: export-name
export function dirtyCheck(targetOrConfig: any, key: string, descriptor?: PropertyDescriptor): void {

  //console.log('dirtyCheck =>', targetOrConfig.isDirty);
  // tslint:disable-next-line: typedef
  function makeDirty(oldValue, newValue) {
    //console.log('isDirty => ', targetOrConfig);
    if (oldValue === newValue) {
      return;
    }

    // tslint:disable-next-line: no-string-literal
    targetOrConfig['isDirty'] = true;
  }

  return observable({
                      changeHandler: 'makeDirty'
                    },
                    key, descriptor);
}
