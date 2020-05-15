import * as d3Selection from 'd3-selection';

// shorten d3 selection interface for svg container
export interface SvgElement
	extends d3Selection.Selection<SVGGElement | SVGSVGElement | SVGRectElement | SVGPathElement, any, null, undefined> {}

// group
export interface SvgGElementDatum {
	x: number;
	y: number;
	drag: boolean;
	from?: SVGElement[];
	to?: SVGElement[];
}
export interface SvgGElement extends d3Selection.Selection<SVGGElement, SvgGElementDatum, null, undefined> {}

// svg
export interface SvgSvgElement extends d3Selection.Selection<SVGSVGElement, unknown, null, undefined> {}

// Rect
export interface SvgRectElement extends d3Selection.Selection<SVGRectElement, unknown, null, undefined> {}

// Text
export interface SvgTextElement extends d3Selection.Selection<SVGTextElement, unknown, null, undefined> {}

// Image
export interface SvgImageElement extends d3Selection.Selection<SVGImageElement, unknown, null, undefined> {}

// path
export interface SvgPathElementDatum {
	from?: SVGElement;
	to?: SVGElement;
	points: { x: number; y: number }[];
}
export interface SvgPathElement extends d3Selection.Selection<SVGPathElement, SvgPathElementDatum, null, undefined> {}
