System.register(["aurelia-framework", "./core", "./model", "./view-model"], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        config.globalResources('./hello-world');
        var aurelia = config.container.get(aurelia_framework_1.Aurelia);
        aurelia.use.plugin('aurelia-validation');
    }
    exports_1("configure", configure);
    var aurelia_framework_1;
    var exportedNames_1 = {
        "configure": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (core_1_1) {
                exportStar_1(core_1_1);
            },
            function (model_1_1) {
                exportStar_1(model_1_1);
            },
            function (view_model_1_1) {
                exportStar_1(view_model_1_1);
            }
        ],
        execute: function () {
        }
    };
});
