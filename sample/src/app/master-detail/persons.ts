import { IViewModelCreatorService, ViewModelCreatorService, IModel, ObjectViewModel, WrappingCollection } from '@logofx/aurelia-mvvm-plugin';
import { inject } from 'aurelia-framework';
import { IDataService, DataService, IPerson } from './../../model';
import { Person } from './person';

@inject(ViewModelCreatorService, DataService)
export class Persons {

  public persons: WrappingCollection;

  constructor(private _viewModelCreatorService: IViewModelCreatorService,
              private _dataService: IDataService) {

    this.persons = new WrappingCollection((item) => { return  new Person(<IPerson>item); }, _dataService.persons);
  }

}
