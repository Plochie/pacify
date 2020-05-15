import { Modal } from 'antd';
import React from 'react';
import 'src/App.scss';

interface SvgPathModalProps {
	isVisible: boolean;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function SvgPathModal(props: SvgPathModalProps) {
	const handleOk = (e: React.MouseEvent<HTMLElement>) => {
		props.setIsVisible(false);
	};

	const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
		props.setIsVisible(false);
	};

	return (
		<div>
			<Modal visible={props.isVisible} title="Path Properties" onOk={handleOk} onCancel={handleCancel}></Modal>
		</div>
	);
}

export default SvgPathModal;
