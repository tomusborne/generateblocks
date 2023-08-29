import { applyFilters } from '@wordpress/hooks';

export default function getEditorSelector( selector, { name, attributes } ) {
	return applyFilters(
		'generateblocks.editor.cssSelector',
		selector,
		{
			name,
			attributes,
		}
	);
}
