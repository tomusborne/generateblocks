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
	}

	/**
	 * Register the tags.
	 *
	 * @return void
	 */
	public function register() {
		new GenerateBlocks_Register_Dynamic_Tag(
			[
				'tag'    => 'post_title',
				'return' => [ 'GenerateBlocks_Dynamic_Tag_Callbacks', 'get_the_title' ],
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
	public static function get_source_id( $options ) {
		$id = get_the_ID();

		if ( isset( $options['postId'] ) ) {
			$id = absint( $options['postId'] );
		}

		return apply_filters(
			'generateblocks_dynamic_source_id',
			$id
		);
	}
}

GenerateBlocks_Dynamic_Tags::get_instance()->init();
