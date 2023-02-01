<?php
/**
 * Handles the Headline block.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Add Headline related functions.
 */
class GenerateBlocks_Block_Headline {
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
		return [
			'element' => 'h2',
			'cssClasses' => '',
			'alignment' => false,
			'alignmentTablet' => false,
			'alignmentMobile' => false,
			'backgroundColor' => false,
			'backgroundColorOpacity' => 1,
			'textColor' => false,
			'linkColor' => false,
			'linkColorHover' => false,
			'borderColor' => false,
			'borderColorOpacity' => 1,
			'highlightTextColor' => false,
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
			'lineHeight' => '',
			'lineHeightTablet' => '',
			'lineHeightMobile' => '',
			'lineHeightUnit' => 'em',
			'letterSpacing' => '',
			'letterSpacingTablet' => '',
			'letterSpacingMobile' => '',
			'icon' => '',
			'hasIcon' => false,
			'iconColor' => false,
			'iconColorOpacity' => 1,
			'iconLocation' => 'inline',
			'iconLocationTablet' => '',
			'iconLocationMobile' => '',
			'iconVerticalAlignment' => 'center',
			'iconVerticalAlignmentTablet' => '',
			'iconVerticalAlignmentMobile' => '',
			'iconPaddingTop' => '',
			'iconPaddingRight' => '0.5',
			'iconPaddingBottom' => '',
			'iconPaddingLeft' => '',
			'iconPaddingTopTablet' => '',
			'iconPaddingRightTablet' => '',
			'iconPaddingBottomTablet' => '',
			'iconPaddingLeftTablet' => '',
			'iconPaddingTopMobile' => '',
			'iconPaddingRightMobile' => '',
			'iconPaddingBottomMobile' => '',
			'iconPaddingLeftMobile' => '',
			'iconPaddingUnit' => 'em',
			'iconSize' => 1,
			'iconSizeTablet' => '',
			'iconSizeMobile' => '',
			'iconSizeUnit' => 'em',
			'inlineWidth' => false,
			'inlineWidthTablet' => false,
			'inlineWidthMobile' => false,
			'removeText' => false,
			'ariaLabel' => '',
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
			$defaults['headline']
		);

		$id = $attributes['uniqueId'];
		$blockVersion = ! empty( $settings['blockVersion'] ) ? $settings['blockVersion'] : 1;
		$selector = generateblocks_get_css_selector( 'headline', $attributes );

		// Back-compatibility for when icon held a value.
		if ( $settings['icon'] ) {
			$settings['hasIcon'] = true;
		}

		$fontFamily = $settings['fontFamily'];

		if ( $fontFamily && $settings['fontFamilyFallback'] ) {
			$fontFamily = $fontFamily . ', ' . $settings['fontFamilyFallback'];
		}

		// Only add this CSS once.
		if ( ! self::$singular_css_added ) {
			$css->set_selector( '.gb-icon svg' );
			$css->add_property( 'height', '1em' );
			$css->add_property( 'width', '1em' );
			$css->add_property( 'fill', 'currentColor' );

			$css->set_selector( '.gb-highlight' );
			$css->add_property( 'background', 'none' );
			$css->add_property( 'color', 'unset' );

			do_action(
				'generateblocks_block_one_time_css_data',
				'headline',
				$settings,
				$css
			);

			self::$singular_css_added = true;
		}

