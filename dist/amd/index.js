define(["require", "exports", "aurelia-framework", "./core", "./model", "./view-model"], function (require, exports, aurelia_framework_1, core_1, model_1, view_model_1) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(core_1);
    __export(model_1);
    __export(view_model_1);
    function configure(config) {
        config.globalResources('./hello-world');
        var aurelia = config.container.get(aurelia_framework_1.Aurelia);
        aurelia.use.plugin('aurelia-validation');
    }
    exports.configure = configure;
});
