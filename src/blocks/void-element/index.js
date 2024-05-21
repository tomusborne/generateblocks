import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { Edit } from './edit';
import metadata from './block.json';
import getIcon from '../../utils/get-icon';
import { Save } from './save';
import './index.scss';

registerBlockType( metadata.name, {
	edit: Edit,
	save: Save,
	icon: getIcon( 'image' ),
} );

registerBlockVariation(
	'generateblocks/void-element',
	{
		name: 'generateblocks/image',
		description: __( 'Organize your content into sections and rows.', 'generateblocks' ),
		title: 'Image',
		icon: getIcon( 'image' ),
		attributes: {
			tagName: 'img',
		},
		isActive: ( blockAttributes ) => 'img' === blockAttributes.tagName,
		isDefault: true,
	},
);
