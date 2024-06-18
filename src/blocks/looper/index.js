import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { Edit } from './edit';
import metadata from './block.json';
import { queryIcon } from '../query';

registerBlockType( metadata.name, {
	edit: Edit,
	save: () => <InnerBlocks.Content />,
	icon: queryIcon,
} );
