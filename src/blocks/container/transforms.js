import { convertLegacyHtmlAttributes } from '@utils/convertLegacyHtmlAttributes';
import { convertLocalToStyles } from '@utils/legacyStyleUtils';
import { createBlock, getBlockType } from '@wordpress/blocks';

export const transforms = {
	to: [
		{
			type: 'block',
			blocks: [ 'generateblocks/element' ],
			isMatch: ( { useInnerContainer, variantRole } ) => {
				if ( useInnerContainer || variantRole ) {
					return false;
				}

				return true;
			},
			transform: ( attributes, blocks ) => {
				const { tagName, htmlAttributes } = attributes;
				const attributeData = getBlockType( 'generateblocks/container' )?.attributes;
				const styles = convertLocalToStyles( attributeData, attributes, '&:is(:hover, :focus)' );
				const newHtmlAttributes = convertLegacyHtmlAttributes( htmlAttributes );

				// Clone the Blocks to be Grouped
				// Failing to create new block references causes the original blocks
				// to be replaced in the switchToBlockType call thereby meaning they
				// are removed both from their original location and within the
				// new group block.
				const groupInnerBlocks = blocks.map( ( block ) => {
					return createBlock(
						block.name,
						block.attributes,
						block.innerBlocks
					);
				} );

				return createBlock(
					'generateblocks/element',
					{
						tagName,
						styles,
						htmlAttributes: newHtmlAttributes,
					},
					groupInnerBlocks
				);
			},
		},
	],
};
