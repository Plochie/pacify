import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { Rule } from 'antd/lib/form';

export interface PacifyFormData {
	size: SizeType;
	name: string;
	formItems: PacifyFormItem[];
	submitName?: string;
}

export interface PacifyFormItem {
	label: string;
	name: string;
	rules?: Rule[];
}
