import 'src/App.scss';
import addPalette from 'src/svg/module/addPalette';
import { connectPalettes } from 'src/svg/PathDragHandler';

// TODO: remove this
export const generateTestingUI = (d3Svg: any) => {
	const test1 = addPalette(
		d3Svg,
		{
			id: -1,
			title: 'Module 1',
			sid: 'mod1',
			width: 140,
			height: 50,
			icon: `${process.env.PUBLIC_URL}/logo192.png`,
			isShared: false,
			isStarter: false,
			inputs: [{ sid: 'input', title: 'input' }],
			outputs: [{ sid: 'otput', title: 'output' }],
		},
		{ x: 400, y: 50 },
	);
	const test2 = addPalette(
		d3Svg,
		{
			id: -2,
			title: 'Module 2',
			sid: 'mod2',
			width: 140,
			height: 50,
			isShared: false,
			isStarter: false,
			inputs: [{ sid: 'input', title: 'input' }],
			outputs: [{ sid: 'otput', title: 'output' }],
		},
		{ x: 100, y: 200 },
	);
	const test3 = addPalette(
		d3Svg,
		{
			id: -3,
			title: 'Module 3',
			sid: 'mod3',
			width: 140,
			height: 50,
			isShared: false,
			isStarter: false,
			inputs: [{ sid: 'input', title: 'input' }],
			outputs: [{ sid: 'otput', title: 'output' }],
		},
		{ x: 700, y: 350 },
	);
	addPalette(
		d3Svg,
		{
			id: -4,
			title: 'Module 4',
			sid: 'mod4',
			width: 140,
			height: 50,
			isShared: false,
			isStarter: false,
			inputs: [{ sid: 'input', title: 'input' }],
			outputs: [{ sid: 'otput', title: 'output' }],
		},
		{ x: 400, y: 500 },
	);

	connectPalettes(test2.output?.node() as any, test1.input?.node() as any);
	connectPalettes(test1.output?.node() as any, test3.input?.node() as any);
	connectPalettes(test2.output?.node() as any, test3.input?.node() as any);
};
