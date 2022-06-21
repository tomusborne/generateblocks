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
	icon: {
		type: 'string',
		source: 'html',
		selector: '.gb-icon',
	},
	hasIcon: {
		type: 'boolean',
		default: false,
	},
	iconLocation: {
		type: 'string',
		default: generateBlocksDefaults.button.iconLocation,
	},
	customIcon: {
		type: 'boolean',
		default: false,
	},
	removeText: {
		type: 'boolean',
		default: generateBlocksDefaults.button.removeText,
	},
	ariaLabel: {
		type: 'string',
		default: generateBlocksDefaults.button.ariaLabel,
	},
	backgroundColor: {
		type: 'string',
		default: generateBlocksDefaults.button.backgroundColor,
	},
	backgroundColorOpacity: {
		type: 'number',
		default: generateBlocksDefaults.button.backgroundColorOpacity,
	},
	backgroundColorHover: {
		type: 'string',
		default: generateBlocksDefaults.button.backgroundColorHover,
	},
	backgroundColorHoverOpacity: {
		type: 'number',
		default: generateBlocksDefaults.button.backgroundColorHoverOpacity,
	},
	backgroundColorCurrent: {
		type: 'string',
		default: generateBlocksDefaults.button.backgroundColorCurrent,
	},
	textColor: {
		type: 'string',
		default: generateBlocksDefaults.button.textColor,
	},
	textColorHover: {
		type: 'string',
		default: generateBlocksDefaults.button.textColorHover,
	},
	textColorCurrent: {
		type: 'string',
		default: generateBlocksDefaults.button.textColorCurrent,
	},
	borderColor: {
		type: 'string',
		default: generateBlocksDefaults.button.borderColor,
	},
	borderColorOpacity: {
		type: 'number',
		default: generateBlocksDefaults.button.borderColorOpacity,
	},
	borderColorHover: {
		type: 'string',
		default: generateBlocksDefaults.button.borderColorHover,
	},
	borderColorHoverOpacity: {
		type: 'number',
		default: generateBlocksDefaults.button.borderColorHoverOpacity,
	},
	borderColorCurrent: {
		type: 'string',
		default: generateBlocksDefaults.button.borderColorCurrent,
	},
	fontFamily: {
		type: 'string',
		default: generateBlocksDefaults.button.fontFamily,
	},
	fontFamilyFallback: {
		type: 'string',
		default: generateBlocksDefaults.button.fontFamilyFallback,
	},
	googleFont: {
		type: 'boolean',
		default: generateBlocksDefaults.button.googleFont,
	},
	googleFontVariants: {
		type: 'string',
		default: generateBlocksDefaults.button.googleFontVariants,
	},
	fontWeight: {
		type: 'string',
		default: generateBlocksDefaults.button.fontWeight,
	},
	fontSize: {
		type: 'number',
		default: generateBlocksDefaults.button.fontSize,
	},
	fontSizeTablet: {
		type: 'number',
		default: generateBlocksDefaults.button.fontSizeTablet,
	},
	fontSizeMobile: {
		type: 'number',
		default: generateBlocksDefaults.button.fontSizeMobile,
	},
	fontSizeUnit: {
		type: 'string',
		default: generateBlocksDefaults.button.fontSizeUnit,
	},
	textTransform: {
		type: 'string',
		default: generateBlocksDefaults.button.textTransform,
	},
	letterSpacing: {
		type: 'number',
		default: generateBlocksDefaults.button.letterSpacing,
	},
	letterSpacingTablet: {
		type: 'number',
		default: generateBlocksDefaults.button.letterSpacingTablet,
	},
	letterSpacingMobile: {
		type: 'number',
		default: generateBlocksDefaults.button.letterSpacingMobile,
	},
	marginTop: {
		type: 'string',
		default: generateBlocksDefaults.button.marginTop,
	},
	marginRight: {
		type: 'string',
		default: generateBlocksDefaults.button.marginRight,
	},
	marginBottom: {
		type: 'string',
		default: generateBlocksDefaults.button.marginBottom,
	},
	marginLeft: {
		type: 'string',
		default: generateBlocksDefaults.button.marginLeft,
	},
	marginUnit: {
		type: 'string',
		default: generateBlocksDefaults.button.marginUnit,
	},
	marginTopTablet: {
		type: 'string',
		default: generateBlocksDefaults.button.marginTopTablet,
	},
	marginRightTablet: {
		type: 'string',
		default: generateBlocksDefaults.button.marginRightTablet,
	},
	marginBottomTablet: {
		type: 'string',
		default: generateBlocksDefaults.button.marginBottomTablet,
	},
	marginLeftTablet: {
		type: 'string',
		default: generateBlocksDefaults.button.marginLeftTablet,
	},
	marginTopMobile: {
		type: 'string',
		default: generateBlocksDefaults.button.marginTopMobile,
	},
	marginRightMobile: {
		type: 'string',
		default: generateBlocksDefaults.button.marginRightMobile,
	},
	marginBottomMobile: {
		type: 'string',
		default: generateBlocksDefaults.button.marginBottomMobile,
	},
	marginLeftMobile: {
		type: 'string',
		default: generateBlocksDefaults.button.marginLeftMobile,
	},
	paddingTop: {
		type: 'string',
		default: generateBlocksDefaults.button.paddingTop,
	},
	paddingRight: {
		type: 'string',
		default: generateBlocksDefaults.button.paddingRight,
	},
	paddingBottom: {
		type: 'string',
		default: generateBlocksDefaults.button.paddingBottom,
	},
	paddingLeft: {
		type: 'string',
		default: generateBlocksDefaults.button.paddingLeft,
	},
	paddingUnit: {
		type: 'string',
		default: generateBlocksDefaults.button.paddingUnit,
	},
	paddingTopTablet: {
		type: 'string',
		default: generateBlocksDefaults.button.paddingTopTablet,
	},
	paddingRightTablet: {
		type: 'string',
		default: generateBlocksDefaults.button.paddingRightTablet,
	},
	paddingBottomTablet: {
		type: 'string',
		default: generateBlocksDefaults.button.paddingBottomTablet,
	},
	paddingLeftTablet: {
		type: 'string',
		default: generateBlocksDefaults.button.paddingLeftTablet,
	},
	paddingTopMobile: {
		type: 'string',
		default: generateBlocksDefaults.button.paddingTopMobile,
	},
	paddingRightMobile: {
		type: 'string',
		default: generateBlocksDefaults.button.paddingRightMobile,
	},
	paddingBottomMobile: {
		type: 'string',
		default: generateBlocksDefaults.button.paddingBottomMobile,
	},
	paddingLeftMobile: {
		type: 'string',
		default: generateBlocksDefaults.button.paddingLeftMobile,
	},
	borderSizeTop: {
		type: 'string',
		default: generateBlocksDefaults.button.borderSizeTop,
	},
	borderSizeRight: {
		type: 'string',
		default: generateBlocksDefaults.button.borderSizeRight,
	},
	borderSizeBottom: {
		type: 'string',
		default: generateBlocksDefaults.button.borderSizeBottom,
	},
	borderSizeLeft: {
		type: 'string',
		default: generateBlocksDefaults.button.borderSizeLeft,
	},
	borderSizeTopTablet: {
		type: 'string',
		default: generateBlocksDefaults.button.borderSizeTopTablet,
	},
	borderSizeRightTablet: {
		type: 'string',
		default: generateBlocksDefaults.button.borderSizeRightTablet,
	},
	borderSizeBottomTablet: {
		type: 'string',
		default: generateBlocksDefaults.button.borderSizeBottomTablet,
	},
	borderSizeLeftTablet: {
		type: 'string',
		default: generateBlocksDefaults.button.borderSizeLeftTablet,
	},
	borderSizeTopMobile: {
		type: 'string',
		default: generateBlocksDefaults.button.borderSizeTopMobile,
	},
	borderSizeRightMobile: {
		type: 'string',
		default: generateBlocksDefaults.button.borderSizeRightMobile,
	},
	borderSizeBottomMobile: {
		type: 'string',
		default: generateBlocksDefaults.button.borderSizeBottomMobile,
	},
	borderSizeLeftMobile: {
		type: 'string',
		default: generateBlocksDefaults.button.borderSizeLeftMobile,
	},
	borderRadiusTopRight: {
		type: 'string',
		default: generateBlocksDefaults.button.borderRadiusTopRight,
	},
	borderRadiusBottomRight: {
		type: 'string',
		default: generateBlocksDefaults.button.borderRadiusBottomRight,
	},
	borderRadiusBottomLeft: {
		type: 'string',
		default: generateBlocksDefaults.button.borderRadiusBottomLeft,
	},
	borderRadiusTopLeft: {
		type: 'string',
		default: generateBlocksDefaults.button.borderRadiusTopLeft,
	},
	borderRadiusUnit: {
		type: 'string',
		default: generateBlocksDefaults.button.borderRadiusUnit,
	},
	borderRadiusTopRightTablet: {
		type: 'string',
		default: generateBlocksDefaults.button.borderRadiusTopRightTablet,
	},
	borderRadiusBottomRightTablet: {
		type: 'string',
		default: generateBlocksDefaults.button.borderRadiusBottomRightTablet,
	},
	borderRadiusBottomLeftTablet: {
		type: 'string',
		default: generateBlocksDefaults.button.borderRadiusBottomLeftTablet,
	},
	borderRadiusTopLeftTablet: {
		type: 'string',
		default: generateBlocksDefaults.button.borderRadiusTopLeftTablet,
	},
	borderRadiusTopRightMobile: {
		type: 'string',
		default: generateBlocksDefaults.button.borderRadiusTopRightMobile,
	},
	borderRadiusBottomRightMobile: {
		type: 'string',
		default: generateBlocksDefaults.button.borderRadiusBottomRightMobile,
	},
	borderRadiusBottomLeftMobile: {
		type: 'string',
		default: generateBlocksDefaults.button.borderRadiusBottomLeftMobile,
	},
	borderRadiusTopLeftMobile: {
		type: 'string',
		default: generateBlocksDefaults.button.borderRadiusTopLeftMobile,
	},
	gradient: {
		type: 'boolean',
		default: generateBlocksDefaults.button.gradient,
	},
	gradientDirection: {
		type: 'number',
		default: generateBlocksDefaults.button.gradientDirection,
	},
	gradientColorOne: {
		type: 'string',
		default: generateBlocksDefaults.button.gradientColorOne,
	},
	gradientColorOneOpacity: {
		type: 'number',
		default: generateBlocksDefaults.button.gradientColorOneOpacity,
	},
	gradientColorStopOne: {
		type: 'number',
		default: generateBlocksDefaults.button.gradientColorStopOne,
	},
	gradientColorTwo: {
		type: 'string',
		default: generateBlocksDefaults.button.gradientColorTwo,
	},
	gradientColorTwoOpacity: {
		type: 'number',
		default: generateBlocksDefaults.button.gradientColorTwoOpacity,
	},
	gradientColorStopTwo: {
		type: 'number',
		default: generateBlocksDefaults.button.gradientColorStopTwo,
	},
	iconPaddingTop: {
		type: 'string',
		default: generateBlocksDefaults.button.iconPaddingTop,
	},
	iconPaddingRight: {
		type: 'string',
		default: generateBlocksDefaults.button.iconPaddingRight,
	},
	iconPaddingBottom: {
		type: 'string',
		default: generateBlocksDefaults.button.iconPaddingBottom,
	},
	iconPaddingLeft: {
		type: 'string',
		default: generateBlocksDefaults.button.iconPaddingLeft,
	},
	iconPaddingTopTablet: {
		type: 'string',
		default: generateBlocksDefaults.button.iconPaddingTopTablet,
	},
	iconPaddingRightTablet: {
		type: 'string',
		default: generateBlocksDefaults.button.iconPaddingRightTablet,
	},
	iconPaddingBottomTablet: {
		type: 'string',
		default: generateBlocksDefaults.button.iconPaddingBottomTablet,
	},
	iconPaddingLeftTablet: {
		type: 'string',
		default: generateBlocksDefaults.button.iconPaddingLeftTablet,
	},
	iconPaddingTopMobile: {
		type: 'string',
		default: generateBlocksDefaults.button.iconPaddingTopMobile,
	},
	iconPaddingRightMobile: {
		type: 'string',
		default: generateBlocksDefaults.button.iconPaddingRightMobile,
	},
	iconPaddingBottomMobile: {
		type: 'string',
		default: generateBlocksDefaults.button.iconPaddingBottomMobile,
	},
	iconPaddingLeftMobile: {
		type: 'string',
		default: generateBlocksDefaults.button.iconPaddingLeftMobile,
	},
	iconPaddingUnit: {
		type: 'string',
		default: generateBlocksDefaults.button.iconPaddingUnit,
	},
	iconPaddingSyncUnits: {
		type: 'boolean',
		default: false,
	},
	iconSize: {
		type: 'number',
		default: generateBlocksDefaults.button.iconSize,
	},
	iconSizeTablet: {
		type: 'number',
		default: generateBlocksDefaults.button.iconSizeTablet,
	},
	iconSizeMobile: {
		type: 'number',
		default: generateBlocksDefaults.button.iconSizeMobile,
	},
	iconSizeUnit: {
		type: 'string',
		default: generateBlocksDefaults.button.iconSizeUnit,
	},
	blockVersion: {
		type: 'number',
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
