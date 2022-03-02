<?php
/**
 * Handles option changes on plugin updates.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Process option updates if necessary.
 */
class GenerateBlocks_Dynamic_Content {
	/**
	 * Class instance.
	 *
	 * @access private
	 * @var $instance Class instance.
	 */
	private static $instance;

	/**
	 * Initiator
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Get the requested dynamic content.
	 *
	 * @param array    $attributes The block attributes.
	 * @param WP_Block $block Block instance.
	 */
	public static function get_content( $attributes, $block ) {
		switch ( $attributes['contentType'] ) {
			case 'post-title':
				return self::get_post_title( $attributes );

			case 'post-excerpt':
				return self::get_post_excerpt( $attributes );

			case 'post-date':
				return self::get_post_date( $attributes );

			case 'post-meta':
				return self::get_post_meta( $attributes );

			case 'comments-number':
				return self::get_comments_number( $attributes );

			case 'terms':
				return self::get_terms( $attributes );

			case 'author-meta':
				return self::get_author_meta( $attributes );

			case 'author-email':
				return self::get_user_data( self::get_source_author_id( $attributes ), 'user_email' );

			case 'author-name':
				return self::get_user_data( self::get_source_author_id( $attributes ), 'display_name' );

			case 'author-nickname':
				return self::get_user_data( self::get_source_author_id( $attributes ), 'nickname' );

			case 'author-first-name':
				return self::get_user_data( self::get_source_author_id( $attributes ), 'first_name' );

			case 'author-last-name':
				return self::get_user_data( self::get_source_author_id( $attributes ), 'last_name' );

			case 'pagination-numbers':
				return self::get_paginate_links( $attributes, $block );
		}
	}

	/**
	 * Get the requested post title.
	 *
	 * @param array $attributes The block attributes.
	 */
	public static function get_post_title( $attributes ) {
		$post_title = get_the_title( self::get_source_id( $attributes ) );

		if ( ! in_the_loop() ) {
			if ( is_tax() || is_category() || is_tag() ) {
				$post_title = get_queried_object()->name;
			} elseif ( is_post_type_archive() ) {
				$post_title = post_type_archive_title( '', false );
			} elseif ( is_archive() && function_exists( 'get_the_archive_title' ) ) {
				$post_title = get_the_archive_title();
			} elseif ( is_home() ) {
				$page_for_posts = get_option( 'page_for_posts' );

				if ( ! empty( $page_for_posts ) ) {
					$post_title = get_the_title( $page_for_posts );
				} else {
					$post_title = __( 'Blog', 'generateblocks' );
				}
			}
		}

		return $post_title;
	}

	/**
	 * Get the post excerpt
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return string
	 */
	public static function get_post_excerpt( $attributes ) {
		return get_the_excerpt( self::get_source_id( $attributes ) );
	}

	/**
	 * Get the requested post date.
	 *
	 * @param array $attributes The block attributes.
	 */
	public static function get_post_date( $attributes ) {
		$id = self::get_source_id( $attributes );

		if ( ! $id ) {
			return;
		}

		$updated_time = get_the_modified_time( 'U', $id );
		$published_time = get_the_time( 'U', $id ) + 1800;

		$post_date = sprintf(
			'<time class="entry-date published" datetime="%1$s">%2$s</time>',
			esc_attr( get_the_date( 'c', $id ) ),
			esc_html( get_the_date( '', $id ) )
		);

		$is_updated_date = isset( $attributes['dateType'] ) && 'updated' === $attributes['dateType'];

		if ( ! empty( $attributes['dateReplacePublished'] ) || $is_updated_date ) {
			if ( $updated_time > $published_time ) {
				$post_date = sprintf(
					'<time class="entry-date updated-date" datetime="%1$s">%2$s</time>',
					esc_attr( get_the_modified_date( 'c', $id ) ),
					esc_html( get_the_modified_date( '', $id ) )
				);
			} elseif ( $is_updated_date ) {
				// If we're showing the updated date but no updated date exists, don't display anything.
				return '';
			}
		}

		return $post_date;
	}

