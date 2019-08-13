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
	paddingTop: {
		type: 'string',
		default: flexBlocksDefaults.button.paddingTop,
	},
	paddingRight: {
		type: 'string',
		default: flexBlocksDefaults.button.paddingRight,
	},
	paddingBottom: {
		type: 'string',
		default: flexBlocksDefaults.button.paddingBottom,
	},
	paddingLeft: {
		type: 'string',
		default: flexBlocksDefaults.button.paddingLeft,
	},
	borderSizeTop: {
		type: 'string',
		default: flexBlocksDefaults.button.borderSizeTop,
	},
	borderSizeRight: {
		type: 'string',
		default: flexBlocksDefaults.button.borderSizeRight,
	},
	borderSizeBottom: {
		type: 'string',
		default: flexBlocksDefaults.button.borderSizeBottom,
	},
	borderSizeLeft: {
		type: 'string',
		default: flexBlocksDefaults.button.borderSizeLeft,
	},
	borderRadiusTopRight: {
		type: 'string',
		default: flexBlocksDefaults.button.borderRadiusTopRight,
	},
	borderRadiusBottomRight: {
		type: 'string',
		default: flexBlocksDefaults.button.borderRadiusBottomRight,
	},
	borderRadiusBottomLeft: {
		type: 'string',
		default: flexBlocksDefaults.button.borderRadiusBottomLeft,
	},
	borderRadiusTopLeft: {
		type: 'string',
		default: flexBlocksDefaults.button.borderRadiusTopLeft,
	},
}
