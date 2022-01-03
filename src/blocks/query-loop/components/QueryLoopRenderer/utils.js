import { getColumnsFromLayout } from '../../../grid/components/LayoutSelector';
import { createBlock } from '@wordpress/blocks';

export const getDefaultInnerBlock = ( uniqueId, type ) => {
	const attributes = getColumnsFromLayout( '100', uniqueId )[ 0 ];
	const containerInnerBlocks = type === 'taxonomy'
		? getTaxonomyDefaultInnerBlocks( uniqueId )
		: getPostTypeDefaultInnerBlocks( uniqueId );

	return createBlock(
		'generateblocks/container',
		Object.assign( {}, attributes, { isQueryLoop: true } ),
		containerInnerBlocks
	);
};

const getPostTypeDefaultInnerBlocks = function( uniqueId ) {
	return [
		createBlock( 'generateblocks/headline', {
			isDynamicContent: true,
		} ),
		createBlock( 'generateblocks/headline', {
			isDynamicContent: true,
			element: 'p',
			contentType: 'post-date-published',
		} ),
	];
}

const getTaxonomyDefaultInnerBlocks = function( uniqueId ) {
	return [
		createBlock( 'generateblocks/headline', {
			isDynamicContent: true,
		} ),
	];
}
