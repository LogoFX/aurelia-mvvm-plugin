define(["require", "exports", "aurelia-binding", "aurelia-framework"], function (require, exports, aurelia_binding_1, aurelia_framework_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    function getDefaultBindingEngine() {
        return aurelia_framework_1.Container.instance.get(aurelia_framework_1.BindingEngine);
    }
    exports.getDefaultBindingEngine = getDefaultBindingEngine;
    function getDefaultObserverLocator() {
        return aurelia_framework_1.Container.instance.get(aurelia_binding_1.ObserverLocator);
    }
    exports.getDefaultObserverLocator = getDefaultObserverLocator;
});
//# sourceMappingURL=index.js.map