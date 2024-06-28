import { registerBlockType } from '@wordpress/blocks';
import { Edit } from './edit';
import metadata from './block.json';
import { queryIcon } from '../query';
import { InnerBlocks } from '@wordpress/block-editor';

registerBlockType( metadata.name, {
	edit: Edit,
	save: () => <InnerBlocks.Content />,
	icon: queryIcon,
} );
