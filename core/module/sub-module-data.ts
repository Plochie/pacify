import { IDInfo, SubModuleConfig } from './../index';
import { SubModuleProperty } from './property/sub-module-property';

export class SubModuleData {
    x : number;
    y: number;
    name : string;
    idInfo: IDInfo;
    graphId: string;
    conf: SubModuleConfig;
    confFile : string;
    properties: SubModuleProperty[];
}
