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

	/**
	 * Keep track of all blocks of this type on the page.
	 *
	 * @var array $block_ids The current block id.
	 */
	protected static $block_ids = [];

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

				$data = $wp_query;
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
		$instant_pagination = $attributes['instantPagination'] ?? true;
		$query_type         = $attributes['queryType'] ?? self::TYPE_WP_QUERY;
		$query_data         = self::get_query_data(
			$query_type,
			$attributes,
			$block,
			$page
		);

		if ( $instant_pagination ) {
			if ( ! wp_script_is( 'generateblocks-looper', 'enqueued' ) ) {
				self::enqueue_assets();
			}
		}

		$parsed_content = (
			new WP_Block(
				$block->parsed_block,
				array(
					'generateblocks/noResults' => $query_data['no_results'],
					'generateblocks/queryData' => $query_data['data'],
					'generateblocks/query'     => $query_data['args'],
					'generateblocks/queryType' => $query_type,
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
