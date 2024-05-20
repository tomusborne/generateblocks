import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
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
		description: __( 'An interactive button element.', 'generateblocks' ),
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
		description: __( 'A heading text element.', 'generateblocks' ),
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
		description: __( 'A paragraph text element.', 'generateblocks' ),
		icon: getIcon( 'paragraph' ),
		attributes: {
			tagName: 'p',
		},
		isActive: ( blockAttributes ) => 'paragraph' === getBlockType( blockAttributes.tagName ),
	},
);
