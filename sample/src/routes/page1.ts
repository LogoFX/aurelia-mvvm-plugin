import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';


@autoinject
export class Page1 {
    public title: string;
    public subtitle: string;

    constructor(public router: Router) {
        // todo
    }

    // protected bind(bindingContext: Object, overrideContext: Object) {
    //   this.title
    // }

    public canActivate(a, b, c) {
        this.title = b.title;
        this.subtitle = b.subtitle;
    }

}
