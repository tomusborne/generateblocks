import { getColumnsFromLayout } from '../../../grid/components/LayoutSelector';
import { createBlock } from '@wordpress/blocks';

export const getDefaultInnerBlock = ( uniqueId ) => {
	const attributes = getColumnsFromLayout( '100', uniqueId )[ 0 ];
	const containerInnerBlocks = [
		createBlock( 'generateblocks/headline', {
			isDynamicContent: true,
		} ),
		createBlock( 'generateblocks/headline', {
			isDynamicContent: true,
			element: 'p',
			contentType: 'post-date-published',
		} ),
	];

	return createBlock(
		'generateblocks/container',
		Object.assign( {}, attributes, { isQueryLoop: true } ),
		containerInnerBlocks
	);
};
