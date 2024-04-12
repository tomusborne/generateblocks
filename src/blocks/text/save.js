/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

export function Save( { attributes } ) {
	const { content, tagName } = attributes;
	const TagName = tagName;

	return (
		<TagName { ...useBlockProps.save() }>
			<RichText.Content value={ content } />
		</TagName>
	);
}
