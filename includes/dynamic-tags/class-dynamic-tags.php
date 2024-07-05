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
	}

	/**
	 * Register the tags.
	 *
	 * @return void
	 */
	public function register() {
		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Post Title', 'generateblocks' ),
				'tag'    => 'post_title',
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_the_title' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Post Permalink', 'generateblocks' ),
				'tag'    => 'post_permalink',
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_the_permalink' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Published Date', 'generateblocks' ),
				'tag'    => 'published_date',
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_published_date' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Modified Date', 'generateblocks' ),
				'tag'    => 'modified_date',
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_modified_date' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Featured Image URL', 'generateblocks' ),
				'tag'    => 'featured_image_url',
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_featured_image_url' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Featured Image ID', 'generateblocks' ),
				'tag'    => 'featured_image_id',
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_featured_image_id' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Post Meta', 'generateblocks' ),
				'tag'    => 'post_meta',
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_post_meta' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Previous Posts URL', 'generateblocks' ),
				'tag'    => 'previous_posts_page_url',
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_previous_posts_page_url' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Next Posts URL', 'generateblocks' ),
				'tag'    => 'next_posts_page_url',
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_next_posts_page_url' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Comments Count', 'generateblocks' ),
				'tag'    => 'comments_count',
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_the_comments_count' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Comments URL', 'generateblocks' ),
				'tag'    => 'comments_url',
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_the_comments_url' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'User Meta', 'generateblocks' ),
				'tag'    => 'user_meta',
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_user_meta' ],
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
		return GenerateBlocks_Register_Dynamic_Tag::replace_tags( $content, $block, $instance );
	}

	/**
	 * Get the source ID.
	 *
	 * @param array $options The options.
	 * @return int
	 */
	public static function get_id( $options ) {
		$id = get_the_ID();

		if ( isset( $options['postId'] ) ) {
			$id = absint( $options['postId'] );
		}

		return apply_filters(
			'generateblocks_dynamic_source_id',
			$id
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
			'/dynamic-tag',
			[
				'methods'  => 'GET',
				'callback' => [ $this, 'get_dynamic_tag' ],
				'permission_callback' => function() {
					return current_user_can( 'edit_posts' );
				},
			]
		);

		register_rest_route(
			'generateblocks/v1',
			'/dynamic-tags',
			[
				'methods'  => 'GET',
				'callback' => [ $this, 'get_dynamic_tags' ],
				'permission_callback' => function() {
					return current_user_can( 'edit_posts' );
				},
			]
		);
	}

	/**
	 * Get dynamic tag.
	 *
	 * @param WP_REST_Request $request The request.
	 * @return WP_REST_Response
	 */
	public function get_dynamic_tag( $request ) {
		$content = urldecode( $request->get_param( 'content' ) );
		$post_id = $request->get_param( 'postId' );

		// Match the content inside the curly brackets.
		preg_match_all( '/\{(.*?)\}/', $content, $matches );

		if ( ! empty( $matches ) ) {
			$inside_brackets = $matches[1];

			foreach ( (array) $inside_brackets as $tag ) {
				if ( ! generateblocks_str_contains( $tag, ' ' ) ) {
					// Add the postId after the tag if there are no attributes.
					$content = str_replace( $tag, "{$tag} postId={$post_id}", $content );
				} elseif ( ! generateblocks_str_contains( $tag, 'postId' ) ) {
					// Add the postId after the tag if there are attributes but no postId.
					$content = str_replace( $tag, "{$tag}|postId={$post_id}", $content );
				}
			}
		}

		$value = GenerateBlocks_Register_Dynamic_Tag::replace_tags( $content, [], new stdClass() );

		return rest_ensure_response( $value );
	}

	/**
	 * Get dynamic tags.
	 *
	 * @return WP_REST_Response
	 */
	public function get_dynamic_tags() {
		$tags = GenerateBlocks_Register_Dynamic_Tag::get_tags();
		$tag_list = [];

		foreach ( $tags as $tag => $data ) {
			$tag_list[] = [
				'title' => $data['title'],
				'tag'   => $data['tag'],
			];
		}

		return rest_ensure_response( $tag_list );
	}

	/**
	 * Before tag replace.
	 *
	 * @param string $content The content.
	 * @param array  $args The arguments.
	 * @return string
	 */
	public function before_tag_replace( $content, $args ) {
		if (
			generateblocks_str_contains( $content, '{previous_posts_page_url' ) ||
			generateblocks_str_contains( $content, '{next_posts_page_url' )
		) {
			$force_reload = $args['instance']->context['generateblocks/forceReload'] ?? true;
			$query_id     = $args['instance']->context['generateblocks/queryId'] ?? '';

			if ( ! $force_reload && class_exists( 'WP_HTML_Tag_Processor' ) ) {
				$p = new WP_HTML_Tag_Processor( $content );

				if ( $p->next_tag(
					[
						'tag_name'   => 'a',
					]
				) ) {
					$p->set_attribute( 'data-gb-router-target', 'query-' . $query_id );
					$p->set_attribute( 'data-gb-prefetch', true );
					$content = $p->get_updated_html();
				}
			}
		}

		return $content;
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
}

GenerateBlocks_Dynamic_Tags::get_instance()->init();
