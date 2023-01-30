<?php
/**
 * Handles the Button Container block.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Add Button Container related functions.
 */
class GenerateBlocks_Block_Button_Container {
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
			'alignment' => '',
			'alignmentTablet' => '',
			'alignmentMobile' => '',
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
			'stack' => false,
			'stackTablet' => false,
			'stackMobile' => false,
			'fillHorizontalSpace' => false,
			'fillHorizontalSpaceTablet' => false,
			'fillHorizontalSpaceMobile' => false,
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
			$defaults['buttonContainer']
		);

		$id = $attributes['uniqueId'];
		$blockVersion = ! empty( $settings['blockVersion'] ) ? $settings['blockVersion'] : 1;

		// Only add this CSS once.
		if ( ! self::$singular_css_added ) {
			$css->set_selector( '.gb-button-wrapper' );
			$css->add_property( 'display', 'flex' );
			$css->add_property( 'flex-wrap', 'wrap' );
			$css->add_property( 'align-items', 'flex-start' );
			$css->add_property( 'justify-content', 'flex-start' );
			$css->add_property( 'clear', 'both' );

			do_action(
				'generateblocks_block_one_time_css_data',
				'button-container',
				$settings,
				$css
			);

			self::$singular_css_added = true;
		}

		$css->set_selector( '.gb-button-wrapper-' . $id );
		$css->add_property( 'margin', array( $settings['marginTop'], $settings['marginRight'], $settings['marginBottom'], $settings['marginLeft'] ), $settings['marginUnit'] );
		$css->add_property( 'justify-content', generateblocks_get_flexbox_alignment( $settings['alignment'] ) );

		$stack_desktop = $desktop_css;
		$stack_tablet_only = $tablet_only_css;

		if ( $blockVersion < 2 ) {
			$stack_desktop = $css;
			$stack_tablet_only = $tablet_css;
		}

		if ( $settings['stack'] ) {
			$stack_desktop->set_selector( '.gb-button-wrapper-' . $id );
			$stack_desktop->add_property( 'flex-direction', 'column' );
			$stack_desktop->add_property( 'align-items', generateblocks_get_flexbox_alignment( $settings['alignment'] ) );
		}

		if ( $settings['fillHorizontalSpace'] ) {
			$stack_desktop->set_selector( '.gb-button-wrapper-' . $id . ' > .gb-button' );
			$stack_desktop->add_property( 'flex', '1' );
		}

		if ( $settings['stack'] && $settings['fillHorizontalSpace'] ) {
			$stack_desktop->add_property( 'width', '100%' );
			$stack_desktop->add_property( 'box-sizing', 'border-box' );
		}

		$tablet_css->set_selector( '.gb-button-wrapper-' . $id );
		$tablet_css->add_property( 'margin', array( $settings['marginTopTablet'], $settings['marginRightTablet'], $settings['marginBottomTablet'], $settings['marginLeftTablet'] ), $settings['marginUnit'] );
		$tablet_css->add_property( 'justify-content', generateblocks_get_flexbox_alignment( $settings['alignmentTablet'] ) );

		if ( $settings['stackTablet'] ) {
			$stack_tablet_only->set_selector( '.gb-button-wrapper-' . $id );
			$stack_tablet_only->add_property( 'flex-direction', 'column' );
			$stack_tablet_only->add_property( 'align-items', generateblocks_get_flexbox_alignment( $settings['alignmentTablet'] ) );
		}

		if ( $settings['fillHorizontalSpaceTablet'] ) {
			$stack_tablet_only->set_selector( '.gb-button-wrapper-' . $id . ' > .gb-button' );
			$stack_tablet_only->add_property( 'flex', '1' );
		}

		if ( $settings['stackTablet'] && $settings['fillHorizontalSpaceTablet'] ) {
			$stack_tablet_only->add_property( 'width', '100%' );
			$stack_tablet_only->add_property( 'box-sizing', 'border-box' );
		}

		$mobile_css->set_selector( '.gb-button-wrapper-' . $id );
		$mobile_css->add_property( 'margin', array( $settings['marginTopMobile'], $settings['marginRightMobile'], $settings['marginBottomMobile'], $settings['marginLeftMobile'] ), $settings['marginUnit'] );
		$mobile_css->add_property( 'justify-content', generateblocks_get_flexbox_alignment( $settings['alignmentMobile'] ) );

		if ( $settings['stackMobile'] ) {
			$mobile_css->add_property( 'flex-direction', 'column' );
			$mobile_css->add_property( 'align-items', generateblocks_get_flexbox_alignment( $settings['alignmentMobile'] ) );
		}

		if ( $settings['fillHorizontalSpaceMobile'] ) {
			$mobile_css->set_selector( '.gb-button-wrapper-' . $id . ' > .gb-button' );
			$mobile_css->add_property( 'flex', '1' );
		}

		if ( $settings['stackMobile'] && $settings['fillHorizontalSpaceMobile'] ) {
			$mobile_css->add_property( 'width', '100%' );
			$mobile_css->add_property( 'box-sizing', 'border-box' );
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
			'button-container',
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
					'class_name' => 'GenerateBlocks_Block_Button_Container',
					'attributes' => $attributes,
					'block_ids' => self::$block_ids,
				]
			);

			return $content;
		}

		if ( isset( $block->parsed_block['innerBlocks'] ) ) {
			$button_count = apply_filters(
				'generateblocks_button_count',
				count( (array) $block->parsed_block['innerBlocks'] ),
				$attributes,
				$block
			);

			if ( 0 === $button_count ) {
				return;
			}
		}

		$defaults = generateblocks_get_block_defaults();

		$settings = wp_parse_args(
			$attributes,
			$defaults['buttonContainer']
		);

		$classNames = array(
			'gb-button-wrapper',
			'gb-button-wrapper-' . $settings['uniqueId'],
		);

		if ( ! empty( $settings['className'] ) ) {
			$classNames[] = $settings['className'];
		}

		// Add styles to this block if needed.
		$output = generateblocks_maybe_add_block_css(
			'',
			[
				'class_name' => 'GenerateBlocks_Block_Button_Container',
				'attributes' => $attributes,
				'block_ids' => self::$block_ids,
			]
		);

		$output .= sprintf(
			'<div %s>',
			generateblocks_attr(
				'button-container',
				array(
					'id' => isset( $settings['anchor'] ) ? $settings['anchor'] : null,
					'class' => implode( ' ', $classNames ),
				),
				$settings,
				$block
			)
		);

		$output .= $content;

		$output .= '</div>';

		return $output;
	}
}
