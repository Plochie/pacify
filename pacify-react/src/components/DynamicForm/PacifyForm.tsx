import { Button, Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { Store } from 'antd/lib/form/interface';
import React, { FunctionComponent } from 'react';
import './PacifyForm.scss';
import { PacifyInputTypes } from './PacifyInputTypes';
import { PacifyFormData } from './types';

interface PacifyFormProps {
	formData: PacifyFormData;
	onFinish?: (values: Store) => void;
	form?: FormInstance;
	initialValues?: { [key: string]: any };
	styles?: React.CSSProperties;
}

export const formDataRenderer = function (props: React.PropsWithChildren<PacifyFormProps>) {
	// render the inputs from dynamic form
	let innerFormData: any;
	//
	return props.formData.rows.map((row, index) => {
		return (
			<div className="form-row" key={index}>
				{
					// rows iteration
					row.items.map((formItem, index) => {
						if (formItem.type === 'custom') {
							const children = props.children as any;
							if (children) {
								if (Array.isArray(children)) {
									return children.find(child => child.key === formItem.name);
								} else {
									if (children.key === formItem.name) return children;
								}
							}
							return props.children;
						}
						// for already declarated inputs
						else {
							if (formItem.type === 'inside_form') {
								const children = props.children as any;
								if (children) {
									if (Array.isArray(children)) {
										innerFormData = children.find(child => child.key === formItem.name);
									} else {
										if (children.key === formItem.name) innerFormData = children;
									}
								}

								innerFormData = innerFormData.props.children.props.formData;
							}
							return <PacifyInputTypes index={index} item={formItem} key={index} innerFormData={innerFormData} />;
						}
					})
				}
			</div>
		);
	});
};

export const PacifyForm: FunctionComponent<PacifyFormProps> = props => {
	// Dynamic form component
	// returned tsx view
	return (
		<Form
			form={props.form}
			name={props.formData.name}
			size={props.formData.size}
			onFinish={props.onFinish}
			labelCol={{ span: 4 }}
			initialValues={props.initialValues}
			style={props.styles}
		>
			{
				// iterate through all rows
				formDataRenderer(props)
			}

			<Form.Item>
				<div className="form-controls">
					<Button type="primary" htmlType="submit">
						{props.formData.submitName}
					</Button>
					<Button type="dashed" danger onClick={() => props.form?.resetFields()}>
						{props.formData.resetName}
					</Button>
				</div>
			</Form.Item>
		</Form>
	);
};

export const PacifyInnerForm: FunctionComponent<PacifyFormProps> = props => {
	return <></>;
};

PacifyForm.defaultProps = {
	formData: {
		submitName: 'Submit',
		rows: [],
		name: 'form',
		size: 'small',
		resetName: 'Reset',
	},
};
