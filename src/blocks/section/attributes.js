export default {
	uniqueId: {
		type: 'string',
		default: '',
	},
	tagName: {
		type: 'string',
		default: 'section',
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
		default: flexBlocksDefaults.section.width,
	},
	widthTablet: {
		type: 'number',
		default: flexBlocksDefaults.section.widthTablet,
	},
	widthMobile: {
		type: 'number',
		default: flexBlocksDefaults.section.widthMobile,
	},
	outerContainer: {
		type: 'string',
		default: flexBlocksDefaults.section.outerContainer,
	},
	innerContainer: {
		type: 'string',
		default: flexBlocksDefaults.section.innerContainer,
	},
	containerWidth: {
		type: 'number',
		default: flexBlocksDefaults.section.containerWidth,
	},
	paddingTop: {
		type: 'string',
		default: flexBlocksDefaults.section.paddingTop,
	},
	paddingRight: {
		type: 'string',
		default: flexBlocksDefaults.section.paddingRight,
	},
	paddingBottom: {
		type: 'string',
		default: flexBlocksDefaults.section.paddingBottom,
	},
	paddingLeft: {
		type: 'string',
		default: flexBlocksDefaults.section.paddingLeft,
	},
	paddingSyncUnits: {
		type: 'boolean',
		default: false,
	},
	paddingTopTablet: {
		type: 'string',
		default: flexBlocksDefaults.section.paddingTopTablet,
	},
	paddingRightTablet: {
		type: 'string',
		default: flexBlocksDefaults.section.paddingRightTablet,
	},
	paddingBottomTablet: {
		type: 'string',
		default: flexBlocksDefaults.section.paddingBottomTablet,
	},
	paddingLeftTablet: {
		type: 'string',
		default: flexBlocksDefaults.section.paddingLeftTablet,
	},
	paddingSyncUnitsTablet: {
		type: 'boolean',
		default: false,
	},
	paddingTopMobile: {
		type: 'string',
		default: flexBlocksDefaults.section.paddingTopMobile,
	},
	paddingRightMobile: {
		type: 'string',
		default: flexBlocksDefaults.section.paddingRightMobile,
	},
	paddingBottomMobile: {
		type: 'string',
		default: flexBlocksDefaults.section.paddingBottomMobile,
	},
	paddingLeftMobile: {
		type: 'string',
		default: flexBlocksDefaults.section.paddingLeftMobile,
	},
	paddingSyncUnitsMobile: {
		type: 'boolean',
		default: false,
	},
	marginTop: {
		type: 'string',
		default: flexBlocksDefaults.section.marginTop,
	},
	marginRight: {
		type: 'string',
		default: flexBlocksDefaults.section.marginRight,
	},
	marginBottom: {
		type: 'string',
		default: flexBlocksDefaults.section.marginBottom,
	},
	marginLeft: {
		type: 'string',
		default: flexBlocksDefaults.section.marginLeft,
	},
	marginSyncUnits: {
		type: 'boolean',
		default: false,
	},
	marginTopTablet: {
		type: 'string',
		default: flexBlocksDefaults.section.marginTopTablet,
	},
	marginRightTablet: {
		type: 'string',
		default: flexBlocksDefaults.section.marginRightTablet,
	},
	marginBottomTablet: {
		type: 'string',
		default: flexBlocksDefaults.section.marginBottomTablet,
	},
	marginLeftTablet: {
		type: 'string',
		default: flexBlocksDefaults.section.marginLeftTablet,
	},
	marginSyncUnitsTablet: {
		type: 'boolean',
		default: false,
	},
	marginTopMobile: {
		type: 'string',
		default: flexBlocksDefaults.section.marginTopMobile,
	},
	marginRightMobile: {
		type: 'string',
		default: flexBlocksDefaults.section.marginRightMobile,
	},
	marginBottomMobile: {
		type: 'string',
		default: flexBlocksDefaults.section.marginBottomMobile,
	},
	marginLeftMobile: {
		type: 'string',
		default: flexBlocksDefaults.section.marginLeftMobile,
	},
	marginSyncUnitsMobile: {
		type: 'boolean',
		default: false,
	},
	backgroundColor: {
		type: 'string',
		default: flexBlocksDefaults.section.backgroundColor,
	},
	textColor: {
		type: 'string',
		default: flexBlocksDefaults.section.textColor,
	},
	linkColor: {
		type: 'string',
		default: flexBlocksDefaults.section.linkColor,
	},
	linkColorHover: {
		type: 'string',
		default: flexBlocksDefaults.section.linkColorHover,
	},
	bgImage: {
		type: 'object',
		default: flexBlocksDefaults.section.bgImage,
	},
	bgOptions: {
		type: 'object',
		default: {
			overlay: flexBlocksDefaults.section.bgOptions.overlay,
			position: flexBlocksDefaults.section.bgOptions.position,
			size: flexBlocksDefaults.section.bgOptions.size,
			repeat: flexBlocksDefaults.section.bgOptions.repeat,
			attachment: flexBlocksDefaults.section.bgOptions.attachment,
		}
	},
	verticalAlignment: {
		type: 'string',
		default: flexBlocksDefaults.section.verticalAlignment,
	},
	verticalAlignmentTablet: {
		type: 'string',
		default: flexBlocksDefaults.section.verticalAlignmentTablet,
	},
	verticalAlignmentMobile: {
		type: 'string',
		default: flexBlocksDefaults.section.verticalAlignmentMobile,
	},
	zindex: {
		type: 'number',
		default: flexBlocksDefaults.section.zindex,
	},
}
