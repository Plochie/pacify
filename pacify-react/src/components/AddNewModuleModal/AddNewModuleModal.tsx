import { DownOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/react-hooks';
import { Button, Checkbox, Dropdown, Form, Input, Menu, message, Modal } from 'antd';
import gql from 'graphql-tag';
import React from 'react';

const ADD_MODULE = gql`
	mutation addModule($sid: String!, $name: String!, $width: Float!, $height: Float!, $icon: String) {
		addModule(sid: $sid, name: $name, width: $width, height: $height, icon: $icon) {
			id
			sid
		}
	}
`;

const layout = {
	// labelCol: { span: 4 },
	// wrapperCol: { span: 16 },
};
const tailLayout = {
	// wrapperCol: { offset: 8, span: 16 },
};

const onClick = ({ key }: { key: any }) => {
	message.info(`Click on item ${key}`);
};

const menu = (
	<Menu onClick={onClick}>
		<Menu.Item key="1">1st menu item</Menu.Item>
		<Menu.Item key="2">2nd memu item</Menu.Item>
		<Menu.Item key="3">3rd menu item</Menu.Item>
	</Menu>
);

interface AddNewModuleModalProps {
	isVisible: boolean;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddNewModuleModal(props: AddNewModuleModalProps) {
	const [addModule] = useMutation(ADD_MODULE);

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
					<Dropdown overlay={menu}>
						<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
							Hover me, Click menu item <DownOutlined />
						</a>
					</Dropdown>

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
