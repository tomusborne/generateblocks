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
	columns: {
		type: 'number',
		default: '',
	},
	horizontalGap: {
		type: 'string',
		default: generateBlocksDefaults.gridContainer.horizontalGap,
	},
	verticalGap: {
		type: 'string',
		default: generateBlocksDefaults.gridContainer.verticalGap,
	},
	verticalAlignment: {
		type: 'string',
		default: generateBlocksDefaults.gridContainer.verticalAlignment,
	},
	horizontalGapTablet: {
		type: 'string',
		default: generateBlocksDefaults.gridContainer.horizontalGapTablet,
	},
	verticalGapTablet: {
		type: 'string',
		default: generateBlocksDefaults.gridContainer.verticalGapTablet,
	},
	verticalAlignmentTablet: {
		type: 'string',
		default: generateBlocksDefaults.gridContainer.verticalAlignmentTablet,
	},
	horizontalGapMobile: {
		type: 'string',
		default: generateBlocksDefaults.gridContainer.horizontalGapMobile,
	},
	verticalGapMobile: {
		type: 'string',
		default: generateBlocksDefaults.gridContainer.verticalGapMobile,
	},
	verticalAlignmentMobile: {
		type: 'string',
		default: generateBlocksDefaults.gridContainer.verticalAlignmentMobile,
	},
	horizontalAlignment: {
		type: 'string',
		default: generateBlocksDefaults.gridContainer.horizontalAlignment,
	},
	horizontalAlignmentTablet: {
		type: 'string',
		default: generateBlocksDefaults.gridContainer.horizontalAlignmentTablet,
	},
	horizontalAlignmentMobile: {
		type: 'string',
		default: generateBlocksDefaults.gridContainer.horizontalAlignmentMobile,
	},
	isDynamic: {
		type: 'boolean',
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
