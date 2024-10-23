/**
 * WordPress dependencies
 */
import { getBlockClasses } from '@utils/getBlockClasses';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export function Save( { attributes } ) {
	const {
		tagName: Tag,
		htmlAttributes = {},
	} = attributes;

	const classNames = getBlockClasses(
		'gb-query',
		attributes,
	);

	const blockProps = useBlockProps.save(
		{
			className: classNames.join( ' ' ).trim(),
			...htmlAttributes,
		}
	);

	return (
		<Tag { ...useInnerBlocksProps.save( blockProps ) } />
	);
}
