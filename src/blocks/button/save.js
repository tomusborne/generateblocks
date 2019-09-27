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
		rel,
		icon,
		iconLocation,
		removeText,
		ariaLabel,
	} = attributes;

	const sanitizeSVG = ( svg ) => {
		return DOMPurify.sanitize( svg, { USE_PROFILES: { svg: true, svgFilters: true } } );
	}

	return (
		<a
			id={ !! elementId ? elementId : undefined }
			className={ classnames( {
				'fx-button': true,
				[`fx-button-${ uniqueId }`]: true,
				[`${ cssClasses }`]: '' !== cssClasses
			} ) }
			href={ !! url ? url : undefined }
			target={ !! target ? target : undefined }
			rel={ !! rel ? rel : undefined }
			aria-label={ !! removeText && !! ariaLabel ? ariaLabel : undefined }
		>
			{ icon && 'left' === iconLocation ? (
				<span
					className="fx-icon"
					dangerouslySetInnerHTML={ { __html: sanitizeSVG( icon ) } }
				/>
			) : '' }
			{ ! removeText ? (
				<RichText.Content tagName="span" className="button-text" value={ text } key="button-text" />
			) : '' }
			{ icon && 'right' === iconLocation ? (
				<span
					className="fx-icon"
					dangerouslySetInnerHTML={ { __html: sanitizeSVG( icon ) } }
				/>
			) : '' }
		</a>
	);
}
