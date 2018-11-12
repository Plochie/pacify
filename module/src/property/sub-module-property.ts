import { PropertyValueType } from './property-value-type';

export class SubModuleProperty {

    public displayName: string;
    public id: string;
    public type: PropertyValueType;
    public defaultValue?: any;
    public value: any;
    public regex: RegExp;
    public errorMsg: string;
    public values: any[];

    constructor(displayName: string, id: string, type: PropertyValueType, defaultValue?: any, values?: any[]) {

        this.displayName = displayName;
        this.id = id;
        this.type = type;
        this.defaultValue = defaultValue;
        this.values = values;

        this.value = defaultValue;
    }
}