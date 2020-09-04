import { Form } from 'antd';
import React from 'react';
import 'src/App.scss';
import { PacifyForm } from 'src/components/DynamicForm';
import { NewProjectFormData } from 'src/forms';

export function HomePage() {
	const [form] = Form.useForm();

	const onNewProject = () => {
		console.log('New project created.');
	};

	return (
		<div>
			<PacifyForm form={form} onFinish={onNewProject} formData={NewProjectFormData} />
		</div>
	);
}
