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
	alignment: {
		type: 'string',
		default: generateBlocksDefaults.buttonContainer.alignment,
	},
	alignmentTablet: {
		type: 'string',
		default: generateBlocksDefaults.buttonContainer.alignment,
	},
	alignmentMobile: {
		type: 'string',
		default: generateBlocksDefaults.buttonContainer.alignment,
	},
	marginTop: {
		type: 'string',
		default: generateBlocksDefaults.buttonContainer.marginTop,
	},
	marginRight: {
		type: 'string',
		default: generateBlocksDefaults.buttonContainer.marginRight,
	},
	marginBottom: {
		type: 'string',
		default: generateBlocksDefaults.buttonContainer.marginBottom,
	},
	marginLeft: {
		type: 'string',
		default: generateBlocksDefaults.buttonContainer.marginLeft,
	},
	marginUnit: {
		type: 'string',
		default: generateBlocksDefaults.buttonContainer.marginUnit,
	},
	marginTopTablet: {
		type: 'string',
		default: generateBlocksDefaults.buttonContainer.marginTopTablet,
	},
	marginRightTablet: {
		type: 'string',
		default: generateBlocksDefaults.buttonContainer.marginRightTablet,
	},
	marginBottomTablet: {
		type: 'string',
		default: generateBlocksDefaults.buttonContainer.marginBottomTablet,
	},
	marginLeftTablet: {
		type: 'string',
		default: generateBlocksDefaults.buttonContainer.marginLeftTablet,
	},
	marginTopMobile: {
		type: 'string',
		default: generateBlocksDefaults.buttonContainer.marginTopMobile,
	},
	marginRightMobile: {
		type: 'string',
		default: generateBlocksDefaults.buttonContainer.marginRightMobile,
	},
	marginBottomMobile: {
		type: 'string',
		default: generateBlocksDefaults.buttonContainer.marginBottomMobile,
	},
	marginLeftMobile: {
		type: 'string',
		default: generateBlocksDefaults.buttonContainer.marginLeftMobile,
	},
	stack: {
		type: 'boolean',
		default: generateBlocksDefaults.buttonContainer.stack,
	},
	stackTablet: {
		type: 'boolean',
		default: generateBlocksDefaults.buttonContainer.stackTablet,
	},
	stackMobile: {
		type: 'boolean',
		default: generateBlocksDefaults.buttonContainer.stackMobile,
	},
	fillHorizontalSpace: {
		type: 'boolean',
		default: generateBlocksDefaults.buttonContainer.fillHorizontalSpace,
	},
	fillHorizontalSpaceTablet: {
		type: 'boolean',
		default: generateBlocksDefaults.buttonContainer.fillHorizontalSpaceTablet,
	},
	fillHorizontalSpaceMobile: {
		type: 'boolean',
		default: generateBlocksDefaults.buttonContainer.fillHorizontalSpaceMobile,
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
/* eslint-enable no-undef */
