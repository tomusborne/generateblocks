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
		backgroundColorHover: {
			type: 'string',
			default: defaults.backgroundColorHover,
		},
		backgroundColorHoverOpacity: {
			type: 'number',
			default: defaults.backgroundColorHoverOpacity,
		},
		backgroundColorCurrent: {
			type: 'string',
			default: defaults.backgroundColorCurrent,
		},
		textColor: {
			type: 'string',
			default: defaults.textColor,
		},
		textColorHover: {
			type: 'string',
			default: defaults.textColorHover,
		},
		textColorCurrent: {
			type: 'string',
			default: defaults.textColorCurrent,
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
		borderColorHover: {
			type: 'string',
			default: defaults.borderColorHover,
		},
		borderColorHoverOpacity: {
			type: 'number',
			default: defaults.borderColorHoverOpacity,
		},
		borderColorCurrent: {
			type: 'string',
			default: defaults.borderColorCurrent,
		},
		highlightTextColor: {
			type: 'string',
			default: defaults.highlightTextColor,
		},
	};
}
