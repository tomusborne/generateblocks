export default function getColorsAttributes( defaults ) {
	return {
		backgroundColor: {
			type: 'string',
			default: defaults.backgroundColor,
		},
		backgroundColorOpacity: {
			type: 'number',
			default: defaults.backgroundColorOpacity,
		},
		textColor: {
			type: 'string',
			default: defaults.textColor,
		},
		linkColor: {
			type: 'string',
			default: defaults.linkColor,
		},
		linkColorHover: {
			type: 'string',
			default: defaults.linkColorHover,
		},
		borderColor: {
			type: 'string',
			default: defaults.borderColor,
		},
		borderColorOpacity: {
			type: 'number',
			default: defaults.borderColorOpacity,
		},
		highlightTextColor: {
			type: 'string',
			default: defaults.highlightTextColor,
		},
	};
}
