/**
 * Block: Container
 */

import './style.scss';
import './editor.scss';
import './block-controls.js';

import editContainer from './edit';
import saveContainer from './save';
import blockAttributes from './attributes';
import getIcon from '../../utils/get-icon';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Register our Container block.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'generateblocks/container', {
	title: __( 'Container', 'generateblocks' ),
	description: __( 'Organize your content into rows and sections.', 'generateblocks' ),
	icon: getIcon( 'container' ),
	category: 'generateblocks',
	keywords: [
		__( 'section' ),
		__( 'container' ),
		__( 'generate' ),
	],
	attributes: blockAttributes,
	supports: {
		align: false,
		anchor: false,
		className: false,
		customClassName: false,
	},
	edit: editContainer,
	save: saveContainer,
} );
