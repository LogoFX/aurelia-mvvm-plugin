import { ValidationRules } from 'aurelia-validation';
import { IModel, Model } from './../../../src/model/model';
import { IPerson } from './person';

export interface IPerson extends IModel<number> {
  firstName: string;
  lastName: string;
}

export class Person extends Model<number> implements IPerson {

  // tslint:disable-next-line:no-inferrable-types
  public firstName: string = '';
  // tslint:disable-next-line:no-inferrable-types
  public lastName: string = '';

  constructor () {
    super();

    this.rules = ValidationRules
                  .ensure((p: Person) => p.firstName).displayName('First Name').required().withMessage('The value is mandatory')
                  .ensure((p: Person) => p.lastName).displayName('Last Name').minLength(5)
                  .ensure((p: Person) => p.lastName).maxLength(10).withMessage('Wrong input.')
    .rules;
  }
}
