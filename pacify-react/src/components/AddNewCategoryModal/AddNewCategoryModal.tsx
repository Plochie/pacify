import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { Button, Form, Input, Modal } from 'antd';
import gql from 'graphql-tag';
import React from 'react';
import 'src/App.scss';

const ADD_CATEGORY = gql`
	mutation addCategory($name: String!, $desc: String) {
		addCategory(name: $name, desc: $desc) {
			sid
			name
		}
	}
`;

const GET_CATEGORY = gql`
	{
		categories {
			sid
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
	const [addCateogry] = useMutation(ADD_CATEGORY);
	const [getCategories, { loading, data }] = useLazyQuery(GET_CATEGORY);

	if (data) {
		console.log(data);
	}

	const handleOk = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();

		getCategories();

		props.setIsVisible(false);
	};

	const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
		props.setIsVisible(false);
	};

	const onSubmit = (values: any) => {
		addCateogry({ variables: values })
			.then(res => {
				console.log(res);
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
				<Form {...layout} name="basic" onFinish={onSubmit} onFinishFailed={onSubmitFailed}>
					<Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter name of category' }]}>
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
