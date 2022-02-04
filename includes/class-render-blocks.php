<?php
/**
 * This file handles the dynamic parts of our blocks.
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
				'title' => esc_html__( 'Container', 'generateblocks' ),
				'render_callback' => array( $this, 'do_container_block' ),
				'editor_script' => 'generateblocks',
				'editor_style' => 'generateblocks',
			)
		);

		register_block_type(
			'generateblocks/grid',
			array(
				'title' => esc_html__( 'Grid', 'generateblocks' ),
				'render_callback' => array( $this, 'do_grid_block' ),
			)
		);

		register_block_type(
			'generateblocks/button-container',
			array(
				'title' => esc_html__( 'Buttons', 'generateblocks' ),
				'render_callback' => array( $this, 'do_button_container' ),
			)
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
		if ( ! isset( $attributes['isDynamic'] ) || ! $attributes['isDynamic'] ) {
			return $content;
		}

		$defaults = generateblocks_get_block_defaults();

		$settings = wp_parse_args(
			$attributes,
			$defaults['container']
		);

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

		$tagName = apply_filters( 'generateblocks_container_tagname', $settings['tagName'], $attributes );

		$allowedTagNames = apply_filters(
			'generateblocks_container_allowed_tagnames',
			array(
				'div',
				'section',
				'header',
				'footer',
				'aside',
				'a',
			),
			$attributes
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
				$settings
			)
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
	 * Output the dynamic aspects of our Grid block.
	 *
	 * @since 1.2.0
	 * @param array  $attributes The block attributes.
	 * @param string $content The inner blocks.
	 */
	public function do_grid_block( $attributes, $content ) {
		if ( ! isset( $attributes['isDynamic'] ) || ! $attributes['isDynamic'] ) {
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

		$output = sprintf(
			'<div %s>',
			generateblocks_attr(
				'grid-wrapper',
				array(
					'id' => isset( $settings['anchor'] ) ? $settings['anchor'] : null,
					'class' => implode( ' ', $classNames ),
				),
				$settings
			)
		);

		$output .= $content;

		$output .= '</div>';

		return $output;
	}

	/**
	 * Output the dynamic aspects of our Button Container block.
	 *
	 * @since 1.2.0
	 * @param array  $attributes The block attributes.
	 * @param string $content The inner blocks.
	 */
	public function do_button_container( $attributes, $content ) {
		if ( ! isset( $attributes['isDynamic'] ) || ! $attributes['isDynamic'] ) {
			return $content;
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

		$output = sprintf(
			'<div %s>',
			generateblocks_attr(
				'button-container',
				array(
					'id' => isset( $settings['anchor'] ) ? $settings['anchor'] : null,
					'class' => implode( ' ', $classNames ),
				),
				$settings
			)
		);

		$output .= $content;

		$output .= '</div>';

		return $output;
	}
}

GenerateBlocks_Render_Block::get_instance();
