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
import { getBlockAttributes } from '../../block-context';
import buttonContainerContext from '../../block-context/button-container';

const attributes = getBlockAttributes(
	blockAttributes,
	buttonContainerContext,
	generateBlocksDefaults.buttonContainer
);

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
	attributes,
	supports: {
		className: false,
		html: false,
		inserter: false,
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
	__experimentalLabel: ( { isPagination } ) => (
		isPagination
			? __( 'Pagination', 'generateblocks' )
			: __( 'Buttons', 'generateblocks' )
	),
} );
