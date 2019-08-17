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
	} = attributes;

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
		>
			<RichText.Content tagName="span" className="button-text" value={ text } key="button-text" />
		</a>
	);
}
