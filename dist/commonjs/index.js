"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_pal_1 = require("aurelia-pal");
function configure(config) {
    config.globalResources([
        aurelia_pal_1.PLATFORM.moduleName('./elements/hello-world')
    ]);
}
exports.configure = configure;

//# sourceMappingURL=index.js.map
