/**
 * WordPress dependencies
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Icon } from './components/Icon.jsx';

export function Save( { attributes } ) {
	const {
		content,
		tagName,
		className,
		uniqueId,
		styles = {},
		htmlAttributes = [],
		icon,
		iconLocation,
	} = attributes;
	const TagName = tagName;
	const classNames = [];
	if ( className ) {
		classNames.push( className );
	}

	if ( Object.keys( styles ).length > 0 ) {
		classNames.push( `gb-text-${ uniqueId }` );
	}

	if ( ! icon ) {
		classNames.push( 'gb-text' );
	}

	const blockProps = useBlockProps.save(
		{
			className: classNames.join( ' ' ),
			...htmlAttributes,
		}
	);

	return (
		<TagName { ...blockProps }>
			{ !! icon ? (
				<>
					{ 'before' === iconLocation && ( <Icon icon={ icon } /> ) }
					{ !! content && ( <span className="gb-text"><RichText.Content value={ content } /></span> ) }
					{ 'after' === iconLocation && ( <Icon icon={ icon } /> ) }
				</>
			) : (
				<RichText.Content value={ content } />
			) }
		</TagName>
	);
}