		if ( ! isset( $attributes['hasWrapper'] ) ) {
			$css->set_selector( $selector );
			generateblocks_add_layout_css( $css, $settings );
			generateblocks_add_sizing_css( $css, $settings );
			generateblocks_add_flex_child_css( $css, $settings );
			$css->add_property( 'font-family', $fontFamily );
			$css->add_property( 'text-align', $settings['alignment'] );
			$css->add_property( 'color', $settings['textColor'] );
			$css->add_property( 'background-color', generateblocks_hex2rgba( $settings['backgroundColor'], $settings['backgroundColorOpacity'] ) );
			$css->add_property( 'font-size', $settings['fontSize'], $settings['fontSizeUnit'] );
			$css->add_property( 'font-weight', $settings['fontWeight'] );
			$css->add_property( 'text-transform', $settings['textTransform'] );
			$css->add_property( 'line-height', $settings['lineHeight'], $settings['lineHeightUnit'] );
			$css->add_property( 'letter-spacing', $settings['letterSpacing'], 'em' );
			$css->add_property( 'padding', array( $settings['paddingTop'], $settings['paddingRight'], $settings['paddingBottom'], $settings['paddingLeft'] ), $settings['paddingUnit'] );
			$css->add_property( 'margin', array( $settings['marginTop'], $settings['marginRight'], $settings['marginBottom'], $settings['marginLeft'] ), $settings['marginUnit'] );
			$css->add_property( 'border-radius', array( $settings['borderRadiusTopLeft'], $settings['borderRadiusTopRight'], $settings['borderRadiusBottomRight'], $settings['borderRadiusBottomLeft'] ), $settings['borderRadiusUnit'] );
			$css->add_property( 'border-width', array( $settings['borderSizeTop'], $settings['borderSizeRight'], $settings['borderSizeBottom'], $settings['borderSizeLeft'] ), 'px' );
			$css->add_property( 'border-color', generateblocks_hex2rgba( $settings['borderColor'], $settings['borderColorOpacity'] ) );

			if ( $blockVersion < 2 && $settings['inlineWidth'] ) {
				if ( $settings['hasIcon'] ) {
					$css->add_property( 'display', 'inline-flex' );
				} else {
					$css->add_property( 'display', 'inline-block' );
				}
			}

			if ( $blockVersion < 2 && $settings['hasIcon'] ) {
				if ( ! $settings['inlineWidth'] ) {
					$css->add_property( 'display', 'flex' );
				}

				if ( 'above' === $settings['iconLocation'] ) {
					$css->add_property( 'text-align', $settings['alignment'] );
				} else {
					$css->add_property( 'justify-content', generateblocks_get_flexbox_alignment( $settings['alignment'] ) );
				}

				if ( 'inline' === $settings['iconLocation'] ) {
					$css->add_property( 'align-items', generateblocks_get_flexbox_alignment( $settings['iconVerticalAlignment'] ) );
				}

				if ( 'above' === $settings['iconLocation'] ) {
					$css->add_property( 'flex-direction', 'column' );
				}
			}

			$css->set_selector( $selector . ' a' );
			$css->add_property( 'color', $settings['linkColor'] );

			$css->set_selector( $selector . ' a:hover' );
			$css->add_property( 'color', $settings['linkColorHover'] );

			if ( $settings['hasIcon'] ) {
				$css->set_selector( $selector . ' .gb-icon' );
				$css->add_property( 'line-height', '0' );
				$css->add_property( 'color', generateblocks_hex2rgba( $settings['iconColor'], $settings['iconColorOpacity'] ) );

				if ( ! $settings['removeText'] ) {
					$css->add_property( 'padding', array( $settings['iconPaddingTop'], $settings['iconPaddingRight'], $settings['iconPaddingBottom'], $settings['iconPaddingLeft'] ), $settings['iconPaddingUnit'] );
				}

				if ( $blockVersion < 2 ) {
					if ( 'above' === $settings['iconLocation'] ) {
						$css->add_property( 'display', 'inline' );
					} else {
						$css->add_property( 'display', 'inline-flex' );
					}
				}

				$css->set_selector( $selector . ' .gb-icon svg' );
				$css->add_property( 'width', $settings['iconSize'], $settings['iconSizeUnit'] );
				$css->add_property( 'height', $settings['iconSize'], $settings['iconSizeUnit'] );
			}

			if ( $settings['highlightTextColor'] ) {
				$css->set_selector( $selector . ' .gb-highlight' );
				$css->add_property( 'color', $settings['highlightTextColor'] );
			}

			$tablet_css->set_selector( $selector );
			generateblocks_add_layout_css( $tablet_css, $settings, 'Tablet' );
			generateblocks_add_sizing_css( $tablet_css, $settings, 'Tablet' );
			generateblocks_add_flex_child_css( $tablet_css, $settings, 'Tablet' );
			$tablet_css->add_property( 'text-align', $settings['alignmentTablet'] );
			$tablet_css->add_property( 'font-size', $settings['fontSizeTablet'], $settings['fontSizeUnit'] );
			$tablet_css->add_property( 'line-height', $settings['lineHeightTablet'], $settings['lineHeightUnit'] );
			$tablet_css->add_property( 'letter-spacing', $settings['letterSpacingTablet'], 'em' );
			$tablet_css->add_property( 'margin', array( $settings['marginTopTablet'], $settings['marginRightTablet'], $settings['marginBottomTablet'], $settings['marginLeftTablet'] ), $settings['marginUnit'] );
			$tablet_css->add_property( 'padding', array( $settings['paddingTopTablet'], $settings['paddingRightTablet'], $settings['paddingBottomTablet'], $settings['paddingLeftTablet'] ), $settings['paddingUnit'] );
			$tablet_css->add_property( 'border-radius', array( $settings['borderRadiusTopLeftTablet'], $settings['borderRadiusTopRightTablet'], $settings['borderRadiusBottomRightTablet'], $settings['borderRadiusBottomLeftTablet'] ), $settings['borderRadiusUnit'] );
			$tablet_css->add_property( 'border-width', array( $settings['borderSizeTopTablet'], $settings['borderSizeRightTablet'], $settings['borderSizeBottomTablet'], $settings['borderSizeLeftTablet'] ), 'px' );

			if ( $blockVersion < 2 && $settings['inlineWidthTablet'] ) {
				if ( $settings['hasIcon'] ) {
					$tablet_css->add_property( 'display', 'inline-flex' );
				} else {
					$tablet_css->add_property( 'display', 'inline-block' );
				}
			}

			if ( $settings['hasIcon'] ) {
				if ( $blockVersion < 2 ) {
					$tablet_css->add_property( 'justify-content', generateblocks_get_flexbox_alignment( $settings['alignmentTablet'] ) );

					if ( 'inline' === $settings['iconLocationTablet'] ) {
						$tablet_css->add_property( 'align-items', generateblocks_get_flexbox_alignment( $settings['iconVerticalAlignmentTablet'] ) );
					}

					if ( 'above' === $settings['iconLocationTablet'] ) {
						$tablet_css->add_property( 'flex-direction', 'column' );
					}
				}

				$tablet_css->set_selector( $selector . ' .gb-icon' );

				if ( ! $settings['removeText'] ) {
					$tablet_css->add_property( 'padding', array( $settings['iconPaddingTopTablet'], $settings['iconPaddingRightTablet'], $settings['iconPaddingBottomTablet'], $settings['iconPaddingLeftTablet'] ), $settings['iconPaddingUnit'] );
				}

				if ( $blockVersion < 2 ) {
					if ( 'above' === $settings['iconLocationTablet'] || ( 'above' === $settings['iconLocation'] && '' == $settings['iconLocationTablet'] ) ) { // phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison
						$tablet_css->add_property( 'align-self', generateblocks_get_flexbox_alignment( $settings['alignmentTablet'] ) );
					}

					if ( 'above' === $settings['iconLocationTablet'] ) {
						$tablet_css->add_property( 'display', 'inline' );
					}
				}

				$tablet_css->set_selector( $selector . ' .gb-icon svg' );
				$tablet_css->add_property( 'width', $settings['iconSizeTablet'], $settings['iconSizeUnit'] );
				$tablet_css->add_property( 'height', $settings['iconSizeTablet'], $settings['iconSizeUnit'] );
			}

			$mobile_css->set_selector( $selector );
			generateblocks_add_layout_css( $mobile_css, $settings, 'Mobile' );
			generateblocks_add_sizing_css( $mobile_css, $settings, 'Mobile' );
			generateblocks_add_flex_child_css( $mobile_css, $settings, 'Mobile' );
			$mobile_css->add_property( 'text-align', $settings['alignmentMobile'] );
			$mobile_css->add_property( 'font-size', $settings['fontSizeMobile'], $settings['fontSizeUnit'] );
			$mobile_css->add_property( 'line-height', $settings['lineHeightMobile'], $settings['lineHeightUnit'] );
			$mobile_css->add_property( 'letter-spacing', $settings['letterSpacingMobile'], 'em' );
			$mobile_css->add_property( 'margin', array( $settings['marginTopMobile'], $settings['marginRightMobile'], $settings['marginBottomMobile'], $settings['marginLeftMobile'] ), $settings['marginUnit'] );
			$mobile_css->add_property( 'padding', array( $settings['paddingTopMobile'], $settings['paddingRightMobile'], $settings['paddingBottomMobile'], $settings['paddingLeftMobile'] ), $settings['paddingUnit'] );
			$mobile_css->add_property( 'border-radius', array( $settings['borderRadiusTopLeftMobile'], $settings['borderRadiusTopRightMobile'], $settings['borderRadiusBottomRightMobile'], $settings['borderRadiusBottomLeftMobile'] ), $settings['borderRadiusUnit'] );
			$mobile_css->add_property( 'border-width', array( $settings['borderSizeTopMobile'], $settings['borderSizeRightMobile'], $settings['borderSizeBottomMobile'], $settings['borderSizeLeftMobile'] ), 'px' );

			if ( $blockVersion < 2 && $settings['inlineWidthMobile'] ) {
				if ( $settings['hasIcon'] ) {
					$mobile_css->add_property( 'display', 'inline-flex' );
				} else {
					$mobile_css->add_property( 'display', 'inline-block' );
				}
			}

			if ( $settings['hasIcon'] ) {
				if ( $blockVersion < 2 ) {
					$mobile_css->add_property( 'justify-content', generateblocks_get_flexbox_alignment( $settings['alignmentMobile'] ) );

					if ( 'inline' === $settings['iconLocationMobile'] ) {
						$mobile_css->add_property( 'align-items', generateblocks_get_flexbox_alignment( $settings['iconVerticalAlignmentMobile'] ) );
					}

					if ( 'above' === $settings['iconLocationMobile'] ) {
						$mobile_css->add_property( 'flex-direction', 'column' );
					}
				}

				$mobile_css->set_selector( $selector . ' .gb-icon' );

				if ( ! $settings['removeText'] ) {
					$mobile_css->add_property( 'padding', array( $settings['iconPaddingTopMobile'], $settings['iconPaddingRightMobile'], $settings['iconPaddingBottomMobile'], $settings['iconPaddingLeftMobile'] ), $settings['iconPaddingUnit'] );
				}

				if ( $blockVersion < 2 ) {
					if ( 'above' === $settings['iconLocationMobile'] || ( 'above' === $settings['iconLocation'] && '' == $settings['iconLocationMobile'] ) ) { // phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison
						$mobile_css->add_property( 'align-self', generateblocks_get_flexbox_alignment( $settings['alignmentMobile'] ) );
					}

					if ( 'above' === $settings['iconLocationMobile'] ) {
						$mobile_css->add_property( 'display', 'inline' );
					}
				}

				$mobile_css->set_selector( $selector . ' .gb-icon svg' );
				$mobile_css->add_property( 'width', $settings['iconSizeMobile'], $settings['iconSizeUnit'] );
				$mobile_css->add_property( 'height', $settings['iconSizeMobile'], $settings['iconSizeUnit'] );
			}
		} else {
			// The below CSS is for users using the old headline wrapper.
			$css->set_selector( '.gb-headline-wrapper' );
			$css->add_property( 'display', 'flex' );

			$css->set_selector( '.gb-headline-wrapper > .gb-headline' );
			$css->add_property( 'margin', '0' );
			$css->add_property( 'padding', '0' );

			$css->set_selector( '.gb-headline-' . $id );
			$css->add_property( 'font-family', $fontFamily );
			$css->add_property( 'text-align', $settings['alignment'] );
			$css->add_property( 'color', $settings['textColor'] );

			if ( ! $settings['hasIcon'] ) {
				$css->add_property( 'background-color', generateblocks_hex2rgba( $settings['backgroundColor'], $settings['backgroundColorOpacity'] ) );

				if ( $settings['inlineWidth'] ) {
					$css->add_property( 'display', 'inline-block' );
				}

				$css->add_property( 'border-width', array( $settings['borderSizeTop'], $settings['borderSizeRight'], $settings['borderSizeBottom'], $settings['borderSizeLeft'] ), 'px' );
				$css->add_property( 'border-color', generateblocks_hex2rgba( $settings['borderColor'], $settings['borderColorOpacity'] ) );
			}

			$css->add_property( 'font-size', $settings['fontSize'], $settings['fontSizeUnit'] );
			$css->add_property( 'font-weight', $settings['fontWeight'] );
			$css->add_property( 'text-transform', $settings['textTransform'] );
			$css->add_property( 'line-height', $settings['lineHeight'], $settings['lineHeightUnit'] );
			$css->add_property( 'letter-spacing', $settings['letterSpacing'], 'em' );

			if ( ! $settings['hasIcon'] ) {
				$css->add_property( 'padding', array( $settings['paddingTop'], $settings['paddingRight'], $settings['paddingBottom'], $settings['paddingLeft'] ), $settings['paddingUnit'] );
				$css->add_property( 'margin', array( $settings['marginTop'], $settings['marginRight'], $settings['marginBottom'], $settings['marginLeft'] ), $settings['marginUnit'] );

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
				$css->add_property( 'line-height', '0' );

				if ( ! $settings['removeText'] ) {
					$css->add_property( 'padding', array( $settings['iconPaddingTop'], $settings['iconPaddingRight'], $settings['iconPaddingBottom'], $settings['iconPaddingLeft'] ), $settings['iconPaddingUnit'] );
				}

				$css->add_property( 'color', generateblocks_hex2rgba( $settings['iconColor'], $settings['iconColorOpacity'] ) );

				if ( 'above' === $settings['iconLocation'] ) {
					$css->add_property( 'display', 'inline' );
				}

				$css->set_selector( '.gb-headline-wrapper-' . $id . ' .gb-icon svg' );
				$css->add_property( 'width', $settings['iconSize'], $settings['iconSizeUnit'] );
				$css->add_property( 'height', $settings['iconSize'], $settings['iconSizeUnit'] );

				$css->set_selector( '.gb-headline-wrapper-' . $id );
				$css->add_property( 'padding', array( $settings['paddingTop'], $settings['paddingRight'], $settings['paddingBottom'], $settings['paddingLeft'] ), $settings['paddingUnit'] );
				$css->add_property( 'margin', array( $settings['marginTop'], $settings['marginRight'], $settings['marginBottom'], $settings['marginLeft'] ), $settings['marginUnit'] );

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
					$css->add_property( 'display', 'inline-flex' );
				}

				if ( 'inline' === $settings['iconLocation'] ) {
					$css->add_property( 'align-items', generateblocks_get_flexbox_alignment( $settings['iconVerticalAlignment'] ) );
				}

				$css->add_property( 'background-color', generateblocks_hex2rgba( $settings['backgroundColor'], $settings['backgroundColorOpacity'] ) );
				$css->add_property( 'color', $settings['textColor'] );
				$css->add_property( 'border-width', array( $settings['borderSizeTop'], $settings['borderSizeRight'], $settings['borderSizeBottom'], $settings['borderSizeLeft'] ), 'px' );
				$css->add_property( 'border-color', generateblocks_hex2rgba( $settings['borderColor'], $settings['borderColorOpacity'] ) );

				if ( 'above' === $settings['iconLocation'] ) {
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
					$tablet_css->add_property( 'display', 'inline-flex' );
				}
			}

