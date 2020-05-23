import { Button, Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { Store } from 'antd/lib/form/interface';
import React, { FunctionComponent } from 'react';
import './PacifyForm.scss';
import { PacifyFormData } from './types';

interface PacifyFormProps {
	formData: PacifyFormData;
	onFinish: (values: Store) => void;
	form?: FormInstance;
}

export const PacifyForm: FunctionComponent<PacifyFormProps> = props => {
	// returned tsx view
	return (
		<Form form={props.form} name={props.formData.name} size={props.formData.size} onFinish={props.onFinish} labelCol={{ span: 4 }}>
			{props.formData.formItems.map((formItem, index) => {
				// check for custom elements
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
				} else {
					return (
						<Form.Item key={index + formItem.name} label={formItem.label} name={formItem.name} rules={formItem.rules}>
							{formItem.type === 'numeric' ? <Input type={'number'} /> : <Input />}
						</Form.Item>
					);
				}
			})}

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

PacifyForm.defaultProps = {
	formData: {
		submitName: 'Submit',
		formItems: [],
		name: 'form',
		size: 'small',
		resetName: 'Reset',
	},
};
