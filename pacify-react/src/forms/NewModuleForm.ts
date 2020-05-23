import { PacifyFormData } from 'src/components/DynamicForm';

export const NewModuleFormData: PacifyFormData = {
	name: 'module',
	size: 'small',
	submitName: 'Submit',
	resetName: 'Reset',
	formItems: [
		{
			name: '_category_dropdown',
			type: 'custom',
		},
		{
			label: 'Title',
			name: 'title',
			rules: [{ required: true }],
		},
		{
			label: 'Short ID',
			name: 'sid',
			rules: [{ required: true }],
		},
		{
			label: 'Width',
			name: 'width',
			rules: [{ required: true }],
			type: 'numeric',
		},
		{
			label: 'Height',
			name: 'height',
			rules: [{ required: true }],
			type: 'numeric',
		},
		{
			label: 'Icon',
			name: 'icon',
			rules: [{ required: false }],
		},
	],
};
