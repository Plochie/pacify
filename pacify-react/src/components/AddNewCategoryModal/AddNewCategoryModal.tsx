import { useMutation } from '@apollo/react-hooks';
import { Form, Modal } from 'antd';
import gql from 'graphql-tag';
import React from 'react';
import { PacifyForm } from 'src/components/DynamicForm';
import { NewCategoryFormData } from 'src/forms';

const ADD_CATEGORY = gql`
	mutation addCategory($name: String!, $sid: String!, $desc: String) {
		addCategory(name: $name, sid: $sid, desc: $desc) {
			sid
			name
		}
	}
`;

const layout = {
	labelCol: { span: 4 },
	// wrapperCol: { span: 16 },
};
const tailLayout = {
	// wrapperCol: { offset: 8, span: 16 },
};

interface AddNewCategoryModalProps {
	isVisible: boolean;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddNewCategoryModal(props: AddNewCategoryModalProps) {
	const [addCategory] = useMutation(ADD_CATEGORY);
	const [form] = Form.useForm();

	const handleOk = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		props.setIsVisible(false);
	};

	const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
		props.setIsVisible(false);
	};

	const onSubmit = (values: any) => {
		// addCategory({ variables: values })
		// 	.then(res => {
		// 		message.success('Category added successfully');
		// 		form.resetFields();
		// 	})
		// 	.catch(err => {
		// 		console.error(err);
		// 	});

		console.log('Success:', values);
	};

	const onSubmitFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<div>
			<Modal visible={props.isVisible} title="Add New Category" onOk={handleOk} onCancel={handleCancel}>
				<PacifyForm onFinish={onSubmit} formData={NewCategoryFormData} />
			</Modal>
		</div>
	);
}

export default AddNewCategoryModal;
