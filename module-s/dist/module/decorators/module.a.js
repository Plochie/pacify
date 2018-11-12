"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Module(params) {
    return function (target) {
        target.prototype.m_name = params.name;
        target.prototype.m_id = params.id;
    };
}
exports.Module = Module;
var ModuleParams = /** @class */ (function () {
    function ModuleParams() {
    }
    return ModuleParams;
}());
