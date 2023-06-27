const spacingDefaults = {
	marginTop: {
		default: '',
	},
	marginRight: {
		default: '',
	},
	marginBottom: {
		default: '',
	},
	marginLeft: {
		default: '',
	},
	marginBottomMobile: {
		default: '',
	},
	marginUnit: {
		default: 'px',
	},
	paddingTop: {
		default: '',
	},
	paddingRight: {
		default: '',
	},
	paddingBottom: {
		default: '',
	},
	paddingLeft: {
		default: '',
	},
	paddingTopTablet: {
		default: '',
	},
	paddingLeftTablet: {
		default: '',
	},
	paddingLeftMobile: {
		default: '',
	},
	paddingUnit: {
		default: 'px',
	},
};

const typographyDefaults = {
	fontFamily: {
		default: '',
	},
	fontWeight: {
		default: '',
	},
	textTransform: {
		default: '',
	},
	fontSize: {
		default: '',
	},
	fontSizeTablet: {
		default: '',
	},
	fontSizeMobile: {
		default: '',
	},
	fontSizeUnit: {
		default: 'px',
	},
	lineHeight: {
		default: '',
	},
	lineHeightTablet: {
		default: '',
	},
	lineHeightMobile: {
		default: '',
	},
	lineHeightUnit: {
		default: 'em',
	},
	letterSpacing: {
		default: '',
	},
	alignment: {
		default: '',
	},
	alignmentTablet: {
		default: '',
	},
};

const borderDefaults = {
	borderSizeTop: {
		default: '',
	},
	borderSizeRight: {
		default: '',
	},
	borderColor: {
		default: '',
	},
	borderColorOpacity: {
		default: 1,
	},
	borderColorHover: {
		default: '',
	},
	borderColorHoverOpacity: {
		default: 1,
	},
	borderRadiusTopLeft: {
		default: '',
	},
	bordeRadiusTopLeftMobile: {
		default: '',
	},
	borderRadiusTopRight: {
		default: '',
	},
	borderRadiusBottomRight: {
		default: '',
	},
	borderRadiusBottomLeft: {
		default: '',
	},
	borderRadiusUnit: {
		default: 'px',
	},
};

const sizingDefaults = {
	width: {
		default: '',
	},
	widthMobile: {
		default: '',
	},
};

const iconStyleDefaults = {
	iconSize: {
		default: 1,
	},
	iconSizeTablet: {
		default: '',
	},
	iconSizeMobile: {
		default: '',
	},
	iconSizeUnit: {
		default: 'em',
	},
};

const blockDefaults = {
	uniqueId: {
		default: '',
	},
	...spacingDefaults,
	...typographyDefaults,
	...borderDefaults,
	...sizingDefaults,
	...iconStyleDefaults,
};

const defaultAttributes = Object.entries( blockDefaults ).reduce( ( acc, [ key, value ] ) => {
	return { ...acc, [ key ]: value.default };
}, {} );

export {
	blockDefaults,
	defaultAttributes,
};
