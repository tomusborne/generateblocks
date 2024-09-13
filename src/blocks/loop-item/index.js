import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import { Edit } from './edit';
import metadata from './block.json';
import { getIcon } from '@utils';

registerBlockType( metadata, {
	edit: Edit,
	save: () => <InnerBlocks.Content />,
	icon: getIcon( 'query' ),
} );