	/**
	 * Get the requested post meta.
	 *
	 * @param array $attributes The block attributes.
	 */
	public static function get_post_meta( $attributes ) {
		if ( isset( $attributes['metaFieldName'] ) ) {
			$meta_value = get_post_meta( self::get_source_id( $attributes ), $attributes['metaFieldName'], true );
			return (
				is_string( $meta_value ) ||
				is_integer( $meta_value ) ||
				is_float( $meta_value )
			) ? $meta_value : '';
		}
	}

	/**
	 * Get the requested author meta.
	 *
	 * @param array $attributes The block attributes.
	 */
	public static function get_author_meta( $attributes ) {
		if ( isset( $attributes['metaFieldName'] ) ) {
			$id = self::get_source_id( $attributes );

			if ( ! $id ) {
				return;
			}

			$author_id = get_post_field( 'post_author', $id );

			if ( ! $author_id ) {
				return;
			}

			return self::get_user_data( $author_id, $attributes['metaFieldName'] );
		}
	}

	/**
	 * Get the number of comments.
	 *
	 * @param array $attributes The block attributes.
	 */
	public static function get_comments_number( $attributes ) {
		$id = self::get_source_id( $attributes );

		if ( ! $id ) {
			return;
		}

		if ( ! isset( $attributes['noCommentsText'] ) ) {
			$attributes['noCommentsText'] = __( 'No comments', 'generateblocks' );
		}

		if ( ! post_password_required( $id ) && ( comments_open( $id ) || get_comments_number( $id ) ) ) {
			if ( '' === $attributes['noCommentsText'] && get_comments_number( $id ) < 1 ) {
				return $attributes['noCommentsText'];
			}

			$comments_text = get_comments_number_text(
				$attributes['noCommentsText'],
				! empty( $attributes['singleCommentText'] ) ? $attributes['singleCommentText'] : __( '1 comment', 'generateblocks' ),
				! empty( $attributes['multipleCommentsText'] ) ? $attributes['multipleCommentsText'] : __( '% comments', 'generateblocks' )
			);

			return $comments_text;
		} else {
			return $attributes['noCommentsText'];
		}
	}

	/**
	 * Get a list of terms.
	 *
	 * @param array $attributes The block attributes.
	 */
	public static function get_terms( $attributes ) {
		$id = self::get_source_id( $attributes );

		if ( ! $id ) {
			return;
		}

		$is_button = isset( $attributes['isButton'] );
		$taxonomy = isset( $attributes['termTaxonomy'] ) ? $attributes['termTaxonomy'] : 'category';
		$terms = get_the_terms( $id, $taxonomy );
		$link_type = isset( $attributes['dynamicLinkType'] ) ? $attributes['dynamicLinkType'] : '';

		if ( is_wp_error( $terms ) ) {
			return;
		}

		$term_items = array();

		foreach ( (array) $terms as $index => $term ) {
			if ( ! isset( $term->name ) ) {
				continue;
			}

			if ( $is_button ) {
				$term_items[ $index ] = array(
					'content' => $term->name,
					'attributes' => array(
						'class' => 'post-term-item post-term-' . $term->slug,
					),
				);
			} else {
				$term_items[ $index ] = sprintf(
					'<span class="post-term-item term-%2$s">%1$s</span>',
					$term->name,
					$term->slug
				);
			}

			if ( 'term-archives' === $link_type ) {
				$term_link = get_term_link( $term, $taxonomy );

				if ( ! is_wp_error( $term_link ) ) {
					if ( $is_button ) {
						$term_items[ $index ]['attributes']['href'] = esc_url( get_term_link( $term, $taxonomy ) );
					} else {
						$term_items[ $index ] = sprintf(
							'<span class="post-term-item term-%3$s"><a href="%1$s">%2$s</a></span>',
							esc_url( get_term_link( $term, $taxonomy ) ),
							$term->name,
							$term->slug
						);
					}
				}
			}
		}

		if ( empty( $term_items ) ) {
			return '';
		}

		$sep = isset( $attributes['termSeparator'] ) ? $attributes['termSeparator'] : ', ';
		$term_output = $is_button ? $term_items : implode( $sep, $term_items );

		return $term_output;
	}

