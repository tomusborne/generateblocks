import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { Edit } from './edit';
import metadata from './block.json';
import getIcon from '../../utils/get-icon';
import { Save } from './save';

registerBlockType( metadata.name, {
	edit: Edit,
	save: Save,
	icon: getIcon( 'headline' ),
} );

registerBlockVariation(
	'generateblocks/text',
	{
		name: 'generateblocks/button',
		title: 'Button',
		icon: getIcon( 'button' ),
		attributes: {
			tagName: 'a',
			styles: {
				display: 'inline-flex',
				alignItems: 'center',
				backgroundColor: '#215bc2',
				color: '#ffffff',
				paddingTop: '1rem',
				paddingRight: '2rem',
				paddingBottom: '1rem',
				paddingLeft: '2rem',
			},
		},
		isActive: ( blockAttributes ) => {
			return 'button' === blockAttributes.tagName || 'a' === blockAttributes.tagName;
		},
	},
);
