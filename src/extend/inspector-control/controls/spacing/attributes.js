export default function getSpacingAttributes( defaults ) {
	return {
		spacing: {
			type: 'object',
			default: {},
		},
		marginTop: {
			type: 'string',
			default: defaults.marginTop,
		},
		marginRight: {
			type: 'string',
			default: defaults.marginRight,
		},
		marginBottom: {
			type: 'string',
			default: defaults.marginBottom,
		},
		marginLeft: {
			type: 'string',
			default: defaults.marginLeft,
		},
		marginUnit: {
			type: 'string',
			default: defaults.marginUnit,
		},
		marginSyncUnits: {
			type: 'boolean',
			default: false,
		},
		marginTopTablet: {
			type: 'string',
			default: defaults.marginTopTablet,
		},
		marginRightTablet: {
			type: 'string',
			default: defaults.marginRightTablet,
		},
		marginBottomTablet: {
			type: 'string',
			default: defaults.marginBottomTablet,
		},
		marginLeftTablet: {
			type: 'string',
			default: defaults.marginLeftTablet,
		},
		marginTopMobile: {
			type: 'string',
			default: defaults.marginTopMobile,
		},
		marginRightMobile: {
			type: 'string',
			default: defaults.marginRightMobile,
		},
		marginBottomMobile: {
			type: 'string',
			default: defaults.marginBottomMobile,
		},
		marginLeftMobile: {
			type: 'string',
			default: defaults.marginLeftMobile,
		},
		paddingTop: {
			type: 'string',
			default: defaults.paddingTop,
		},
		paddingRight: {
			type: 'string',
			default: defaults.paddingRight,
		},
		paddingBottom: {
			type: 'string',
			default: defaults.paddingBottom,
		},
		paddingLeft: {
			type: 'string',
			default: defaults.paddingLeft,
		},
		paddingTopTablet: {
			type: 'string',
			default: defaults.paddingTopTablet,
		},
		paddingRightTablet: {
			type: 'string',
			default: defaults.paddingRightTablet,
		},
		paddingBottomTablet: {
			type: 'string',
			default: defaults.paddingBottomTablet,
		},
		paddingLeftTablet: {
			type: 'string',
			default: defaults.paddingLeftTablet,
		},
		paddingTopMobile: {
			type: 'string',
			default: defaults.paddingTopMobile,
		},
		paddingRightMobile: {
			type: 'string',
			default: defaults.paddingRightMobile,
		},
		paddingBottomMobile: {
			type: 'string',
			default: defaults.paddingBottomMobile,
		},
		paddingLeftMobile: {
			type: 'string',
			default: defaults.paddingLeftMobile,
		},
		paddingUnit: {
			type: 'string',
			default: defaults.paddingUnit,
		},
		paddingSyncUnits: {
			type: 'boolean',
			default: false,
		},
		borderSizeTop: {
			type: 'string',
			default: defaults.borderSizeTop,
		},
		borderSizeRight: {
			type: 'string',
			default: defaults.borderSizeRight,
		},
		borderSizeBottom: {
			type: 'string',
			default: defaults.borderSizeBottom,
		},
		borderSizeLeft: {
			type: 'string',
			default: defaults.borderSizeLeft,
		},
		borderSizeTopTablet: {
			type: 'string',
			default: defaults.borderSizeTopTablet,
		},
		borderSizeRightTablet: {
			type: 'string',
			default: defaults.borderSizeRightTablet,
		},
		borderSizeBottomTablet: {
			type: 'string',
			default: defaults.borderSizeBottomTablet,
		},
		borderSizeLeftTablet: {
			type: 'string',
			default: defaults.borderSizeLeftTablet,
		},
		borderSizeTopMobile: {
			type: 'string',
			default: defaults.borderSizeTopMobile,
		},
		borderSizeRightMobile: {
			type: 'string',
			default: defaults.borderSizeRightMobile,
		},
		borderSizeBottomMobile: {
			type: 'string',
			default: defaults.borderSizeBottomMobile,
		},
		borderSizeLeftMobile: {
			type: 'string',
			default: defaults.borderSizeLeftMobile,
		},
		borderRadiusTopRight: {
			type: 'string',
			default: defaults.borderRadiusTopRight,
		},
		borderRadiusBottomRight: {
			type: 'string',
			default: defaults.borderRadiusBottomRight,
		},
		borderRadiusBottomLeft: {
			type: 'string',
			default: defaults.borderRadiusBottomLeft,
		},
		borderRadiusTopLeft: {
			type: 'string',
			default: defaults.borderRadiusTopLeft,
		},
		borderRadiusUnit: {
			type: 'string',
			default: defaults.borderRadiusUnit,
		},
		borderRadiusTopRightTablet: {
			type: 'string',
			default: defaults.borderRadiusTopRightTablet,
		},
		borderRadiusBottomRightTablet: {
			type: 'string',
			default: defaults.borderRadiusBottomRightTablet,
		},
		borderRadiusBottomLeftTablet: {
			type: 'string',
			default: defaults.borderRadiusBottomLeftTablet,
		},
		borderRadiusTopLeftTablet: {
			type: 'string',
			default: defaults.borderRadiusTopLeftTablet,
		},
		borderRadiusTopRightMobile: {
			type: 'string',
			default: defaults.borderRadiusTopRightMobile,
		},
		borderRadiusBottomRightMobile: {
			type: 'string',
			default: defaults.borderRadiusBottomRightMobile,
		},
		borderRadiusBottomLeftMobile: {
			type: 'string',
			default: defaults.borderRadiusBottomLeftMobile,
		},
		borderRadiusTopLeftMobile: {
			type: 'string',
			default: defaults.borderRadiusTopLeftMobile,
		},
		inlineWidth: {
			type: 'boolean',
			default: defaults.inlineWidth,
		},
		inlineWidthTablet: {
			type: 'boolean',
			default: defaults.inlineWidthTablet,
		},
		inlineWidthMobile: {
			type: 'boolean',
			default: defaults.inlineWidthMobile,
		},
		stack: {
			type: 'boolean',
			default: defaults.stack,
		},
		stackTablet: {
			type: 'boolean',
			default: defaults.stackTablet,
		},
		stackMobile: {
			type: 'boolean',
			default: defaults.stackMobile,
		},
		fillHorizontalSpace: {
			type: 'boolean',
			default: defaults.fillHorizontalSpace,
		},
		fillHorizontalSpaceTablet: {
			type: 'boolean',
			default: defaults.fillHorizontalSpaceTablet,
		},
		fillHorizontalSpaceMobile: {
			type: 'boolean',
			default: defaults.fillHorizontalSpaceMobile,
		},
	};
}
