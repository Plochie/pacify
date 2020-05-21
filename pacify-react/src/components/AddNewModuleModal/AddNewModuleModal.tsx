import { DownOutlined } from '@ant-design/icons';
import { useLazyQuery } from '@apollo/react-hooks';
import { Dropdown, Menu, Modal } from 'antd';
import React, { MouseEvent, useEffect, useState } from 'react';
import { PacifyForm, PacifyFormCustomItem } from 'src/components/DynamicForm';
import { Category, GET_CATEGORIES } from 'src/data/queries/GetCategories';
import { NewModuleFormData } from 'src/forms';
import {} from '../DynamicForm';

// const ADD_MODULE = gql`
// 	mutation addModule($sid: String!, $name: String!, $width: Float!, $height: Float!, $icon: String) {
// 		addModule(sid: $sid, name: $name, width: $width, height: $height, icon: $icon) {
// 			id
// 			sid
// 		}
// 	}
// `;

const layout = {
	labelCol: { span: 4 },
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
	// const [addModule] = useMutation(ADD_MODULE);
	const [getCategories, { data }] = useLazyQuery<{ categories: Category[] }>(GET_CATEGORIES, { fetchPolicy: 'network-only' });

	const [selectedCategory, setSelectedCategory] = useState<Category>();

	useEffect(() => {
		if (props.isVisible) {
			getCategories();
		}
	}, [props.isVisible, getCategories]);

	const onCategoryDropdown = ({ key }: { key: any }) => {
		// get selected category
		const category = data?.categories.find(c => c.sid === key);
		setSelectedCategory(category);
	};

	const categoryDropdown = (data: { categories: Category[] } | undefined) => {
		if (data && data.categories) {
			return (
				<Menu onClick={onCategoryDropdown}>
					{data.categories.map(category => {
						return <Menu.Item key={category.sid}>{category.name}</Menu.Item>;
					})}
				</Menu>
			);
		} else {
			return (
				<Menu onClick={onCategoryDropdown}>
					<Menu.Item key="_no_category">None categories are defined</Menu.Item>
				</Menu>
			);
		}
	};

	const handleOk = (e: MouseEvent<HTMLElement>) => {
		props.setIsVisible(false);
	};

	const handleCancel = (e: MouseEvent<HTMLElement>) => {
		props.setIsVisible(false);
	};

	const onSubmit = (value: any) => {
		console.log('onSubmit', value);
	};

	const _category_dropdown = (
		<PacifyFormCustomItem key="_category_dropdown">
			<Dropdown overlay={() => categoryDropdown(data)}>
				<a href="/#" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
					Select Category For Module <DownOutlined />
				</a>
			</Dropdown>
			<span>
				<strong> {selectedCategory?.name}</strong>
			</span>
		</PacifyFormCustomItem>
	);

	const _category_dropdown2 = (
		<PacifyFormCustomItem key="_category_dropdown2">
			<Dropdown overlay={() => categoryDropdown(data)}>
				<a href="/#" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
					Select Category For Module <DownOutlined />
				</a>
			</Dropdown>
			<span>
				<strong> {selectedCategory?.name}</strong>
			</span>
		</PacifyFormCustomItem>
	);

	return (
		<div>
			<Modal visible={props.isVisible} title="Add New Module" onOk={handleOk} onCancel={handleCancel}>
				{/* <Form {...layout} name="basic" size="small">
					<Dropdown overlay={() => categoryDropdown(data)}>
						<a href="/#" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
							Select Category For Module <DownOutlined />
						</a>
					</Dropdown>
					<span>
						<strong> {selectedCategory?.name}</strong>
					</span>

					<Form.Item label="Short ID" name="sid" rules={[{ required: true }]}>
						<Input />
					</Form.Item>

					<Form.Item label="Name" name="name" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item label="Width" name="width" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item label="Height" name="height" rules={[{ required: true }]}>
						<Input />
					</Form.Item>
					<Form.Item label="Icon" name="icon" rules={[{ required: false }]}>
						<Input />
					</Form.Item>

					<Form.Item {...tailLayout}>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form> */}
				<PacifyForm onFinish={onSubmit} formData={NewModuleFormData}>
					{_category_dropdown}
					{/* {_category_dropdown2} */}
				</PacifyForm>
			</Modal>
		</div>
	);
}

export default AddNewModuleModal;
