define(["require", "exports", "aurelia-framework"], function (require, exports, aurelia_framework_1) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var ViewModelCreatorService = (function () {
        function ViewModelCreatorService() {
        }
        ViewModelCreatorService.prototype.create = function (type) {
            return aurelia_framework_1.Container.instance.get(type);
        };
        return ViewModelCreatorService;
    }());
    exports.ViewModelCreatorService = ViewModelCreatorService;
});
//# sourceMappingURL=ViewModelCreatorService.js.map