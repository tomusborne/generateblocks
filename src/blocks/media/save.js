/**
 * WordPress dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export function Save( props ) {
	const {
		tagName: Tag,
		className,
		styles = {},
		uniqueId,
		htmlAttributes = {},
		globalClasses = [],
		linkHtmlAttributes,
	} = props.attributes;

	const classNames = [];
	if ( className ) {
		classNames.push( className );
	}

	if ( globalClasses.length > 0 ) {
		classNames.push( ...globalClasses );
	}

	if ( Object.keys( styles ).length > 0 ) {
		classNames.push( `gb-media-${ uniqueId }` );
	}

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
