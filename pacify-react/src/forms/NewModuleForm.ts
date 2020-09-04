import { PacifyFormData } from 'src/components/DynamicForm';

export const NewModuleFormData: PacifyFormData = {
	name: 'module',
	size: 'small',
	submitName: 'Submit',
	resetName: 'Reset',
	rows: [
		{
			items: [
				{
					name: '_category_dropdown',
					type: 'custom',
				},
			],
		},

		{
			items: [
				{
					label: 'Title',
					name: 'title',
					rules: [{ required: true }],
					type: 'string',
				},
			],
		},
		{
			items: [
				{
					label: 'Short ID',
					name: 'sid',
					rules: [{ required: true }, { len: 5 }],
					type: 'string',
				},
			],
		},
		{
			items: [
				{
					label: 'Width',
					name: 'width',
					rules: [{ required: true }],
					type: 'numeric',
				},
			],
		},
		{
			items: [
				{
					label: 'Height',
					name: 'height',
					rules: [{ required: true }],
					type: 'numeric',
				},
			],
		},
		{
			items: [
				{
					label: 'Icon',
					name: 'icon',
					rules: [{ required: false }],
					type: 'string',
				},
			],
		},
		{
			items: [
				{
					label: 'Starter ?',
					name: 'isStarter',
					type: 'checkbox',
				},
			],
		},
		{
			items: [
				{
					label: 'Shared ?',
					name: 'isShared',
					type: 'checkbox',
				},
			],
		},
		{
			items: [
				{
					name: '_custom_input_form',
					type: 'inside_form',
				},
			],
		},
		{
			items: [
				{
					name: '_custom_output_form',
					type: 'inside_form',
				},
			],
		},
	],
};

export const NewModuleInputFormData: PacifyFormData = {
	name: 'inputs',
	size: 'small',
	submitName: 'Add Input',
	resetName: 'Reset',
	rows: [
		{
			items: [
				{
					label: 'Title',
					name: 'title',
					rules: [{ required: true }],
					type: 'string',
				},
				{
					label: 'Short ID',
					name: 'sid',
					rules: [{ required: true }, { len: 5 }],
					type: 'string',
				},
			],
		},
	],
};

export const NewModuleOutputFormData: PacifyFormData = {
	name: 'outputs',
	size: 'small',
	submitName: 'Add Output',
	resetName: 'Reset',
	rows: [
		{
			items: [
				{
					label: 'Title',
					name: 'title',
					rules: [{ required: true }],
					type: 'string',
				},
				{
					label: 'Short ID',
					name: 'sid',
					rules: [{ required: true }, { len: 5 }],
					type: 'string',
				},
			],
		},
	],
};
