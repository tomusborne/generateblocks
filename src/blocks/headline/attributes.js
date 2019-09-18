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
	marginSyncUnitsTablet: {
		type: 'boolean',
		default: false,
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
	marginSyncUnitsMobile: {
		type: 'boolean',
		default: false,
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
	paddingSyncUnits: {
		type: 'boolean',
		default: false,
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
	paddingSyncUnitsTablet: {
		type: 'boolean',
		default: false,
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
	paddingSyncUnitsMobile: {
		type: 'boolean',
		default: false,
	},
}
