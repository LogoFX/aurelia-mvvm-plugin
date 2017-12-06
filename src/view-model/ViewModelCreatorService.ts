import { IViewModelCreatorService } from './IViewModelCreatorService';
import { Container } from 'aurelia-framework';

export class ViewModelCreatorService implements IViewModelCreatorService {

    public create<T>(type: any): T {
        return <T>Container.instance.get(type);
    }
}
