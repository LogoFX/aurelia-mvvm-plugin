import {Aurelia} from 'aurelia-framework';
import * as environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';
import { UxDefaultModalConfiguration } from '@aurelia-ux/modal';
import { UxPositioningConfiguration } from '@aurelia-ux/positioning';
import icons from '@aurelia-ux/icons/sets/full-array.json';


export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'))
    .plugin(PLATFORM.moduleName('@logofx/aurelia-mvvm-plugin'))
    .plugin(PLATFORM.moduleName('aurelia-dialog'))
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/core'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/button'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/card'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/checkbox'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/chip-input'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/datepicker'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/form'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/grid'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/icons'), {icons: icons})
    .plugin(PLATFORM.moduleName('@aurelia-ux/input'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/input-info'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/list'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/modal'), (config: UxDefaultModalConfiguration) => {
      config.position = 'top';
      config.overlayDismiss = true;
    })
    .plugin(PLATFORM.moduleName('@aurelia-ux/positioning'), (config: UxPositioningConfiguration) => {
      config.offsetX = 10;
      config.offsetY = 10;
    })
    .plugin(PLATFORM.moduleName('@aurelia-ux/radio'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/select'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/slider'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/switch'))
    .plugin(PLATFORM.moduleName('@aurelia-ux/textarea'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
