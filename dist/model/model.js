define(["require", "exports"], function (require, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var Model = (function () {
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
    exports.Model = Model;
    function isUndefined(obj) {
        return (typeof obj) === 'undefined';
    }
    exports.isUndefined = isUndefined;
    function isString(obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    }
    exports.isString = isString;
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    exports.has = function (obj, prop) {
        return _hasOwnProperty.call(obj, prop);
    };
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
                if (exports.has(item, prop)) {
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
    exports.makeString = makeString;
});
//# sourceMappingURL=model.js.map