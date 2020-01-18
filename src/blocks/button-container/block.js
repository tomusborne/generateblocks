/**
 * Block: Button Container
 */

//import './style.scss';
import './editor.scss';

import editButtonContainer from './edit'
import saveButtonContainer from './save'
import blockAttributes from './attributes'
import getIcon from '../../utils/get-icon'

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const el = wp.element.createElement;

/**
 * Register our Button Container block.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'generateblocks/button-container', {
	title: __( 'Buttons', 'generateblocks' ),
	description: __( 'Add as many advanced buttons as needed. Can be used for regular buttons or icon buttons.', 'generateblocks' ),
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
		customClassName: false
	},
	edit: editButtonContainer,
	save: saveButtonContainer,
} );
