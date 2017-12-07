System.register(["./model"], function (exports_1, context_1) {
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
            function (model_1_1) {
                exportStar_1(model_1_1);
            }
        ],
        execute: function () {
        }
    };
});
