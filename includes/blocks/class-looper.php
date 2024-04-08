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
class GenerateBlocks_Block_Looper {
	/**
	 * Render the Looper block.
	 *
	 * @since 1.6.0
	 * @param array    $attributes The block attributes.
	 * @param string   $content The dynamic text to display.
	 * @param WP_Block $block Block instance.
	 */
	public static function render_block( $attributes, $content, $block ) {
		$query_id     = isset( $attributes['uniqueId'] ) ? 'query-' . $attributes['uniqueId'] : 'query';
		$page_key     = $query_id . '-page';
		$page         = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ]; // phpcs:ignore -- No data processing happening.
		$query_args   = GenerateBlocks_Loop_Utils::get_query_args( $block, $page );
		$force_reload = $attributes['forceReload'] ?? true;

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

		$parsed_content = (
			new WP_Block(
				$block->parsed_block,
				array(
					'generateblocks/noResults'   => 0 === $the_query->found_posts,
					'generateblocks/wpQuery'     => $the_query,
					'generateblocks/query_type'  => $query_type,
					'generateblocks/query_args'  => $query_args,
					'generateblocks/forceReload' => $force_reload,
				)
			)
		)->render( array( 'dynamic' => false ) );

		if ( false === $force_reload ) {
			$html = new WP_HTML_Tag_Processor( $parsed_content );
			if ( $html->next_tag() ) {

				$asset_info = generateblocks_get_enqueue_assets( 'generateblocks-looper' );
				wp_enqueue_script(
					'generateblocks-looper',
					GENERATEBLOCKS_DIR_URL . 'dist/looper.js',
					$asset_info['dependencies'],
					$asset_info['version'],
					true
				);

				// Add the necessary directives.
				$html->set_attribute( 'data-gb-router-region', $query_id );
				$parsed_content = $html->get_updated_html();
			}
		}

		return $parsed_content;
	}

	/**
	 * Render the repeater items for the Looper block.
	 *
	 * @param   array    $attributes Block attributes.
	 * @param   string   $content InnerBlocks content.
	 * @param   WP_Block $block The block instance.
	 * @return  string  The rendered content.
	 */
	public static function render_repeater( $attributes, $content, $block ) {
		$query = $block->context['generateblocks/wpQuery'];

		$content = '';
		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();

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
		}

		return $content;
	}

	/**
	 * Render the No Results Found container for the Looper block.
	 *
	 * @param   array    $attributes Block attributes.
	 * @param   string   $content InnerBlocks content.
	 * @param   WP_Block $block The block instance.
	 * @return  string  The rendered content.
	 */
	public static function render_no_results( $attributes, $content, $block ) {
		$no_results = $block->context['generateblocks/noResults'] ?? false;

		if ( $no_results ) {
			$block_content = new WP_Block(
				$block->parsed_block
			);

			return $block_content->render( array( 'dynamic' => false ) );
		}

		return '';
	}
}
