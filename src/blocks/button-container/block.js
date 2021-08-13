/**
 * Block: Button Container
 */

//import './style.scss';
import './editor.scss';

import edit from './edit';
import deprecated from './deprecated';
import blockAttributes from './attributes';
import getIcon from '../../utils/get-icon';

import {
	__,
} from '@wordpress/i18n';

import {
	registerBlockType,
} from '@wordpress/blocks';

import {
	InnerBlocks,
} from '@wordpress/block-editor';

/**
 * Register our Button Container block.
 *
 * @param {string} name     Block name.
 * @param {Object} settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'generateblocks/button-container', {
	title: __( 'Buttons', 'generateblocks' ),
	description: __( 'Drive conversions with beautiful buttons.', 'generateblocks' ),
	icon: getIcon( 'button' ),
	category: 'generateblocks',
	keywords: [
		__( 'button' ),
		__( 'buttons' ),
		__( 'generate' ),
	],
	attributes: blockAttributes,
	supports: {
		className: false,
	},
	edit,
	save: () => {
		return (
			<InnerBlocks.Content />
		);
	},
	deprecated,
} );
