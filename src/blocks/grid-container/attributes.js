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
        default: 2,
    },
	horizontalGap: {
        type: 'number',
        default: 30,
    },
	verticalGap: {
        type: 'number',
        default: 30,
    },
	verticalAlignment: {
        type: 'string',
        default: 'flex-start',
    },
}
