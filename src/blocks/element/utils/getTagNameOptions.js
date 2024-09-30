import {
	containerTagNames,
	getElementType,
	textTagNames,
} from './getElementType';

export function getTagNameOptions( tagNames, tagName ) {
	const elementType = getElementType( tagName );

	return tagNames.map( ( tag ) => {
		if ( 'container' === elementType && ! containerTagNames.includes( tag ) ) {
			return false;
		}

		if ( 'container' !== elementType && ! textTagNames.includes( tag ) ) {
			return false;
		}

		return {
			label: tag,
			value: tag,
		};
	} ).filter( Boolean );
}
