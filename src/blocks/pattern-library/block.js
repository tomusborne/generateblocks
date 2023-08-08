/**
 * Block: Pattern Library
 */

import Edit from './edit';
import getIcon from '../../utils/get-icon';
import { __ } from '@wordpress/i18n';
import { registerBlockType, unregisterBlockType, getBlockType } from '@wordpress/blocks';
import domReady from '@wordpress/dom-ready';

/**
 * Register our Pattern Library block.
 *
 * @param {string} name     Block name.
 * @param {Object} settings Block settings.
 */

registerBlockType( 'generateblocks/pattern-library', {
	apiVersion: 2,
	title: __( 'Pattern Library', 'generateblocks' ),
	description: __( 'Insert pre-built patterns directly into your content.', 'generateblocks' ),
	icon: getIcon( 'pattern-library' ),
	category: 'generateblocks',
	keywords: [
		__( 'template' ),
		__( 'pattern' ),
		__( 'library' ),
		__( 'generate' ),
	],
	supports: {
		customClassName: false,
	},
	edit: Edit,
	save: () => undefined,
} );

domReady( () => {
	if ( ! generateBlocksInfo.useLegacyPatternLibrary && getBlockType( 'generateblocks/template-library' ) ) {
		unregisterBlockType( 'generateblocks/template-library' );
	}
} );
