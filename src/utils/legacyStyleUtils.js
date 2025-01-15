import { sprintf } from '@wordpress/i18n';

import { defaultAtRules, cleanStylesObject, getAtRuleValue } from '@edge22/styles-builder';

import { noStyleAttributes, hexToRGBA, hasNumericValue } from '@utils';

export function getLocalBlockStyles( attributeData, blockAttributes ) {
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
			result[ rule ][ hoverSelector ][ attributeName ] = value;
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
			.replace( 'textColor', 'color' )
			.replace( 'zindex', 'zIndex' );

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
					} else if ( key.includes( 'Hover' ) && cleanedObjectAttributeName ) {
						result[ hoverSelector ][ cleanedObjectAttributeName ] = value;
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
							opacity: blockAttributes.bgOptions.opacity,
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
			} else if ( 'iconStyles' === attributeName ) {
				const iconStyles = blockAttributes.iconStyles;

				if ( iconStyles.width ) {
					result[ '.gb-shape svg' ] = {
						...result[ '.gb-shape svg' ],
						width: iconStyles.width,
					};
				}

				if ( iconStyles.height ) {
					result[ '.gb-shape svg' ] = {
						...result[ '.gb-shape svg' ],
						height: iconStyles.height,
					};
				}
			} else if ( 'useGlobalMaxWidth' === attributeName ) {
				if ( blockAttributes.useGlobalMaxWidth ) {
					result.maxWidth = 'var(--gb-container-width)';
				}
			} else if ( 'iconColor' === attributeName ) {
				result[ '.gb-shape svg' ] = {
					...result[ '.gb-shape svg' ],
					color: blockAttributes.iconColor,
					fill: 'currentColor',
				};
			} else if ( 'linkColor' === attributeName ) {
				result.a = {
					...result.a,
					color: blockAttributes.linkColor,
				};
			} else if ( 'linkColorHover' === attributeName ) {
				result[ 'a:hover' ] = {
					...result[ 'a:hover' ],
					color: blockAttributes.linkColorHover,
				};
			} else if ( 'opacities' === attributeName ) {
				applyEffectsStyles(
					result,
					blockAttributes.opacities,
					blockAttributes.useOpacity,
					getLegacyOpacityValues
				);
			} else if ( 'transitions' === attributeName ) {
				applyEffectsStyles(
					result,
					blockAttributes.transitions,
					blockAttributes.useTransition,
					getLegacyTransitionValues
				);
			} else if ( 'boxShadows' === attributeName ) {
				applyEffectsStyles(
					result,
					blockAttributes.boxShadows,
					blockAttributes.useBoxShadow,
					getLegacyBoxShadowValues
				);
			} else if ( 'textShadows' === attributeName ) {
				applyEffectsStyles(
					result,
					blockAttributes.textShadows,
					blockAttributes.useTextShadow,
					getLegacyTextShadowValues
				);
			} else if ( 'filters' === attributeName ) {
				applyEffectsStyles(
					result,
					blockAttributes.filters,
					blockAttributes.useFilter,
					getLegacyFilterValues
				);
			} else if ( 'transforms' === attributeName ) {
				applyEffectsStyles(
					result,
					blockAttributes.transforms,
					blockAttributes.useTransform,
					getLegacyTransformValues
				);
			} else if ( cleanedAttributeName ) {
				// Handle default case
				result[ cleanedAttributeName ] = blockAttributes[ attributeName ];
			}

			return result;
		}, { [ tabletMediaQuery ]: {}, [ mobileMediaQuery ]: {}, [ hoverSelector ]: {}, '&:before': {}, '&:after': {} } );

	return cleanStylesObject( convertedObject );
}

function getLegacyEffectsSelector( effect ) {
	const {
		device = '',
		state = 'normal',
		target = 'self',
		customSelector = '',
		direction = '',
	} = effect;

	let atRule = '';

	switch ( device ) {
		case 'mobile':
			atRule = getAtRuleValue( 'smallWidth' );
			break;
		case 'tablet':
			atRule = getAtRuleValue( 'mediumSmallWidth' );
			break;
		case 'tablet-only':
			atRule = getAtRuleValue( 'mediumWidth' );
			break;
		case 'desktop':
			atRule = getAtRuleValue( 'largeWidth' );
			break;
	}

	let nestedRule = '';

	if ( 'hover' === state ) {
		nestedRule = '&:hover';
	}

	switch ( target ) {
		case 'innerContainer':
			nestedRule += ' > .gb-container';
			break;
		case 'backgroundImage':
			if ( nestedRule ) {
				nestedRule += ':before';
			} else {
				nestedRule = '&:before';
			}
			break;
		case 'icon':
			nestedRule += ' .gb-shape';
			break;
		case 'accordionContent':
			nestedRule += ' > .gb-accordion__content';
			break;
		case 'customSelector':
			nestedRule += ' ' + customSelector;
			break;
		case 'pseudo-element':
			const pseudoSelector = direction ? ':after' : ':before';

			if ( nestedRule ) {
				nestedRule += pseudoSelector;
			} else {
				nestedRule = '&' + pseudoSelector;
			}
			break;
	}

	return {
		atRule,
		nestedRule,
	};
}

