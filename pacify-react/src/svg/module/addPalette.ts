import * as d3 from 'd3';
import { Subject } from 'rxjs';
import { CLASS } from 'src/constants/CLASS';
import { PacifyModule } from 'src/entities';
import DragHandler from 'src/svg/GroupDragHandler';
import addInput from 'src/svg/module/addInput';
import addOutput from 'src/svg/module/addOutput';
import { SvgElement, SvgGElement, SvgGElementDatum, SvgImageElement, SvgRectElement, SvgTextElement } from 'src/svg/types';

export const moduleContextMenuSubject = new Subject();

const LOGO = {
	WIDTH: 35,
	HEIGHT: 35,
	PADDING: 10,
};

/**
 * Path event after right click
 * @param this Path element
 * @param datum Path datum
 * @param i
 */
const moduleContextMenuHandler = function (this: SVGGElement, datum: SvgGElementDatum, i: any) {
	d3.event.preventDefault();
	moduleContextMenuSubject.next();
};

const addPalette = function (
	parent: SvgElement,
	props: PacifyModule,
): {
	g: SvgGElement;
	input: SvgRectElement;
	output: SvgRectElement;
} {
	const datumG: SvgGElementDatum = { x: props.x, y: props.y, drag: false, from: [], to: [] };

	const g: SvgGElement = parent
		.append('g')
		.datum(datumG)
		.attr('class', CLASS.ACTION.WRAPPER)
		.attr('transform', function (d) {
			return 'translate(' + d.x + ' ' + d.y + ')';
		})
		.call(DragHandler as any);
	// add wrapper
	g.append('rect').attr('class', CLASS.ACTION.MAIN).attr('fill', 'orange').attr('width', 140).attr('height', 50);

	// add input
	const input = addInput(g, props);
	// add output
	const output = addOutput(g, props);
	// add logo
	addLogo(g, props);
	// add title
	addTitle(g, props);

	g.on('contextmenu', moduleContextMenuHandler);

	return { g, input, output };
};

const addTitle = function (parent: SvgElement, props: PacifyModule): SvgTextElement | undefined {
	let x, y;
	let textAnchor = 'middle';

	if (props.icon) {
		x = LOGO.WIDTH + LOGO.PADDING + 5;
		y = props.height / 2;
		textAnchor = 'start';
	} else {
		x = props.width / 2;
		y = props.height / 2;
	}

	const svg = parent
		.append('text')
		.text(props.title)
		.attr('x', x)
		.attr('y', y)
		.attr('text-anchor', textAnchor)
		.attr('alignment-baseline', 'middle')
		.attr('class', CLASS.ACTION.TITLE) as SvgTextElement;

	return svg;
};

const addLogo = function (parent: SvgElement, props: PacifyModule): SvgImageElement | undefined {
	if (props.icon) {
		const width = LOGO.WIDTH;
		const height = LOGO.HEIGHT;

		const x = LOGO.PADDING;
		const y = props.height / 2 - width / 2;

		const svgImage = parent
			.append('image')
			.attr('x', x)
			.attr('y', y)
			.attr('width', width)
			.attr('height', height)
			.attr('xlink:href', 'https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png')
			.attr('class', 'logo');

		return svgImage;
	}
};

export default addPalette;
