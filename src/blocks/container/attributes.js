/* eslint-disable no-undef */
const attributes = {
	uniqueId: {
		type: 'string',
		default: '',
	},
	anchor: {
		type: 'string',
		default: '',
	},
	isGrid: {
		type: 'boolean',
		default: false,
	},
	gridId: {
		type: 'string',
		default: '',
	},
	tagName: {
		type: 'string',
		default: generateBlocksDefaults.container.tagName,
	},
	width: {
		type: 'number',
		default: generateBlocksDefaults.container.width,
	},
	widthTablet: {
		type: 'number',
		default: generateBlocksDefaults.container.widthTablet,
	},
	widthMobile: {
		type: 'number',
		default: generateBlocksDefaults.container.widthMobile,
	},
	autoWidthTablet: {
		type: 'boolean',
		default: generateBlocksDefaults.container.autoWidthTablet,
	},
	autoWidthMobile: {
		type: 'boolean',
		default: generateBlocksDefaults.container.autoWidthMobile,
	},
	flexGrow: {
		type: 'number',
		default: generateBlocksDefaults.container.flexGrow,
	},
	flexGrowTablet: {
		type: 'number',
		default: generateBlocksDefaults.container.flexGrowTablet,
	},
	flexGrowMobile: {
		type: 'number',
		default: generateBlocksDefaults.container.flexGrowMobile,
	},
	flexShrink: {
		type: 'number',
		default: generateBlocksDefaults.container.flexShrink,
	},
	flexShrinkTablet: {
		type: 'number',
		default: generateBlocksDefaults.container.flexShrinkTablet,
	},
	flexShrinkMobile: {
		type: 'number',
		default: generateBlocksDefaults.container.flexShrinkMobile,
	},
	flexBasis: {
		type: 'string',
		default: generateBlocksDefaults.container.flexBasis,
	},
	flexBasisTablet: {
		type: 'string',
		default: generateBlocksDefaults.container.flexBasisTablet,
	},
	flexBasisMobile: {
		type: 'string',
		default: generateBlocksDefaults.container.flexBasisMobile,
	},
	flexBasisUnit: {
		type: 'string',
		default: generateBlocksDefaults.container.flexBasisUnit,
	},
	orderTablet: {
		type: 'number',
		default: generateBlocksDefaults.container.orderTablet,
	},
	orderMobile: {
		type: 'number',
		default: generateBlocksDefaults.container.orderMobile,
	},
	outerContainer: {
		type: 'string',
		default: generateBlocksDefaults.container.outerContainer,
	},
	innerContainer: {
		type: 'string',
		default: generateBlocksDefaults.container.innerContainer,
	},
	containerWidth: {
		type: 'number',
		default: generateBlocksDefaults.container.containerWidth,
	},
	minHeight: {
		type: 'number',
		default: generateBlocksDefaults.container.minHeight,
	},
	minHeightUnit: {
		type: 'string',
		default: generateBlocksDefaults.container.minHeightUnit,
	},
	minHeightTablet: {
		type: 'number',
		default: generateBlocksDefaults.container.minHeightTablet,
	},
	minHeightUnitTablet: {
		type: 'string',
		default: generateBlocksDefaults.container.minHeightUnitTablet,
	},
	minHeightMobile: {
		type: 'number',
		default: generateBlocksDefaults.container.minHeightMobile,
	},
	minHeightUnitMobile: {
		type: 'string',
		default: generateBlocksDefaults.container.minHeightUnitMobile,
	},
	paddingTop: {
		type: 'string',
		default: generateBlocksDefaults.container.paddingTop,
	},
	paddingRight: {
		type: 'string',
		default: generateBlocksDefaults.container.paddingRight,
	},
	paddingBottom: {
		type: 'string',
		default: generateBlocksDefaults.container.paddingBottom,
	},
	paddingLeft: {
		type: 'string',
		default: generateBlocksDefaults.container.paddingLeft,
	},
	paddingUnit: {
		type: 'string',
		default: generateBlocksDefaults.container.paddingUnit,
	},
	paddingSyncUnits: {
		type: 'boolean',
		default: false,
	},
	paddingTopTablet: {
		type: 'string',
		default: generateBlocksDefaults.container.paddingTopTablet,
	},
	paddingRightTablet: {
		type: 'string',
		default: generateBlocksDefaults.container.paddingRightTablet,
	},
	paddingBottomTablet: {
		type: 'string',
		default: generateBlocksDefaults.container.paddingBottomTablet,
	},
	paddingLeftTablet: {
		type: 'string',
		default: generateBlocksDefaults.container.paddingLeftTablet,
	},
	paddingTopMobile: {
		type: 'string',
		default: generateBlocksDefaults.container.paddingTopMobile,
	},
	paddingRightMobile: {
		type: 'string',
		default: generateBlocksDefaults.container.paddingRightMobile,
	},
	paddingBottomMobile: {
		type: 'string',
		default: generateBlocksDefaults.container.paddingBottomMobile,
	},
	paddingLeftMobile: {
		type: 'string',
		default: generateBlocksDefaults.container.paddingLeftMobile,
	},
	marginTop: {
		type: 'string',
		default: generateBlocksDefaults.container.marginTop,
	},
	marginRight: {
		type: 'string',
		default: generateBlocksDefaults.container.marginRight,
	},
	marginBottom: {
		type: 'string',
		default: generateBlocksDefaults.container.marginBottom,
	},
	marginLeft: {
		type: 'string',
		default: generateBlocksDefaults.container.marginLeft,
	},
	marginUnit: {
		type: 'string',
		default: generateBlocksDefaults.container.marginUnit,
	},
	marginSyncUnits: {
		type: 'boolean',
		default: false,
	},
	marginTopTablet: {
		type: 'string',
		default: generateBlocksDefaults.container.marginTopTablet,
	},
	marginRightTablet: {
		type: 'string',
		default: generateBlocksDefaults.container.marginRightTablet,
	},
	marginBottomTablet: {
		type: 'string',
		default: generateBlocksDefaults.container.marginBottomTablet,
	},
	marginLeftTablet: {
		type: 'string',
		default: generateBlocksDefaults.container.marginLeftTablet,
	},
	marginTopMobile: {
		type: 'string',
		default: generateBlocksDefaults.container.marginTopMobile,
	},
	marginRightMobile: {
		type: 'string',
		default: generateBlocksDefaults.container.marginRightMobile,
	},
	marginBottomMobile: {
		type: 'string',
		default: generateBlocksDefaults.container.marginBottomMobile,
	},
	marginLeftMobile: {
		type: 'string',
		default: generateBlocksDefaults.container.marginLeftMobile,
	},
	borderSizeTop: {
		type: 'string',
		default: generateBlocksDefaults.container.borderSizeTop,
	},
	borderSizeRight: {
		type: 'string',
		default: generateBlocksDefaults.container.borderSizeRight,
	},
	borderSizeBottom: {
		type: 'string',
		default: generateBlocksDefaults.container.borderSizeBottom,
	},
	borderSizeLeft: {
		type: 'string',
		default: generateBlocksDefaults.container.borderSizeLeft,
	},
	borderSizeTopTablet: {
		type: 'string',
		default: generateBlocksDefaults.container.borderSizeTopTablet,
	},
	borderSizeRightTablet: {
		type: 'string',
		default: generateBlocksDefaults.container.borderSizeRightTablet,
	},
	borderSizeBottomTablet: {
		type: 'string',
		default: generateBlocksDefaults.container.borderSizeBottomTablet,
	},
	borderSizeLeftTablet: {
		type: 'string',
		default: generateBlocksDefaults.container.borderSizeLeftTablet,
	},
	borderSizeTopMobile: {
		type: 'string',
		default: generateBlocksDefaults.container.borderSizeTopMobile,
	},
	borderSizeRightMobile: {
		type: 'string',
		default: generateBlocksDefaults.container.borderSizeRightMobile,
	},
	borderSizeBottomMobile: {
		type: 'string',
		default: generateBlocksDefaults.container.borderSizeBottomMobile,
	},
	borderSizeLeftMobile: {
		type: 'string',
		default: generateBlocksDefaults.container.borderSizeLeftMobile,
	},
	borderRadiusTopRight: {
		type: 'string',
		default: generateBlocksDefaults.container.borderRadiusTopRight,
	},
	borderRadiusBottomRight: {
		type: 'string',
		default: generateBlocksDefaults.container.borderRadiusBottomRight,
	},
	borderRadiusBottomLeft: {
		type: 'string',
		default: generateBlocksDefaults.container.borderRadiusBottomLeft,
	},
	borderRadiusTopLeft: {
		type: 'string',
		default: generateBlocksDefaults.container.borderRadiusTopLeft,
	},
	borderRadiusUnit: {
		type: 'string',
		default: generateBlocksDefaults.container.borderRadiusUnit,
	},
	borderRadiusTopRightTablet: {
		type: 'string',
		default: generateBlocksDefaults.container.borderRadiusTopRightTablet,
	},
	borderRadiusBottomRightTablet: {
		type: 'string',
		default: generateBlocksDefaults.container.borderRadiusBottomRightTablet,
	},
	borderRadiusBottomLeftTablet: {
		type: 'string',
		default: generateBlocksDefaults.container.borderRadiusBottomLeftTablet,
	},
	borderRadiusTopLeftTablet: {
		type: 'string',
		default: generateBlocksDefaults.container.borderRadiusTopLeftTablet,
	},
	borderRadiusTopRightMobile: {
		type: 'string',
		default: generateBlocksDefaults.container.borderRadiusTopRightMobile,
	},
	borderRadiusBottomRightMobile: {
		type: 'string',
		default: generateBlocksDefaults.container.borderRadiusBottomRightMobile,
	},
	borderRadiusBottomLeftMobile: {
		type: 'string',
		default: generateBlocksDefaults.container.borderRadiusBottomLeftMobile,
	},
	borderRadiusTopLeftMobile: {
		type: 'string',
		default: generateBlocksDefaults.container.borderRadiusTopLeftMobile,
	},
	borderColor: {
		type: 'string',
		default: generateBlocksDefaults.container.borderColor,
	},
	borderColorOpacity: {
		type: 'number',
		default: generateBlocksDefaults.container.borderColorOpacity,
	},
	backgroundColor: {
		type: 'string',
		default: generateBlocksDefaults.container.backgroundColor,
	},
	backgroundColorOpacity: {
		type: 'number',
		default: generateBlocksDefaults.container.backgroundColorOpacity,
	},
	gradient: {
		type: 'boolean',
		default: generateBlocksDefaults.container.gradient,
	},
	gradientDirection: {
		type: 'number',
		default: generateBlocksDefaults.container.gradientDirection,
	},
	gradientColorOne: {
		type: 'string',
		default: generateBlocksDefaults.container.gradientColorOne,
	},
	gradientColorOneOpacity: {
		type: 'number',
		default: generateBlocksDefaults.container.gradientColorOneOpacity,
	},
	gradientColorStopOne: {
		type: 'number',
		default: generateBlocksDefaults.container.gradientColorStopOne,
	},
	gradientColorTwo: {
		type: 'string',
		default: generateBlocksDefaults.container.gradientColorTwo,
	},
	gradientColorTwoOpacity: {
		type: 'number',
		default: generateBlocksDefaults.container.gradientColorTwoOpacity,
	},
	gradientColorStopTwo: {
		type: 'number',
		default: generateBlocksDefaults.container.gradientColorStopTwo,
	},
	gradientSelector: {
		type: 'string',
		default: 'element',
	},
	textColor: {
		type: 'string',
		default: generateBlocksDefaults.container.textColor,
	},
	linkColor: {
		type: 'string',
		default: generateBlocksDefaults.container.linkColor,
	},
	linkColorHover: {
		type: 'string',
		default: generateBlocksDefaults.container.linkColorHover,
	},
	bgImage: {
		type: 'object',
		default: generateBlocksDefaults.container.bgImage,
	},
	bgOptions: {
		type: 'object',
		default: {
			selector: generateBlocksDefaults.container.bgOptions.selector,
			opacity: generateBlocksDefaults.container.bgOptions.opacity,
			overlay: generateBlocksDefaults.container.bgOptions.overlay,
			position: generateBlocksDefaults.container.bgOptions.position,
			size: generateBlocksDefaults.container.bgOptions.size,
			repeat: generateBlocksDefaults.container.bgOptions.repeat,
			attachment: generateBlocksDefaults.container.bgOptions.attachment,
		},
	},
	bgImageSize: {
		type: 'string',
		default: generateBlocksDefaults.container.bgImageSize,
	},
	verticalAlignment: {
		type: 'string',
		default: generateBlocksDefaults.container.verticalAlignment,
	},
	verticalAlignmentTablet: {
		type: 'string',
		default: generateBlocksDefaults.container.verticalAlignmentTablet,
	},
	verticalAlignmentMobile: {
		type: 'string',
		default: generateBlocksDefaults.container.verticalAlignmentMobile,
	},
	zindex: {
		type: 'number',
		default: generateBlocksDefaults.container.zindex,
	},
	innerZindex: {
		type: 'number',
		default: generateBlocksDefaults.container.innerZindex,
	},
	removeVerticalGap: {
		type: 'boolean',
		default: generateBlocksDefaults.container.removeVerticalGap,
	},
	removeVerticalGapTablet: {
		type: 'boolean',
		default: generateBlocksDefaults.container.removeVerticalGapTablet,
	},
	removeVerticalGapMobile: {
		type: 'boolean',
		default: generateBlocksDefaults.container.removeVerticalGapMobile,
	},
	alignment: {
		type: 'string',
		default: generateBlocksDefaults.container.alignment,
	},
	alignmentTablet: {
		type: 'string',
		default: generateBlocksDefaults.container.alignmentTablet,
	},
	alignmentMobile: {
		type: 'string',
		default: generateBlocksDefaults.container.alignmentMobile,
	},
	fontFamily: {
		type: 'string',
		default: generateBlocksDefaults.container.fontFamily,
	},
	fontFamilyFallback: {
		type: 'string',
		default: generateBlocksDefaults.container.fontFamilyFallback,
	},
	googleFont: {
		type: 'boolean',
		default: generateBlocksDefaults.container.googleFont,
	},
	googleFontVariants: {
		type: 'string',
		default: generateBlocksDefaults.container.googleFontVariants,
	},
	fontWeight: {
		type: 'string',
		default: generateBlocksDefaults.container.fontWeight,
	},
	fontSize: {
		type: 'number',
		default: generateBlocksDefaults.container.fontSize,
	},
	fontSizeTablet: {
		type: 'number',
		default: generateBlocksDefaults.container.fontSizeTablet,
	},
	fontSizeMobile: {
		type: 'number',
		default: generateBlocksDefaults.container.fontSizeMobile,
	},
	fontSizeUnit: {
		type: 'string',
		default: generateBlocksDefaults.container.fontSizeUnit,
	},
	textTransform: {
		type: 'string',
		default: '',
	},
	align: {
		type: 'string',
		default: '',
	},
	shapeDividers: {
		type: 'array',
		default: [],
	},
	isDynamic: {
		type: 'boolean',
	},
	blockVersion: {
		type: 'number',
	},
	// deprecated since 1.2.0.
	elementId: {
		type: 'string',
		default: '',
	},
	cssClasses: {
		type: 'string',
		default: '',
	},
};

if ( generateBlocksInfo.hasCustomFields ) {
	Object.assign( attributes, {
		fullWidthContent: {
			type: 'string',
			source: 'meta',
			meta: '_generate-full-width-content',
		},
	} );
}

export default attributes;
/* eslint-enable no-undef */
