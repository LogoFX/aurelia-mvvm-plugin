System.register(["aurelia-framework", "aurelia-validation"], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    var aurelia_framework_1, aurelia_validation_1, ObjectViewModel;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (aurelia_validation_1_1) {
                aurelia_validation_1 = aurelia_validation_1_1;
            }
        ],
        execute: function () {
            ObjectViewModel = (function () {
                function ObjectViewModel(model) {
                    this._isSelected = false;
                    this._isEnabled = true;
                    this._model = model;
                    var controllerFactory = aurelia_framework_1.Container.instance.get(aurelia_validation_1.ValidationControllerFactory);
                    this.controller = controllerFactory.createForCurrentScope();
                }
                Object.defineProperty(ObjectViewModel.prototype, "model", {
                    get: function () {
                        return this._model;
                    },
                    set: function (value) {
                        this._model = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ObjectViewModel.prototype, "isSelected", {
                    get: function () {
                        return this._isSelected;
                    },
                    set: function (value) {
                        if (this._isSelected === value) {
                            return;
                        }
                        this._isSelected = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ObjectViewModel.prototype, "isEnabled", {
                    get: function () {
                        return this._isEnabled;
                    },
                    set: function (value) {
                        if (this._isEnabled === value) {
                            return;
                        }
                        this._isEnabled = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return ObjectViewModel;
            }());
            exports_1("ObjectViewModel", ObjectViewModel);
        }
    };
});
