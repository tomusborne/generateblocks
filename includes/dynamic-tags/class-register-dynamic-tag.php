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
		if ( ! isset( $args['tag'] ) || ! isset( $args['return'] ) || ! isset( $args['title'] ) ) {
			return;
		}

		if ( ! isset( $args['type'] ) ) {
			$args['type'] = 'post';
		}

		self::$tags[ $args['tag'] ] = $args;
	}

	/**
	 * Parse options.
	 *
	 * @param string $options_string The options string.
	 * @param string $tag_name The tag name.
	 * @return array
	 */
	public static function parse_options( $options_string, $tag_name ) {
		$pairs  = $options_string ? preg_split( '/(?<!\\\\)\|/', $options_string, -1, PREG_SPLIT_NO_EMPTY ) : [];
		$result = [
			'tag_name' => $tag_name, // Make it so the tag name is available to us in $options.
		];

		if ( empty( $pairs ) ) {
			return $result;
		}

		foreach ( $pairs as $pair ) {
			$pair = str_replace( [ '\\:', '\\|' ], [ ':', '|' ], $pair );

			if ( generateblocks_str_contains( $pair, ':' ) ) {
				list( $key, $value ) = explode( ':', $pair, 2 );
			} else {
				$key = $pair;
				$value = true; // Default value if no colon is present.
			}

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
	 * Find matches.
	 *
	 * @param string $content The content.
	 * @param array  $availableTags The available tags.
	 * @return array
	 */
	public static function find_matches( $content, $availableTags ) {
		$pattern = '/\{{(' . implode( '|', array_keys( $availableTags ) ) . ')(\s+[^}]+)?}}/';
		preg_match_all( $pattern, $content, $matches, PREG_SET_ORDER );

		return $matches;
	}

	/**
	 * Replace tags.
	 *
	 * @param string $content The content.
	 * @param array  $block The block.
	 * @param Object $instance The block instance.
	 * @return string
	 */
	public static function replace_tags( $content, $block, $instance ) {
		$block_html = ! empty( $block['innerHTML'] )
			? $block['innerHTML']
			: $content;

		if ( ! generateblocks_str_contains( $block_html, '{{' ) ) {
			return $content;
		}

		$matches = self::find_matches( $block_html, self::$tags );

		foreach ( $matches as $match ) {
			$tag_name = $match[1] ?? '';

			if ( ! isset( self::$tags[ $tag_name ] ) ) {
				continue;
			}

			$data           = self::$tags[ $tag_name ];
			$full_tag       = $match[0];
			$full_tag       = self::maybe_prepend_protocol( $block_html, $full_tag );
			$options_string = isset( $match[2] ) ? ltrim( $match[2], ' ' ) : '';
			$options        = self::parse_options( $options_string, $tag_name );
			$replacement    = $data['return']( $options, $block, $instance );
			$og_replacement = $replacement;
			$supports       = $data['supports'];
			$required       = ! isset( $options['required'] ) || 'false' !== $options['required'];

			/**
			 * Allow developers to filter the replacement.
			 *
			 * @since 2.0.0
			 *
			 * @param string $replacement The replacement.
			 * @param string $full_tag The full tag.
			 * @param mixed  $content The replacement.
			 * @param array  $block The block.
			 * @param Object $instance The block instance.
			 * @param array  $options The options.
			 * @param array  $supports The supports.
			 */
			$replacement = apply_filters(
				'generateblocks_dynamic_tag_replacement',
				$replacement,
				[
					'tag'      => $tag_name,
					'full_tag' => $full_tag,
					'content'  => $content,
					'block'    => $block,
					'instance' => $instance,
					'options'  => $options,
					'supports' => $supports,
				]
			);

			// If this tag is required for the block to render and there is no replacement, bail.
			if ( $required && ! $replacement ) {
				return '';
			}

			/**
			 * Allow developers to filter the content before dynamic tag replacement.
			 *
			 * @since 2.0.0
			 *
			 * @param string $content The content.
			 * @param string $full_tag The full tag.
			 * @param string $tag The tag.
			 * @param mixed  $replacement The replacement.
			 * @param mixed  $og_replacement The original replacement.
			 * @param array  $block The block.
			 * @param Object $instance The block instance.
			 * @param array  $options The options.
			 * @param array  $supports The supports.
			 */
			$content = apply_filters(
				'generateblocks_before_dynamic_tag_replace',
				$content,
				[
					'full_tag'       => $full_tag,
					'tag'            => $tag_name,
					'replacement'    => $replacement,
					'og_replacement' => $og_replacement,
					'block'          => $block,
					'instance'       => $instance,
					'options'        => $options,
					'supports'       => $supports,
				]
			);

			$content = str_replace( $full_tag, (string) $replacement, $content );
		}

		return $content;
	}

	/**
	 * Maybe prepend the protocol to our dynamic tag.
	 * Some core blocks automatically prepend the protocol to URLs, so we need to account for that.
	 * This function checks if the protocol is already prepended and if so, prepends it to the tag so the entire thing is replaced.
	 *
	 * @param string $content The content.
	 * @param string $tag The tag.
	 * @return string
	 */
	public static function maybe_prepend_protocol( $content, $tag ) {
		if ( generateblocks_str_contains( $content, 'http://' . $tag ) ) {
			$tag = 'http://' . $tag;
		}

		if ( generateblocks_str_contains( $content, 'https://' . $tag ) ) {
			$tag = 'https://' . $tag;
		}

		return $tag;
	}


	/**
	 * Get the details of a specific registered tag.
	 *
	 * @param string $tag The dynamic tag used for lookup.
	 * @return array|null The tag details or null if not found.
	 */
	public static function get_tag_details( $tag ) {
		return self::$tags[ $tag ] ?? null;
	}
}
