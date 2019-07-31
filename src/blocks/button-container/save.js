/**
 * Block: Section
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
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
		paddingTopMobile,
		paddingRightMobile,
		paddingBottomMobile,
		paddingLeftMobile,
	} = attributes;

	return (
		<div
			id={ !! elementId ? elementId : undefined }
			className={ classnames( {
				'fx-button-wrapper': true,
				[`fx-button-wrapper-${ uniqueId }`]: true,
				[`${ cssClasses }`]: '' !== cssClasses
			} ) }
		>
			<InnerBlocks.Content />
		</div>
	);
}
