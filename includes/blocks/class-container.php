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
			'paddingTop' => '',
			'paddingRight' => '',
			'paddingBottom' => '',
			'paddingLeft' => '',
			'paddingUnit' => 'px',
			'paddingTopTablet' => '',
			'paddingRightTablet' => '',
			'paddingBottomTablet' => '',
			'paddingLeftTablet' => '',
			'paddingTopMobile' => '',
			'paddingRightMobile' => '',
			'paddingBottomMobile' => '',
			'paddingLeftMobile' => '',
			'marginTop' => '',
			'marginRight' => '',
			'marginBottom' => '',
			'marginLeft' => '',
			'marginUnit' => 'px',
			'marginTopTablet' => '',
			'marginRightTablet' => '',
			'marginBottomTablet' => '',
			'marginLeftTablet' => '',
			'marginTopMobile' => '',
			'marginRightMobile' => '',
			'marginBottomMobile' => '',
			'marginLeftMobile' => '',
			'borderSizeTop' => '',
			'borderSizeRight' => '',
			'borderSizeBottom' => '',
			'borderSizeLeft' => '',
			'borderSizeTopTablet' => '',
			'borderSizeRightTablet' => '',
			'borderSizeBottomTablet' => '',
			'borderSizeLeftTablet' => '',
			'borderSizeTopMobile' => '',
			'borderSizeRightMobile' => '',
			'borderSizeBottomMobile' => '',
			'borderSizeLeftMobile' => '',
			'borderRadiusTopRight' => '',
			'borderRadiusBottomRight' => '',
			'borderRadiusBottomLeft' => '',
			'borderRadiusTopLeft' => '',
			'borderRadiusUnit' => 'px',
			'borderRadiusTopRightTablet' => '',
			'borderRadiusBottomRightTablet' => '',
			'borderRadiusBottomLeftTablet' => '',
			'borderRadiusTopLeftTablet' => '',
			'borderRadiusTopRightMobile' => '',
			'borderRadiusBottomRightMobile' => '',
			'borderRadiusBottomLeftMobile' => '',
			'borderRadiusTopLeftMobile' => '',
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
			'flexGrow' => '',
			'flexGrowTablet' => '',
			'flexGrowMobile' => '',
			'flexShrink' => '',
			'flexShrinkTablet' => '',
			'flexShrinkMobile' => '',
			'flexBasis' => '',
			'flexBasisTablet' => '',
			'flexBasisMobile' => '',
			'flexBasisUnit' => 'px',
			'verticalAlignment' => '',
			'verticalAlignmentTablet' => 'inherit',
			'verticalAlignmentMobile' => 'inherit',
			'zindex' => '',
			'innerZindex' => '',
			'removeVerticalGap' => false,
			'removeVerticalGapTablet' => false,
			'removeVerticalGapMobile' => false,
			'orderTablet' => false,
			'orderMobile' => false,
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

			self::$singular_css_added = true;
		}

		$css->set_selector( '.gb-container-' . $id );
		$css->add_property( 'font-family', $fontFamily );
		$css->add_property( 'font-size', $settings['fontSize'], $settings['fontSizeUnit'] );
		$css->add_property( 'font-weight', $settings['fontWeight'] );
		$css->add_property( 'text-transform', $settings['textTransform'] );
		$css->add_property( 'margin', array( $settings['marginTop'], $settings['marginRight'], $settings['marginBottom'], $settings['marginLeft'] ), $settings['marginUnit'] );

		if ( 'contained' === $settings['outerContainer'] && ! $settings['isGrid'] ) {
			if ( ! empty( $containerWidth ) ) {
				$css->add_property( 'max-width', absint( $containerWidth ), 'px' );
				$css->add_property( 'margin-left', 'auto' );
				$css->add_property( 'margin-right', 'auto' );
			}
		}

		$css->add_property( 'background-color', generateblocks_hex2rgba( $settings['backgroundColor'], $settings['backgroundColorOpacity'] ) );
		$css->add_property( 'color', $settings['textColor'] );

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

		if ( $settings['zindex'] ) {
			$css->add_property( 'z-index', $settings['zindex'] );
		}

		$css->add_property( 'border-radius', array( $settings['borderRadiusTopLeft'], $settings['borderRadiusTopRight'], $settings['borderRadiusBottomRight'], $settings['borderRadiusBottomLeft'] ), $settings['borderRadiusUnit'] );
		$css->add_property( 'border-width', array( $settings['borderSizeTop'], $settings['borderSizeRight'], $settings['borderSizeBottom'], $settings['borderSizeLeft'] ), 'px' );
		$css->add_property( 'border-color', generateblocks_hex2rgba( $settings['borderColor'], $settings['borderColorOpacity'] ) );
		$css->add_property( 'min-height', $settings['minHeight'], $settings['minHeightUnit'] );

		// Set flags so we don't duplicate this CSS in media queries.
		$usingMinHeightFlex = false;
		$usingMinHeightInnerWidth = false;

		if ( $settings['minHeight'] && $settings['verticalAlignment'] && ! $settings['isGrid'] ) {
			$css->add_property( 'display', 'flex' );
			$css->add_property( 'flex-direction', 'row' );
			$css->add_property( 'align-items', $settings['verticalAlignment'] );

			$usingMinHeightFlex = true;
		}

		$css->add_property( 'text-align', $settings['alignment'] );

		$innerZIndex = $settings['innerZindex'];

		$css->set_selector( '.gb-container-' . $id . ':before' );

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

			if ( isset( $settings['bgOptions']['opacity'] ) && 1 !== $settings['bgOptions']['opacity'] ) {
				$css->add_property( 'opacity', $settings['bgOptions']['opacity'] );
			}

			if ( $blockVersion < 2 && ! $innerZIndex ) {
				$innerZIndex = 1;
			}
		}

		if ( $settings['gradient'] && 'pseudo-element' === $settings['gradientSelector'] ) {
			$css->set_selector( '.gb-container-' . $id . ':after' );
			$css->add_property( 'content', '""' );
			$css->add_property( 'background-image', $gradientValue );
			$css->add_property( 'z-index', '0' );
			$css->add_property( 'position', 'absolute' );
			$css->add_property( 'top', '0' );
			$css->add_property( 'right', '0' );
			$css->add_property( 'bottom', '0' );
			$css->add_property( 'left', '0' );

			if ( $blockVersion < 2 && ! $innerZIndex ) {
				$innerZIndex = 1;
			}
		}

		$css->set_selector( '.gb-container-' . $id . ' > .gb-inside-container' );
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

		$css->set_selector( '.gb-container-' . $id . ' a, .gb-container-' . $id . ' a:visited' );
		$css->add_property( 'color', $settings['linkColor'] );

		$css->set_selector( '.gb-container-' . $id . ' a:hover' );
		$css->add_property( 'color', $settings['linkColorHover'] );

		if ( $settings['isGrid'] ) {
			$css->set_selector( '.gb-grid-wrapper > .gb-grid-column-' . $id );
			$css->add_property( 'width', $settings['width'], '%' );

			$css->add_property( 'flex-grow', $settings['flexGrow'] );
			$css->add_property( 'flex-shrink', $settings['flexShrink'] );

			if ( is_numeric( $settings['flexBasis'] ) ) {
				$css->add_property( 'flex-basis', $settings['flexBasis'], $settings['flexBasisUnit'] );
			} else {
				$css->add_property( 'flex-basis', $settings['flexBasis'] );
			}
		}

		if ( $settings['removeVerticalGap'] ) {
			$desktop_css->set_selector( '.gb-grid-wrapper > div.gb-grid-column-' . $id );
			$desktop_css->add_property( 'padding-bottom', '0' );
		}

		$css->set_selector( '.gb-grid-wrapper > .gb-grid-column-' . $id . ' > .gb-container' );
		$css->add_property( 'justify-content', $settings['verticalAlignment'] );

		if ( ! empty( $settings['shapeDividers'] ) ) {
			$css->set_selector( '.gb-container-' . $id );
			$css->add_property( 'position', 'relative' );

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

				$css->set_selector( '.gb-container-' . $id . ' > .gb-shapes .gb-shape-' . $shapeNumber );
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

				$css->set_selector( '.gb-container-' . $id . ' > .gb-shapes .gb-shape-' . $shapeNumber . ' svg' );
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

		$tablet_css->set_selector( '.gb-container-' . $id );
		$tablet_css->add_property( 'font-size', $settings['fontSizeTablet'], $settings['fontSizeUnit'] );
		$tablet_css->add_property( 'margin', array( $settings['marginTopTablet'], $settings['marginRightTablet'], $settings['marginBottomTablet'], $settings['marginLeftTablet'] ), $settings['marginUnit'] );
		$tablet_css->add_property( 'border-radius', array( $settings['borderRadiusTopLeftTablet'], $settings['borderRadiusTopRightTablet'], $settings['borderRadiusBottomRightTablet'], $settings['borderRadiusBottomLeftTablet'] ), $settings['borderRadiusUnit'] );
		$tablet_css->add_property( 'border-width', array( $settings['borderSizeTopTablet'], $settings['borderSizeRightTablet'], $settings['borderSizeBottomTablet'], $settings['borderSizeLeftTablet'] ), 'px' );
		$tablet_css->add_property( 'min-height', $settings['minHeightTablet'], $settings['minHeightUnitTablet'] );

		if ( ! $settings['isGrid'] ) {
			if ( ! $usingMinHeightFlex && $settings['minHeightTablet'] && 'inherit' !== $settings['verticalAlignmentTablet'] ) {
				$tablet_css->add_property( 'display', 'flex' );
				$tablet_css->add_property( 'flex-direction', 'row' );

				$usingMinHeightFlex = true;
			}

			if ( $usingMinHeightFlex && 'inherit' !== $settings['verticalAlignmentTablet'] ) {
				$tablet_css->add_property( 'align-items', $settings['verticalAlignmentTablet'] );
			}
		}

		$tablet_css->add_property( 'text-align', $settings['alignmentTablet'] );

		$tablet_css->set_selector( '.gb-container-' . $id . ' > .gb-inside-container' );
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

		if ( ! $settings['autoWidthTablet'] ) {
			$tablet_css->add_property( 'width', $settings['widthTablet'], '%' );
		} else {
			$tablet_css->add_property( 'width', 'auto' );
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

		if ( $settings['removeVerticalGapTablet'] ) {
			$tablet_only_css->set_selector( '.gb-grid-wrapper > div.gb-grid-column-' . $id );
			$tablet_only_css->add_property( 'padding-bottom', '0' );
		}

		$tablet_css->set_selector( '.gb-grid-wrapper > .gb-grid-column-' . $id . ' > .gb-container' );

		if ( 'inherit' !== $settings['verticalAlignmentTablet'] ) {
			$tablet_css->add_property( 'justify-content', $settings['verticalAlignmentTablet'] );
		}

		if ( $hasBgImage && 'pseudo-element' === $settings['bgOptions']['selector'] ) {
			$tablet_css->set_selector( '.gb-container-' . $id . ':before' );
			$tablet_css->add_property( 'border-radius', array( $settings['borderRadiusTopLeftTablet'], $settings['borderRadiusTopRightTablet'], $settings['borderRadiusBottomRightTablet'], $settings['borderRadiusBottomLeftTablet'] ), $settings['borderRadiusUnit'] );
		}

		if ( ! empty( $settings['shapeDividers'] ) ) {
			$default_styles = generateblocks_get_default_styles();

			foreach ( (array) $settings['shapeDividers'] as $index => $options ) {
				$shapeNumber = $index + 1;

				$shapeOptions = wp_parse_args(
					$options,
					$default_styles['container']['shapeDividers']
				);

				$tablet_css->set_selector( '.gb-container-' . $id . ' > .gb-shapes .gb-shape-' . $shapeNumber . ' svg' );
				$tablet_css->add_property( 'height', $shapeOptions['heightTablet'], 'px' );
				$tablet_css->add_property( 'width', $shapeOptions['widthTablet'], '%' );
			}
		}

		$mobile_css->set_selector( '.gb-container-' . $id );
		$mobile_css->add_property( 'font-size', $settings['fontSizeMobile'], $settings['fontSizeUnit'] );
		$mobile_css->add_property( 'margin', array( $settings['marginTopMobile'], $settings['marginRightMobile'], $settings['marginBottomMobile'], $settings['marginLeftMobile'] ), $settings['marginUnit'] );
		$mobile_css->add_property( 'border-radius', array( $settings['borderRadiusTopLeftMobile'], $settings['borderRadiusTopRightMobile'], $settings['borderRadiusBottomRightMobile'], $settings['borderRadiusBottomLeftMobile'] ), $settings['borderRadiusUnit'] );
		$mobile_css->add_property( 'border-width', array( $settings['borderSizeTopMobile'], $settings['borderSizeRightMobile'], $settings['borderSizeBottomMobile'], $settings['borderSizeLeftMobile'] ), 'px' );
		$mobile_css->add_property( 'min-height', $settings['minHeightMobile'], $settings['minHeightUnitMobile'] );

		if ( ! $settings['isGrid'] ) {
			if ( ! $usingMinHeightFlex && $settings['minHeightMobile'] && 'inherit' !== $settings['verticalAlignmentMobile'] ) {
				$mobile_css->add_property( 'display', 'flex' );
				$mobile_css->add_property( 'flex-direction', 'row' );

				$usingMinHeightFlex = true;
			}

			if ( $usingMinHeightFlex && 'inherit' !== $settings['verticalAlignmentMobile'] ) {
				$mobile_css->add_property( 'align-items', $settings['verticalAlignmentMobile'] );
			}
		}

		$mobile_css->add_property( 'text-align', $settings['alignmentMobile'] );

		$mobile_css->set_selector( '.gb-container-' . $id . ' > .gb-inside-container' );
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

		if ( ! $settings['autoWidthMobile'] ) {
			$mobile_css->add_property( 'width', $settings['widthMobile'], '%' );
		}

		if ( $settings['autoWidthMobile'] ) {
			$mobile_css->add_property( 'width', 'auto' );
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

		if ( $settings['removeVerticalGapMobile'] ) {
			$mobile_css->set_selector( '.gb-grid-wrapper > div.gb-grid-column-' . $id );
			$mobile_css->add_property( 'padding-bottom', '0' );
		}

		$mobile_css->set_selector( '.gb-grid-wrapper > .gb-grid-column-' . $id . ' > .gb-container' );

		if ( 'inherit' !== $settings['verticalAlignmentMobile'] ) {
			$mobile_css->add_property( 'justify-content', $settings['verticalAlignmentMobile'] );
		}

		if ( $hasBgImage && 'pseudo-element' === $settings['bgOptions']['selector'] ) {
			$mobile_css->set_selector( '.gb-container-' . $id . ':before' );
			$mobile_css->add_property( 'border-radius', array( $settings['borderRadiusTopLeftMobile'], $settings['borderRadiusTopRightMobile'], $settings['borderRadiusBottomRightMobile'], $settings['borderRadiusBottomLeftMobile'] ), $settings['borderRadiusUnit'] );
		}

		if ( ! empty( $settings['shapeDividers'] ) ) {
			$default_styles = generateblocks_get_default_styles();

			foreach ( (array) $settings['shapeDividers'] as $index => $options ) {
				$shapeNumber = $index + 1;

				$shapeOptions = wp_parse_args(
					$options,
					$default_styles['container']['shapeDividers']
				);

				$mobile_css->set_selector( '.gb-container-' . $id . ' > .gb-shapes .gb-shape-' . $shapeNumber . ' svg' );
				$mobile_css->add_property( 'height', $shapeOptions['heightMobile'], 'px' );
				$mobile_css->add_property( 'width', $shapeOptions['widthMobile'], '%' );
			}
		}

		if ( $hasBgImage && 'fixed' === $settings['bgOptions']['attachment'] ) {
			if ( 'element' === $settings['bgOptions']['selector'] ) {
				$mobile_css->set_selector( '.gb-container-' . $id );
			}

			if ( 'pseudo-element' === $settings['bgOptions']['selector'] ) {
				$mobile_css->set_selector( '.gb-container-' . $id . ':before' );
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

		$output .= '<div class="gb-inside-container">';

		$output = apply_filters(
			'generateblocks_inside_container',
			$output,
			$attributes,
			$block
		);

		$output .= $content;
		$output .= '</div>';

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

		if ( $settings['isGrid'] ) {
			$output .= '</div>';
		}

		return $output;
	}
}
