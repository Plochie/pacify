import { IDInfo } from './../../index';
export declare class InReference {
    displayName: string;
    id: string;
    defaultValue?: any;
    value: any;
    whoToReferenceIDInfo: IDInfo;
    referencedIDInfo: IDInfo;
    constructor(displayName: string, id: string, whoToReferenceIDInfo: IDInfo, defaultValue?: any, value?: any);
}
