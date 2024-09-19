import { registerBlockType } from '@wordpress/blocks';
import { Edit } from './edit';
import metadata from './block.json';
import { getIcon } from '@utils';
import { Save } from './save';

registerBlockType( metadata, {
	edit: Edit,
	save: Save,
	icon: getIcon( 'query' ),
} );
