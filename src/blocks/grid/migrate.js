import {
	addFilter,
} from '@wordpress/hooks';

/**
 * Convert number attribute type to strings.
 */
addFilter(
	'blocks.getBlockAttributes',
	'generateblocks/grid/migrate-attributes',
	( blockAttributes, blockType, innerHTML, attributes ) => {
		if ( 'generateblocks/grid' === blockType.name ) {
			const attributesToConvert = [
				'horizontalGap',
				'horizontalGapTablet',
				'horizontalGapMobile',
				'verticalGap',
				'verticalGapTablet',
				'verticalGapMobile',
			];

			attributesToConvert.forEach( ( attribute ) => {
				if ( 'number' === typeof attributes[ attribute ] ) {
					blockAttributes[ attribute ] = attributes[ attribute ].toString();
				}
			} );
		}

		return blockAttributes;
	}
);
