import {
	applyFilters,
} from '@wordpress/hooks';

export default function getBackgroundImageUrl( props ) {
	const attributes = applyFilters( 'generateblocks.editor.cssAttrs', props.attributes, props );

	const {
		bgImage,
		isDynamicContent,
		contentType,
	} = attributes;

	let url = bgImage?.image?.url;

	if ( isDynamicContent && '' !== contentType && attributes.dynamicImage ) {
		url = attributes.dynamicImage;
	}

	return applyFilters( 'generateblocks.editor.bgImageURL', url, props );
}
