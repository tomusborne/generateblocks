export default {
	uniqueId: {
		type: 'number',
		default: '',
	},
	tagName: {
		type: 'string',
		default: 'section',
	},
	elementId: {
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
		default: 10
	},
	paddingRight: {
		type: 'number',
		default: 10
	},
	paddingBottom: {
		type: 'number',
		default: 10
	},
	paddingLeft: {
		type: 'number',
		default: 10
	},
	paddingTopMobile: {
		type: 'number',
		default: 10
	},
	paddingRightMobile: {
		type: 'number',
		default: 10
	},
	paddingBottomMobile: {
		type: 'number',
		default: 10
	},
	paddingLeftMobile: {
		type: 'number',
		default: 10
	},
	columnGutter: {
		type: 'number',
		default: '',
	},
	columnGutterMobile: {
		type: 'number',
		default: '',
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
			position: 'center center',
			size: 'cover',
			repeat: 'no-repeat',
			attachment: '',
		}
	},
}
