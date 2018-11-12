import { SubModuleProperty } from './property/sub-module-property';
import { InReference } from './reference/in-reference';
export * from './property/property-value-type';
export * from './property/sub-module-property';
export * from './module-id';
export * from './module.data';
export * from './sub-module-data';
export * from './reference/in-reference';
export interface IAction {
    action(): void;
}
export interface IProperties {
    properties(): SubModuleProperty[];
}
export interface IInReferences {
    inReferences(): InReference[];
}
