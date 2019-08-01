/**
 * Block: Section
 */

import './style.scss';
import './editor.scss';

import editButtonContainer from './edit'
import saveButtonContainer from './save'
import blockAttributes from './attributes'

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const el = wp.element.createElement;

const {
	componentDidMount
} = wp.components;

const {
	withInstanceId
} = wp.compose;

const iconEl = el('svg', { width: 20, height: 20, viewBox: "0 0 600 600" },
	el('path', { d: "M485.2 427.8l-99.1-46.2 15.8-34c5.6-11.9 8.8-24.3 10-36.7 3.3-33.7-9-67.3-33.2-91.1-8.9-8.7-19.3-16.1-31.3-21.7-11.9-5.6-24.3-8.8-36.7-10-33.7-3.3-67.4 9-91.1 33.2-8.7 8.9-16.1 19.3-21.7 31.3l-15.8 34-30.4 65.2c-.7 1.5-.1 3.3 1.5 4l65.2 30.4 34 15.8 34 15.8 68 31.7 74.7 34.8c-65 45.4-152.1 55.2-228.7 17.4C90.2 447.4 44.1 313.3 97.3 202.6c53.3-110.8 186-158.5 297.8-106.3 88.1 41.1 137.1 131.9 129.1 223.4-.1 1.3.6 2.4 1.7 3l65.6 30.6c1.8.8 3.9-.3 4.2-2.2 22.6-130.7-44-265.4-170.5-323.5-150.3-69-327-4.1-396.9 145.8-70 150.1-5.1 328.5 145.1 398.5 114.1 53.2 244.5 28.4 331.3-52.3 17.9-16.6 33.9-35.6 47.5-56.8 1-1.5.4-3.6-1.3-4.3l-65.7-30.7zm-235-109.6l15.8-34c8.8-18.8 31.1-26.9 49.8-18.1s26.9 31 18.1 49.8l-15.8 34-34-15.8-33.9-15.9z" } )
);

/**
 * Register our Section block.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'flex-blocks/button', {
	title: __( 'Button', 'flex-blocks' ),
	parent: [ 'flex-blocks/button-container' ],
	icon: iconEl,
	category: 'flex-blocks',
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
