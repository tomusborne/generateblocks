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
		globalClasses = [],
		iconOnly,
	} = attributes;
	const TagName = tagName;
	const classNames = [];
	if ( className ) {
		classNames.push( className );
	}

	if ( globalClasses.length > 0 ) {
		classNames.push( ...globalClasses );
	}

	if ( Object.keys( styles ).length > 0 ) {
		classNames.push( `gb-text-${ uniqueId }` );
	}

	if ( ! icon ) {
		classNames.push( 'gb-text' );
	}

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
