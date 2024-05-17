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
	 * @return string
	 */
	public static function get_the_title( $options ) {
		$id = GenerateBlocks_Dynamic_Tags::get_source_id( $options );
		return get_the_title( $id );
	}
}
