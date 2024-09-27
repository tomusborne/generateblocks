/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Icon } from './components/Icon.jsx';
import { getBlockClasses } from '@utils/getBlockClasses.js';

export function Save( { attributes } ) {
	const {
		content,
		tagName,
		htmlAttributes = {},
		icon,
		iconLocation,
		iconOnly,
	} = attributes;

	const TagName = tagName;

	const classNames = getBlockClasses(
		'gb-text',
		attributes,
		! icon
	);

	const blockProps = useBlockProps.save(
		{
			className: classNames.join( ' ' ).trim(),
			...htmlAttributes,
		}
	);

	return (
		<TagName { ...blockProps }>
			{ !! icon ? (
				<>
					{ 'before' === iconLocation && ( <Icon icon={ icon } /> ) }
					{ !! content && ! iconOnly && ( <span className="gb-text"><RichText.Content value={ content } /></span> ) }
					{ 'after' === iconLocation && ( <Icon icon={ icon } /> ) }
				</>
			) : (
				<RichText.Content value={ content } />
			) }
		</TagName>
	);
}
