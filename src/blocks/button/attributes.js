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
        selector: 'a.fx-button',
        attribute: 'href',
    },
    target: {
        type: 'string',
        source: 'attribute',
        selector: 'a.fx-button',
        attribute: 'target',
    },
    rel: {
        type: 'string',
        source: 'attribute',
        selector: 'a.fx-button',
        attribute: 'rel',
    },
	text: {
		type: 'array',
		source: 'children',
		selector: '.fx-button .button-text',
		default: 'Button',
	},
	backgroundColor: {
        type: 'string',
        default: flexBlocksDefaults.button.backgroundColor,
    },
	textColor: {
        type: 'string',
        default: flexBlocksDefaults.button.textColor,
    },
	backgroundColorHover: {
        type: 'string',
        default: flexBlocksDefaults.button.backgroundColorHover,
    },
	textColorHover: {
        type: 'string',
        default: flexBlocksDefaults.button.textColorHover,
    },
	borderColor: {
		type: 'string',
		default: flexBlocksDefaults.button.borderColor,
	},
	borderColorHover: {
		type: 'string',
		default: flexBlocksDefaults.button.borderColorHover,
	},
	fontSize: {
		type: 'number',
		default: flexBlocksDefaults.button.fontSize,
	},
	textTransform: {
		type: 'string',
		default: '',
	},
	gap: {
		type: 'number',
		default: flexBlocksDefaults.button.gap,
	},
	borderSizeTop: {
		type: 'number',
		default: flexBlocksDefaults.button.borderSizeTop,
	},
	borderSizeRight: {
		type: 'number',
		default: flexBlocksDefaults.button.borderSizeRight,
	},
	borderSizeBottom: {
		type: 'number',
		default: flexBlocksDefaults.button.borderSizeBottom,
	},
	borderSizeLeft: {
		type: 'number',
		default: flexBlocksDefaults.button.borderSizeLeft,
	},
	borderRadiusTopRight: {
		type: 'number',
		default: flexBlocksDefaults.button.borderRadiusTopRight,
	},
	borderRadiusBottomRight: {
		type: 'number',
		default: flexBlocksDefaults.button.borderRadiusBottomRight,
	},
	borderRadiusBottomLeft: {
		type: 'number',
		default: flexBlocksDefaults.button.borderRadiusBottomLeft,
	},
	borderRadiusTopLeft: {
		type: 'number',
		default: flexBlocksDefaults.button.borderRadiusTopLeft,
	},
}
