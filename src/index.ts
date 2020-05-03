import {FrameworkConfiguration} from 'aurelia-framework';
import {PLATFORM} from 'aurelia-pal';

export * from './logofx';

export function configure(config: FrameworkConfiguration) {
  config.globalResources([
    PLATFORM.moduleName('./elements/hello-world'),
    PLATFORM.moduleName('./attributes/color'),
    PLATFORM.moduleName('./logofx/index')
  ]);

}
