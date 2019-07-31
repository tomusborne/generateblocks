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
		default: flexBlocksDefaults.headline.element,
	},
	align: {
		type: 'string',
		default: flexBlocksDefaults.headline.align,
	},
	color: {
		type: 'string',
		default: flexBlocksDefaults.headline.color,
	},
	size: {
		type: 'number',
		default: flexBlocksDefaults.headline.size,
	},
	textTransform: {
		type: 'string',
		default: '',
	},
	lineHeight: {
		type: 'number',
		default: flexBlocksDefaults.headline.lineHeight,
	},
	marginTop: {
		type: 'number',
		default: flexBlocksDefaults.headline.marginTop,
	},
	marginBottom: {
		type: 'number',
		default: flexBlocksDefaults.headline.marginBottom,
	},
	letterSpacing: {
		type: 'number',
		default: flexBlocksDefaults.headline.letterSpacing,
	},
}
