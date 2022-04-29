/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/image' ],
			transform: ( { id, url, sizeSlug } ) => {
				return createBlock( 'generateblocks/image', {
					mediaId: id,
					mediaUrl: url,
					sizeSlug,
				} );
			},
		},
		{
			type: 'block',
			blocks: [ 'core/post-featured-image' ],
			transform: ( { sizeSlug } ) => {
				return createBlock( 'generateblocks/image', {
					useDynamicData: true,
					dynamicContentType: 'featured-image',
					sizeSlug,
				} );
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/image' ],
			transform: ( { mediaId, mediaUrl, sizeSlug } ) => {
				return createBlock( 'core/image', {
					id: mediaId,
					url: mediaUrl,
					sizeSlug,
				} );
			},
		},
	],
};

export default transforms;
