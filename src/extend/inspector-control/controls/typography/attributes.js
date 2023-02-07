export default function getTypographyAttributes( defaults ) {
	return {
		fontWeight: {
			type: 'string',
			default: defaults.fontWeight,
		},

		textTransform: {
			type: 'string',
			default: '',
		},

		alignment: {
			type: 'string',
			default: defaults.alignment,
		},
		alignmentTablet: {
			type: 'string',
			default: defaults.alignmentTablet,
		},
		alignmentMobile: {
			type: 'string',
			default: defaults.alignmentMobile,
		},

		// FONT SIZE ATTRIBUTES
		fontSize: {
			type: 'number',
			default: defaults.fontSize,
		},
		fontSizeTablet: {
			type: 'number',
			default: defaults.fontSizeTablet,
		},
		fontSizeMobile: {
			type: 'number',
			default: defaults.fontSizeMobile,
		},
		fontSizeUnit: {
			type: 'string',
			default: defaults.fontSizeUnit,
		},

		// LINE HEIGHT ATTRIBUTES
		lineHeight: {
			type: 'number',
			default: defaults.lineHeight,
		},
		lineHeightTablet: {
			type: 'number',
			default: defaults.lineHeightTablet,
		},
		lineHeightMobile: {
			type: 'number',
			default: defaults.lineHeightMobile,
		},
		lineHeightUnit: {
			type: 'string',
			default: defaults.lineHeightUnit,
		},

		// LETTER SPACING ATTRIBUTES
		letterSpacing: {
			type: 'number',
			default: defaults.letterSpacing,
		},
		letterSpacingTablet: {
			type: 'number',
			default: defaults.letterSpacingTablet,
		},
		letterSpacingMobile: {
			type: 'number',
			default: defaults.letterSpacingMobile,
		},

		// FONT FAMILY ATTRIBUTES
		fontFamily: {
			type: 'string',
			default: defaults.fontFamily,
		},
		fontFamilyFallback: {
			type: 'string',
			default: defaults.fontFamilyFallback,
		},
		googleFont: {
			type: 'boolean',
			default: defaults.googleFont,
		},
		googleFontVariants: {
			type: 'string',
			default: defaults.googleFontVariants,
		},

	};
}
