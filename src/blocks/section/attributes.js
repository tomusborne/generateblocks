export default {
	uniqueID: {
		type: 'number',
		default: '',
	},
	tagName: {
		type: 'string',
		default: 'section',
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
