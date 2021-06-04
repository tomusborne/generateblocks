export default function resetToZero( value, attributes, defaults ) {
	const usingGlobalStyle = 'undefined' !== typeof attributes.useGlobalStyle && attributes.useGlobalStyle;

	return ! usingGlobalStyle && 'number' === typeof attributes[ value ] && '' === attributes[ value ] && '' !== defaults[ value ];
}
