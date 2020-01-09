export default {
	uniqueId: {
		type: 'string',
		default: '',
	},
	tagName: {
		type: 'string',
		default: 'div',
	},
	elementId: {
		type: 'string',
		default: '',
	},
	cssClasses: {
		type: 'string',
		default: '',
	},
	isGrid: {
		type: 'boolean',
		default: false,
	},
	width: {
		type: 'number',
		default: flexBlocksDefaults.container.width,
	},
	widthTablet: {
		type: 'number',
		default: flexBlocksDefaults.container.widthTablet,
	},
	widthMobile: {
		type: 'number',
		default: flexBlocksDefaults.container.widthMobile,
	},
	orderTablet: {
		type: 'number',
		default: flexBlocksDefaults.container.orderTablet,
	},
	orderMobile: {
		type: 'number',
		default: flexBlocksDefaults.container.orderMobile,
	},
	outerContainer: {
		type: 'string',
		default: flexBlocksDefaults.container.outerContainer,
	},
	innerContainer: {
		type: 'string',
		default: flexBlocksDefaults.container.innerContainer,
	},
	containerWidth: {
		type: 'number',
		default: flexBlocksDefaults.container.containerWidth,
	},
	minHeight: {
		type: 'number',
		default: flexBlocksDefaults.container.minHeight,
	},
	minHeightUnit: {
		type: 'string',
		default: flexBlocksDefaults.container.minHeightUnit,
	},
	minHeightTablet: {
		type: 'number',
		default: flexBlocksDefaults.container.minHeightTablet,
	},
	minHeightUnitTablet: {
		type: 'string',
		default: flexBlocksDefaults.container.minHeightUnitTablet,
	},
	minHeightMobile: {
		type: 'number',
		default: flexBlocksDefaults.container.minHeightMobile,
	},
	minHeightUnitMobile: {
		type: 'string',
		default: flexBlocksDefaults.container.minHeightUnitMobile,
	},
	paddingTop: {
		type: 'string',
		default: flexBlocksDefaults.container.paddingTop,
	},
	paddingRight: {
		type: 'string',
		default: flexBlocksDefaults.container.paddingRight,
	},
	paddingBottom: {
		type: 'string',
		default: flexBlocksDefaults.container.paddingBottom,
	},
	paddingLeft: {
		type: 'string',
		default: flexBlocksDefaults.container.paddingLeft,
	},
	paddingUnit: {
		type: 'string',
		default: flexBlocksDefaults.container.paddingUnit,
	},
	paddingSyncUnits: {
		type: 'boolean',
		default: false,
	},
	paddingTopTablet: {
		type: 'string',
		default: flexBlocksDefaults.container.paddingTopTablet,
	},
	paddingRightTablet: {
		type: 'string',
		default: flexBlocksDefaults.container.paddingRightTablet,
	},
	paddingBottomTablet: {
		type: 'string',
		default: flexBlocksDefaults.container.paddingBottomTablet,
	},
	paddingLeftTablet: {
		type: 'string',
		default: flexBlocksDefaults.container.paddingLeftTablet,
	},
	paddingTopMobile: {
		type: 'string',
		default: flexBlocksDefaults.container.paddingTopMobile,
	},
	paddingRightMobile: {
		type: 'string',
		default: flexBlocksDefaults.container.paddingRightMobile,
	},
	paddingBottomMobile: {
		type: 'string',
		default: flexBlocksDefaults.container.paddingBottomMobile,
	},
	paddingLeftMobile: {
		type: 'string',
		default: flexBlocksDefaults.container.paddingLeftMobile,
	},
	marginTop: {
		type: 'string',
		default: flexBlocksDefaults.container.marginTop,
	},
	marginRight: {
		type: 'string',
		default: flexBlocksDefaults.container.marginRight,
	},
	marginBottom: {
		type: 'string',
		default: flexBlocksDefaults.container.marginBottom,
	},
	marginLeft: {
		type: 'string',
		default: flexBlocksDefaults.container.marginLeft,
	},
	marginUnit: {
		type: 'string',
		default: flexBlocksDefaults.container.marginUnit,
	},
	marginSyncUnits: {
		type: 'boolean',
		default: false,
	},
	marginTopTablet: {
		type: 'string',
		default: flexBlocksDefaults.container.marginTopTablet,
	},
	marginRightTablet: {
		type: 'string',
		default: flexBlocksDefaults.container.marginRightTablet,
	},
	marginBottomTablet: {
		type: 'string',
		default: flexBlocksDefaults.container.marginBottomTablet,
	},
	marginLeftTablet: {
		type: 'string',
		default: flexBlocksDefaults.container.marginLeftTablet,
	},
	marginTopMobile: {
		type: 'string',
		default: flexBlocksDefaults.container.marginTopMobile,
	},
	marginRightMobile: {
		type: 'string',
		default: flexBlocksDefaults.container.marginRightMobile,
	},
	marginBottomMobile: {
		type: 'string',
		default: flexBlocksDefaults.container.marginBottomMobile,
	},
	marginLeftMobile: {
		type: 'string',
		default: flexBlocksDefaults.container.marginLeftMobile,
	},
	borderSizeTop: {
		type: 'string',
		default: flexBlocksDefaults.container.borderSizeTop,
	},
	borderSizeRight: {
		type: 'string',
		default: flexBlocksDefaults.container.borderSizeRight,
	},
	borderSizeBottom: {
		type: 'string',
		default: flexBlocksDefaults.container.borderSizeBottom,
	},
	borderSizeLeft: {
		type: 'string',
		default: flexBlocksDefaults.container.borderSizeLeft,
	},
	borderSizeTopTablet: {
		type: 'string',
		default: flexBlocksDefaults.container.borderSizeTopTablet,
	},
	borderSizeRightTablet: {
		type: 'string',
		default: flexBlocksDefaults.container.borderSizeRightTablet,
	},
	borderSizeBottomTablet: {
		type: 'string',
		default: flexBlocksDefaults.container.borderSizeBottomTablet,
	},
	borderSizeLeftTablet: {
		type: 'string',
		default: flexBlocksDefaults.container.borderSizeLeftTablet,
	},
	borderSizeTopMobile: {
		type: 'string',
		default: flexBlocksDefaults.container.borderSizeTopMobile,
	},
	borderSizeRightMobile: {
		type: 'string',
		default: flexBlocksDefaults.container.borderSizeRightMobile,
	},
	borderSizeBottomMobile: {
		type: 'string',
		default: flexBlocksDefaults.container.borderSizeBottomMobile,
	},
	borderSizeLeftMobile: {
		type: 'string',
		default: flexBlocksDefaults.container.borderSizeLeftMobile,
	},
	borderRadiusTopRight: {
		type: 'string',
		default: flexBlocksDefaults.container.borderRadiusTopRight,
	},
	borderRadiusBottomRight: {
		type: 'string',
		default: flexBlocksDefaults.container.borderRadiusBottomRight,
	},
	borderRadiusBottomLeft: {
		type: 'string',
		default: flexBlocksDefaults.container.borderRadiusBottomLeft,
	},
	borderRadiusTopLeft: {
		type: 'string',
		default: flexBlocksDefaults.container.borderRadiusTopLeft,
	},
	borderRadiusUnit: {
		type: 'string',
		default: flexBlocksDefaults.container.borderRadiusUnit,
	},
	borderRadiusTopRightTablet: {
		type: 'string',
		default: flexBlocksDefaults.container.borderRadiusTopRightTablet,
	},
	borderRadiusBottomRightTablet: {
		type: 'string',
		default: flexBlocksDefaults.container.borderRadiusBottomRightTablet,
	},
	borderRadiusBottomLeftTablet: {
		type: 'string',
		default: flexBlocksDefaults.container.borderRadiusBottomLeftTablet,
	},
	borderRadiusTopLeftTablet: {
		type: 'string',
		default: flexBlocksDefaults.container.borderRadiusTopLeftTablet,
	},
	borderRadiusTopRightMobile: {
		type: 'string',
		default: flexBlocksDefaults.container.borderRadiusTopRightMobile,
	},
	borderRadiusBottomRightMobile: {
		type: 'string',
		default: flexBlocksDefaults.container.borderRadiusBottomRightMobile,
	},
	borderRadiusBottomLeftMobile: {
		type: 'string',
		default: flexBlocksDefaults.container.borderRadiusBottomLeftMobile,
	},
	borderRadiusTopLeftMobile: {
		type: 'string',
		default: flexBlocksDefaults.container.borderRadiusTopLeftMobile,
	},
	borderColor: {
		type: 'string',
		default: flexBlocksDefaults.container.borderColor,
	},
	borderColorOpacity: {
		type: 'number',
		default: flexBlocksDefaults.container.borderColorOpacity,
	},
	backgroundColor: {
		type: 'string',
		default: flexBlocksDefaults.container.backgroundColor,
	},
	backgroundColorOpacity: {
		type: 'number',
		default: flexBlocksDefaults.container.backgroundColorOpacity,
	},
	gradient: {
		type: 'boolean',
		default: flexBlocksDefaults.container.gradient,
	},
	gradientDirection: {
		type: 'string',
		default: flexBlocksDefaults.container.gradientDirection,
	},
	gradientColorOne: {
		type: 'string',
		default: flexBlocksDefaults.container.gradientColorOne,
	},
	gradientColorOneOpacity: {
		type: 'number',
		default: flexBlocksDefaults.container.gradientColorOneOpacity,
	},
	gradientColorStopOne: {
		type: 'number',
		default: flexBlocksDefaults.container.gradientColorStopOne,
	},
	gradientColorTwo: {
		type: 'string',
		default: flexBlocksDefaults.container.gradientColorTwo,
	},
	gradientColorTwoOpacity: {
		type: 'number',
		default: flexBlocksDefaults.container.gradientColorTwoOpacity,
	},
	gradientColorStopTwo: {
		type: 'number',
		default: flexBlocksDefaults.container.gradientColorStopTwo,
	},
	textColor: {
		type: 'string',
		default: flexBlocksDefaults.container.textColor,
	},
	linkColor: {
		type: 'string',
		default: flexBlocksDefaults.container.linkColor,
	},
	linkColorHover: {
		type: 'string',
		default: flexBlocksDefaults.container.linkColorHover,
	},
	bgImage: {
		type: 'object',
		default: flexBlocksDefaults.container.bgImage,
	},
	bgOptions: {
		type: 'object',
		default: {
			overlay: flexBlocksDefaults.container.bgOptions.overlay,
			position: flexBlocksDefaults.container.bgOptions.position,
			size: flexBlocksDefaults.container.bgOptions.size,
			repeat: flexBlocksDefaults.container.bgOptions.repeat,
			attachment: flexBlocksDefaults.container.bgOptions.attachment,
		}
	},
	verticalAlignment: {
		type: 'string',
		default: flexBlocksDefaults.container.verticalAlignment,
	},
	verticalAlignmentTablet: {
		type: 'string',
		default: flexBlocksDefaults.container.verticalAlignmentTablet,
	},
	verticalAlignmentMobile: {
		type: 'string',
		default: flexBlocksDefaults.container.verticalAlignmentMobile,
	},
	zindex: {
		type: 'number',
		default: flexBlocksDefaults.container.zindex,
	},
	removeVerticalGap: {
		type: 'boolean',
		default: flexBlocksDefaults.container.removeVerticalGap,
	},
	removeVerticalGapTablet: {
		type: 'boolean',
		default: flexBlocksDefaults.container.removeVerticalGapTablet,
	},
	removeVerticalGapMobile: {
		type: 'boolean',
		default: flexBlocksDefaults.container.removeVerticalGapMobile,
	},
}
