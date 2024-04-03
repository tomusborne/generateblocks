/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import edit from './edit';
import save from './save';
import transforms from './transforms';
import dynamicContentAttributes from '../../extend/dynamic-content/attributes';
import getIcon from '../../utils/get-icon';
import { getBlockAttributes } from '../../block-context';
import imageContext from '../../block-context/image';

const attributes = Object.assign(
	{},
	getBlockAttributes( metadata.attributes, imageContext, generateBlocksDefaults.image ),
	dynamicContentAttributes
);

registerBlockType( 'generateblocks/image', {
	title: __( 'Image', 'generateblocks' ),
	icon: getIcon( 'image' ),
	attributes,
	edit,
	save,
	transforms,
	__experimentalLabel: ( attrs, { context } ) => {
		const customName = attrs?.metadata?.name;

		if ( 'list-view' === context && customName ) {
			return customName;
		}

		if (
			context === 'list-view' &&
			! attrs.useDynamicData &&
			( attrs.alt || attrs.title )
		) {
			return attrs.alt || attrs.title;
		}

		return __( 'Image', 'generateblocks' );
	},
} );
