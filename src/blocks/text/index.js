import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { Edit } from './edit';
import metadata from './block.json';
import { Save } from './save';
import { transforms } from './transforms';
import { getElementType } from '../element/utils/getElementType';
import { getIcon } from '@utils';

registerBlockType( metadata, {
	edit: Edit,
	save: Save,
	icon: getIcon( 'text' ),
	transforms,
	__experimentalLabel: ( attrs, { context } ) => {
		if ( 'list-view' === context ) {
			if ( attrs.content || attrs.iconOnly ) {
				if ( attrs.iconOnly ) {
					return __( 'Icon', 'generateblocks' );
				}

				return attrs.content;
			}
		}
	},
} );

registerBlockVariation(
	'generateblocks/text',
	{
		name: 'generateblocks/heading',
		title: 'Headline',
		description: __( 'A heading text element.', 'generateblocks' ),
		icon: getIcon( 'headline' ),
		attributes: {
			tagName: 'h2',
		},
		isActive: ( blockAttributes ) => 'heading' === getElementType( blockAttributes.tagName ),
	},
);

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
				'&:is(:hover, :focus)': {
					backgroundColor: '#1a4a9b',
					color: '#ffffff',
				},
			},
		},
		isActive: ( blockAttributes ) => 'button' === getElementType( blockAttributes.tagName ),
	},
);
