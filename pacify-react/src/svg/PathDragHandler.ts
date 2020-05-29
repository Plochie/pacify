import * as d3 from 'd3';
import * as d3Drag from 'd3-drag';
import * as d3Select from 'd3-selection';
import { Subject } from 'rxjs';
import { CLASS } from 'src/constants/CLASS';
import { SvgModuleElement, SvgPathElement, SvgPathElementDatum } from 'src/svg/types';

export const pathContextMenuSubject = new Subject();

let tempPathPoint: d3Select.Selection<SVGRectElement, { x: number; y: number }, null, undefined>;
let tempPath: SvgPathElement;
let pathData: { x: number; y: number }[];

/**
 * Path mouse over event
 * @param this Path element
 * @param datum Path datum
 * @param i
 */
const pathMouseOverHandler = function (this: SVGPathElement, datum: SvgPathElementDatum, i: any) {
	d3Select.select(this).attr('stroke-width', 8);
};

/**
 * Path mouse out event
 * @param this Path element
 * @param datum Path datum
 * @param i
 */
const pathMouseOutHandler = function (this: SVGPathElement, datum: SvgPathElementDatum, i: any) {
	d3Select.select(this).attr('stroke-width', 2);
};

/**
 * Path event after right click
 * @param this Path element
 * @param datum Path datum
 * @param i
 */
const pathContextMenuHandler = function (this: SVGPathElement, datum: SvgPathElementDatum, i: any) {
	d3.event.preventDefault();
	pathContextMenuSubject.next();
};

/**
 * path function for calculating curve
 */
export const pathDFunction = d3
	.line<{ x: number; y: number }>()
	.x(function (d) {
		return d.x;
	})
	.y(function (d) {
		return d.y;
	})
	.curve(d3.curveLinear);

/**
 * @param x
 * @param y
 */
const pathFunction = function (x: number, y: number): SvgPathElement {
	tempPathPoint.attr('x', x).attr('y', y);

	pathData[1].x = x + 7.5;
	pathData[1].y = y + 7.5;

	tempPath.attr('d', pathDFunction(pathData) as any);

	return tempPath;
};

/**
 * Start of the drag
 * @param this
 * @param d
 */
const dragStart = function (this: Element, d: any) {
	const svgNode = this as SVGElement;
	// Get parent svg node and set temp circle for reference
	const svgRoot = d3Select.select(svgNode.ownerSVGElement as SVGSVGElement);
	// get owner of element
	const ownerGroup = svgNode.parentNode as SVGGElement;
	// check if owner is action group
	if (ownerGroup.getAttribute('class') === CLASS.ACTION.WRAPPER) {
		const x: number = d3Select.event.x + Number(svgNode.getAttribute('x'));
		const y: number = d3Select.event.y + Number(svgNode.getAttribute('y'));

		pathData = [
			{ x: x + 7.5, y: y + 7.5 },
			{ x: x + 7.5, y: y + 7.5 },
		];

		tempPath = svgRoot
			.select(`#${CLASS.CONNECTION.ID}`)
			.append('path')
			.attr('d', pathDFunction(pathData) as any)
			.attr('id', 'temp-path')
			.attr('stroke', 'lightgrey')
			.attr('stroke-width', 2)
			.attr('stroke-dasharray', '4')
			.attr('fill', 'none') as SvgPathElement;

		// raise path to top
		// TODO: test this more, find something permanant
		svgRoot.select(`#${CLASS.CONNECTION.ID}`).raise();

		tempPathPoint = svgRoot
			.append('rect')
			.data([{ x, y }])
			.attr('id', 'temp-path-point')
			.attr('width', '15')
			.attr('height', '15')
			.attr('x', function (d) {
				return d.x;
			})
			.attr('y', function (d) {
				return d.y;
			})
			.attr('rx', '8')
			.attr('ry', '8')
			.attr('fill', '#333')
			.attr('stroke', 'lightgrey')
			.attr('stroke-width', '2');
	} else {
		throw Error('Owner of the selected element is not group');
	}
};

/**
 * @param this
 * @param d
 */
const dragging = function (this: Element, d: any) {
	const svgNode = this as SVGElement;

	const x = d3Select.event.x + Number(svgNode.getAttribute('x'));
	const y = d3Select.event.y + Number(svgNode.getAttribute('y'));

	pathFunction(x, y);
};

/**
 * end of the drag
 * @param this
 * @param d
 */
const dragEnd = function (this: SVGElement, d: any) {
	// get mouse position relative to
	var mouse = d3.mouse(this.ownerSVGElement as any);
	var elements = document.elementsFromPoint(mouse[0], mouse[1]);

	tempPathPoint.remove();
	tempPath.remove();

	const fromIO = this;
	let toIO = {} as any;

	// check if below element is input/output element
	let ioFountflag = false;
	for (const itrToIO of elements) {
		// input/output is rect
		if (itrToIO.tagName === 'rect' && itrToIO.getAttribute('class') === CLASS.ACTION.INPUT) {
			toIO = itrToIO as SVGElement;
			ioFountflag = true;
			break;
		}
	}

	if (ioFountflag) {
		connectPalettes(fromIO, toIO);
	} else {
		d3Select.select('#temp-path')?.remove();
		console.debug('nothing to connect here');
	}
};

export const connectPalettes = (fromIO: SVGElement, toIO: SVGElement) => {
	// make temp path to permanant path
	// add from and to group to path.datum();
	const fromG = fromIO.parentNode as SVGGElement;
	const toG = toIO.parentNode as SVGGElement;

	// add to informatin in fromG
	(d3Select.select(fromG) as SvgModuleElement).datum().to?.push(toG);
	// add to informatin in toG
	(d3Select.select(toG) as SvgModuleElement).datum().from?.push(fromG);

	const toOffset = (d3Select.select(toG) as SvgModuleElement).datum();
	const fromOffset = (d3Select.select(fromG) as SvgModuleElement).datum();

	const toX = Number(toIO.getAttribute('x')) + toOffset.x + 7.5;
	const toY = Number(toIO.getAttribute('y')) + toOffset.y + 7.5;

	const fromX = Number(fromIO.getAttribute('x')) + fromOffset.x + 7.5;
	const fromY = Number(fromIO.getAttribute('y')) + fromOffset.y + 7.5;

	// Get parent svg node and set temp circle for reference
	const svgRoot = d3Select.select(fromG.ownerSVGElement as SVGSVGElement);

	const points = [
		{ x: fromX, y: fromY },
		{ x: toX, y: toY },
	];

	const path = svgRoot
		.select(`#${CLASS.CONNECTION.ID}`)
		.append('path')
		.attr('d', pathDFunction(points) as any)
		.attr('stroke', 'lightgrey')
		.attr('stroke-width', 2)
		.attr('fill', 'none')
		.attr('class', CLASS.CONNECTION.CLASS)
		.attr('stroke-dasharray', '0') as SvgPathElement;

	// add to and from data in path element
	path.datum({ from: fromG, to: toG, points });
	// add hover handler
	path.on('mouseover', pathMouseOverHandler);
	path.on('mouseout', pathMouseOutHandler);
	path.on('contextmenu', pathContextMenuHandler);

	console.debug(`connection done`);
};

const PathDragHandler = d3Drag
	.drag()
	.on('drag', dragging)
	.on('start', dragStart)
	// TODO: check for typesefty
	.on('end', dragEnd as any);

export default PathDragHandler;
