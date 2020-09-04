import { Button, Modal } from 'antd';
import * as d3Select from 'd3-selection';
import React, { useEffect, useState } from 'react';
import { CLASS } from 'src/constants/CLASS';
import { SvgModuleElementDatum, SvgPathElement } from 'src/svg/types';

interface ModuleModalProps {
	moduleContext: SVGGElement | undefined;
	setModuleContext: React.Dispatch<React.SetStateAction<SVGGElement | undefined>>;
}

export function ModuleModal(props: ModuleModalProps) {
	// const [module, setModule] = useState();
	const [datum, setDatum] = useState<SvgModuleElementDatum>();

	useEffect(() => {
		if (props.moduleContext) {
			const module = d3Select.select(props.moduleContext).datum() as SvgModuleElementDatum;
			setDatum(module);
		}
	}, [props.moduleContext]);

	const handleOk = (e: React.MouseEvent<HTMLElement>) => {
		props.setModuleContext(undefined);
	};

	const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
		props.setModuleContext(undefined);
	};

	const onModuleDelete = () => {
		// remove the svg from dom
		if (props.moduleContext) {
			// find all connections and remove it first
			const paths = d3Select.selectAll(`#${CLASS.CONNECTION.ID} .${CLASS.CONNECTION.CLASS}`);

			paths.nodes().forEach(p => {
				const path = d3Select.select<any, any>(p) as SvgPathElement;
				if (path.datum().from === props.moduleContext || path.datum().to === props.moduleContext) {
					path.remove();
				}
			});

			d3Select.select(props.moduleContext).remove();
			props.setModuleContext(undefined);
		}
	};

	return (
		<div>
			<Modal
				visible={props.moduleContext ? true : false}
				title={`Module Properties (${datum?.data.title})`}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Button type="primary" danger onClick={onModuleDelete}>
					Remove From Project
				</Button>
			</Modal>
		</div>
	);
}
