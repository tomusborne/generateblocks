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
	paddingSyncUnitsTablet: {
		type: 'boolean',
		default: false,
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
	paddingSyncUnitsMobile: {
		type: 'boolean',
		default: false,
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
	marginSyncUnitsTablet: {
		type: 'boolean',
		default: false,
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
	marginSyncUnitsMobile: {
		type: 'boolean',
		default: false,
	},
	backgroundColor: {
		type: 'string',
		default: flexBlocksDefaults.container.backgroundColor,
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
}