			if ( $settings['hasIcon'] ) {
				$tablet_css->set_selector( '.gb-headline-wrapper-' . $id . ' .gb-icon' );

				if ( ! $settings['removeText'] ) {
					$tablet_css->add_property( 'padding', array( $settings['iconPaddingTopTablet'], $settings['iconPaddingRightTablet'], $settings['iconPaddingBottomTablet'], $settings['iconPaddingLeftTablet'] ), $settings['iconPaddingUnit'] );
				}

				if ( 'above' === $settings['iconLocationTablet'] || ( 'above' === $settings['iconLocation'] && '' == $settings['iconLocationTablet'] ) ) { // phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison
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
					$tablet_css->add_property( 'display', 'inline-flex' );
				}

				if ( 'inline' === $settings['iconLocationTablet'] ) {
					$tablet_css->add_property( 'align-items', generateblocks_get_flexbox_alignment( $settings['iconVerticalAlignmentTablet'] ) );
				}

				if ( 'above' === $settings['iconLocationTablet'] ) {
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
					$mobile_css->add_property( 'display', 'inline-flex' );
				}
			}

			if ( $settings['hasIcon'] ) {
				$mobile_css->set_selector( '.gb-headline-wrapper-' . $id . ' .gb-icon' );

				if ( ! $settings['removeText'] ) {
					$mobile_css->add_property( 'padding', array( $settings['iconPaddingTopMobile'], $settings['iconPaddingRightMobile'], $settings['iconPaddingBottomMobile'], $settings['iconPaddingLeftMobile'] ), $settings['iconPaddingUnit'] );
				}

				if ( 'above' === $settings['iconLocationMobile'] || ( 'above' === $settings['iconLocation'] && '' == $settings['iconLocationMobile'] ) || ( 'above' === $settings['iconLocationTablet'] && '' == $settings['iconLocationMobile'] ) ) { // phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison
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
					$mobile_css->add_property( 'display', 'inline-flex' );
				}

				if ( 'inline' === $settings['iconLocationMobile'] ) {
					$mobile_css->add_property( 'align-items', generateblocks_get_flexbox_alignment( $settings['iconVerticalAlignmentMobile'] ) );
				}

				if ( 'above' === $settings['iconLocationMobile'] ) {
					$mobile_css->add_property( 'flex-direction', 'column' );
				}
			}
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
			'headline',
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
		if ( strpos( trim( $content ), '<div class="gb-headline-wrapper' ) === 0 ) {
			$attributes['hasWrapper'] = true;
		}

