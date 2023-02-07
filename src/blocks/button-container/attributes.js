/* eslint-disable no-undef */
export default {
	uniqueId: {
		type: 'string',
		default: '',
	},
	anchor: {
		type: 'string',
		default: '',
	},
	isPagination: {
		type: 'boolean',
		default: false,
	},
	alignment: {
		type: 'string',
		default: generateBlocksDefaults.buttonContainer.alignment,
	},
	alignmentTablet: {
		type: 'string',
		default: generateBlocksDefaults.buttonContainer.alignment,
	},
	alignmentMobile: {
		type: 'string',
		default: generateBlocksDefaults.buttonContainer.alignment,
	},
	isDynamic: {
		type: 'boolean',
	},
	blockVersion: {
		type: 'number',
	},
	// deprecated since 1.2.0.
	elementId: {
		type: 'string',
		default: '',
	},
	cssClasses: {
		type: 'string',
		default: '',
	},
};
/* eslint-enable no-undef */
