/**
 * Block: Buttons
 */

import './style.scss';
import './editor.scss';

import editButtonContainer from './edit'
import saveButtonContainer from './save'
import blockAttributes from './attributes'
import getIcon from '../../utils/get-icon'

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const el = wp.element.createElement;

const {
	componentDidMount
} = wp.components;

const {
	withInstanceId
} = wp.compose;

/**
 * Register our Button block.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'flexblocks/button', {
	title: __( 'Button', 'flexblocks' ),
	parent: [ 'flexblocks/button-container' ],
	icon: getIcon( 'button' ),
	category: 'flexblocks',
	keywords: [
		__( 'button' ),
		__( 'buttons' ),
		__( 'flex' ),
	],
	attributes: blockAttributes,
	supports: {
		anchor: false,
		className: false,
		customClassName: false,
		inserter: false,
	},

	edit: withInstanceId( editButtonContainer ),

	save: saveButtonContainer,
} );