		if ( ! isset( $attributes['useDynamicData'] ) || ! $attributes['useDynamicData'] ) {
			// Add styles to this block if needed.
			$content = generateblocks_maybe_add_block_css(
				$content,
				[
					'class_name' => 'GenerateBlocks_Block_Headline',
					'attributes' => $attributes,
					'block_ids' => self::$block_ids,
				]
			);

			return $content;
		}

		$allow_empty_content = false;

		if ( empty( $attributes['dynamicContentType'] ) ) {
			$dynamic_content = GenerateBlocks_Dynamic_Content::get_static_content( $content );

			if ( ! empty( $attributes['hasIcon'] ) && ! empty( $attributes['removeText'] ) ) {
				// Allow icon-only items to continue.
				$allow_empty_content = true;
			}
		} else {
			$dynamic_content = GenerateBlocks_Dynamic_Content::get_content( $attributes, $block );
		}

		if ( ! $dynamic_content && '0' !== $dynamic_content && ! $allow_empty_content ) {
			return '';
		}

		$defaults = generateblocks_get_block_defaults();

		$settings = wp_parse_args(
			$attributes,
			$defaults['headline']
		);

		$classNames = array(
			'gb-headline',
			'gb-headline-' . $settings['uniqueId'],
		);

		if ( ! empty( $settings['className'] ) ) {
			$classNames[] = $settings['className'];
		}

