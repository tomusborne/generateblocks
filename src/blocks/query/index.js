import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { Edit } from './edit';
import metadata from './block.json';
import { getIcon } from '@utils';

registerBlockType( metadata, {
	edit: Edit,
	save: () => <InnerBlocks.Content />,
	icon: getIcon( 'query' ),
} );

registerBlockVariation(
	'generateblocks/query',
	{
		title: 'Query',
		name: 'query',
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