function applyEffectsStyles( result, effects, useEffect, getValues ) {
	if ( ! useEffect ) {
		return;
	}

	if ( ! Array.isArray( effects ) || 0 === effects.length ) {
		return;
	}

	effects.forEach( ( effect ) => {
		const values = getValues( effect );

		if ( ! values || 0 === Object.keys( values ).length ) {
			return;
		}

		const selector = getLegacyEffectsSelector( effect );

		if ( selector?.atRule ) {
			if ( selector?.nestedRule ) {
				result[ selector.nestedRule ] = {
					...result[ selector.nestedRule ],
					[ selector.atRule ]: {
						...result[ selector.nestedRule ]?.[ selector.atRule ],
						...values,
					},
				};
			} else {
				result[ selector.atRule ] = {
					...result[ selector.atRule ],
					...values,
				};
			}
		} else if ( selector?.nestedRule ) {
			result[ selector.nestedRule ] = {
				...result[ selector.nestedRule ],
				...values,
			};
		} else {
			Object.assign( result, values );
		}
	} );
}

function getLegacyOpacityValues( opacity ) {
	const values = {};

	if ( hasNumericValue( opacity.opacity ) ) {
		values.opacity = opacity.opacity;
	}

	if ( opacity.mixBlendMode ) {
		values.mixBlendMode = opacity.mixBlendMode;
	}

	return values;
}

function getLegacyTransitionValues( transition ) {
	const transitionValue = sprintf(
		'%1$s %2$s %3$s %4$s',
		transition.property,
		transition.duration + 's',
		transition.timingFunction,
		hasNumericValue( transition.delay ) ? transition.delay + 's' : ''
	);

	return {
		transition: transitionValue.trim(),
	};
}

function getLegacyBoxShadowValues( boxShadow ) {
	const {
		inset = '',
		xOffset = '0',
		yOffset = '0',
		blur = '0',
		spread = '0',
		color,
		colorOpacity = '1',
	} = boxShadow;

	const boxShadowValue = sprintf(
		'%1$s %2$s %3$s %4$s %5$s %6$s',
		inset ? 'inset' : '',
		xOffset ? xOffset + 'px' : '0',
		yOffset ? yOffset + 'px' : '0',
		blur ? blur + 'px' : '0',
		spread ? spread + 'px' : '0',
		hexToRGBA( color, colorOpacity )
	);

	return {
		boxShadow: boxShadowValue.trim(),
	};
}

function getLegacyTextShadowValues( textShadow ) {
	const {
		xOffset = '0',
		yOffset = '0',
		blur = '0',
		color,
		colorOpacity = '1',
	} = textShadow;

	const textShadowValue = sprintf(
		'%1$s %2$s %3$s %4$s',
		hexToRGBA( color, colorOpacity ),
		xOffset ? xOffset + 'px' : '0',
		yOffset ? yOffset + 'px' : '0',
		blur ? blur + 'px' : '0',
	);

	return {
		textShadow: textShadowValue.trim(),
	};
}

function getLegacyFilterValues( filter ) {
	const filters = [];

	const {
		type = '',
		blur = '',
		brightness = '',
		contrast = '',
		grayscale = '',
		hueRotate = '',
		invert = '',
		saturate = '',
		sepia = '',
	} = filter;

	if ( 'blur' === type && hasNumericValue( blur ) ) {
		filters.push( `blur(${ blur }px)` );
	}

	if ( 'brightness' === type && hasNumericValue( brightness ) ) {
		filters.push( `brightness(${ brightness }%)` );
	}

	if ( 'contrast' === type && hasNumericValue( contrast ) ) {
		filters.push( `contrast(${ contrast }%)` );
	}

	if ( 'grayscale' === type && hasNumericValue( grayscale ) ) {
		filters.push( `grayscale(${ grayscale }%)` );
	}

	if ( 'hue-rotate' === type && hasNumericValue( hueRotate ) ) {
		filters.push( `hue-rotate(${ hueRotate }deg)` );
	}

	if ( 'invert' === type && hasNumericValue( invert ) ) {
		filters.push( `invert(${ invert }%)` );
	}

	if ( 'saturate' === type && hasNumericValue( saturate ) ) {
		filters.push( `saturate(${ saturate }%)` );
	}

	if ( 'sepia' === type && hasNumericValue( sepia ) ) {
		filters.push( `sepia(${ sepia }%)` );
	}

	return {
		filter: filters.length ? filters.join( ' ' ) : '',
	};
}

function getLegacyTransformValues( transform ) {
	const transforms = [];

	const {
		type = '',
		translateX = '',
		translateY = '',
		rotate = '',
		skewX = '',
		skewY = '',
		scale = '',
	} = transform;

	if ( 'translate' === type ) {
		let translateXValue = 0;
		let translateYValue = 0;

		if ( hasNumericValue( translateX ) ) {
			translateXValue = translateX + 'px';
		}

		if ( hasNumericValue( translateY ) ) {
			translateYValue = translateY + 'px';
		}

		transforms.push( `translate(${ translateXValue }, ${ translateYValue })` );
	}

	if ( 'rotate' === type && hasNumericValue( rotate ) ) {
		transforms.push( `rotate(${ rotate }deg)` );
	}

	if ( 'skew' === type ) {
		let skewXValue = 0;
		let skewYValue = 0;

		if ( hasNumericValue( skewX ) ) {
			skewXValue = skewX + 'deg';
		}

		if ( hasNumericValue( skewY ) ) {
			skewYValue = skewY + 'deg';
		}

		transforms.push( `skew(${ skewXValue }, ${ skewYValue })` );
	}

	if ( 'scale' === type && hasNumericValue( scale ) ) {
		transforms.push( `scale(${ scale })` );
		transforms.push( 'perspective(1000px)' ); // Activate GPU.
	}

	return {
		transform: transforms.length ? transforms.join( ' ' ) : '',
	};
}
