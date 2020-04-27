import {bindable} from 'aurelia-framework';

export class HelloWorld {
  @bindable public message: string = '';

  attached() {
    console.log('FUCK++');  
  }
}
