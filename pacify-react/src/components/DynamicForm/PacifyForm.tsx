import { Button, Form, Input } from 'antd';
import { Store } from 'antd/lib/form/interface';
import React, { FunctionComponent } from 'react';
import { PacifyFormData } from './types';

interface PacifyFormProps {
	formData: PacifyFormData;
	onFinish: (values: Store) => void;
}

const PacifyForm: FunctionComponent<PacifyFormProps> = props => {
	return (
		<Form name={props.formData.name} size={props.formData.size} onFinish={props.onFinish}>
			{props.formData.formItems.map((formItem, index) => {
				return (
					<Form.Item key={index + formItem.label} label={formItem.label} name={formItem.name} rules={formItem.rules}>
						<Input />
					</Form.Item>
				);
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

export default PacifyForm;
