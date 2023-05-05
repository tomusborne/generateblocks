/**
 * Return the blocks with its inner blocks.
 *
 * @return {Array} The blocks array.
 */
export default () => {
	const blocks = wp.data.select( 'core/block-editor' ).getBlocks();

	return blocks.map( ( block ) => {
		if ( 'core/widget-area' !== block.name ) {
			return block;
		}

		// For the widget editor we need to manually get the inner blocks.
		const innerBlocks = wp.data.select( 'core/block-editor' ).getBlocks( block.clientId );

		return {
			...block,
			innerBlocks,
		};
	} );
};
