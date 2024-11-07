<?php
/**
 * The Libraries class file.
 *
 * @package GenerateBlocks\Pattern_Library
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class for handling with libraries.
 *
 * @since 1.9.0
 */
class GenerateBlocks_Query_Utils extends GenerateBlocks_Singleton {
	/**
	 * Helper function that optimizes the query attribute from the Query block.
	 *
	 * @param array $args The WP_Query args to parse.
	 * @param int   $page  Current query's page.
	 * @param array $attributes The query block's attributes. Used for reference in the filters.
	 *
	 * @return array $query_args The optimized WP_Query args array.
	 */
	public static function get_wp_query_args( $args = [], $page = 1, $attributes = [] ) {
		// Set up our pagination.
		if ( ! isset( $args['paged'] ) && -1 < (int) $page ) {
			$args['paged'] = $page;
		}

		$query_args = self::map_post_type_attributes( $args );

		if ( isset( $query_args['tax_query'] ) ) {
			if ( count( $query_args['tax_query'] ) > 1 ) {
				$query_args['tax_query']['relation'] = 'AND';
			}
		}

		// Sticky posts handling.
		if ( isset( $query_args['stickyPosts'] ) && 'ignore' === $query_args['stickyPosts'] ) {
			$query_args['ignore_sticky_posts'] = true;
			unset( $query_args['stickyPosts'] );
		}

		if ( isset( $query_args['stickyPosts'] ) && 'exclude' === $query_args['stickyPosts'] ) {
			$sticky_posts = get_option( 'sticky_posts' );
			$post_not_in = isset( $query_args['post__not_in'] ) && is_array( $query_args['post__not_in'] ) ? $query_args['post__not_in'] : array();
			$query_args['post__not_in'] = array_merge( $sticky_posts, $post_not_in );
			unset( $query_args['stickyPosts'] );
		}

		if ( isset( $query_args['stickyPosts'] ) && 'only' === $query_args['stickyPosts'] ) {
			$sticky_posts = get_option( 'sticky_posts' );
			$query_args['ignore_sticky_posts'] = true;
			$query_args['post__in'] = $sticky_posts;
			unset( $query_args['stickyPosts'] );
		}

		// Ensure offset works correctly with pagination.
		$posts_per_page = (int) $query_args['posts_per_page'] ?? get_option( 'posts_per_page', -1 );
		if (
			isset( $query_args['posts_per_page'] ) &&
			is_numeric( $query_args['posts_per_page'] ) &&
			$posts_per_page > -1
		) {

			$offset = 0;

			if (
				isset( $query_args['offset'] ) &&
				is_numeric( $query_args['offset'] )
			) {
				$offset = absint( $query_args['offset'] );
			}

			$query_args['offset']         = ( $posts_per_page * ( $page - 1 ) ) + $offset;
			$query_args['posts_per_page'] = $posts_per_page;
		}

		$post_status = $query_args['post_status'] ?? 'publish';
		if (
			'publish' !== $post_status &&
			! current_user_can( 'read_private_posts' )
		) {
			// If the user can't read private posts, we'll force the post status to be public.
			$query_args['post_status'] = 'publish';
		}

		$date_query = $query_args['date_query'] ?? false;

		if ( is_array( $date_query ) ) {
			$query_args['date_query'] = array_map(
				function( $query ) {
					$query = array_filter(
						$query,
						function( $value ) {
							return ! empty( $value );
						}
					);
					return $query;
				},
				$query_args['date_query'] ?? []
			);
		}

		/**
		 * Filter the final result of get_query_args.
		 *
		 * @param array @query_args The array of args for the WP_Query.
		 */
		return apply_filters( 'generateblocks_query_get_wp_query_args', $query_args, $attributes );
	}

	/**
	 * Map query parameters to their correct query names.
	 *
	 * @param array $attributes Block attributes.
	 */
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
	 * @param array  $raw_tax_query Tax query.
	 * @param string $operator Tax operator.
	 *
	 * @return array|array[]
	 */
	public static function normalize_tax_query_attributes( $raw_tax_query, $operator = 'IN' ) {
		return array_map(
			function( $tax ) use ( $operator ) {
				return array(
					'taxonomy' => $tax['taxonomy'],
					'field'    => 'term_id',
					'terms'    => $tax['terms'],
					'operator' => $operator,
					'include_children' => isset( $tax['includeChildren'] ) ? $tax['includeChildren'] : true,
				);
			},
			$raw_tax_query
		);
	}
}
