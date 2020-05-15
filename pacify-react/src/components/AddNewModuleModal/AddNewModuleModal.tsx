import { Button, Checkbox, Form, Input, Modal } from 'antd';
import React from 'react';
import 'src/App.scss';

const layout = {
	// labelCol: { span: 4 },
	// wrapperCol: { span: 16 },
};
const tailLayout = {
	// wrapperCol: { offset: 8, span: 16 },
};

interface AddNewModuleModalProps {
	isVisible: boolean;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddNewModuleModal(props: AddNewModuleModalProps) {
	const handleOk = (e: React.MouseEvent<HTMLElement>) => {
		props.setIsVisible(false);
	};

	const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
		props.setIsVisible(false);
	};

	const onFinish = (values: any) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<div>
			<Modal visible={props.isVisible} title="Add New Module" onOk={handleOk} onCancel={handleCancel}>
				<Form {...layout} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
					<Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
						<Input />
					</Form.Item>

					<Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
						<Input.Password />
					</Form.Item>

					<Form.Item {...tailLayout} name="remember" valuePropName="checked">
						<Checkbox>Remember me</Checkbox>
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

export default AddNewModuleModal;
