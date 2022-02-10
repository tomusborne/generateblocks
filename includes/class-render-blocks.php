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
			'generateblocks/query-loop',
			array(
				'title' => esc_html__( 'Query loop', 'generateblocks' ),
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
	 * Output the query.
	 *
	 * @param array  $attributes The block attributes.
	 * @param string $content The inner blocks.
	 * @param object $block The block data.
	 */
	public function do_query_loop_block( $attributes, $content, $block ) {
		$query_attributes = is_array( $attributes[ 'query' ] ) ? $attributes[ 'query' ] : [];
		$query_args = self::map_post_type_attributes( $query_attributes );

		if ( isset( $query_args[ 'tax_query' ] ) ) {
			$query_args[ 'tax_query' ] = self::normalize_tax_query_attributes( $query_args['tax_query'] );
		}

		if ( isset( $query_args[ 'date_query_after' ] ) || isset( $query_args[ 'date_query_before' ] ) ) {
			$query_args[ 'date_query' ] = self::normalize_date_query_attributes(
				isset( $query_args[ 'date_query_after' ] ) ? $query_args[ 'date_query_after' ] : null,
				isset( $query_args[ 'date_query_before' ] ) ? $query_args[ 'date_query_before' ] : null
			);

			unset( $query_args[ 'date_query_after' ] );
			unset( $query_args[ 'date_query_before' ] );
		}

		if ( isset( $query_args[ 'sticky' ] ) ) {
			$sticky_posts = get_option( 'sticky_posts' );
			$query_args[ 'post__in' ] = $sticky_posts;
			unset( $query_args[ 'sticky' ] );
		}

		if ( isset( $query_args[ 'tax_query_exclude' ] ) ) {
			$not_in_tax_query = self::normalize_tax_query_attributes( $query_args['tax_query_exclude'], 'NOT IN' );
			$query_args[ 'tax_query' ] = isset( $query_args[ 'tax_query' ] )
				? array_merge( $query_args[ 'tax_query' ], $not_in_tax_query )
				: $not_in_tax_query;

			unset( $query_args[ 'tax_query_exclude' ] );
		}

		$the_query = new WP_Query( $query_args );

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

		$the_query->reset_postdata();

		return $content;
	}

	public static function map_post_type_attributes( $attributes ) {
		$attributes_map = array(
			'page'               => 'paged',
			'per_page'           => 'posts_per_page',
			'search'             => 's',
			'after'              => 'date_query_after',
			'before'             => 'date_query_before',
			'author'             => 'author__in',
			'exclude'            => 'post__not_in',
			'include'            => 'post__in',
			'order'              => 'order',
			'orderby'            => 'orderby',
			'status'             => 'post_status',
			'parent'             => 'post_parent__in',
			'parent_exclude'     => 'post_parent__not_in',
			'author_exclude'     => 'author__not_in',
		);

		return generateblocks_map_array_keys( $attributes, $attributes_map );
	}

	/**
	 * Normalize the tax query attributes to be used in the WP_Query
	 *
	 * @param $raw_tax_query
	 * @param string $operator
	 *
	 * @return array|array[]
	 */
	public static function normalize_tax_query_attributes( $raw_tax_query, $operator = 'IN' ) {
		return array_map( function( $tax ) use ( $operator ) {
			return [
				'taxonomy' => $tax[ 'taxonomy' ],
				'field'    => 'term_id',
				'terms'    => $tax[ 'terms' ],
				'operator' => $operator,
				'include_children' => false,
			];
		}, $raw_tax_query );
	}

	/**
	 * Normalize the date query attributes to be used in the WP_Query
	 *
	 * @param string|null $after The after date
	 * @param string|null $before The before date
	 *
	 * @return array
	 */
	public static function normalize_date_query_attributes( $after = null, $before = null ) {
		$result = [ 'inclusive' => true ];

		if ( generateblocks_is_valid_date( $after ) ) {
			$result[ 'after' ] = $after;
		}

		if ( generateblocks_is_valid_date( $before ) ) {
			$result[ 'before' ] = $before;
		}

		return $result;
	}

	/**
	 * Wrapper function for our dynamic headlines.
	 *
	 * @since 1.5.0
	 * @param array  $attributes The block attributes.
	 * @param string $content The dynamic text to display.
	 */
	public static function do_headline_block( $attributes, $content ) {
		if ( ! isset( $attributes['isDynamicContent'] ) || ! $attributes['isDynamicContent'] ) {
			return $content;
		}

		$dynamic_content = GenerateBlocks_Dynamic_Content::get_content( $attributes );

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

		if ( empty( $settings['icon'] ) ) {
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

		$icon_html = '';

		// Extract our icon from the static HTML.
		if ( $settings['hasIcon'] ) {
			$icon_html = generateblocks_get_static_icon_html( $content );

			if ( $icon_html ) {
				$output .= $icon_html;
				$output .= '<span class="gb-headline-text">';
			}
		}

		$dynamic_link = null;

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

GenerateBlocks_Render_Block::get_instance();
