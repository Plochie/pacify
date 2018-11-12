"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./module/index"));
exports.PACIFY_ENV = {
    MOD_SUBMOD_SEPARATOR: '&',
    SUBMOD_CNT_SEPARATOR: '*',
    INPUT_SEPARATOR: '[',
    OUTPUT_SEPARATOR: ']',
    PATH_SEPARAOR: '~',
    CUSTOM_MODULE_NAME: 'pac',
    CUSTOM_SUBMODULE_NAME: 'sub'
};
exports.Matcher = {
    START_NODE: new RegExp('flow\\' + exports.PACIFY_ENV.MOD_SUBMOD_SEPARATOR + 'start\\' + exports.PACIFY_ENV.SUBMOD_CNT_SEPARATOR + '\\d+\\' + exports.PACIFY_ENV.OUTPUT_SEPARATOR + '\\w+'),
    CONNECTION: new RegExp('\\w+' + exports.PACIFY_ENV.MOD_SUBMOD_SEPARATOR + '\\w+\\' + exports.PACIFY_ENV.SUBMOD_CNT_SEPARATOR + '\\d+(\\' + exports.PACIFY_ENV.INPUT_SEPARATOR + '|\\' + exports.PACIFY_ENV.OUTPUT_SEPARATOR + ')\\w+'),
    END_NODE: new RegExp('flow\\' + exports.PACIFY_ENV.MOD_SUBMOD_SEPARATOR + 'end\\' + exports.PACIFY_ENV.SUBMOD_CNT_SEPARATOR + '\\d+\\' + exports.PACIFY_ENV.INPUT_SEPARATOR + '\\w+'),
    SUB_MODULE: new RegExp('^\\w+\\' + exports.PACIFY_ENV.MOD_SUBMOD_SEPARATOR + '\\w+\\' + exports.PACIFY_ENV.SUBMOD_CNT_SEPARATOR + '\\d+$'),
    ID_SPLIT: new RegExp('[\\' + exports.PACIFY_ENV.MOD_SUBMOD_SEPARATOR + '\\' + exports.PACIFY_ENV.SUBMOD_CNT_SEPARATOR + '\\' + exports.PACIFY_ENV.INPUT_SEPARATOR + '\\' + exports.PACIFY_ENV.OUTPUT_SEPARATOR + ']+')
};
var PPath = /** @class */ (function () {
    function PPath() {
    }
    return PPath;
}());
exports.PPath = PPath;
var IDInfo = /** @class */ (function () {
    function IDInfo(moduleId, subModuleId, nodeCounter, id) {
        this.moduleId = moduleId;
        this.subModuleId = subModuleId;
        if (nodeCounter !== undefined && nodeCounter !== null) {
            this.nodeCounter = nodeCounter;
        }
        if (id !== undefined && id !== null) {
            this.id = id;
        }
    }
    IDInfo.prototype.getId = function () {
        if (this.id === undefined) {
            return this.moduleId + exports.PACIFY_ENV.MOD_SUBMOD_SEPARATOR + this.subModuleId + exports.PACIFY_ENV.SUBMOD_CNT_SEPARATOR + this.nodeCounter;
        }
        return this.moduleId + exports.PACIFY_ENV.MOD_SUBMOD_SEPARATOR + this.subModuleId + exports.PACIFY_ENV.SUBMOD_CNT_SEPARATOR + this.nodeCounter + '!' + this.id;
    };
    return IDInfo;
}());
exports.IDInfo = IDInfo;
var SubModuleConfig = /** @class */ (function () {
    function SubModuleConfig() {
    }
    return SubModuleConfig;
}());
exports.SubModuleConfig = SubModuleConfig;
var UiInput = /** @class */ (function () {
    function UiInput() {
    }
    return UiInput;
}());
exports.UiInput = UiInput;
var UiOutput = /** @class */ (function () {
    function UiOutput() {
    }
    return UiOutput;
}());
exports.UiOutput = UiOutput;
var ProjectConfiguration = /** @class */ (function () {
    function ProjectConfiguration() {
    }
    return ProjectConfiguration;
}());
exports.ProjectConfiguration = ProjectConfiguration;
var ElementType;
(function (ElementType) {
    ElementType[ElementType["GROUP"] = 1] = "GROUP";
    ElementType[ElementType["CONNECTION"] = 2] = "CONNECTION";
})(ElementType = exports.ElementType || (exports.ElementType = {}));
