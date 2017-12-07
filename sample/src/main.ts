import '../node_modules/font-awesome/css/font-awesome.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import { Aurelia } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
// import * as Bluebird from 'bluebird';

// Bluebird.config({ warnings: { wForgottenReturn: false } });

export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    .plugin(PLATFORM.moduleName('aurelia-mvvm-plugin'));

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('app'));
}
