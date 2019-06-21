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
		selector: 'h1,h2,h3,h4,h5,h6',
	},
	element: {
		type: 'string',
		default: 'p',
	},
	align: {
		type: 'string',
		default: '',
	},
	color: {
		type: 'string',
		default: '',
	},
	size: {
		type: 'number',
		default: '',
	},
	lineHeight: {
		type: 'number',
		default: '',
	},
	marginTop: {
		type: 'number',
		default: '',
	},
	marginBottom: {
		type: 'number',
		default: '25',
	},
	latterSpacing: {
		type: 'number',
		default: '',
	},
}
