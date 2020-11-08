import hexToRGBA from '../hex-to-rgba';

export default function getBackgroundImageCSS( type, attributes, media ) {
	const {
		backgroundColor,
		backgroundColorOpacity,
		featuredImageBg,
		bgImage,
		gradient,
		bgOptions,
		gradientColorOne,
		gradientColorOneOpacity,
		gradientColorTwo,
		gradientColorTwoOpacity,
		gradientColorStopOne,
		gradientColorStopTwo,
		gradientDirection,
	} = attributes;

	let gradientValue = '';

	if ( gradient ) {
		let gradientColorStopOneValue = '',
			gradientColorStopTwoValue = '';

		const gradientColorOneValue = hexToRGBA( gradientColorOne, gradientColorOneOpacity );
		const gradientColorTwoValue = hexToRGBA( gradientColorTwo, gradientColorTwoOpacity );

		if ( gradientColorOne && '' !== gradientColorStopOne ) {
			gradientColorStopOneValue = ' ' + gradientColorStopOne + '%';
		}

		if ( gradientColorTwo && '' !== gradientColorStopTwo ) {
			gradientColorStopTwoValue = ' ' + gradientColorStopTwo + '%';
		}

		gradientValue = 'linear-gradient(' + gradientDirection + 'deg, ' + gradientColorOneValue + gradientColorStopOneValue + ', ' + gradientColorTwoValue + gradientColorStopTwoValue + ')';
	}

	if ( 'gradient' === type ) {
		return gradientValue;
	}

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

		if ( 'element' === bgOptions.selector && ( backgroundColorValue || gradient ) && 'undefined' !== typeof bgOptions.overlay && bgOptions.overlay ) {
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
