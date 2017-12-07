import { IViewModelCreatorService, ViewModelCreatorService } from '@logofx/aurelia-mvvm-plugin';
import { autoinject } from 'aurelia-dependency-injection';
import { IDataService, DataService } from './../../model';
import { Persons } from './persons';

@autoinject()
export class Index {

  private _persons: Persons;

  constructor(private _dataService: DataService,
              private _viewModelCreatorService: ViewModelCreatorService) {

    this._persons = this._viewModelCreatorService.create<Persons>(Persons);
  }

  public get persons(): Persons {
    return this._persons;
  }

}
