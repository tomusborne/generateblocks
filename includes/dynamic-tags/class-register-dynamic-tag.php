<?php
/**
 * The Register Dynamic Tag class file.
 *
 * @package GenerateBlocks\Dynamic_Tags
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class for registering dynamic tags.
 *
 * @since 1.9.0
 */
class GenerateBlocks_Register_Dynamic_Tag {
	/**
	 * The tags.
	 *
	 * @var array
	 */
	private static $tags = [];

	/**
	 * Constructor.
	 *
	 * @param array $args The arguments.
	 */
	public function __construct( $args ) {
		if ( ! isset( $args['tag'] ) || ! isset( $args['return'] ) ) {
			return;
		}

		self::$tags[ $args['tag'] ] = $args['return'];
	}

	/**
	 * Parse options.
	 *
	 * @param string $options_string The options string.
	 * @return array
	 */
	private static function parse_options( $options_string ) {
		$pairs = explode( '|', $options_string );
		$result = [];

		foreach ( $pairs as $pair ) {
			list( $key, $value ) = explode( '=', $pair );

			$result[ $key ] = $value;
		}

		return $result;
	}

	/**
	 * Get the tags.
	 *
	 * @return array
	 */
	public static function get_tags() {
		return self::$tags;
	}

	/**
	 * Replace tags.
	 *
	 * @param string $content The content.
	 * @param array  $block The block.
	 * @return string
	 */
	public static function replace_tags( $content, $block ) {
		foreach ( self::$tags as $tag_name => $callback ) {
			$pattern = '/\{' . $tag_name . '(\s+([^}]+))*\}/';
			preg_match_all( $pattern, $content, $matches, PREG_SET_ORDER );

			foreach ( $matches as $match ) {
				$full_tag = $match[0];
				$options_string = $match[2] ?? '';
				$options = self::parse_options( $options_string );
				$replacement = call_user_func( $callback, $options );
				$content = str_replace( $full_tag, $replacement, $content );
			}
		}

		return $content;
	}
}
