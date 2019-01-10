export default {
	uniqueID: {
		type: 'number',
		default: '',
	},
	tagName: {
		type: 'string',
		default: 'section',
	},
	elementID: {
		type: 'string',
		default: '',
	},
	cssClasses: {
		type: 'string',
		default: '',
	},
	outerContainer: {
		type: 'string',
		default: 'full',
	},
	innerContainer: {
		type: 'string',
		default: 'contained',
	},
	paddingTop: {
		type: 'number',
		default: 0
	},
	paddingRight: {
		type: 'number',
		default: 0
	},
	paddingBottom: {
		type: 'number',
		default: 0
	},
	paddingLeft: {
		type: 'number',
		default: 0
	},
	backgroundColor: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
	linkColor: {
		type: 'string',
		default: ''
	},
	linkColorHover: {
		type: 'string',
		default: ''
	},
	bgImage: {
		type: 'object',
		default: null,
	},
	bgOptions: {
		type: 'object',
		default: {
			overlay: false,
			parallax: false,
		}
	},
}
