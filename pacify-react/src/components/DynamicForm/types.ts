import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { Rule } from 'antd/lib/form';

export type PacifyFormData = {
	size: SizeType;
	name: string;
	rows: PacifyFormItemRow[];
	submitName?: string;
	resetName: string;
};

export type PacifyFormItemRow = {
	items: PacifyFormItem[];
};

export type PacifyFormItem = {
	label?: string;
	name: string;
	rules?: Rule[];
	type: 'string' | 'numeric' | 'checkbox' | 'directory' | 'custom' | 'inside_form';
};
