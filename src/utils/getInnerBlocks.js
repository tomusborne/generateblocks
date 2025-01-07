
/**
 * Get the inner blocks from a given block. This function recursively traverses
 * the inner blocks and returns them as flat array.
 *
 * @param {Object} block The block object containing the inner blocks.
 * @return {Array} An array of inner blocks.
 */
export function getInnerBlocks( block ) {
	return block?.innerBlocks?.reduce( ( acc, innerBlock ) => {
		if ( innerBlock.innerBlocks ) {
			return [
				...acc,
				innerBlock,
				...getInnerBlocks( innerBlock ),
			];
		}
		return [ ...acc, innerBlock ];
	}, [] );
}
