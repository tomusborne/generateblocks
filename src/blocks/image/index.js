/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import transforms from './transforms';
import dynamicContentAttributes from '../../extend/dynamic-content/attributes';
import getSpacingAttributes from '../../components/dimensions/attributes';
import getIcon from '../../utils/get-icon';

const attributes = Object.assign(
	{},
	metadata.attributes,
	dynamicContentAttributes,
	getSpacingAttributes( 'image' )
);

registerBlockType( 'generateblocks/image', {
	icon: getIcon( 'image' ),
	attributes,
	edit,
	save,
	transforms,
} );
