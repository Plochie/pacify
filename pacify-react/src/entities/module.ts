export interface PacifyModule {
	id: number;
	title: string;
	sid: string;
	width: number;
	height: number;
	isStarter: boolean;
	isShared: boolean;
	icon?: string;
	inputs?: PacifyModuleInput[];
	outputs?: PacifyModuleOutput[];
}

export interface PacifyModuleInput {
	sid: string;
	title: string;
}

export interface PacifyModuleOutput {
	sid: string;
	title: string;
}
