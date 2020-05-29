import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { Rule } from 'antd/lib/form';

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
	rules?: Rule[];
	type?: 'string' | 'numeric' | 'custom';
};
