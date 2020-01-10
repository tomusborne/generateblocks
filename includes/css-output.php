<?php
/**
 * Output our dynamic CSS.
 *
 * @package FlexBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 *  Build the CSS from our block attributes.
 *
 * @since 0.1
 * @param string $block The block we're looking for.
 * @param string $content The content we're looking through.
 *
 * @return string The dynamic CSS.
 */
function flexblocks_get_dynamic_css( $block, $content = '' ) {
	if ( ! $content ) {
		return;
	}

	if ( 'general' === $block ) {
		$css = new FlexBlocks_Dynamic_CSS;

		$css->set_selector( '.fx-icon' );
		$css->add_property( 'display', 'inline-block' );
		$css->add_property( 'display', 'inline-flex' );

		$css->set_selector( '.fx-icon svg' );
		$css->add_property( 'height', '1em' );
		$css->add_property( 'width', '1em' );
		$css->add_property( 'fill', 'currentColor' );

		$css->set_selector( '.fx-headline-wrapper' );
		$css->add_property( 'display', '-ms-flexbox' );
		$css->add_property( 'display', 'flex' );

		$css->set_selector( '.fx-headline-wrapper > .fx-headline' );
		$css->add_property( 'margin', '0' );
		$css->add_property( 'padding', '0' );

		return $css->css_output();
	}

	/**
	 * Get our Grid block CSS.
	 *
	 * @since 0.1
	 */
	if ( 'grid' === $block ) {
		$data = flexblocks_get_block_data( 'flexblocks/grid', $content );

		if ( empty( $data ) ) {
			return;
		}

		$css = new FlexBlocks_Dynamic_CSS;

		$css->set_selector( '.fx-grid-wrapper' );
		$css->add_property( 'display', '-webkit-box' );
		$css->add_property( 'display', '-ms-flexbox' );
		$css->add_property( 'display', 'flex' );
		$css->add_property( '-ms-flex-wrap', 'wrap' );
		$css->add_property( 'flex-wrap', 'wrap' );

		$css->set_selector( '.fx-grid-wrapper > .fx-grid-column > .fx-container' );
		$css->add_property( 'display', 'flex' );
		$css->add_property( 'flex-direction', 'column' );
		$css->add_property( 'height', '100%' );

		$css->set_selector( '.fx-grid-column' );
		$css->add_property( 'box-sizing', 'border-box' );

		foreach ( $data as $atts ) {
			if ( ! isset( $atts['uniqueId'] ) ) {
				continue;
			}

			$defaults = flexblocks_get_block_defaults();

			$settings = wp_parse_args(
				$atts,
				$defaults['gridContainer']
			);

			$id = $atts['uniqueId'];

			$css->set_selector( '.fx-grid-wrapper-' . $id );
			$css->add_property( 'align-items', $settings['verticalAlignment'] );
			$css->add_property( 'justify-content', $settings['horizontalAlignment'] );

			if ( $settings['horizontalGap'] ) {
				$css->add_property( 'margin-left', '-' . $settings['horizontalGap'] . 'px' );
			}

			$css->set_selector( '.fx-grid-wrapper-' . $id . ' > .fx-grid-column' );

			if ( $settings['horizontalGap'] ) {
				$css->add_property( 'padding-left', $settings['horizontalGap'], 'px' );
			}

			$css->add_property( 'padding-bottom', $settings['verticalGap'], 'px' );

			$css->start_media_query( flexblocks_get_media_query( 'tablet' ) );
				$css->set_selector( '.fx-grid-wrapper-' . $id );

				if ( 'inherit' !== $settings['verticalAlignmentTablet'] ) {
					$css->add_property( 'align-items', $settings['verticalAlignmentTablet'] );
				}

				if ( 'inherit' !== $settings['horizontalAlignmentTablet'] ) {
					$css->add_property( 'justify-content', $settings['horizontalAlignmentTablet'] );
				}

				if ( $settings['horizontalGapTablet'] ) {
					$css->add_property( 'margin-left', '-' . $settings['horizontalGapTablet'] . 'px' );
				}

				$css->set_selector( '.fx-grid-wrapper-' . $id . ' > .fx-grid-column' );

				if ( $settings['horizontalGapTablet'] ) {
					$css->add_property( 'padding-left', $settings['horizontalGapTablet'], 'px' );
				}

				$css->add_property( 'padding-bottom', $settings['verticalGapTablet'], 'px' );
			$css->stop_media_query();

			$css->start_media_query( flexblocks_get_media_query( 'mobile' ) );
				$css->set_selector( '.fx-grid-wrapper-' . $id );

				if ( 'inherit' !== $settings['verticalAlignmentMobile'] ) {
					$css->add_property( 'align-items', $settings['verticalAlignmentMobile'] );
				}

				if ( 'inherit' !== $settings['horizontalAlignmentMobile'] ) {
					$css->add_property( 'justify-content', $settings['horizontalAlignmentMobile'] );
				}

				if ( $settings['horizontalGapMobile'] ) {
					$css->add_property( 'margin-left', '-' . $settings['horizontalGapMobile'] . 'px' );
				}

				$css->set_selector( '.fx-grid-wrapper-' . $id . ' > .fx-grid-column' );

				if ( $settings['horizontalGapMobile'] ) {
					$css->add_property( 'padding-left', $settings['horizontalGapMobile'], 'px' );
				}

				$css->add_property( 'padding-bottom', $settings['verticalGapMobile'], 'px' );
			$css->stop_media_query();
		}

		return $css->css_output();
	}

	/**
	 * Get our Container block CSS.
	 *
	 * @since 0.1
	 */
	if ( 'container' === $block ) {
		$data = flexblocks_get_block_data( 'flexblocks/container', $content );

		if ( empty( $data ) ) {
			return;
		}

		$css = new FlexBlocks_Dynamic_CSS;

		foreach ( $data as $atts ) {
			if ( ! isset( $atts['uniqueId'] ) ) {
				continue;
			}

			$defaults = flexblocks_get_block_defaults();

			$settings = wp_parse_args(
				$atts,
				$defaults['container']
			);

			$id = $atts['uniqueId'];

			// Open main container element.
			$css->set_selector( '.fx-container.fx-container-' . $id );

			$css->add_property( 'margin', flexblocks_get_shorthand_css( $settings['marginTop'], $settings['marginRight'], $settings['marginBottom'], $settings['marginLeft'], $settings['marginUnit'] ) );

			if ( 'contained' === $settings['outerContainer'] && ! $settings['isGrid'] ) {
				$css->add_property( 'max-width', absint( $settings['containerWidth'] ), 'px' );
				$css->add_property( 'margin-left', 'auto' );
				$css->add_property( 'margin-right', 'auto' );
			}

			$settings['backgroundColor'] = flexblocks_hex2rgba( $settings['backgroundColor'], $settings['backgroundColorOpacity'] );

			$css->add_property( 'background-color', $settings['backgroundColor'] );
			$css->add_property( 'color', $settings['textColor'] );

			$gradientColorStopOneValue = '';
			$gradientColorStopTwoValue = '';

			$settings['gradientColorOne'] = flexblocks_hex2rgba( $settings['gradientColorOne'], $settings['gradientColorOneOpacity'] );
			$settings['gradientColorTwo'] = flexblocks_hex2rgba( $settings['gradientColorTwo'], $settings['gradientColorTwoOpacity'] );

			if ( $settings['gradient'] ) {
				if ( $settings['gradientColorOne'] && '' !== $settings['gradientColorStopOne'] ) {
					$gradientColorStopOneValue = ' ' . $settings['gradientColorStopOne'] . '%';
				}

				if ( $settings['gradientColorTwo'] && '' !== $settings['gradientColorStopTwo'] ) {
					$gradientColorStopTwoValue = ' ' . $settings['gradientColorStopTwo'] . '%';
				}
			}

			if ( $settings['bgImage'] ) {
				$url = $settings['bgImage']['image']['url'];

				if ( ( $settings['backgroundColor'] || $settings['gradient'] ) && isset( $settings['bgOptions']['overlay'] ) && $settings['bgOptions']['overlay'] ) {
					if ( $settings['gradient'] ) {
						$css->add_property( 'background-image', 'linear-gradient(' . $settings['gradientDirection'] . ', ' . $settings['gradientColorOne'] . $gradientColorStopOneValue . ', ' . $settings['gradientColorTwo'] . $gradientColorStopTwoValue . '), url(' . esc_url( $url ) . ')' );
					} elseif ( $settings['backgroundColor'] ) {
						$css->add_property( 'background-image', 'linear-gradient(0deg, ' . $settings['backgroundColor'] . ', ' . $settings['backgroundColor'] . '), url(' . esc_url( $url ) . ')' );
					}
				} else {
					$css->add_property( 'background-image', 'url(' . esc_url( $url ) . ')' );
				}

				$css->add_property( 'background-repeat', $settings['bgOptions']['repeat'] );
				$css->add_property( 'background-position', $settings['bgOptions']['position'] );
				$css->add_property( 'background-size', $settings['bgOptions']['size'] );
				$css->add_property( 'background-attachment', $settings['bgOptions']['attachment'] );
			} elseif ( $settings['gradient'] ) {
				$css->add_property( 'background-image', 'linear-gradient(' . $settings['gradientDirection'] . ', ' . $settings['gradientColorOne'] . $gradientColorStopOneValue . ', ' . $settings['gradientColorTwo'] . $gradientColorStopTwoValue . ')' );
			}

			if ( $settings['zindex'] ) {
				$css->add_property( 'position', 'relative' );
				$css->add_property( 'z-index', $settings['zindex'] );
			}

			$css->add_property( 'border-radius', flexblocks_get_shorthand_css( $settings['borderRadiusTopLeft'], $settings['borderRadiusTopRight'], $settings['borderRadiusBottomRight'], $settings['borderRadiusBottomLeft'], $settings['borderRadiusUnit'] ) );
			$css->add_property( 'border-width', flexblocks_get_shorthand_css( $settings['borderSizeTop'], $settings['borderSizeRight'], $settings['borderSizeBottom'], $settings['borderSizeLeft'], 'px' ) );

			if ( $settings['borderSizeTop'] || $settings['borderSizeRight'] || $settings['borderSizeBottom'] || $settings['borderSizeLeft'] ) {
				$css->add_property( 'border-style', 'solid' );
			}

			$css->add_property( 'border-color', flexblocks_hex2rgba( $settings['borderColor'], $settings['borderColorOpacity'] ) );

			$css->add_property( 'min-height', $settings['minHeight'], $settings['minHeightUnit'] );

			$css->set_selector( '.fx-container.fx-container-' . $id . ' > .fx-inside-container' );
			$css->add_property( 'padding', flexblocks_get_shorthand_css( $settings['paddingTop'], $settings['paddingRight'], $settings['paddingBottom'], $settings['paddingLeft'], $settings['paddingUnit'] ) );

			if ( 'contained' === $settings['innerContainer'] && ! $settings['isGrid'] ) {
				$css->add_property( 'max-width', absint( $settings['containerWidth'] ), 'px' );
				$css->add_property( 'margin-left', 'auto' );
				$css->add_property( 'margin-right', 'auto' );
			}

			$css->set_selector( '.fx-container.fx-container-' . $id . ' a, .fx-container.fx-container-' . $id . ' a:visited' );
			$css->add_property( 'color', $settings['linkColor'] );

			$css->set_selector( '.fx-container.fx-container-' . $id . ' a:hover' );
			$css->add_property( 'color', $settings['linkColorHover'] );

			$css->set_selector( '.fx-grid-wrapper > .fx-grid-column-' . $id );
			$css->add_property( 'width', $settings['width'], '%' );

			if ( $settings['removeVerticalGap'] ) {
				$css->set_selector( '.fx-grid-wrapper > div.fx-grid-column-' . $id );
				$css->add_property( 'padding-bottom', '0px' );
			}

			$css->set_selector( '.fx-grid-wrapper > .fx-grid-column-' . $id . ' > .fx-container' );
			$css->add_property( 'justify-content', $settings['verticalAlignment'] );

			$css->start_media_query( flexblocks_get_media_query( 'tablet' ) );
				$css->set_selector( '.fx-container.fx-container-' . $id );
				$css->add_property( 'margin', flexblocks_get_shorthand_css( $settings['marginTopTablet'], $settings['marginRightTablet'], $settings['marginBottomTablet'], $settings['marginLeftTablet'], $settings['marginUnit'] ) );
				$css->add_property( 'border-radius', flexblocks_get_shorthand_css( $settings['borderRadiusTopLeftTablet'], $settings['borderRadiusTopRightTablet'], $settings['borderRadiusBottomRightTablet'], $settings['borderRadiusBottomLeftTablet'], $settings['borderRadiusUnit'] ) );
				$css->add_property( 'border-width', flexblocks_get_shorthand_css( $settings['borderSizeTopTablet'], $settings['borderSizeRightTablet'], $settings['borderSizeBottomTablet'], $settings['borderSizeLeftTablet'], 'px' ) );

				if ( $settings['borderSizeTopTablet'] || $settings['borderSizeRightTablet'] || $settings['borderSizeBottomTablet'] || $settings['borderSizeLeftTablet'] ) {
					$css->add_property( 'border-style', 'solid' );
				}

				$css->add_property( 'min-height', $settings['minHeightTablet'], $settings['minHeightUnitTablet'] );

				$css->set_selector( '.fx-container.fx-container-' . $id . ' > .fx-inside-container' );
				$css->add_property( 'padding', flexblocks_get_shorthand_css( $settings['paddingTopTablet'], $settings['paddingRightTablet'], $settings['paddingBottomTablet'], $settings['paddingLeftTablet'], $settings['paddingUnit'] ) );

				$css->set_selector( '.fx-grid-wrapper > .fx-grid-column-' . $id );
				$css->add_property( 'width', $settings['widthTablet'], '%' );

				if ( $settings['isGrid'] ) {
					$css->add_property( 'order', $settings['orderTablet'] );
				}

				if ( $settings['removeVerticalGapTablet'] ) {
					$css->set_selector( '.fx-grid-wrapper > div.fx-grid-column-' . $id );
					$css->add_property( 'padding-bottom', '0px' );
				}

				$css->set_selector( '.fx-grid-wrapper > .fx-grid-column-' . $id . ' > .fx-container' );

				if ( 'inherit' !== $settings['verticalAlignmentTablet'] ) {
					$css->add_property( 'justify-content', $settings['verticalAlignmentTablet'] );
				}
			$css->stop_media_query();

			$css->start_media_query( flexblocks_get_media_query( 'mobile' ) );
				$css->set_selector( '.fx-container.fx-container-' . $id );
				$css->add_property( 'margin', flexblocks_get_shorthand_css( $settings['marginTopMobile'], $settings['marginRightMobile'], $settings['marginBottomMobile'], $settings['marginLeftMobile'], $settings['marginUnit'] ) );
				$css->add_property( 'border-radius', flexblocks_get_shorthand_css( $settings['borderRadiusTopLeftMobile'], $settings['borderRadiusTopRightMobile'], $settings['borderRadiusBottomRightMobile'], $settings['borderRadiusBottomLeftMobile'], $settings['borderRadiusUnit'] ) );
				$css->add_property( 'border-width', flexblocks_get_shorthand_css( $settings['borderSizeTopMobile'], $settings['borderSizeRightMobile'], $settings['borderSizeBottomMobile'], $settings['borderSizeLeftMobile'], 'px' ) );

				if ( $settings['borderSizeTopMobile'] || $settings['borderSizeRightMobile'] || $settings['borderSizeBottomMobile'] || $settings['borderSizeLeftMobile'] ) {
					$css->add_property( 'border-style', 'solid' );
				}

				$css->add_property( 'min-height', $settings['minHeightMobile'], $settings['minHeightUnitMobile'] );

				$css->set_selector( '.fx-container.fx-container-' . $id . ' > .fx-inside-container' );
				$css->add_property( 'padding', flexblocks_get_shorthand_css( $settings['paddingTopMobile'], $settings['paddingRightMobile'], $settings['paddingBottomMobile'], $settings['paddingLeftMobile'], $settings['paddingUnit'] ) );

				$css->set_selector( '.fx-grid-wrapper > .fx-grid-column-' . $id );
				$css->add_property( 'width', $settings['widthMobile'], '%' );

				if ( $settings['isGrid'] ) {
					$css->add_property( 'order', $settings['orderMobile'] );
				}

				if ( $settings['removeVerticalGapMobile'] ) {
					$css->set_selector( '.fx-grid-wrapper > div.fx-grid-column-' . $id );
					$css->add_property( 'padding-bottom', '0px' );
				}

				$css->set_selector( '.fx-grid-wrapper > .fx-grid-column-' . $id . ' > .fx-container' );

				if ( 'inherit' !== $settings['verticalAlignmentMobile'] ) {
					$css->add_property( 'justify-content', $settings['verticalAlignmentMobile'] );
				}
			$css->stop_media_query();
		}

		return $css->css_output();
	}

	/**
	 * Get our Button Container block CSS.
	 *
	 * @since 0.1
	 */
	if ( 'button-container' === $block ) {
		$data = flexblocks_get_block_data( 'flexblocks/button-container', $content );

		if ( empty( $data ) ) {
			return;
		}

		$css = new FlexBlocks_Dynamic_CSS;

		$css->set_selector( '.fx-button-wrapper' );
		$css->add_property( 'display', 'flex' );
		$css->add_property( 'flex-wrap', 'wrap' );
		$css->add_property( 'align-items', 'flex-start' );
		$css->add_property( 'justify-content', 'flex-start' );
		$css->add_property( 'clear', 'both' );

		foreach ( $data as $atts ) {
			if ( ! isset( $atts['uniqueId'] ) ) {
				continue;
			}

			$defaults = flexblocks_get_block_defaults();

			$settings = wp_parse_args(
				$atts,
				$defaults['buttonContainer']
			);

			$id = $atts['uniqueId'];

			$css->set_selector( '.fx-button-wrapper-' . $id );
			$css->add_property( 'margin', flexblocks_get_shorthand_css( $settings['marginTop'], $settings['marginRight'], $settings['marginBottom'], $settings['marginLeft'], $settings['marginUnit'] ) );
			$css->add_property( 'justify-content', 'right' === $settings['alignment'] ? 'flex-end' : $settings['alignment'] );

			if ( $settings['stack'] ) {
				$css->add_property( 'flex-direction', 'column' );
				$css->add_property( 'align-items', 'right' === $settings['alignment'] ? 'flex-end' : $settings['alignment'] );
			}

			if ( $settings['fillHorizontalSpace'] ) {
				$css->set_selector( '.fx-button-wrapper-' . $id . ' > a' );
				$css->add_property( 'flex', '1' );
			}

			$css->start_media_query( flexblocks_get_media_query( 'tablet' ) );
				$css->set_selector( '.fx-button-wrapper-' . $id );
				$css->add_property( 'margin', flexblocks_get_shorthand_css( $settings['marginTopTablet'], $settings['marginRightTablet'], $settings['marginBottomTablet'], $settings['marginLeftTablet'], $settings['marginUnit'] ) );
				$css->add_property( 'justify-content', 'right' === $settings['alignmentTablet'] ? 'flex-end' : $settings['alignmentTablet'] );

				if ( $settings['stackTablet'] ) {
					$css->add_property( 'flex-direction', 'column' );
					$css->add_property( 'align-items', 'right' === $settings['alignmentTablet'] ? 'flex-end' : $settings['alignmentTablet'] );
				}

				if ( $settings['fillHorizontalSpaceTablet'] ) {
					$css->set_selector( '.fx-button-wrapper-' . $id . ' > a' );
					$css->add_property( 'flex', '1' );
				}
			$css->stop_media_query();


			$css->start_media_query( flexblocks_get_media_query( 'mobile' ) );
				$css->set_selector( '.fx-button-wrapper-' . $id );
				$css->add_property( 'margin', flexblocks_get_shorthand_css( $settings['marginTopMobile'], $settings['marginRightMobile'], $settings['marginBottomMobile'], $settings['marginLeftMobile'], $settings['marginUnit'] ) );
				$css->add_property( 'justify-content', 'right' === $settings['alignmentMobile'] ? 'flex-end' : $settings['alignmentMobile'] );

				if ( $settings['stackMobile'] ) {
					$css->add_property( 'flex-direction', 'column' );
					$css->add_property( 'align-items', 'right' === $settings['alignmentMobile'] ? 'flex-end' : $settings['alignmentMobile'] );
				}

				if ( $settings['fillHorizontalSpaceMobile'] ) {
					$css->set_selector( '.fx-button-wrapper-' . $id . ' > a' );
					$css->add_property( 'flex', '1' );
				}
			$css->stop_media_query();
		}

		return $css->css_output();
	}

	/**
	 * Get our Button block CSS.
	 *
	 * @since 0.1
	 */
	if ( 'button' === $block ) {
		$data = flexblocks_get_block_data( 'flexblocks/button', $content );

		if ( empty( $data ) ) {
			return;
		}

		$css = new FlexBlocks_Dynamic_CSS;

		$css->set_selector( '.fx-button' );
		$css->add_property( 'display', 'inline-block' );
		$css->add_property( 'display', 'inline-flex' );
		$css->add_property( 'align-items', 'center' );
		$css->add_property( 'justify-content', 'center' );
		$css->add_property( 'line-height', '1em' );
		$css->add_property( 'text-decoration', 'none !important' );
		$css->add_property( 'transition', '.2s background-color ease-in-out, .2s color ease-in-out, .2s border-color ease-in-out, .2s opacity ease-in-out, .2s box-shadow ease-in-out' );

		$css->set_selector( '.fx-button .fx-icon' );
		$css->add_property( 'align-items', 'center' );

		foreach ( $data as $atts ) {
			if ( ! isset( $atts['uniqueId'] ) ) {
				continue;
			}

			$defaults = flexblocks_get_block_defaults();

			$settings = wp_parse_args(
				$atts,
				$defaults['button']
			);

			$id = $atts['uniqueId'];

			$fontFamily = $settings['fontFamily'];

			if ( $fontFamily && $settings['fontFamilyFallback'] ) {
				$fontFamily = $fontFamily . ', ' . $settings['fontFamilyFallback'];
			}

			$gradientColorStopOneValue = '';
			$gradientColorStopTwoValue = '';

			if ( $settings['gradient'] ) {
				if ( $settings['gradientColorOne'] && '' !== $settings['gradientColorStopOne'] ) {
					$gradientColorStopOneValue = ' ' . $settings['gradientColorStopOne'] . '%';
				}

				if ( $settings['gradientColorTwo'] && '' !== $settings['gradientColorStopTwo'] ) {
					$gradientColorStopTwoValue = ' ' . $settings['gradientColorStopTwo'] . '%';
				}
			}

			$css->set_selector( 'a.fx-button-' . $id );
			$css->add_property( 'background-color', flexblocks_hex2rgba( $settings['backgroundColor'], $settings['backgroundColorOpacity'] ) );

			if ( $settings['gradient'] ) {
				$css->add_property( 'background-image', 'linear-gradient(' . $settings['gradientDirection'] . ', ' . flexblocks_hex2rgba( $settings['gradientColorOne'], $settings['gradientColorOneOpacity'] ) . $gradientColorStopOneValue . ', ' . flexblocks_hex2rgba( $settings['gradientColorTwo'], $settings['gradientColorTwoOpacity'] ) . $gradientColorStopTwoValue . ')' );
			}

			$css->add_property( 'color', $settings['textColor'] );
			$css->add_property( 'font-family', $fontFamily );
			$css->add_property( 'font-size', $settings['fontSize'], $settings['fontSizeUnit'] );
			$css->add_property( 'font-weight', $settings['fontWeight'] );
			$css->add_property( 'text-transform', $settings['textTransform'] );
			$css->add_property( 'letter-spacing', $settings['letterSpacing'], 'em' );
			$css->add_property( 'padding', flexblocks_get_shorthand_css( $settings['paddingTop'], $settings['paddingRight'], $settings['paddingBottom'], $settings['paddingLeft'], $settings['paddingUnit'] ) );
			$css->add_property( 'border-radius', flexblocks_get_shorthand_css( $settings['borderRadiusTopLeft'], $settings['borderRadiusTopRight'], $settings['borderRadiusBottomRight'], $settings['borderRadiusBottomLeft'], $settings['borderRadiusUnit'] ) );
			$css->add_property( 'margin', flexblocks_get_shorthand_css( $settings['marginTop'], $settings['marginRight'], $settings['marginBottom'], $settings['marginLeft'], $settings['marginUnit'] ) );
			$css->add_property( 'border-width', flexblocks_get_shorthand_css( $settings['borderSizeTop'], $settings['borderSizeRight'], $settings['borderSizeBottom'], $settings['borderSizeLeft'], 'px' ) );

			if ( $settings['borderSizeTop'] || $settings['borderSizeRight'] || $settings['borderSizeBottom'] || $settings['borderSizeLeft'] ) {
				$css->add_property( 'border-style', 'solid' );
			}

			$css->add_property( 'border-color', flexblocks_hex2rgba( $settings['borderColor'], $settings['borderColorOpacity'] ) );
			$css->add_property( 'text-transform', $settings['textTransform'] );

			if ( $settings['icon'] ) {
				$css->add_property( 'display', 'inline-flex' );
				$css->add_property( 'align-items', 'center' );
			}

			$css->set_selector( 'a.fx-button-' . $id . ':hover,a.fx-button-' . $id . ':active, a.fx-button-' . $id . ':focus' );
			$css->add_property( 'background-color', flexblocks_hex2rgba( $settings['backgroundColorHover'], $settings['backgroundColorHoverOpacity'] ) );
			$css->add_property( 'color', $settings['textColorHover'] );
			$css->add_property( 'border-color', flexblocks_hex2rgba( $settings['borderColorHover'], $settings['borderColorHoverOpacity'] ) );

			if ( $settings['icon'] ) {
				$css->set_selector( 'a.fx-button-' . $id . ' .fx-icon' );

				if ( ! $settings['removeText'] ) {
					if ( 'left' === $settings['iconLocation'] ) {
						$css->add_property( 'margin-right', '0.5em' );
					} else {
						$css->add_property( 'margin-left', '0.5em' );
					}
				}
			}

			$css->start_media_query( flexblocks_get_media_query( 'tablet' ) );
				$css->set_selector( 'a.fx-button-' . $id );
				$css->add_property( 'font-size', $settings['fontSizeTablet'], $settings['fontSizeUnit'] );
				$css->add_property( 'letter-spacing', $settings['letterSpacingTablet'], 'em' );
				$css->add_property( 'padding', flexblocks_get_shorthand_css( $settings['paddingTopTablet'], $settings['paddingRightTablet'], $settings['paddingBottomTablet'], $settings['paddingLeftTablet'], $settings['paddingUnit'] ) );
				$css->add_property( 'border-radius', flexblocks_get_shorthand_css( $settings['borderRadiusTopLeftTablet'], $settings['borderRadiusTopRightTablet'], $settings['borderRadiusBottomRightTablet'], $settings['borderRadiusBottomLeftTablet'], $settings['borderRadiusUnit'] ) );
				$css->add_property( 'margin', flexblocks_get_shorthand_css( $settings['marginTopTablet'], $settings['marginRightTablet'], $settings['marginBottomTablet'], $settings['marginLeftTablet'], $settings['marginUnit'] ) );
				$css->add_property( 'border-width', flexblocks_get_shorthand_css( $settings['borderSizeTopTablet'], $settings['borderSizeRightTablet'], $settings['borderSizeBottomTablet'], $settings['borderSizeLeftTablet'], 'px' ) );
			$css->stop_media_query();

			$css->start_media_query( flexblocks_get_media_query( 'mobile' ) );
				$css->set_selector( 'a.fx-button-' . $id );
				$css->add_property( 'font-size', $settings['fontSizeMobile'], $settings['fontSizeUnit'] );
				$css->add_property( 'letter-spacing', $settings['letterSpacingMobile'], 'em' );
				$css->add_property( 'padding', flexblocks_get_shorthand_css( $settings['paddingTopMobile'], $settings['paddingRightMobile'], $settings['paddingBottomMobile'], $settings['paddingLeftMobile'], $settings['paddingUnit'] ) );
				$css->add_property( 'border-radius', flexblocks_get_shorthand_css( $settings['borderRadiusTopLeftTablet'], $settings['borderRadiusTopRightTablet'], $settings['borderRadiusBottomRightTablet'], $settings['borderRadiusBottomLeftTablet'], $settings['borderRadiusUnit'] ) );
				$css->add_property( 'margin', flexblocks_get_shorthand_css( $settings['marginTopMobile'], $settings['marginRightMobile'], $settings['marginBottomMobile'], $settings['marginLeftMobile'], $settings['marginUnit'] ) );
				$css->add_property( 'border-width', flexblocks_get_shorthand_css( $settings['borderSizeTopMobile'], $settings['borderSizeRightMobile'], $settings['borderSizeBottomMobile'], $settings['borderSizeLeftMobile'], 'px' ) );
			$css->stop_media_query();
		}

		return $css->css_output();
	}

	/**
	 * Get our Headline block CSS.
	 *
	 * @since 0.1
	 */
	if ( 'headline' === $block ) {
		$data = flexblocks_get_block_data( 'flexblocks/headline', $content );

		if ( empty( $data ) ) {
			return;
		}

		$css = new FlexBlocks_Dynamic_CSS;

		foreach ( $data as $atts ) {
			if ( ! isset( $atts['uniqueId'] ) ) {
				continue;
			}

			$defaults = flexblocks_get_block_defaults();

			$settings = wp_parse_args(
				$atts,
				$defaults['headline']
			);

			$id = $atts['uniqueId'];

			$fontFamily = $settings['fontFamily'];

			if ( $fontFamily && $settings['fontFamilyFallback'] ) {
				$fontFamily = $fontFamily . ', ' . $settings['fontFamilyFallback'];
			}

			$css->set_selector( '.fx-headline-' . $id );
			$css->add_property( 'font-family', $fontFamily );
			$css->add_property( 'text-align', $settings['alignment'] );

			if ( ! $settings['icon'] ) {
				$css->add_property( 'background-color', flexblocks_hex2rgba( $settings['backgroundColor'], $settings['backgroundColorOpacity'] ) );
				$css->add_property( 'color', $settings['textColor'] );
			}

			$css->add_property( 'font-size', $settings['fontSize'], $settings['fontSizeUnit'] );
			$css->add_property( 'font-weight', $settings['fontWeight'] );
			$css->add_property( 'text-transform', $settings['textTransform'] );
			$css->add_property( 'line-height', $settings['lineHeight'], $settings['lineHeightUnit'] );
			$css->add_property( 'letter-spacing', $settings['letterSpacing'], 'em' );

			if ( ! $settings['icon'] ) {
				$css->add_property( 'margin', flexblocks_get_shorthand_css( $settings['marginTop'], $settings['marginRight'], $settings['marginBottom'], $settings['marginLeft'], $settings['marginUnit'] ) );
				$css->add_property( 'padding', flexblocks_get_shorthand_css( $settings['paddingTop'], $settings['paddingRight'], $settings['paddingBottom'], $settings['paddingLeft'], $settings['paddingUnit'] ) );
			}

			$css->set_selector( '.fx-headline-' . $id . ' a, .fx-headline-' . $id . ' a:visited' );
			$css->add_property( 'color', $settings['linkColor'] );

			$css->set_selector( '.fx-headline-' . $id . ' a:hover' );
			$css->add_property( 'color', $settings['linkColorHover'] );

			if ( $settings['icon'] ) {
				$css->set_selector( '.fx-headline-wrapper-' . $id . ' .fx-icon' );
				$css->add_property( 'padding', flexblocks_get_shorthand_css( $settings['iconPaddingTop'], $settings['iconPaddingRight'], $settings['iconPaddingBottom'], $settings['iconPaddingLeft'], $settings['iconPaddingUnit'] ) );
				$css->add_property( 'color', flexblocks_hex2rgba( $settings['iconColor'], $settings['iconColorOpacity'] ) );

				if ( 'above' === $settings['iconLocation'] ) {
					$css->add_property( 'align-self', 'right' === $settings['alignment'] ? 'flex-end' : $settings['alignment'] );
				}

				$css->set_selector( '.fx-headline-wrapper-' . $id . ' .fx-icon svg' );
				$css->add_property( 'width', $settings['iconSize'], 'em' );
				$css->add_property( 'height', $settings['iconSize'], 'em' );

				$css->set_selector( '.fx-headline-wrapper-' . $id );
				$css->add_property( 'margin', flexblocks_get_shorthand_css( $settings['marginTop'], $settings['marginRight'], $settings['marginBottom'], $settings['marginLeft'], $settings['marginUnit'] ) );
				$css->add_property( 'padding', flexblocks_get_shorthand_css( $settings['paddingTop'], $settings['paddingRight'], $settings['paddingBottom'], $settings['paddingLeft'], $settings['paddingUnit'] ) );
				$css->add_property( 'justify-content', 'right' === $settings['alignment'] ? 'flex-end' : $settings['alignment'] );

				if ( 'inline' === $settings['iconLocation'] ) {
					$css->add_property( 'align-items', $settings['iconVerticalAlignment'] );
				}

				$css->add_property( 'background-color', flexblocks_hex2rgba( $settings['backgroundColor'], $settings['backgroundColorOpacity'] ) );
				$css->add_property( 'color', $settings['textColor'] );

				if ( 'above' === $settings['iconLocation'] ) {
					$css->add_property( 'flex-direction', 'column' );
				}
			}

			$css->start_media_query( flexblocks_get_media_query( 'tablet' ) );
				$css->set_selector( '.fx-headline-' . $id );
				$css->add_property( 'text-align', $settings['alignmentTablet'] );
				$css->add_property( 'font-size', $settings['fontSizeTablet'], $settings['fontSizeUnit'] );
				$css->add_property( 'line-height', $settings['lineHeightTablet'], $settings['lineHeightUnit'] );
				$css->add_property( 'letter-spacing', $settings['letterSpacingTablet'], 'em' );

				if ( ! $settings['icon'] ) {
					$css->add_property( 'margin', flexblocks_get_shorthand_css( $settings['marginTopTablet'], $settings['marginRightTablet'], $settings['marginBottomTablet'], $settings['marginLeftTablet'], $settings['marginUnit'] ) );
					$css->add_property( 'padding', flexblocks_get_shorthand_css( $settings['paddingTopTablet'], $settings['paddingRightTablet'], $settings['paddingBottomTablet'], $settings['paddingLeftTablet'], $settings['paddingUnit'] ) );
				}

				if ( $settings['icon'] ) {
					$css->set_selector( '.fx-headline-wrapper-' . $id . ' .fx-icon' );
					$css->add_property( 'padding', flexblocks_get_shorthand_css( $settings['iconPaddingTopTablet'], $settings['iconPaddingRightTablet'], $settings['iconPaddingBottomTablet'], $settings['iconPaddingLeftTablet'], $settings['iconPaddingUnit'] ) );

					if ( 'above' === $settings['iconLocationTablet'] ) {
						$css->add_property( 'align-self', 'right' === $settings['alignmentTablet'] ? 'flex-end' : $settings['alignmentTablet'] );
					}

					$css->set_selector( '.fx-headline-wrapper-' . $id . ' .fx-icon svg' );
					$css->add_property( 'width', $settings['iconSizeTablet'], 'em' );
					$css->add_property( 'height', $settings['iconSizeTablet'], 'em' );

					$css->set_selector( '.fx-headline-wrapper-' . $id );
					$css->add_property( 'margin', flexblocks_get_shorthand_css( $settings['marginTopTablet'], $settings['marginRightTablet'], $settings['marginBottomTablet'], $settings['marginLeftTablet'], $settings['marginUnit'] ) );
					$css->add_property( 'padding', flexblocks_get_shorthand_css( $settings['paddingTopTablet'], $settings['paddingRightTablet'], $settings['paddingBottomTablet'], $settings['paddingLeftTablet'], $settings['paddingUnit'] ) );
					$css->add_property( 'justify-content', 'right' === $settings['alignmentTablet'] ? 'flex-end' : $settings['alignmentTablet'] );

					if ( 'inline' === $settings['iconLocationTablet'] ) {
						$css->add_property( 'align-items', $settings['iconVerticalAlignmentTablet'] );
					}

					if ( 'above' === $settings['iconLocationTablet'] ) {
						$css->add_property( 'flex-direction', 'column' );
					}
				}
			$css->stop_media_query();

			$css->start_media_query( flexblocks_get_media_query( 'mobile' ) );
				$css->set_selector( '.fx-headline-' . $id );
				$css->add_property( 'text-align', $settings['alignmentMobile'] );
				$css->add_property( 'font-size', $settings['fontSizeMobile'], $settings['fontSizeUnit'] );
				$css->add_property( 'line-height', $settings['lineHeightMobile'], $settings['lineHeightUnit'] );
				$css->add_property( 'letter-spacing', $settings['letterSpacingMobile'], 'em' );

				if ( ! $settings['icon'] ) {
					$css->add_property( 'margin', flexblocks_get_shorthand_css( $settings['marginTopMobile'], $settings['marginRightMobile'], $settings['marginBottomMobile'], $settings['marginLeftMobile'], $settings['marginUnit'] ) );
					$css->add_property( 'padding', flexblocks_get_shorthand_css( $settings['paddingTopMobile'], $settings['paddingRightMobile'], $settings['paddingBottomMobile'], $settings['paddingLeftMobile'], $settings['paddingUnit'] ) );
				}

				if ( $settings['icon'] ) {
					$css->set_selector( '.fx-headline-wrapper-' . $id . ' .fx-icon' );
					$css->add_property( 'padding', flexblocks_get_shorthand_css( $settings['iconPaddingTopMobile'], $settings['iconPaddingRightMobile'], $settings['iconPaddingBottomMobile'], $settings['iconPaddingLeftMobile'], $settings['iconPaddingUnit'] ) );

					if ( 'above' === $settings['iconLocationMobile'] ) {
						$css->add_property( 'align-self', 'right' === $settings['alignmentMobile'] ? 'flex-end' : $settings['alignmentMobile'] );
					}

					$css->set_selector( '.fx-headline-wrapper-' . $id . ' .fx-icon svg' );
					$css->add_property( 'width', $settings['iconSizeMobile'], 'em' );
					$css->add_property( 'height', $settings['iconSizeMobile'], 'em' );

					$css->set_selector( '.fx-headline-wrapper-' . $id );
					$css->add_property( 'margin', flexblocks_get_shorthand_css( $settings['marginTopMobile'], $settings['marginRightMobile'], $settings['marginBottomMobile'], $settings['marginLeftMobile'], $settings['marginUnit'] ) );
					$css->add_property( 'padding', flexblocks_get_shorthand_css( $settings['paddingTopMobile'], $settings['paddingRightMobile'], $settings['paddingBottomMobile'], $settings['paddingLeftMobile'], $settings['paddingUnit'] ) );
					$css->add_property( 'justify-content', 'right' === $settings['alignmentMobile'] ? 'flex-end' : $settings['alignmentMobile'] );

					if ( 'inline' === $settings['iconLocationMobile'] ) {
						$css->add_property( 'align-items', $settings['iconVerticalAlignmentMobile'] );
					}

					if ( 'above' === $settings['iconLocationMobile'] ) {
						$css->add_property( 'flex-direction', 'column' );
					}
				}
			$css->stop_media_query();
		}

		return $css->css_output();
	}
}

add_action( 'wp_head', 'flexblocks_do_frontend_block_css', 200 );
/**
 * Print our CSS for each block.
 *
 * @since 0.1
 */
function flexblocks_do_frontend_block_css() {
	if ( ! function_exists( 'has_blocks' ) ) {
		return;
	}

	$content = '';

	if ( has_blocks( get_the_ID() ) ) {
		global $post;

		if ( ! is_object( $post ) ) {
			return;
		}

		$content = $post->post_content;

		if ( ! function_exists( 'parse_blocks' ) ) {
			return;
		}

		$content = parse_blocks( $content );
	}

	if ( ! $content ) {
		return;
	}

	$general_css = flexblocks_get_dynamic_css( 'general', $content );
	$container_css = flexblocks_get_dynamic_css( 'container', $content );
	$button_container_css = flexblocks_get_dynamic_css( 'button-container', $content );
	$button_css = flexblocks_get_dynamic_css( 'button', $content );
	$headline_css = flexblocks_get_dynamic_css( 'headline', $content );
	$grid_container_css = flexblocks_get_dynamic_css( 'grid', $content );

	echo '<style>';
		echo $general_css . $container_css . $button_container_css . $button_css . $headline_css . $grid_container_css;
	echo '</style>';
}
