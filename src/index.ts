import { Aurelia, FrameworkConfiguration } from 'aurelia-framework';

// export * from './hello-world';

export * from './core';
export * from './model';
export * from './view-model';

export function configure(config: FrameworkConfiguration) {
  config.globalResources('./hello-world');

  const aurelia = config.container.get(Aurelia);

  aurelia.use.plugin('aurelia-validation');
}
