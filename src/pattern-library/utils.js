export function updateUniqueIds( blocks ) {
	return blocks.map( ( block ) => {
		// Check if the block has a uniqueId attribute
		if ( block.attributes && block.attributes.uniqueId ) {
			// Generate a new uniqueId
			const newUniqueId = block.clientId.substr( 2, 9 ).replace( '-', '' );

			// Update the block's uniqueId attribute
			block.attributes.uniqueId = newUniqueId;
		}
		// Recursively update uniqueIds for innerBlocks if they exist
		if ( block.innerBlocks && block.innerBlocks.length > 0 ) {
			block.innerBlocks = updateUniqueIds( block.innerBlocks );
		}
		return block;
	} );
}

export function isEmptyContentBlock( selectedBlock ) {
	if ( 'core/paragraph' === selectedBlock?.name ) {
		const currentContent = selectedBlock?.attributes?.content;

		if ( 'string' === typeof currentContent ) {
			return ! currentContent.trim();
		} else if ( 'object' === typeof currentContent ) {
			return ! currentContent?.text.trim();
		}
	}

	return false;
}
