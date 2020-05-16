import { useMutation } from '@apollo/react-hooks';
import { Button, Form, Input, message, Modal } from 'antd';
import gql from 'graphql-tag';
import React from 'react';

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
		addCategory({ variables: values })
			.then(res => {
				message.success('Category added successfully');
				form.resetFields();
			})
			.catch(err => {
				console.error(err);
			});

		console.log('Success:', values);
	};

	const onSubmitFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<div>
			<Modal visible={props.isVisible} title="Add New Category" onOk={handleOk} onCancel={handleCancel}>
				<Form {...layout} name="catetgory" form={form} onFinish={onSubmit} onFinishFailed={onSubmitFailed}>
					<Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter name of category' }]}>
						<Input />
					</Form.Item>

					<Form.Item
						label="Short ID"
						name="sid"
						rules={[
							{ required: true, message: 'Please enter Short ID for cateogry' },
							{ len: 5, message: 'Length of Short ID should be exactly 5' },
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item label="Description" name="desc" rules={[{ required: false }]}>
						<Input />
					</Form.Item>

					<Form.Item {...tailLayout}>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}

export default AddNewCategoryModal;
