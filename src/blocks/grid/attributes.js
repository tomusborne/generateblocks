export default {
	uniqueId: {
		type: 'string',
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
        default: flexBlocksDefaults.gridContainer.columns,
    },
	horizontalGap: {
        type: 'number',
        default: flexBlocksDefaults.gridContainer.horizontalGap,
    },
	verticalGap: {
        type: 'number',
        default: flexBlocksDefaults.gridContainer.verticalGap,
    },
	verticalAlignment: {
        type: 'string',
        default: flexBlocksDefaults.gridContainer.verticalAlignment,
    },
	horizontalGapTablet: {
        type: 'number',
        default: flexBlocksDefaults.gridContainer.horizontalGapTablet,
    },
	verticalGapTablet: {
        type: 'number',
        default: flexBlocksDefaults.gridContainer.verticalGapTablet,
    },
	verticalAlignmentTablet: {
        type: 'string',
        default: flexBlocksDefaults.gridContainer.verticalAlignmentTablet,
    },
	horizontalGapMobile: {
        type: 'number',
        default: flexBlocksDefaults.gridContainer.horizontalGapMobile,
    },
	verticalGapMobile: {
        type: 'number',
        default: flexBlocksDefaults.gridContainer.verticalGapMobile,
    },
	verticalAlignmentMobile: {
        type: 'string',
        default: flexBlocksDefaults.gridContainer.verticalAlignmentMobile,
    },
	horizontalAlignment: {
        type: 'string',
        default: flexBlocksDefaults.gridContainer.horizontalAlignment,
    },
	horizontalAlignmentTablet: {
        type: 'string',
        default: flexBlocksDefaults.gridContainer.horizontalAlignmentTablet,
    },
	horizontalAlignmentMobile: {
        type: 'string',
        default: flexBlocksDefaults.gridContainer.horizontalAlignmentMobile,
    },
}
