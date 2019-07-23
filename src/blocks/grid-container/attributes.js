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
	columns: {
        type: 'number',
        default: generatepressDefaults.gridContainer.columns,
    },
	horizontalGap: {
        type: 'number',
        default: generatepressDefaults.gridContainer.horizontalGap,
    },
	verticalGap: {
        type: 'number',
        default: generatepressDefaults.gridContainer.verticalGap,
    },
	verticalAlignment: {
        type: 'string',
        default: generatepressDefaults.gridContainer.verticalAlignment,
    },
	horizontalGapTablet: {
        type: 'number',
        default: generatepressDefaults.gridContainer.horizontalGapTablet,
    },
	verticalGapTablet: {
        type: 'number',
        default: generatepressDefaults.gridContainer.verticalGapTablet,
    },
	verticalAlignmentTablet: {
        type: 'string',
        default: generatepressDefaults.gridContainer.verticalAlignmentTablet,
    },
	horizontalGapMobile: {
        type: 'number',
        default: generatepressDefaults.gridContainer.horizontalGapMobile,
    },
	verticalGapMobile: {
        type: 'number',
        default: generatepressDefaults.gridContainer.verticalGapMobile,
    },
	verticalAlignmentMobile: {
        type: 'string',
        default: generatepressDefaults.gridContainer.verticalAlignmentMobile,
    },
}
