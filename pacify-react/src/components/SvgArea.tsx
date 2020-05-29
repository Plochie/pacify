import { message } from 'antd';
import * as d3Select from 'd3-selection';
import React, { useEffect, useRef, useState } from 'react';
import 'src/App.scss';
import ModuleModal from 'src/components/ModuleModal/ModuleModal';
import SvgPathModal from 'src/components/SvgPathModal/SvgPathModal';
import { CLASS } from 'src/constants/CLASS';
import addPalette, { moduleContextMenuSubject } from 'src/svg/module/addPalette';
import { connectPalettes, pathContextMenuSubject } from 'src/svg/PathDragHandler';
import { moduleClickedSubject } from './CategoryDrawer/CategoryDrawer';

// TODO: remove this
const generateTestingUI = (d3Svg: any) => {
	const test1 = addPalette(d3Svg, {
		title: 'Module 1',
		sid: 'mod1',
		x: 400,
		y: 50,
		width: 140,
		height: 50,
		icon: `${process.env.PUBLIC_URL}/logo192.png`,
	});
	const test2 = addPalette(d3Svg, { title: 'Module 2', sid: 'mod2', x: 100, y: 200, width: 140, height: 50 });
	const test3 = addPalette(d3Svg, { title: 'Module 3', sid: 'mod3', x: 700, y: 350, width: 140, height: 50 });
	addPalette(d3Svg, { title: 'Module 4', sid: 'mod4', x: 400, y: 500, width: 140, height: 50 });

	connectPalettes(test2.output.node() as any, test1.input.node() as any);
	connectPalettes(test1.output.node() as any, test3.input.node() as any);
	connectPalettes(test2.output.node() as any, test3.input.node() as any);
};

function SvgArea() {
	const svgRef = useRef<SVGSVGElement>(null);
	// eslint-disable-next-line
	const [pathModelVisible, setPathModelVisible] = useState<boolean>(false);
	const [moduleContext, setModuleContext] = useState<SVGGElement>();

	useEffect(() => {
		// get svg area and set it in state
		const d3Svg = d3Select.select(svgRef.current);
		// TODO: remove this
		generateTestingUI(d3Svg);
	}, [svgRef]);

	// useeffect for managing subjects
	useEffect(() => {
		pathContextMenuSubject.subscribe(() => setPathModelVisible(true));
		moduleContextMenuSubject.subscribe(moduleSvgElement => setModuleContext(moduleSvgElement));

		moduleClickedSubject.subscribe(module => {
			addPalette(d3Select.select(svgRef.current) as any, module);
			message.success(`Module added in project: ${module.title}`);
		});

		return () => pathContextMenuSubject.unsubscribe();
	}, []);

	return (
		<>
			<div className="svg-area-wrapper">
				<svg ref={svgRef} id="svgArea">
					<g id={CLASS.CONNECTION.ID} />
				</svg>
				<br />
			</div>
			<SvgPathModal isVisible={pathModelVisible} setIsVisible={setPathModelVisible} />
			<ModuleModal moduleContext={moduleContext} setModuleContext={setModuleContext} />
		</>
	);
}

export default SvgArea;
