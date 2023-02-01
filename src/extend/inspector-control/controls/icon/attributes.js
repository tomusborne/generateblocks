export default function getIconAttributes( defaults ) {
	return {
		icon: {
			type: 'string',
			source: 'html',
			selector: '.gb-icon',
		},
		hasIcon: {
			type: 'boolean',
			default: false,
		},
		iconColor: {
			type: 'string',
			default: defaults.iconColor,
		},
		iconColorOpacity: {
			type: 'number',
			default: defaults.iconColorOpacity,
		},
		customIcon: {
			type: 'boolean',
			default: false,
		},
		iconLocation: {
			type: 'string',
			default: defaults.iconLocation,
		},
		iconLocationTablet: {
			type: 'string',
			default: defaults.iconLocationTablet,
		},
		iconLocationMobile: {
			type: 'string',
			default: defaults.iconLocationMobile,
		},
		iconVerticalAlignment: {
			type: 'string',
			default: defaults.iconVerticalAlignment,
		},
		iconVerticalAlignmentTablet: {
			type: 'string',
			default: defaults.iconVerticalAlignmentTablet,
		},
		iconVerticalAlignmentMobile: {
			type: 'string',
			default: defaults.iconVerticalAlignmentMobile,
		},
		iconPaddingTop: {
			type: 'string',
			default: defaults.iconPaddingTop,
		},
		iconPaddingRight: {
			type: 'string',
			default: defaults.iconPaddingRight,
		},
		iconPaddingBottom: {
			type: 'string',
			default: defaults.iconPaddingBottom,
		},
		iconPaddingLeft: {
			type: 'string',
			default: defaults.iconPaddingLeft,
		},
		iconPaddingTopTablet: {
			type: 'string',
			default: defaults.iconPaddingTopTablet,
		},
		iconPaddingRightTablet: {
			type: 'string',
			default: defaults.iconPaddingRightTablet,
		},
		iconPaddingBottomTablet: {
			type: 'string',
			default: defaults.iconPaddingBottomTablet,
		},
		iconPaddingLeftTablet: {
			type: 'string',
			default: defaults.iconPaddingLeftTablet,
		},
		iconPaddingTopMobile: {
			type: 'string',
			default: defaults.iconPaddingTopMobile,
		},
		iconPaddingRightMobile: {
			type: 'string',
			default: defaults.iconPaddingRightMobile,
		},
		iconPaddingBottomMobile: {
			type: 'string',
			default: defaults.iconPaddingBottomMobile,
		},
		iconPaddingLeftMobile: {
			type: 'string',
			default: defaults.iconPaddingLeftMobile,
		},
		iconPaddingUnit: {
			type: 'string',
			default: defaults.iconPaddingUnit,
		},
		iconPaddingSyncUnits: {
			type: 'boolean',
			default: false,
		},
		iconSize: {
			type: 'number',
			default: defaults.iconSize,
		},
		iconSizeTablet: {
			type: 'number',
			default: defaults.iconSizeTablet,
		},
		iconSizeMobile: {
			type: 'number',
			default: defaults.iconSizeMobile,
		},
		iconSizeUnit: {
			type: 'string',
			default: defaults.iconSizeUnit,
		},
		removeText: {
			type: 'boolean',
			default: defaults.removeText,
		},
	};
}
