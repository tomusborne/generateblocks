export function getContentAttribute( attributes, blockName ) {
	let contentValue = '';

	if ( 'generateblocks/button' === blockName ) {
		contentValue = attributes.text;
	}

	if ( 'generateblocks/headline' === blockName ) {
		contentValue = attributes.content;
	}

	return contentValue;
}
