/**
 * Block: Buttons
 */

import './editor.scss';

import editButton from './edit';
import saveButton from './save';
import deprecated from './deprecated';
import blockAttributes from './attributes';
import getIcon from '../../utils/get-icon';

import {
	__,
} from '@wordpress/i18n';

import {
	registerBlockType,
} from '@wordpress/blocks';

/**
 * Register our Button block.
 *
 * @param {string} name     Block name.
 * @param {Object} settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'generateblocks/button', {
	title: __( 'Button', 'generateblocks' ),
	description: __( 'Drive conversions with beautiful buttons.', 'generateblocks' ),
	parent: [ 'generateblocks/button-container' ],
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
		inserter: false,
		reusable: false,
	},
	edit: editButton,
	save: saveButton,
	deprecated,
} );
