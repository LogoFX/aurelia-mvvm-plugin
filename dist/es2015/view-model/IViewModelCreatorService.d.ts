export interface IViewModelCreatorService {
    create<T>(type: any): T;
}
