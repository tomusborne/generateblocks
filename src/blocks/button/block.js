/**
 * Block: Buttons
 */

import './style.scss';
import './editor.scss';

import editButtonContainer from './edit';
import saveButtonContainer from './save';
import blockAttributes from './attributes';
import getIcon from '../../utils/get-icon';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register our Button block.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
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
		anchor: false,
		className: false,
		customClassName: false,
		inserter: false,
		reusable: false,
	},
	edit: editButtonContainer,
	save: saveButtonContainer,
} );
