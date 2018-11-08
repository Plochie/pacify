import { SubModuleProperty } from './property/sub-module-property';

export * from './property/property-value-type';
export * from './property/sub-module-property';

export * from './module-id';
export * from './module.data';
export * from './sub-module-data';


export interface IAction {
    action(): void;
}

export interface IProperties {
    properties(): SubModuleProperty[];
}