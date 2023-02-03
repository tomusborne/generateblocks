<?php
/**
 * Handles the Container block.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Add Container related functions.
 */
class GenerateBlocks_Block_Container {
	/**
	 * Keep track of all blocks of this type on the page.
	 *
	 * @var array $block_ids The current block id.
	 */
	private static $block_ids = [];

	/**
	 * Keep track of CSS we want to output once per block type.
	 *
	 * @var boolean
	 */
	private static $singular_css_added = false;

	/**
	 * Block defaults.
	 */
	public static function defaults() {
		$container_width = generateblocks_get_option( 'container_width' );

		if ( function_exists( 'generate_get_option' ) ) {
			$container_width = generate_get_option( 'container_width' );
		}

		return [
			'tagName' => 'div',
			'isGrid' => false,
			'containerWidth' => $container_width,
			'outerContainer' => 'full',
			'innerContainer' => 'contained',
			'minHeight' => false,
			'minHeightUnit' => 'px',
			'minHeightTablet' => false,
			'minHeightUnitTablet' => 'px',
			'minHeightMobile' => false,
			'minHeightUnitMobile' => 'px',
			'borderColor' => '',
			'borderColorOpacity' => 1,
			'backgroundColor' => '',
			'backgroundColorOpacity' => 1,
			'gradient' => false,
			'gradientDirection' => '',
			'gradientColorOne' => '',
			'gradientColorOneOpacity' => '',
			'gradientColorStopOne' => '',
			'gradientColorTwo' => '',
			'gradientColorTwoOpacity' => '',
			'gradientColorStopTwo' => '',
			'gradientSelector' => 'element',
			'textColor' => '',
			'linkColor' => '',
			'linkColorHover' => '',
			'bgImage' => '',
			'bgOptions' => array(
				'selector' => 'element',
				'opacity' => 1,
				'overlay' => false,
				'position' => 'center center',
				'size' => 'cover',
				'repeat' => 'no-repeat',
				'attachment' => '',
			),
			'bgImageSize' => 'full',
			'bgImageInline' => false,
			'width' => '',
			'widthTablet' => '',
			'widthMobile' => '',
			'autoWidth' => false,
			'autoWidthTablet' => false,
			'autoWidthMobile' => false,
			'flexBasisUnit' => 'px',
			'verticalAlignment' => '',
			'verticalAlignmentTablet' => 'inherit',
			'verticalAlignmentMobile' => 'inherit',
			'innerZindex' => '',
			'removeVerticalGap' => false,
			'removeVerticalGapTablet' => false,
			'removeVerticalGapMobile' => false,
			'alignment' => '',
			'alignmentTablet' => '',
			'alignmentMobile' => '',
			'fontFamily' => '',
			'fontFamilyFallback' => '',
			'googleFont' => false,
			'googleFontVariants' => '',
			'fontWeight' => '',
			'fontSize' => '',
			'fontSizeTablet' => '',
			'fontSizeMobile' => '',
			'fontSizeUnit' => 'px',
			'textTransform' => '',
			'useInnerContainer' => false,
			'variantRole' => '',
		];
	}

	/**
	 * Store our block ID in memory.
	 *
	 * @param string $id The block ID to store.
	 */
	public static function store_block_id( $id ) {
		self::$block_ids[] = $id;
	}

	/**
	 * Check if our block ID exists.
	 *
	 * @param string $id The block ID to store.
	 */
	public static function block_id_exists( $id ) {
		return in_array( $id, (array) self::$block_ids );
	}

