import hexToRGBA from '../hex-to-rgba';

export default function getBackgroundImageCSS( attributes, media ) {
	let backgroundImage = false,
		gradientColorStopOneValue = '',
		gradientColorStopTwoValue = '';

	const backgroundColor = hexToRGBA( attributes.backgroundColor, attributes.backgroundColorOpacity );
	const gradientColorOne = hexToRGBA( attributes.gradientColorOne, attributes.gradientColorOneOpacity );
	const gradientColorTwo = hexToRGBA( attributes.gradientColorTwo, attributes.gradientColorTwoOpacity );

	if ( attributes.gradient ) {
		if ( gradientColorOne && '' !== attributes.gradientColorStopOne ) {
			gradientColorStopOneValue = ' ' + attributes.gradientColorStopOne + '%';
		}

		if ( gradientColorTwo && '' !== attributes.gradientColorStopTwo ) {
			gradientColorStopTwoValue = ' ' + attributes.gradientColorStopTwo + '%';
		}
	}

	let useFeaturedImage = false;

	if ( attributes.featuredImageBg && media ) {
		useFeaturedImage = true;
	}

	if ( ( useFeaturedImage || attributes.bgImage ) && 'element' === attributes.bgOptions.selector ) {
		let url = '';

		if ( useFeaturedImage ) {
			url = media.source_url;
		} else {
			url = attributes.bgImage.image.url;
		}

		if ( ( backgroundColor || attributes.gradient ) && typeof attributes.bgOptions.overlay !== 'undefined' && attributes.bgOptions.overlay ) {
			if ( attributes.gradient ) {
				backgroundImage = 'linear-gradient(' + attributes.gradientDirection + 'deg, ' + gradientColorOne + gradientColorStopOneValue + ', ' + gradientColorTwo + gradientColorStopTwoValue + '), url(' + url + ')';
			} else if ( backgroundColor ) {
				backgroundImage = 'linear-gradient(0deg, ' + backgroundColor + ', ' + backgroundColor + '), url(' + url + ')';
			}
		} else {
			backgroundImage = 'url(' + url + ')';
		}
	} else if ( attributes.gradient ) {
		backgroundImage = 'linear-gradient(' + attributes.gradientDirection + 'deg, ' + gradientColorOne + gradientColorStopOneValue + ', ' + gradientColorTwo + gradientColorStopTwoValue + ')';
	}

	return backgroundImage;
}
