import { PropertyValueType } from './property-value-type';
export declare class SubModuleProperty {
    displayName: string;
    id: string;
    type: PropertyValueType;
    defaultValue?: any;
    isExternalValueAllowed: boolean;
    isExternalValueAssigned: boolean;
    externalValue: string;
    value: any;
    regex: RegExp;
    errorMsg: string;
    values: any[];
    constructor(displayName: string, id: string, type: PropertyValueType, isExternalValueAllowed: boolean, defaultValue?: any, values?: any[]);
}
