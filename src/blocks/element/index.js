import { registerBlockType } from '@wordpress/blocks';
import { Edit } from './edit';
import metadata from './block.json';
import getIcon from '../../utils/get-icon';
import { Save } from './save';
import './index.scss';

registerBlockType( metadata.name, {
	edit: Edit,
	save: Save,
	icon: getIcon( 'container' ),
} );
