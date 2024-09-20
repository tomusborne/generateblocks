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

		self::$tags[ $args['tag'] ] = [
			'title'  => $args['title'],
			'tag'    => $args['tag'],
			'return' => $args['return'],
		];
	}

	/**
	 * Parse options.
	 *
	 * @param string $options_string The options string.
	 * @param string $tag_name The tag name.
	 * @return array
	 */
	private static function parse_options( $options_string, $tag_name ) {
		$pairs = explode( '|', $options_string );
		$result = [
			'tag_name' => $tag_name, // Make it so the tag name is available to us in $options.
		];

		if ( empty( $pairs ) ) {
			return $result;
		}

		foreach ( $pairs as $pair ) {
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
	 * Replace tags.
	 *
	 * @param string $content The content.
	 * @param array  $block The block.
	 * @param Object $instance The block instance.
	 * @return string
	 */
	public static function replace_tags( $content, $block, $instance ) {
		foreach ( self::$tags as $tag_name => $data ) {
			$opening_tag = '{' . $tag_name;

			if ( ! generateblocks_str_contains( $content, $opening_tag ) ) {
				continue;
			}

			$full_tag = $opening_tag . '}';

			if ( generateblocks_str_contains( $content, $full_tag ) ) {
				$full_tag = self::maybe_prepend_protocol( $content, $full_tag );
				$replacement = $data['return']( [], $block, $instance );

				if ( ! $replacement ) {
					// If we have no replacement, don't output the block.
					// There's an option to output the block even if there's no replacement within
					// the next condition.
					$content = '';
					continue;
				}

				/**
				 * Allow developers to filter the content before dynamic tag replacement.
				 *
				 * @since 2.0.0
				 *
				 * @param string $content The content.
				 * @param string $full_tag The full tag.
				 * @param mixed  $replacement The replacement.
				 * @param array  $block The block.
				 * @param Object $instance The block instance.
				 */
				$content = apply_filters(
					'generateblocks_before_dynamic_tag_replace',
					$content,
					[
						'tag'         => $full_tag,
						'replacement' => $replacement,
						'block'       => $block,
						'instance'    => $instance,
						'options'     => [],
					]
				);

				$content = str_replace( $full_tag, (string) $replacement, $content );
			} else {
				$pattern = '/\{' . $tag_name . '(\s+([^}]+))*\}/';
				preg_match_all( $pattern, $content, $matches, PREG_SET_ORDER );

				foreach ( $matches as $match ) {
					$full_tag         = $match[0];
					$full_tag         = self::maybe_prepend_protocol( $content, $full_tag );
					$options_string   = $match[2] ?? '';
					$options          = self::parse_options( $options_string, $tag_name );
					$replacement      = $data['return']( $options, $block, $instance );
					$render_if_empty  = $options['renderIfEmpty'] ?? false;

					if ( ! $replacement && ! $render_if_empty ) {
						$content = '';
						continue;
					}

					/**
					 * Allow developers to filter the content before dynamic tag replacement.
					 *
					 * @since 2.0.0
					 *
					 * @param string $content The content.
					 * @param string $full_tag The full tag.
					 * @param mixed  $replacement The replacement.
					 * @param array  $block The block.
					 * @param Object $instance The block instance.
					 */
					$content = apply_filters(
						'generateblocks_before_dynamic_tag_replace',
						$content,
						[
							'tag'         => $full_tag,
							'replacement' => $replacement,
							'block'       => $block,
							'instance'    => $instance,
							'options'     => $options,
						]
					);

					$content = str_replace( $full_tag, (string) $replacement, $content );
				}
			}
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
}
