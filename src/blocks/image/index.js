/**
 * WordPress dependencies
 */
import { postFeaturedImage } from '@wordpress/icons';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import dynamicContentAttributes from '../../extend/dynamic-content/attributes';

const attributes = Object.assign(
	{},
	metadata.attributes,
	dynamicContentAttributes
);

registerBlockType( 'generateblocks/image', {
	icon: postFeaturedImage,
	attributes,
	edit,
	save,
} );
