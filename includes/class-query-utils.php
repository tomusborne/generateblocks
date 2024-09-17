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
	 * Helper function that constructs a WP_Query args array from
	 * a `Query` block properties.
	 *
	 * @param WP_Block $block Block instance.
	 * @param int      $page  Current query's page.
	 *
	 * @todo: https://github.com/WordPress/wordpress-develop/blob/44e308c12e68b5c6b63845fd84369ba36985e193/src/wp-includes/blocks.php#L1126
	 */
	public static function get_query_args( $block, $page ) {
		$query_attributes = is_array( $block->parsed_block['attrs'] ) && isset( $block->parsed_block['attrs']['query'] )
			? $block->parsed_block['attrs']['query']
			: [];

		// Set up our pagination.
		$query_attributes['paged'] = $page;

		$query_args = self::map_post_type_attributes( $query_attributes );

		if ( isset( $query_args['tax_query'] ) ) {
			$query_args['tax_query'] = self::normalize_tax_query_attributes( $query_args['tax_query'] );
		}

		if ( isset( $query_args['date_query_after'] ) || isset( $query_args['date_query_before'] ) ) {
			$query_args['date_query'] = self::normalize_date_query_attributes(
				isset( $query_args['date_query_after'] ) ? $query_args['date_query_after'] : null,
				isset( $query_args['date_query_before'] ) ? $query_args['date_query_before'] : null
			);

			unset( $query_args['date_query_after'] );
			unset( $query_args['date_query_before'] );
		}

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

		if ( isset( $query_args['tax_query_exclude'] ) ) {
			$not_in_tax_query = self::normalize_tax_query_attributes( $query_args['tax_query_exclude'], 'NOT IN' );
			$query_args['tax_query'] = isset( $query_args['tax_query'] )
				? array_merge( $query_args['tax_query'], $not_in_tax_query )
				: $not_in_tax_query;

			unset( $query_args['tax_query_exclude'] );
		}

		if (
			isset( $query_args['posts_per_page'] ) &&
			is_numeric( $query_args['posts_per_page'] )
		) {
			$per_page = intval( $query_args['posts_per_page'] );
			$offset   = 0;

			if (
				isset( $query_args['offset'] ) &&
				is_numeric( $query_args['offset'] )
			) {
				$offset = absint( $query_args['offset'] );
			}

			$query_args['offset'] = ( $per_page * ( $page - 1 ) ) + $offset;
			$query_args['posts_per_page'] = $per_page;
		}

		if (
			isset( $query_args['post_status'] ) &&
			'publish' !== $query_args['post_status'] &&
			! current_user_can( 'read_private_posts' )
		) {
			// If the user can't read private posts, we'll force the post status to be public.
			$query_args['post_status'] = 'publish';
		}

		return $query_args;
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

	/**
	 * Normalize the date query attributes to be used in the WP_Query
	 *
	 * @param string|null $after The after date.
	 * @param string|null $before The before date.
	 *
	 * @return array
	 */
	public static function normalize_date_query_attributes( $after = null, $before = null ) {
		$result = array( 'inclusive' => true );

		if ( generateblocks_is_valid_date( $after ) ) {
			$result['after'] = $after;
		}

		if ( generateblocks_is_valid_date( $before ) ) {
			$result['before'] = $before;
		}

		return $result;
	}
}
