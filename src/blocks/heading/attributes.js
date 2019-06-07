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
	level: {
		type: 'number',
		default: 2,
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
	headingLoadGoogleFonts: {
		type: "boolean",
		default: false
	},
}
