export declare function SubModule(params: NodeMappingParam): (target: any) => void;
declare class NodeMappingParam {
    conf: string;
    isStarter: boolean;
    isGroup?: boolean;
    isShared?: boolean;
}
export {};
