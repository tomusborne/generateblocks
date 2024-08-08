<?php
/**
 * Handles the Element block.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * The Element block.
 */
class GenerateBlocks_Block_Query extends GenerateBlocks_Block {
	/**
	 * Keep track of all blocks of this type on the page.
	 *
	 * @var array $block_ids The current block id.
	 */
	protected static $block_ids = [];

	/**
	 * Render the Query block.
	 *
	 * @param array  $attributes    The block attributes.
	 * @param string $block_content The block content.
	 * @param array  $block         The block.
	 */
	public static function render_block( $attributes, $block_content, $block ) {
		$query_id     = isset( $attributes['uniqueId'] ) ? 'query-' . $attributes['uniqueId'] : 'query';
		$page_key     = $query_id . '-page';
		$page         = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ]; // phpcs:ignore -- No data processing happening.
		$query_args   = GenerateBlocks_Query_Utils::get_query_args( $block, $page );
		$force_reload = $attributes['forceReload'] ?? true;
		$query_type   = $attributes['queryType'] ?? 'WP_Query';

		// Override the custom query with the global query if needed.
		$use_global_query = ( isset( $attributes['inheritQuery'] ) && $attributes['inheritQuery'] );

		if ( $use_global_query ) {
			global $wp_query;

			if ( $wp_query && isset( $wp_query->query_vars ) && is_array( $wp_query->query_vars ) ) {
				// Unset `offset` because if is set, $wp_query overrides/ignores the paged parameter and breaks pagination.
				unset( $query_args['offset'] );
				$query_args = wp_parse_args( $wp_query->query_vars, $query_args );

				if ( empty( $query_args['post_type'] ) && is_singular() ) {
					$query_args['post_type'] = get_post_type( get_the_ID() );
				}
			}
		}

		$query_args = apply_filters(
			'generateblocks_query_loop_args',
			$query_args,
			$attributes,
			$block
		);

		$the_query = new WP_Query( $query_args );

		if ( false === $force_reload ) {
			if ( ! wp_script_is( 'generateblocks-looper', 'enqueued' ) ) {
				self::enqueue_assets();
			}
		}

		$classes = [];

		if ( isset( $attributes['className'] ) ) {
			$classes[] = $attributes['className'];
		}

		if ( ! empty( $attributes['globalClasses'] ) ) {
			$classes = array_merge( $classes, $attributes['globalClasses'] );
		}

		$unique_id = $attributes['uniqueId'] ?? '';

		if ( $unique_id && ! empty( $attributes['css'] ) ) {
			$classes[] = 'gb-query-' . $unique_id;
		}

		$tag_name = $attributes['tagName'] ?? 'div';

		$parsed_content = (
			new WP_Block(
				$block->parsed_block,
				array(
					'generateblocks/noResults' => 0 === $the_query->found_posts,
					'generateblocks/queryData' => $the_query,
					'generateblocks/query'     => $query_args,
					'generateblocks/queryType' => $query_type,
				)
			)
		)->render( array( 'dynamic' => false ) );

		$html_attributes = generateblocks_with_html_attributes(
			[
				'id'                    => $attributes['anchor'] ?? null,
				'class'                 => implode( ' ', $classes ),
				'data-gb-router-region' => false === $force_reload ? $query_id : null,
			],
			$attributes
		);

		$output = sprintf(
			'<%1$s %2$s>%3$s</%1$s>',
			$tag_name,
			generateblocks_attr(
				'query',
				$html_attributes,
				$attributes,
				$block
			),
			$parsed_content
		);

		// Add styles to this block if needed.
		$output = generateblocks_maybe_add_block_css(
			$output,
			[
				'class_name' => __CLASS__,
				'attributes' => $attributes,
				'block_ids' => self::$block_ids,
			]
		);

		return $output;
	}

	/**
	 * Enqueue block scripts.
	 */
	private static function enqueue_scripts() {
		$asset_info = generateblocks_get_enqueue_assets( 'generateblocks-looper' );

		wp_enqueue_script(
			'generateblocks-looper',
			GENERATEBLOCKS_DIR_URL . 'dist/looper.js',
			$asset_info['dependencies'],
			$asset_info['version'],
			true
		);
	}

	/**
	 * Enqueue block assets.
	 */
	public static function enqueue_assets() {
		self::enqueue_scripts();
	}
}
