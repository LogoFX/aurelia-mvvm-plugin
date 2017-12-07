Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_binding_1 = require("aurelia-binding");
var aurelia_framework_1 = require("aurelia-framework");
function getDefaultBindingEngine() {
    return aurelia_framework_1.Container.instance.get(aurelia_framework_1.BindingEngine);
}
exports.getDefaultBindingEngine = getDefaultBindingEngine;
function getDefaultObserverLocator() {
    return aurelia_framework_1.Container.instance.get(aurelia_binding_1.ObserverLocator);
}
exports.getDefaultObserverLocator = getDefaultObserverLocator;
