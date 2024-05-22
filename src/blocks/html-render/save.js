/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import sanitizeSVG from '../../utils/sanitize-svg';

export function Save( { attributes } ) {
	const { html, className, uniqueId, styles = {}, htmlAttributes = [] } = attributes;
	const classNames = [ 'gb-html' ];
	if ( className ) {
		classNames.push( className );
	}

	if ( Object.keys( styles ).length > 0 ) {
		classNames.push( `gb-html-${ uniqueId }` );
	}

	const blockProps = useBlockProps.save(
		{
			className: classNames.join( ' ' ),
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
