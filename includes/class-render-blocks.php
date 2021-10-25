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

		register_block_type(
			'generateblocks/headline',
			array(
				'title' => esc_html__( 'Headline', 'generateblocks' ),
				'render_callback' => array( $this, 'do_headline_block' ),
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
	 * @param object $block The block data.
	 */
	public function do_grid_block( $attributes, $content, $block ) {
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

		if ( empty( $attributes['isQueryLoop'] ) ) {
			$output .= $content;
		} else {
			$output .= $this->do_query_loop_block( $attributes, $content, $block );
		}

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

	/**
	 * Wrapper function for our dynamic headlines.
	 *
	 * @since 1.5.0
	 * @param array  $attributes The block attributes.
	 * @param string $content The dynamic text to display.
	 */
	public static function do_headline_block( $attributes, $content ) {
		if ( ! isset( $attributes['hasDynamicContent'] ) || ! $attributes['hasDynamicContent'] ) {
			return $content;
		}

		$dynamic_content = GenerateBlocks_Dynamic_Data::get_content( $attributes );

		if ( ! $dynamic_content ) {
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

		if ( empty( $settings['dynamicIcon'] ) ) {
			$classNames[] = 'gb-headline-text';
		}

		$tagName = apply_filters( 'generateblocks_dynamic_headline_tagname', $settings['element'], $attributes );

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
			),
			$attributes
		);

		if ( ! in_array( $tagName, $allowedTagNames ) ) {
			$tagName = 'div';
		}

		$output = sprintf(
			'<%1$s %2$s>',
			$tagName,
			generateblocks_attr(
				'dynamic-headline',
				array(
					'id' => isset( $settings['anchor'] ) ? $settings['anchor'] : null,
					'class' => implode( ' ', $classNames ),
				),
				$settings
			)
		);

		if ( ! empty( $settings['dynamicIcon'] ) ) {
			$output .= sprintf(
				'<span class="gb-icon">%s</span>',
				$settings['dynamicIcon']
			);

			$output .= '<span class="gb-headline-text">';
		}

		$dynamic_link = GenerateBlocks_Dynamic_Data::get_dynamic_url( $attributes );

		if ( $dynamic_link ) {
			$dynamic_content = sprintf(
				'<a href="%s">%s</a>',
				$dynamic_link,
				$dynamic_content
			);
		}

		$output .= $dynamic_content;

		if ( ! empty( $settings['dynamicIcon'] ) ) {
			$output .= '</span>';
		}

		$output .= sprintf(
			'</%s>',
			$tagName
		);

		return $output;
	}

	/**
	 * Output the query.
	 *
	 * @param array  $attributes The block attributes.
	 * @param string $content The inner blocks.
	 * @param object $block The block data.
	 */
	public function do_query_loop_block( $attributes, $content, $block ) {
		$the_query = new WP_Query(
			array(
				'post_type' => 'post',
				'posts_per_page' => 10,
			)
		);

		$content = '';
		if ( $the_query->have_posts() ) {
			while ( $the_query->have_posts() ) {
				$the_query->the_post();

				$block_content = (
					new WP_Block(
						$block->parsed_block,
						array(
							'postType' => get_post_type(),
							'postId'   => get_the_ID(),
						)
					)
				)->render( array( 'dynamic' => false ) );

				$content .= $block_content;
			}
		}

		return $content;
	}
}

GenerateBlocks_Render_Block::get_instance();
