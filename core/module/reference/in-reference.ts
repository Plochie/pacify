import { IDInfo } from './../../index';

export class InReference {

    public displayName: string;
    public id: string;
    public defaultValue?: any;
    public value: any;
    // idinfo of module to which referece is allowed
    public whoToReferenceIDInfo: IDInfo;
    public referencedIDInfo: IDInfo;

    constructor(displayName: string, id: string, whoToReferenceIDInfo: IDInfo, defaultValue?: any, value?: any) {

        this.displayName = displayName;
        this.id = id;
        this.whoToReferenceIDInfo = whoToReferenceIDInfo;
        this.defaultValue = defaultValue;
        this.value = value;
    }

}