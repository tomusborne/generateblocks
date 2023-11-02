
export default function getLayoutAttributes( defaults ) {
	const options = [
		'display',
		'flexDirection',
		'flexWrap',
		'flexBasis',
		'alignItems',
		'justifyContent',
		'columnGap',
		'rowGap',
		'position',
		'overflowX',
		'overflowY',
		'gridTemplateColumns',
		'gridTemplateRows',
		'gridAutoColumns',
		'gridAutoRows',
		'gridColumn',
		'gridRow',
	];

	const numberOptions = [
		'zindex',
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
