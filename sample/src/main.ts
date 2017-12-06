import { Aurelia } from 'aurelia-framework';

export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-mvvm-plugin');

  await aurelia.start();
  await aurelia.setRoot('app');
}
