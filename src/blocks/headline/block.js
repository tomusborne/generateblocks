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
import dynamicContentAttributes from './components/dynamic-content/attributes';

import {
	__,
} from '@wordpress/i18n';

import {
	registerBlockType,
} from '@wordpress/blocks';

const attributes = Object.assign(
	{},
	blockAttributes,
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
	usesContext: [ 'postId', 'postType' ],
	__experimentalLabel: ( { isDynamicContent, contentType } ) => {
		if ( isDynamicContent ) {
			const labels = {
				'post-title': __( 'Post title', 'generateblocks' ),
				'post-excerpt': __( 'Post excerpt', 'generateblocks' ),
				'post-date': __( 'Post date', 'generateblocks' ),
				'post-meta': __( 'Post meta', 'generateblocks' ),
				'author-email': __( 'Author email', 'generateblocks' ),
				'author-name': __( 'Author name', 'generateblocks' ),
				'author-nickname': __( 'Author nickname', 'generateblocks' ),
				'author-first-name': __( 'Author first name', 'generateblocks' ),
				'author-last-name': __( 'Author last name', 'generateblocks' ),
			};

			return labels[ contentType ] ?? __( 'Dynamic content', 'generateblocks' );
		}

		return __( 'Headline', 'generateblocks' );
	},
} );
