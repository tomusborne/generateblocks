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
		}

		if ( 'comments' === $link_to ) {
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

		$search = $replace_parts[0] ?? '';
		$replace = $replace_parts[1] ?? '';

		return str_replace( $search, $replace, $output );
	}

	/**
	 * Transform the case of the output.
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
	private static function output( $output, $options ) {
		$output = self::with_replace( $output, $options );
		$output = self::with_trunc( $output, $options );
		$output = self::with_trim( $output, $options );
		$output = self::with_case( $output, $options );

		// Any wrapping output filters should go after direct string transformations.
		$output = self::with_wpautop( $output, $options );
		$output = self::with_link( $output, $options );

		$output = apply_filters( 'generateblocks_dynamic_tag_output', $output, $options );

		return $output;
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
		$id     = GenerateBlocks_Dynamic_Tags::get_id( $options );
		$meta   = get_post_meta( $id, $options['key'], true );
		$output = '';

		if ( ! $meta ) {
			return self::output( $output, $options );
		}

		add_filter( 'wp_kses_allowed_html', [ 'GenerateBlocks_Dynamic_Tags', 'expand_allowed_html' ], 10, 2 );
		$output = wp_kses_post( $meta );
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
	 * Get the author meta.
	 *
	 * @param array $options The options.
	 * @return string
	 */
	public static function get_author_meta( $options ) {
		$id      = GenerateBlocks_Dynamic_Tags::get_id( $options );
		$user_id = get_post_field( 'post_author', $id );
		$key     = $options['key'] ?? '';
		$output  = '';

		if ( ! $user_id || ! $key ) {
			return self::output( $output, $options );
		}

		$meta = get_user_meta( $user_id, $key, true );

		if ( ! $meta ) {
			$user_data_names = array(
				'user_nicename',
				'user_email',
				'display_name',
			);

			if ( in_array( $key, $user_data_names ) ) {
				$user_data = get_userdata( $user_id );

				if ( $user_data ) {
					switch ( $key ) {
						case 'user_nicename':
							$meta = $user_data->user_nicename;
							break;

						case 'user_email':
							$meta = $user_data->user_email;
							break;

						case 'display_name':
							$meta = $user_data->display_name;
							break;
					}
				}
			}
		}

		add_filter( 'wp_kses_allowed_html', [ 'GenerateBlocks_Dynamic_Tags', 'expand_allowed_html' ], 10, 2 );
		$output = wp_kses_post( $meta );
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
}
