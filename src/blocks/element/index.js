import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { Edit } from './edit';
import metadata from './block.json';
import getIcon from '../../utils/get-icon';
import { Save } from './save';
import './index.scss';
import { getBlockType } from './block-types';

registerBlockType( metadata.name, {
	edit: Edit,
	save: Save,
	icon: getIcon( 'container' ),
} );

registerBlockVariation(
	'generateblocks/element',
	{
		name: 'generateblocks/container',
		description: __( 'Organize your content into sections and rows.', 'generateblocks' ),
		title: 'Container',
		icon: getIcon( 'container' ),
		attributes: {
			tagName: 'div',
		},
		isActive: ( blockAttributes ) => 'container' === getBlockType( blockAttributes.tagName ),
		isDefault: true,
	},
);
