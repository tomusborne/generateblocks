
export default function getLayoutAttributes( defaults ) {
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
			default: defaults[ option ],
		};

		attributes[ option + 'Tablet' ] = {
			type: 'string',
			default: defaults[ option + 'Tablet' ],
		};

		attributes[ option + 'Mobile' ] = {
			type: 'string',
			default: defaults[ option + 'Mobile' ],
		};
	} );

	attributes.zindex = {
		type: 'number',
		default: defaults.zindex,
	};

	return attributes;
}
