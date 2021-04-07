export default function getAllUniqueIds( allBlocks, data, currentClientId ) {
	Object.keys( allBlocks ).forEach( ( key ) => {
		const clientId = 'undefined' !== typeof allBlocks[ key ].clientId ? allBlocks[ key ].clientId : '';
		const blockName = 'undefined' !== typeof allBlocks[ key ].name ? allBlocks[ key ].name : '';

		if ( clientId !== currentClientId && blockName.includes( 'generateblocks' ) ) {
			data.push( allBlocks[ key ].attributes.uniqueId );
		}

		if ( 'undefined' !== typeof allBlocks[ key ].innerBlocks && allBlocks[ key ].innerBlocks.length > 0 ) {
			getAllUniqueIds( allBlocks[ key ].innerBlocks, data, currentClientId );
		}
	} );

	return data;
}
