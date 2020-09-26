/**
 * Block: Button Container
 */

import classnames from 'classnames';

const {
	InnerBlocks,
} = wp.blockEditor;

const {
	applyFilters,
} = wp.hooks;

export default ( { attributes } ) => {
	const {
		uniqueId,
	} = attributes;

	let htmlAttributes = {
		className: classnames( {
			'gb-button-wrapper': true,
			[ `gb-button-wrapper-${ uniqueId }` ]: true,
		} ),
	};

	htmlAttributes = applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/button-container', attributes );

	return (
		<div
			{ ...htmlAttributes }
		>
			<InnerBlocks.Content />
		</div>
	);
};
