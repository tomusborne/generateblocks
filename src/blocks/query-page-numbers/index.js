import { registerBlockType } from '@wordpress/blocks';
import { Edit } from './edit';
import metadata from './block.json';
import { Save } from './save';
import getIcon from '@utils/get-icon';

const icon = getIcon( 'pagination' );

registerBlockType( metadata, {
	edit: Edit,
	save: Save,
	icon,
} );
