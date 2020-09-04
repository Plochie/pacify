import { CLASS } from 'src/constants/CLASS';
import { PacifyModule } from 'src/entities';
import PathDragHandler from 'src/svg/PathDragHandler';
import { SvgElement, SvgRectElement } from 'src/svg/types';

const OUTPUT = {
	WIDTH: 15,
	HEIGHT: 15,
};

const addOutput = function (parent: SvgElement, props: PacifyModule): SvgRectElement | undefined {
	// add output
	if (props.outputs && props.outputs.length > 0) {
		const x = props.width - OUTPUT.WIDTH / 2;
		const y = props.height / 2 - OUTPUT.HEIGHT / 2;

		// add output
		const output = parent
			.append('rect')
			.attr('class', CLASS.ACTION.OUTPUT)
			.attr('fill', 'green')
			.attr('width', OUTPUT.WIDTH)
			.attr('height', OUTPUT.HEIGHT)
			.attr('x', x)
			.attr('y', y);

		output.call(PathDragHandler as any);

		return output;
	}
};

export default addOutput;
