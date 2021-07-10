import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';

@autoinject
export class Home {

  constructor(private router: Router) {}

  public navigateToGitHub(): void {
    window.location.assign('https://github.com/LogoFX/aurelia-mvvm-plugin');
  }

  public navigateToRoute(route): void {
    this.router.navigateToRoute(route);
  }
}
