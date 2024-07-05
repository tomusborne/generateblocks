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
	/**
	 * Get the title.
	 *
	 * @param array $options The options.
	 * @return string
	 */
	public static function get_the_title( $options ) {
		$id = GenerateBlocks_Dynamic_Tags::get_id( $options );

		return get_the_title( $id );
	}

	/**
	 * Get the permalink.
	 *
	 * @param array $options The options.
	 * @return string
	 */
	public static function get_the_permalink( $options ) {
		$id = GenerateBlocks_Dynamic_Tags::get_id( $options );

		return get_permalink( $id );
	}

	/**
	 * Get the published date.
	 *
	 * @param array $options The options.
	 * @return string
	 */
	public static function get_published_date( $options ) {
		$id = GenerateBlocks_Dynamic_Tags::get_id( $options );
		return get_the_date( '', $id );
	}

	/**
	 * Get the modified date.
	 *
	 * @param array $options The options.
	 * @return string
	 */
	public static function get_modified_date( $options ) {
		$id = GenerateBlocks_Dynamic_Tags::get_id( $options );
		return get_the_modified_date( '', $id );
	}

	/**
	 * Get the featuredimage URL.
	 *
	 * @param array $options The options.
	 * @return int
	 */
	public static function get_featured_image_url( $options ) {
		$id = GenerateBlocks_Dynamic_Tags::get_id( $options );
		$image_id = get_post_thumbnail_id( $id );

		if ( ! $image_id ) {
			return '';
		}

		$image = wp_get_attachment_image_src( $image_id, 'full' );

		if ( ! $image ) {
			return '';
		}

		return $image[0];
	}

	/**
	 * Get the featured image ID.
	 *
	 * @param array $options The options.
	 * @return int
	 */
	public static function get_featured_image_id( $options ) {
		$id = GenerateBlocks_Dynamic_Tags::get_id( $options );
		$image_id = get_post_thumbnail_id( $id );

		if ( ! $image_id ) {
			return 0;
		}

		return $image_id;
	}

	/**
	 * Get the post meta.
	 *
	 * @param array $options The options.
	 * @return string
	 */
	public static function get_post_meta( $options ) {
		$id = GenerateBlocks_Dynamic_Tags::get_id( $options );
		$meta = get_post_meta( $id, $options['metaKey'], true );

		if ( ! $meta ) {
			return '';
		}

		add_filter( 'wp_kses_allowed_html', [ 'GenerateBlocks_Dynamic_Tags', 'expand_allowed_html' ], 10, 2 );
		$meta = wp_kses_post( $meta );
		remove_filter( 'wp_kses_allowed_html', [ 'GenerateBlocks_Dynamic_Tags', 'expand_allowed_html' ], 10, 2 );

		return $meta;
	}

	/**
	 * Get the previous post page URL.
	 *
	 * @param array $options The options.
	 * @param array $block The block.
	 * @param array $instance The block instance.
	 * @return string
	 */
	public static function get_previous_posts_page_url( $options, $block, $instance ) {
		$page_key = isset( $instance->context['generateblocks/queryId'] ) ? 'query-' . $instance->context['generateblocks/queryId'] . '-page' : 'query-page';
		$page     = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ]; // phpcs:ignore -- No data processing happening.

		if ( isset( $instance->context['generateblocks/inheritQuery'] ) && $instance->context['generateblocks/inheritQuery'] ) {
			global $paged;

			if ( $paged > 1 ) {
				$url = previous_posts( false );
			}
		} elseif ( 1 !== $page ) {
			$url = esc_url( add_query_arg( $page_key, $page - 1 ) );
		}

		return $url ?? '';
	}

	/**
	 * Get the next post page URL.
	 *
	 * @param array $options The options.
	 * @param array $block The block.
	 * @param array $instance The block instance.
	 * @return string
	 */
	public static function get_next_posts_page_url( $options, $block, $instance ) {
		$page_key = isset( $instance->context['generateblocks/queryId'] ) ? 'query-' . $instance->context['generateblocks/queryId'] . '-page' : 'query-page';
		$page     = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ]; // phpcs:ignore -- No data processing happening.
		$max_page = isset( $instance->context['generateblocks/query']['pages'] ) ? (int) $instance->context['generateblocks/query']['pages'] : 0;

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
				$url = next_posts( $max_page, false );
			}
		} elseif ( ! $max_page || $max_page > $page ) {
			$custom_query = $instance->context['generateblocks/queryData'] ?? null;

			if ( ! $custom_query ) {
				return '';
			}

			$custom_query_max_pages = (int) $custom_query->max_num_pages;

			if ( $custom_query_max_pages && $custom_query_max_pages !== $page ) {
				$url = esc_url( add_query_arg( $page_key, $page + 1 ) );
			}

			wp_reset_postdata(); // Restore original Post Data.
		}

		return $url ?? '';
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

		if ( ! post_password_required( $id ) && ( comments_open( $id ) || get_comments_number( $id ) ) ) {
			if ( '' === $none && get_comments_number( $id ) < 1 ) {
				return $none;
			}

			return get_comments_number_text(
				$none,
				$single,
				$multi
			);
		} else {
			return $none;
		}
	}

	/**
	 * Get the comments URL.
	 *
	 * @param array $options The options.
	 * @return string
	 */
	public static function get_the_comments_url( $options ) {
		$id = GenerateBlocks_Dynamic_Tags::get_id( $options );

		return get_comments_link( $id );
	}

	/**
	 * Get the user meta.
	 *
	 * @param array $options The options.
	 * @return string
	 */
	public static function get_user_meta( $options ) {
		$id      = GenerateBlocks_Dynamic_Tags::get_id( $options );
		$user_id = get_post_field( 'post_author', $id );
		$key     = $options['metaKey'] ?? '';

		if ( ! $user_id || ! $key ) {
			return '';
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
		$meta = wp_kses_post( $meta );
		remove_filter( 'wp_kses_allowed_html', [ 'GenerateBlocks_Dynamic_Tags', 'expand_allowed_html' ], 10, 2 );

		return $meta;
	}
}
