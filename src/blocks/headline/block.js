/**
 * Block: Headline
 */

import './editor.scss';

import editHeadline from './edit';
import saveHeadline from './save';
import blockAttributes from './attributes';
import transforms from './transforms';
import deprecated from './deprecated';
import getIcon from '../../utils/get-icon';
import withUniqueId from '../../hoc/withUniqueId';

import {
	__,
} from '@wordpress/i18n';

import {
	registerBlockType,
} from '@wordpress/blocks';

/**
 * Register our Headline block.
 *
 * @param {string} name     Block name.
 * @param {Object} settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'generateblocks/headline', {
	apiVersion: 2,
	title: __( 'Headline', 'generateblocks' ),
	description: __( 'Craft text-rich content with advanced typography.', 'generateblocks' ),
	icon: getIcon( 'headline' ),
	category: 'generateblocks',
	keywords: [
		__( 'heading' ),
		__( 'headline' ),
		__( 'title' ),
		__( 'generate' ),
	],
	attributes: blockAttributes,
	supports: {
		className: false,
	},
	edit: withUniqueId( editHeadline ),
	save: saveHeadline,
	transforms,
	deprecated,
} );
