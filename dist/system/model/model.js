System.register([], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    function isUndefined(obj) {
        return (typeof obj) === 'undefined';
    }
    exports_1("isUndefined", isUndefined);
    function isString(obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    }
    exports_1("isString", isString);
    function makeString(item, join) {
        if (join === void 0) { join = ','; }
        if (item === null) {
            return 'COLLECTION_NULL';
        }
        else if (isUndefined(item)) {
            return 'COLLECTION_UNDEFINED';
        }
        else if (isString(item)) {
            return item.toString();
        }
        else {
            var toret = '{';
            var first = true;
            for (var prop in item) {
                if (has(item, prop)) {
                    if (first) {
                        first = false;
                    }
                    else {
                        toret = toret + join;
                    }
                    toret = toret + prop + ':' + item[prop];
                }
            }
            return toret + '}';
        }
    }
    exports_1("makeString", makeString);
    var Model, _hasOwnProperty, has;
    return {
        setters: [],
        execute: function () {
            Model = (function () {
                function Model() {
                }
                Object.defineProperty(Model.prototype, "validationRules", {
                    get: function () {
                        return this._validationRules;
                    },
                    set: function (value) {
                        if (value === this._validationRules) {
                            return;
                        }
                        this._validationRules = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Model.prototype, "rules", {
                    get: function () {
                        return this._rules;
                    },
                    set: function (value) {
                        if (value === this._rules) {
                            return;
                        }
                        this._rules = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Model.prototype.toString = function () {
                    return makeString(this);
                };
                return Model;
            }());
            exports_1("Model", Model);
            _hasOwnProperty = Object.prototype.hasOwnProperty;
            exports_1("has", has = function (obj, prop) {
                return _hasOwnProperty.call(obj, prop);
            });
        }
    };
});
