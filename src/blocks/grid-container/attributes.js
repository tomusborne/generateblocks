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
}
