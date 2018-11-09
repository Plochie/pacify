export class InReference {

    public displayName: string;
    public id: string;
    public defaultValue?: any;
    public value: any;
    public referenceModuleId: string;
    public referenceSubModuleId: string;

    constructor(displayName: string, id: string, referenceModuleId: string, referenceSubModuleId: string,
        defaultValue?: any, value?: any) {
        
            this.displayName = displayName;
        this.id = id;
        this.referenceModuleId = referenceModuleId;
        this.referenceSubModuleId = referenceSubModuleId;
        this.defaultValue = defaultValue;
        this.value = value;
    }

}