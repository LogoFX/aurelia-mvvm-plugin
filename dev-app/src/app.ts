import { arrays } from '@logofx/aurelia-mvvm-plugin';


export class App {

  private ar: number[] = [1,2,3];
 
  public message: string = arrays.indexOf(this.ar, 4).toString();


}
