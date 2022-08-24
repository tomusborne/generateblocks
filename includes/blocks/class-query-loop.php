<?php
/**
 * Handles the Query Loop block.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Add Query Loop related functions.
 */
class GenerateBlocks_Block_Query_Loop {
	/**
	 * Wrapper function for our dynamic buttons.
	 *
	 * @since 1.6.0
	 * @param array    $attributes The block attributes.
	 * @param string   $content The dynamic text to display.
	 * @param WP_Block $block Block instance.
	 */
	public static function render_block( $attributes, $content, $block ) {
		$page_key = isset( $block->context['generateblocks/queryId'] ) ? 'query-' . $block->context['generateblocks/queryId'] . '-page' : 'query-page';
		$page     = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ]; // phpcs:ignore -- No data processing happening.
		$query_args = GenerateBlocks_Query_Loop::get_query_args( $block, $page );

		// Override the custom query with the global query if needed.
		$use_global_query = ( isset( $block->context['generateblocks/inheritQuery'] ) && $block->context['generateblocks/inheritQuery'] );

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

		wp_reset_postdata();

		return $content;
	}
}
