
export default function getFlexChildAttributes( defaults ) {
	const options = [
		'flexGrow',
		'flexShrink',
		'flexBasis',
		'order',
	];

	const numberOptions = [
		'flexGrow',
		'flexShrink',
		'order',
	];

	const attributes = {};

	options.forEach( ( option ) => {
		attributes[ option ] = {
			type: numberOptions.includes( option ) ? 'number' : 'string',
			default: defaults[ option ],
		};

		attributes[ option + 'Tablet' ] = {
			type: numberOptions.includes( option ) ? 'number' : 'string',
			default: defaults[ option + 'Tablet' ],
		};

		attributes[ option + 'Mobile' ] = {
			type: numberOptions.includes( option ) ? 'number' : 'string',
			default: defaults[ option + 'Mobile' ],
		};
	} );

	return attributes;
}
