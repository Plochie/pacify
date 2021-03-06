import { useMutation } from '@apollo/react-hooks';
import { Form, message, Modal } from 'antd';
import gql from 'graphql-tag';
import React from 'react';
import { PacifyForm } from 'src/components/DynamicForm';
import { NewCategoryFormData } from 'src/forms';

const ADD_CATEGORY = gql`
	mutation addCategory($title: String!, $sid: String!, $desc: String) {
		addCategory(category: { title: $title, sid: $sid, desc: $desc }) {
			sid
		}
	}
`;

interface AddNewCategoryModalProps {
	isVisible: boolean;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddNewCategoryModal(props: AddNewCategoryModalProps) {
	const [addCategory] = useMutation(ADD_CATEGORY);
	const [form] = Form.useForm();

	const onSubmit = (values: any) => {
		addCategory({ variables: values })
			.then(res => {
				message.success('Category added successfully');
				form.resetFields();
			})
			.catch(err => {
				console.error(err);
			});
	};

	return (
		<div>
			<Modal
				visible={props.isVisible}
				title="Add New Category"
				onOk={() => props.setIsVisible(false)}
				onCancel={() => props.setIsVisible(false)}
			>
				<PacifyForm form={form} onFinish={onSubmit} formData={NewCategoryFormData} />
			</Modal>
		</div>
	);
}