		if ( empty( $settings['hasIcon'] ) ) {
			$classNames[] = 'gb-headline-text';
		}

		$tagName = apply_filters(
			'generateblocks_dynamic_headline_tagname',
			$settings['element'],
			$attributes,
			$block
		);

		$allowedTagNames = apply_filters(
			'generateblocks_dynamic_headline_allowed_tagnames',
			array(
				'h1',
				'h2',
				'h3',
				'h4',
				'h5',
				'h6',
				'div',
				'p',
				'figcaption',
			),
			$attributes,
			$block
		);

		if ( ! in_array( $tagName, $allowedTagNames ) ) {
			$tagName = 'div';
		}

		// Add styles to this block if needed.
		$output = generateblocks_maybe_add_block_css(
			'',
			[
				'class_name' => 'GenerateBlocks_Block_Headline',
				'attributes' => $attributes,
				'block_ids' => self::$block_ids,
			]
		);

		$output .= sprintf(
			'<%1$s %2$s>',
			$tagName,
			generateblocks_attr(
				'dynamic-headline',
				array(
					'id' => isset( $settings['anchor'] ) ? $settings['anchor'] : null,
					'class' => implode( ' ', $classNames ),
				),
				$settings,
				$block
			)
		);

		$icon_html = '';

		// Extract our icon from the static HTML.
		if ( $settings['hasIcon'] ) {
			$icon_html = GenerateBlocks_Dynamic_Content::get_icon_html( $content );

			if ( $icon_html ) {
				$output .= $icon_html;
				$output .= '<span class="gb-headline-text">';
			}
		}

		$dynamic_link = GenerateBlocks_Dynamic_Content::get_dynamic_url( $attributes, $block );

		if ( $dynamic_link ) {
			$dynamic_content = sprintf(
				'<a href="%s">%s</a>',
				$dynamic_link,
				$dynamic_content
			);
		}

		$output .= $dynamic_content;

		if ( $icon_html ) {
			$output .= '</span>';
		}

		$output .= sprintf(
			'</%s>',
			$tagName
		);

		return $output;
	}
}
