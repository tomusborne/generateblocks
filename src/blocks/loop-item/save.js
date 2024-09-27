/**
 * WordPress dependencies
 */
import { getBlockClasses } from '@utils/getBlockClasses';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export function Save( props ) {
	const {
		tagName: Tag,
	} = props.attributes;

	const classNames = getBlockClasses( 'gb-loop-item', props.attributes, true );

	const blockProps = useBlockProps.save(
		{
			className: classNames.join( ' ' ).trim(),
			...props.htmlAttributes,
		}
	);

	return (
		<Tag { ...useInnerBlocksProps.save( blockProps ) } />
	);
}
