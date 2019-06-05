/**
 * Block: Section
 */

import classnames from 'classnames';

const {
	RichText
} = wp.editor;

export default ( { attributes } ) => {

	const {
		uniqueId,
		elementId,
		cssClasses,
		text,
		url,
		target,
	} = attributes;

	return (
		<a
			id={ !! elementId ? elementId : undefined }
			className={ classnames( {
				'gp-button': true,
				[`gp-button-${ uniqueId }`]: true,
				[`${ cssClasses }`]: '' !== cssClasses
			} ) }
			href={ !! url ? url : undefined }
			target={ !! target ? target : undefined }
		>
			<RichText.Content tagName="span" className="button-text" value={ text } key="button-text" />
		</a>
	);
}
