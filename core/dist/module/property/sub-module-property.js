"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SubModuleProperty = /** @class */ (function () {
    function SubModuleProperty(displayName, id, type, isExternalValueAllowed, defaultValue, values) {
        this.displayName = displayName;
        this.id = id;
        this.type = type;
        this.defaultValue = defaultValue;
        this.values = values;
        this.value = defaultValue;
        this.isExternalValueAllowed = isExternalValueAllowed;
        this.isExternalValueAssigned = false;
        this.externalValue = '';
    }
    return SubModuleProperty;
}());
exports.SubModuleProperty = SubModuleProperty;
