export default {
	uniqueID: {
		type: 'string',
		default: '',
	},
	cssClasses: {
		type: 'string',
		default: '',
	},
	tagName: {
		type: 'string',
		default: 'section',
	},
	outerContainer: {
		type: 'string',
		default: 'full',
	},
	innerContainer: {
		type: 'string',
		default: 'contained',
	},
	spacingTop: {
		type: 'number',
		default: 0
	},
	spacingRight: {
		type: 'number',
		default: 0
	},
	spacingBottom: {
		type: 'number',
		default: 0
	},
	spacingLeft: {
		type: 'number',
		default: 0
	},
	backgroundColor: {
		type: 'string',
	},
	customBackgroundColor: {
		type: 'string',
	},
	customTextColor: {
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
