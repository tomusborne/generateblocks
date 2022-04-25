import { applyFilters } from '@wordpress/hooks';
import getDynamicImage from '../get-dynamic-image';
import getMediaUrl from '../get-media-url';

export default function getBackgroundImageUrl( props ) {
	const attributes = applyFilters( 'generateblocks.editor.cssAttrs', props.attributes, props );

	const {
		bgImage,
		useDynamicData,
		contentType,
		bgImageSize,
	} = attributes;

	let url = bgImage?.image?.url;
	const dynamicImage = getDynamicImage( props );

	if ( useDynamicData && '' !== contentType ) {
		url = getMediaUrl( dynamicImage, bgImageSize );
	}

	return applyFilters( 'generateblocks.editor.bgImageURL', url, props );
}
