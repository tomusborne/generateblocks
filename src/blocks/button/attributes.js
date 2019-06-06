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
	url: {
        type: 'string',
        source: 'attribute',
        selector: 'a.gp-button',
        attribute: 'href',
    },
    target: {
        type: 'string',
        source: 'attribute',
        selector: 'a.gp-button',
        attribute: 'target',
    },
    rel: {
        type: 'string',
        source: 'attribute',
        selector: 'a.gp-button',
        attribute: 'rel',
    },
	text: {
		type: 'array',
		source: 'children',
		selector: '.gp-button .button-text',
		default: 'Button',
	},
	backgroundColor: {
        type: 'string',
        default: '#0366d6',
    },
	textColor: {
        type: 'string',
        default: '#ffffff',
    },
	backgroundColorHover: {
        type: 'string',
        default: '#222222',
    },
	textColorHover: {
        type: 'string',
        default: '#ffffff',
    },
	borderRadius: {
		type: 'number',
		default: 2,
	},
	fontSize: {
		type: 'number',
		default: 1,
	},
	gap: {
		type: 'number',
		default: 25
	},
}
