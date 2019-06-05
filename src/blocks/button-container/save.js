/**
 * Block: Section
 */

import classnames from 'classnames';

const {
	InnerBlocks
} = wp.editor;

export default ( { attributes } ) => {

	const {
		uniqueId,
		elementId,
		cssClasses
	} = attributes;

	return (
		<div
			id={ !! elementId ? elementId : undefined }
			className={ classnames( {
				'gp-button-wrapper': true,
				[`gp-button-wrapper-${ uniqueId }`]: true,
				[`${ cssClasses }`]: '' !== cssClasses
			} ) }
		>
			<InnerBlocks.Content />
		</div>
	);
}
