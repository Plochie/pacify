import { PacifyFormData } from 'src/components/DynamicForm';

export const NewCategoryFormData: PacifyFormData = {
	name: 'category',
	size: 'small',
	submitName: 'Submit',
	resetName: 'Reset',
	rows: [
		{
			items: [
				{
					label: 'Title',
					name: 'title',
					rules: [{ required: true, message: 'Please enter name of category' }],
					type: 'string',
				},
			],
		},
		{
			items: [
				{
					label: 'Short ID',
					name: 'sid',
					rules: [
						{ required: true, message: 'Please enter Short ID for cateogry' },
						{ len: 5, message: 'Length of Short ID should be exactly 5' },
					],
					type: 'string',
				},
			],
		},
		{
			items: [
				{
					label: 'Description',
					name: 'desc',
					rules: [{ required: false }],
					type: 'string',
				},
			],
		},
	],
};
