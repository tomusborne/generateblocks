/* eslint-disable quotes */
import buildCSS from '../../../utils/build-css';
import shorthandCSS from '../../../utils/shorthand-css';
import hexToRGBA from '../../../utils/hex-to-rgba';
import valueWithUnit from '../../../utils/value-with-unit';
import getBackgroundImageCSS from '../../../utils/get-background-image';
import sizingValue from '../../../utils/sizingValue';
import {
	applyFilters,
} from '@wordpress/hooks';
import SizingCSS from '../../../extend/inspector-control/controls/sizing/components/SizingCSS';
import LayoutCSS from '../../../extend/inspector-control/controls/layout/components/LayoutCSS';
import FlexChildCSS from '../../../extend/inspector-control/controls/flex-child-panel/components/FlexChildCSS';
import isFlexItem from '../../../utils/is-flex-item';
import SpacingCSS from '../../../extend/inspector-control/controls/spacing/components/SpacingCSS';
import TypographyCSS from '../../../extend/inspector-control/controls/typography/components/TypographyCSS';
import BorderCSS, { BorderCSSColor } from '../../../extend/inspector-control/controls/borders/BorderCSS';

export default function MainCSS( props ) {
	const attributes = applyFilters( 'generateblocks.editor.cssAttrs', props.attributes, props );

	const {
		clientId,
		device,
	} = props;

	const {
		uniqueId,
		isGrid,
		flexGrow,
		flexShrink,
		flexBasis,
		outerContainer,
		innerContainer,
		containerWidth,
		backgroundColor,
		backgroundColorOpacity,
		gradient,
		gradientSelector,
		textColor,
		linkColor,
		linkColorHover,
		bgImage,
		bgOptions,
		verticalAlignment,
		zindex,
		innerZindex,
		fontFamilyFallback,
		shapeDividers,
		gridId,
		useDynamicData,
		dynamicContentType,
		bgImageInline,
		useInnerContainer,
		sizing,
		order,
		display,
		displayTablet,
		displayMobile,
	} = attributes;

	const {
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
	} = attributes.spacing;

	const {
		borderTopLeftRadius,
		borderTopRightRadius,
		borderBottomRightRadius,
		borderBottomLeftRadius,
	} = attributes.borders;

	let containerWidthPreview = containerWidth;

	if ( ! containerWidthPreview ) {
		containerWidthPreview = generateBlocksDefaults.container.containerWidth;
	}

	const hasBgImage = !! bgImage || ( useDynamicData && '' !== dynamicContentType );
	const backgroundImageValue = getBackgroundImageCSS( 'image', props );
	const gradientValue = getBackgroundImageCSS( 'gradient', props );
	const selector = '.editor-styles-wrapper .gb-container-' + uniqueId;

	let cssObj = [];
	cssObj[ selector ] = [ {
		'background-color': hexToRGBA( backgroundColor, backgroundColorOpacity ),
		'color': textColor, // eslint-disable-line quote-props
	} ];

	TypographyCSS( cssObj, selector, { ...attributes.typography, fontFamilyFallback } );
	SpacingCSS( cssObj, selector, { ...attributes.spacing, useInnerContainer } );
	BorderCSS( cssObj, selector, attributes.borders );
	SizingCSS( cssObj, selector, attributes );
	LayoutCSS( cssObj, selector, attributes );
	FlexChildCSS( cssObj, selector, attributes );

	if ( hasBgImage && 'element' === bgOptions.selector && backgroundImageValue ) {
		cssObj[ selector ].push( {
			'background-image': ! bgImageInline ? backgroundImageValue : null,
			'background-size': bgOptions.size,
			'background-position': bgOptions.position,
			'background-repeat': bgOptions.repeat,
			'background-attachment': bgOptions.attachment,
		} );
	} else if ( gradient && 'element' === gradientSelector ) {
		cssObj[ selector ].push( {
			'background-image': gradientValue,
		} );
	}

	BorderCSSColor( cssObj, selector + ':hover', { ...attributes.borders }, 'Hover' );

	const currentSelector = selector + '[data-container-is-current], ' + selector + '[data-container-is-current]:hover';
	BorderCSSColor( cssObj, currentSelector, { ...attributes.borders }, 'Current' );

	if ( useInnerContainer ) {
		if (
			( hasBgImage && 'pseudo-element' === bgOptions.selector ) ||
			zindex ||
			( gradient && 'pseudo-element' === gradientSelector )
		) {
			cssObj[ '.editor-styles-wrapper .gb-container-' + uniqueId ].push( {
				'position': 'relative', // eslint-disable-line quote-props
			} );
		}

		if (
			( hasBgImage && 'pseudo-element' === bgOptions.selector ) ||
			( gradient && 'pseudo-element' === gradientSelector )
		) {
			cssObj[ '.editor-styles-wrapper .gb-container-' + uniqueId ].push( {
				'overflow': 'hidden', // eslint-disable-line quote-props
			} );

			cssObj[ '.gb-container-' + uniqueId + ' .block-list-appender' ] = [ {
				'z-index': 10,
			} ];
		}
	}

	if (
		( hasBgImage && 'pseudo-element' === bgOptions.selector ) ||
		( gradient && 'pseudo-element' === gradientSelector )
	) {
		cssObj[ '.gb-container-' + uniqueId + ' .block-list-appender' ] = [ {
			'z-index': 10,
		} ];
	}

	cssObj[ `.editor-styles-wrapper .gb-container-` + uniqueId + ` h1,
		.editor-styles-wrapper .gb-container-` + uniqueId + ` h2,
		.editor-styles-wrapper .gb-container-` + uniqueId + ` h3,
		.editor-styles-wrapper .gb-container-` + uniqueId + ` h4,
		.editor-styles-wrapper .gb-container-` + uniqueId + ` h5,
		.editor-styles-wrapper .gb-container-` + uniqueId + ` h6` ] = [ {
		'color': textColor, // eslint-disable-line quote-props
	} ];

	if ( hasBgImage && 'pseudo-element' === bgOptions.selector ) {
		cssObj[ '.gb-container-' + uniqueId + ':before' ] = [ {
			'content': '""', // eslint-disable-line quote-props
			'background-image': backgroundImageValue,
			'background-repeat': bgOptions.repeat,
			'background-position': bgOptions.position,
			'background-size': bgOptions.size,
			'background-attachment': bgOptions.attachment,
			'z-index': '0',
			'position': 'absolute', // eslint-disable-line quote-props
			'top': '0', // eslint-disable-line quote-props
			'right': '0', // eslint-disable-line quote-props
			'bottom': '0', // eslint-disable-line quote-props
			'left': '0', // eslint-disable-line quote-props
			'border-radius': shorthandCSS( borderTopLeftRadius, borderTopRightRadius, borderBottomRightRadius, borderBottomLeftRadius ),
			'pointer-events': 'none',
		} ];

		if ( typeof bgOptions.opacity !== 'undefined' && 1 !== bgOptions.opacity ) {
			cssObj[ '.gb-container-' + uniqueId + ':before' ].push( {
				'opacity': bgOptions.opacity, // eslint-disable-line quote-props
			} );
		}
	}

	if ( gradient && 'pseudo-element' === gradientSelector ) {
		cssObj[ '.gb-container-' + uniqueId + ':after' ] = [ {
			'content': '""', // eslint-disable-line quote-props
			'background-image': gradientValue,
			'z-index': '0 !important',
			'position': 'absolute', // eslint-disable-line quote-props
			'top': '0', // eslint-disable-line quote-props
			'right': '0', // eslint-disable-line quote-props
			'bottom': '0', // eslint-disable-line quote-props
			'left': '0', // eslint-disable-line quote-props
			'pointer-events': 'none',
		} ];
	}

	cssObj[ '.editor-styles-wrapper .gb-container-' + uniqueId + ' a, .editor-styles-wrapper .gb-container-' + uniqueId + ' a:visited' ] = [ {
		'color': linkColor, // eslint-disable-line quote-props
	} ];

	cssObj[ '.editor-styles-wrapper .gb-container-' + uniqueId + ' a:hover' ] = [ {
		'color': linkColorHover, // eslint-disable-line quote-props
	} ];

	if ( useInnerContainer ) {
		if ( sizingValue( 'minHeight', sizing ) && ! isGrid ) {
			cssObj[ '.editor-styles-wrapper .gb-container-' + uniqueId ].push( {
				'display': 'flex', // eslint-disable-line quote-props
				'flex-direction': 'row',
				'align-items': verticalAlignment,
			} );
		}

		cssObj[ '.gb-container-' + uniqueId + ' > .gb-inside-container' ] = [ {
			padding: shorthandCSS( paddingTop, paddingRight, paddingBottom, paddingLeft ),
			'width': sizingValue( 'minHeight', sizing ) && ! isGrid ? '100%' : false, // eslint-disable-line quote-props
		} ];

		if ( innerZindex || 0 === innerZindex ) {
			cssObj[ '.gb-container-' + uniqueId + ' > .gb-inside-container' ].push( {
				'z-index': innerZindex,
				position: 'relative',
			} );
		}

		if ( 'contained' === innerContainer && ! isGrid ) {
			cssObj[ '.gb-container-' + uniqueId + ' > .gb-inside-container' ].push( {
				'max-width': valueWithUnit( containerWidthPreview, 'px' ),
				'margin-left': 'auto',
				'margin-right': 'auto',
			} );
		}

		// We need use an ID for the contained block width so it overrides other
		// .wp-block max-width selectors.
		cssObj[ '#block-' + clientId ] = [ {
			'max-width': 'contained' === outerContainer && ! isGrid ? valueWithUnit( containerWidthPreview, 'px' ) : false,
			'margin-left': 'contained' === outerContainer && ! isGrid ? 'auto' : false,
			'margin-right': 'contained' === outerContainer && ! isGrid ? 'auto' : false,
		} ];
	}

	if ( isGrid ) {
		const gridColumnSelectors = [
			'.gb-post-template-' + gridId + ' > .gb-post-template-wrapper > .block-editor-inner-blocks',
			'.gb-grid-wrapper > .block-editor-inner-blocks > .block-editor-block-list__layout > .gb-grid-column-' + uniqueId,
		];

		cssObj[ gridColumnSelectors.join( ',' ) ] = [ {
			width: sizingValue( 'width', sizing ),
			'flex-grow': flexGrow,
			'flex-shrink': flexShrink,
			'flex-basis': flexBasis,
			order,
		} ];

		if ( useInnerContainer ) {
			cssObj[ '.editor-styles-wrapper .gb-container-' + uniqueId ].push( {
				display: 'flex',
				'flex-direction': 'column',
				height: '100%',
				'justify-content': verticalAlignment,
			} );
		}
	}

	if ( shapeDividers.length ) {
		if ( useInnerContainer ) {
			cssObj[ '.editor-styles-wrapper .gb-container-' + uniqueId ].push( {
				position: 'relative',
			} );
		}

		cssObj[ '.gb-container-' + uniqueId + ' .block-list-appender' ] = [ {
			position: 'relative',
			'z-index': 100,
		} ];

		shapeDividers.forEach( ( location, index ) => {
			const shapeTransforms = [];
			const shapeNumber = index + 1;

			if ( 'top' === shapeDividers[ index ].location ) {
				shapeTransforms.push( 'scaleY(-1)' );
			}

			if ( shapeDividers[ index ].flipHorizontally ) {
				shapeTransforms.push( 'scaleX(-1)' );

				cssObj[ '.gblocks-shape-container > .gblocks-shape-toggle-preview-' + shapeNumber + ' .gblocks-shape-divider-preview' ] = [ {
					transform: 'scaleX(-1)',
				} ];
			}

			cssObj[ '.gb-container-' + uniqueId + ' > .gb-shapes .gb-shape-' + shapeNumber ] = [ {
				color: hexToRGBA( shapeDividers[ index ].color, shapeDividers[ index ].colorOpacity ),
				'z-index': shapeDividers[ index ].zindex,
			} ];

			if ( 'top' === shapeDividers[ index ].location || 'bottom' === shapeDividers[ index ].location ) {
				cssObj[ '.gb-container-' + uniqueId + ' > .gb-shapes .gb-shape-' + shapeNumber ].push( {
					left: '0',
					right: '0',
				} );
			}

			if ( 'bottom' === shapeDividers[ index ].location ) {
				cssObj[ '.gb-container-' + uniqueId + ' > .gb-shapes .gb-shape-' + shapeNumber ].push( {
					bottom: '-1px',
				} );
			}

			if ( 'top' === shapeDividers[ index ].location ) {
				cssObj[ '.gb-container-' + uniqueId + ' > .gb-shapes .gb-shape-' + shapeNumber ].push( {
					top: '-1px',
				} );
			}

			if ( shapeTransforms.length ) {
				cssObj[ '.gb-container-' + uniqueId + ' > .gb-shapes .gb-shape-' + shapeNumber ].push( {
					transform: shapeTransforms.join( ' ' ),
				} );
			}

			let shapeWidth = shapeDividers[ index ].width + '%';

			if ( 100 === shapeDividers[ index ].width ) {
				shapeWidth = 'calc(' + shapeWidth + ' + 1.3px)';
			}

			cssObj[ '.gb-container-' + uniqueId + ' > .gb-shapes .gb-shape-' + shapeNumber + ' svg' ] = [ {
				height: valueWithUnit( shapeDividers[ index ].height, 'px' ),
				width: shapeWidth,
			} ];

			if ( 'top' === shapeDividers[ index ].location || 'bottom' === shapeDividers[ index ].location ) {
				cssObj[ '.gb-container-' + uniqueId + ' > .gb-shapes .gb-shape-' + shapeNumber + ' svg' ].push( {
					position: 'relative',
					left: '50%',
					transform: 'translateX(-50%)',
					'min-width': '100%',
				} );
			}
		} );
	}

	if ( isFlexItem( { device, display, displayTablet, displayMobile } ) ) {
		cssObj[ '.gb-container-' + uniqueId + '.block-editor-block-list__block > .block-list-appender' ] = [ {
			'margin-top': 0,
		} ];
	}

	cssObj = applyFilters( 'generateblocks.editor.mainCSS', cssObj, props, 'container' );

	return (
		<style>{ buildCSS( cssObj ) }</style>
	);
}
/* eslint-enable quotes */
