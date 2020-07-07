<?php
/**
 * Output our dynamic CSS.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 *  Build the CSS from our block attributes.
 *
 * @since 0.1
 * @param string $content The content we're looking through.
 *
 * @return string The dynamic CSS.
 */
function generateblocks_get_dynamic_css( $content = '' ) {
	if ( ! $content ) {
		return;
	}

	$data = generateblocks_get_block_data( $content );

	if ( empty( $data ) ) {
		return;
	}

	$blocks_exist = false;
	$icon_css_added = false;
	$main_css_data = array();
	$tablet_css_data = array();
	$mobile_css_data = array();

	foreach ( $data as $name => $blockData ) {
		/**
		 * Get our Grid block CSS.
		 *
		 * @since 0.1
		 */
		if ( 'grid' === $name ) {
			if ( empty( $blockData ) ) {
				continue;
			}

			$blocks_exist = true;

			$css = new GenerateBlocks_Dynamic_CSS();
			$tablet_css = new GenerateBlocks_Dynamic_CSS();
			$mobile_css = new GenerateBlocks_Dynamic_CSS();

			$css->set_selector( '.gb-grid-wrapper' );
			$css->add_property( 'display', '-webkit-box' );
			$css->add_property( 'display', '-ms-flexbox' );
			$css->add_property( 'display', 'flex' );
			$css->add_property( '-ms-flex-wrap', 'wrap' );
			$css->add_property( 'flex-wrap', 'wrap' );

			$css->set_selector( '.gb-grid-wrapper > .gb-grid-column > .gb-container' );
			$css->add_property( 'display', '-webkit-box' );
			$css->add_property( 'display', '-ms-flexbox' );
			$css->add_property( 'display', 'flex' );
			$css->add_property( '-ms-flex-direction', 'column' );
			$css->add_property( 'flex-direction', 'column' );
			$css->add_property( 'height', '100%' );

			$css->set_selector( '.gb-grid-column' );
			$css->add_property( 'box-sizing', 'border-box' );

			$css->set_selector( '.gb-grid-wrapper .wp-block-image' );
			$css->add_property( 'margin-bottom', '0px' );

			foreach ( $blockData as $atts ) {
				if ( ! isset( $atts['uniqueId'] ) ) {
					continue;
				}

				$defaults = generateblocks_get_block_defaults();

				$settings = wp_parse_args(
					$atts,
					$defaults['gridContainer']
				);

				$id = $atts['uniqueId'];

				$css->set_selector( '.gb-grid-wrapper-' . $id );
				$css->add_property( '-ms-flex-align', generateblocks_get_vendor_prefix( $settings['verticalAlignment'] ) );
				$css->add_property( 'align-items', $settings['verticalAlignment'] );
				$css->add_property( '-ms-flex-pack', generateblocks_get_vendor_prefix( $settings['horizontalAlignment'] ) );
				$css->add_property( 'justify-content', $settings['horizontalAlignment'] );

				if ( $settings['horizontalGap'] ) {
					$css->add_property( 'margin-left', '-' . $settings['horizontalGap'] . 'px' );
				}

				$css->set_selector( '.gb-grid-wrapper-' . $id . ' > .gb-grid-column' );
				$css->add_property( 'padding-left', $settings['horizontalGap'], 'px' );
				$css->add_property( 'padding-bottom', $settings['verticalGap'], 'px' );

				$tablet_css->set_selector( '.gb-grid-wrapper-' . $id );

				if ( 'inherit' !== $settings['verticalAlignmentTablet'] ) {
					$tablet_css->add_property( '-ms-flex-align', generateblocks_get_vendor_prefix( $settings['verticalAlignmentTablet'] ) );
					$tablet_css->add_property( 'align-items', $settings['verticalAlignmentTablet'] );
				}

				if ( 'inherit' !== $settings['horizontalAlignmentTablet'] ) {
					$tablet_css->add_property( '-ms-flex-pack', generateblocks_get_vendor_prefix( $settings['horizontalAlignmentTablet'] ) );
					$tablet_css->add_property( 'justify-content', $settings['horizontalAlignmentTablet'] );
				}

				if ( $settings['horizontalGapTablet'] ) {
					$tablet_css->add_property( 'margin-left', '-' . $settings['horizontalGapTablet'] . 'px' );
				} elseif ( 0 === $settings['horizontalGapTablet'] ) {
					$tablet_css->add_property( 'margin-left', $settings['horizontalGapTablet'] );
				}

				$tablet_css->set_selector( '.gb-grid-wrapper-' . $id . ' > .gb-grid-column' );
				$tablet_css->add_property( 'padding-left', $settings['horizontalGapTablet'], 'px' );
				$tablet_css->add_property( 'padding-bottom', $settings['verticalGapTablet'], 'px' );

				$mobile_css->set_selector( '.gb-grid-wrapper-' . $id );

				if ( 'inherit' !== $settings['verticalAlignmentMobile'] ) {
					$mobile_css->add_property( '-ms-flex-align', generateblocks_get_vendor_prefix( $settings['verticalAlignmentMobile'] ) );
					$mobile_css->add_property( 'align-items', $settings['verticalAlignmentMobile'] );
				}

				if ( 'inherit' !== $settings['horizontalAlignmentMobile'] ) {
					$mobile_css->add_property( '-ms-flex-pack', generateblocks_get_vendor_prefix( $settings['horizontalAlignmentMobile'] ) );
					$mobile_css->add_property( 'justify-content', $settings['horizontalAlignmentMobile'] );
				}

				if ( $settings['horizontalGapMobile'] ) {
					$mobile_css->add_property( 'margin-left', '-' . $settings['horizontalGapMobile'] . 'px' );
				} elseif ( 0 === $settings['horizontalGapMobile'] ) {
					$mobile_css->add_property( 'margin-left', $settings['horizontalGapMobile'] );
				}

				$mobile_css->set_selector( '.gb-grid-wrapper-' . $id . ' > .gb-grid-column' );
				$mobile_css->add_property( 'padding-left', $settings['horizontalGapMobile'], 'px' );
				$mobile_css->add_property( 'padding-bottom', $settings['verticalGapMobile'], 'px' );

				/**
				 * Do generateblocks_block_css_data hook
				 *
				 * @since 1.0
				 *
				 * @param object $css Our desktop/main CSS data.
				 * @param object $tablet_css Our tablet CSS data.
				 * @param object $mobile_css Our mobile CSS data.
				 * @param string $name The name of our block.
				 * @param array $settings The settings for the current block.
				 */
				do_action( 'generateblocks_block_css_data', $css, $tablet_css, $mobile_css, $name, $settings );
			}

			if ( $css->css_output() ) {
				$main_css_data[] = $css->css_output();
			}

			if ( $tablet_css->css_output() ) {
				$tablet_css_data[] = $tablet_css->css_output();
			}

			if ( $mobile_css->css_output() ) {
				$mobile_css_data[] = $mobile_css->css_output();
			}
		}

		/**
		 * Get our Container block CSS.
		 *
		 * @since 0.1
		 */
		if ( 'container' === $name ) {
			if ( empty( $blockData ) ) {
				continue;
			}

			$blocks_exist = true;

			$css = new GenerateBlocks_Dynamic_CSS();
			$tablet_css = new GenerateBlocks_Dynamic_CSS();
			$mobile_css = new GenerateBlocks_Dynamic_CSS();

			$css->set_selector( '.gb-container .wp-block-image img' );
			$css->add_property( 'vertical-align', 'middle' );

			foreach ( $blockData as $atts ) {
				if ( ! isset( $atts['uniqueId'] ) ) {
					continue;
				}

				$defaults = generateblocks_get_block_defaults();

				$settings = wp_parse_args(
					$atts,
					$defaults['container']
				);

				$id = $atts['uniqueId'];

				$grid_atts = array();

				if ( isset( $atts['gridId'] ) && $atts['gridId'] ) {
					foreach ( $data['grid'] as $grid ) {
						if ( $atts['gridId'] === $grid['uniqueId'] ) {
							$grid_atts = $grid;
							break;
						}
					}
				}

				$grid_settings = wp_parse_args(
					$grid_atts,
					$defaults['gridContainer']
				);

				$fontFamily = $settings['fontFamily'];

				if ( $fontFamily && $settings['fontFamilyFallback'] ) {
					$fontFamily = $fontFamily . ', ' . $settings['fontFamilyFallback'];
				}

				$css->set_selector( '.gb-container.gb-container-' . $id );
				$css->add_property( 'font-family', $fontFamily );
				$css->add_property( 'font-size', $settings['fontSize'], $settings['fontSizeUnit'] );
				$css->add_property( 'font-weight', $settings['fontWeight'] );
				$css->add_property( 'text-transform', $settings['textTransform'] );
				$css->add_property( 'margin', generateblocks_get_shorthand_css( $settings['marginTop'], $settings['marginRight'], $settings['marginBottom'], $settings['marginLeft'], $settings['marginUnit'] ) );

				if ( 'contained' === $settings['outerContainer'] && ! $settings['isGrid'] ) {
					$css->add_property( 'max-width', absint( $settings['containerWidth'] ), 'px' );
					$css->add_property( 'margin-left', 'auto' );
					$css->add_property( 'margin-right', 'auto' );
				}

				$css->add_property( 'background-color', generateblocks_hex2rgba( $settings['backgroundColor'], $settings['backgroundColorOpacity'] ) );
				$css->add_property( 'color', $settings['textColor'] );

				if ( ! isset( $settings['bgOptions']['selector'] ) ) {
					$settings['bgOptions']['selector'] = 'element';
				}

				$background_image = generateblocks_get_background_image_css( $settings );

				if ( $settings['bgImage'] && 'element' === $settings['bgOptions']['selector'] && $background_image ) {
					$css->add_property( 'background-image', $background_image );
					$css->add_property( 'background-repeat', $settings['bgOptions']['repeat'] );
					$css->add_property( 'background-position', $settings['bgOptions']['position'] );
					$css->add_property( 'background-size', $settings['bgOptions']['size'] );
					$css->add_property( 'background-attachment', $settings['bgOptions']['attachment'] );
				} elseif ( $settings['gradient'] && $background_image ) {
					$css->add_property( 'background-image', $background_image );
				}

				if ( ( $settings['bgImage'] && 'pseudo-element' === $settings['bgOptions']['selector'] ) || $settings['zindex'] ) {
					$css->add_property( 'position', 'relative' );
				}

				if ( $settings['bgImage'] && 'pseudo-element' === $settings['bgOptions']['selector'] ) {
					$css->add_property( 'overflow', 'hidden' );
				}

				if ( $settings['zindex'] ) {
					$css->add_property( 'z-index', $settings['zindex'] );
				}

				$css->add_property( 'border-radius', generateblocks_get_shorthand_css( $settings['borderRadiusTopLeft'], $settings['borderRadiusTopRight'], $settings['borderRadiusBottomRight'], $settings['borderRadiusBottomLeft'], $settings['borderRadiusUnit'] ) );
				$css->add_property( 'border-width', generateblocks_get_shorthand_css( $settings['borderSizeTop'], $settings['borderSizeRight'], $settings['borderSizeBottom'], $settings['borderSizeLeft'], 'px' ) );

				if ( $settings['borderSizeTop'] || $settings['borderSizeRight'] || $settings['borderSizeBottom'] || $settings['borderSizeLeft'] ) {
					$css->add_property( 'border-style', 'solid' );
				}

				$css->add_property( 'border-color', generateblocks_hex2rgba( $settings['borderColor'], $settings['borderColorOpacity'] ) );
				$css->add_property( 'min-height', $settings['minHeight'], $settings['minHeightUnit'] );

				// Set flags so we don't duplicate this CSS in media queries.
				$usingMinHeightFlex = false;
				$usingMinHeightInnerWidth = false;

				if ( $settings['minHeight'] && $settings['verticalAlignment'] && ! $settings['isGrid'] ) {
					$css->add_property( 'display', '-webkit-box' );
					$css->add_property( 'display', '-ms-flexbox' );
					$css->add_property( 'display', 'flex' );
					$css->add_property( '-ms-flex-direction', 'row' );
					$css->add_property( 'flex-direction', 'row' );
					$css->add_property( '-ms-flex-align', generateblocks_get_vendor_prefix( $settings['verticalAlignment'] ) );
					$css->add_property( 'align-items', $settings['verticalAlignment'] );

					$usingMinHeightFlex = true;
				}

				$css->add_property( 'text-align', $settings['alignment'] );

				$css->set_selector( '.gb-container.gb-container-' . $id . ':before' );

				if ( $settings['bgImage'] && 'pseudo-element' === $settings['bgOptions']['selector'] ) {
					$css->add_property( 'content', '""' );
					$css->add_property( 'background-image', 'url(' . $settings['bgImage']['image']['url'] . ')' );
					$css->add_property( 'background-repeat', $settings['bgOptions']['repeat'] );
					$css->add_property( 'background-position', $settings['bgOptions']['position'] );
					$css->add_property( 'background-size', $settings['bgOptions']['size'] );
					$css->add_property( 'background-attachment', $settings['bgOptions']['attachment'] );
					$css->add_property( 'z-index', '0' );
					$css->add_property( 'position', 'absolute' );
					$css->add_property( 'top', '0' );
					$css->add_property( 'right', '0' );
					$css->add_property( 'bottom', '0' );
					$css->add_property( 'left', '0' );
					$css->add_property( 'transition', 'inherit' );

					if ( isset( $settings['bgOptions']['opacity'] ) && 1 !== $settings['bgOptions']['opacity'] ) {
						$css->add_property( 'opacity', $settings['bgOptions']['opacity'] );
					}
				}

				$css->set_selector( '.gb-container.gb-container-' . $id . ' > .gb-inside-container' );
				$css->add_property( 'padding', generateblocks_get_shorthand_css( $settings['paddingTop'], $settings['paddingRight'], $settings['paddingBottom'], $settings['paddingLeft'], $settings['paddingUnit'] ) );

				if ( 'contained' === $settings['innerContainer'] && ! $settings['isGrid'] ) {
					$css->add_property( 'max-width', absint( $settings['containerWidth'] ), 'px' );
					$css->add_property( 'margin-left', 'auto' );
					$css->add_property( 'margin-right', 'auto' );
				}

				if ( $usingMinHeightFlex ) {
					$css->add_property( 'width', '100%' );

					$usingMinHeightInnerWidth = true;
				}

				if ( $settings['bgImage'] && 'pseudo-element' === $settings['bgOptions']['selector'] ) {
					$css->add_property( 'z-index', '1' );
					$css->add_property( 'position', 'relative' );
				}

				$css->set_selector( '.gb-container.gb-container-' . $id . ' a, .gb-container.gb-container-' . $id . ' a:visited' );
				$css->add_property( 'color', $settings['linkColor'] );

				$css->set_selector( '.gb-container.gb-container-' . $id . ' a:hover' );
				$css->add_property( 'color', $settings['linkColorHover'] );

				if ( $settings['isGrid'] ) {
					$css->set_selector( '.gb-grid-wrapper > .gb-grid-column-' . $id );
					$css->add_property( 'width', $settings['width'], '%' );
				}

				if ( $settings['removeVerticalGap'] ) {
					$css->set_selector( '.gb-grid-wrapper > div.gb-grid-column-' . $id );
					$css->add_property( 'padding-bottom', '0' );
				}

				$css->set_selector( '.gb-grid-wrapper > .gb-grid-column-' . $id . ' > .gb-container' );
				$css->add_property( '-ms-flex-pack', generateblocks_get_vendor_prefix( $settings['verticalAlignment'] ) );
				$css->add_property( 'justify-content', $settings['verticalAlignment'] );

				$tablet_css->set_selector( '.gb-container.gb-container-' . $id );
				$tablet_css->add_property( 'font-size', $settings['fontSizeTablet'], $settings['fontSizeUnit'] );
				$tablet_css->add_property( 'margin', array( $settings['marginTopTablet'], $settings['marginRightTablet'], $settings['marginBottomTablet'], $settings['marginLeftTablet'] ), $settings['marginUnit'] );
				$tablet_css->add_property( 'border-radius', array( $settings['borderRadiusTopLeftTablet'], $settings['borderRadiusTopRightTablet'], $settings['borderRadiusBottomRightTablet'], $settings['borderRadiusBottomLeftTablet'] ), $settings['borderRadiusUnit'] );
				$tablet_css->add_property( 'border-width', array( $settings['borderSizeTopTablet'], $settings['borderSizeRightTablet'], $settings['borderSizeBottomTablet'], $settings['borderSizeLeftTablet'] ), 'px' );

				if ( $settings['borderSizeTopTablet'] || $settings['borderSizeRightTablet'] || $settings['borderSizeBottomTablet'] || $settings['borderSizeLeftTablet'] ) {
					$tablet_css->add_property( 'border-style', 'solid' );
				}

				$tablet_css->add_property( 'min-height', $settings['minHeightTablet'], $settings['minHeightUnitTablet'] );

				if ( ! $settings['isGrid'] ) {
					if ( ! $usingMinHeightFlex && $settings['minHeightTablet'] && 'inherit' !== $settings['verticalAlignmentTablet'] ) {
						$tablet_css->add_property( 'display', '-webkit-box' );
						$tablet_css->add_property( 'display', '-ms-flexbox' );
						$tablet_css->add_property( 'display', 'flex' );
						$tablet_css->add_property( '-ms-flex-direction', 'row' );
						$tablet_css->add_property( 'flex-direction', 'row' );

						$usingMinHeightFlex = true;
					}

					if ( $usingMinHeightFlex && 'inherit' !== $settings['verticalAlignmentTablet'] ) {
						$tablet_css->add_property( '-ms-flex-align', generateblocks_get_vendor_prefix( $settings['verticalAlignmentTablet'] ) );
						$tablet_css->add_property( 'align-items', $settings['verticalAlignmentTablet'] );
					}
				}

				$tablet_css->add_property( 'text-align', $settings['alignmentTablet'] );

				$tablet_css->set_selector( '.gb-container.gb-container-' . $id . ' > .gb-inside-container' );
				$tablet_css->add_property( 'padding', array( $settings['paddingTopTablet'], $settings['paddingRightTablet'], $settings['paddingBottomTablet'], $settings['paddingLeftTablet'] ), $settings['paddingUnit'] );

				$usingMinHeightInnerWidthBoxSizing = false;

				if ( ! $settings['isGrid'] ) {
					// Needs 100% width if it's a flex item.
					if ( ! $usingMinHeightInnerWidth && $settings['minHeightTablet'] && 'inherit' !== $settings['verticalAlignmentTablet'] ) {
						$tablet_css->add_property( 'width', '100%' );

						$usingMinHeightInnerWidth = true;
					} elseif ( $usingMinHeightInnerWidth ) {
						if ( 'contained' === $settings['innerContainer'] && ! $settings['isGrid'] ) {
							$tablet_css->add_property( 'box-sizing', 'border-box' );

							$usingMinHeightInnerWidthBoxSizing = true;
						}
					}
				}

				$tablet_css->set_selector( '.gb-grid-wrapper > .gb-grid-column-' . $id );
				$tablet_css->add_property( 'width', $settings['widthTablet'], '%' );

				if ( $settings['isGrid'] ) {
					$tablet_css->add_property( '-ms-flex-order', $settings['orderTablet'] );
					$tablet_css->add_property( 'order', $settings['orderTablet'] );
				}

				if ( $settings['removeVerticalGapTablet'] ) {
					if ( ! $settings['removeVerticalGap'] ) {
						$tablet_css->set_selector( '.gb-grid-wrapper > div.gb-grid-column-' . $id );
						$tablet_css->add_property( 'padding-bottom', '0' );
					}
				} elseif ( $settings['removeVerticalGap'] ) {
					// Removed vertical gap on desktop, so we need to add it back here.
					$vertical_gap_added = false;

					if ( ! empty( $grid_settings ) ) {
						$tablet_css->set_selector( '.gb-grid-wrapper > div.gb-grid-column-' . $id );

						if ( isset( $grid_settings['verticalGapTablet'] ) || isset( $grid_settings['verticalGap'] ) ) {
							if ( ! empty( $grid_settings['verticalGapTablet'] ) ) {
								$tablet_css->add_property( 'padding-bottom', $grid_settings['verticalGapTablet'], 'px' );
								$vertical_gap_added = true;
							} elseif ( ! empty( $grid_settings['verticalGap'] ) ) {
								$tablet_css->add_property( 'padding-bottom', $grid_settings['verticalGap'], 'px' );
								$vertical_gap_added = true;
							}
						}
					}
				}

				$tablet_css->set_selector( '.gb-grid-wrapper > .gb-grid-column-' . $id . ' > .gb-container' );

				if ( 'inherit' !== $settings['verticalAlignmentTablet'] ) {
					$tablet_css->add_property( '-ms-flex-pack', generateblocks_get_vendor_prefix( $settings['verticalAlignmentTablet'] ) );
					$tablet_css->add_property( 'justify-content', $settings['verticalAlignmentTablet'] );
				}

				$mobile_css->set_selector( '.gb-container.gb-container-' . $id );
				$mobile_css->add_property( 'font-size', $settings['fontSizeMobile'], $settings['fontSizeUnit'] );
				$mobile_css->add_property( 'margin', array( $settings['marginTopMobile'], $settings['marginRightMobile'], $settings['marginBottomMobile'], $settings['marginLeftMobile'] ), $settings['marginUnit'] );
				$mobile_css->add_property( 'border-radius', array( $settings['borderRadiusTopLeftMobile'], $settings['borderRadiusTopRightMobile'], $settings['borderRadiusBottomRightMobile'], $settings['borderRadiusBottomLeftMobile'] ), $settings['borderRadiusUnit'] );
				$mobile_css->add_property( 'border-width', array( $settings['borderSizeTopMobile'], $settings['borderSizeRightMobile'], $settings['borderSizeBottomMobile'], $settings['borderSizeLeftMobile'] ), 'px' );

				if ( $settings['borderSizeTopMobile'] || $settings['borderSizeRightMobile'] || $settings['borderSizeBottomMobile'] || $settings['borderSizeLeftMobile'] ) {
					$mobile_css->add_property( 'border-style', 'solid' );
				}

				$mobile_css->add_property( 'min-height', $settings['minHeightMobile'], $settings['minHeightUnitMobile'] );

				if ( ! $settings['isGrid'] ) {
					if ( ! $usingMinHeightFlex && $settings['minHeightMobile'] && 'inherit' !== $settings['verticalAlignmentMobile'] ) {
						$mobile_css->add_property( 'display', '-webkit-box' );
						$mobile_css->add_property( 'display', '-ms-flexbox' );
						$mobile_css->add_property( 'display', 'flex' );
						$mobile_css->add_property( '-ms-flex-direction', 'row' );
						$mobile_css->add_property( 'flex-direction', 'row' );

						$usingMinHeightFlex = true;
					}

					if ( $usingMinHeightFlex && 'inherit' !== $settings['verticalAlignmentMobile'] ) {
						$mobile_css->add_property( '-ms-flex-align', generateblocks_get_vendor_prefix( $settings['verticalAlignmentMobile'] ) );
						$mobile_css->add_property( 'align-items', $settings['verticalAlignmentMobile'] );
					}
				}

				$mobile_css->add_property( 'text-align', $settings['alignmentMobile'] );

				$mobile_css->set_selector( '.gb-container.gb-container-' . $id . ' > .gb-inside-container' );
				$mobile_css->add_property( 'padding', array( $settings['paddingTopMobile'], $settings['paddingRightMobile'], $settings['paddingBottomMobile'], $settings['paddingLeftMobile'] ), $settings['paddingUnit'] );

				if ( ! $settings['isGrid'] ) {
					// Needs 100% width if it's a flex item.
					if ( ! $usingMinHeightInnerWidth && $settings['minHeightMobile'] && 'inherit' !== $settings['verticalAlignmentMobile'] ) {
						$mobile_css->add_property( 'width', '100%' );
					} elseif ( $usingMinHeightInnerWidth && ! $usingMinHeightInnerWidthBoxSizing ) {
						if ( 'contained' === $settings['innerContainer'] && ! $settings['isGrid'] ) {
							$mobile_css->add_property( 'box-sizing', 'border-box' );
						}
					}
				}

				$mobile_css->set_selector( '.gb-grid-wrapper > .gb-grid-column-' . $id );

				if ( 100 !== $settings['widthMobile'] ) {
					$mobile_css->add_property( 'width', $settings['widthMobile'], '%' );
				}

				if ( $settings['isGrid'] ) {
					$mobile_css->add_property( '-ms-flex-order', $settings['orderMobile'] );
					$mobile_css->add_property( 'order', $settings['orderMobile'] );
				}

				if ( $settings['removeVerticalGapMobile'] ) {
					if ( ! $settings['removeVerticalGapTablet'] ) {
						$mobile_css->set_selector( '.gb-grid-wrapper > div.gb-grid-column-' . $id );
						$mobile_css->add_property( 'padding-bottom', '0' );
					}
				} elseif ( $settings['removeVerticalGapTablet'] || $settings['removeVerticalGap'] ) {
					// Removed vertical gap on tablet or desktop, so we need to add it back here.
					if ( ! empty( $grid_settings ) ) {
						$mobile_css->set_selector( '.gb-grid-wrapper > div.gb-grid-column-' . $id );

						if ( empty( $vertical_gap_added ) && ( isset( $grid_settings['verticalGapMobile'] ) || isset( $grid_settings['verticalGapTablet'] ) || isset( $grid_settings['verticalGap'] ) ) ) {
							if ( ! empty( $grid_settings['verticalGapMobile'] ) ) {
								$mobile_css->add_property( 'padding-bottom', $grid_settings['verticalGapMobile'], 'px' );
							} elseif ( ! empty( $grid_settings['verticalGapTablet'] ) ) {
								$mobile_css->add_property( 'padding-bottom', $grid_settings['verticalGapTablet'], 'px' );
							} elseif ( ! empty( $grid_settings['verticalGap'] ) ) {
								$mobile_css->add_property( 'padding-bottom', $grid_settings['verticalGap'], 'px' );
							}
						}

						$vertical_gap_added = false;
					}
				}

				$mobile_css->set_selector( '.gb-grid-wrapper > .gb-grid-column-' . $id . ' > .gb-container' );

				if ( 'inherit' !== $settings['verticalAlignmentMobile'] ) {
					$mobile_css->add_property( '-ms-flex-pack', generateblocks_get_vendor_prefix( $settings['verticalAlignmentMobile'] ) );
					$mobile_css->add_property( 'justify-content', $settings['verticalAlignmentMobile'] );
				}

				/**
				 * Do generateblocks_block_css_data hook
				 *
				 * @since 1.0
				 *
				 * @param object $css Our desktop/main CSS data.
				 * @param object $tablet_css Our tablet CSS data.
				 * @param object $mobile_css Our mobile CSS data.
				 * @param string $name The name of our block.
				 * @param array $settings The settings for the current block.
				 */
				do_action( 'generateblocks_block_css_data', $css, $tablet_css, $mobile_css, $name, $settings );
			}

			if ( $css->css_output() ) {
				$main_css_data[] = $css->css_output();
			}

			if ( $tablet_css->css_output() ) {
				$tablet_css_data[] = $tablet_css->css_output();
			}

			if ( $mobile_css->css_output() ) {
				$mobile_css_data[] = $mobile_css->css_output();
			}
		}

		/**
		 * Get our Button Container block CSS.
		 *
		 * @since 0.1
		 */
		if ( 'button-container' === $name ) {
			if ( empty( $blockData ) ) {
				continue;
			}

			$blocks_exist = true;

			$css = new GenerateBlocks_Dynamic_CSS();
			$tablet_css = new GenerateBlocks_Dynamic_CSS();
			$mobile_css = new GenerateBlocks_Dynamic_CSS();

			$css->set_selector( '.gb-button-wrapper' );
			$css->add_property( 'display', 'flex' );
			$css->add_property( 'flex-wrap', 'wrap' );
			$css->add_property( 'align-items', 'flex-start' );
			$css->add_property( 'justify-content', 'flex-start' );
			$css->add_property( 'clear', 'both' );

			foreach ( $blockData as $atts ) {
				if ( ! isset( $atts['uniqueId'] ) ) {
					continue;
				}

				$defaults = generateblocks_get_block_defaults();

				$settings = wp_parse_args(
					$atts,
					$defaults['buttonContainer']
				);

				$id = $atts['uniqueId'];

				$css->set_selector( '.gb-button-wrapper-' . $id );
				$css->add_property( 'margin', generateblocks_get_shorthand_css( $settings['marginTop'], $settings['marginRight'], $settings['marginBottom'], $settings['marginLeft'], $settings['marginUnit'] ) );
				$css->add_property( 'justify-content', generateblocks_get_flexbox_alignment( $settings['alignment'] ) );

				if ( $settings['stack'] ) {
					$css->add_property( '-ms-flex-direction', 'column' );
					$css->add_property( 'flex-direction', 'column' );
					$css->add_property( 'align-items', generateblocks_get_flexbox_alignment( $settings['alignment'] ) );
				}

				if ( $settings['fillHorizontalSpace'] ) {
					$css->set_selector( '.gb-button-wrapper-' . $id . ' > a' );
					$css->add_property( '-webkit-box-flex', '1' );
					$css->add_property( '-ms-flex', '1' );
					$css->add_property( 'flex', '1' );
				}

				if ( $settings['stack'] && $settings['fillHorizontalSpace'] ) {
					$css->add_property( 'width', '100%' );
					$css->add_property( 'box-sizing', 'border-box' );
				}

				$tablet_css->set_selector( '.gb-button-wrapper-' . $id );
				$tablet_css->add_property( 'margin', array( $settings['marginTopTablet'], $settings['marginRightTablet'], $settings['marginBottomTablet'], $settings['marginLeftTablet'] ), $settings['marginUnit'] );
				$tablet_css->add_property( 'justify-content', generateblocks_get_flexbox_alignment( $settings['alignmentTablet'] ) );

				if ( $settings['stackTablet'] ) {
					$tablet_css->add_property( '-ms-flex-direction', 'column' );
					$tablet_css->add_property( 'flex-direction', 'column' );
					$tablet_css->add_property( 'align-items', generateblocks_get_flexbox_alignment( $settings['alignmentTablet'] ) );
				}

				if ( $settings['fillHorizontalSpaceTablet'] ) {
					$tablet_css->set_selector( '.gb-button-wrapper-' . $id . ' > a' );
					$tablet_css->add_property( '-webkit-box-flex', '1' );
					$tablet_css->add_property( '-ms-flex', '1' );
					$tablet_css->add_property( 'flex', '1' );
				}

				if ( $settings['stackTablet'] && $settings['fillHorizontalSpaceTablet'] ) {
					$tablet_css->add_property( 'width', '100%' );
					$tablet_css->add_property( 'box-sizing', 'border-box' );
				}

				$mobile_css->set_selector( '.gb-button-wrapper-' . $id );
				$mobile_css->add_property( 'margin', array( $settings['marginTopMobile'], $settings['marginRightMobile'], $settings['marginBottomMobile'], $settings['marginLeftMobile'] ), $settings['marginUnit'] );
				$mobile_css->add_property( 'justify-content', generateblocks_get_flexbox_alignment( $settings['alignmentMobile'] ) );

				if ( $settings['stackMobile'] ) {
					$mobile_css->add_property( '-ms-flex-direction', 'column' );
					$mobile_css->add_property( 'flex-direction', 'column' );
					$mobile_css->add_property( 'align-items', generateblocks_get_flexbox_alignment( $settings['alignmentMobile'] ) );
				}

				if ( $settings['fillHorizontalSpaceMobile'] ) {
					$mobile_css->set_selector( '.gb-button-wrapper-' . $id . ' > a' );
					$mobile_css->add_property( '-webkit-box-flex', '1' );
					$mobile_css->add_property( '-ms-flex', '1' );
					$mobile_css->add_property( 'flex', '1' );
				}

				if ( $settings['stackMobile'] && $settings['fillHorizontalSpaceMobile'] ) {
					$mobile_css->add_property( 'width', '100%' );
					$mobile_css->add_property( 'box-sizing', 'border-box' );
				}

				/**
				 * Do generateblocks_block_css_data hook
				 *
				 * @since 1.0
				 *
				 * @param object $css Our desktop/main CSS data.
				 * @param object $tablet_css Our tablet CSS data.
				 * @param object $mobile_css Our mobile CSS data.
				 * @param string $name The name of our block.
				 * @param array $settings The settings for the current block.
				 */
				do_action( 'generateblocks_block_css_data', $css, $tablet_css, $mobile_css, $name, $settings );
			}

			if ( $css->css_output() ) {
				$main_css_data[] = $css->css_output();
			}

			if ( $tablet_css->css_output() ) {
				$tablet_css_data[] = $tablet_css->css_output();
			}

			if ( $mobile_css->css_output() ) {
				$mobile_css_data[] = $mobile_css->css_output();
			}
		}

		/**
		 * Get our Button block CSS.
		 *
		 * @since 0.1
		 */
		if ( 'button' === $name ) {
			if ( empty( $blockData ) ) {
				continue;
			}

			$blocks_exist = true;

			$css = new GenerateBlocks_Dynamic_CSS();
			$tablet_css = new GenerateBlocks_Dynamic_CSS();
			$mobile_css = new GenerateBlocks_Dynamic_CSS();

			if ( ! $icon_css_added ) {
				$css->set_selector( '.gb-icon' );
				$css->add_property( 'display', '-webkit-inline-box' );
				$css->add_property( 'display', '-ms-inline-flexbox' );
				$css->add_property( 'display', 'inline-flex' );
				$css->add_property( 'line-height', '0' );

				$css->set_selector( '.gb-icon svg' );
				$css->add_property( 'height', '1em' );
				$css->add_property( 'width', '1em' );
				$css->add_property( 'fill', 'currentColor' );

				$icon_css_added = true;
			}

			$css->set_selector( '.gb-button-wrapper a.gb-button' );
			$css->add_property( 'display', '-webkit-inline-box' );
			$css->add_property( 'display', '-ms-inline-flexbox' );
			$css->add_property( 'display', 'inline-flex' );
			$css->add_property( 'align-items', 'center' );
			$css->add_property( 'justify-content', 'center' );
			$css->add_property( 'text-align', 'center' );
			$css->add_property( 'text-decoration', 'none' );
			$css->add_property( 'transition', '.2s background-color ease-in-out, .2s color ease-in-out, .2s border-color ease-in-out, .2s opacity ease-in-out, .2s box-shadow ease-in-out' );

			$css->set_selector( '.gb-button-wrapper .gb-button .gb-icon' );
			$css->add_property( 'align-items', 'center' );

			foreach ( $blockData as $atts ) {
				if ( ! isset( $atts['uniqueId'] ) ) {
					continue;
				}

				$defaults = generateblocks_get_block_defaults();

				$settings = wp_parse_args(
					$atts,
					$defaults['button']
				);

				$id = $atts['uniqueId'];

				// Back-compatibility for when icon held a value.
				if ( $settings['icon'] ) {
					$settings['hasIcon'] = true;
				}

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

				$css->set_selector( '.gb-button-wrapper a.gb-button-' . $id . ',.gb-button-wrapper a.gb-button-' . $id . ':visited' );
				$css->add_property( 'background-color', generateblocks_hex2rgba( $settings['backgroundColor'], $settings['backgroundColorOpacity'] ) );
				$css->add_property( 'color', $settings['textColor'] );

				if ( $settings['gradient'] ) {
					$css->add_property( 'background-image', 'linear-gradient(' . $settings['gradientDirection'] . 'deg, ' . generateblocks_hex2rgba( $settings['gradientColorOne'], $settings['gradientColorOneOpacity'] ) . $gradientColorStopOneValue . ', ' . generateblocks_hex2rgba( $settings['gradientColorTwo'], $settings['gradientColorTwoOpacity'] ) . $gradientColorStopTwoValue . ')' );
				}

				$css->add_property( 'font-family', $fontFamily );
				$css->add_property( 'font-size', $settings['fontSize'], $settings['fontSizeUnit'] );
				$css->add_property( 'font-weight', $settings['fontWeight'] );
				$css->add_property( 'text-transform', $settings['textTransform'] );
				$css->add_property( 'letter-spacing', $settings['letterSpacing'], 'em' );
				$css->add_property( 'padding', generateblocks_get_shorthand_css( $settings['paddingTop'], $settings['paddingRight'], $settings['paddingBottom'], $settings['paddingLeft'], $settings['paddingUnit'] ) );
				$css->add_property( 'border-radius', generateblocks_get_shorthand_css( $settings['borderRadiusTopLeft'], $settings['borderRadiusTopRight'], $settings['borderRadiusBottomRight'], $settings['borderRadiusBottomLeft'], $settings['borderRadiusUnit'] ) );
				$css->add_property( 'margin', generateblocks_get_shorthand_css( $settings['marginTop'], $settings['marginRight'], $settings['marginBottom'], $settings['marginLeft'], $settings['marginUnit'] ) );
				$css->add_property( 'border-width', generateblocks_get_shorthand_css( $settings['borderSizeTop'], $settings['borderSizeRight'], $settings['borderSizeBottom'], $settings['borderSizeLeft'], 'px' ) );

				if ( $settings['borderSizeTop'] || $settings['borderSizeRight'] || $settings['borderSizeBottom'] || $settings['borderSizeLeft'] ) {
					$css->add_property( 'border-style', 'solid' );
				}

				$css->add_property( 'border-color', generateblocks_hex2rgba( $settings['borderColor'], $settings['borderColorOpacity'] ) );
				$css->add_property( 'text-transform', $settings['textTransform'] );

				if ( $settings['hasIcon'] ) {
					$css->add_property( 'display', '-webkit-inline-box' );
					$css->add_property( 'display', '-ms-inline-flexbox' );
					$css->add_property( 'display', 'inline-flex' );
					$css->add_property( 'align-items', 'center' );
				}

				$css->set_selector( '.gb-button-wrapper a.gb-button-' . $id . ':hover,.gb-button-wrapper a.gb-button-' . $id . ':active,.gb-button-wrapper a.gb-button-' . $id . ':focus' );
				$css->add_property( 'background-color', generateblocks_hex2rgba( $settings['backgroundColorHover'], $settings['backgroundColorHoverOpacity'] ) );
				$css->add_property( 'color', $settings['textColorHover'] );
				$css->add_property( 'border-color', generateblocks_hex2rgba( $settings['borderColorHover'], $settings['borderColorHoverOpacity'] ) );

				if ( $settings['hasIcon'] ) {
					$css->set_selector( 'a.gb-button-' . $id . ' .gb-icon' );
					$css->add_property( 'font-size', $settings['iconSize'], $settings['iconSizeUnit'] );

					if ( ! $settings['removeText'] ) {
						$css->add_property( 'padding', generateblocks_get_shorthand_css( $settings['iconPaddingTop'], $settings['iconPaddingRight'], $settings['iconPaddingBottom'], $settings['iconPaddingLeft'], $settings['iconPaddingUnit'] ) );
					}
				}

				$tablet_css->set_selector( '.gb-button-wrapper a.gb-button-' . $id );
				$tablet_css->add_property( 'font-size', $settings['fontSizeTablet'], $settings['fontSizeUnit'] );
				$tablet_css->add_property( 'letter-spacing', $settings['letterSpacingTablet'], 'em' );
				$tablet_css->add_property( 'padding', array( $settings['paddingTopTablet'], $settings['paddingRightTablet'], $settings['paddingBottomTablet'], $settings['paddingLeftTablet'] ), $settings['paddingUnit'] );
				$tablet_css->add_property( 'border-radius', array( $settings['borderRadiusTopLeftTablet'], $settings['borderRadiusTopRightTablet'], $settings['borderRadiusBottomRightTablet'], $settings['borderRadiusBottomLeftTablet'] ), $settings['borderRadiusUnit'] );
				$tablet_css->add_property( 'margin', array( $settings['marginTopTablet'], $settings['marginRightTablet'], $settings['marginBottomTablet'], $settings['marginLeftTablet'] ), $settings['marginUnit'] );
				$tablet_css->add_property( 'border-width', array( $settings['borderSizeTopTablet'], $settings['borderSizeRightTablet'], $settings['borderSizeBottomTablet'], $settings['borderSizeLeftTablet'] ), 'px' );

				if ( $settings['hasIcon'] ) {
					$tablet_css->set_selector( 'a.gb-button-' . $id . ' .gb-icon' );
					$tablet_css->add_property( 'font-size', $settings['iconSizeTablet'], $settings['iconSizeUnit'] );

					if ( ! $settings['removeText'] ) {
						$tablet_css->add_property( 'padding', array( $settings['iconPaddingTopTablet'], $settings['iconPaddingRightTablet'], $settings['iconPaddingBottomTablet'], $settings['iconPaddingLeftTablet'] ), $settings['iconPaddingUnit'] );
					}
				}

				$mobile_css->set_selector( '.gb-button-wrapper a.gb-button-' . $id );
				$mobile_css->add_property( 'font-size', $settings['fontSizeMobile'], $settings['fontSizeUnit'] );
				$mobile_css->add_property( 'letter-spacing', $settings['letterSpacingMobile'], 'em' );
				$mobile_css->add_property( 'padding', array( $settings['paddingTopMobile'], $settings['paddingRightMobile'], $settings['paddingBottomMobile'], $settings['paddingLeftMobile'] ), $settings['paddingUnit'] );
				$mobile_css->add_property( 'border-radius', array( $settings['borderRadiusTopLeftTablet'], $settings['borderRadiusTopRightTablet'], $settings['borderRadiusBottomRightTablet'], $settings['borderRadiusBottomLeftTablet'] ), $settings['borderRadiusUnit'] );
				$mobile_css->add_property( 'margin', array( $settings['marginTopMobile'], $settings['marginRightMobile'], $settings['marginBottomMobile'], $settings['marginLeftMobile'] ), $settings['marginUnit'] );
				$mobile_css->add_property( 'border-width', array( $settings['borderSizeTopMobile'], $settings['borderSizeRightMobile'], $settings['borderSizeBottomMobile'], $settings['borderSizeLeftMobile'] ), 'px' );

				if ( $settings['hasIcon'] ) {
					$mobile_css->set_selector( 'a.gb-button-' . $id . ' .gb-icon' );
					$mobile_css->add_property( 'font-size', $settings['iconSizeMobile'], $settings['iconSizeUnit'] );

					if ( ! $settings['removeText'] ) {
						$mobile_css->add_property( 'padding', array( $settings['iconPaddingTopMobile'], $settings['iconPaddingRightMobile'], $settings['iconPaddingBottomMobile'], $settings['iconPaddingLeftMobile'] ), $settings['iconPaddingUnit'] );
					}
				}

				/**
				 * Do generateblocks_block_css_data hook
				 *
				 * @since 1.0
				 *
				 * @param object $css Our desktop/main CSS data.
				 * @param object $tablet_css Our tablet CSS data.
				 * @param object $mobile_css Our mobile CSS data.
				 * @param string $name The name of our block.
				 * @param array $settings The settings for the current block.
				 */
				do_action( 'generateblocks_block_css_data', $css, $tablet_css, $mobile_css, $name, $settings );
			}

			if ( $css->css_output() ) {
				$main_css_data[] = $css->css_output();
			}

			if ( $tablet_css->css_output() ) {
				$tablet_css_data[] = $tablet_css->css_output();
			}

			if ( $mobile_css->css_output() ) {
				$mobile_css_data[] = $mobile_css->css_output();
			}
		}

		/**
		 * Get our Headline block CSS.
		 *
		 * @since 0.1
		 */
		if ( 'headline' === $name ) {
			if ( empty( $blockData ) ) {
				continue;
			}

			$blocks_exist = true;

			$css = new GenerateBlocks_Dynamic_CSS();
			$tablet_css = new GenerateBlocks_Dynamic_CSS();
			$mobile_css = new GenerateBlocks_Dynamic_CSS();

			if ( ! $icon_css_added ) {
				$css->set_selector( '.gb-icon' );
				$css->add_property( 'display', '-webkit-inline-box' );
				$css->add_property( 'display', '-ms-inline-flexbox' );
				$css->add_property( 'display', 'inline-flex' );
				$css->add_property( 'line-height', '0' );

				$css->set_selector( '.gb-icon svg' );
				$css->add_property( 'height', '1em' );
				$css->add_property( 'width', '1em' );
				$css->add_property( 'fill', 'currentColor' );

				$icon_css_added = true;
			}

			$css->set_selector( '.gb-highlight' );
			$css->add_property( 'background', 'none' );
			$css->add_property( 'color', 'unset' );

			$css->set_selector( '.gb-headline-wrapper' );
			$css->add_property( 'display', '-ms-flexbox' );
			$css->add_property( 'display', 'flex' );

			$css->set_selector( '.gb-headline-wrapper > .gb-headline' );
			$css->add_property( 'margin', '0' );
			$css->add_property( 'padding', '0' );

			foreach ( $blockData as $atts ) {
				if ( ! isset( $atts['uniqueId'] ) ) {
					continue;
				}

				$defaults = generateblocks_get_block_defaults();

				$settings = wp_parse_args(
					$atts,
					$defaults['headline']
				);

				$id = $atts['uniqueId'];

				// Back-compatibility for when icon held a value.
				if ( $settings['icon'] ) {
					$settings['hasIcon'] = true;
				}

				$fontFamily = $settings['fontFamily'];

				if ( $fontFamily && $settings['fontFamilyFallback'] ) {
					$fontFamily = $fontFamily . ', ' . $settings['fontFamilyFallback'];
				}

				$css->set_selector( '.gb-headline-' . $id );
				$css->add_property( 'font-family', $fontFamily );
				$css->add_property( 'text-align', $settings['alignment'] );

				$css->add_property( 'color', $settings['textColor'] );

				if ( ! $settings['hasIcon'] ) {
					$css->add_property( 'background-color', generateblocks_hex2rgba( $settings['backgroundColor'], $settings['backgroundColorOpacity'] ) );

					if ( $settings['inlineWidth'] ) {
						$css->add_property( 'display', 'inline-block' );
					}

					$css->add_property( 'border-width', generateblocks_get_shorthand_css( $settings['borderSizeTop'], $settings['borderSizeRight'], $settings['borderSizeBottom'], $settings['borderSizeLeft'], 'px' ) );

					if ( $settings['borderSizeTop'] || $settings['borderSizeRight'] || $settings['borderSizeBottom'] || $settings['borderSizeLeft'] ) {
						$css->add_property( 'border-style', 'solid' );
					}

					$css->add_property( 'border-color', generateblocks_hex2rgba( $settings['borderColor'], $settings['borderColorOpacity'] ) );
				}

				$css->add_property( 'font-size', $settings['fontSize'], $settings['fontSizeUnit'] );
				$css->add_property( 'font-weight', $settings['fontWeight'] );
				$css->add_property( 'text-transform', $settings['textTransform'] );
				$css->add_property( 'line-height', $settings['lineHeight'], $settings['lineHeightUnit'] );
				$css->add_property( 'letter-spacing', $settings['letterSpacing'], 'em' );

				if ( ! $settings['hasIcon'] ) {
					$css->add_property( 'padding', generateblocks_get_shorthand_css( $settings['paddingTop'], $settings['paddingRight'], $settings['paddingBottom'], $settings['paddingLeft'], $settings['paddingUnit'] ) );
					$css->add_property( 'margin', generateblocks_get_shorthand_css( $settings['marginTop'], $settings['marginRight'], $settings['marginBottom'], $settings['marginLeft'], $settings['marginUnit'] ) );

					if ( function_exists( 'generate_get_default_fonts' ) && '' === $settings['marginBottom'] ) {
						$defaultBlockStyles = generateblocks_get_default_styles();

						if ( isset( $defaultBlockStyles['headline'][ $settings['element'] ]['marginBottom'] ) ) {
							$css->add_property( 'margin-bottom', $defaultBlockStyles['headline'][ $settings['element'] ]['marginBottom'], $defaultBlockStyles['headline'][ $settings['element'] ]['marginUnit'] );
						}
					}
				}

				$css->set_selector( '.gb-headline-' . $id . ' a, .gb-headline-' . $id . ' a:visited' );
				$css->add_property( 'color', $settings['linkColor'] );

				$css->set_selector( '.gb-headline-' . $id . ' a:hover' );
				$css->add_property( 'color', $settings['linkColorHover'] );

				if ( $settings['hasIcon'] ) {
					$css->set_selector( '.gb-headline-wrapper-' . $id . ' .gb-icon' );

					if ( ! $settings['removeText'] ) {
						$css->add_property( 'padding', generateblocks_get_shorthand_css( $settings['iconPaddingTop'], $settings['iconPaddingRight'], $settings['iconPaddingBottom'], $settings['iconPaddingLeft'], $settings['iconPaddingUnit'] ) );
					}

					$css->add_property( 'color', generateblocks_hex2rgba( $settings['iconColor'], $settings['iconColorOpacity'] ) );

					if ( 'above' === $settings['iconLocation'] ) {
						$css->add_property( 'display', 'inline' );
					}

					$css->set_selector( '.gb-headline-wrapper-' . $id . ' .gb-icon svg' );
					$css->add_property( 'width', $settings['iconSize'], $settings['iconSizeUnit'] );
					$css->add_property( 'height', $settings['iconSize'], $settings['iconSizeUnit'] );

					$css->set_selector( '.gb-headline-wrapper-' . $id );
					$css->add_property( 'padding', generateblocks_get_shorthand_css( $settings['paddingTop'], $settings['paddingRight'], $settings['paddingBottom'], $settings['paddingLeft'], $settings['paddingUnit'] ) );
					$css->add_property( 'margin', generateblocks_get_shorthand_css( $settings['marginTop'], $settings['marginRight'], $settings['marginBottom'], $settings['marginLeft'], $settings['marginUnit'] ) );

					$defaultBlockStyles = generateblocks_get_default_styles();

					if ( '' === $settings['marginBottom'] && ! $settings['removeText'] && isset( $defaultBlockStyles['headline'][ $settings['element'] ]['marginBottom'] ) && is_numeric( $defaultBlockStyles['headline'][ $settings['element'] ]['marginBottom'] ) ) {
						$css->add_property( 'margin-bottom', $defaultBlockStyles['headline'][ $settings['element'] ]['marginBottom'], $defaultBlockStyles['headline'][ $settings['element'] ]['marginUnit'] );
					}

					if ( '' === $settings['fontSize'] && ! $settings['removeText'] && isset( $defaultBlockStyles['headline'][ $settings['element'] ]['fontSize'] ) ) {
						$css->add_property( 'font-size', $defaultBlockStyles['headline'][ $settings['element'] ]['fontSize'], $defaultBlockStyles['headline'][ $settings['element'] ]['fontSizeUnit'] );
					} else {
						$css->add_property( 'font-size', $settings['fontSize'], $settings['fontSizeUnit'] );
					}

					if ( 'above' === $settings['iconLocation'] ) {
						$css->add_property( 'text-align', $settings['alignment'] );
					} else {
						$css->add_property( 'justify-content', generateblocks_get_flexbox_alignment( $settings['alignment'] ) );
					}

					if ( $settings['inlineWidth'] ) {
						$css->add_property( 'display', '-webkit-inline-box' );
						$css->add_property( 'display', '-ms-inline-flexbox' );
						$css->add_property( 'display', 'inline-flex' );
					}

					if ( 'inline' === $settings['iconLocation'] ) {
						$css->add_property( 'align-items', generateblocks_get_flexbox_alignment( $settings['iconVerticalAlignment'] ) );
					}

					$css->add_property( 'background-color', generateblocks_hex2rgba( $settings['backgroundColor'], $settings['backgroundColorOpacity'] ) );
					$css->add_property( 'color', $settings['textColor'] );
					$css->add_property( 'border-width', generateblocks_get_shorthand_css( $settings['borderSizeTop'], $settings['borderSizeRight'], $settings['borderSizeBottom'], $settings['borderSizeLeft'], 'px' ) );

					if ( $settings['borderSizeTop'] || $settings['borderSizeRight'] || $settings['borderSizeBottom'] || $settings['borderSizeLeft'] ) {
						$css->add_property( 'border-style', 'solid' );
					}

					$css->add_property( 'border-color', generateblocks_hex2rgba( $settings['borderColor'], $settings['borderColorOpacity'] ) );

					if ( 'above' === $settings['iconLocation'] ) {
						$css->add_property( '-ms-flex-direction', 'column' );
						$css->add_property( 'flex-direction', 'column' );
					}
				}

				if ( $settings['highlightTextColor'] ) {
					$css->set_selector( '.gb-headline-' . $id . ' .gb-highlight' );
					$css->add_property( 'color', $settings['highlightTextColor'] );
				}

				$tablet_css->set_selector( '.gb-headline-' . $id );
				$tablet_css->add_property( 'text-align', $settings['alignmentTablet'] );
				$tablet_css->add_property( 'font-size', $settings['fontSizeTablet'], $settings['fontSizeUnit'] );
				$tablet_css->add_property( 'line-height', $settings['lineHeightTablet'], $settings['lineHeightUnit'] );
				$tablet_css->add_property( 'letter-spacing', $settings['letterSpacingTablet'], 'em' );

				if ( ! $settings['hasIcon'] ) {
					$tablet_css->add_property( 'margin', array( $settings['marginTopTablet'], $settings['marginRightTablet'], $settings['marginBottomTablet'], $settings['marginLeftTablet'] ), $settings['marginUnit'] );
					$tablet_css->add_property( 'padding', array( $settings['paddingTopTablet'], $settings['paddingRightTablet'], $settings['paddingBottomTablet'], $settings['paddingLeftTablet'] ), $settings['paddingUnit'] );
					$tablet_css->add_property( 'border-width', array( $settings['borderSizeTopTablet'], $settings['borderSizeRightTablet'], $settings['borderSizeBottomTablet'], $settings['borderSizeLeftTablet'] ), 'px' );

					if ( $settings['inlineWidthTablet'] ) {
						$tablet_css->add_property( 'display', '-webkit-inline-box' );
						$tablet_css->add_property( 'display', '-ms-inline-flexbox' );
						$tablet_css->add_property( 'display', 'inline-flex' );
					}
				}

				if ( $settings['hasIcon'] ) {
					$tablet_css->set_selector( '.gb-headline-wrapper-' . $id . ' .gb-icon' );

					if ( ! $settings['removeText'] ) {
						$tablet_css->add_property( 'padding', array( $settings['iconPaddingTopTablet'], $settings['iconPaddingRightTablet'], $settings['iconPaddingBottomTablet'], $settings['iconPaddingLeftTablet'] ), $settings['iconPaddingUnit'] );
					}

					if ( 'above' === $settings['iconLocationTablet'] || ( 'above' === $settings['iconLocation'] && '' == $settings['iconLocationTablet'] ) ) { // phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison
						$tablet_css->add_property( '-ms-flex-item-align', generateblocks_get_vendor_prefix( $settings['alignmentTablet'] ) );
						$tablet_css->add_property( 'align-self', generateblocks_get_flexbox_alignment( $settings['alignmentTablet'] ) );
					}

					$tablet_css->set_selector( '.gb-headline-wrapper-' . $id . ' .gb-icon svg' );
					$tablet_css->add_property( 'width', $settings['iconSizeTablet'], $settings['iconSizeUnit'] );
					$tablet_css->add_property( 'height', $settings['iconSizeTablet'], $settings['iconSizeUnit'] );

					$tablet_css->set_selector( '.gb-headline-wrapper-' . $id );
					$tablet_css->add_property( 'margin', array( $settings['marginTopTablet'], $settings['marginRightTablet'], $settings['marginBottomTablet'], $settings['marginLeftTablet'] ), $settings['marginUnit'] );
					$tablet_css->add_property( 'padding', array( $settings['paddingTopTablet'], $settings['paddingRightTablet'], $settings['paddingBottomTablet'], $settings['paddingLeftTablet'] ), $settings['paddingUnit'] );
					$tablet_css->add_property( 'border-width', array( $settings['borderSizeTopTablet'], $settings['borderSizeRightTablet'], $settings['borderSizeBottomTablet'], $settings['borderSizeLeftTablet'] ), 'px' );
					$tablet_css->add_property( 'justify-content', generateblocks_get_flexbox_alignment( $settings['alignmentTablet'] ) );

					$defaultBlockStyles = generateblocks_get_default_styles();

					if ( '' === $settings['marginBottomTablet'] && ! $settings['removeText'] && isset( $defaultBlockStyles['headline'][ $settings['element'] ]['marginBottomTablet'] ) && is_numeric( $defaultBlockStyles['headline'][ $settings['element'] ]['marginBottomTablet'] ) ) {
						$tablet_css->add_property( 'margin-bottom', $defaultBlockStyles['headline'][ $settings['element'] ]['marginBottomTablet'], $defaultBlockStyles['headline'][ $settings['element'] ]['marginUnit'] );
					}

					if ( '' === $settings['fontSizeTablet'] && ! $settings['removeText'] && isset( $defaultBlockStyles['headline'][ $settings['element'] ]['fontSizeTablet'] ) ) {
						$tablet_css->add_property( 'font-size', $defaultBlockStyles['headline'][ $settings['element'] ]['fontSizeTablet'], $defaultBlockStyles['headline'][ $settings['element'] ]['fontSizeUnit'] );
					} else {
						$tablet_css->add_property( 'font-size', $settings['fontSizeTablet'], $settings['fontSizeUnit'] );
					}

					if ( $settings['inlineWidthTablet'] ) {
						$tablet_css->add_property( 'display', '-webkit-inline-box' );
						$tablet_css->add_property( 'display', '-ms-inline-flexbox' );
						$tablet_css->add_property( 'display', 'inline-flex' );
					}

					if ( 'inline' === $settings['iconLocationTablet'] ) {
						$tablet_css->add_property( 'align-items', generateblocks_get_flexbox_alignment( $settings['iconVerticalAlignmentTablet'] ) );
					}

					if ( 'above' === $settings['iconLocationTablet'] ) {
						$tablet_css->add_property( '-ms-flex-direction', 'column' );
						$tablet_css->add_property( 'flex-direction', 'column' );
					}
				}

				$mobile_css->set_selector( '.gb-headline-' . $id );
				$mobile_css->add_property( 'text-align', $settings['alignmentMobile'] );
				$mobile_css->add_property( 'font-size', $settings['fontSizeMobile'], $settings['fontSizeUnit'] );
				$mobile_css->add_property( 'line-height', $settings['lineHeightMobile'], $settings['lineHeightUnit'] );
				$mobile_css->add_property( 'letter-spacing', $settings['letterSpacingMobile'], 'em' );

				if ( ! $settings['hasIcon'] ) {
					$mobile_css->add_property( 'margin', array( $settings['marginTopMobile'], $settings['marginRightMobile'], $settings['marginBottomMobile'], $settings['marginLeftMobile'] ), $settings['marginUnit'] );
					$mobile_css->add_property( 'padding', array( $settings['paddingTopMobile'], $settings['paddingRightMobile'], $settings['paddingBottomMobile'], $settings['paddingLeftMobile'] ), $settings['paddingUnit'] );
					$mobile_css->add_property( 'border-width', array( $settings['borderSizeTopMobile'], $settings['borderSizeRightMobile'], $settings['borderSizeBottomMobile'], $settings['borderSizeLeftMobile'] ), 'px' );

					if ( $settings['inlineWidthMobile'] ) {
						$mobile_css->add_property( 'display', '-webkit-inline-box' );
						$mobile_css->add_property( 'display', '-ms-inline-flexbox' );
						$mobile_css->add_property( 'display', 'inline-flex' );
					}
				}

				if ( $settings['hasIcon'] ) {
					$mobile_css->set_selector( '.gb-headline-wrapper-' . $id . ' .gb-icon' );

					if ( ! $settings['removeText'] ) {
						$mobile_css->add_property( 'padding', array( $settings['iconPaddingTopMobile'], $settings['iconPaddingRightMobile'], $settings['iconPaddingBottomMobile'], $settings['iconPaddingLeftMobile'] ), $settings['iconPaddingUnit'] );
					}

					if ( 'above' === $settings['iconLocationMobile'] || ( 'above' === $settings['iconLocation'] && '' == $settings['iconLocationMobile'] ) || ( 'above' === $settings['iconLocationTablet'] && '' == $settings['iconLocationMobile'] ) ) { // phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison
						$mobile_css->add_property( '-ms-flex-item-align', generateblocks_get_vendor_prefix( $settings['alignmentMobile'] ) );
						$mobile_css->add_property( 'align-self', generateblocks_get_flexbox_alignment( $settings['alignmentMobile'] ) );
					}

					$mobile_css->set_selector( '.gb-headline-wrapper-' . $id . ' .gb-icon svg' );
					$mobile_css->add_property( 'width', $settings['iconSizeMobile'], $settings['iconSizeUnit'] );
					$mobile_css->add_property( 'height', $settings['iconSizeMobile'], $settings['iconSizeUnit'] );

					$mobile_css->set_selector( '.gb-headline-wrapper-' . $id );
					$mobile_css->add_property( 'margin', array( $settings['marginTopMobile'], $settings['marginRightMobile'], $settings['marginBottomMobile'], $settings['marginLeftMobile'] ), $settings['marginUnit'] );
					$mobile_css->add_property( 'padding', array( $settings['paddingTopMobile'], $settings['paddingRightMobile'], $settings['paddingBottomMobile'], $settings['paddingLeftMobile'] ), $settings['paddingUnit'] );
					$mobile_css->add_property( 'justify-content', generateblocks_get_flexbox_alignment( $settings['alignmentMobile'] ) );

					$defaultBlockStyles = generateblocks_get_default_styles();

					if ( '' === $settings['marginBottomMobile'] && ! $settings['removeText'] && isset( $defaultBlockStyles['headline'][ $settings['element'] ]['marginBottomMobile'] ) && is_numeric( $defaultBlockStyles['headline'][ $settings['element'] ]['marginBottomMobile'] ) ) {
						$mobile_css->add_property( 'margin-bottom', $defaultBlockStyles['headline'][ $settings['element'] ]['marginBottomMobile'], $defaultBlockStyles['headline'][ $settings['element'] ]['marginUnit'] );
					}

					if ( '' === $settings['fontSizeMobile'] && ! $settings['removeText'] && ! empty( $defaultBlockStyles['headline'][ $settings['element'] ]['fontSizeMobile'] ) ) {
						$mobile_css->add_property( 'font-size', $defaultBlockStyles['headline'][ $settings['element'] ]['fontSizeMobile'], $defaultBlockStyles['headline'][ $settings['element'] ]['fontSizeUnit'] );
					} else {
						$mobile_css->add_property( 'font-size', $settings['fontSizeMobile'], $settings['fontSizeUnit'] );
					}

					if ( $settings['inlineWidthMobile'] ) {
						$mobile_css->add_property( 'display', '-webkit-inline-box' );
						$mobile_css->add_property( 'display', '-ms-inline-flexbox' );
						$mobile_css->add_property( 'display', 'inline-flex' );
					}

					if ( 'inline' === $settings['iconLocationMobile'] ) {
						$mobile_css->add_property( 'align-items', generateblocks_get_flexbox_alignment( $settings['iconVerticalAlignmentMobile'] ) );
					}

					if ( 'above' === $settings['iconLocationMobile'] ) {
						$mobile_css->add_property( '-ms-flex-direction', 'column' );
						$mobile_css->add_property( 'flex-direction', 'column' );
					}
				}

				/**
				 * Do generateblocks_block_css_data hook
				 *
				 * @since 1.0
				 *
				 * @param object $css Our desktop/main CSS data.
				 * @param object $tablet_css Our tablet CSS data.
				 * @param object $mobile_css Our mobile CSS data.
				 * @param string $name The name of our block.
				 * @param array $settings The settings for the current block.
				 */
				do_action( 'generateblocks_block_css_data', $css, $tablet_css, $mobile_css, $name, $settings );
			}

			if ( $css->css_output() ) {
				$main_css_data[] = $css->css_output();
			}

			if ( $tablet_css->css_output() ) {
				$tablet_css_data[] = $tablet_css->css_output();
			}

			if ( $mobile_css->css_output() ) {
				$mobile_css_data[] = $mobile_css->css_output();
			}
		}
	}

	if ( ! $blocks_exist ) {
		return false;
	}

	return apply_filters(
		'generateblocks_css_device_data',
		array(
			'main' => $main_css_data,
			'tablet' => $tablet_css_data,
			'mobile' => $mobile_css_data,
		),
		$settings
	);
}

