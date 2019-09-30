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
	icon: {
        type: 'string',
        default: flexBlocksDefaults.button.icon,
    },
	iconLocation: {
        type: 'string',
        default: flexBlocksDefaults.button.iconLocation,
    },
	customIcon: {
		type: 'boolean',
		default: false,
	},
	removeText: {
		type: 'boolean',
		default: flexBlocksDefaults.button.removeText,
	},
	ariaLabel: {
		type: 'string',
		default: flexBlocksDefaults.button.ariaLabel,
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
	fontSizeTablet: {
		type: 'number',
		default: flexBlocksDefaults.button.fontSizeTablet,
	},
	fontSizeMobile: {
		type: 'number',
		default: flexBlocksDefaults.button.fontSizeMobile,
	},
	textTransform: {
		type: 'string',
		default: flexBlocksDefaults.button.textTransform,
	},
	marginTop: {
		type: 'string',
		default: flexBlocksDefaults.button.marginTop,
	},
	marginRight: {
		type: 'string',
		default: flexBlocksDefaults.button.marginRight,
	},
	marginBottom: {
		type: 'string',
		default: flexBlocksDefaults.button.marginBottom,
	},
	marginLeft: {
		type: 'string',
		default: flexBlocksDefaults.button.marginLeft,
	},
	marginUnit: {
		type: 'string',
		default: flexBlocksDefaults.button.marginUnit,
	},
	marginTopTablet: {
		type: 'string',
		default: flexBlocksDefaults.button.marginTopTablet,
	},
	marginRightTablet: {
		type: 'string',
		default: flexBlocksDefaults.button.marginRightTablet,
	},
	marginBottomTablet: {
		type: 'string',
		default: flexBlocksDefaults.button.marginBottomTablet,
	},
	marginLeftTablet: {
		type: 'string',
		default: flexBlocksDefaults.button.marginLeftTablet,
	},
	marginTopMobile: {
		type: 'string',
		default: flexBlocksDefaults.button.marginTopMobile,
	},
	marginRightMobile: {
		type: 'string',
		default: flexBlocksDefaults.button.marginRightMobile,
	},
	marginBottomMobile: {
		type: 'string',
		default: flexBlocksDefaults.button.marginBottomMobile,
	},
	marginLeftMobile: {
		type: 'string',
		default: flexBlocksDefaults.button.marginLeftMobile,
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
	paddingUnit: {
		type: 'string',
		default: flexBlocksDefaults.button.paddingUnit,
	},
	paddingTopTablet: {
		type: 'string',
		default: flexBlocksDefaults.button.paddingTopTablet,
	},
	paddingRightTablet: {
		type: 'string',
		default: flexBlocksDefaults.button.paddingRightTablet,
	},
	paddingBottomTablet: {
		type: 'string',
		default: flexBlocksDefaults.button.paddingBottomTablet,
	},
	paddingLeftTablet: {
		type: 'string',
		default: flexBlocksDefaults.button.paddingLeftTablet,
	},
	paddingTopMobile: {
		type: 'string',
		default: flexBlocksDefaults.button.paddingTopMobile,
	},
	paddingRightMobile: {
		type: 'string',
		default: flexBlocksDefaults.button.paddingRightMobile,
	},
	paddingBottomMobile: {
		type: 'string',
		default: flexBlocksDefaults.button.paddingBottomMobile,
	},
	paddingLeftMobile: {
		type: 'string',
		default: flexBlocksDefaults.button.paddingLeftMobile,
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
	borderSizeTopTablet: {
		type: 'string',
		default: flexBlocksDefaults.button.borderSizeTopTablet,
	},
	borderSizeRightTablet: {
		type: 'string',
		default: flexBlocksDefaults.button.borderSizeRightTablet,
	},
	borderSizeBottomTablet: {
		type: 'string',
		default: flexBlocksDefaults.button.borderSizeBottomTablet,
	},
	borderSizeLeftTablet: {
		type: 'string',
		default: flexBlocksDefaults.button.borderSizeLeftTablet,
	},
	borderSizeTopMobile: {
		type: 'string',
		default: flexBlocksDefaults.button.borderSizeTopMobile,
	},
	borderSizeRightMobile: {
		type: 'string',
		default: flexBlocksDefaults.button.borderSizeRightMobile,
	},
	borderSizeBottomMobile: {
		type: 'string',
		default: flexBlocksDefaults.button.borderSizeBottomMobile,
	},
	borderSizeLeftMobile: {
		type: 'string',
		default: flexBlocksDefaults.button.borderSizeLeftMobile,
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
	borderRadiusUnit: {
		type: 'string',
		default: flexBlocksDefaults.button.borderRadiusUnit,
	},
	borderRadiusTopRightTablet: {
		type: 'string',
		default: flexBlocksDefaults.button.borderRadiusTopRightTablet,
	},
	borderRadiusBottomRightTablet: {
		type: 'string',
		default: flexBlocksDefaults.button.borderRadiusBottomRightTablet,
	},
	borderRadiusBottomLeftTablet: {
		type: 'string',
		default: flexBlocksDefaults.button.borderRadiusBottomLeftTablet,
	},
	borderRadiusTopLeftTablet: {
		type: 'string',
		default: flexBlocksDefaults.button.borderRadiusTopLeftTablet,
	},
	borderRadiusTopRightMobile: {
		type: 'string',
		default: flexBlocksDefaults.button.borderRadiusTopRightMobile,
	},
	borderRadiusBottomRightMobile: {
		type: 'string',
		default: flexBlocksDefaults.button.borderRadiusBottomRightMobile,
	},
	borderRadiusBottomLeftMobile: {
		type: 'string',
		default: flexBlocksDefaults.button.borderRadiusBottomLeftMobile,
	},
	borderRadiusTopLeftMobile: {
		type: 'string',
		default: flexBlocksDefaults.button.borderRadiusTopLeftMobile,
	},
}
