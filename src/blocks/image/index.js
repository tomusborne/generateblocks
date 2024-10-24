/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import edit from './edit';
import save from './save';
import transforms from './transforms';
import dynamicContentAttributes from '../../extend/dynamic-content/attributes';
import getIcon from '../../utils/get-icon';
import { getBlockAttributes } from '../../block-context';
import imageContext from '../../block-context/image';
import blockAttributes from './attributes';

const attributes = Object.assign(
	{},
	getBlockAttributes( blockAttributes, imageContext, generateBlocksDefaults.image ),
	dynamicContentAttributes
);

registerBlockType( 'generateblocks/image', {
	apiVersion: 3,
	title: __( 'Image', 'generateblocks' ),
	category: 'generateblocks',
	description: __( 'Add images to your content to make a visual statement.', 'generateblocks' ),
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
	usesContext: [ 'postId', 'postType' ],
	supports: {
		className: false,
		customClassName: true,
		html: false,
	},
} );
