import { PacifyFormData } from 'src/components/DynamicForm';

export const NewModuleFormData: PacifyFormData = {
	name: 'module',
	size: 'small',
	submitName: 'Submit',
	formItems: [
		{
			name: '_category_dropdown',
			type: 'custom',
		},
		{
			label: 'Name',
			name: 'name',
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
		},
		{
			label: 'Height',
			name: 'height',
			rules: [{ required: true }],
		},
		{
			label: 'Icon',
			name: 'icon',
			rules: [{ required: false }],
		},
	],
};
