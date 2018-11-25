import { SubModuleProperty } from './module/property/sub-module-property';
export * from './module/index';
export declare const PACIFY_ENV: {
    MOD_SUBMOD_SEPARATOR: string;
    SUBMOD_CNT_SEPARATOR: string;
    INPUT_SEPARATOR: string;
    OUTPUT_SEPARATOR: string;
    PATH_SEPARAOR: string;
    CUSTOM_MODULE_NAME: string;
    CUSTOM_SUBMODULE_NAME: string;
};
export declare const Matcher: {
    START_NODE: RegExp;
    CONNECTION: RegExp;
    END_NODE: RegExp;
    SUB_MODULE: RegExp;
    ID_SPLIT: RegExp;
};
export declare class PPath {
    graphId: string;
    fromIDInfo: IDInfo;
    toIDInfo: IDInfo;
    subModuleProperty: SubModuleProperty[];
}
export declare class IDInfo {
    id: string;
    moduleId: string;
    subModuleId: string;
    nodeCounter: number;
    constructor(moduleId: string, subModuleId: string, nodeCounter?: number, id?: string);
    getId(): string;
    getDirId(): string;
}
export declare class SubModuleConfig {
    subModuleId: string;
    moduleId: string;
    name: string;
    uiInputs: UiInput[];
    uiOutputs: UiOutput[];
    icon: string;
    width: number;
    height: number;
    canBeReferenced: boolean;
    backgroundColor: string;
    textColor: string;
}
export declare class UiInput {
    id: string;
    value: string;
}
export declare class UiOutput {
    id: string;
    value: string;
}
export declare class ProjectConfiguration {
    externalConfig: string;
}
export declare enum ElementType {
    GROUP = 1,
    CONNECTION = 2
}
