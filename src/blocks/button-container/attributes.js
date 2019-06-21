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
	paddingTop: {
		type: 'number',
		default: generatepressDefaults.buttonContainer.paddingTop
	},
	paddingRight: {
		type: 'number',
		default: generatepressDefaults.buttonContainer.paddingRight
	},
	paddingBottom: {
		type: 'number',
		default: generatepressDefaults.buttonContainer.paddingBottom
	},
	paddingLeft: {
		type: 'number',
		default: generatepressDefaults.buttonContainer.paddingLeft
	},
	paddingTopMobile: {
		type: 'number',
		default: generatepressDefaults.buttonContainer.paddingTopMobile
	},
	paddingRightMobile: {
		type: 'number',
		default: generatepressDefaults.buttonContainer.paddingRightMobile
	},
	paddingBottomMobile: {
		type: 'number',
		default: generatepressDefaults.buttonContainer.paddingBottomMobile
	},
	paddingLeftMobile: {
		type: 'number',
		default: generatepressDefaults.buttonContainer.paddingLeftMobile
	},
}
