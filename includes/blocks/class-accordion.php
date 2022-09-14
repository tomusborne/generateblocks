<?php
/**
 * This file handles the Query Loop functions.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Query Loop functions.
 *
 * @since 1.7.0
 */
class GenerateBlocks_Accordion_Variant {
	/**
	 * Instance.
	 *
	 * @access private
	 * @var object Instance
	 * @since 1.2.0
	 */
	private static $instance;

	/**
	 * Initiator.
	 *
	 * @since 1.2.0
	 * @return object initialized object of class.
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_filter( 'generateblocks_defaults', [ $this, 'set_defaults' ] );
		add_filter( 'generateblocks_after_container_open', [ $this, 'enqueue_scripts' ], 10, 2 );
		add_filter( 'generateblocks_attr_container', [ $this, 'set_container_attributes' ], 10, 2 );
		add_filter( 'generateblocks_attr_dynamic-button', [ $this, 'set_button_attributes' ], 10, 2 );
		add_filter( 'generateblocks_dynamic_button_tagname', [ $this, 'set_button_tagname' ], 10, 2 );
		add_action( 'generateblocks_block_one_time_css_data', [ $this, 'generate_css' ], 10, 3 );
		add_filter( 'generateblocks_before_container_open', [ $this, 'open_accordion_content_container' ], 1, 2 );
		add_filter( 'generateblocks_after_container_close', [ $this, 'close_accordion_content_container' ], 100, 2 );
	}

	public function set_defaults( $defaults ) {
		$defaults['container']['accordionContainer'] = false;
		$defaults['container']['accordionItem'] = false;
		$defaults['container']['accordionItemOpen'] = false;
		$defaults['container']['accordionContent'] = false;
		$defaults['container']['accordionMultipleOpen'] = false;

		return $defaults;
	}

	public function enqueue_scripts( $content, $attributes ) {
		if ( ! empty( $attributes['accordionContainer'] ) ) {
			wp_enqueue_script(
				'generateblocks-accordion',
				GENERATEBLOCKS_DIR_URL . 'dist/accordion.js',
				array(),
				GENERATEBLOCKS_VERSION,
				true
			);
		}

		return $content;
	}

	public function set_container_attributes( $attributes, $settings ) {
		if ( $settings['accordionContainer'] ) {
			$attributes['class'] .= ' gb-accordion';

			if ( $settings['accordionMultipleOpen'] ) {
				$attributes['data-accordion-multiple-open'] = true;
			}
		}

		if ( $settings['accordionItem'] ) {
			$attributes['class'] .= ' gb-accordion__item';

			if ( $settings['accordionItemOpen'] ) {
				$attributes['class'] .= ' gb-accordion__item-open';
			}
		}

		return $attributes;
	}

	public function set_button_attributes( $attributes, $settings ) {
		if ( $settings['accordionToggle'] ) {
			$attributes['class'] .= ' gb-accordion__toggle';
		}

		return $attributes;
	}

	public function set_button_tagname( $tagName, $attributes ) {
		if ( ! empty( $attributes['accordionToggle'] ) ) {
			return 'button';
		}

		return $tagName;
	}

	public function generate_css( $name, $settings, $css ) {
		if ( 'container' === $name ) {
			$css->set_selector( '.gb-accordion__item > .gb-accordion__content' );
			$css->add_property( 'transition', 'max-height 250ms ease' );
			$css->add_property( 'will-change', 'max-height, margin, border' );
			$css->add_property( 'max-height', 0 );
			$css->add_property( 'overflow', 'hidden' );

			$css->set_selector( '.gb-accordion__item.gb-accordion__item-open > .gb-accordion__content' );
			$css->add_property( 'max-height', 'inherit' );

			$css->set_selector( 'button.gb-accordion__toggle' );
			$css->add_property( 'background', 'none' );
			$css->add_property( 'border', 'none' );
			$css->add_property( 'color', 'inherit' );
			$css->add_property( 'font', 'inherit' );
			$css->add_property( 'padding', 0 );
			$css->add_property( 'margin', 0 );

			$css->set_selector( '.gb-accordion__item:not(.gb-accordion__item-open) > .gb-button-wrapper .gb-accordion__icon-open' );
			$css->add_property( 'display', 'none' );

			$css->set_selector( '.gb-accordion__item.gb-accordion__item-open > .gb-button-wrapper .gb-accordion__icon' );
			$css->add_property( 'display', 'none' );
		}
	}

	public function open_accordion_content_container( $content, $attributes ) {
		if ( ! empty( $attributes['accordionContent'] ) ) {
			$content = '<div class="gb-accordion__content">' . $content;
		}

		return $content;
	}

	public function close_accordion_content_container( $content, $attributes ) {
		if ( ! empty( $attributes['accordionContent'] ) ) {
			$content .= '</div>';
		}

		return $content;
	}
}

GenerateBlocks_Accordion_Variant::get_instance();
