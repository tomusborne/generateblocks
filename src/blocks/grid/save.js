/**
 * Block: Grid
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
			'gb-grid-wrapper': true,
			[ `gb-grid-wrapper-${ uniqueId }` ]: true,
		} ),
	};

	htmlAttributes = applyFilters( 'generateblocks.frontend.htmlAttributes', htmlAttributes, 'generateblocks/grid', attributes );

	return (
		<div
			{ ...htmlAttributes }
		>
			<InnerBlocks.Content />
		</div>
	);
};
