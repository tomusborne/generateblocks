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
	marginTop: {
		type: 'number',
		default: flexBlocksDefaults.headline.marginTop,
	},
	marginTopTablet: {
		type: 'number',
		default: flexBlocksDefaults.headline.marginTopTablet,
	},
	marginTopMobile: {
		type: 'number',
		default: flexBlocksDefaults.headline.marginTopMobile,
	},
	marginBottom: {
		type: 'number',
		default: flexBlocksDefaults.headline.marginBottom,
	},
	marginBottomTablet: {
		type: 'number',
		default: flexBlocksDefaults.headline.marginBottomTablet,
	},
	marginBottomMobile: {
		type: 'number',
		default: flexBlocksDefaults.headline.marginBottomMobile,
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
}
