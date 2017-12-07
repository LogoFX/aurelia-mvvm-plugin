function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
__export(require("./core"));
__export(require("./model"));
__export(require("./view-model"));
function configure(config) {
    config.globalResources('./hello-world');
    var aurelia = config.container.get(aurelia_framework_1.Aurelia);
    aurelia.use.plugin('aurelia-validation');
}
exports.configure = configure;
