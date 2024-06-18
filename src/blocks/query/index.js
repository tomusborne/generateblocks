import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { Edit } from './edit';
import metadata from './block.json';

export function queryIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M106.63,152.13l-8.69,9.81a48,48,0,1,1,0-67.88l60.12,67.88a48,48,0,1,0,0-67.88l-8.69,9.81" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>
	);
}

registerBlockType( metadata.name, {
	edit: Edit,
	save: () => <InnerBlocks.Content />,
	icon: queryIcon,
} );