	/**
	 * Get the pagination numbers.
	 *
	 * @param array    $attributes The block attributes.
	 * @param WP_Block $block Block instance.
	 */
	public static function get_paginate_links( $attributes, $block ) {
		$page_key = isset( $block->context['generateblocks/gridId'] ) ? 'query-' . $block->context['generateblocks/gridId'] . '-page' : 'query-page';
		$page     = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ]; // phpcs:ignore -- No data processing happening.
		$max_page = isset( $block->context['generateblocks/query']['pages'] ) ? (int) $block->context['generateblocks/query']['pages'] : 0;

		global $wp_query;

		$block_query = new WP_Query( GenerateBlocks_Query_Loop::get_query_args( $block, $page ) );

		// `paginate_links` works with the global $wp_query, so we have to
		// temporarily switch it with our custom query.
		$prev_wp_query = $wp_query;
		$wp_query      = $block_query; // phpcs:ignore -- No way around overwriting core global.
		$total         = ! $max_page || $max_page > $wp_query->max_num_pages ? $wp_query->max_num_pages : $max_page;

		$paginate_args = array(
			'base'      => '%_%',
			'format'    => "?$page_key=%#%",
			'current'   => max( 1, $page ),
			'total'     => $total,
			'prev_next' => false,
		);

		if ( 1 !== $page ) {
			/**
			 * `paginate_links` doesn't use the provided `format` when the page is `1`.
			 * This is great for the main query as it removes the extra query params
			 * making the URL shorter, but in the case of multiple custom queries is
			 * problematic. It results in returning an empty link which ends up with
			 * a link to the current page.
			 *
			 * A way to address this is to add a `fake` query arg with no value that
			 * is the same for all custom queries. This way the link is not empty and
			 * preserves all the other existent query args.
			 *
			 * @see https://developer.wordpress.org/reference/functions/paginate_links/
			 *
			 * The proper fix of this should be in core. Track Ticket:
			 * @see https://core.trac.wordpress.org/ticket/53868
			 *
			 * TODO: After two WP versions (starting from the WP version the core patch landed),
			 * we should remove this and call `paginate_links` with the proper new arg.
			 */
			$paginate_args['add_args'] = array( 'cst' => '' );
		}

		// We still need to preserve `paged` query param if exists, as is used
		// for Queries that inherit from global context.
		$paged = empty( $_GET['paged'] ) ? null : (int) $_GET['paged']; // phpcs:ignore -- No data processing happening.

		if ( $paged ) {
			$paginate_args['add_args'] = array( 'paged' => $paged );
		}

		$links = paginate_links( $paginate_args );
		wp_reset_postdata(); // Restore original Post Data.
		$wp_query = $prev_wp_query; // phpcs:ignore -- Restoring core global.

		$doc = self::load_html( $links );

		if ( ! $doc ) {
			return;
		}

		$data = array();
		$html_nodes = $doc->getElementsByTagName( '*' );

		foreach ( $html_nodes as $index => $node ) {
			// phpcs:ignore -- DOMDocument doesn't use snake-case.
			if ( 'span' === $node->tagName || 'a' === $node->tagName ) {
				$data[ $index ]['href'] = $node->getAttribute( 'href' ) ? $node->getAttribute( 'href' ) : '';
				$data[ $index ]['aria-current'] = $node->getAttribute( 'aria-current' ) ? $node->getAttribute( 'aria-current' ) : '';
				$data[ $index ]['class'] = $node->getAttribute( 'class' ) ? $node->getAttribute( 'class' ) : '';

				// phpcs:ignore -- DOMDocument doesn't use snake-case.
				foreach ( $node->childNodes as $childNode ) {
					$data[ $index ]['content'] = $doc->saveHTML( $childNode );
				}
			}
		}

		$paginate_links = array_values( $data );
		$link_items = array();

