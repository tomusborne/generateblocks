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

const attributes = Object.assign(
	{},
	blockAttributes,
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
} );
