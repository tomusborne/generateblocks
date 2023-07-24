/**
 * Block: Pattern Library
 */

import Edit from './edit';
import getIcon from '../../utils/get-icon';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Register our Pattern Library block.
 *
 * @param {string} name     Block name.
 * @param {Object} settings Block settings.
 */

registerBlockType( 'generateblocks/pattern-library', {
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
