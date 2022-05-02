/**
 * Block: Button Container
 */

import './editor.scss';

import editButtonContainer from './edit';
import deprecated from './deprecated';
import blockAttributes from './attributes';
import getIcon from '../../utils/get-icon';
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Register our Button Container block.
 *
 * @param {string} name     Block name.
 * @param {Object} settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'generateblocks/button-container', {
	apiVersion: 2,
	title: __( 'Buttons', 'generateblocks' ),
	description: __( 'Drive conversions with beautiful buttons.', 'generateblocks' ),
	icon: getIcon( 'button-container' ),
	category: 'generateblocks',
	keywords: [
		__( 'button' ),
		__( 'buttons' ),
		__( 'generate' ),
	],
	attributes: blockAttributes,
	supports: {
		className: false,
		html: false,
	},
	usesContext: [
		'generateblocks/queryId',
		'generateblocks/query',
	],
	edit: editButtonContainer,
	save: () => {
		return (
			<InnerBlocks.Content />
		);
	},
	deprecated,
	__experimentalLabel: ( attributes ) => (
		attributes.isPagination
			? __( 'Pagination', 'generateblocks' )
			: __( 'Buttons', 'generateblocks' )
	),
} );
