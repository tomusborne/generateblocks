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
	url: {
		type: 'string',
		source: 'attribute',
		selector: '.gb-button',
		attribute: 'href',
	},
	hasUrl: {
		type: 'boolean',
	},
	target: {
		type: 'boolean',
	},
	relNoFollow: {
		type: 'boolean',
	},
	relSponsored: {
		type: 'boolean',
	},
	text: {
		type: 'string',
		source: 'html',
		selector: '.gb-button-text',
		default: 'Button',
	},
	ariaLabel: {
		type: 'string',
		default: generateBlocksDefaults.button.ariaLabel,
	},
	blockVersion: {
		type: 'number',
	},
	hasButtonContainer: {
		type: 'boolean',
		default: false,
	},
	variantRole: {
		type: 'string',
		default: '',
	},
	buttonType: {
		type: 'string',
		default: 'link',
	},
	// deprecated since 1.2.0
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
