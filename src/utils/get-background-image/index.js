import hexToRGBA from '../hex-to-rgba';

export default function getBackgroundImageCSS( attributes, media, gradientValue ) {
	const {
		backgroundColor,
		backgroundColorOpacity,
		featuredImageBg,
		bgImage,
		gradient,
		bgOptions,
	} = attributes;

	let backgroundImage = false;

	const backgroundColorValue = hexToRGBA( backgroundColor, backgroundColorOpacity );
	const useFeaturedImage = featuredImageBg && media;

	if ( useFeaturedImage || bgImage ) {
		let url = '';

		if ( useFeaturedImage ) {
			url = media.source_url;
		} else {
			url = bgImage.image.url;
		}

		if ( 'element' === attributes.bgOptions.selector && ( backgroundColorValue || gradient ) && 'undefined' !== typeof bgOptions.overlay && bgOptions.overlay ) {
			// Old background image overlays mixed with our gradients.
			if ( attributes.gradient ) {
				backgroundImage = gradientValue + ', url(' + url + ')';
			} else if ( backgroundColorValue ) {
				backgroundImage = 'linear-gradient(0deg, ' + backgroundColorValue + ', ' + backgroundColorValue + '), url(' + url + ')';
			}
		} else {
			backgroundImage = 'url(' + url + ')';
		}
	}

	return backgroundImage;
}
