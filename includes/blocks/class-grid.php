<?php
/**
 * Handles the Grid block.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Add Grid related functions.
 */
class GenerateBlocks_Block_Grid {
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
			'useLegacyRowGap' => false,
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
		if ( ! self::$singular_css_added ) {
			$css->set_selector( '.gb-grid-wrapper' );
			$css->add_property( 'display', 'flex' );
			$css->add_property( 'flex-wrap', 'wrap' );

			$css->set_selector( '.gb-grid-column' );
			$css->add_property( 'box-sizing', 'border-box' );

			$css->set_selector( '.gb-grid-wrapper .wp-block-image' );
			$css->add_property( 'margin-bottom', '0' );

			do_action(
				'generateblocks_block_one_time_css_data',
				'grid',
				$settings,
				$css
			);

			self::$singular_css_added = true;
		}

		$css->set_selector( '.gb-grid-wrapper-' . $id );
		$css->add_property( 'align-items', $settings['verticalAlignment'] );
		$css->add_property( 'justify-content', $settings['horizontalAlignment'] );

		if ( $blockVersion > 2 && ! $settings['useLegacyRowGap'] ) {
			$css->add_property( 'row-gap', $settings['verticalGap'], 'px' );
		}

		if ( $settings['horizontalGap'] ) {
			$css->add_property( 'margin-' . $gap_direction, '-' . $settings['horizontalGap'] . 'px' );
		}

		$css->set_selector( '.gb-grid-wrapper-' . $id . ' > .gb-grid-column' );
		$css->add_property( 'padding-' . $gap_direction, $settings['horizontalGap'], 'px' );

		if ( $blockVersion < 3 || $settings['useLegacyRowGap'] ) {
			$css->add_property( 'padding-bottom', $settings['verticalGap'], 'px' );
		}

		$tablet_css->set_selector( '.gb-grid-wrapper-' . $id );

		if ( $blockVersion > 2 && ! $settings['useLegacyRowGap'] ) {
			$tablet_css->add_property( 'row-gap', $settings['verticalGapTablet'], 'px' );
		}

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

		if ( $blockVersion < 3 || $settings['useLegacyRowGap'] ) {
			$tablet_css->add_property( 'padding-bottom', $settings['verticalGapTablet'], 'px' );
		}

		$mobile_css->set_selector( '.gb-grid-wrapper-' . $id );

		if ( $blockVersion > 2 && ! $settings['useLegacyRowGap'] ) {
			$mobile_css->add_property( 'row-gap', $settings['verticalGapMobile'], 'px' );
		}

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

		if ( $blockVersion < 3 || $settings['useLegacyRowGap'] ) {
			$mobile_css->add_property( 'padding-bottom', $settings['verticalGapMobile'], 'px' );
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
					'class_name' => 'GenerateBlocks_Block_Grid',
					'attributes' => $attributes,
					'block_ids' => self::$block_ids,
				]
			);

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

		// Add styles to this block if needed.
		$output = generateblocks_maybe_add_block_css(
			'',
			[
				'class_name' => 'GenerateBlocks_Block_Grid',
				'attributes' => $attributes,
				'block_ids' => self::$block_ids,
			]
		);

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
