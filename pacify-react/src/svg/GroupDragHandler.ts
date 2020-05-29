import * as d3 from 'd3';
import * as d3Drag from 'd3-drag';
import * as d3Select from 'd3-selection';
import { CLASS } from 'src/constants/CLASS';
import { SvgModuleElement, SvgPathElement } from 'src/svg/types';
import { pathDFunction } from './PathDragHandler';

// Start of the drag
const dragStart = function (this: SVGGElement, d: any) {
	// make selected element on top
	d3Select.select(this).raise();
};

// end of the drag
const dragEnd = function (this: SVGGElement, d: any) {};

const dragging = function (this: SVGGElement, d: any) {
	const svgG = this;
	const d3SvgG = d3Select.select(svgG) as SvgModuleElement;

	const x = d.x + d3.event.dx;
	const y = d.y + d3.event.dy;

	if (x < 0 || y < 0) {
		// console.debug('end reached', d3.event.dx, d3.event.dy);
	} else {
		d.x += d3.event.dx;
		d.y += d3.event.dy;
		// path adjustments
		// the to and from data will be added from path dragging events
		pathAdjustmentDueToGroupDrag(svgG, d3SvgG);
	}

	d3SvgG.attr('transform', 'translate(' + [d.x, d.y] + ')');
};

const pathAdjustmentDueToGroupDrag = function (svgG: SVGGElement, d3SvgG: SvgModuleElement): void {
	const modifyCoordinates = (fromG: SVGGElement, toG: SVGGElement, pos: 'start' | 'end') => {
		const connections = d3Select.select(`#${CLASS.CONNECTION.ID}`).selectAll(`.${CLASS.CONNECTION.CLASS}`);
		for (const conn of connections.nodes()) {
			const path = d3Select.select(conn as any) as SvgPathElement;

			if (path.datum().from === fromG && path.datum().to === toG) {
				// move start point
				const pathPoints = path.datum().points;
				pathPoints[pos === 'start' ? 0 : pathPoints.length - 1].x += d3.event.dx;
				pathPoints[pos === 'start' ? 0 : pathPoints.length - 1].y += d3.event.dy;

				path.attr('d', pathDFunction(pathPoints) as any);
			}
		}
	};

	if (d3SvgG.datum().to) {
		const fromG = svgG;
		const toGs = d3SvgG.datum().to as SVGGElement[];
		// modify starting point
		toGs.forEach(toG => {
			modifyCoordinates(fromG, toG, 'start');
		});
	}

	if (d3SvgG.datum().from) {
		const toG = svgG;
		const fromGs = d3SvgG.datum().from as SVGGElement[];
		/// modify end point
		fromGs.forEach(fromG => {
			modifyCoordinates(fromG, toG, 'end');
		});
	}
};

const GroupDragHandler = d3Drag
	.drag()
	.on('drag', dragging as any)
	.on('start', dragStart as any)
	.on('end', dragEnd as any);

export default GroupDragHandler;
