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
	 */
	private static function with_link( $output, $options ) {
		if ( empty( $options['link'] ) ) {
			return $output;
		}

		$id      = GenerateBlocks_Dynamic_Tags::get_id( $options );
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
	 */
	public static function output( $output, $options ) {
		// Store original output for filtering.
		$raw_output = $output;

		$output = self::with_trunc( $output, $options );
		$output = self::with_replace( $output, $options );
		$output = self::with_trim( $output, $options );
		$output = self::with_case( $output, $options );

		// Any wrapping output filters should go after direct string transformations.
		$output = self::with_wpautop( $output, $options );
		$output = self::with_link( $output, $options );

		$output = apply_filters( 'generateblocks_dynamic_tag_output', $output, $options, $raw_output );

		return $output;
	}

	/**
	 * Check to see if a value if array-like and if so, get the provided property from it.
	 *
	 * @param mixed $value The value to check the property against.
	 * @param mixed $property The property to retrieve from the value if it exists.
	 * @return mixed The $property value if it exists, otherwise the $value.
	 */
	public static function maybe_get_property( $value, $property ) {
		if ( is_array( $value ) ) {
			return $value[ $property ] ?? $value;
		} elseif ( is_object( $value ) ) {
			return $value->$property ?? $value;
		}

		// Return the value if it's not an array or object.
		return $value;
	}

	/**
	 * Parse a dynamic tag key and retrieve a value from it.
	 *
	 * @param string     $key The key from the parent value for retrieval.
	 * @param string|int $parent_value The parent value to check the key against.
	 * @return string
	 */
	public static function get_value( $key, $parent_value ) {
		$parts = explode( '.', $key );

		// Bail if we can't find at least one sub field name in the key .
		if ( count( $parts ) < 2 ) {
			return is_string( $parent_value ) ? $parent_value : '';
		}

		$sub_name  = $parts[1];
		$sub_value = self::maybe_get_property( $parent_value, $sub_name );

		if ( is_array( $sub_value ) || is_object( $sub_value ) ) {
			return self::get_value(
				implode( '.', array_slice( $parts, 1 ) ),
				$sub_value
			);
		}

		// Coerce simple values to strings.
		return (string) $sub_value;
	}

	/**
	 * Get the title.
	 *
	 * @param array $options The options.
	 * @return string
	 */
	public static function get_the_title( $options ) {
		$id     = GenerateBlocks_Dynamic_Tags::get_id( $options );
		$output = get_the_title( $id );

		return self::output( $output, $options );
	}

	/**
	 * Get the permalink.
	 *
	 * @param array $options The options.
	 * @return string
	 */
	public static function get_the_permalink( $options ) {
		$id     = GenerateBlocks_Dynamic_Tags::get_id( $options );
		$output = get_permalink( $id );

		return self::output( $output, $options );
	}

	/**
	 * Get the published date.
	 *
	 * @param array $options The options.
	 * @return string
	 */
	public static function get_published_date( $options ) {
		$format = $options[ self::DATE_FORMAT_KEY ] ?? '';
		$id     = GenerateBlocks_Dynamic_Tags::get_id( $options );
		$output = get_the_date( $format, $id );

		return self::output( $output, $options );
	}

	/**
	 * Get the modified date.
	 *
	 * @param array $options The options.
	 * @return string
	 */
	public static function get_modified_date( $options ) {
		$format = $options[ self::DATE_FORMAT_KEY ] ?? '';
		$id     = GenerateBlocks_Dynamic_Tags::get_id( $options );
		$output = get_the_modified_date( $format, $id );

		return self::output( $output, $options );
	}

	/**
	 * Get the featuredimage URL.
	 *
	 * @param array $options The options.
	 * @return int
	 */
	public static function get_featured_image_url( $options ) {
		$id       = GenerateBlocks_Dynamic_Tags::get_id( $options );
		$image_id = get_post_thumbnail_id( $id );
		$output   = '';

		if ( ! $image_id ) {
			return self::output( $output, $options );
		}

		$image = wp_get_attachment_image_src( $image_id, 'full' );

		if ( ! $image ) {
			return self::output( $output, $options );
		}

		$output = $image[0];

		return self::output( $output, $options );
	}

	/**
	 * Get the featured image ID.
	 *
	 * @param array $options The options.
	 * @return int
	 */
	public static function get_featured_image_id( $options ) {
		$id       = GenerateBlocks_Dynamic_Tags::get_id( $options );
		$image_id = get_post_thumbnail_id( $id );
		$output   = 0;

		if ( ! $image_id ) {
			return self::output( $output, $options );
		}

		return self::output( $image_id, $options );
	}

	/**
	 * Get the post meta.
	 *
	 * @param array $options The options.
	 * @return string
	 */
	public static function get_post_meta( $options ) {
		$id          = GenerateBlocks_Dynamic_Tags::get_id( $options );
		$key         = $options['key'] ?? '';
		$key_parts   = array_map( 'trim', explode( '.', $key ) );
		$parent_name = $key_parts[0];

		if ( empty( $key ) ) {
			return '';
		}

		/**
		 * Allow a filter to set this post meta value using some
		 * custom setter function (such as get_field in ACF). If this value returns
		 * something we can skip calling get_post_meta for it and return the value instead.
		 *
		 * @since 2.0.0
		 *
		 * @param string|null $pre_value The pre-filtered value, or null if unset.
		 * @param int   $id The post ID used to fetch the meta value.
		 * @param string $key The meta key to fetch.
		 */
		$pre_value = apply_filters(
			'generateblocks_dynamic_tag_get_post_meta_pre_value',
			null,
			$id,
			$key
		);

		$meta   = $pre_value ? $pre_value : get_post_meta( $id, $parent_name, true );
		$value  = self::get_value( $key, $meta );
		$output = '';

		if ( ! $value ) {
			return self::output( $output, $options );
		}

		add_filter( 'wp_kses_allowed_html', [ 'GenerateBlocks_Dynamic_Tags', 'expand_allowed_html' ], 10, 2 );
		$output = wp_kses_post( $value );
		remove_filter( 'wp_kses_allowed_html', [ 'GenerateBlocks_Dynamic_Tags', 'expand_allowed_html' ], 10, 2 );

		return self::output( $output, $options );
	}

	/**
	 * Get the previous post page URL.
	 *
	 * @param array  $options The options.
	 * @param array  $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_previous_posts_page_url( $options, $block, $instance ) {
		$page_key = isset( $instance->context['generateblocks/queryId'] ) ? 'query-' . $instance->context['generateblocks/queryId'] . '-page' : 'query-page';
		$page     = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ]; // phpcs:ignore -- No data processing happening.
		$output   = '';

		if ( isset( $instance->context['generateblocks/inheritQuery'] ) && $instance->context['generateblocks/inheritQuery'] ) {
			global $paged;

			if ( $paged > 1 ) {
				$output = previous_posts( false );
			}
		} elseif ( 1 !== $page ) {
			$output = esc_url( add_query_arg( $page_key, $page - 1 ) );
		}

		return self::output( $output, $options );
	}

	/**
	 * Get the next post page URL.
	 *
	 * @param array  $options The options.
	 * @param array  $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_next_posts_page_url( $options, $block, $instance ) {
		$page_key = isset( $instance->context['generateblocks/queryId'] ) ? 'query-' . $instance->context['generateblocks/queryId'] . '-page' : 'query-page';
		$page     = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ]; // phpcs:ignore -- No data processing happening.
		$max_page = isset( $instance->context['generateblocks/query']['pages'] ) ? (int) $instance->context['generateblocks/query']['pages'] : 0;
		$output   = '';

		if ( isset( $instance->context['generateblocks/inheritQuery'] ) && $instance->context['generateblocks/inheritQuery'] ) {
			global $wp_query, $paged;

			if ( ! $max_page || $max_page > $wp_query->max_num_pages ) {
				$max_page = $wp_query->max_num_pages;
			}

			if ( ! $paged ) {
				$paged = 1; // phpcs:ignore -- Need to overrite global here.
			}

			$nextpage = (int) $paged + 1;

			if ( $nextpage <= $max_page ) {
				$output = next_posts( $max_page, false );
			}
		} elseif ( ! $max_page || $max_page > $page ) {
			$custom_query = $instance->context['generateblocks/queryData'] ?? null;

			if ( ! $custom_query ) {
				return self::output( $output, $options );
			}

			$custom_query_max_pages = (int) $custom_query->max_num_pages;

			if ( $custom_query_max_pages && $custom_query_max_pages !== $page ) {
				$output = esc_url( add_query_arg( $page_key, $page + 1 ) );
			}

			wp_reset_postdata(); // Restore original Post Data.
		}

		return self::output( $output, $options );
	}

	/**
	 * Get the comments count.
	 *
	 * @param array $options The options.
	 * @return int
	 */
	public static function get_the_comments_count( $options ) {
		$id     = GenerateBlocks_Dynamic_Tags::get_id( $options );
		$none   = $options['none'] ?? __( 'No comments', 'generateblocks' );
		$single = $options['single'] ?? __( '1 comment', 'generateblocks' );
		$multi  = $options['multi'] ?? __( '% comments', 'generateblocks' );
		$output = '';

		if ( ! post_password_required( $id ) && ( comments_open( $id ) || get_comments_number( $id ) ) ) {
			if ( '' === $none && get_comments_number( $id ) < 1 ) {
				return self::output( $none, $options );
			}

			$output = get_comments_number_text(
				$none,
				$single,
				$multi
			);
		} else {
			$output = $none;
		}

		return self::output( $output, $options );
	}

	/**
	 * Get the comments URL.
	 *
	 * @param array $options The options.
	 * @return string
	 */
	public static function get_the_comments_url( $options ) {
		$id     = GenerateBlocks_Dynamic_Tags::get_id( $options );
		$output = get_comments_link( $id );

		return self::output( $output, $options );
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
	 * @param array $options The options.
	 * @return string
	 */
	public static function get_author_meta( $options ) {
		$id          = GenerateBlocks_Dynamic_Tags::get_id( $options );
		$user_id     = get_post_field( 'post_author', $id );
		$key         = $options['key'] ?? '';
		$key_parts   = array_map( 'trim', explode( '.', $key ) );
		$parent_name = $key_parts[0];
		$output      = '';

		if ( ! $user_id || ! $key ) {
			return self::output( $output, $options );
		}

		/**
		 * Allow a filter to set this post meta value using some
		 * custom setter function (such as get_field in ACF). If this value returns
		 * something we can skip calling get_post_meta for it and return the value instead.
		 *
		 * @since 2.0.0
		 *
		 * @param string|null $pre_value The pre-filtered value, or null if unset.
		 * @param int   $id The post ID used to fetch the meta value.
		 * @param string $key The meta key to fetch.
		 */
		$pre_value = apply_filters(
			'generateblocks_dynamic_tag_get_author_meta_pre_value',
			null,
			$user_id,
			$key,
			$id
		);

		$meta = $pre_value ? $pre_value : get_user_meta( $user_id, $parent_name, true );

		if ( ! $meta ) {
			$meta = self::get_userdata( $user_id )[ $parent_name ] ?? '';
		}

		$value = self::get_value( $key, $meta );

		add_filter( 'wp_kses_allowed_html', [ 'GenerateBlocks_Dynamic_Tags', 'expand_allowed_html' ], 10, 2 );
		$output = wp_kses_post( $value );
		remove_filter( 'wp_kses_allowed_html', [ 'GenerateBlocks_Dynamic_Tags', 'expand_allowed_html' ], 10, 2 );

		return self::output( $output, $options );
	}

	/**
	 * Get the author archive URL.
	 *
	 * @param array $options The options.
	 * @return string
	 */
	public static function get_author_archive_url( $options ) {
		$id      = GenerateBlocks_Dynamic_Tags::get_id( $options );
		$user_id = get_post_field( 'post_author', $id );
		$output  = '';

		if ( ! $user_id ) {
			return self::output( $output, $options );
		}

		$output = get_author_posts_url( $user_id );

		return self::output( $output, $options );
	}


	/**
	 * Get the current year.
	 *
	 * @param array $options The options.
	 * @return string
	 */
	public static function get_current_year( $options ) {
		$output = wp_date( 'Y' );

		return self::output( $output, $options );
	}

	/**
	 * Get the site title from settings.
	 *
	 * @param array $options The options.
	 * @return string
	 */
	public static function get_site_title( $options ) {
		$output = get_option( 'blogname' );

		return self::output( $output, $options );
	}

	/**
	 * Get the site tagline from settings.
	 *
	 * @param array $options The options.
	 * @return string
	 */
	public static function get_site_tagline( $options ) {
		$output = get_option( 'blogdescription' );

		return self::output( $output, $options );
	}

	/**
	 * Get the site tagline from settings.
	 *
	 * @param array $options The options.
	 * @return string
	 */
	public static function get_term_list( $options ) {
		$id        = GenerateBlocks_Dynamic_Tags::get_id( $options );
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

		return self::output( $output, $options );
	}

	/**
	 * Get the term meta.
	 *
	 * @param array $options The options.
	 * @return string
	 */
	public static function get_term_meta( $options ) {
		$id          = GenerateBlocks_Dynamic_Tags::get_id( $options );
		$key         = $options['key'] ?? '';
		$key_parts   = array_map( 'trim', explode( '.', $key ) );
		$parent_name = $key_parts[0];

		if ( empty( $key ) ) {
			return '';
		}

		/**
		 * Allow a filter to set this post meta value using some
		 * custom setter function (such as get_field in ACF). If this value returns
		 * something we can skip calling get_term_meta for it and return the value instead.
		 *
		 * @since 2.0.0
		 *
		 * @param string|null $pre_value The pre-filtered value, or null if unset.
		 * @param int   $id The post ID used to fetch the meta value.
		 * @param string $key The meta key to fetch.
		 */
		$pre_value = apply_filters(
			'generateblocks_dynamic_tag_get_term_meta_pre_value',
			null,
			$id,
			$key
		);

		$meta   = $pre_value ? $pre_value : get_term_meta( $id, $parent_name, true );
		$value  = self::get_value( $key, $meta );
		$output = '';

		if ( ! $value ) {
			return self::output( $output, $options );
		}

		add_filter( 'wp_kses_allowed_html', [ 'GenerateBlocks_Dynamic_Tags', 'expand_allowed_html' ], 10, 2 );
		$output = wp_kses_post( $value );
		remove_filter( 'wp_kses_allowed_html', [ 'GenerateBlocks_Dynamic_Tags', 'expand_allowed_html' ], 10, 2 );

		return self::output( $output, $options );
	}

	/**
	 * Get the user meta.
	 *
	 * @param array $options The options.
	 * @return string
	 */
	public static function get_user_meta( $options ) {
		$id          = GenerateBlocks_Dynamic_Tags::get_id( $options, 'user' );
		$key         = $options['key'] ?? '';
		$key_parts   = array_map( 'trim', explode( '.', $key ) );
		$parent_name = $key_parts[0];

		if ( empty( $key ) ) {
			return '';
		}

		/**
		 * Allow a filter to set this user meta value using some
		 * custom setter function (such as get_field in ACF). If this value returns
		 * something we can skip calling get_user_meta for it and return the value instead.
		 *
		 * @since 2.0.0
		 *
		 * @param string|null $pre_value The pre-filtered value, or null if unset.
		 * @param int   $id The user ID used to fetch the meta value.
		 * @param string $key The meta key to fetch.
		 */
		$pre_value = apply_filters(
			'generateblocks_dynamic_tag_get_user_meta_pre_value',
			null,
			$id,
			$key
		);

		$meta   = $pre_value ? $pre_value : get_user_meta( $id, $parent_name, true );
		$value  = self::get_value( $key, $meta );
		$output = '';

		if ( ! $value ) {
			return self::output( $output, $options );
		}

		add_filter( 'wp_kses_allowed_html', [ 'GenerateBlocks_Dynamic_Tags', 'expand_allowed_html' ], 10, 2 );
		$output = wp_kses_post( $value );
		remove_filter( 'wp_kses_allowed_html', [ 'GenerateBlocks_Dynamic_Tags', 'expand_allowed_html' ], 10, 2 );

		return self::output( $output, $options );
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
}
