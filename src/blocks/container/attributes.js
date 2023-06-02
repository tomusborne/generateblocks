export default {
	uniqueId: {
		type: 'string',
		default: '',
	},
	templateLock: {
		type: [ 'string', 'boolean' ],
		enum: [ 'all', 'insert', 'contentOnly', false ],
	},
	anchor: {
		type: 'string',
		default: '',
	},
	isGrid: {
		type: 'boolean',
		default: false,
	},
	isQueryLoopItem: {
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
	flexBasisUnit: {
		type: 'string',
		default: generateBlocksDefaults.container.flexBasisUnit,
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
	bgImageInline: {
		type: 'boolean',
		default: generateBlocksDefaults.container.bgImageInline,
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
	useInnerContainer: {
		type: 'boolean',
		default: false,
	},
	variantRole: {
		type: 'string',
		default: '',
	},
	blockLabel: {
		type: 'string',
		default: '',
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
