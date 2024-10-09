<?php
/**
 * The Dynamic Tag Callbacks class file.
 *
 * @package GenerateBlocks\Dynamic_Tags
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class for dynamic tag callbacks.
 *
 * @since 2.0.0
 */
class GenerateBlocks_Dynamic_Tag_Callbacks extends GenerateBlocks_Singleton {

	const DATE_FORMAT_KEY = 'dateFormat';


	/**
	 * Wrap a link around the output.
	 *
	 * @param string $output The output.
	 * @param array  $options The options.
	 * @param object $instance The block instance.
	 */
	private static function with_link( $output, $options, $instance ) {
		if ( empty( $options['link'] ) ) {
			return $output;
		}

		$id      = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );
		$link_to = $options['link'];
		$link    = '';

		if ( 'post' === $link_to ) {
			$link = get_permalink( $id );
		} elseif ( 'comments' === $link_to ) {
			$link = get_comments_link( $id );
		}

		if ( $link ) {
			$output = sprintf(
				'<a href="%s">%s</a>',
				esc_url( $link ),
				$output
			);
		}

		return $output;
	}

	/**
	 * Truncate the output by character length.
	 *
	 * @param string $output The tag output.
	 * @param array  $options The options.
	 */
	private static function with_trunc( $output, $options ) {
		if ( empty( $options['trunc'] ) ) {
			return $output;
		}
		$trunc_parts = explode( ',', $options['trunc'] );
		$trunc_words = ! empty( $trunc_parts[1] ) && strpos( $trunc_parts[1], 'words' ) === 0;

		if ( $trunc_words ) {
			$output = wp_trim_words( $output, (int) $trunc_parts[0] );
			return $output;
		}

		return substr( $output, 0, (int) $options['trunc'] );
	}

	/**
	 * Remove leading and trailing whitespace from the output.
	 *
	 * @param string $output The tag output.
	 * @param array  $options The options.
	 */
	private static function with_trim( $output, $options ) {
		if ( empty( $options['trim'] ) ) {
			return $output;
		}

		switch ( $options['trim'] ) {
			case 'left':
				return ltrim( $output );
			case 'right':
				return rtrim( $output );
			default:
				return trim( $output );       }

		return $output;
	}

	/**
	 * Transform the case of the output.
	 *
	 * @param string $output The tag output.
	 * @param array  $options The options.
	 */
	private static function with_case( $output, $options ) {
		if ( empty( $options['case'] ) ) {
			return $output;
		}

		switch ( $options['case'] ) {
			case 'lower':
				return strtolower( $output );
			case 'upper':
				return strtoupper( $output );
			case 'title':
				return ucwords( $output );
			default:
				return $output;
		}
	}

	/**
	 * Transform the case of the output.
	 *
	 * @param string $output The tag output.
	 * @param array  $options The options.
	 */
	private static function with_replace( $output, $options ) {
		if ( empty( $options['replace'] ) ) {
			return $output;
		}

		$replace_parts = explode( ',', $options['replace'] );
		if ( count( $replace_parts ) !== 2 ) {
			return $output;
		}

		$search = (string) $replace_parts[0] ?? '';
		$replace = (string) $replace_parts[1] ?? '';

		return str_replace( $search, $replace, $output );
	}

	/**
	 * Add line breaks to content like the classic editor.
	 *
	 * @param string $output The tag output.
	 * @param array  $options The options.
	 */
	private static function with_wpautop( $output, $options ) {
		if ( empty( $options['wpautop'] ) ) {
			return $output;
		}

		return wpautop( $output );
	}

	/**
	 * Output the dynamic tag.
	 *
	 * @param string $output The output.
	 * @param array  $options The options.
	 * @param object $instance The block instance.
	 *
	 * @return string The tag output.
	 */
	public static function output( $output, $options, $instance = null ) {
		// Store original output for filtering.
		$raw_output = $output;

		$output = self::with_trunc( $output, $options );
		$output = self::with_replace( $output, $options );
		$output = self::with_trim( $output, $options );
		$output = self::with_case( $output, $options );

		// Any wrapping output filters should go after direct string transformations.
		$output = self::with_wpautop( $output, $options );
		$output = self::with_link( $output, $options, $instance );

		$output = apply_filters( 'generateblocks_dynamic_tag_output', $output, $options, $raw_output );

		return $output;
	}

	/**
	 * Get the title.
	 *
	 * @param array  $options The options.
	 * @param object $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_the_title( $options, $block, $instance ) {
		$id     = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );
		$output = get_the_title( $id );

		return self::output( $output, $options, $instance );
	}

	/**
	 * Get the permalink.
	 *
	 * @param array  $options The options.
	 * @param object $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_the_permalink( $options, $block, $instance ) {
		$id     = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );
		$output = get_permalink( $id );

		return self::output( $output, $options, $instance );
	}

	/**
	 * Get the published date.
	 *
	 * @param array  $options The options.
	 * @param object $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_published_date( $options, $block, $instance ) {
		$format = $options[ self::DATE_FORMAT_KEY ] ?? '';
		$id     = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );
		$output = get_the_date( $format, $id );

		return self::output( $output, $options, $instance );
	}

	/**
	 * Get the modified date.
	 *
	 * @param array  $options The options.
	 * @param object $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_modified_date( $options, $block, $instance ) {
		$format = $options[ self::DATE_FORMAT_KEY ] ?? '';
		$id     = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );
		$output = get_the_modified_date( $format, $id );

		return self::output( $output, $options, $instance );
	}

	/**
	 * Get the featured image URL.
	 *
	 * @param array  $options The options.
	 * @param object $block The block.
	 * @param object $instance The block instance.
	 * @return int
	 */
	public static function get_featured_image_url( $options, $block, $instance ) {
		$id       = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );
		$image_id = get_post_thumbnail_id( $id );
		$output   = '';

		if ( ! $image_id ) {
			return self::output( $output, $options, $instance );
		}

		$image = wp_get_attachment_image_src( $image_id, 'full' );

		if ( ! $image ) {
			return self::output( $output, $options, $instance );
		}

		$output = $image[0];

		return self::output( $output, $options, $instance );
	}

	/**
	 * Get the featured image ID.
	 *
	 * @param array  $options The options.
	 * @param object $block The block.
	 * @param object $instance The block instance.
	 * @return int
	 */
	public static function get_featured_image_id( $options, $block, $instance ) {
		$id       = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );
		$image_id = get_post_thumbnail_id( $id );
		$output   = $image_id ? $image_id : 0;

		return self::output( $output, $options, $instance );
	}

	/**
	 * Get the post meta.
	 *
	 * @param array  $options The options.
	 * @param object $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_post_meta( $options, $block, $instance ) {
		$id     = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );
		$key    = $options['key'] ?? '';
		$output = '';

		if ( ! $key ) {
			return self::output( $output, $options, $instance );
		}

		$value = GenerateBlocks_Meta_Handler::get_post_meta( $id, $key, true );

		if ( ! $value ) {
			return self::output( $output, $options, $instance );
		}

		add_filter( 'wp_kses_allowed_html', [ 'GenerateBlocks_Dynamic_Tags', 'expand_allowed_html' ], 10, 2 );
		$output = wp_kses_post( $value );
		remove_filter( 'wp_kses_allowed_html', [ 'GenerateBlocks_Dynamic_Tags', 'expand_allowed_html' ], 10, 2 );

		return self::output( $output, $options, $instance );
	}

	/**
	 * Get the previous post page URL.
	 *
	 * @param array  $options The options.
	 * @param object $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_previous_posts_page_url( $options, $block, $instance ) {
		$page_key      = isset( $instance->context['generateblocks/queryId'] ) ? 'query-' . $instance->context['generateblocks/queryId'] . '-page' : 'query-page';
		$page          = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ]; // phpcs:ignore -- No data processing happening.
		$inherit_query = $instance->context['generateblocks/inheritQuery'] ?? false;
		$output   = '';

		if ( $inherit_query ) {
			global $paged;

			if ( $paged > 1 ) {
				$output = previous_posts( false );
			}
		} elseif ( 1 !== $page ) {
			$output = esc_url( add_query_arg( $page_key, $page - 1 ) );
		}

		return self::output( $output, $options, $instance );
	}

	/**
	 * Get the next post page URL.
	 *
	 * @param array  $options The options.
	 * @param object $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_next_posts_page_url( $options, $block, $instance ) {
		$page_key      = isset( $instance->context['generateblocks/queryId'] ) ? 'query-' . $instance->context['generateblocks/queryId'] . '-page' : 'query-page';
		$page          = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ]; // phpcs:ignore -- No data processing happening.
		$args          = $instance->context['generateblocks/query'] ?? [];
		$inherit_query = $instance->context['generateblocks/inheritQuery'] ?? false;
		$per_page      = $args['per_page'] ?? apply_filters( 'generateblocks_query_per_page_default', 10, $args );
		$output        = '';

		if ( $inherit_query ) {
			global $wp_query, $paged;

			if ( ! $paged ) {
				$paged = 1; // phpcs:ignore -- Need to overrite global here.
			}

			$next_page = (int) $paged + 1;

			if ( $next_page <= $wp_query->max_num_pages ) {
				$output = next_posts( $wp_query->max_num_pages, false );
			}
		} else {
			$query_data  = $instance->context['generateblocks/queryData'] ?? null;
			$query_type  = $instance->context['generateblocks/queryType'] ?? GenerateBlocks_Block_Query::TYPE_WP_QUERY;
			$is_wp_query = GenerateBlocks_Block_Query::TYPE_WP_QUERY === $query_type;

			if ( ! $query_data || ( ! $is_wp_query && ! is_array( $query_data ) ) ) {
				return self::output( $output, $options, $instance );
			}

			$next_page              = $page + 1;
			$custom_query_max_pages = $is_wp_query
				? (int) $query_data->max_num_pages
				: ceil( count( $query_data ) / $per_page );

			if ( $custom_query_max_pages < $next_page ) {
				return self::output( $output, $options, $instance );
			}

			if ( $custom_query_max_pages && $custom_query_max_pages !== $page ) {
				$output = esc_url( add_query_arg( $page_key, $page + 1 ) );
			}

			wp_reset_postdata(); // Restore original Post Data.
		}

		return self::output( $output, $options, $instance );
	}

	/**
	 * Get the comments count.
	 *
	 * @param array  $options The options.
	 * @param object $block The block.
	 * @param object $instance The block instance.
	 * @return int
	 */
	public static function get_the_comments_count( $options, $block, $instance ) {
		$id     = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );
		$none   = $options['none'] ?? __( 'No comments', 'generateblocks' );
		$single = $options['single'] ?? __( '1 comment', 'generateblocks' );
		$multi  = $options['multi'] ?? __( '% comments', 'generateblocks' );
		$output = '';

		if ( ! post_password_required( $id ) && ( comments_open( $id ) || get_comments_number( $id ) ) ) {
			if ( '' === $none && get_comments_number( $id ) < 1 ) {
				return self::output( $none, $options, $instance );
			}

			$output = get_comments_number_text(
				$none,
				$single,
				$multi
			);
		} else {
			$output = $none;
		}

		return self::output( $output, $options, $instance );
	}

	/**
	 * Get the comments URL.
	 *
	 * @param array  $options The options.
	 * @param object $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_the_comments_url( $options, $block, $instance ) {
		$id     = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );
		$output = get_comments_link( $id );

		return self::output( $output, $options, $instance );
	}


	/**
	 * Get filtered userdata with only the relevant keys.
	 *
	 * @param int $user_id The user ID to get data for.
	 * @return array Filtered data array
	 */
	private static function get_userdata( $user_id ) {
		$userdata = get_userdata( $user_id )->data ?? new stdClass();

		return [
			'user_nicename' => $userdata->user_nicename ?? '',
			'user_email'    => $userdata->user_email ?? '',
			'display_name'  => $userdata->display_name ?? '',
			'ID'            => $userdata->ID ?? '',
		];
	}

	/**
	 * Get the author meta.
	 *
	 * @param array  $options The options.
	 * @param object $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_author_meta( $options, $block, $instance ) {
		$id      = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );
		$user_id = get_post_field( 'post_author', $id );
		$key     = $options['key'] ?? '';
		$output  = '';

		if ( ! $user_id || ! $key ) {
			return self::output( $output, $options, $instance );
		}

		add_filter(
			'generateblocks_get_meta_object',
			function ( $meta, $id, $meta_key, $callable ) use ( $user_id ) {
				$parent_name = explode( '.', $meta_key ) [0];

				if ( 'get_user_meta' !== $callable ) {
					return $meta;
				}

				if ( ! $meta && $parent_name ) {
					return self::get_userdata( $user_id )[ $parent_name ] ?? '';
				}
			}
		);

		$value = GenerateBlocks_Meta_Handler::get_user_meta( $user_id, $key );

		add_filter( 'wp_kses_allowed_html', [ 'GenerateBlocks_Dynamic_Tags', 'expand_allowed_html' ], 10, 2 );
		$output = wp_kses_post( $value );
		remove_filter( 'wp_kses_allowed_html', [ 'GenerateBlocks_Dynamic_Tags', 'expand_allowed_html' ], 10, 2 );

		return self::output( $output, $options, $instance );
	}

	/**
	 * Get the author archive URL.
	 *
	 * @param array  $options The options.
	 * @param array  $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_author_archive_url( $options, $block, $instance ) {
		$id      = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );
		$user_id = get_post_field( 'post_author', $id );
		$output  = '';

		if ( ! $user_id ) {
			return self::output( $output, $options, $instance );
		}

		$output = get_author_posts_url( $user_id );

		return self::output( $output, $options, $instance );
	}


	/**
	 * Get the current year.
	 *
	 * @param array $options The options.
	 * @return string
	 */
	public static function get_current_year( $options ) {
		$output = wp_date( 'Y' );

		return self::output( $output, $options, $instance );
	}

	/**
	 * Get the site title from settings.
	 *
	 * @param array $options The options.
	 * @return string
	 */
	public static function get_site_title( $options ) {
		$output = get_option( 'blogname' );

		return self::output( $output, $options, $instance );
	}

	/**
	 * Get the site tagline from settings.
	 *
	 * @param array $options The options.
	 * @return string
	 */
	public static function get_site_tagline( $options ) {
		$output = get_option( 'blogdescription' );

		return self::output( $output, $options, $instance );
	}

	/**
	 * Get the site tagline from settings.
	 *
	 * @param array  $options The options.
	 * @param array  $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_term_list( $options, $block, $instance ) {
		$id        = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );
		$taxonomy  = $options['tax'] ?? '';
		$separator = ! empty( $options['sep'] ) ? $options['sep'] : '';
		$before    = $options['before'] ?? '';
		$after     = $options['after'] ?? '';
		$link      = empty( $options['link'] ) ? false : (bool) $options['link'];
		$output    = get_the_term_list( $id, $taxonomy, $before, $separator, $after );

		if ( is_wp_error( $output ) ) {
			return 'error';
		}

		if ( ! $link ) {
			$output = wp_strip_all_tags( $output );
		}

		return self::output( $output, $options, $instance );
	}

	/**
	 * Get the term meta.
	 *
	 * @param array  $options The options.
	 * @param array  $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_term_meta( $options, $block, $instance ) {
		$id          = GenerateBlocks_Dynamic_Tags::get_id( $options, 'term', $instance );
		$key         = $options['key'] ?? '';
		$output      = '';

		if ( empty( $key ) ) {
			return self::output( $output, $options, $instance );
		}

		$value = GenerateBlocks_Meta_Handler::get_term_meta( $id, $key, true );

		if ( ! $value ) {
			return self::output( $output, $options, $instance );
		}

		add_filter( 'wp_kses_allowed_html', [ 'GenerateBlocks_Dynamic_Tags', 'expand_allowed_html' ], 10, 2 );
		$output = wp_kses_post( $value );
		remove_filter( 'wp_kses_allowed_html', [ 'GenerateBlocks_Dynamic_Tags', 'expand_allowed_html' ], 10, 2 );

		return self::output( $output, $options, $instance );
	}

	/**
	 * Get the user meta.
	 *
	 * @param array  $options The options.
	 * @param array  $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_user_meta( $options, $block, $instance ) {
		$id     = GenerateBlocks_Dynamic_Tags::get_id( $options, 'user', $instance );
		$key    = $options['key'] ?? '';
		$output = '';

		if ( empty( $key ) ) {
			return self::output( $output, $options, $instance );
		}

		$value = GenerateBlocks_Meta_Handler::get_user_meta( $id, $key, true );

		if ( ! $value ) {
			return self::output( $output, $options, $instance );
		}

		add_filter( 'wp_kses_allowed_html', [ 'GenerateBlocks_Dynamic_Tags', 'expand_allowed_html' ], 10, 2 );
		$output = wp_kses_post( $value );
		remove_filter( 'wp_kses_allowed_html', [ 'GenerateBlocks_Dynamic_Tags', 'expand_allowed_html' ], 10, 2 );

		return self::output( $output, $options, $instance );
	}

	/**
	 * Get the index of the current looper block loop.
	 *
	 * @param array  $options The options.
	 * @param array  $block The block.
	 * @param object $instance The block instance.
	 * @return int The loop index number.
	 */
	public static function get_loop_index( $options, $block, $instance ) {
		$use_zero_based = $options['zeroBased'] ?? false;
		$loop_index = (int) isset( $instance->context['generateblocks/loopIndex'] )
		? $instance->context['generateblocks/loopIndex']
		: -1;

		if ( $use_zero_based ) {
			--$loop_index;
		}

		if ( $loop_index > -1 ) {
			return (string) $loop_index;
		}
	}

	/**
	 * Get the current loop item.
	 *
	 * @param array  $options The options.
	 * @param array  $block The block.
	 * @param object $instance The block instance.
	 * @return string Value of the loop item or a given key's value from the loop item.
	 */
	public static function get_loop_item( $options, $block, $instance ) {
		$key       = $options['key'] ?? '';
		$fallback  = $options['fallback'] ?? '';
		$loop_item = $instance->context['generateblocks/loopItem'] ?? [];
		$output    = GenerateBlocks_Meta_Handler::get_value( $key, $loop_item, true, $fallback );

		return self::output( $output, $options, $instance );
	}
}
