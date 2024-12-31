import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { Edit } from './edit';
import metadata from './block.json';
import getIcon from '@utils/get-icon';

const icon = getIcon( 'no-results' );

registerBlockType( metadata, {
	edit: Edit,
	save: () => <InnerBlocks.Content />,
	icon,
} );
