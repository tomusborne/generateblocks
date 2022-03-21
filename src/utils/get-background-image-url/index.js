import {
	applyFilters,
} from '@wordpress/hooks';
import getMediaUrl from '../get-media-url';

export default function getBackgroundImageUrl( props ) {
	const attributes = applyFilters( 'generateblocks.editor.cssAttrs', props.attributes, props );

	const {
		bgImage,
		isDynamicContent,
		contentType,
	} = attributes;

	let url = bgImage?.image?.url;

	if ( isDynamicContent && '' !== contentType && attributes.dynamicImage ) {
		url = getMediaUrl( attributes.dynamicImage, attributes.bgImageSize || 'full' );
	}

	return applyFilters( 'generateblocks.editor.bgImageURL', url, props );
}