		foreach ( (array) $paginate_links as $index => $link ) {
			$link_items[ $index ] = array(
				'content' => $link['content'],
				'attributes' => array(
					'href' => $link['href'],
					'aria-current' => $link['aria-current'],
					'class' => $link['class'],
				),
			);
		}

		if ( empty( $link_items ) ) {
			return '';
		}

		return $link_items;
	}

	/**
	 * Get our source ID.
	 *
	 * @param array $attributes The block attributes.
	 */
	public static function get_source_id( $attributes ) {
		if (
			isset( $attributes['dynamicSource'] ) &&
			'current-post' !== $attributes['dynamicSource'] &&
			isset( $attributes['postId'] )
		) {
			return absint( $attributes['postId'] );
		}

		if ( ! is_singular() ) {
			return get_queried_object_id();
		}

		return get_the_ID();
	}

	/**
	 * Get the source post author id.
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return int|boolean
	 */
	public static function get_source_author_id( $attributes ) {
		$id = self::get_source_id( $attributes );

		if ( ! $id ) {
			return false;
		}

		$author_id = get_post_field( 'post_author', $id );

		if ( ! $author_id ) {
			return false;
		}

		return $author_id;
	}

	/**
	 * Get the featured image URL.
	 *
	 * @param array $attributes The block attributes.
	 *
	 * @return int|boolean
	 */
	public static function get_featured_image_url( $attributes ) {
		$id = self::get_source_id( $attributes );

		if ( ! $id ) {
			return false;
		}

		$size = isset( $attributes['bgImageSize'] ) ? $attributes['bgImageSize'] : 'full';

		return get_the_post_thumbnail_url( $id, $size );
	}

	/**
	 * Get our dynamic URL.
	 *
	 * @param array  $attributes The block attributes.
	 * @param object $block The block object.
	 */
	public static function get_dynamic_url( $attributes, $block ) {
		$id = self::get_source_id( $attributes );
		$author_id = get_post_field( 'post_author', $id );
		$link_type = isset( $attributes['dynamicLinkType'] ) ? $attributes['dynamicLinkType'] : '';
		$url = '';

		if ( 'single-post' === $link_type ) {
			$url = get_permalink( $id );
		}

		if ( isset( $attributes['linkMetaFieldName'] ) ) {
			if ( 'post-meta' === $link_type ) {
				$url = get_post_meta( $id, $attributes['linkMetaFieldName'], true );
			}

			if ( 'user-meta' === $link_type ) {
				$url = self::get_user_data( $author_id, $attributes['linkMetaFieldName'] );
			}

			if ( 'term-meta' === $link_type ) {
				$url = get_term_meta( get_queried_object_id(), $attributes['linkMetaFieldName'], true );
			}
		}

		if ( 'author-archives' === $link_type ) {
			$url = get_author_posts_url( $author_id );
		}

		if ( 'comments-area' === $link_type ) {
			$url = get_comments_link( $id );
		}

		if ( 'pagination-next' === $link_type ) {
			$page_key = isset( $block->context['generateblocks/gridId'] ) ? 'query-' . $block->context['generateblocks/gridId'] . '-page' : 'query-page';
			$page     = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ]; // phpcs:ignore -- No data processing happening.
			$max_page = isset( $block->context['generateblocks/query']['pages'] ) ? (int) $block->context['generateblocks/query']['pages'] : 0;

			if ( ! $max_page || $max_page > $page ) {
				$custom_query           = new WP_Query( GenerateBlocks_Query_Loop::get_query_args( $block, $page ) );
				$custom_query_max_pages = (int) $custom_query->max_num_pages;

				if ( $custom_query_max_pages && $custom_query_max_pages !== $page ) {
					$url = esc_url( add_query_arg( $page_key, $page + 1 ) );
				}

				wp_reset_postdata(); // Restore original Post Data.
			}
		}

		if ( 'pagination-prev' === $link_type ) {
			$page_key = isset( $block->context['generateblocks/gridId'] ) ? 'query-' . $block->context['generateblocks/gridId'] . '-page' : 'query-page';
			$page     = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ]; // phpcs:ignore -- No data processing happening.

			if ( 1 !== $page ) {
				$url = esc_url( add_query_arg( $page_key, $page - 1 ) );
			}
		}

		return $url;
	}

	/**
	 * Get user data.
	 *
	 * @param int         $author_id The ID of the user.
	 * @param string|void $field The field to look up.
	 */
	public static function get_user_data( $author_id, $field ) {
		if ( ! $author_id ) {
			return;
		}

		$data = get_user_meta( $author_id, $field, true );

		if ( ! $data ) {
			$user_data_names = array(
				'user_nicename',
				'user_email',
				'display_name',
			);

			if ( in_array( $field, $user_data_names ) ) {
				$user_data = get_userdata( $author_id );

				if ( $user_data ) {
					switch ( $field ) {
						case 'user_nicename':
							$data = $user_data->user_nicename;
							break;

						case 'user_email':
							$data = $user_data->user_email;
							break;

						case 'display_name':
							$data = $user_data->display_name;
							break;
					}
				}
			}
		}

		return $data;
	}

	/**
	 * Run HTML through DOMDocument so we can use parts of it
	 * when needed.
	 *
	 * @param string $content The content to run through DOMDocument.
	 */
	public static function load_html( $content ) {
		if ( ! class_exists( 'DOMDocument' ) ) {
			return;
		}

		$doc = new DOMDocument();

		// Enable user error handling for the HTML parsing. HTML5 elements aren't
		// supported (as of PHP 7.4) and There's no way to guarantee that the markup
		// is valid anyway, so we're just going to ignore all errors in parsing.
		// Nested heading elements will still be parsed.
		// The lack of HTML5 support is a libxml2 issue:
		// https://bugzilla.gnome.org/show_bug.cgi?id=761534.
		libxml_use_internal_errors( true );

		// Parse the post content into an HTML document.
		$doc->loadHTML(
			// loadHTML expects ISO-8859-1, so we need to convert the post content to
			// that format. We use htmlentities to encode Unicode characters not
			// supported by ISO-8859-1 as HTML entities. However, this function also
			// converts all special characters like < or > to HTML entities, so we use
			// htmlspecialchars_decode to decode them.
			htmlspecialchars_decode(
				utf8_decode(
					htmlentities(
						'<html><body>' . $content . '</body></html>',
						ENT_COMPAT,
						'UTF-8',
						false
					)
				),
				ENT_COMPAT
			)
		);

		// We're done parsing, so we can disable user error handling. This also
		// clears any existing errors, which helps avoid a memory leak.
		libxml_use_internal_errors( false );

		return $doc;
	}

	/**
	 * Extracts the icon element from our content.
	 * This is useful when using icons in dynamic blocks.
	 *
	 * @param string $content The content to search through.
	 */
	public static function get_icon_html( $content ) {
		$doc = self::load_html( $content );

		if ( ! $doc ) {
			return;
		}

		$icon_html = '';
		$html_nodes = $doc->getElementsByTagName( 'span' );

		foreach ( $html_nodes as $node ) {
			if ( 'gb-icon' === $node->getAttribute( 'class' ) ) {
				$icon_html = $doc->saveHTML( $node );
			}
		}

		return $icon_html;
	}

	/**
	 * Extracts the static content the user has entered.
	 * This is useful when using dynamic links with static content.
	 *
	 * @param string $content The content to search through.
	 */
	public static function get_static_content( $content ) {
		$doc = self::load_html( $content );

		if ( ! $doc ) {
			return;
		}

		$static_content = '';
		$html_nodes = $doc->getElementsByTagName( '*' );

		foreach ( $html_nodes as $node ) {
			if (
				strpos( $node->getAttribute( 'class' ), 'gb-button-text' ) !== false ||
				strpos( $node->getAttribute( 'class' ), 'gb-headline-text' ) !== false
			) {
				// phpcs:ignore -- DOMDocument doesn't use snake-case.
				foreach ( $node->childNodes as $childNode ) {
					$static_content .= $doc->saveHTML( $childNode );
				}
			}
		}

		return $static_content;
	}
}

GenerateBlocks_Dynamic_Content::get_instance();
