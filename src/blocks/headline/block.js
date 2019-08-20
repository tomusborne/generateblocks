/**
 * Block: Headline
 */

//import './style.scss';
import './editor.scss';

import editHeadline from './edit'
import saveHeadline from './save'
import blockAttributes from './attributes'
import getIcon from '../../utils/get-icon';

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
 * Register our Headline block.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'flexblocks/headline', {
	title: __( 'Headline', 'flexblocks' ),
	icon: getIcon( 'headline' ),
	category: 'flexblocks',
	keywords: [
		__( 'heading' ),
		__( 'headline' ),
		__( 'title' ),
		__( 'flex' ),
	],
	attributes: blockAttributes,
	supports: {
		anchor: false,
		className: false,
		customClassName: false
	},

	edit: withInstanceId( editHeadline ),

	save: saveHeadline,
} );
