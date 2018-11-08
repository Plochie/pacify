import { SubModuleProperty } from './module/property/sub-module-property';
export * from './module/index';

export const PACIFY_ENV = {

	MOD_SUBMOD_SEPARATOR: '&',
	SUBMOD_CNT_SEPARATOR: '*',
	INPUT_SEPARATOR: '[',
	OUTPUT_SEPARATOR: ']',
	PATH_SEPARAOR: '~',
	CUSTOM_MODULE_NAME: 'pac',
	CUSTOM_SUBMODULE_NAME: 'sub'
}

export const Matcher = {

	START_NODE: new RegExp('flow\\' + PACIFY_ENV.MOD_SUBMOD_SEPARATOR + 'start\\' + PACIFY_ENV.SUBMOD_CNT_SEPARATOR + '\\d+\\' + PACIFY_ENV.OUTPUT_SEPARATOR + '\\w+'),
	CONNECTION: new RegExp('\\w+' + PACIFY_ENV.MOD_SUBMOD_SEPARATOR + '\\w+\\' + PACIFY_ENV.SUBMOD_CNT_SEPARATOR + '\\d+(\\' + PACIFY_ENV.INPUT_SEPARATOR + '|\\' + PACIFY_ENV.OUTPUT_SEPARATOR + ')\\w+'),
	END_NODE: new RegExp('flow\\' + PACIFY_ENV.MOD_SUBMOD_SEPARATOR + 'end\\' + PACIFY_ENV.SUBMOD_CNT_SEPARATOR + '\\d+\\' + PACIFY_ENV.INPUT_SEPARATOR + '\\w+'),

	SUB_MODULE: new RegExp('^\\w+\\' + PACIFY_ENV.MOD_SUBMOD_SEPARATOR + '\\w+\\' + PACIFY_ENV.SUBMOD_CNT_SEPARATOR + '\\d+$'),
	ID_SPLIT: new RegExp('[\\' + PACIFY_ENV.MOD_SUBMOD_SEPARATOR + '\\' + PACIFY_ENV.SUBMOD_CNT_SEPARATOR + '\\' + PACIFY_ENV.INPUT_SEPARATOR + '\\' + PACIFY_ENV.OUTPUT_SEPARATOR + ']+')
}

export class PPath {
	graphId: string;
	fromIDInfo: IDInfo;
	toIDInfo: IDInfo;
	subModuleProperty: SubModuleProperty[];
}

export class IDInfo {
	id: string;
	moduleId: string;
	subModuleId: string;
	nodeCounter: number;

	constructor(moduleId: string, subModuleId: string, nodeCounter?: number, id?: string) {
		this.moduleId = moduleId;
		this.subModuleId = subModuleId;

		if (nodeCounter !== undefined && nodeCounter !== null) {
			this.nodeCounter = nodeCounter;
		}

		if (id !== undefined && id !== null) {
			this.id = id;
		}
	}

	getId(): string {
		if (this.id === undefined) {
			return this.moduleId + PACIFY_ENV.MOD_SUBMOD_SEPARATOR + this.subModuleId + PACIFY_ENV.SUBMOD_CNT_SEPARATOR + this.nodeCounter;
		}
		return this.moduleId + PACIFY_ENV.MOD_SUBMOD_SEPARATOR + this.subModuleId + PACIFY_ENV.SUBMOD_CNT_SEPARATOR + this.nodeCounter + '!' + this.id;
	}
}

export class SubModuleConfig {
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

export class UiInput {
	id: string;
	value: string;
}

export class UiOutput {
	id: string;
	value: string;
}


export enum ElementType {
	GROUP = 1,
	CONNECTION
}
