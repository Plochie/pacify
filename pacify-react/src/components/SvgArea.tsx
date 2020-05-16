import * as d3Select from 'd3-selection';
import React, { useEffect, useRef, useState } from 'react';
import 'src/App.scss';
import ModuleModal from 'src/components/ModuleModal/ModuleModal';
import SvgPathModal from 'src/components/SvgPathModal/SvgPathModal';
import { CLASS } from 'src/constants/CLASS';
import addPalette, { moduleContextMenuSubject } from 'src/svg/module/addPalette';
import { connectPalettes, pathContextMenuSubject } from 'src/svg/PathDragHandler';
import { SvgSvgElement } from 'src/svg/types';

// TODO: remove this
const generateTestingUI = (d3Svg: any) => {
	const test1 = addPalette(d3Svg, {
		title: 'Module 1',
		x: 400,
		y: 50,
		width: 140,
		height: 50,
		icon: `${process.env.PUBLIC_URL}/logo192.png`,
	});
	const test2 = addPalette(d3Svg, { title: 'Module 2', x: 100, y: 200, width: 140, height: 50 });
	const test3 = addPalette(d3Svg, { title: 'Module 3', x: 700, y: 350, width: 140, height: 50 });
	addPalette(d3Svg, { title: 'Module 3', x: 400, y: 500, width: 140, height: 50 });

	connectPalettes(test2.output.node() as any, test1.input.node() as any);
	connectPalettes(test1.output.node() as any, test3.input.node() as any);
	connectPalettes(test2.output.node() as any, test3.input.node() as any);
};

function SvgArea() {
	const svgRef = useRef<SVGSVGElement>(null);
	// eslint-disable-next-line
	const [svgState, setSvgState] = useState<SvgSvgElement>();
	const [pathModelVisible, setPathModelVisible] = useState<boolean>(false);
	const [moduleVisible, setModuleVisibleVisible] = useState<boolean>(false);

	useEffect(() => {
		// get svg area and set it in state
		const d3Svg = d3Select.select(svgRef.current);
		setSvgState(d3Svg as any);
		// TODO: remove this
		generateTestingUI(d3Svg);
	}, [svgRef]);

	// useeffect for managing subjects
	useEffect(() => {
		pathContextMenuSubject.subscribe(() => setPathModelVisible(true));
		moduleContextMenuSubject.subscribe(() => setModuleVisibleVisible(true));
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
			<ModuleModal isVisible={moduleVisible} setIsVisible={setModuleVisibleVisible} />
		</>
	);
}

export default SvgArea;
