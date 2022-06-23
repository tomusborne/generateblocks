<?php
/**
 * Handles option changes on plugin updates.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Process option updates if necessary.
 */
class GenerateBlocks_Block_Grid {
	/**
	 * Keep track of all blocks of this type on the page.
	 *
	 * @var array $block_ids The current block id.
	 */
	private static $block_ids = [];

	/**
	 * Block defaults.
	 */
	public static function defaults() {
		return [
			'horizontalGap' => '',
			'verticalGap' => '',
			'verticalAlignment' => '',
			'horizontalGapTablet' => '',
			'verticalGapTablet' => '',
			'verticalAlignmentTablet' => 'inherit',
			'horizontalGapMobile' => '',
			'verticalGapMobile' => '',
			'verticalAlignmentMobile' => 'inherit',
			'horizontalAlignment' => '',
			'horizontalAlignmentTablet' => '',
			'horizontalAlignmentMobile' => '',
		];
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
			$defaults['gridContainer']
		);

		$id = $attributes['uniqueId'];
		$blockVersion = ! empty( $settings['blockVersion'] ) ? $settings['blockVersion'] : 1;

		// Use legacy settings if needed.
		if ( $blockVersion < 2 ) {
			$settings = GenerateBlocks_Legacy_Attributes::get_settings( '1.4.0', 'grid', $settings, $attributes );
		}

		$gap_direction = 'left';

		if ( is_rtl() ) {
			$gap_direction = 'right';
		}

		// Don't output horizontal gap defaults if we're using global styles.
		if ( $blockVersion < 2 && isset( $settings['useGlobalStyle'] ) && $settings['useGlobalStyle'] && isset( $settings['globalStyleId'] ) && $settings['globalStyleId'] ) {
			if ( (string) $settings['horizontalGap'] === (string) $defaults['gridContainer']['horizontalGap'] ) {
				$settings['horizontalGap'] = '';
			}
		}

		// Only add this CSS once.
		if ( count( (array) self::$block_ids ) === 0 ) {
			$css->set_selector( '.gb-grid-wrapper' );
			$css->add_property( 'display', 'flex' );
			$css->add_property( 'flex-wrap', 'wrap' );

			$css->set_selector( '.gb-grid-wrapper > .gb-grid-column > .gb-container' );
			$css->add_property( 'display', 'flex' );
			$css->add_property( 'flex-direction', 'column' );
			$css->add_property( 'height', '100%' );

			$css->set_selector( '.gb-grid-column' );
			$css->add_property( 'box-sizing', 'border-box' );

			$css->set_selector( '.gb-grid-wrapper .wp-block-image' );
			$css->add_property( 'margin-bottom', '0' );
		}

		self::$block_ids[] = $id;

		$css->set_selector( '.gb-grid-wrapper-' . $id );
		$css->add_property( 'align-items', $settings['verticalAlignment'] );
		$css->add_property( 'justify-content', $settings['horizontalAlignment'] );

		if ( $settings['horizontalGap'] ) {
			$css->add_property( 'margin-' . $gap_direction, '-' . $settings['horizontalGap'] . 'px' );
		}

		$css->set_selector( '.gb-grid-wrapper-' . $id . ' > .gb-grid-column' );
		$css->add_property( 'padding-' . $gap_direction, $settings['horizontalGap'], 'px' );
		$css->add_property( 'padding-bottom', $settings['verticalGap'], 'px' );

		$tablet_css->set_selector( '.gb-grid-wrapper-' . $id );

		if ( 'inherit' !== $settings['verticalAlignmentTablet'] ) {
			$tablet_css->add_property( 'align-items', $settings['verticalAlignmentTablet'] );
		}

		if ( 'inherit' !== $settings['horizontalAlignmentTablet'] ) {
			$tablet_css->add_property( 'justify-content', $settings['horizontalAlignmentTablet'] );
		}

		if ( $settings['horizontalGapTablet'] ) {
			$tablet_css->add_property( 'margin-' . $gap_direction, '-' . $settings['horizontalGapTablet'] . 'px' );
		} elseif ( 0 === $settings['horizontalGapTablet'] ) {
			$tablet_css->add_property( 'margin-' . $gap_direction, $settings['horizontalGapTablet'] );
		}

		$tablet_css->set_selector( '.gb-grid-wrapper-' . $id . ' > .gb-grid-column' );
		$tablet_css->add_property( 'padding-' . $gap_direction, $settings['horizontalGapTablet'], 'px' );
		$tablet_css->add_property( 'padding-bottom', $settings['verticalGapTablet'], 'px' );

		$mobile_css->set_selector( '.gb-grid-wrapper-' . $id );

		if ( 'inherit' !== $settings['verticalAlignmentMobile'] ) {
			$mobile_css->add_property( 'align-items', $settings['verticalAlignmentMobile'] );
		}

		if ( 'inherit' !== $settings['horizontalAlignmentMobile'] ) {
			$mobile_css->add_property( 'justify-content', $settings['horizontalAlignmentMobile'] );
		}

		if ( $settings['horizontalGapMobile'] ) {
			$mobile_css->add_property( 'margin-' . $gap_direction, '-' . $settings['horizontalGapMobile'] . 'px' );
		} elseif ( 0 === $settings['horizontalGapMobile'] ) {
			$mobile_css->add_property( 'margin-' . $gap_direction, $settings['horizontalGapMobile'] );
		}

		$mobile_css->set_selector( '.gb-grid-wrapper-' . $id . ' > .gb-grid-column' );
		$mobile_css->add_property( 'padding-' . $gap_direction, $settings['horizontalGapMobile'], 'px' );
		$mobile_css->add_property( 'padding-bottom', $settings['verticalGapMobile'], 'px' );

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
			'grid',
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
	 * @since 1.5.0
	 * @param array    $attributes The block attributes.
	 * @param string   $content The dynamic text to display.
	 * @param WP_Block $block Block instance.
	 */
	public static function render_block( $attributes, $content, $block ) {
		if ( ! isset( $attributes['isDynamic'] ) || ! $attributes['isDynamic'] ) {
			if ( ! in_array( $attributes['uniqueId'], self::$block_ids ) ) {
				// Build our CSS for this block.
				$content = generateblocks_do_inline_css_output(
					$content,
					self::get_css_data( $attributes )
				);
			}

			return $content;
		}

		$defaults = generateblocks_get_block_defaults();

		$settings = wp_parse_args(
			$attributes,
			$defaults['gridContainer']
		);

		$classNames = array(
			'gb-grid-wrapper',
			'gb-grid-wrapper-' . $settings['uniqueId'],
		);

		if ( ! empty( $settings['className'] ) ) {
			$classNames[] = $settings['className'];
		}

		$output = '';

		if ( ! in_array( $attributes['uniqueId'], self::$block_ids ) ) {
			// Build our CSS for this block.
			$output .= generateblocks_do_inline_css_output(
				'',
				self::get_css_data( $attributes )
			);
		}

		$output .= sprintf(
			'<div %s>',
			generateblocks_attr(
				'grid-wrapper',
				array(
					'id' => isset( $settings['anchor'] ) ? $settings['anchor'] : null,
					'class' => implode( ' ', $classNames ),
				),
				$settings,
				$block
			)
		);

		if ( empty( $attributes['isQueryLoop'] ) ) {
			$output .= $content;
		} else {
			$output .= GenerateBlocks_Block_Query_Loop::render_block( $attributes, $content, $block );
		}

		$output .= '</div>';

		return $output;
	}
}