	/**
	 * Compile our CSS data based on our block attributes.
	 *
	 * @param array $attributes Our block attributes.
	 */
	public static function get_css_data( $attributes ) {
		$css = new GenerateBlocks_Dynamic_CSS();
		$desktop_css = new GenerateBlocks_Dynamic_CSS();
		$tablet_css = new GenerateBlocks_Dynamic_CSS();
		$tablet_only_css = new GenerateBlocks_Dynamic_CSS();
		$mobile_css = new GenerateBlocks_Dynamic_CSS();
		$css_data = [];

		$defaults = generateblocks_get_block_defaults();

		$settings = wp_parse_args(
			$attributes,
			$defaults['container']
		);

		$id = $attributes['uniqueId'];
		$blockVersion = ! empty( $settings['blockVersion'] ) ? $settings['blockVersion'] : 1;

		// Use legacy settings if needed.
		if ( $blockVersion < 2 ) {
			$settings = GenerateBlocks_Legacy_Attributes::get_settings( '1.4.0', 'container', $settings, $attributes );
		}

		$selector = generateblocks_get_css_selector( 'container', $attributes );
		$use_visited_selector = generateblocks_use_visited_selector( 'container', $attributes );
		$settings['useInnerContainer'] = $blockVersion < 3 || $settings['useInnerContainer'];
		$useInnerContainer = $settings['useInnerContainer'];

		$fontFamily = $settings['fontFamily'];

		if ( $fontFamily && $settings['fontFamilyFallback'] ) {
			$fontFamily = $fontFamily . ', ' . $settings['fontFamilyFallback'];
		}

		if ( ! isset( $settings['bgOptions']['selector'] ) ) {
			$settings['bgOptions']['selector'] = 'element';
		}

		$containerWidth = $settings['containerWidth'];

		if ( isset( $settings['useGlobalStyle'] ) && $settings['useGlobalStyle'] ) {
			if ( (string) $containerWidth === (string) $defaults['container']['containerWidth'] ) {
				$containerWidth = '';
			}
		}

		$backgroundImageValue = generateblocks_get_background_image_css( 'image', $settings );
		$gradientValue = generateblocks_get_background_image_css( 'gradient', $settings );
		$hasBgImage = generateblocks_has_background_image( $settings );

		// Only add this CSS once.
		if ( ! self::$singular_css_added ) {
			$css->set_selector( '.gb-container .wp-block-image img' );
			$css->add_property( 'vertical-align', 'middle' );

			$css->set_selector( '.gb-container .gb-shape' );
			$css->add_property( 'position', 'absolute' );
			$css->add_property( 'overflow', 'hidden' );
			$css->add_property( 'pointer-events', 'none' );
			$css->add_property( 'line-height', '0' );

			$css->set_selector( '.gb-container .gb-shape svg' );
			$css->add_property( 'fill', 'currentColor' );

			do_action(
				'generateblocks_block_one_time_css_data',
				'container',
				$settings,
				$css
			);

			self::$singular_css_added = true;
		}

		/**
		 * Main Container selector.
		 *
		 * Example: .gb-container-{ $uniqueId }
		 */
		$css->set_selector( $selector );
		generateblocks_add_sizing_css( $css, $settings );
		generateblocks_add_layout_css( $css, $settings );
		generateblocks_add_flex_child_css( $css, $settings );
		$css->add_property( 'font-family', $fontFamily );
		$css->add_property( 'font-size', $settings['fontSize'], $settings['fontSizeUnit'] );
		$css->add_property( 'font-weight', $settings['fontWeight'] );
		$css->add_property( 'text-transform', $settings['textTransform'] );
		$css->add_property( 'margin', array( $settings['marginTop'], $settings['marginRight'], $settings['marginBottom'], $settings['marginLeft'] ), $settings['marginUnit'] );
		$css->add_property( 'background-color', generateblocks_hex2rgba( $settings['backgroundColor'], $settings['backgroundColorOpacity'] ) );
		$css->add_property( 'color', $settings['textColor'] );
		$css->add_property( 'border-radius', array( $settings['borderRadiusTopLeft'], $settings['borderRadiusTopRight'], $settings['borderRadiusBottomRight'], $settings['borderRadiusBottomLeft'] ), $settings['borderRadiusUnit'] );
		$css->add_property( 'border-width', array( $settings['borderSizeTop'], $settings['borderSizeRight'], $settings['borderSizeBottom'], $settings['borderSizeLeft'] ), 'px' );
		$css->add_property( 'border-color', generateblocks_hex2rgba( $settings['borderColor'], $settings['borderColorOpacity'] ) );
		$css->add_property( 'text-align', $settings['alignment'] );

		if ( ! $useInnerContainer ) {
			$css->add_property( 'padding', array( $settings['paddingTop'], $settings['paddingRight'], $settings['paddingBottom'], $settings['paddingLeft'] ), $settings['paddingUnit'] );
		}

		if ( $hasBgImage && 'element' === $settings['bgOptions']['selector'] && $backgroundImageValue ) {
			if ( ! $settings['bgImageInline'] || ( $settings['bgImageInline'] && 'element' !== $settings['bgOptions']['selector'] ) ) {
				$css->add_property( 'background-image', $backgroundImageValue );
			}

			$css->add_property( 'background-repeat', $settings['bgOptions']['repeat'] );
			$css->add_property( 'background-position', $settings['bgOptions']['position'] );
			$css->add_property( 'background-size', $settings['bgOptions']['size'] );
			$css->add_property( 'background-attachment', $settings['bgOptions']['attachment'] );
		} elseif ( $settings['gradient'] && 'element' === $settings['gradientSelector'] ) {
			$css->add_property( 'background-image', $gradientValue );
		}

		if ( $useInnerContainer ) {
			if (
				( $hasBgImage && 'pseudo-element' === $settings['bgOptions']['selector'] ) ||
				$settings['zindex'] ||
				( $settings['gradient'] && 'pseudo-element' === $settings['gradientSelector'] )
			) {
				$css->add_property( 'position', 'relative' );
			}

			if (
				( $hasBgImage && 'pseudo-element' === $settings['bgOptions']['selector'] ) ||
				( $settings['gradient'] && 'pseudo-element' === $settings['gradientSelector'] )
			) {
				$css->add_property( 'overflow', 'hidden' );
			}
		}

		if ( $blockVersion < 3 ) {
			$css->add_property( 'min-height', $settings['minHeight'], $settings['minHeightUnit'] );
		}

		// Set flags so we don't duplicate this CSS in media queries.
		$usingMinHeightFlex = false;
		$usingMinHeightInnerWidth = false;

		if ( $useInnerContainer ) {
			if ( $settings['zindex'] ) {
				$css->add_property( 'z-index', $settings['zindex'] );
			}

			if ( 'contained' === $settings['outerContainer'] && ! $settings['isGrid'] ) {
				if ( ! empty( $containerWidth ) ) {
					$css->add_property( 'max-width', absint( $containerWidth ), 'px' );
					$css->add_property( 'margin-left', 'auto' );
					$css->add_property( 'margin-right', 'auto' );
				}
			}

			$minHeight = $blockVersion < 3 ? $settings['minHeight'] : generateblocks_get_array_attribute_value( 'minHeight', $settings['sizing'] );

			if ( $minHeight && $settings['verticalAlignment'] && ! $settings['isGrid'] ) {
				$css->add_property( 'display', 'flex' );
				$css->add_property( 'flex-direction', 'row' );
				$css->add_property( 'align-items', $settings['verticalAlignment'] );

				$usingMinHeightFlex = true;
			}
		}

		$innerZIndex = $settings['innerZindex'];

		/**
		 * Container before pseudo selector.
		 *
		 * Example: .gb-container-{ $uniqueId }:before
		 */
		$css->set_selector( $selector . ':before' );

		if ( $hasBgImage && 'pseudo-element' === $settings['bgOptions']['selector'] ) {
			$css->add_property( 'content', '""' );
			$css->add_property( 'background-image', $backgroundImageValue );
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
			$css->add_property( 'border-radius', array( $settings['borderRadiusTopLeft'], $settings['borderRadiusTopRight'], $settings['borderRadiusBottomRight'], $settings['borderRadiusBottomLeft'] ), $settings['borderRadiusUnit'] );
			$css->add_property( 'pointer-events', 'none' );

			if ( isset( $settings['bgOptions']['opacity'] ) && 1 !== $settings['bgOptions']['opacity'] ) {
				$css->add_property( 'opacity', $settings['bgOptions']['opacity'] );
			}

			if ( $blockVersion < 2 && ! $innerZIndex ) {
				$innerZIndex = 1;
			}
		}

		/**
		 * Container after pseudo selector.
		 *
		 * Example: .gb-container-{ $uniqueId }:after
		 */
		if ( $settings['gradient'] && 'pseudo-element' === $settings['gradientSelector'] ) {
			$css->set_selector( $selector . ':after' );
			$css->add_property( 'content', '""' );
			$css->add_property( 'background-image', $gradientValue );
			$css->add_property( 'z-index', '0' );
			$css->add_property( 'position', 'absolute' );
			$css->add_property( 'top', '0' );
			$css->add_property( 'right', '0' );
			$css->add_property( 'bottom', '0' );
			$css->add_property( 'left', '0' );
			$css->add_property( 'pointer-events', 'none' );

			if ( $blockVersion < 2 && ! $innerZIndex ) {
				$innerZIndex = 1;
			}
		}

		/**
		 * Legacy inner Container selector.
		 *
		 * Example: .gb-container-{ $uniqueId } > .gb-inside-container
		 */
		if ( $useInnerContainer ) {
			$css->set_selector( $selector . ' > .gb-inside-container' );
			$css->add_property( 'padding', array( $settings['paddingTop'], $settings['paddingRight'], $settings['paddingBottom'], $settings['paddingLeft'] ), $settings['paddingUnit'] );

			if ( 'contained' === $settings['innerContainer'] && ! $settings['isGrid'] ) {
				if ( ! empty( $containerWidth ) ) {
					$css->add_property( 'max-width', absint( $containerWidth ), 'px' );
					$css->add_property( 'margin-left', 'auto' );
					$css->add_property( 'margin-right', 'auto' );
				}
			}

			if ( $usingMinHeightFlex ) {
				$css->add_property( 'width', '100%' );

				$usingMinHeightInnerWidth = true;
			}

			if ( $innerZIndex || 0 === $innerZIndex ) {
				$css->add_property( 'z-index', $innerZIndex );
				$css->add_property( 'position', 'relative' );
			}
		}

		/**
		 * Container links.
		 *
		 * Example: .gb-container-{ $uniqueId } a
		 */
		$visited_selector = $use_visited_selector
			? ', ' . $selector . ' a:visited'
			: '';

		$css->set_selector( $selector . ' a' . $visited_selector );
		$css->add_property( 'color', $settings['linkColor'] );

		$css->set_selector( $selector . ' a:hover' );
		$css->add_property( 'color', $settings['linkColorHover'] );

		/**
		 * Grid item selector.
		 *
		 * Example: .gb-grid-wrapper > .gb-grid-column-{ $uniqueId }
		 */
		if ( $settings['isGrid'] ) {
			$css->set_selector( '.gb-grid-wrapper > .gb-grid-column-' . $id );

			if ( $blockVersion < 3 ) {
				$css->add_property( 'width', $settings['width'], '%' );
			} else {
				$css->add_property( 'width', generateblocks_get_array_attribute_value( 'width', $settings['sizing'] ) );
			}

			$css->add_property( 'flex-grow', $settings['flexGrow'] );
			$css->add_property( 'flex-shrink', $settings['flexShrink'] );

			if ( is_numeric( $settings['flexBasis'] ) && $blockVersion < 3 ) {
				$css->add_property( 'flex-basis', $settings['flexBasis'], $settings['flexBasisUnit'] );
			} else {
				$css->add_property( 'flex-basis', $settings['flexBasis'] );
			}

			if ( $settings['isGrid'] ) {
				$css->add_property( 'order', $settings['order'] );
			}
		}

		/**
		 * Grid item selector with tag name.
		 *
		 * This was used for the removeVerticalGap option which was deprecated
		 * in version 3 of the Grid block.
		 *
		 * Example: .gb-grid-wrapper > div.gb-grid-column-{ $uniqueId }
		 */
		if ( $settings['removeVerticalGap'] ) {
			$desktop_css->set_selector( '.gb-grid-wrapper > div.gb-grid-column-' . $id );
			$desktop_css->add_property( 'padding-bottom', '0' );
		}

		/**
		 * Grid item Container selector.
		 *
		 * Example: .gb-grid-wrapper > .gb-grid-column-{ $uniqueId } > .gb-container
		 */
		if ( $useInnerContainer ) {
			$css->set_selector( '.gb-grid-wrapper > .gb-grid-column-' . $id . ' > .gb-container' );
			$css->add_property( 'justify-content', $settings['verticalAlignment'] );
			$css->add_property( 'display', 'flex' );
			$css->add_property( 'flex-direction', 'column' );
			$css->add_property( 'height', '100%' );
		}

		/**
		 * Container selector for shapes.
		 *
		 * Example: .gb-container-{ $uniqueId }
		 */
		if ( ! empty( $settings['shapeDividers'] ) ) {
			$css->set_selector( $selector );

			if ( $useInnerContainer ) {
				$css->add_property( 'position', 'relative' );
			}

			$default_styles = generateblocks_get_default_styles();

			foreach ( (array) $settings['shapeDividers'] as $index => $options ) {
				$shapeNumber = $index + 1;

				$shapeOptions = wp_parse_args(
					$options,
					$default_styles['container']['shapeDividers']
				);

				$shapeTransforms = array();

				if ( 'top' === $shapeOptions['location'] ) {
					$shapeTransforms[] = 'scaleY(-1)';
				}

				if ( $shapeOptions['flipHorizontally'] ) {
					$shapeTransforms[] = 'scaleX(-1)';
				}

				$css->set_selector( $selector . ' > .gb-shapes .gb-shape-' . $shapeNumber );
				$css->add_property( 'color', generateblocks_hex2rgba( $shapeOptions['color'], $shapeOptions['colorOpacity'] ) );
				$css->add_property( 'z-index', $shapeOptions['zindex'] );

				if ( 'top' === $shapeOptions['location'] || 'bottom' === $shapeOptions['location'] ) {
					$css->add_property( 'left', '0' );
					$css->add_property( 'right', '0' );
				}

				if ( 'bottom' === $shapeOptions['location'] ) {
					$css->add_property( 'bottom', '-1px' );
				}

				if ( 'top' === $shapeOptions['location'] ) {
					$css->add_property( 'top', '-1px' );
				}

				if ( ! empty( $shapeTransforms ) ) {
					$css->add_property( 'transform', implode( ' ', $shapeTransforms ) );
				}

				$shapeWidth = $shapeOptions['width'] . '%';

				if ( 100 === (int) $shapeOptions['width'] ) {
					$shapeWidth = 'calc(' . $shapeWidth . ' + 1.3px)';
				}

				$css->set_selector( $selector . ' > .gb-shapes .gb-shape-' . $shapeNumber . ' svg' );
				$css->add_property( 'height', $shapeOptions['height'], 'px' );
				$css->add_property( 'width', $shapeWidth );

				if ( 'top' === $shapeOptions['location'] || 'bottom' === $shapeOptions['location'] ) {
					$css->add_property( 'position', 'relative' );
					$css->add_property( 'left', '50%' );
					$css->add_property( 'transform', 'translateX(-50%)' );
					$css->add_property( 'min-width', '100%' );
				}
			}
		}

		/**
		 * Main Container selector for tablet.
		 *
		 * Example: .gb-container-{ $uniqueId }
		 */
		$tablet_css->set_selector( $selector );
		generateblocks_add_sizing_css( $tablet_css, $settings, 'Tablet' );
		generateblocks_add_layout_css( $tablet_css, $settings, 'Tablet' );
		generateblocks_add_flex_child_css( $tablet_css, $settings, 'Tablet' );
		$tablet_css->add_property( 'font-size', $settings['fontSizeTablet'], $settings['fontSizeUnit'] );
		$tablet_css->add_property( 'margin', array( $settings['marginTopTablet'], $settings['marginRightTablet'], $settings['marginBottomTablet'], $settings['marginLeftTablet'] ), $settings['marginUnit'] );
		$tablet_css->add_property( 'border-radius', array( $settings['borderRadiusTopLeftTablet'], $settings['borderRadiusTopRightTablet'], $settings['borderRadiusBottomRightTablet'], $settings['borderRadiusBottomLeftTablet'] ), $settings['borderRadiusUnit'] );
		$tablet_css->add_property( 'border-width', array( $settings['borderSizeTopTablet'], $settings['borderSizeRightTablet'], $settings['borderSizeBottomTablet'], $settings['borderSizeLeftTablet'] ), 'px' );
		$tablet_css->add_property( 'text-align', $settings['alignmentTablet'] );

		if ( $blockVersion < 3 ) {
			$tablet_css->add_property( 'min-height', $settings['minHeightTablet'], $settings['minHeightUnitTablet'] );
		}

		if ( ! $useInnerContainer ) {
			$tablet_css->add_property( 'padding', array( $settings['paddingTopTablet'], $settings['paddingRightTablet'], $settings['paddingBottomTablet'], $settings['paddingLeftTablet'] ), $settings['paddingUnit'] );
		}

		if ( $useInnerContainer ) {
			// Need to check if we're using minHeightTablet in two places below.
			$minHeightTablet = $blockVersion < 3 ? $settings['minHeightTablet'] : generateblocks_get_array_attribute_value( 'minHeightTablet', $settings['sizing'] );

			if ( ! $settings['isGrid'] ) {
				if ( ! $usingMinHeightFlex && $minHeightTablet && 'inherit' !== $settings['verticalAlignmentTablet'] ) {
					$tablet_css->add_property( 'display', 'flex' );
					$tablet_css->add_property( 'flex-direction', 'row' );

					$usingMinHeightFlex = true;
				}

				if ( $usingMinHeightFlex && 'inherit' !== $settings['verticalAlignmentTablet'] ) {
					$tablet_css->add_property( 'align-items', $settings['verticalAlignmentTablet'] );
				}
			}

			/**
			 * Legacy inner Container selector for tablet.
			 *
			 * Example: .gb-container-{ $uniqueId } > .gb-inside-container
			 */
			$tablet_css->set_selector( $selector . ' > .gb-inside-container' );
			$tablet_css->add_property( 'padding', array( $settings['paddingTopTablet'], $settings['paddingRightTablet'], $settings['paddingBottomTablet'], $settings['paddingLeftTablet'] ), $settings['paddingUnit'] );

			$usingMinHeightInnerWidthBoxSizing = false;

			if ( ! $settings['isGrid'] ) {
				// Needs 100% width if it's a flex item.
				if ( ! $usingMinHeightInnerWidth && $minHeightTablet && 'inherit' !== $settings['verticalAlignmentTablet'] ) {
					$tablet_css->add_property( 'width', '100%' );

					$usingMinHeightInnerWidth = true;
				} elseif ( $usingMinHeightInnerWidth ) {
					if ( 'contained' === $settings['innerContainer'] && ! $settings['isGrid'] ) {
						$tablet_css->add_property( 'box-sizing', 'border-box' );

						$usingMinHeightInnerWidthBoxSizing = true;
					}
				}
			}
		}

		/**
		 * Grid item selector for tablet.
		 *
		 * Example: .gb-grid-wrapper > .gb-grid-column-{ $uniqueId }
		 */
		$tablet_css->set_selector( '.gb-grid-wrapper > .gb-grid-column-' . $id );

		if ( $blockVersion < 3 ) {
			if ( ! $settings['autoWidthTablet'] ) {
				$tablet_css->add_property( 'width', $settings['widthTablet'], '%' );
			} else {
				$tablet_css->add_property( 'width', 'auto' );
			}
		} else {
			$tablet_css->add_property( 'width', generateblocks_get_array_attribute_value( 'widthTablet', $settings['sizing'] ) );
		}

		$tablet_css->add_property( 'flex-grow', $settings['flexGrowTablet'] );
		$tablet_css->add_property( 'flex-shrink', $settings['flexShrinkTablet'] );

		if ( is_numeric( $settings['flexBasisTablet'] ) ) {
			$tablet_css->add_property( 'flex-basis', $settings['flexBasisTablet'], $settings['flexBasisUnit'] );
		} else {
			$tablet_css->add_property( 'flex-basis', $settings['flexBasisTablet'] );
		}

		if ( $settings['isGrid'] ) {
			$tablet_css->add_property( 'order', $settings['orderTablet'] );
		}

		/**
		 * Grid item selector with tag name for tablet.
		 *
		 * This was used for the removeVerticalGap option which was deprecated
		 * in version 3 of the Grid block.
		 *
		 * Example: .gb-grid-wrapper > div.gb-grid-column-{ $uniqueId }
		 */
		if ( $settings['removeVerticalGapTablet'] ) {
			$tablet_only_css->set_selector( '.gb-grid-wrapper > div.gb-grid-column-' . $id );
			$tablet_only_css->add_property( 'padding-bottom', '0' );
		}

		/**
		 * Grid item Container selector for tablet.
		 *
		 * Example: .gb-grid-wrapper > .gb-grid-column-{ $uniqueId } > .gb-container
		 */
		if ( $useInnerContainer ) {
			$tablet_css->set_selector( '.gb-grid-wrapper > .gb-grid-column-' . $id . ' > .gb-container' );

			if ( 'inherit' !== $settings['verticalAlignmentTablet'] ) {
				$tablet_css->add_property( 'justify-content', $settings['verticalAlignmentTablet'] );
			}
		}

		/**
		 * Container before pseudo selector for tablet.
		 *
		 * Example: .gb-container-{ $uniqueId }:before
		 */
		if ( $hasBgImage && 'pseudo-element' === $settings['bgOptions']['selector'] ) {
			$tablet_css->set_selector( $selector . ':before' );
			$tablet_css->add_property( 'border-radius', array( $settings['borderRadiusTopLeftTablet'], $settings['borderRadiusTopRightTablet'], $settings['borderRadiusBottomRightTablet'], $settings['borderRadiusBottomLeftTablet'] ), $settings['borderRadiusUnit'] );
		}

		/**
		 * Shape selector for tablets.
		 *
		 * Example: .gb-container-{ $uniqueId } > .gb-shapes .gb-shape-{ $shapeNumber } svg
		 */
		if ( ! empty( $settings['shapeDividers'] ) ) {
			$default_styles = generateblocks_get_default_styles();

			foreach ( (array) $settings['shapeDividers'] as $index => $options ) {
				$shapeNumber = $index + 1;

				$shapeOptions = wp_parse_args(
					$options,
					$default_styles['container']['shapeDividers']
				);

				$tablet_css->set_selector( $selector . ' > .gb-shapes .gb-shape-' . $shapeNumber . ' svg' );
				$tablet_css->add_property( 'height', $shapeOptions['heightTablet'], 'px' );
				$tablet_css->add_property( 'width', $shapeOptions['widthTablet'], '%' );
			}
		}

		/**
		 * Main Container selector for mobile.
		 *
		 * Example: .gb-container-{ $uniqueId }
		 */
		$mobile_css->set_selector( $selector );
		generateblocks_add_sizing_css( $mobile_css, $settings, 'Mobile' );
		generateblocks_add_layout_css( $mobile_css, $settings, 'Mobile' );
		generateblocks_add_flex_child_css( $mobile_css, $settings, 'Mobile' );
		$mobile_css->add_property( 'font-size', $settings['fontSizeMobile'], $settings['fontSizeUnit'] );
		$mobile_css->add_property( 'margin', array( $settings['marginTopMobile'], $settings['marginRightMobile'], $settings['marginBottomMobile'], $settings['marginLeftMobile'] ), $settings['marginUnit'] );
		$mobile_css->add_property( 'border-radius', array( $settings['borderRadiusTopLeftMobile'], $settings['borderRadiusTopRightMobile'], $settings['borderRadiusBottomRightMobile'], $settings['borderRadiusBottomLeftMobile'] ), $settings['borderRadiusUnit'] );
		$mobile_css->add_property( 'border-width', array( $settings['borderSizeTopMobile'], $settings['borderSizeRightMobile'], $settings['borderSizeBottomMobile'], $settings['borderSizeLeftMobile'] ), 'px' );
		$mobile_css->add_property( 'text-align', $settings['alignmentMobile'] );

		if ( ! $useInnerContainer ) {
			$mobile_css->add_property( 'padding', array( $settings['paddingTopMobile'], $settings['paddingRightMobile'], $settings['paddingBottomMobile'], $settings['paddingLeftMobile'] ), $settings['paddingUnit'] );
		}

		if ( $blockVersion < 3 ) {
			$mobile_css->add_property( 'min-height', $settings['minHeightMobile'], $settings['minHeightUnitMobile'] );
		}

		if ( $useInnerContainer ) {
			// Need to check if we're using minHeightMobile in two places below.
			$minHeightMobile = $blockVersion < 3 ? $settings['minHeightMobile'] : generateblocks_get_array_attribute_value( 'minHeightMobile', $settings['sizing'] );

			if ( ! $settings['isGrid'] ) {
				if ( ! $usingMinHeightFlex && $minHeightMobile && 'inherit' !== $settings['verticalAlignmentMobile'] ) {
					$mobile_css->add_property( 'display', 'flex' );
					$mobile_css->add_property( 'flex-direction', 'row' );

					$usingMinHeightFlex = true;
				}

				if ( $usingMinHeightFlex && 'inherit' !== $settings['verticalAlignmentMobile'] ) {
					$mobile_css->add_property( 'align-items', $settings['verticalAlignmentMobile'] );
				}
			}

			/**
			 * Legacy inner Container selector for mobile.
			 *
			 * Example: .gb-container-{ $uniqueId } > .gb-inside-container
			 */
			$mobile_css->set_selector( $selector . ' > .gb-inside-container' );
			$mobile_css->add_property( 'padding', array( $settings['paddingTopMobile'], $settings['paddingRightMobile'], $settings['paddingBottomMobile'], $settings['paddingLeftMobile'] ), $settings['paddingUnit'] );

			if ( ! $settings['isGrid'] ) {
				// Needs 100% width if it's a flex item.
				if ( ! $usingMinHeightInnerWidth && $minHeightMobile && 'inherit' !== $settings['verticalAlignmentMobile'] ) {
					$mobile_css->add_property( 'width', '100%' );
				} elseif ( $usingMinHeightInnerWidth && ! $usingMinHeightInnerWidthBoxSizing ) {
					if ( 'contained' === $settings['innerContainer'] && ! $settings['isGrid'] ) {
						$mobile_css->add_property( 'box-sizing', 'border-box' );
					}
				}
			}
		}

		/**
		 * Grid item selector for tablet.
		 *
		 * Example: .gb-grid-wrapper > .gb-grid-column-{ $uniqueId }
		 */
		$mobile_css->set_selector( '.gb-grid-wrapper > .gb-grid-column-' . $id );

		if ( $blockVersion < 3 ) {
			if ( ! $settings['autoWidthMobile'] ) {
				$mobile_css->add_property( 'width', $settings['widthMobile'], '%' );
			}

			if ( $settings['autoWidthMobile'] ) {
				$mobile_css->add_property( 'width', 'auto' );
			}
		} else {
			$mobile_css->add_property( 'width', generateblocks_get_array_attribute_value( 'widthMobile', $settings['sizing'] ) );
		}

		$mobile_css->add_property( 'flex-grow', $settings['flexGrowMobile'] );
		$mobile_css->add_property( 'flex-shrink', $settings['flexShrinkMobile'] );

		if ( is_numeric( $settings['flexBasisMobile'] ) ) {
			$mobile_css->add_property( 'flex-basis', $settings['flexBasisMobile'], $settings['flexBasisUnit'] );
		} else {
			$mobile_css->add_property( 'flex-basis', $settings['flexBasisMobile'] );
		}

		if ( $settings['isGrid'] ) {
			$mobile_css->add_property( 'order', $settings['orderMobile'] );
		}

		/**
		 * Grid item selector with tag name for mobile.
		 *
		 * This was used for the removeVerticalGap option which was deprecated
		 * in version 3 of the Grid block.
		 *
		 * Example: .gb-grid-wrapper > div.gb-grid-column-{ $uniqueId }
		 */
		if ( $settings['removeVerticalGapMobile'] ) {
			$mobile_css->set_selector( '.gb-grid-wrapper > div.gb-grid-column-' . $id );
			$mobile_css->add_property( 'padding-bottom', '0' );
		}

		/**
		 * Grid item Container selector for mobile.
		 *
		 * Example: .gb-grid-wrapper > .gb-grid-column-{ $uniqueId } > .gb-container
		 */
		if ( $useInnerContainer ) {
			$mobile_css->set_selector( '.gb-grid-wrapper > .gb-grid-column-' . $id . ' > .gb-container' );

			if ( 'inherit' !== $settings['verticalAlignmentMobile'] ) {
				$mobile_css->add_property( 'justify-content', $settings['verticalAlignmentMobile'] );
			}
		}

		/**
		 * Container before pseudo selector for mobile.
		 *
		 * Example: .gb-container-{ $uniqueId }:before
		 */
		if ( $hasBgImage && 'pseudo-element' === $settings['bgOptions']['selector'] ) {
			$mobile_css->set_selector( $selector . ':before' );
			$mobile_css->add_property( 'border-radius', array( $settings['borderRadiusTopLeftMobile'], $settings['borderRadiusTopRightMobile'], $settings['borderRadiusBottomRightMobile'], $settings['borderRadiusBottomLeftMobile'] ), $settings['borderRadiusUnit'] );
		}

		/**
		 * Shape selector for tablets.
		 *
		 * Example: .gb-container-{ $uniqueId } > .gb-shapes .gb-shape-{ $shapeNumber } svg
		 */
		if ( ! empty( $settings['shapeDividers'] ) ) {
			$default_styles = generateblocks_get_default_styles();

			foreach ( (array) $settings['shapeDividers'] as $index => $options ) {
				$shapeNumber = $index + 1;

				$shapeOptions = wp_parse_args(
					$options,
					$default_styles['container']['shapeDividers']
				);

				$mobile_css->set_selector( $selector . ' > .gb-shapes .gb-shape-' . $shapeNumber . ' svg' );
				$mobile_css->add_property( 'height', $shapeOptions['heightMobile'], 'px' );
				$mobile_css->add_property( 'width', $shapeOptions['widthMobile'], '%' );
			}
		}

		/**
		 * Conditional selector to disable fixed backgrounds on mobile.
		 *
		 * Example 1: .gb-container-{ $uniqueId }
		 * Example 2: .gb-container-{ $uniqueId }:before
		 */
		if ( $hasBgImage && 'fixed' === $settings['bgOptions']['attachment'] ) {
			if ( 'element' === $settings['bgOptions']['selector'] ) {
				$mobile_css->set_selector( $selector );
			}

			if ( 'pseudo-element' === $settings['bgOptions']['selector'] ) {
				$mobile_css->set_selector( $selector . ':before' );
			}

			$mobile_css->add_property( 'background-attachment', 'initial' );
		}

		// Store this block ID in memory.
		self::store_block_id( $id );

		/**
		 * Do generateblocks_block_css_data hook
		 *
		 * @since 1.0
		 *
		 * @param string $name The name of our block.
		 * @param array  $settings The settings for the current block.
		 * @param object $css Our desktop/main CSS data.
		 * @param object $desktop_css Our desktop only CSS data.
		 * @param object $tablet_css Our tablet CSS data.
		 * @param object $tablet_only_css Our tablet only CSS data.
		 * @param object $mobile_css Our mobile CSS data.
		 */
		do_action(
			'generateblocks_block_css_data',
			'container',
			$settings,
			$css,
			$desktop_css,
			$tablet_css,
			$tablet_only_css,
			$mobile_css
		);

		return [
			'main'        => $css->css_output(),
			'desktop'     => $desktop_css->css_output(),
			'tablet'      => $tablet_css->css_output(),
			'tablet_only' => $tablet_only_css->css_output(),
			'mobile'      => $mobile_css->css_output(),
		];
	}

