"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function PacifyModules(modules) {
    return function (target) {
        target.prototype.modules = [];
        modules.forEach(function (module) {
            target.prototype.modules.push(new module());
        });
    };
}
exports.PacifyModules = PacifyModules;
