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
 * The Query block.
 */
class GenerateBlocks_Block_Query extends GenerateBlocks_Block {

	const TYPE_WP_QUERY = 'WP_Query';
	const TYPE_INSTANT_PAGINATION = 'instant';

	/**
	 * Keep track of all blocks of this type on the page.
	 *
	 * @var array $block_ids The current block id.
	 */
	protected static $block_ids = [];

	/**
	 * Store our block name.
	 *
	 * @var string $block_name The block name.
	 */
	public static $block_name = 'generateblocks/query';

	/**
	 * Get the query data based on the type.
	 *
	 * @param string $query_type The type of query (WP_Query, post_meta, etc).
	 * @param array  $attributes Block attributes.
	 * @param object $block The block instance.
	 * @param int    $page The current query page.
	 * @return array Array of query data including the data for looping and no_results.
	 */
	public static function get_query_data( $query_type, $attributes, $block, $page ) {
		$original_args = $attributes['query'] ?? [];
		$query_data    = [
			'data'       => [],
			'no_results' => true,
			'args'       => $original_args,
		];

		if ( self::TYPE_WP_QUERY === $query_type ) {
			// Override the custom query with the global query if needed.
			$use_global_query = ( isset( $attributes['inheritQuery'] ) && $attributes['inheritQuery'] );

			if ( $use_global_query ) {
				global $wp_query;

				/*
				* If already in the main query loop, duplicate the query instance to not tamper with the main instance.
				* Since this is a nested query, it should start at the beginning, therefore rewind posts.
				* Otherwise, the main query loop has not started yet and this block is responsible for doing so.
				*/
				if ( in_the_loop() ) {
					$data = clone $wp_query;
					$data->rewind_posts();
				} else {
					$data = $wp_query;
				}

				$query_args = $data->query_vars;
			} else {
				$query_args = GenerateBlocks_Query_Utils::get_wp_query_args(
					$query_data['args'],
					$page,
					$attributes,
					$block
				);

				// Make the new WP_Query with filtered args.
				$data = new WP_Query( $query_args );
			}

			$query_data = [
				'data'       => $data,
				'no_results' => 0 === $data->found_posts,
				'args'       => $query_args,
			];
		}

		/**
		 * Modify the Query block's query data.
		 *
		 * @param array  $query_data The current query data.
		 * @param string $query_type The type of query.
		 * @param array  $attributes An array of block attributes.
		 * @param object $object The block instance.
		 * @param int    $page The current page number.
		 *
		 * @return array An array of query data.
		 */
		return apply_filters( 'generateblocks_query_data', $query_data, $query_type, $attributes, $block, $page );
	}

	/**
	 * Render the Query block.
	 *
	 * @param array  $attributes    The block attributes.
	 * @param string $block_content The block content.
	 * @param object $block         The block.
	 */
	public static function render_block( $attributes, $block_content, $block ) {
		$query_id           = isset( $attributes['uniqueId'] ) ? 'query-' . $attributes['uniqueId'] : 'query';
		$page_key           = $query_id . '-page';
		$page               = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ]; // phpcs:ignore -- No data processing happening.
		$pagination_type    = $attributes['paginationType'] ?? '';
		$instant_pagination = self::TYPE_INSTANT_PAGINATION === $pagination_type;
		$query_type         = $attributes['queryType'] ?? self::TYPE_WP_QUERY;
		$query_data         = self::get_query_data(
			$query_type,
			$attributes,
			$block,
			$page
		);

		if ( $instant_pagination ) {
			if ( ! wp_script_is( 'generateblocks-looper', 'enqueued' ) ) {
				$asset_info = generateblocks_get_enqueue_assets( 'generateblocks-looper' );

				wp_enqueue_script(
					'generateblocks-looper',
					GENERATEBLOCKS_DIR_URL . 'dist/looper.js',
					$asset_info['dependencies'],
					$asset_info['version'],
					true
				);
			}
		}

		$max_pages = $query_data['max_num_pages'] ?? $query_data['data']->max_num_pages ?? 0;

		$parsed_content = (
			new WP_Block(
				$block->parsed_block,
				array(
					'generateblocks/queryData' => [
						'id'             => $attributes['uniqueId'] ?? '',
						'noResults'      => $query_data['no_results'],
						'data'           => $query_data['data'],
						'args'           => $query_data['args'],
						'type'           => $query_type,
						'maxPages'       => $max_pages,
						'inherit'        => $attributes['inheritQuery'] ?? false,
						'paginationType' => $pagination_type,
					],
				)
			)
		)->render( array( 'dynamic' => false ) );

		if ( $instant_pagination && class_exists( 'WP_HTML_Tag_Processor' ) ) {
			$processor = new WP_HTML_Tag_Processor( $parsed_content );

			if ( $processor->next_tag( $attributes['tagName'] ) ) {
				$processor->set_attribute( 'data-gb-router-region', $query_id );
				$parsed_content = $processor->get_updated_html();
			}
		}

		// Add styles to this block if needed.
		$output = generateblocks_maybe_add_block_css(
			'',
			[
				'class_name' => __CLASS__,
				'attributes' => $attributes,
				'block_ids'  => self::$block_ids,
			]
		);

		$output .= $parsed_content;

		return $output;
	}
}
