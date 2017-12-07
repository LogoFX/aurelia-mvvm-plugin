System.register(["aurelia-framework"], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, ViewModelCreatorService;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }
        ],
        execute: function () {
            ViewModelCreatorService = (function () {
                function ViewModelCreatorService() {
                }
                ViewModelCreatorService.prototype.create = function (type) {
                    return aurelia_framework_1.Container.instance.get(type);
                };
                return ViewModelCreatorService;
            }());
            exports_1("ViewModelCreatorService", ViewModelCreatorService);
        }
    };
});
