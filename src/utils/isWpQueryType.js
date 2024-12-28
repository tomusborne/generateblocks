export function isWpQueryType( queryType ) {
	const queryTypes = generateBlocksEditor?.blocks?.query?.wpQueryTypes ?? [ 'WP_Query' ];

	return queryTypes.includes( queryType );
}
