/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import sanitizeSVG from '../../utils/sanitize-svg';

export function Save( { attributes } ) {
	const {
		html,
		className,
		uniqueId,
		styles = {},
		htmlAttributes = [],
		globalClasses = [],
	} = attributes;
	const classNames = [ 'gb-shape' ];
	if ( className ) {
		classNames.push( className );
	}

	if ( globalClasses.length > 0 ) {
		classNames.push( ...globalClasses );
	}

	if ( Object.keys( styles ).length > 0 ) {
		classNames.push( `gb-shape-${ uniqueId }` );
	}

	const blockProps = useBlockProps.save(
		{
			className: classNames.join( ' ' ).trim(),
			...htmlAttributes,
		}
	);

	return (
		<span
			{ ...blockProps }
			dangerouslySetInnerHTML={
				{ __html: sanitizeSVG( html ) }
			}
		/>
	);
}
