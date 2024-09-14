import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { Edit } from './edit';
import metadata from './block.json';
import { Save } from './save';
import './index.scss';
import getIcon from '@utils/get-icon';

registerBlockType( metadata, {
	edit: Edit,
	save: Save,
	icon: getIcon( 'image' ),
} );

registerBlockVariation(
	'generateblocks/media',
	{
		name: 'generateblocks/image',
		description: __( 'Add images to your content to make a visual statement.', 'generateblocks' ),
		title: 'Image',
		attributes: {
			tagName: 'img',
		},
		isActive: ( blockAttributes ) => 'img' === blockAttributes.tagName,
		isDefault: true,
	},
);
