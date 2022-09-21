<?php
/**
 * Handles the Button block.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Add Button related functions.
 */
class GenerateBlocks_Block_Button {
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
			'backgroundColor' => false,
			'backgroundColorOpacity' => 1,
			'backgroundColorHover' => false,
			'backgroundColorHoverOpacity' => 1,
			'backgroundColorCurrent' => '',
			'textColor' => false,
			'textColorHover' => false,
			'textColorCurrent' => '',
			'borderColor' => false,
			'borderColorOpacity' => 1,
			'borderColorHover' => false,
			'borderColorHoverOpacity' => 1,
			'borderColorCurrent' => false,
			'fontFamily' => '',
			'fontFamilyFallback' => '',
			'googleFont' => false,
			'googleFontVariants' => '',
			'fontWeight' => '',
			'fontSize' => false,
			'fontSizeTablet' => false,
			'fontSizeMobile' => false,
			'fontSizeUnit' => 'px',
			'textTransform' => '',
			'letterSpacing' => '',
			'letterSpacingTablet' => '',
			'letterSpacingMobile' => '',
			'marginTop' => '',
			'marginRight' => '',
			'marginBottom' => '',
			'marginLeft' => '',
			'marginTopTablet' => '',
			'marginRightTablet' => '',
			'marginBottomTablet' => '',
			'marginLeftTablet' => '',
			'marginTopMobile' => '',
			'marginRightMobile' => '',
			'marginBottomMobile' => '',
			'marginLeftMobile' => '',
			'marginUnit' => 'px',
			'paddingTop' => '',
			'paddingRight' => '',
			'paddingBottom' => '',
			'paddingLeft' => '',
			'paddingTopTablet' => '',
			'paddingRightTablet' => '',
			'paddingBottomTablet' => '',
			'paddingLeftTablet' => '',
			'paddingTopMobile' => '',
			'paddingRightMobile' => '',
			'paddingBottomMobile' => '',
			'paddingLeftMobile' => '',
			'paddingUnit' => 'px',
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
			'borderRadiusTopRightTablet' => '',
			'borderRadiusBottomRightTablet' => '',
			'borderRadiusBottomLeftTablet' => '',
			'borderRadiusTopLeftTablet' => '',
			'borderRadiusTopRightMobile' => '',
			'borderRadiusBottomRightMobile' => '',
			'borderRadiusBottomLeftMobile' => '',
			'borderRadiusTopLeftMobile' => '',
			'borderRadiusUnit' => 'px',
			'icon' => '',
			'hasIcon' => false,
			'iconLocation' => 'left',
			'removeText' => false,
			'ariaLabel' => '',
			'gradient' => false,
			'gradientDirection' => '',
			'gradientColorOne' => '',
			'gradientColorOneOpacity' => '',
			'gradientColorStopOne' => '',
			'gradientColorTwo' => '',
			'gradientColorTwoOpacity' => '',
			'gradientColorStopTwo' => '',
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
			$defaults['button']
		);

		$id = $attributes['uniqueId'];
		$blockVersion = ! empty( $settings['blockVersion'] ) ? $settings['blockVersion'] : 1;

		// Use legacy settings if needed.
		if ( $blockVersion < 2 ) {
			$settings = GenerateBlocks_Legacy_Attributes::get_settings( '1.4.0', 'button', $settings, $attributes );
		}

		$selector = 'a.gb-button-' . $id;

		if ( isset( $attributes['hasUrl'] ) && ! $attributes['hasUrl'] ) {
			$selector = '.gb-button-' . $id;
		}

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

		// Only add this CSS once.
		if ( ! self::$singular_css_added ) {
			$css->set_selector( '.gb-button-wrapper .gb-button' );
			$css->add_property( 'display', 'inline-flex' );
			$css->add_property( 'align-items', 'center' );
			$css->add_property( 'justify-content', 'center' );
			$css->add_property( 'text-align', 'center' );
			$css->add_property( 'text-decoration', 'none' );
			$css->add_property( 'transition', '.2s background-color ease-in-out, .2s color ease-in-out, .2s border-color ease-in-out, .2s opacity ease-in-out, .2s box-shadow ease-in-out' );

			$css->set_selector( '.gb-button-wrapper .gb-button .gb-icon' );
			$css->add_property( 'align-items', 'center' );

			$css->set_selector( '.gb-icon' );
			$css->add_property( 'display', 'inline-flex' );
			$css->add_property( 'line-height', '0' );

			$css->set_selector( '.gb-icon svg' );
			$css->add_property( 'height', '1em' );
			$css->add_property( 'width', '1em' );
			$css->add_property( 'fill', 'currentColor' );

			self::$singular_css_added = true;
		}

		$css->set_selector( '.gb-button-wrapper ' . $selector . ',.gb-button-wrapper ' . $selector . ':visited' );
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
		$css->add_property( 'padding', array( $settings['paddingTop'], $settings['paddingRight'], $settings['paddingBottom'], $settings['paddingLeft'] ), $settings['paddingUnit'] );
		$css->add_property( 'border-radius', array( $settings['borderRadiusTopLeft'], $settings['borderRadiusTopRight'], $settings['borderRadiusBottomRight'], $settings['borderRadiusBottomLeft'] ), $settings['borderRadiusUnit'] );
		$css->add_property( 'margin', array( $settings['marginTop'], $settings['marginRight'], $settings['marginBottom'], $settings['marginLeft'] ), $settings['marginUnit'] );
		$css->add_property( 'border-width', array( $settings['borderSizeTop'], $settings['borderSizeRight'], $settings['borderSizeBottom'], $settings['borderSizeLeft'] ), 'px' );
		$css->add_property( 'border-color', generateblocks_hex2rgba( $settings['borderColor'], $settings['borderColorOpacity'] ) );
		$css->add_property( 'text-transform', $settings['textTransform'] );

		if ( $settings['hasIcon'] ) {
			$css->add_property( 'display', 'inline-flex' );
			$css->add_property( 'align-items', 'center' );
		}

		$css->set_selector( '.gb-button-wrapper ' . $selector . ':hover,.gb-button-wrapper ' . $selector . ':active,.gb-button-wrapper ' . $selector . ':focus' );
		$css->add_property( 'background-color', generateblocks_hex2rgba( $settings['backgroundColorHover'], $settings['backgroundColorHoverOpacity'] ) );
		$css->add_property( 'color', $settings['textColorHover'] );
		$css->add_property( 'border-color', generateblocks_hex2rgba( $settings['borderColorHover'], $settings['borderColorHoverOpacity'] ) );

		$css->set_selector( '.gb-button-wrapper ' . $selector . '.gb-button__current, .gb-button-wrapper ' . $selector . '.gb-button__current:visited' );
		$css->add_property( 'background-color', $settings['backgroundColorCurrent'] );
		$css->add_property( 'color', $settings['textColorCurrent'] );
		$css->add_property( 'border-color', $settings['borderColorCurrent'] );

		if ( $settings['hasIcon'] ) {
			$css->set_selector( $selector . ' .gb-icon' );
			$css->add_property( 'font-size', $settings['iconSize'], $settings['iconSizeUnit'] );

			if ( ! $settings['removeText'] ) {
				$css->add_property( 'padding', array( $settings['iconPaddingTop'], $settings['iconPaddingRight'], $settings['iconPaddingBottom'], $settings['iconPaddingLeft'] ), $settings['iconPaddingUnit'] );
			}
		}

		$tablet_css->set_selector( '.gb-button-wrapper ' . $selector );
		$tablet_css->add_property( 'font-size', $settings['fontSizeTablet'], $settings['fontSizeUnit'] );
		$tablet_css->add_property( 'letter-spacing', $settings['letterSpacingTablet'], 'em' );
		$tablet_css->add_property( 'padding', array( $settings['paddingTopTablet'], $settings['paddingRightTablet'], $settings['paddingBottomTablet'], $settings['paddingLeftTablet'] ), $settings['paddingUnit'] );
		$tablet_css->add_property( 'border-radius', array( $settings['borderRadiusTopLeftTablet'], $settings['borderRadiusTopRightTablet'], $settings['borderRadiusBottomRightTablet'], $settings['borderRadiusBottomLeftTablet'] ), $settings['borderRadiusUnit'] );
		$tablet_css->add_property( 'margin', array( $settings['marginTopTablet'], $settings['marginRightTablet'], $settings['marginBottomTablet'], $settings['marginLeftTablet'] ), $settings['marginUnit'] );
		$tablet_css->add_property( 'border-width', array( $settings['borderSizeTopTablet'], $settings['borderSizeRightTablet'], $settings['borderSizeBottomTablet'], $settings['borderSizeLeftTablet'] ), 'px' );

		if ( $settings['hasIcon'] ) {
			$tablet_css->set_selector( $selector . ' .gb-icon' );
			$tablet_css->add_property( 'font-size', $settings['iconSizeTablet'], $settings['iconSizeUnit'] );

			if ( ! $settings['removeText'] ) {
				$tablet_css->add_property( 'padding', array( $settings['iconPaddingTopTablet'], $settings['iconPaddingRightTablet'], $settings['iconPaddingBottomTablet'], $settings['iconPaddingLeftTablet'] ), $settings['iconPaddingUnit'] );
			}
		}

		$mobile_css->set_selector( '.gb-button-wrapper ' . $selector );
		$mobile_css->add_property( 'font-size', $settings['fontSizeMobile'], $settings['fontSizeUnit'] );
		$mobile_css->add_property( 'letter-spacing', $settings['letterSpacingMobile'], 'em' );
		$mobile_css->add_property( 'padding', array( $settings['paddingTopMobile'], $settings['paddingRightMobile'], $settings['paddingBottomMobile'], $settings['paddingLeftMobile'] ), $settings['paddingUnit'] );
		$mobile_css->add_property( 'border-radius', array( $settings['borderRadiusTopLeftMobile'], $settings['borderRadiusTopRightMobile'], $settings['borderRadiusBottomRightMobile'], $settings['borderRadiusBottomLeftMobile'] ), $settings['borderRadiusUnit'] );
		$mobile_css->add_property( 'margin', array( $settings['marginTopMobile'], $settings['marginRightMobile'], $settings['marginBottomMobile'], $settings['marginLeftMobile'] ), $settings['marginUnit'] );
		$mobile_css->add_property( 'border-width', array( $settings['borderSizeTopMobile'], $settings['borderSizeRightMobile'], $settings['borderSizeBottomMobile'], $settings['borderSizeLeftMobile'] ), 'px' );

		if ( $settings['hasIcon'] ) {
			$mobile_css->set_selector( $selector . ' .gb-icon' );
			$mobile_css->add_property( 'font-size', $settings['iconSizeMobile'], $settings['iconSizeUnit'] );

			if ( ! $settings['removeText'] ) {
				$mobile_css->add_property( 'padding', array( $settings['iconPaddingTopMobile'], $settings['iconPaddingRightMobile'], $settings['iconPaddingBottomMobile'], $settings['iconPaddingLeftMobile'] ), $settings['iconPaddingUnit'] );
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
			'button',
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
		if ( ! isset( $attributes['hasUrl'] ) && strpos( trim( $content ), '<a' ) === 0 ) {
			$attributes['hasUrl'] = true;
		}

		if ( ! isset( $attributes['useDynamicData'] ) || ! $attributes['useDynamicData'] ) {
			// Add styles to this block if needed.
			$content = generateblocks_maybe_add_block_css(
				$content,
				[
					'class_name' => 'GenerateBlocks_Block_Button',
					'attributes' => $attributes,
					'block_ids' => self::$block_ids,
				]
			);

			return $content;
		}

		$allow_empty_content = false;

		// Add an attribute showing we're working with the Button block.
		$attributes['isButton'] = true;

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
			$defaults['button']
		);

		$classNames = array(
			'gb-button',
			'gb-button-' . $settings['uniqueId'],
		);

		if ( ! empty( $settings['className'] ) ) {
			$classNames[] = $settings['className'];
		}

		if ( empty( $settings['hasIcon'] ) ) {
			$classNames[] = 'gb-button-text';
		}

		$relAttributes = array();

		if ( ! empty( $settings['relNoFollow'] ) ) {
			$relAttributes[] = 'nofollow';
		}

		if ( ! empty( $settings['target'] ) ) {
			$relAttributes[] = 'noopener';
			$relAttributes[] = 'noreferrer';
		}

		if ( ! empty( $settings['relSponsored'] ) ) {
			$relAttributes[] = 'sponsored';
		}

		$icon_html = '';

		// Extract our icon from the static HTML.
		if ( $settings['hasIcon'] ) {
			$icon_html = GenerateBlocks_Dynamic_Content::get_icon_html( $content );
		}

		// Add styles to this block if needed.
		$output = generateblocks_maybe_add_block_css(
			'',
			[
				'class_name' => 'GenerateBlocks_Block_Button',
				'attributes' => $attributes,
				'block_ids' => self::$block_ids,
			]
		);

		foreach ( (array) $dynamic_content as $content ) {
			$tagName = 'span';

			$dynamic_link = GenerateBlocks_Dynamic_Content::get_dynamic_url( $attributes, $block );

			if ( isset( $content['attributes']['href'] ) || $dynamic_link ) {
				$tagName = 'a';
			}

			$button_attributes = array(
				'id' => isset( $settings['anchor'] ) ? $settings['anchor'] : null,
				'class' => implode( ' ', $classNames ),
				'href' => 'a' === $tagName ? $dynamic_link : null,
				'rel' => ! empty( $relAttributes ) ? implode( ' ', $relAttributes ) : null,
				'target' => ! empty( $settings['target'] ) ? '_blank' : null,
			);

			if ( isset( $content['attributes'] ) ) {
				foreach ( $content['attributes'] as $attribute => $value ) {
					if ( 'class' === $attribute ) {
						$button_attributes[ $attribute ] .= ' ' . $value;
					} else {
						$button_attributes[ $attribute ] = $value;
					}
				}
			}

			$output .= sprintf(
				'<%1$s %2$s>',
				$tagName,
				generateblocks_attr(
					'dynamic-button',
					$button_attributes,
					$settings,
					$block
				)
			);

			if ( $icon_html ) {
				if ( 'left' === $settings['iconLocation'] ) {
					$output .= $icon_html;
				}

				$output .= '<span class="gb-button-text">';
			}

			if ( isset( $content['content'] ) ) {
				$output .= $content['content'];
			} else {
				$output .= $content;
			}

			if ( $icon_html ) {
				$output .= '</span>';

				if ( 'right' === $settings['iconLocation'] ) {
					$output .= $icon_html;
				}
			}

			$output .= sprintf(
				'</%s>',
				$tagName
			);
		}

		return $output;
	}
}
