import { cleanStylesObject } from '@edge22/styles-builder';
import { defaultAtRules } from './defaultAtRules';
import hexToRGBA from './hex-to-rgba';
import { noStyleAttributes } from './noStyleAttributes';

function getLocalBlockStyles( attributeData, blockAttributes ) {
	return Object.entries( attributeData )
		.filter( ( [ attributeName, attribute ] ) =>
			! noStyleAttributes.includes( attributeName ) && blockAttributes[ attributeName ] !== attribute.default
		)
		.reduce( ( result, [ attributeName ] ) => {
			result[ attributeName ] = blockAttributes[ attributeName ];

			return result;
		}, {} );
}

export function convertLocalToStyles( attributeData, blockAttributes, hoverSelector = '&:hover' ) {
	const localBlockStyles = getLocalBlockStyles( attributeData, blockAttributes );

	const addToMedia = ( result, rule, attributeName, value ) => {
		if ( attributeName.includes( 'Hover' ) ) {
			result[ rule ][ '&:hover' ][ attributeName ] = value;
		} else {
			result[ rule ][ attributeName ] = value;
		}
	};

	const tabletMediaQuery = defaultAtRules.find( ( rule ) => 'mediumSmallWidth' === rule.id )?.value ?? '@media (max-width:1024px)';
	const mobileMediaQuery = defaultAtRules.find( ( rule ) => 'smallWidth' === rule.id )?.value ?? '@media (max-width:767px)';

	const cleanAttributeName = ( attributeName ) => {
		attributeName = attributeName
			.replace( 'Tablet', '' )
			.replace( 'Mobile', '' )
			.replace( 'Hover', '' )
			.replace( 'textColor', 'color' );

		const dummyElement = document.createElement( 'div' );
		const computedStyle = getComputedStyle( dummyElement );

		// Make sure our attributeName is a valid CSS property.
		if ( attributeName in computedStyle ) {
			return attributeName;
		}

		return '';
	};

	const convertedObject = Object.entries( localBlockStyles )
		.reduce( ( result, [ attributeName ] ) => {
			const cleanedAttributeName = cleanAttributeName( attributeName );

			if ( attributeName.includes( 'Tablet' ) && cleanedAttributeName ) {
				addToMedia( result, tabletMediaQuery, cleanedAttributeName, blockAttributes[ attributeName ] );
			} else if ( attributeName.includes( 'Mobile' ) && cleanedAttributeName ) {
				addToMedia( result, mobileMediaQuery, cleanedAttributeName, blockAttributes[ attributeName ] );
			} else if ( attributeName.includes( 'Hover' ) && cleanedAttributeName ) {
				result[ hoverSelector ][ cleanedAttributeName ] = blockAttributes[ attributeName ];
			} else if (
				'spacing' === attributeName ||
				'sizing' === attributeName ||
				'borders' === attributeName ||
				'typography' === attributeName
			) {
				// Extract values inside 'spacing' and 'sizing' and add them directly to the result
				Object.entries( blockAttributes[ attributeName ] ).forEach( ( [ key, value ] ) => {
					const cleanedObjectAttributeName = cleanAttributeName( key );

					if ( key.includes( 'Tablet' ) && cleanedObjectAttributeName ) {
						addToMedia( result, tabletMediaQuery, cleanedObjectAttributeName, value );
					} else if ( key.includes( 'Mobile' ) && cleanedObjectAttributeName ) {
						addToMedia( result, mobileMediaQuery, cleanedObjectAttributeName, value );
					} else if ( cleanedObjectAttributeName ) {
						result[ cleanedObjectAttributeName ] = value;
					}
				} );
			} else if ( 'bgImage' === attributeName ) {
				if ( blockAttributes.bgImage?.image?.url ) {
					if ( 'pseudo-element' === blockAttributes?.bgOptions?.selector ) {
						result[ '&:before' ] = {
							...result[ '&:before' ],
							backgroundImage: `url(${ blockAttributes.bgImage.image.url })`,
							backgroundRepeat: blockAttributes.bgOptions.repeat,
							backgroundSize: blockAttributes.bgOptions.size,
							backgroundPosition: blockAttributes.bgOptions.position,
							backgroundAttachment: blockAttributes.bgOptions.attachment,
							content: '""',
							position: 'absolute',
							top: '0',
							right: '0',
							bottom: '0',
							left: '0',
							zIndex: '0',
						};
					} else {
						result.backgroundImage = `url(${ blockAttributes.bgImage.image.url })`;
						result.backgroundRepeat = blockAttributes.bgOptions.repeat;
						result.backgroundSize = blockAttributes.bgOptions.size;
						result.backgroundPosition = blockAttributes.bgOptions.position;
						result.backgroundAttachment = blockAttributes.bgOptions.attachment;
					}
				}
			} else if ( 'gradient' === attributeName && blockAttributes.gradient ) {
				let gradientColorStopOneValue = '',
					gradientColorStopTwoValue = '';

				const gradientColorOneValue = hexToRGBA( blockAttributes.gradientColorOne, blockAttributes.gradientColorOneOpacity );
				const gradientColorTwoValue = hexToRGBA( blockAttributes.gradientColorTwo, blockAttributes.gradientColorTwoOpacity );

				if ( blockAttributes.gradientColorOne && '' !== blockAttributes.gradientColorStopOne ) {
					gradientColorStopOneValue = ' ' + blockAttributes.gradientColorStopOne + '%';
				}

				if ( blockAttributes.gradientColorTwo && '' !== blockAttributes.gradientColorStopTwo ) {
					gradientColorStopTwoValue = ' ' + blockAttributes.gradientColorStopTwo + '%';
				}

				const gradientValue = 'linear-gradient(' + blockAttributes.gradientDirection + 'deg, ' + gradientColorOneValue + gradientColorStopOneValue + ', ' + gradientColorTwoValue + gradientColorStopTwoValue + ')';

				if ( 'pseudo-element' === blockAttributes.gradientSelector ) {
					result[ '&:after' ] = {
						...result[ '&:after' ],
						backgroundImage: gradientValue,
						content: '""',
						position: 'absolute',
						top: '0',
						right: '0',
						bottom: '0',
						left: '0',
						zIndex: '0',
						pointerEvents: 'none',
					};
				} else {
					result.backgroundImage = gradientValue;
				}
			} else if ( cleanedAttributeName ) {
				// Handle default case
				result[ cleanedAttributeName ] = blockAttributes[ attributeName ];
			}

			return result;
		}, { [ tabletMediaQuery ]: {}, [ mobileMediaQuery ]: {}, [ hoverSelector ]: {}, '&:before': {}, '&:after': {} } );

	return cleanStylesObject( convertedObject );
}
