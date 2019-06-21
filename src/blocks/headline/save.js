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
		element,
		content,
	} = attributes;

	return (
		<RichText.Content
			tagName={ element }
			id={ !! elementId ? elementId : undefined }
			className={ classnames( {
				'gp-headline': true,
				[`gp-headline-${ uniqueId }`]: true,
				[`${ cssClasses }`]: '' !== cssClasses
			} ) }
			value={ content }
		/>
	);
}
