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
	content: {
		type: 'array',
		source: 'children',
		selector: 'p,h1,h2,h3,h4,h5,h6',
	},
	element: {
		type: 'string',
		default: flexBlocksDefaults.headline.element,
	},
	alignment: {
		type: 'string',
		default: flexBlocksDefaults.headline.alignment,
	},
	alignmentTablet: {
		type: 'string',
		default: flexBlocksDefaults.headline.alignmentTablet,
	},
	alignmentMobile: {
		type: 'string',
		default: flexBlocksDefaults.headline.alignmentMobile,
	},
	backgroundColor: {
		type: 'string',
		default: flexBlocksDefaults.headline.backgroundColor,
	},
	backgroundColorOpacity: {
		type: 'number',
		default: flexBlocksDefaults.headline.backgroundColorOpacity,
	},
	textColor: {
		type: 'string',
		default: flexBlocksDefaults.headline.textColor,
	},
	linkColor: {
		type: 'string',
		default: flexBlocksDefaults.headline.linkColor,
	},
	linkColorHover: {
		type: 'string',
		default: flexBlocksDefaults.headline.linkColorHover,
	},
	fontFamily: {
		type: 'string',
		default: flexBlocksDefaults.headline.fontFamily,
	},
	fontFamilyFallback: {
		type: 'string',
		default: flexBlocksDefaults.headline.fontFamilyFallback,
	},
	googleFont: {
		type: 'boolean',
		default: flexBlocksDefaults.headline.googleFont,
	},
	fontWeight: {
		type: 'string',
		default: flexBlocksDefaults.headline.fontWeight,
	},
	fontSize: {
		type: 'number',
		default: flexBlocksDefaults.headline.fontSize,
	},
	fontSizeTablet: {
		type: 'number',
		default: flexBlocksDefaults.headline.fontSizeTablet,
	},
	fontSizeMobile: {
		type: 'number',
		default: flexBlocksDefaults.headline.fontSizeMobile,
	},
	fontSizeUnit: {
		type: 'string',
		default: flexBlocksDefaults.headline.fontSizeUnit,
	},
	textTransform: {
		type: 'string',
		default: '',
	},
	lineHeight: {
		type: 'number',
		default: flexBlocksDefaults.headline.lineHeight,
	},
	lineHeightTablet: {
		type: 'number',
		default: flexBlocksDefaults.headline.lineHeightTablet,
	},
	lineHeightMobile: {
		type: 'number',
		default: flexBlocksDefaults.headline.lineHeightMobile,
	},
	lineHeightUnit: {
		type: 'string',
		default: flexBlocksDefaults.headline.lineHeightUnit,
	},
	letterSpacing: {
		type: 'number',
		default: flexBlocksDefaults.headline.letterSpacing,
	},
	letterSpacingTablet: {
		type: 'number',
		default: flexBlocksDefaults.headline.letterSpacingTablet,
	},
	letterSpacingMobile: {
		type: 'number',
		default: flexBlocksDefaults.headline.letterSpacingMobile,
	},
	marginTop: {
		type: 'string',
		default: flexBlocksDefaults.headline.marginTop,
	},
	marginRight: {
		type: 'string',
		default: flexBlocksDefaults.headline.marginRight,
	},
	marginBottom: {
		type: 'string',
		default: flexBlocksDefaults.headline.marginBottom,
	},
	marginLeft: {
		type: 'string',
		default: flexBlocksDefaults.headline.marginLeft,
	},
	marginUnit: {
		type: 'string',
		default: flexBlocksDefaults.headline.marginUnit,
	},
	marginSyncUnits: {
		type: 'boolean',
		default: false,
	},
	marginTopTablet: {
		type: 'string',
		default: flexBlocksDefaults.headline.marginTopTablet,
	},
	marginRightTablet: {
		type: 'string',
		default: flexBlocksDefaults.headline.marginRightTablet,
	},
	marginBottomTablet: {
		type: 'string',
		default: flexBlocksDefaults.headline.marginBottomTablet,
	},
	marginLeftTablet: {
		type: 'string',
		default: flexBlocksDefaults.headline.marginLeftTablet,
	},
	marginTopMobile: {
		type: 'string',
		default: flexBlocksDefaults.headline.marginTopMobile,
	},
	marginRightMobile: {
		type: 'string',
		default: flexBlocksDefaults.headline.marginRightMobile,
	},
	marginBottomMobile: {
		type: 'string',
		default: flexBlocksDefaults.headline.marginBottomMobile,
	},
	marginLeftMobile: {
		type: 'string',
		default: flexBlocksDefaults.headline.marginLeftMobile,
	},
	paddingTop: {
		type: 'string',
		default: flexBlocksDefaults.headline.paddingTop,
	},
	paddingRight: {
		type: 'string',
		default: flexBlocksDefaults.headline.paddingRight,
	},
	paddingBottom: {
		type: 'string',
		default: flexBlocksDefaults.headline.paddingBottom,
	},
	paddingLeft: {
		type: 'string',
		default: flexBlocksDefaults.headline.paddingLeft,
	},
	paddingTopTablet: {
		type: 'string',
		default: flexBlocksDefaults.headline.paddingTopTablet,
	},
	paddingRightTablet: {
		type: 'string',
		default: flexBlocksDefaults.headline.paddingRightTablet,
	},
	paddingBottomTablet: {
		type: 'string',
		default: flexBlocksDefaults.headline.paddingBottomTablet,
	},
	paddingLeftTablet: {
		type: 'string',
		default: flexBlocksDefaults.headline.paddingLeftTablet,
	},
	paddingTopMobile: {
		type: 'string',
		default: flexBlocksDefaults.headline.paddingTopMobile,
	},
	paddingRightMobile: {
		type: 'string',
		default: flexBlocksDefaults.headline.paddingRightMobile,
	},
	paddingBottomMobile: {
		type: 'string',
		default: flexBlocksDefaults.headline.paddingBottomMobile,
	},
	paddingLeftMobile: {
		type: 'string',
		default: flexBlocksDefaults.headline.paddingLeftMobile,
	},
	paddingUnit: {
		type: 'string',
		default: flexBlocksDefaults.headline.paddingUnit,
	},
	paddingSyncUnits: {
		type: 'boolean',
		default: false,
	},
	icon: {
        type: 'string',
        default: flexBlocksDefaults.headline.icon,
    },
	iconColor: {
		type: 'string',
		default: flexBlocksDefaults.headline.iconColor,
	},
	iconColorOpacity: {
		type: 'number',
		default: flexBlocksDefaults.headline.iconColorOpacity,
	},
	customIcon: {
		type: 'boolean',
		default: false,
	},
	iconLocation: {
		type: 'string',
		default: flexBlocksDefaults.headline.iconLocation,
	},
	iconLocationTablet: {
		type: 'string',
		default: flexBlocksDefaults.headline.iconLocationTablet,
	},
	iconLocationMobile: {
		type: 'string',
		default: flexBlocksDefaults.headline.iconLocationMobile,
	},
	iconVerticalAlignment: {
		type: 'string',
		default: flexBlocksDefaults.headline.iconVerticalAlignment,
	},
	iconVerticalAlignmentTablet: {
		type: 'string',
		default: flexBlocksDefaults.headline.iconVerticalAlignmentTablet,
	},
	iconVerticalAlignmentMobile: {
		type: 'string',
		default: flexBlocksDefaults.headline.iconVerticalAlignmentMobile,
	},
	iconPaddingTop: {
		type: 'string',
		default: flexBlocksDefaults.headline.iconPaddingTop,
	},
	iconPaddingRight: {
		type: 'string',
		default: flexBlocksDefaults.headline.iconPaddingRight,
	},
	iconPaddingBottom: {
		type: 'string',
		default: flexBlocksDefaults.headline.iconPaddingBottom,
	},
	iconPaddingLeft: {
		type: 'string',
		default: flexBlocksDefaults.headline.iconPaddingLeft,
	},
	iconPaddingTopTablet: {
		type: 'string',
		default: flexBlocksDefaults.headline.iconPaddingTopTablet,
	},
	iconPaddingRightTablet: {
		type: 'string',
		default: flexBlocksDefaults.headline.iconPaddingRightTablet,
	},
	iconPaddingBottomTablet: {
		type: 'string',
		default: flexBlocksDefaults.headline.iconPaddingBottomTablet,
	},
	iconPaddingLeftTablet: {
		type: 'string',
		default: flexBlocksDefaults.headline.iconPaddingLeftTablet,
	},
	iconPaddingTopMobile: {
		type: 'string',
		default: flexBlocksDefaults.headline.iconPaddingTopMobile,
	},
	iconPaddingRightMobile: {
		type: 'string',
		default: flexBlocksDefaults.headline.iconPaddingRightMobile,
	},
	iconPaddingBottomMobile: {
		type: 'string',
		default: flexBlocksDefaults.headline.iconPaddingBottomMobile,
	},
	iconPaddingLeftMobile: {
		type: 'string',
		default: flexBlocksDefaults.headline.iconPaddingLeftMobile,
	},
	iconPaddingUnit: {
		type: 'string',
		default: flexBlocksDefaults.headline.iconPaddingUnit,
	},
	iconPaddingSyncUnits: {
		type: 'boolean',
		default: false,
	},
	iconSize: {
		type: 'number',
		default: flexBlocksDefaults.headline.iconSize,
	},
	iconSizeTablet: {
		type: 'number',
		default: flexBlocksDefaults.headline.iconSizeTablet,
	},
	iconSizeMobile: {
		type: 'number',
		default: flexBlocksDefaults.headline.iconSizeMobile,
	},
}
