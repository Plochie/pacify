import { PacifyFormData } from 'src/components/DynamicForm';

export const NewProjectFormData: PacifyFormData = {
	name: 'new_project',
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
					label: 'Description',
					name: 'desc',
					rules: [{ required: false }],
					type: 'string',
				},
			],
		},
		{
			items: [
				{
					label: 'Location',
					name: 'path',
					rules: [{ required: true }],
					type: 'string',
				},
			],
		},
	],
};
