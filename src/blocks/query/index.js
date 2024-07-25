import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { Edit } from './edit';
import metadata from './block.json';

export function queryIcon() {
	return (
		<svg className="gb-block-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><path d="M106.63,152.13l-8.69,9.81a48,48,0,1,1,0-67.88l60.12,67.88a48,48,0,1,0,0-67.88l-8.69,9.81" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" /></svg>
	);
}

console.log( 'registering generateblocks/query ' );

registerBlockType( metadata, {
	edit: Edit,
	save: () => <InnerBlocks.Content />,
	icon: queryIcon,
} );

registerBlockVariation(
	'generateblocks/query',
	{
		title: 'Query',
		name: 'query',
		icon: queryIcon,
		isDefault: true,
		description: 'Build a series of tabs.',
		attributes: {
			showTemplateSelector: true,
			query: {
				post_type: 'post',
				per_page: 10,
			},
		},
		innerBlocks: [],
	}
);
