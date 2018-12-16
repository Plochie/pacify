"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stackTrace = require('stack-trace');
var path = require('path');
function SubModule(params) {
    return function (target) {
        // target.prototype.name = params.name;
        // target.prototype.id = params.id;
        target.prototype.type = 'node';
        var trace = stackTrace.get();
        var dirPath = path.dirname(trace[1].getFileName());
        var confFilePath;
        if (path.isAbsolute(params.conf)) {
            confFilePath = params.conf;
        }
        else {
            confFilePath = path.join(dirPath, params.conf);
        }
        target.prototype.confFile = confFilePath;
        target.prototype.isStarter = params.isStarter;
        target.prototype.isGroup = params.isGroup;
        target.prototype.isShared = params.isShared;
    };
}
exports.SubModule = SubModule;
var NodeMappingParam = /** @class */ (function () {
    function NodeMappingParam() {
        this.isGroup = false;
        this.isShared = false;
    }
    return NodeMappingParam;
}());
