import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { Edit } from './edit';
import metadata from './block.json';
import { Save } from './save';
import './index.scss';

export function imageIcon() {
	return <svg className="gb-block-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><rect x="32" y="48" width="192" height="160" rx="8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><circle cx="156" cy="100" r="10" /><path d="M147.31,164,173,138.34a8,8,0,0,1,11.31,0L224,178.06" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /><path d="M32,168.69l54.34-54.35a8,8,0,0,1,11.32,0L191.31,208" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" /></svg>;
}

registerBlockType( metadata.name, {
	edit: Edit,
	save: Save,
	icon: imageIcon,
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