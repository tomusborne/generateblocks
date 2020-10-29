<?php
/**
 * General actions and filters.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Render the dynamic aspects of our blocks.
 *
 * @since 1.2.0
 */
class GenerateBlocks_Render_Block {
	/**
	 * Instance.
	 *
	 * @access private
	 * @var object Instance
	 * @since 0.1
	 */
	private static $instance;

	/**
	 * Initiator.
	 *
	 * @since 0.1
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
		add_action( 'init', array( $this, 'register_blocks' ) );
	}

	/**
	 * Register our dynamic blocks.
	 *
	 * @since 1.2.0
	 */
	public function register_blocks() {
		register_block_type(
			'generateblocks/container',
			array(
				'render_callback' => array( $this, 'do_container_block' ),
			),
		);

		register_block_type(
			'generateblocks/grid',
			array(
				'render_callback' => array( $this, 'do_grid_block' ),
			),
		);

		register_block_type(
			'generateblocks/button-container',
			array(
				'render_callback' => array( $this, 'do_button_container' ),
			),
		);
	}

	/**
	 * Output the dynamic aspects of our Container block.
	 *
	 * @since 1.2.0
	 * @param array  $attributes The block attributes.
	 * @param string $content The inner blocks.
	 */
	public function do_container_block( $attributes, $content ) {
		// Bail if our container has HTML markup.
		if (
			strpos( trim( $content ), '<div class="gb-grid-column' ) === 0 ||
			strpos( trim( $content ), '<div class="gb-container' ) === 0
		) {
			return $content;
		}

		$defaults = generateblocks_get_block_defaults();

		$settings = wp_parse_args(
			$attributes,
			$defaults['container']
		);

		// Bail if our container has HTML markup.
		if ( ! empty( $settings['elementId'] ) ) {
			$oldAnchor = $settings['elementId'];

			if ( strpos( trim( $content ), '<div id="' . $oldAnchor ) === 0 ) {
				return $content;
			}
		}

		$output = '';

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
					$settings
				),
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

		$tagName = apply_filters( 'generateblocks_container_tagname', $settings['tagName'], $attributes );

		$output .= sprintf(
			'<%1$s %2$s>',
			$tagName,
			generateblocks_attr(
				'container',
				array(
					'id' => isset( $settings['anchor'] ) ? $settings['anchor'] : null,
					'class' => implode( ' ', $classNames ),
				),
				$settings
			),
		);

		$output = apply_filters( 'generateblocks_after_container_open', $output, $attributes );
		$output .= '<div class="gb-inside-container">';
		$output = apply_filters( 'generateblocks_inside_container', $output, $attributes );
		$output .= $content;
		$output .= '</div>';
		$output = apply_filters( 'generateblocks_before_container_close', $output, $attributes );

		$output .= sprintf(
			'</%s>',
			$tagName
		);

		if ( $settings['isGrid'] ) {
			$output .= '</div>';
		}

		return $output;
	}

	/**
	 * Output the dynamic aspects of our Container block.
	 *
	 * @since 1.2.0
	 * @param array  $attributes The block attributes.
	 * @param string $content The inner blocks.
	 */
	public function do_grid_block( $attributes, $content ) {
		if ( strpos( trim( $content ), '<div class="gb-grid-wrapper' ) === 0 ) {
			return $content;
		}

		$defaults = generateblocks_get_block_defaults();

		$settings = wp_parse_args(
			$attributes,
			$defaults['gridContainer']
		);

		// Bail if our container has HTML markup.
		if ( ! empty( $settings['elementId'] ) ) {
			$oldAnchor = $settings['elementId'];

			if ( strpos( trim( $content ), '<div id="' . $oldAnchor ) === 0 ) {
				return $content;
			}
		}

		$classNames = array(
			'gb-grid-wrapper',
			'gb-grid-wrapper-' . $settings['uniqueId'],
		);

		if ( ! empty( $settings['className'] ) ) {
			$classNames[] = $settings['className'];
		}

		$output = sprintf(
			'<div %s>',
			generateblocks_attr(
				'grid-wrapper',
				array(
					'id' => isset( $settings['anchor'] ) ? $settings['anchor'] : null,
					'class' => implode( ' ', $classNames ),
				),
				$settings
			),
		);

		$output .= $content;

		$output .= '</div>';

		return $output;
	}

	/**
	 * Output the dynamic aspects of our Container block.
	 *
	 * @since 1.2.0
	 * @param array  $attributes The block attributes.
	 * @param string $content The inner blocks.
	 */
	public function do_button_container( $attributes, $content ) {
		if ( strpos( trim( $content ), '<div class="gb-button-wrapper' ) === 0 ) {
			return $content;
		}

		$defaults = generateblocks_get_block_defaults();

		$settings = wp_parse_args(
			$attributes,
			$defaults['buttonContainer']
		);

		// Bail if our container has HTML markup.
		if ( ! empty( $settings['elementId'] ) ) {
			$oldAnchor = $settings['elementId'];

			if ( strpos( trim( $content ), '<div id="' . $oldAnchor ) === 0 ) {
				return $content;
			}
		}

		$classNames = array(
			'gb-button-wrapper',
			'gb-button-wrapper-' . $settings['uniqueId'],
		);

		if ( ! empty( $settings['className'] ) ) {
			$classNames[] = $settings['className'];
		}

		$output = sprintf(
			'<div %s>',
			generateblocks_attr(
				'button-container',
				array(
					'id' => isset( $settings['anchor'] ) ? $settings['anchor'] : null,
					'class' => implode( ' ', $classNames ),
				),
				$settings
			),
		);

		$output .= $content;

		$output .= '</div>';

		return $output;
	}
}

GenerateBlocks_Render_Block::get_instance();
