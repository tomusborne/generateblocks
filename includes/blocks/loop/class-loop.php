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
class GenerateBlocks_Block_Loop {
	/**
	 * Wrapper function for our dynamic buttons.
	 *
	 * @since 1.6.0
	 * @param array    $attributes The block attributes.
	 * @param string   $content The dynamic text to display.
	 * @param WP_Block $block Block instance.
	 */
	public static function render_block( $attributes, $content, $block ) {
		$page_key = isset( $attributes['uniqueId'] ) ? 'query-' . $attributes['uniqueId'] . '-page' : 'query-page';
		$page     = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ]; // phpcs:ignore -- No data processing happening.
		$query_args = GenerateBlocks_Loop_Utils::get_query_args( $block, $page );

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

		$query_type = 'WP_Query';
		$the_query = new WP_Query( $query_args );

		return (
			new WP_Block(
				$block->parsed_block,
				array(
					'generateblocks/query_type' => $query_type,
					'generateblocks/query'      => $the_query,
					'generateblocks/query_args' => $query_args,
				)
			)
		)->render( array( 'dynamic' => false ) );
	}

	public static function render_repeater( $attributes, $content, $block ) {
		$query_args = $block->context['generateblocks/query_args'];
		global $post; // Needed for setup_postdata() to work.
		$posts = get_posts( $query_args );

		$content = '';
		foreach( $posts as $post ) {
			setup_postdata( $post );

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

		wp_reset_postdata();

		return $content;
	}
}
