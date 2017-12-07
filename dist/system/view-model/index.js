System.register(["./objectViewModel", "./ViewModelCreatorService", "./WrappingCollection"], function (exports_1, context_1) {
    var __moduleName = context_1 && context_1.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (objectViewModel_1_1) {
                exportStar_1(objectViewModel_1_1);
            },
            function (ViewModelCreatorService_1_1) {
                exportStar_1(ViewModelCreatorService_1_1);
            },
            function (WrappingCollection_1_1) {
                exportStar_1(WrappingCollection_1_1);
            }
        ],
        execute: function () {
        }
    };
});
