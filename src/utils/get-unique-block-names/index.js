export default function getUniqueBlockNames( blocks ) {
	if ( ! Array.isArray( blocks ) ) {
		return [];
	}

	const blockNames = blocks.map( ( block ) => block.name );

	if ( ! blockNames.length ) {
		return [];
	}

	return [ ...new Set( blockNames ) ];
}
