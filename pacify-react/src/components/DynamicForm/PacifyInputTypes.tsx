import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Space, Upload } from 'antd';
import React, { FunctionComponent } from 'react';
import { formDataRenderer } from './PacifyForm';
import { PacifyFormData, PacifyFormItem } from './types';

type PacifyInputTypesProps = {
	item: PacifyFormItem;
	index: number;
	innerFormData: PacifyFormData;
};

const typeSwitch = function (props: React.PropsWithChildren<PacifyInputTypesProps>, formItem: PacifyFormItem, index: number) {
	switch (formItem.type) {
		// string input type
		case 'string':
			return (
				<Form.Item key={index + formItem.name} label={formItem.label} name={formItem.name} rules={formItem.rules}>
					<Input />
				</Form.Item>
			);
		// numeric input type
		case 'numeric':
			return (
				<Form.Item key={index + formItem.name} label={formItem.label} name={formItem.name} rules={formItem.rules}>
					<Input type={'number'} />
				</Form.Item>
			);
		// checkbox input type
		case 'checkbox':
			return (
				<Form.Item key={index + formItem.name} name={formItem.name} valuePropName="unchecked">
					<Checkbox>{formItem.label}</Checkbox>
				</Form.Item>
			);
		// checkbox input type
		case 'directory':
			return (
				<Form.Item key={index + formItem.name} name={formItem.name}>
					<Upload>
						<Button>
							<UploadOutlined /> Upload Directory
						</Button>
					</Upload>
				</Form.Item>
			);
		// inner form type
		case 'inside_form':
			return (
				<Form.List name={props.innerFormData.name}>
					{
						//
						(fields, { add, remove }) => {
							return (
								<div>
									{fields.map(field => {
										return (
											<Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="start">
												{formDataRenderer({ formData: props.innerFormData })}

												<MinusCircleOutlined
													onClick={() => {
														remove(field.name);
													}}
												/>
											</Space>
										);
									})}

									<Form.Item>
										<Button type="dashed" onClick={add} block>
											<PlusOutlined /> {props.innerFormData.submitName}
										</Button>
									</Form.Item>
								</div>
							);
						}
					}
				</Form.List>
			);
		default:
			return <></>;
	}
};

export const PacifyInputTypes: FunctionComponent<PacifyInputTypesProps> = props => {
	return (
		<>
			{
				// switch to get desired type input
				typeSwitch(props, props.item, props.index)
			}
		</>
	);
};
