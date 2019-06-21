export default {
	uniqueId: {
		type: 'number',
		default: '',
	},
	elementId: {
		type: 'string',
		default: '',
	},
	cssClasses: {
		type: 'string',
		default: '',
	},
	content: {
		type: 'array',
		source: 'children',
		selector: 'p,h1,h2,h3,h4,h5,h6',
	},
	element: {
		type: 'string',
		default: generatepressDefaults.headline.element,
	},
	align: {
		type: 'string',
		default: generatepressDefaults.headline.align,
	},
	color: {
		type: 'string',
		default: generatepressDefaults.headline.color,
	},
	size: {
		type: 'number',
		default: generatepressDefaults.headline.size,
	},
	lineHeight: {
		type: 'number',
		default: generatepressDefaults.headline.lineHeight,
	},
	marginTop: {
		type: 'number',
		default: generatepressDefaults.headline.marginTop,
	},
	marginBottom: {
		type: 'number',
		default: generatepressDefaults.headline.marginBottom,
	},
	letterSpacing: {
		type: 'number',
		default: generatepressDefaults.headline.letterSpacing,
	},
}
