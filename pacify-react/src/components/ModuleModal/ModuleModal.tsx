import { Button, Modal } from 'antd';
import * as d3Select from 'd3-selection';
import React, { useEffect, useState } from 'react';

interface ModuleModalProps {
	moduleContext: SVGGElement | undefined;
	setModuleContext: React.Dispatch<React.SetStateAction<SVGGElement | undefined>>;
}

function ModuleModal(props: ModuleModalProps) {
	const [module, setModule] = useState();

	useEffect(() => {
		if (props.moduleContext) {
			const module = d3Select.select(props.moduleContext).datum();
			console.log(module);
		}
	}, [props.moduleContext]);

	const handleOk = (e: React.MouseEvent<HTMLElement>) => {
		props.setModuleContext(undefined);
	};

	const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
		props.setModuleContext(undefined);
	};

	return (
		<div>
			<Modal visible={props.moduleContext ? true : false} title={`Module Properties`} onOk={handleOk} onCancel={handleCancel}>
				<Button type="primary" danger>
					Remove From Project
				</Button>
			</Modal>
		</div>
	);
}

export default ModuleModal;
