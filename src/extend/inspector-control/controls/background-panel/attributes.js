export default function getBackgroundGradientAttributes( defaults ) {
	return {
		gradient: {
			type: 'boolean',
			default: defaults.gradient,
		},
		gradientDirection: {
			type: 'number',
			default: defaults.gradientDirection,
		},
		gradientColorOne: {
			type: 'string',
			default: defaults.gradientColorOne,
		},
		gradientColorOneOpacity: {
			type: 'number',
			default: defaults.gradientColorOneOpacity,
		},
		gradientColorStopOne: {
			type: 'number',
			default: defaults.gradientColorStopOne,
		},
		gradientColorTwo: {
			type: 'string',
			default: defaults.gradientColorTwo,
		},
		gradientColorTwoOpacity: {
			type: 'number',
			default: defaults.gradientColorTwoOpacity,
		},
		gradientColorStopTwo: {
			type: 'number',
			default: defaults.gradientColorStopTwo,
		},
	};
}
