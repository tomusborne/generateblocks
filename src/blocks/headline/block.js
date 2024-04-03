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
import dynamicContentAttributes from '../../extend/dynamic-content/attributes';
import getContentTypeLabel from '../../extend/dynamic-content/utils/getContentTypeLabel';

import {
	__,
} from '@wordpress/i18n';

import {
	registerBlockType,
} from '@wordpress/blocks';
import { getBlockAttributes } from '../../block-context';
import headlineContext from '../../block-context/headline';

const attributes = Object.assign(
	{},
	getBlockAttributes( blockAttributes, headlineContext, generateBlocksDefaults.headline ),
	dynamicContentAttributes
);

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
	attributes,
	supports: {
		className: false,
	},
	edit: editHeadline,
	save: saveHeadline,
	transforms,
	deprecated,
	usesContext: [ 'postId', 'postType', 'generateblocks/dynamicImage', 'generateblocks/mediaId' ],
	__experimentalLabel: ( attrs, { context } ) => {
		const customName = attrs?.metadata?.name;

		if ( 'list-view' === context && customName ) {
			return customName;
		}

		if (
			context === 'list-view' &&
			( attrs.content || attrs.removeText ) &&
			! attrs.useDynamicData &&
			! attrs.isCaption
		) {
			if ( attrs.removeText ) {
				return __( 'Icon', 'generateblocks' );
			}

			return attrs.content;
		}

		return getContentTypeLabel( attrs, __( 'Headline', 'generateblocks' ) );
	},
} );