	/**
	 * Wrapper function for our dynamic buttons.
	 *
	 * @since 1.6.0
	 * @param array    $attributes The block attributes.
	 * @param string   $content The dynamic text to display.
	 * @param WP_Block $block Block instance.
	 */
	public static function render_block( $attributes, $content, $block ) {
		if ( ! isset( $attributes['isDynamic'] ) || ! $attributes['isDynamic'] ) {
			// Add styles to this block if needed.
			$content = generateblocks_maybe_add_block_css(
				$content,
				[
					'class_name' => 'GenerateBlocks_Block_Container',
					'attributes' => $attributes,
					'block_ids' => self::$block_ids,
				]
			);

			return $content;
		}

		$defaults = generateblocks_get_block_defaults();

		$settings = wp_parse_args(
			$attributes,
			$defaults['container']
		);

		$blockVersion = ! empty( $settings['blockVersion'] ) ? $settings['blockVersion'] : 1;
		$useInnerContainer = $blockVersion < 3 || $settings['useInnerContainer'];

		// Add styles to this block if needed.
		$output = generateblocks_maybe_add_block_css(
			'',
			[
				'class_name' => 'GenerateBlocks_Block_Container',
				'attributes' => $attributes,
				'block_ids' => self::$block_ids,
			]
		);

		if ( $settings['isGrid'] ) {
			$gridItemClassNames = array(
				'gb-grid-column',
				'gb-grid-column-' . $settings['uniqueId'],
			);

			$output .= sprintf(
				'<div %s>',
				generateblocks_attr(
					'grid-item',
					array(
						'class' => implode( ' ', $gridItemClassNames ),
					),
					$settings,
					$block
				)
			);
		}

		$classNames = array(
			'gb-container',
			'gb-container-' . $settings['uniqueId'],
		);

		if ( ! empty( $settings['className'] ) ) {
			$classNames[] = $settings['className'];
		}

		if ( ! $settings['isGrid'] && ! empty( $settings['align'] ) ) {
			$classNames[] = 'align' . $settings['align'];
		}

		// Pass the dynamic url to our URL attribute.
		if ( isset( $settings['url'] ) ) {
			if ( $settings['useDynamicData'] && '' !== $settings['dynamicLinkType'] ) {
				$attributes['url'] = GenerateBlocks_Dynamic_Content::get_dynamic_url( $settings, $block );
				$settings['url'] = $attributes['url'];
			}
		}

		$tagName = apply_filters(
			'generateblocks_container_tagname',
			$settings['tagName'],
			$attributes,
			$block
		);

		$allowedTagNames = apply_filters(
			'generateblocks_container_allowed_tagnames',
			array(
				'div',
				'article',
				'section',
				'header',
				'footer',
				'aside',
				'a',
			),
			$attributes,
			$block
		);

		if ( ! in_array( $tagName, $allowedTagNames ) ) {
			$tagName = 'div';
		}

		$output = apply_filters(
			'generateblocks_before_container_open',
			$output,
			$attributes,
			$block
		);

		$output .= sprintf(
			'<%1$s %2$s>',
			$tagName,
			generateblocks_attr(
				'container',
				array(
					'id' => isset( $settings['anchor'] ) ? $settings['anchor'] : null,
					'class' => implode( ' ', $classNames ),
				),
				$settings,
				$block
			)
		);

		$output = apply_filters(
			'generateblocks_after_container_open',
			$output,
			$attributes,
			$block
		);

		if ( $useInnerContainer ) {
			$output .= '<div class="gb-inside-container">';
		}

		$output = apply_filters(
			'generateblocks_inside_container',
			$output,
			$attributes,
			$block
		);

		$output .= $content;

		if ( $useInnerContainer ) {
			$output .= '</div>';
		}

		$output = apply_filters(
			'generateblocks_before_container_close',
			$output,
			$attributes,
			$block
		);

		$output .= sprintf(
			'</%s>',
			$tagName
		);

		$output = apply_filters(
			'generateblocks_after_container_close',
			$output,
			$attributes,
			$block
		);

		if ( $settings['isGrid'] ) {
			$output .= '</div>';
		}

		return $output;
	}
}
