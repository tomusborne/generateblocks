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
	element: {
		type: 'string',
		default: 'h2',
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
