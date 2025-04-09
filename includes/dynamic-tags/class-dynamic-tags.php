<?php
/**
 * The Dynamic Tags class file.
 *
 * @package GenerateBlocks\Dynamic_Tags
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class for handling dynamic tags.
 *
 * @since 2.0.0
 */
class GenerateBlocks_Dynamic_Tags extends GenerateBlocks_Singleton {
	/**
	 * Initialize all hooks.
	 *
	 * @return void
	 */
	public function init() {
		add_action( 'init', [ $this, 'register' ] );
		add_filter( 'render_block', [ $this, 'replace_tags' ], 10, 3 );
		add_action( 'rest_api_init', [ $this, 'register_rest_routes' ] );
		add_filter( 'generateblocks_before_dynamic_tag_replace', [ $this, 'before_tag_replace' ], 10, 2 );
		add_filter( 'generateblocks_dynamic_tag_replacement', [ $this, 'alter_replacement' ], 10, 2 );
	}

	/**
	 * Register the tags.
	 *
	 * @return void
	 */
	public function register() {
		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'    => __( 'Post Title', 'generateblocks' ),
				'tag'      => 'post_title',
				'type'     => 'post',
				'supports' => [ 'link', 'source' ],
				'return'   => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_the_title' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'    => __( 'Post Excerpt', 'generateblocks' ),
				'tag'      => 'post_excerpt',
				'type'     => 'post',
				'supports' => [ 'source' ],
				'options'  => [
					'length' => [
						'type'        => 'number',
						'label'       => __( 'Excerpt Length', 'generateblocks' ),
						'placeholder' => __( '55', 'generateblocks' ),
						'default'     => 55,
						'help'        => __( 'Enter the number of words to display in the excerpt. If empty, the default theme behavior is used.', 'generateblocks' ),
					],
					'useTheme' => [
						'type'        => 'checkbox',
						'label'       => __( 'Use Theme Read More', 'generateblocks' ),
						'help'        => __( 'Use the theme read more text. Uncheck to use the custom settings below.', 'generateblocks' ),
						'default'     => true,
					],
					'pre' => [
						'type'        => 'text',
						'label'       => __( 'Pre Read More Text', 'generateblocks' ),
						'help'        => __( 'Enter text between the truncated post excerpt and the read more link.', 'generateblocks' ),
					],
					'readMore' => [
						'type'        => 'text',
						'label'       => __( 'Read More Text', 'generateblocks' ),
						'help'        => __( 'Enter the text for the "Read More" link. Leave blank to hide the link.', 'generateblocks' ),
					],
				],
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_post_excerpt' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'    => __( 'Post Permalink', 'generateblocks' ),
				'tag'      => 'post_permalink',
				'type'     => 'post',
				'supports' => [ 'source' ],
				'return'   => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_the_permalink' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'    => __( 'Post Date', 'generateblocks' ),
				'tag'      => 'post_date',
				'type'     => 'post',
				'supports' => [ 'date', 'link', 'source' ],
				'options'  => [
					'type' => [
						'type'    => 'select',
						'label'   => __( 'Date type', 'generateblocks' ),
						'default' => '',
						'options' => [
							[
								'value' => '',
								'label' => __( 'Published', 'generateblocks' ),
							],
							[
								'value' => 'modified',
								'label' => __( 'Modified', 'generateblocks' ),
							],
							[
								'value' => 'modifiedOnly',
								'label' => __( 'Modified Only', 'generateblocks' ),
							],
						],
					],
				],
				'return'   => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_post_date' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'    => __( 'Featured Image', 'generateblocks' ),
				'tag'      => 'featured_image',
				'type'     => 'post',
				'supports' => [ 'source', 'image-size' ],
				'options'  => [
					'key' => [
						'type'    => 'select',
						'label'   => __( 'Image Key', 'generateblocks' ),
						'default' => 'url',
						'options' => [
							'url',
							'id',
							'caption',
							'description',
							'alt',
						],
					],
				],
				'return'   => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_featured_image' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'       => __( 'Post Meta', 'generateblocks' ),
				'tag'         => 'post_meta',
				'type'        => 'post',
				'supports'    => [ 'meta', 'source', 'link' ],
				'description' => __( 'Access post meta by key for the specified post. Return value must be a string.', 'generateblocks' ),
				'return'      => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_post_meta' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'       => __( 'Author Meta', 'generateblocks' ),
				'tag'         => 'author_meta',
				'type'        => 'author',
				'supports'    => [ 'meta', 'source', 'link' ],
				'description' => __( 'Access user meta by key for the author of the specified post. Return value must be a string.', 'generateblocks' ),
				'return'      => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_author_meta' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'    => __( 'Comments Count', 'generateblocks' ),
				'tag'      => 'comments_count',
				'type'     => 'post',
				'supports' => [ 'link', 'comments', 'source' ],
				'options'  => [
					'none' => [
						'label'       => __( 'No comments text', 'generateblocks' ),
						'placeholder' => __( 'No comments', 'generateblocks' ),
						'type'        => 'text',
					],
					'single' => [
						'label'       => __( 'One comment text', 'generateblocks' ),
						'placeholder' => __( 'One comment', 'generateblocks' ),
						'type'        => 'text',
					],
					'multiple' => [
						'label'       => __( 'Multiple comments text', 'generateblocks' ),
						// Translators: % is the number of comments.
						'placeholder' => __( '% comments', 'generateblocks' ),
						'type'        => 'text',
					],
				],
				'return'   => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_the_comments_count' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'    => __( 'Comments URL', 'generateblocks' ),
				'tag'      => 'comments_url',
				'type'     => 'post',
				'supports' => [ 'comments', 'source' ],
				'return'   => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_the_comments_url' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'    => __( 'Author Archives URL', 'generateblocks' ),
				'tag'      => 'author_archives_url',
				'type'     => 'author',
				'supports' => [ 'source' ],
				'return'   => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_author_archive_url' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'    => __( 'Author Avatar URL', 'generateblocks' ),
				'tag'      => 'author_avatar_url',
				'type'     => 'author',
				'supports' => [ 'source' ],
				'options'  => [
					'size' => [
						'type'  => 'number',
						'label' => __( 'Avatar Size', 'generateblocks' ),
						'help'  => __( 'Enter the image size in pixels. Default: 96' ),
					],
					'default' => [
						'type'  => 'select',
						'label' => __( 'Default URL', 'generateblocks' ),
						'options' => [
							[
								'label' => __( 'Default', 'generateblocks' ),
								'value' => '',
							],
							'404',
							'retro',
							'robohash',
							'monsterid',
							'wavatar',
							'identicon',
							'mystery',
							'blank',
							'gravatar_default',
						],
					],
					'forceDefault' => [
						'type'  => 'checkbox',
						'label' => __( 'Force default avatar', 'generateblocks' ),
						'help'  => __( 'Check this box to show the default URL instead of the actual avatar URL.' ),
					],
					'rating' => [
						'type'    => 'select',
						'label'   => __( 'Rating', 'generateblocks' ),
						'options' => [
							'G',
							'PG',
							'R',
							'X',
						],
					],
				],
				'return'   => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_author_avatar_url' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'       => __( 'Term List', 'generateblocks' ),
				'tag'         => 'term_list',
				'type'        => 'post',
				'supports'    => [ 'link', 'source', 'taxonomy' ],
				'description' => __( 'Get a list of terms for the specified post.', 'generateblocks' ),
				'options'     => [
					'sep' => [
						'type'        => 'text',
						'label'       => __( 'Separator', 'generateblocks' ),
						'help'        => __( 'Enter the separator between terms.' ),
					],
				],
				'visibility'  => [
					'attributes' => [
						[
							'name'    => 'tagName',
							'value'   => [
								'a',
								'button',
								'img',
								'picture',
							],
							'compare' => 'NOT_IN',
						],
					],
				],
				'return'      => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_term_list' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'    => __( 'Previous Posts URL', 'generateblocks' ),
				'tag'      => 'previous_posts_page_url',
				'type'     => 'post',
				'supports' => [ 'source', 'instant-pagination' ],
				'return'   => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_previous_posts_page_url' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'    => __( 'Next Posts URL', 'generateblocks' ),
				'tag'      => 'next_posts_page_url',
				'type'     => 'post',
				'supports' => [ 'source', 'instant-pagination' ],
				'return'   => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_next_posts_page_url' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'    => __( 'Media', 'generateblocks' ),
				'tag'      => 'media',
				'type'     => 'media',
				'supports' => [],
				'options'  => [
					'key' => [
						'type'    => 'select',
						'label'   => __( 'Media Key', 'generateblocks' ),
						'default' => 'url',
						'options' => [
							'url',
							'id',
							'caption',
							'description',
							'alt',
						],
					],
				],
				'return'   => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_media' ],
			]
		);
	}

	/**
	 * Get allowed blocks.
	 *
	 * @return array
	 */
	public function get_allowed_blocks() {
		return apply_filters(
			'generateblocks_dynamic_tags_allowed_blocks',
			[
				'generateblocks/element',
				'generateblocks/loop-item',
				'generateblocks/looper',
				'generateblocks/media',
				'generateblocks/query',
				'generateblocks/query-page-numbers',
				'generateblocks/shape',
				'generateblocks/text',
			]
		);
	}

	/**
	 * Replace tags.
	 *
	 * @param string $content The content.
	 * @param array  $block The block.
	 * @param array  $instance The instance.
	 * @return string
	 */
	public function replace_tags( $content, $block, $instance ) {
		$block_name = $block['blockName'] ?? '';

		if ( $block_name && in_array( $block_name, $this->get_allowed_blocks(), true ) ) {
			return GenerateBlocks_Register_Dynamic_Tag::replace_tags( $content, $block, $instance );
		}

		return $content;
	}

	/**
	 * Get the source ID.
	 *
	 * @param array  $options The options.
	 * @param string $fallback_type The type of entity used for the fallback value.
	 * @param object $instance The block instance.
	 * @return int
	 */
	public static function get_id( $options, $fallback_type = 'post', $instance = null ) {
		if ( isset( $options['id'] ) ) {
			$id = absint( $options['id'] );
		} elseif ( 'user' === $fallback_type ) {
			$id = get_current_user_id();
		} elseif ( 'term' === $fallback_type ) {
			$id = get_queried_object_id();
		} else {
			$id = get_the_ID();
		}

		/**
		 * Allow users to filter the id option for a dynamic tag.
		 *
		 * @param int    $id The current ID value for the tag.
		 * @param array  $options The tag options.
		 * @param object $instance The block instance for the block containing the tag.
		 */
		return apply_filters(
			'generateblocks_dynamic_tag_id',
			$id,
			$options,
			is_object( $instance ) ? $instance : new stdClass()
		);
	}

	/**
	 * Register REST routes.
	 *
	 * @return void
	 */
	public function register_rest_routes() {
		register_rest_route(
			'generateblocks/v1',
			'/dynamic-tag-replacements',
			[
				'methods'  => 'POST',
				'callback' => [ $this, 'get_dynamic_tag_replacements' ],
				'permission_callback' => function() {
					return current_user_can( 'edit_posts' );
				},
			]
		);

		register_rest_route(
			'generateblocks/v1',
			'/post-record',
			array(
				'methods'  => 'GET',
				'callback' => [ $this, 'get_custom_post_record' ],
				'permission_callback' => function() {
					return current_user_can( 'edit_posts' );
				},
				'args'     => array(
					'postId'   => array(
						'required' => true,
						'validate_callback' => function( $param, $request, $key ) {
							return is_numeric( $param );
						},
					),
					'load'     => array(
						'required' => false,
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param ) || is_array( $param );
						},
						'sanitize_callback' => function( $param, $request, $key ) {
							return is_string( $param ) ? explode( ',', $param ) : $param;
						},
					),
					'options'  => array(
						'required' => false,
						'validate_callback' => function( $param, $request, $key ) {
							return is_string( $param ) || is_array( $param );
						},
						'sanitize_callback' => function( $param, $request, $key ) {
							return is_string( $param ) ? json_decode( $param, true ) : $param;
						},
					),
				),
			)
		);

		register_rest_route(
			'generateblocks/v1',
			'/get-user-record',
			array(
				'methods'  => 'GET',
				'callback' => [ $this, 'get_user_record' ],
				'permission_callback' => function() {
					return current_user_can( 'edit_posts' );
				},
				'args' => array(
					'id' => array(
						'required'          => true,
						'validate_callback' => function( $param ) {
							return is_numeric( $param );
						},
					),
				),
			)
		);
	}

	/**
	 * Get dynamic tag.
	 *
	 * @param WP_REST_Request $request The request.
	 * @return WP_REST_Response
	 */
	public function get_dynamic_tag_replacements( $request ) {
		$content      = $request->get_param( 'content' );
		$context      = $request->get_param( 'context' );
		$client_id    = $request->get_param( 'clientId' );
		$post_id      = $context['postId'] ?? 0;
		$fallback_id  = $post_id;
		$instance     = new stdClass();
		$replacements = [];

		// Set up an instance object with a context key.
		$instance->context = $context;

		// Create a unique cache key.
		$cache_key = sprintf(
			'replacements_%s_%s_%s',
			md5( $content ),
			$client_id,
			$post_id
		);

		$replacements_cache = wp_cache_get( $cache_key, 'generate_blocks_dynamic_tags' );

		// Return the cache here if present.
		if ( false !== $replacements_cache ) {
			return rest_ensure_response( $replacements_cache );
		}

		$all_tags  = GenerateBlocks_Register_Dynamic_Tag::get_tags();
		$tags_list = [];

		foreach ( $all_tags as $tag => $data ) {
			$tags_list[] = $data['tag'];
		}

		// Match the content inside the curly brackets.
		preg_match_all( '/\{{(.*?)\}}/', $content, $matches );

		if ( ! empty( $matches ) ) {
			$inside_brackets = $matches[1];

			// Loop through our tags and add the `id` option if it doesn't exist.
			// We need to do this to ensure the dynamic tag is replaced correctly.
			foreach ( (array) $inside_brackets as $tag ) {
				$split_tag = preg_split( '/[\s|]/', $tag, 2 );
				$tag_name  = $split_tag[0];

				if ( ! in_array( $tag_name, $tags_list, true ) ) {
					continue;
				}

				$tag_details = GenerateBlocks_Register_Dynamic_Tag::get_tag_details( $tag_name );
				$type        = $tag_details['type'];
				$fallback    = $tag_details['title'];

				if ( 'user' === $type ) {
					$fallback_id = get_current_user_id();
				}

				if ( ! generateblocks_str_contains( $tag, ' ' ) ) {
					// There are no spaces in the tag, so there are no options.
					$content = str_replace( $tag, "{$tag} id:{$fallback_id}", $tag );

					$replacements[] = [
						'original' => "{{{$tag}}}",
						'replacement' => GenerateBlocks_Register_Dynamic_Tag::replace_tags( "{{{$content}}}", [], $instance ),
						'fallback'    => $fallback,
					];
				} elseif ( ! generateblocks_str_contains( $tag, 'id:' ) ) {
					// There are spaces in the tag, but no `id` option.
					$content = str_replace( $tag, "{$tag}|id:{$fallback_id}", $tag );

					$replacements[] = [
						'original' => "{{{$tag}}}",
						'replacement' => GenerateBlocks_Register_Dynamic_Tag::replace_tags( "{{{$content}}}", [], $instance ),
						'fallback'    => $fallback,
					];
				} else {
					$replacements[] = [
						'original' => "{{{$tag}}}",
						'replacement' => GenerateBlocks_Register_Dynamic_Tag::replace_tags( "{{{$tag}}}", [], $instance ),
						'fallback'    => $fallback,
					];
				}
			}
		}

		// Set the cache with filterable duration.
		/**
		 * Set the duration of the cache for dynamic tag replacements.
		 *
		 * @since 2.0.0
		 */
		$cache_duration = apply_filters( 'generateblocks_dynamic_tags_replacement_cache_duration', 3600, $content, $context, $request );

		wp_cache_set( $cache_key, $replacements, 'generateblocks_dynamic_tags', $cache_duration );

		return rest_ensure_response( $replacements );
	}


	/**
	 * Add meta fields to a user record.
	 *
	 * @param WP_User $user The user object to update.
	 * @return WP_User The updated user object.
	 */
	public function add_meta_to_user_record( $user ) {
		if ( ! $user ) {
			return $user;
		}

		$data   = get_object_vars( $user->data );
		$meta   = array_filter(
			get_user_meta( $user->ID ),
			function ( $key ) {
				$hidden  = generateblocks_str_starts_with( $key, '_' );
				$is_rest = $this->is_rest_field( $key );

				return ! $hidden && $is_rest;
			},
			ARRAY_FILTER_USE_KEY
		);

		$user_meta = array_merge(
			$data,
			$meta
		);

		// Remove all hidden or disallowed meta fields.
		$user->meta = array_filter(
			$user_meta,
			function( $key ) {
				$disallowed = in_array( $key, GenerateBlocks_Meta_Handler::DISALLOWED_KEYS, true );

				return ! $disallowed;
			},
			ARRAY_FILTER_USE_KEY
		);

		return $user;
	}

	/**
	 * Get our post record based on the requested load and post ID.
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 */
	public function get_custom_post_record( WP_REST_Request $request ) {
		$id      = $request->get_param( 'postId' );
		$load    = $request->get_param( 'load' ) ?? [];
		$options = $request->get_param( 'options' ) ?? [];

		// Fetch the post.
		$post = get_post( $id );
		if ( ! $post ) {
			return new WP_Error( 'no_post', 'Post not found', array( 'status' => 404 ) );
		}

		$response = $post;

		if ( in_array( 'post', $load, true ) ) {
			$post_meta = array_filter(
				get_post_meta( $id ),
				function ( $key ) {
					return ! generateblocks_str_starts_with( $key, '_' );
				},
				ARRAY_FILTER_USE_KEY
			);
			$response->meta = $post_meta;
		}

		// Fetch comments if requested.
		if ( in_array( 'comments', $load, true ) ) {
			$comments = get_comments( array( 'post_id' => $id ) );
			$response->comments = $comments;
		}

		// Fetch terms if requested and if taxonomy is provided in options.
		if ( in_array( 'terms', $load, true ) && isset( $options['taxonomy'] ) ) {
			$terms = wp_get_post_terms( $id, $options['taxonomy'] );
			if ( ! isset( $response->terms ) ) {
				$response->terms = [];
			}
			foreach ( $terms as $key => $data ) {
				$response->terms[] = [
					'id'   => $data->term_id,
					'name' => $data->name,
				];
			}
		}

		/**
		 * Allows filtering of the post record response data to add or alter data.
		 *
		 * @since 2.0.0
		 * @param array $response Array of response data.
		 * @param int $id ID of the post record.
		 * @param string[] $load Array of additional data to include with the post record.
		 * @param array $options Additional options for the record lookup.
		 *
		 * @return \WP_REST_Response|\WP_Error Response object.
		 */
		$filtered_response = apply_filters(
			'generateblocks_dynamic_tags_post_record_response',
			$response,
			$id,
			$load,
			$options
		);

		return rest_ensure_response( $filtered_response );
	}

	/**
	 * Get the record for a specific user by ID.
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 */
	public function get_user_record( WP_REST_Request $request ) {
		$id = $request->get_param( 'id' );

		if ( ! $id ) {
			return rest_ensure_response(
				new WP_Error(
					'Invalid user ID',
					'User ID is required',
					[ 'status' => 400 ]
				)
			);
		}

		$response = $this->add_meta_to_user_record(
			get_user_by( 'ID', $id )
		)->data;

		if ( ! $response ) {
			$response = new WP_Error(
				'User not found',
				'User not found',
				[ 'status' => 400 ]
			);
		}

		/**
		 * Allows filtering of the post record response data to add or alter data.
		 *
		 * @since 2.0.0
		 * @param array $response Array of response data.
		 * @param int $id ID of the user record.
		 *
		 * @return \WP_REST_Response|\WP_Error Response object.
		 */
		$filtered_response = apply_filters(
			'generateblocks_dynamic_tags_user_record_response',
			$response,
			$id
		);

		return rest_ensure_response( $filtered_response );
	}

	/**
	 * Before tag replace.
	 *
	 * @param string $content The content.
	 * @param array  $args The arguments.
	 * @return string
	 */
	public function before_tag_replace( $content, $args ) {
		if ( in_array( 'instant-pagination', $args['supports'], true ) ) {
			$pagination_type    = $args['instance']->context['generateblocks/queryData']['paginationType'] ?? '';
			$instant_pagination = GenerateBlocks_Block_Query::TYPE_INSTANT_PAGINATION === $pagination_type;
			$query_id           = $args['instance']->context['generateblocks/queryData']['id'] ?? '';

			if ( $instant_pagination && class_exists( 'WP_HTML_Tag_Processor' ) ) {
				$pagination_processor = new WP_HTML_Tag_Processor( $content );

				if ( $pagination_processor->next_tag(
					[
						'tag_name' => 'a',
					]
				) ) {
					$pagination_processor->set_attribute( 'data-gb-router-target', 'query-' . $query_id );
					$pagination_processor->set_attribute( 'data-gb-prefetch', true );
					$content = $pagination_processor->get_updated_html();
				}
			}
		}

		$block_name = $args['block']['blockName'] ?? '';

		// If our image `src` is an ID, add the `data-media-id` attribute so we can alter the image output later.
		if ( 'generateblocks/media' === $block_name ) {
			$src = $args['block']['attrs']['htmlAttributes']['src'] ?? '';

			if ( $src && $src === $args['full_tag'] && class_exists( 'WP_HTML_Tag_Processor' ) ) {
				$processor = new WP_HTML_Tag_Processor( $content );

				if ( $processor->next_tag( 'img' ) ) {
					$media_id    = 0;
					$replacement = $args['og_replacement'];

					if ( is_numeric( $replacement ) ) {
						$media_id = $replacement;
					} elseif ( 'featured_image' === $args['tag'] || 'media' === $args['tag'] ) {
						$key = $args['options']['key'] ?? 'url';

						if ( 'url' === $key ) {
							$args['options']['key'] = 'id';
							$callback = 'featured_image' === $args['tag']
								? 'GenerateBlocks_Dynamic_Tag_Callbacks::get_featured_image'
								: 'GenerateBlocks_Dynamic_Tag_Callbacks::get_media';

							$media_id = $callback( $args['options'], $args['block'], $args['instance'] );
						}
					}

					if ( $media_id ) {
						$processor->set_attribute( 'data-media-id', $media_id );

						if ( ! $processor->get_attribute( 'alt' ) ) {
							$processor->set_attribute( 'alt', get_post_meta( $media_id, '_wp_attachment_image_alt', true ) );
						}

						$content = $processor->get_updated_html();
					}
				}
			}
		}

		return $content;
	}

	/**
	 * Alter replacement.
	 *
	 * @param string $replacement The replacement.
	 * @param array  $args The arguments.
	 * @return string
	 */
	public function alter_replacement( $replacement, $args ) {
		if ( isset( $args['block']['blockName'] ) && 'generateblocks/media' === $args['block']['blockName'] ) {
			$src = $args['block']['attrs']['htmlAttributes']['src'] ?? '';

			if ( $src && $src === $args['full_tag'] && is_numeric( $replacement ) ) {
				$url = wp_get_attachment_url( $replacement, 'full' );

				if ( $url ) {
					$replacement = $url;
				}
			}
		}

		return $replacement;
	}

	/**
	 * Expand the wp_kses_post sanitization function to allow iframe HTML tags
	 *
	 * @param array  $tags The allowed tags, attributes, and/or attribute values.
	 * @param string $context Context to judge allowed tags by. Allowed values are 'post'.
	 * @return array
	 */
	public static function expand_allowed_html( $tags, $context ) {
		if ( ! isset( $tags['iframe'] ) ) {
			$tags['iframe'] = [
				'src'             => true,
				'height'          => true,
				'width'           => true,
				'frameborder'     => true,
				'allowfullscreen' => true,
				'title'           => true,
			];
		}

		$tags = apply_filters( 'generateblocks_dynamic_tags_allowed_html', $tags, $context );

		return $tags;
	}

	/**
	 * Check if a given key is registered as a REST field.
	 *
	 * @param string       $field_name The name of the field to check.
	 * @param string|array $types The type(s) to check against. Default is 'post', 'term', 'comment', 'user', and 'settings'.
	 *
	 * @return boolean
	 */
	public function is_rest_field(
		$field_name,
		$types = [
			'post',
			'term',
			'comment',
			'user',
			'settings',
			'page',
		]
	) {

		if ( is_string( $types ) ) {
			$types = [ $types ];
		}

		foreach ( $types as $type ) {
			$fields = get_registered_meta_keys( $type );

			if ( isset( $fields[ $field_name ] ) ) {
				return true;
			}
		}

		return false;
	}
}

GenerateBlocks_Dynamic_Tags::get_instance()->init();
