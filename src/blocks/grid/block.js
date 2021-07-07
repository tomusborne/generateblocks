/**
 * Block: Grid
 */

import './editor.scss';

import editGridContainer from './edit';
import blockAttributes from './attributes';
import getIcon from '../../utils/get-icon';
import deprecated from './deprecated';
import './migrate';

import {
	__,
} from '@wordpress/i18n';

import {
	registerBlockType,
} from '@wordpress/blocks';

import {
	InnerBlocks,
} from '@wordpress/block-editor';

/**
 * Register our Grid block.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'generateblocks/grid', {
	title: __( 'Grid', 'generateblocks' ),
	description: __( 'Create advanced layouts with flexible grids.', 'generateblocks' ),
	icon: getIcon( 'grid' ),
	category: 'generateblocks',
	keywords: [
		__( 'grid' ),
		__( 'column' ),
		__( 'generate' ),
	],
	attributes: blockAttributes,
	supports: {
		className: false,
	},
	edit: editGridContainer,
	save: () => {
		return (
			<InnerBlocks.Content />
		);
	},
	deprecated,
} );
