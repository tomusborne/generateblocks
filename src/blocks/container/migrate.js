import {
	addFilter,
} from '@wordpress/hooks';

/**
 * Convert number attribute type to strings.
 *
 * @since 1.4.0
 */
addFilter(
	'blocks.getBlockAttributes',
	'generateblocks/container/migrate-attributes',
	( blockAttributes, blockType, innerHTML, attributes ) => {
		if ( 'generateblocks/container' === blockType.name ) {
			const attributesToConvert = [
				'width',
				'widthTablet',
				'widthMobile',
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
