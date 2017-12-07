Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ViewModelCreatorService = (function () {
    function ViewModelCreatorService() {
    }
    ViewModelCreatorService.prototype.create = function (type) {
        return aurelia_framework_1.Container.instance.get(type);
    };
    return ViewModelCreatorService;
}());
exports.ViewModelCreatorService = ViewModelCreatorService;
