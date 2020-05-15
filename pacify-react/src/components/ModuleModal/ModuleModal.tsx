import { Modal } from 'antd';
import React from 'react';
import 'src/App.scss';

interface ModuleModalProps {
	isVisible: boolean;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModuleModal(props: ModuleModalProps) {
	const handleOk = (e: React.MouseEvent<HTMLElement>) => {
		props.setIsVisible(false);
	};

	const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
		props.setIsVisible(false);
	};

	return (
		<div>
			<Modal visible={props.isVisible} title="Module Properties" onOk={handleOk} onCancel={handleCancel}></Modal>
		</div>
	);
}

export default ModuleModal;
