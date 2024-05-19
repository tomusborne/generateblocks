import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { Edit } from './edit';
import metadata from './block.json';
import getIcon from '../../utils/get-icon';
import { Save } from './save';
import { getBlockType } from '../element/block-types';

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
				textDecoration: 'none',
			},
		},
		isActive: ( blockAttributes ) => 'button' === getBlockType( blockAttributes.tagName ),
	},
);

registerBlockVariation(
	'generateblocks/text',
	{
		name: 'generateblocks/heading',
		title: 'Heading',
		icon: getIcon( 'Headline' ),
		attributes: {
			tagName: 'h2',
		},
		isActive: ( blockAttributes ) => 'heading' === getBlockType( blockAttributes.tagName ),
	},
);

registerBlockVariation(
	'generateblocks/text',
	{
		name: 'generateblocks/paragraph',
		title: 'Paragraph',
		icon: getIcon( 'paragraph' ),
		attributes: {
			tagName: 'p',
		},
		isActive: ( blockAttributes ) => 'paragraph' === getBlockType( blockAttributes.tagName ),
	},
);
