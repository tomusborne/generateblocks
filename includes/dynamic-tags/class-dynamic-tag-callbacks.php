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
		$link    = $options['link'];
		$parts   = explode( ',', $link );
		$link_to = $parts[0] ?? 'post';
		$key     = $parts[1] ?? null;
		$url     = '';

		switch ( $link_to ) {
			case 'post':
				$url = get_permalink( $id );

				break;
			case 'post_meta':
				$url = $key ? GenerateBlocks_Meta_Handler::get_post_meta( $id, $key, true ) : '';

				break;
			case 'comments':
				$url = get_comments_link( $id );

				break;
			case 'author_meta':
				$user_id = get_post_field( 'post_author', $id );
				$url     = $key ? GenerateBlocks_Meta_Handler::get_user_meta( $user_id, $key, true ) : '';

				break;
			case 'author_archive':
				$user_id = get_post_field( 'post_author', $id );
				$url     = get_author_posts_url( $user_id );

				break;
			case 'author_email':
				$user_id = get_post_field( 'post_author', $id );
				$url     = 'mailto:' . get_the_author_meta( 'user_email', $user_id );
				break;
		}

		if ( $url ) {
			$output = sprintf(
				'<a href="%s">%s</a>',
				esc_url( $url ),
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
			$output = wp_trim_words( $output, (int) $trunc_parts[0], '' );
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

		$replace_parts = array_map(
			function ( $str ) {
				$result  = '';
				$escaped = false;
				$length  = strlen( $str );

				for ( $i = 0; $i < $length; $i++ ) {
					$char = $str[ $i ];

					if ( $escaped ) {
							$result .= $char;
							$escaped = false;
					} elseif ( '\\' === $char ) {
							$escaped = true;
					} elseif ( '"' !== $char && "'" !== $char ) {
							$result .= $char;
					}
				}

				return $result;
			},
			explode( ',', $options['replace'] )
		);
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
	 * @param array  $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_the_title( $options, $block, $instance ) {
		$id = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );

		if ( ! $id ) {
			return self::output( '', $options, $instance );
		}

		$output = get_the_title( $id );

		return self::output( $output, $options, $instance );
	}

	/**
	 * Get the permalink.
	 *
	 * @param array  $options The options.
	 * @param array  $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_the_permalink( $options, $block, $instance ) {
		$id = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );

		if ( ! $id ) {
			return self::output( '', $options, $instance );
		}

		$output = get_permalink( $id );

		return self::output( $output, $options, $instance );
	}

	/**
	 * Get the post date.
	 *
	 * @param array  $options The options.
	 * @param array  $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_post_date( $options, $block, $instance ) {
		$id = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );

		if ( ! $id ) {
			return self::output( '', $options, $instance );
		}

		$type   = $options['type'] ?? 'published';
		$format = $options[ self::DATE_FORMAT_KEY ] ?? '';
		$output = get_the_date( $format, $id );

		if ( 'modified' === $type ) {
			$output = get_the_modified_date( $format, $id );
		}

		if ( 'modifiedOnly' === $type ) {
			$modified_date = get_the_modified_date( $format, $id );

			if ( $modified_date === $output ) {
				$output = '';
			}
		}

		return self::output( $output, $options, $instance );
	}

	/**
	 * Get the featured image.
	 *
	 * @param array  $options The options.
	 * @param array  $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_featured_image( $options, $block, $instance ) {
		$id = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );

		if ( ! $id ) {
			return self::output( '', $options, $instance );
		}

		$image_id = get_post_thumbnail_id( $id );

		if ( ! $image_id ) {
			return self::output( '', $options, $instance );
		}

		$size  = $options['size'] ?? 'full';
		$image = wp_get_attachment_image_src( $image_id, $size );

		if ( ! $image ) {
			return self::output( '', $options, $instance );
		}

		switch ( $options['key'] ?? '' ) {
			case 'id':
				$output = $image_id;
				break;
			case 'alt':
				$output = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
				break;
			case 'caption':
				$output = wp_get_attachment_caption( $image_id );
				break;
			case 'description':
				$output = get_post_field( 'post_content', $image_id );
				break;
			case 'url':
			default:
				$output = $image[0];
				break;
		}

		return self::output( $output, $options, $instance );
	}

	/**
	 * Get the post meta.
	 *
	 * @param array  $options The options.
	 * @param array  $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_post_meta( $options, $block, $instance ) {
		$id = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );

		if ( ! $id ) {
			return self::output( '', $options, $instance );
		}

		$key = $options['key'] ?? '';

		if ( ! $key ) {
			return self::output( '', $options, $instance );
		}

		$value = GenerateBlocks_Meta_Handler::get_post_meta( $id, $key, true );

		if ( ! $value ) {
			return self::output( '', $options, $instance );
		}

		add_filter( 'wp_kses_allowed_html', [ 'GenerateBlocks_Dynamic_Tags', 'expand_allowed_html' ], 10, 2 );
		$output = wp_kses_post( $value );
		remove_filter( 'wp_kses_allowed_html', [ 'GenerateBlocks_Dynamic_Tags', 'expand_allowed_html' ], 10, 2 );

		return self::output( $output, $options, $instance );
	}

	/**
	 * Get the comments count.
	 *
	 * @param array  $options The options.
	 * @param array  $block The block.
	 * @param object $instance The block instance.
	 * @return int
	 */
	public static function get_the_comments_count( $options, $block, $instance ) {
		$id = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );

		if ( ! $id ) {
			return self::output( '', $options, $instance );
		}

		$none   = $options['none'] ?? __( 'No comments', 'generateblocks' );
		$single = $options['single'] ?? __( '1 comment', 'generateblocks' );
		$multi  = $options['multiple'] ?? __( '% comments', 'generateblocks' );
		$output = '';

		if ( ! post_password_required( $id ) && ( comments_open( $id ) || get_comments_number( $id ) ) ) {
			if ( '' === $none && get_comments_number( $id ) < 1 ) {
				return self::output( $none, $options, $instance );
			}

			$output = get_comments_number_text(
				$none,
				$single,
				$multi,
				$id
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
	 * @param array  $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_the_comments_url( $options, $block, $instance ) {
		$id = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );

		if ( ! $id ) {
			return self::output( '', $options, $instance );
		}

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
	 * @param array  $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_author_meta( $options, $block, $instance ) {
		$id = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );

		if ( ! $id ) {
			return self::output( '', $options, $instance );
		}

		$user_id = get_post_field( 'post_author', $id );
		$key     = $options['key'] ?? '';
		$output  = '';

		if ( ! $user_id || ! $key ) {
			return self::output( $output, $options, $instance );
		}

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
		$id = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );

		if ( ! $id ) {
			return self::output( '', $options, $instance );
		}

		$user_id = get_post_field( 'post_author', $id );
		$output  = '';

		if ( ! $user_id ) {
			return self::output( $output, $options, $instance );
		}

		$output = get_author_posts_url( $user_id );

		return self::output( $output, $options, $instance );
	}

	/**
	 * Get the author avatar URL.
	 *
	 * @param array  $options The options.
	 * @param array  $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_author_avatar_url( $options, $block, $instance ) {
		$id            = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );
		$size          = $options['size'] ?? null;
		$default       = $options['default'] ?? null;
		$user_id       = get_post_field( 'post_author', $id );
		$force_default = $options['forceDefault'] ?? null;
		$rating        = $options['rating'] ?? null;
		$output        = '';

		if ( ! $user_id ) {
			return self::output( $output, $options, $instance );
		}

		$args = [];

		if ( $size ) {
			$args['size'] = $size;
		}

		if ( $default ) {
			$args['default'] = $default;
		}

		// This is false by default so only add the arg if it's true.
		if ( $force_default ) {
			$args['force_default'] = $force_default;
		}

		if ( $rating ) {
			$args['rating'] = $rating;
		}

		$output = get_avatar_url( $user_id, $args );

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
		$id = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );

		if ( ! $id ) {
			return self::output( '', $options, $instance );
		}

		$taxonomy  = $options['tax'] ?? '';
		$separator = ! empty( $options['sep'] ) ? $options['sep'] : '';
		$link      = empty( $options['link'] ) ? false : (bool) $options['link'];
		$terms     = get_the_terms( $id, $taxonomy );

		if ( ! $terms ) {
			return self::output( '', $options, $instance );
		}

		$list_items = [];

		foreach ( $terms as $term ) {
			if ( $link ) {
				$link = get_term_link( $term, $taxonomy );

				if ( is_wp_error( $link ) ) {
					continue;
				}

				$list_items[] = '<a href="' . esc_url( $link ) . '" rel="tag">' . $term->name . '</a>';

				$list_items = apply_filters( "term_links-{$taxonomy}", $list_items ); // phpcs:ignore
			} else {
				$list_items[] = "<span>{$term->name}</span>";
			}
		}

		$output = implode( $separator, $list_items );

		return self::output( $output, $options, $instance );
	}
	/**
	 * Get the post's excerpt, optionally with a custom read more link.
	 *
	 * @param array  $options The options.
	 * @param array  $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_post_excerpt( $options, $block, $instance ) {
		$id = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );

		if ( ! $id ) {
			return self::output( '', $options, $instance );
		}

		static $seen_ids = [];

		if ( isset( $seen_ids[ $id ] ) ) {
			return self::output( '', $options, $instance );
		}

		$seen_ids[ $id ] = true;
		$read_more             = $options['readMore'] ?? '';
		$pre_read_more         = $options['pre'] ?? '';
		$use_theme_read_more   = isset( $options['useTheme'] ) ? true : false;
		$filter_excerpt_length = function( $length ) use ( $options ) {
			return $options['length'] ?? $length;
		};

		add_filter(
			'excerpt_length',
			$filter_excerpt_length,
			100
		);

		if ( ! $use_theme_read_more ) {
			$filter_more_text = function() use ( $read_more, $pre_read_more ) {
				if ( ! $read_more ) {
					return $pre_read_more;
				}

				return apply_filters(
					'generateblocks_dynamic_excerpt_more_link',
					sprintf(
						'%1$s<a class="gb-dynamic-read-more" href="%2$s" aria-label="%3$s">%4$s</a>',
						wp_kses_post( $pre_read_more ),
						esc_url( get_permalink( get_the_ID() ) ),
						sprintf(
							/* translators: Aria-label describing the read more button */
							_x( 'More on %s', 'more on post title', 'gp-premium' ),
							the_title_attribute( 'echo=0' )
						),
						wp_kses_post( $read_more )
					)
				);
			};

			add_filter(
				'excerpt_more',
				$filter_more_text,
				100
			);
		}

		$output = get_the_excerpt( $id );

		if ( isset( $filter_excerpt_length ) ) {
			remove_filter(
				'excerpt_length',
				$filter_excerpt_length,
				100
			);
		}

		if ( isset( $filter_more_text ) ) {
			remove_filter(
				'excerpt_more',
				$filter_more_text,
				100
			);
		}

		unset( $seen_ids[ $id ] );

		return self::output( $output, $options, $instance );
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
		$query_id      = $instance->context['generateblocks/queryData']['id'] ?? '';
		$page_key      = $query_id ? 'query-' . $query_id . '-page' : 'query-page';
		$page          = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ]; // phpcs:ignore -- No data processing happening.
		$inherit_query = $instance->context['generateblocks/queryData']['inherit'] ?? false;
		$has_query     = isset( $instance->context['generateblocks/queryData'] );
		$output   = '';

		if ( $inherit_query || ! $has_query ) {
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
	 * @param array  $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_next_posts_page_url( $options, $block, $instance ) {
		$query_id      = $instance->context['generateblocks/queryData']['id'] ?? '';
		$page_key      = $query_id ? 'query-' . $query_id . '-page' : 'query-page';
		$page          = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ]; // phpcs:ignore -- No data processing happening.
		$args          = $instance->context['generateblocks/queryData']['args'] ?? [];
		$inherit_query = $instance->context['generateblocks/queryData']['inherit'] ?? false;
		$has_query     = isset( $instance->context['generateblocks/queryData'] );
		$per_page      = $args['posts_per_page'] ?? apply_filters( 'generateblocks_query_per_page_default', 10, $args );
		$output        = '';

		if ( $inherit_query || ! $has_query ) {
			global $wp_query, $paged;

			if ( ! $paged ) {
				$paged = 1; // phpcs:ignore -- Need to overrite global here.
			}

			$next_page = (int) $paged + 1;

			if ( $next_page <= $wp_query->max_num_pages ) {
				$output = next_posts( $wp_query->max_num_pages, false );
			}
		} else {
			$query_data  = $instance->context['generateblocks/queryData']['data'] ?? null;
			$query_type  = $instance->context['generateblocks/queryData']['type'] ?? null;
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
	 * Get the media.
	 *
	 * @param array  $options The options.
	 * @param array  $block The block.
	 * @param object $instance The block instance.
	 * @return string
	 */
	public static function get_media( $options, $block, $instance ) {
		$id = GenerateBlocks_Dynamic_Tags::get_id( $options, 'post', $instance );

		if ( ! $id ) {
			return self::output( '', $options, $instance );
		}

		switch ( $options['key'] ?? '' ) {
			case 'title':
				$output = get_the_title( $id );
				break;
			case 'id':
				$output = $id;
				break;
			case 'alt':
				$output = get_post_meta( $id, '_wp_attachment_image_alt', true );
				break;
			case 'caption':
				$output = wp_get_attachment_caption( $id );
				break;
			case 'description':
				$output = get_post_field( 'post_content', $id );
				break;
			case 'url':
			default:
				$output = wp_get_attachment_url( $id );
				break;
		}

		return self::output( $output, $options, $instance );
	}
}
