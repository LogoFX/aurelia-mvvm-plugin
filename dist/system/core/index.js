System.register(["aurelia-binding", "aurelia-framework"], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    function getDefaultBindingEngine() {
        return aurelia_framework_1.Container.instance.get(aurelia_framework_1.BindingEngine);
    }
    exports_1("getDefaultBindingEngine", getDefaultBindingEngine);
    function getDefaultObserverLocator() {
        return aurelia_framework_1.Container.instance.get(aurelia_binding_1.ObserverLocator);
    }
    exports_1("getDefaultObserverLocator", getDefaultObserverLocator);
    var aurelia_binding_1, aurelia_framework_1;
    return {
        setters: [
            function (aurelia_binding_1_1) {
                aurelia_binding_1 = aurelia_binding_1_1;
            },
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }
        ],
        execute: function () {
        }
    };
});
