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
}
