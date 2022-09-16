
export default function getLayoutAttributes( name ) {
	const options = [
		'display',
		'flexDirection',
		'flexWrap',
		'alignItems',
		'justifyContent',
	];

	const attributes = {};

	options.forEach( ( option ) => {
		attributes[ option ] = {
			type: 'string',
			default: generateBlocksDefaults[ name ][ option ],
		};

		attributes[ option + 'Tablet' ] = {
			type: 'string',
			default: generateBlocksDefaults[ name ][ option + 'Tablet' ],
		};

		attributes[ option + 'Mobile' ] = {
			type: 'string',
			default: generateBlocksDefaults[ name ][ option + 'Mobile' ],
		};
	} );

	return attributes;
}
