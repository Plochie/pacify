import { DownOutlined } from '@ant-design/icons';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { Dropdown, Form, Menu, message, Modal } from 'antd';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { PacifyForm, PacifyFormCustomItem, PacifyInnerForm } from 'src/components/DynamicForm';
import { Category, GET_CATEGORIES } from 'src/data/queries/GetCategories';
import { NewModuleFormData, NewModuleInputFormData, NewModuleOutputFormData } from 'src/forms';

const ADD_MODULE = gql`
	mutation addModule(
		$categorySID: String!
		$sid: String!
		$title: String!
		$width: Float!
		$height: Float!
		$icon: String
		$isStarter: Boolean!
		$isShared: Boolean!
	) {
		addModule(
			categorySID: $categorySID
			sid: $sid
			title: $title
			width: $width
			height: $height
			icon: $icon
			isStarter: $isStarter
			isShared: $isShared
		) {
			id
			sid
		}
	}
`;

interface AddNewModuleModalProps {
	isVisible: boolean;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddNewModuleModal(props: AddNewModuleModalProps) {
	// start of component
	const [addModule] = useMutation(ADD_MODULE);
	const [getCategories, { data }] = useLazyQuery<{ categories: Category[] }>(GET_CATEGORIES, { fetchPolicy: 'network-only' });
	const [form] = Form.useForm();

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
						return <Menu.Item key={category.sid}>{category.title}</Menu.Item>;
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

	const onSubmit = (values: any) => {
		console.log('onSubmit', values);

		if (selectedCategory) {
			values.width = Number(values.width);
			values.height = Number(values.height);
			values.categorySID = selectedCategory.sid;

			addModule({ variables: values })
				.then(res => {
					message.success('Module added successfully');
					form.resetFields();
				})
				.catch(err => {
					console.error(err);
				});
		} else {
			message.error('Category not selected.');
		}
	};

	return (
		<Modal
			visible={props.isVisible}
			title="Add New Module"
			onOk={() => props.setIsVisible(false)}
			onCancel={() => props.setIsVisible(false)}
		>
			<PacifyForm
				onFinish={onSubmit}
				formData={NewModuleFormData}
				form={form}
				initialValues={{
					isStarter: false,
					isShared: false,
				}}
			>
				<PacifyFormCustomItem key="_category_dropdown">
					<div style={{ paddingBottom: '15px' }}>
						<Dropdown overlay={() => categoryDropdown(data)}>
							<a href="/#" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
								Select Category For Module <DownOutlined />
							</a>
						</Dropdown>
						<span>
							<strong> {selectedCategory?.title}</strong>
						</span>
					</div>
				</PacifyFormCustomItem>

				<PacifyFormCustomItem key="_custom_input_form">
					<PacifyInnerForm formData={NewModuleInputFormData} styles={innerFormStyles} />
				</PacifyFormCustomItem>
				<PacifyFormCustomItem key="_custom_output_form">
					<PacifyInnerForm formData={NewModuleOutputFormData} styles={innerFormStyles} />
				</PacifyFormCustomItem>
			</PacifyForm>
		</Modal>
	);
}

const innerFormStyles: React.CSSProperties = {
	border: '1px dashed lightgray',
	borderRadius: '5px',
	padding: '10px',
	marginBottom: '10px',
};
