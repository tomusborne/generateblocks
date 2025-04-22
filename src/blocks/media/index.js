import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { Edit } from './edit';
import metadata from './block.json';
import { Save } from './save';
import { transforms } from './transforms';
import getIcon from '@utils/get-icon';

import './toolbar-appenders';
import './editor.scss';

registerBlockType( metadata, {
	edit: Edit,
	save: Save,
	icon: getIcon( 'image' ),
	transforms,
} );

registerBlockVariation(
	'generateblocks/media',
	{
		name: 'generateblocks/image',
		description: __( 'Add images to your content to make a visual statement.', 'generateblocks' ),
		title: 'Image',
		attributes: {
			tagName: 'img',
			styles: {
				height: 'auto',
				maxWidth: '100%',
				objectFit: 'cover',
				width: 'auto',
			},
			htmlAttributes: {
				alt: '',
			},
		},
		isActive: ( blockAttributes ) => 'img' === blockAttributes.tagName,
		isDefault: true,
	},
);
