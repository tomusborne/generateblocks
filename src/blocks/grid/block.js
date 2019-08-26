/**
 * Block: Grid
 */

//import './style.scss';
import './editor.scss';

import editGridContainer from './edit'
import saveGridContainer from './save'
import blockAttributes from './attributes'
import getIcon from '../../utils/get-icon'

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const el = wp.element.createElement;

/**
 * Register our Grid block.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'flexblocks/grid', {
	title: __( 'Grid', 'flexblocks' ),
	icon: getIcon( 'grid' ),
	category: 'flexblocks',
	keywords: [
		__( 'grid' ),
		__( 'column' ),
		__( 'flex' ),
	],
	attributes: blockAttributes,
	supports: {
		anchor: false,
		className: false,
		customClassName: false
	},
	edit: editGridContainer,
	save: saveGridContainer,
} );
