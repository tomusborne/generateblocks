/**
 * Block: Section
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
		level,
		content,
	} = attributes;

	const tagName = 'h' + level;

	return (
		<RichText.Content
			tagName={ tagName }
			id={ !! elementId ? elementId : undefined }
			className={ classnames( {
				'gp-heading': true,
				[`gp-heading-${ uniqueId }`]: true,
				[`${ cssClasses }`]: '' !== cssClasses
			} ) }
			value={ content }
		/>
	);
}
