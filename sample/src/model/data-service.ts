import { IPerson } from './person';
export interface IDataService {

  persons: Array<IPerson>;

  createPerson(): Promise<any> ;

  updatePerson(): Promise<IPerson> ;

}
