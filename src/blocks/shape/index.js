import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { Edit } from './edit';
import metadata from './block.json';
import { Save } from './save';

export function shapesIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><polygon points="64 64 24 184 104 184 64 64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><circle cx="156" cy="76" r="44" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><rect x="136" y="152" width="88" height="56" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /></svg>
	);
}

registerBlockType( metadata.name, {
	edit: Edit,
	save: Save,
	icon: shapesIcon,
} );

registerBlockVariation(
	'generateblocks/shape',
	{
		name: 'generateblocks/shape',
		description: __( 'Add a shape to your page.', 'generateblocks' ),
		title: 'Shape',
		icon: shapesIcon,
		attributes: {
			html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><polygon points="64 64 24 184 104 184 64 64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></polygon><circle cx="156" cy="76" r="44" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></circle><rect x="136" y="152" width="88" height="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></rect></svg>',
			styles: {
				display: 'inline-flex',
				svg: {
					width: '30px',
					height: '30px',
				},
			},
		},
		isDefault: true,
	},
);
