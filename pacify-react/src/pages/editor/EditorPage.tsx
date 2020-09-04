import { Button, message } from 'antd';
import * as d3Select from 'd3-selection';
import React, { useEffect, useRef, useState } from 'react';
import 'src/App.scss';
import {
	AddNewCategoryModal,
	AddNewModuleModal,
	CategoryDrawer,
	moduleClickedSubject,
	ModuleModal,
	PathPropertiesModal,
} from 'src/components';
import TestArea from 'src/components/TestArea/TestArea';
import { CLASS } from 'src/constants/CLASS';
import addPalette, { moduleContextMenuSubject } from 'src/svg/module/addPalette';
import { pathContextMenuSubject } from 'src/svg/PathDragHandler';

export function EditorPage() {
	const svgRef = useRef<SVGSVGElement>(null);
	const [pathModelVisible, setPathModelVisible] = useState<boolean>(false);
	const [moduleContext, setModuleContext] = useState<SVGGElement>();
	const [addNewModuleModalVisible, setAddNewModuleModalVisible] = useState<boolean>(false);
	const [addNewCategoryModalVisible, setAddNewCategoryModalVisible] = useState<boolean>(false);
	const [categoryDrawerVisible, setCategoryDrawerVisible] = useState<boolean>(false);

	useEffect(() => {
		// get svg area and set it in state
		// const d3Svg = d3Select.select(svgRef.current);
		// TODO: remove this
		// generateTestingUI(d3Svg);
	}, [svgRef]);

	// useeffect for managing subjects
	// will get called only at initialization of component
	useEffect(() => {
		pathContextMenuSubject.subscribe(() => setPathModelVisible(true));
		moduleContextMenuSubject.subscribe(moduleSvgElement => setModuleContext(moduleSvgElement));

		moduleClickedSubject.subscribe(module => {
			// TODO: check for initial coordinates for clicked module
			addPalette(d3Select.select(svgRef.current) as any, module, { x: 20, y: 20 });
			message.success(`Module added in project: ${module.title}`);
		});

		// TODO: check how to unscribe in router
		// return () => pathContextMenuSubject.unsubscribe();
	}, []);

	return (
		<>
			<div className="App">
				<div className="svg-area-wrapper">
					<svg ref={svgRef} id="svgArea">
						<g id={CLASS.CONNECTION.ID} />
					</svg>
					<br />
				</div>
				<PathPropertiesModal isVisible={pathModelVisible} setIsVisible={setPathModelVisible} />
				<ModuleModal moduleContext={moduleContext} setModuleContext={setModuleContext} />
				<TestArea />
				<div className="controls">
					<Button type="primary" onClick={() => setCategoryDrawerVisible(true)}>
						Categories
					</Button>
					<Button type="primary" onClick={() => setAddNewCategoryModalVisible(true)}>
						Add New Category
					</Button>
					<Button type="primary" onClick={() => setAddNewModuleModalVisible(true)}>
						Add New Module
					</Button>
				</div>
			</div>
			<AddNewCategoryModal isVisible={addNewCategoryModalVisible} setIsVisible={setAddNewCategoryModalVisible} />
			<AddNewModuleModal isVisible={addNewModuleModalVisible} setIsVisible={setAddNewModuleModalVisible} />
			<CategoryDrawer isVisible={categoryDrawerVisible} setIsVisible={setCategoryDrawerVisible} />
		</>
	);
}
