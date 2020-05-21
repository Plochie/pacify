import { PacifyFormData } from 'src/components/DynamicForm';

export const NewCategoryFormData: PacifyFormData = {
	name: 'category',
	size: 'small',
	submitName: 'Submit',
	formItems: [
		{
			label: 'Name',
			name: 'name',
			rules: [{ required: true, message: 'Please enter name of category' }],
		},
		{
			label: 'Short ID',
			name: 'sid',
			rules: [
				{ required: true, message: 'Please enter Short ID for cateogry' },
				{ len: 5, message: 'Length of Short ID should be exactly 5' },
			],
		},
		{
			label: 'Description',
			name: 'desc',
			rules: [{ required: false }],
		},
	],
};
