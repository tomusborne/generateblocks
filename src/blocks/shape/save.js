/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import sanitizeSVG from '../../utils/sanitize-svg';
import { getBlockClasses } from '@utils/getBlockClasses';

export function Save( { attributes } ) {
	const {
		html,
		htmlAttributes = {},
	} = attributes;

	const classNames = getBlockClasses(
		'gb-shape',
		attributes,
		true
	);

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
