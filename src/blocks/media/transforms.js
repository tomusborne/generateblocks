/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

export const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/image' ],
			transform: ( { id, url, alt, title, href, linkTarget } ) => {
				return createBlock( 'generateblocks/media', {
					tagName: 'img',
					mediaId: id,
					htmlAttributes: {
						src: url,
						alt,
						title,
					},
					linkHtmlAttributes: {
						href,
						target: linkTarget ?? '',
					},
				} );
			},
		},
		{
			type: 'block',
			blocks: [ 'core/post-featured-image' ],
			transform: ( {} ) => {
				return createBlock( 'generateblocks/media', {
					tagName: 'img',
					htmlAttributes: {
						src: '{{featured_image key:url}}',
					},
				} );
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/image' ],
			transform: ( { mediaId, htmlAttributes } ) => {
				return createBlock( 'core/image', {
					id: mediaId,
					url: htmlAttributes?.src ?? '',
				} );
			},
		},
	],
};
