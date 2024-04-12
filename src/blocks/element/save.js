/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export function Save( { attributes: { tagName: Tag } } ) {
	return <Tag { ...useInnerBlocksProps.save( useBlockProps.save() ) } />;
}
