/**
 * Block: Grid
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
				'gb-grid-wrapper': true,
				[`gb-grid-wrapper-${ uniqueId }`]: true,
				[`${ cssClasses }`]: '' !== cssClasses
			} ) }
		>
			<InnerBlocks.Content />
		</div>
	);
}
