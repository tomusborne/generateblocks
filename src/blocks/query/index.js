import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { Edit } from './edit';
import metadata from './block.json';
import { getIcon } from '@utils';
import { Save } from './save';

registerBlockType( metadata, {
	edit: Edit,
	save: Save,
	icon: getIcon( 'query-loop' ),
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
