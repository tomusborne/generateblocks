/**
 * Block: Buttons
 */

import classnames from 'classnames';

const {
	RichText
} = wp.blockEditor;

export default ( { attributes } ) => {

	const {
		uniqueId,
		elementId,
		cssClasses,
		text,
		url,
		target,
		relNoFollow,
		relSponsored,
		icon,
		iconLocation,
		removeText,
		ariaLabel,
	} = attributes;

	const sanitizeSVG = ( svg ) => {
		return DOMPurify.sanitize( svg, { USE_PROFILES: { svg: true, svgFilters: true } } );
	}

	const relAttributes = [];

	if ( relNoFollow ) {
		relAttributes.push( 'nofollow' );
	}

	if ( target ) {
		relAttributes.push( 'noopener', 'noreferrer' );
	}

	if ( relSponsored ) {
		relAttributes.push( 'sponsored' );
	}

	return (
		<a
			id={ !! elementId ? elementId : undefined }
			className={ classnames( {
				'gb-button': true,
				[`gb-button-${ uniqueId }`]: true,
				[`${ cssClasses }`]: '' !== cssClasses
			} ) }
			href={ !! url ? url : undefined }
			target={ !! target ? '_blank' : undefined }
			rel={ relAttributes && relAttributes.length > 0 ? relAttributes.join( ' ' ) : undefined }
			aria-label={ !! removeText && !! ariaLabel ? ariaLabel : undefined }
		>
			{ icon && 'left' === iconLocation &&
				<span
					className="gb-icon"
					dangerouslySetInnerHTML={ { __html: sanitizeSVG( icon ) } }
				/>
			}
			{ ! removeText &&
				<RichText.Content tagName="span" className="button-text" value={ text } key="button-text" />
			}
			{ icon && 'right' === iconLocation &&
				<span
					className="gb-icon"
					dangerouslySetInnerHTML={ { __html: sanitizeSVG( icon ) } }
				/>
			}
		</a>
	);
}
