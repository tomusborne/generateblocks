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
class GenerateBlocks_Dynamic_Tags extends GenerateBlocks_Singleton {
	/**
	 * Initialize all hooks.
	 *
	 * @return void
	 */
	public function init() {
		add_action( 'init', [ $this, 'register' ] );
		add_filter( 'render_block', [ $this, 'replace_tags' ], 10, 2 );
		add_action( 'rest_api_init', [ $this, 'register_rest_routes' ] );
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
	}

	/**
	 * Replace tags.
	 *
	 * @param string $content The content.
	 * @param array  $block The block.
	 * @return string
	 */
	public function replace_tags( $content, $block ) {
		return GenerateBlocks_Register_Dynamic_Tag::replace_tags( $content, $block );
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
		preg_match( '/\{(.*?)\}/', $content, $matches );

		if ( ! empty( $matches ) ) {
			$inside_brackets = $matches[1];

			if ( strpos( $inside_brackets, ' ' ) === false ) {
				$content = str_replace( '}', ' postId=' . $post_id . '}', $content );
			} elseif ( strpos( $inside_brackets, 'postId=' ) === false ) {
				$content = str_replace( '}', '|postId=' . $post_id . '}', $content );
			}
		}

		$value = GenerateBlocks_Register_Dynamic_Tag::replace_tags( $content );

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
}

GenerateBlocks_Dynamic_Tags::get_instance()->init();
