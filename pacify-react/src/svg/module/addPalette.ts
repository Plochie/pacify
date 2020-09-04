import * as d3 from 'd3';
import { Subject } from 'rxjs';
import { CLASS } from 'src/constants/CLASS';
import { PacifyModule } from 'src/entities';
import { PacifyUserDataModule } from 'src/entities/PacifyUserDataModule';
import GroupDragHandler from 'src/svg/GroupDragHandler';
import addInput from 'src/svg/module/addInput';
import addOutput from 'src/svg/module/addOutput';
import { SvgElement, SvgImageElement, SvgModuleElement, SvgModuleElementDatum, SvgRectElement, SvgTextElement } from 'src/svg/types';

export const moduleContextMenuSubject = new Subject<SVGGElement>();

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
const moduleContextMenuHandler = function (this: SVGGElement, datum: SvgModuleElementDatum, i: any) {
	d3.event.preventDefault();
	moduleContextMenuSubject.next(this);
};

const addPalette = function (
	parent: SvgElement,
	staticProps: PacifyModule,
	userDataProps: PacifyUserDataModule,
): {
	g: SvgModuleElement;
	input: SvgRectElement | undefined;
	output: SvgRectElement | undefined;
} {
	// check x and y coordinates are provided for group
	if (!userDataProps.x) userDataProps.x = 20;
	if (!userDataProps.y) userDataProps.y = 20;

	const datumG: SvgModuleElementDatum = { x: userDataProps.x, y: userDataProps.y, drag: false, from: [], to: [], data: staticProps };

	const g: SvgModuleElement = parent
		.append('g')
		.datum(datumG)
		.attr('class', CLASS.ACTION.WRAPPER)
		.attr('transform', function (d) {
			return 'translate(' + d.x + ' ' + d.y + ')';
		})
		.call(GroupDragHandler as any);
	// add wrapper
	g.append('rect')
		.attr('class', CLASS.ACTION.MAIN)
		.attr('fill', 'orange')
		.attr('width', staticProps.width)
		.attr('height', staticProps.height);

	// add input
	const input = addInput(g, staticProps);
	// add output
	const output = addOutput(g, staticProps);
	// add logo
	addLogo(g, staticProps);
	// add title
	addTitle(g, staticProps);

	g.on('contextmenu', moduleContextMenuHandler);

	return { g, input, output };
};

const addTitle = function (parent: SvgElement, props: PacifyModule): SvgTextElement {
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
