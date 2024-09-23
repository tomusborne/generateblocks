/**
 * WordPress dependencies
 */
import { getBlockClasses } from '@utils/getBlockClasses';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export function Save( props ) {
	const {
		tagName: Tag,
		htmlAttributes = {},
		linkHtmlAttributes,
	} = props.attributes;

	const classNames = getBlockClasses( 'gb-media', props.attributes );

	const blockProps = useBlockProps.save(
		{
			className: classNames.join( ' ' ).trim(),
			...htmlAttributes,
		}
	);

	return (
		<>
			{ !! linkHtmlAttributes.href ? (
				<a { ...linkHtmlAttributes }>
					<Tag { ...useInnerBlocksProps.save( blockProps ) } />
				</a>
			) : (
				<Tag { ...useInnerBlocksProps.save( blockProps ) } />
			) }
		</>
	);
}