/**
 * Turn our CSS array into plain CSS.
 *
 * @since 1.0
 *
 * @param array $data Our CSS data.
 */
function generateblocks_get_parsed_css( $data ) {
	$output = '';

	foreach ( $data as $device => $selectors ) {
		foreach ( $selectors as $selector => $properties ) {
			if ( ! count( $properties ) ) {
				continue;
			}

			$temporary_output = $selector . '{';
			$elements_added = 0;

			foreach ( $properties as $key => $value ) {
				if ( empty( $value ) ) {
					continue;
				}

				$elements_added++;
				$temporary_output .= $value;
			}

			$temporary_output .= '}';

			if ( $elements_added > 0 ) {
				$output .= $temporary_output;
			}
		}
	}

	return $output;
}

/**
 * Print our CSS for each block.
 *
 * @since 0.1
 */
function generateblocks_get_frontend_block_css() {
	if ( ! function_exists( 'has_blocks' ) ) {
		return;
	}

	$content = generateblocks_get_parsed_content();

	if ( ! $content ) {
		return;
	}

	$data = generateblocks_get_dynamic_css( $content );

	if ( ! $data ) {
		return;
	}

	$css = '';

	$css .= generateblocks_get_parsed_css( $data['main'] );

	if ( ! empty( $data['tablet'] ) ) {
		$css .= sprintf(
			'@media %1$s {%2$s}',
			generateblocks_get_media_query( 'tablet' ),
			generateblocks_get_parsed_css( $data['tablet'] )
		);
	}

	array_unshift(
		$data['mobile'],
		array(
			'.gb-grid-wrapper > .gb-grid-column' => array(
				'width: 100%;',
			),
		)
	);

	if ( ! empty( $data['mobile'] ) ) {
		$css .= sprintf(
			'@media %1$s {%2$s}',
			generateblocks_get_media_query( 'mobile' ),
			generateblocks_get_parsed_css( $data['mobile'] )
		);
	}

	return apply_filters( 'generateblocks_css_output', $css );
}
