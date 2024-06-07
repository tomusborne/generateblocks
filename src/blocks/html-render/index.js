import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { Edit } from './edit';
import metadata from './block.json';
import getIcon from '../../utils/get-icon';
import { Save } from './save';
import { __ } from '@wordpress/i18n';

export function shapesIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><polygon points="64 64 24 184 104 184 64 64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><circle cx="156" cy="76" r="44" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><rect x="136" y="152" width="88" height="56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /></svg>
	);
}

registerBlockType( metadata.name, {
	edit: Edit,
	save: Save,
	icon: getIcon( 'headline' ),
} );

registerBlockVariation(
	'generateblocks/html-render',
	{
		name: 'generateblocks/icon',
		title: 'Icon',
		description: __( 'A paragraph text element.', 'generateblocks' ),
		icon: shapesIcon,
		attributes: {
			htmlType: 'icon',
			styles: {
				lineHeight: '0',
			},
		},
		isActive: ( blockAttributes ) => 'icon' === blockAttributes.htmlType,
		isDefault: true,
	},
);
