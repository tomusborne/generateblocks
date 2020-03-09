/**
 * Block: Button Container
 */

import classnames from 'classnames';

const {
	InnerBlocks
} = wp.blockEditor;

export default ( { attributes } ) => {

	const {
		uniqueId,
		elementId,
		cssClasses,
	} = attributes;

	return (
		<div
			id={ !! elementId ? elementId : undefined }
			className={ classnames( {
				'gb-button-wrapper': true,
				[`gb-button-wrapper-${ uniqueId }`]: true,
				[`${ cssClasses }`]: '' !== cssClasses
			} ) }
		>
			<InnerBlocks.Content />
		</div>
	);
}
