import { IPerson } from './../../model';
import { ObjectViewModel } from '@logofx/aurelia-mvvm-plugin';

export class Person extends ObjectViewModel<IPerson> {

  constructor(model: IPerson) {
    super(model);
  }
}
