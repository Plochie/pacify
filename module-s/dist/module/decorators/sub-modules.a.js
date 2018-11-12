"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function SubModules(modules) {
    return function (target) {
        target.prototype.subModules = [];
        modules.forEach(function (module) {
            target.prototype.subModules.push(new module());
        });
    };
}
exports.SubModules = SubModules;
