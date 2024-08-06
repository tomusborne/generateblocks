/**
 * Block: Container
 */

import './editor.scss';
import './block-controls.js';

import containerEdit from './edit';
import blockAttributes from './attributes';
import deprecated from './deprecated';
import getIcon from '../../utils/get-icon';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import dynamicContentAttributes from '../../extend/dynamic-content/attributes';
import { getBlockAttributes } from '../../block-context';
import containerContext from '../../block-context/container';
import transforms from './transforms';

const attributes = Object.assign(
	{},
	getBlockAttributes( blockAttributes, containerContext, generateBlocksDefaults.container ),
	dynamicContentAttributes
);

/**
 * Register our Container block.
 *
 * @param {string} name     Block name.
 * @param {Object} settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'generateblocks/container', {
	apiVersion: 2,
	title: __( 'Container', 'generateblocks' ),
	description: __( 'Organize your content into rows and sections.', 'generateblocks' ),
	icon: getIcon( 'container' ),
	category: 'generateblocks',
	keywords: [
		__( 'section' ),
		__( 'container' ),
		__( 'generate' ),
	],
	attributes,
	supports: {
		align: false,
		className: false,
		html: false,
	},
	usesContext: [ 'postId', 'postType', 'generateblocks/queryId' ],
	edit: containerEdit,
	save: () => {
		return (
			<InnerBlocks.Content />
		);
	},
	deprecated,
	__experimentalLabel: ( attrs, { context } ) => {
		const customName = attrs?.metadata?.name || attrs?.blockLabel;

		if ( 'list-view' === context && customName ) {
			return customName;
		}

		if ( attrs.isQueryLoopItem ) {
			return __( 'Post Template', 'generateblocks' );
		}

		return __( 'Container', 'generateblocks' );
	},
	transforms,
} );
