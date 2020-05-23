import { SizeType } from 'antd/lib/config-provider/SizeContext';

export type PacifyFormData = {
	size: SizeType;
	name: string;
	formItems: PacifyFormItem[];
	submitName?: string;
	resetName: string;
};

export type PacifyFormItem = {
	label?: string;
	name: string;
	rules?: any[];
	type?: 'string' | 'numeric' | 'custom';
};
