/* eslint-disable quotes */
import buildCSS from '../../../utils/build-css';
import shorthandCSS from '../../../utils/shorthand-css';
import hexToRGBA from '../../../utils/hex-to-rgba';
import valueWithUnit from '../../../utils/value-with-unit';
import getBackgroundImageCSS from '../../../utils/get-background-image';

import {
	Component,
} from '@wordpress/element';

import {
	applyFilters,
} from '@wordpress/hooks';

export default class MainCSS extends Component {
	render() {
		const attributes = applyFilters( 'generateblocks.editor.cssAttrs', this.props.attributes, this.props );

		const {
			clientId,
		} = this.props;

		const {
			uniqueId,
			isGrid,
			width,
			autoWidth,
			flexGrow,
			flexShrink,
			flexBasis,
			flexBasisUnit,
			outerContainer,
			innerContainer,
			containerWidth,
			minHeight,
			minHeightUnit,
			paddingTop,
			paddingRight,
			paddingBottom,
			paddingLeft,
			paddingUnit,
			marginTop,
			marginRight,
			marginBottom,
			marginLeft,
			marginUnit,
			borderSizeTop,
			borderSizeRight,
			borderSizeBottom,
			borderSizeLeft,
			borderRadiusTopRight,
			borderRadiusBottomRight,
			borderRadiusBottomLeft,
			borderRadiusTopLeft,
			borderRadiusUnit,
			borderColor,
			borderColorOpacity,
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
			alignment,
			fontFamily,
			fontFamilyFallback,
			fontWeight,
			fontSize,
			fontSizeUnit,
			textTransform,
			shapeDividers,
		} = attributes;

		let containerWidthPreview = containerWidth;

		if ( ! containerWidthPreview ) {
			containerWidthPreview = generateBlocksDefaults.container.containerWidth;
		}

		let fontFamilyFallbackValue = '';

		if ( fontFamily && fontFamilyFallback ) {
			fontFamilyFallbackValue = ', ' + fontFamilyFallback;
		}

		const hasBgImage = !! bgImage;
		const backgroundImageValue = getBackgroundImageCSS( 'image', this.props );
		const gradientValue = getBackgroundImageCSS( 'gradient', this.props );

		let cssObj = [];
		cssObj[ '.gb-container-' + uniqueId ] = [ {
			'background-color': hexToRGBA( backgroundColor, backgroundColorOpacity ),
			'color': textColor, // eslint-disable-line quote-props
			'border-radius': shorthandCSS( borderRadiusTopLeft, borderRadiusTopRight, borderRadiusBottomRight, borderRadiusBottomLeft, borderRadiusUnit ),
			'margin': shorthandCSS( marginTop, marginRight, marginBottom, marginLeft, marginUnit ), // eslint-disable-line quote-props
			'z-index': zindex,
			'text-align': alignment,
			'font-family': fontFamily + fontFamilyFallbackValue,
			'font-weight': fontWeight,
			'text-transform': textTransform,
			'font-size': valueWithUnit( fontSize, fontSizeUnit ),
			'min-height': valueWithUnit( minHeight, minHeightUnit ),
			'border-color': hexToRGBA( borderColor, borderColorOpacity ),
		} ];

		if ( hasBgImage && 'element' === bgOptions.selector && backgroundImageValue ) {
			cssObj[ '.gb-container-' + uniqueId ].push( {
				'background-image': backgroundImageValue,
				'background-size': bgOptions.size,
				'background-position': bgOptions.position,
				'background-repeat': bgOptions.repeat,
				'background-attachment': bgOptions.attachment,
			} );
		} else if ( gradient && 'element' === gradientSelector ) {
			cssObj[ '.gb-container-' + uniqueId ].push( {
				'background-image': gradientValue,
			} );
		}

		if (
			( hasBgImage && 'pseudo-element' === bgOptions.selector ) ||
			zindex ||
			( gradient && 'pseudo-element' === gradientSelector )
		) {
			cssObj[ '.gb-container-' + uniqueId ].push( {
				'position': 'relative', // eslint-disable-line quote-props
			} );
		}

		if (
			( hasBgImage && 'pseudo-element' === bgOptions.selector ) ||
			( gradient && 'pseudo-element' === gradientSelector )
		) {
			cssObj[ '.gb-container-' + uniqueId ].push( {
				'overflow': 'hidden', // eslint-disable-line quote-props
			} );

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

		if ( borderSizeTop || borderSizeRight || borderSizeBottom || borderSizeLeft ) {
			cssObj[ '.gb-container-' + uniqueId ].push( {
				'border-width': shorthandCSS( borderSizeTop, borderSizeRight, borderSizeBottom, borderSizeLeft, 'px' ),
				'border-style': 'solid',
			} );
		}

		if ( minHeight && ! isGrid ) {
			cssObj[ '.gb-container-' + uniqueId ].push( {
				'display': 'flex', // eslint-disable-line quote-props
				'flex-direction': 'row',
				'align-items': verticalAlignment,
			} );
		}

		if ( isGrid ) {
			cssObj[ '.gb-container-' + uniqueId ].push( {
				'display': 'flex', // eslint-disable-line quote-props
				'flex-direction': 'column',
				'height': '100%', // eslint-disable-line quote-props
				'justify-content': verticalAlignment,
			} );

			cssObj[ '.block-editor-block-list__layout > #block-' + clientId ] = [ {
				'height': '100%', // eslint-disable-line quote-props
			} ];
		}

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
				'border-radius': shorthandCSS( borderRadiusTopLeft, borderRadiusTopRight, borderRadiusBottomRight, borderRadiusBottomLeft, borderRadiusUnit ),
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
				'z-index': '0',
				'position': 'absolute', // eslint-disable-line quote-props
				'top': '0', // eslint-disable-line quote-props
				'right': '0', // eslint-disable-line quote-props
				'bottom': '0', // eslint-disable-line quote-props
				'left': '0', // eslint-disable-line quote-props
			} ];
		}

		cssObj[ '.gb-container-' + uniqueId + ' a, .gb-container-' + uniqueId + ' a:visited' ] = [ {
			'color': linkColor, // eslint-disable-line quote-props
		} ];

		cssObj[ '.gb-container-' + uniqueId + ' a:hover' ] = [ {
			'color': linkColorHover, // eslint-disable-line quote-props
		} ];

		cssObj[ '.gb-container-' + uniqueId + ' > .gb-inside-container' ] = [ {
			'padding': shorthandCSS( paddingTop, paddingRight, paddingBottom, paddingLeft, paddingUnit ), // eslint-disable-line quote-props
			'width': minHeight && ! isGrid ? '100%' : false, // eslint-disable-line quote-props
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

		cssObj[ '.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-' + clientId ] = [ {
			width: ! autoWidth ? valueWithUnit( width, '%' ) : false,
			'flex-grow': flexGrow,
			'flex-shrink': flexShrink,
			'flex-basis': isNaN( flexBasis ) ? flexBasis : valueWithUnit( flexBasis, flexBasisUnit ),
			'display': 'flex', // eslint-disable-line quote-props
			'flex-direction': 'column',
			'margin-left': '0px',
			'margin-right': '0px',
		} ];

		cssObj[ '.block-editor-block-list__layout > #block-' + clientId ] = [ {
			'max-width': 'contained' === outerContainer && ! isGrid ? valueWithUnit( containerWidthPreview, 'px' ) : false,
		} ];

		cssObj[ `.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-` + clientId + ` > .block-editor-block-list__block-edit,
		.gb-grid-wrapper > div > .block-editor-block-list__layout > #block-` + clientId + ` > .block-editor-block-list__block-edit > [data-block="` + clientId + `"]` ] = [ {
			'height': '100%', // eslint-disable-line quote-props
		} ];

		cssObj[ `#block-` + clientId + `:not(.has-child-selected):not(.is-selected) .block-list-appender:not(:first-child),
		#block-` + clientId + `:not(.has-child-selected):not(.is-selected) .block-editor-block-list__layout > div:not(:first-child) > .block-list-appender` ] = [ {
			'display': 'none', // eslint-disable-line quote-props
		} ];

		if ( shapeDividers.length ) {
			cssObj[ '.gb-container-' + uniqueId ].push( {
				position: 'relative',
			} );

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

		cssObj = applyFilters( 'generateblocks.editor.mainCSS', cssObj, this.props, 'container' );

		return (
			<style>{ buildCSS( cssObj ) }</style>
		);
	}
}
/* eslint-enable quotes */
