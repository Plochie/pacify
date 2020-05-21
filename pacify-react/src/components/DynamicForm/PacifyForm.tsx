import { Button, Form, Input } from 'antd';
import { Store } from 'antd/lib/form/interface';
import React, { FunctionComponent, useEffect } from 'react';
import { PacifyFormData } from './types';

interface PacifyFormProps {
	formData: PacifyFormData;
	onFinish: (values: Store) => void;
}

export const PacifyForm: FunctionComponent<PacifyFormProps> = props => {
	useEffect(() => {
		const children = props.children as any;
		if (children) {
			console.log(children.key);
		}
	});

	return (
		<Form name={props.formData.name} size={props.formData.size} onFinish={props.onFinish}>
			{props.formData.formItems.map((formItem, index) => {
				// check for custom elements
				if (formItem.type === 'custom') {
					return props.children;
				} else {
					return (
						<Form.Item key={index + formItem.name} label={formItem.label} name={formItem.name} rules={formItem.rules}>
							<Input />
						</Form.Item>
					);
				}
			})}

			<Form.Item>
				<Button type="primary" htmlType="submit">
					{props.formData.submitName}
				</Button>
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
	},
};
