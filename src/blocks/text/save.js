/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

export function Save( { attributes } ) {
	const { content, tagName, className, uniqueId, styles = {}, htmlAttributes = [] } = attributes;
	const TagName = tagName;
	const classNames = [];
	if ( className ) {
		classNames.push( className );
	}

	if ( Object.keys( styles ).length > 0 ) {
		classNames.push( `gb-text-${ uniqueId }` );
	}

	const blockProps = useBlockProps.save(
		{
			className: classNames.join( ' ' ),
			...htmlAttributes,
		}
	);

	return (
		<TagName { ...blockProps }>
			<RichText.Content value={ content } />
		</TagName>
	);
}
