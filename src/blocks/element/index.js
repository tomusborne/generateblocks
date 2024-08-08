import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { Edit } from './edit';
import metadata from './block.json';
import { Save } from './save';
import { getElementType } from './utils/getElementType';
import { getIcon } from '@utils';

import './index.scss';

export const Test = 'bazinga';

registerBlockType( metadata, {
	edit: Edit,
	save: Save,
	icon: getIcon( 'element' ),
} );

registerBlockVariation(
	'generateblocks/element',
	{
		name: 'generateblocks/container',
		description: __( 'A container to add your blocks to.', 'generateblocks' ),
		title: 'Container',
		attributes: {
			tagName: 'div',
		},
		isActive: ( blockAttributes ) => {
			if ( 'grid' === blockAttributes?.styles?.display ) {
				return false;
			}

			return 'container' === getElementType( blockAttributes.tagName );
		},
		isDefault: true,
	},
);

registerBlockVariation(
	'generateblocks/element',
	{
		name: 'generateblocks/grid',
		description: __( 'Organize your content into sections and rows.', 'generateblocks' ),
		icon: getIcon( 'grid' ),
		title: 'Grid',
		attributes: {
			tagName: 'div',
			styles: {
				display: 'grid',
				gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
			},
		},
		innerBlocks: [
			[
				'generateblocks/element',
				{
					tagName: 'div',
				},
			],
			[
				'generateblocks/element',
				{
					tagName: 'div',
				},
			],
		],
		isActive: ( blockAttributes ) => 'grid' === blockAttributes?.styles?.display,
	},
);
