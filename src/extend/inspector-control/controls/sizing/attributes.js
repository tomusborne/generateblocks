export default function getSizingAttributes() {
	return {
		sizing: {
			type: 'object',
			default: {},
		},
		useGlobalMaxWidth: {
			type: 'boolean',
			default: false,
		},
	};
}
