var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var core_1 = require("../core");
var WrappingCollection = (function (_super) {
    __extends(WrappingCollection, _super);
    function WrappingCollection(factoryMethod, source) {
        var _this = _super.call(this) || this;
        _this._bindingEngine = core_1.getDefaultBindingEngine();
        _this._internalMap = new WeakMap();
        _this._selectedItems = [];
        _this.getSelectedItems = function () {
            return _this.filter(function (item) { return item.isSelected; });
        };
        _this.canSelectAll = function () {
            return _this.length > _this.getSelectedItems().length;
        };
        _this.selectAll = function () {
            _this.forEach(function (item) { return item.isSelected = true; });
        };
        _this.canUnselectAll = function () {
            return _this.getSelectedItems().length > 0;
        };
        _this.unselectAll = function () {
            _this.forEach(function (item) { return item.isSelected = false; });
        };
        _this.pushCore = function (model, wrapped) {
            _this._internalMap.set(model, wrapped);
            _this.push(wrapped);
        };
        _this.containsWrapper = function (model) {
            return _this._internalMap.has(model);
        };
        _this.addCore = function (modelItem, wrappedItem, indexOfModelItem) {
            if (_this.containsWrapper(modelItem)) {
                throw new Error('The duplications are not allowed for the model items.');
            }
            _this._internalMap.set(modelItem, wrappedItem);
            _this.splice(indexOfModelItem, 0, wrappedItem);
        };
        _this.removeCore = function (index, removedItem) {
            _this._internalMap.delete(removedItem);
            _this.splice(index, 1);
        };
        _this.onSubscribe = function (changes) {
            if (changes.length === 0) {
                return;
            }
            var innerChanges = changes[0];
            if (innerChanges.addedCount === 1) {
                _this.addCore(_this._source[innerChanges.index], WrappingCollection_1.createWrapper(_this._source[innerChanges.index], _this.factoryMethod), innerChanges.index);
            }
            else if (innerChanges.addedCount > 1) {
                for (var i = 0; i < innerChanges.addedCount; i++) {
                    _this.addCore(_this._source[innerChanges.index + i], WrappingCollection_1.createWrapper(_this._source[innerChanges.index + i], _this.factoryMethod), innerChanges.index + i);
                }
            }
            else if (innerChanges.removed.length === 1) {
                _this.removeCore(innerChanges.index, innerChanges.removed[0]);
            }
            else if (innerChanges.removed.length > 1) {
                innerChanges.removed.forEach(function (originalItem) {
                    var index = _this.findIndex(function (item) { return item.model === originalItem; });
                    _this.removeCore(index, originalItem);
                });
            }
        };
        _this._bindingEngine = core_1.getDefaultBindingEngine();
        if (factoryMethod === null || factoryMethod === undefined) {
            factoryMethod = function (item) { return item; };
        }
        _this.factoryMethod = factoryMethod;
        if (source === null || source === undefined) {
            _this._source = new Array();
        }
        else {
            _this._source = source;
        }
        core_1.getDefaultObserverLocator()
            .getArrayObserver(_this._source)
            .subscribe('clbk', _this.onSubscribe);
        for (var _i = 0, _a = _this._source; _i < _a.length; _i++) {
            var item = _a[_i];
            _this.pushCore(item, WrappingCollection_1.createWrapper(item, _this.factoryMethod));
        }
        return _this;
    }
    WrappingCollection_1 = WrappingCollection;
    WrappingCollection.prototype.clbk = function (changes) {
        console.log('CHANGES 2:  ' + typeof changes);
    };
    WrappingCollection.createWrapper = function (item, factoryMethod) {
        return factoryMethod(item);
    };
    WrappingCollection = WrappingCollection_1 = __decorate([
        aurelia_framework_1.transient(),
        __metadata("design:paramtypes", [Function, Array])
    ], WrappingCollection);
    return WrappingCollection;
    var WrappingCollection_1;
}(Array));
exports.WrappingCollection = WrappingCollection;
