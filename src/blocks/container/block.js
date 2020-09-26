/**
 * Block: Container
 */

import './style.scss';
import './editor.scss';
import './block-controls.js';

import edit from './edit';
import save from './save';
import blockAttributes from './attributes';
import deprecated from './deprecated';
import getIcon from '../../utils/get-icon';

const {
	__,
} = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

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
		anchor: true,
		className: false,
	},
	edit,
	save,
	deprecated,
} );
