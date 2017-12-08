import { IPerson, Person } from './person';

export interface IDataService {

  persons: Array<IPerson>;

  getPerson(id: number): Promise<IPerson> ;

  getPersons(): Promise<void> ;

  createPerson(): Promise<IPerson> ;

  updatePerson(): Promise<IPerson> ;

  deletePerson(): Promise<void> ;

}

export class DataService implements IDataService {

  public persons: IPerson[] = new Array<IPerson>();

  constructor() {
    this.persons.push(<IPerson>{
      'firstName': 'Vasya',
      'lastName': 'Petrov'
    });
    this.persons.push(<IPerson>{
      'firstName': 'David',
      'lastName': 'Kosso'
    });
    this.persons.push(<IPerson>{
      'firstName': 'John',
      'lastName': 'Doe'
    });
  }

  public getPerson(id: number): Promise<IPerson> {
    throw new Error('Method not implemented.');
  }

  public getPersons(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public createPerson(): Promise<IPerson> {
    throw new Error('Method not implemented.');
  }

  public updatePerson(): Promise<IPerson> {
    throw new Error('Method not implemented.');
  }

  public deletePerson(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
