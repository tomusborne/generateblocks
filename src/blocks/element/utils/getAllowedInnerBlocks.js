import { textTagNames } from './getElementType';

export function getAllowedInnerBlocks( tagName ) {
	if ( textTagNames.includes( tagName ) ) {
		return [ 'generateblocks/text', 'generateblocks/html-render' ];
	}

	return true;
}
