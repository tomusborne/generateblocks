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
			if ( attrs?.metadata?.name ) {
				return attrs.metadata.name;
			}

			const text = attrs.content?.text ?? attrs.content;

			if ( text || attrs.iconOnly ) {
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
			...generateblocksBlockText.defaultButtonAttributes,
		},
		isActive: ( blockAttributes ) => 'button' === getElementType( blockAttributes.tagName ),
	},
);
