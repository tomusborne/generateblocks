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
	content: {
		type: 'string',
		source: 'html',
		selector: '.gb-headline-text',
	},
	alignment: {
		type: 'string',
		default: generateBlocksDefaults.headline.alignment,
	},
	alignmentTablet: {
		type: 'string',
		default: generateBlocksDefaults.headline.alignmentTablet,
	},
	alignmentMobile: {
		type: 'string',
		default: generateBlocksDefaults.headline.alignmentMobile,
	},
	ariaLabel: {
		type: 'string',
		default: generateBlocksDefaults.headline.ariaLabel,
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
