
export default function getLayoutAttributes( defaults ) {
	const options = [
		'display',
		'flexDirection',
		'flexWrap',
		'alignItems',
		'justifyContent',
		'columnGap',
		'rowGap',
		'position',
		'overflowX',
		'overflowY',
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

	attributes.zindexTablet = {
		type: 'number',
		default: defaults.zindexTablet,
	};

	attributes.zindexMobile = {
		type: 'number',
		default: defaults.zindexMobile,
	};

	return attributes;
}
