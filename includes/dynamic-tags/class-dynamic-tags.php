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
				'title'  => __( 'Author Meta', 'generateblocks' ),
				'tag'    => 'author_meta',
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_author_meta' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Author Archives URL', 'generateblocks' ),
				'tag'    => 'author_archives_url',
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_author_archive_url' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Current year', 'generateblocks' ),
				'tag'    => 'current_year',
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_current_year' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Site Title', 'generateblocks' ),
				'tag'    => 'site_title',
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_site_title' ],
			]
		);

		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'title'  => __( 'Site Tagline', 'generateblocks' ),
				'tag'    => 'site_tagline',
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_site_tagline' ],
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

		if ( isset( $options['id'] ) ) {
			$id = absint( $options['id'] );
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
			'/dynamic-tag-replacements',
			[
				'methods'  => 'GET',
				'callback' => [ $this, 'get_dynamic_tag_replacements' ],
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
	public function get_dynamic_tag_replacements( $request ) {
		$content      = urldecode( $request->get_param( 'content' ) );
		$post_id      = $request->get_param( 'id' );
		$replacements = [];

		$all_tags  = GenerateBlocks_Register_Dynamic_Tag::get_tags();
		$tags_list = [];

		foreach ( $all_tags as $tag => $data ) {
			$tags_list[] = $data['tag'];
		}

		// Match the content inside the curly brackets.
		preg_match_all( '/\{(.*?)\}/', $content, $matches );

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

				if ( ! generateblocks_str_contains( $tag, ' ' ) ) {
					// There are no spaces in the tag, so there are no options.
					$content = str_replace( $tag, "{$tag} id:{$post_id}", $tag );

					$replacements[] = [
						'original' => "{{$tag}}",
						'replacement' => GenerateBlocks_Register_Dynamic_Tag::replace_tags( "{{$content}}", [], new stdClass() ),
					];
				} elseif ( ! generateblocks_str_contains( $tag, 'id' ) ) {
					// There are spaces in the tag, but no `id` option.
					$content = str_replace( $tag, "{$tag}|id:{$post_id}", $tag );

					$replacements[] = [
						'original' => "{{$tag}}",
						'replacement' => GenerateBlocks_Register_Dynamic_Tag::replace_tags( "{{$content}}", [], new stdClass() ),
					];
				} else {
					$replacements[] = [
						'original' => "{{$tag}}",
						'replacement' => GenerateBlocks_Register_Dynamic_Tag::replace_tags( "{{$tag}}", [], new stdClass() ),
					];
				}
			}
		}

		return rest_ensure_response( $replacements );
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
						'tag_name' => 'a',
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
