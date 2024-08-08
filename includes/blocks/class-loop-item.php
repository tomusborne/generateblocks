<?php
/**
 * Handles the Element block.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * The Element block.
 */
class GenerateBlocks_Block_Loop_Item extends GenerateBlocks_Block {
	/**
	 * Keep track of all blocks of this type on the page.
	 *
	 * @var array $block_ids The current block id.
	 */
	protected static $block_ids = [];

	/**
	 * Render the Element block.
	 *
	 * @param array  $attributes    The block attributes.
	 * @param string $block_content The block content.
	 * @param array  $block         The block.
	 */
	public static function render_block( $attributes, $block_content, $block ) {
		$classes = [
			'gb-loop-item',
		];

		if ( isset( $attributes['className'] ) ) {
			$classes[] = $attributes['className'];
		}

		if ( ! empty( $attributes['globalClasses'] ) ) {
			$classes = array_merge( $classes, $attributes['globalClasses'] );
		}

		$unique_id = $attributes['uniqueId'] ?? '';

		if ( $unique_id && ! empty( $attributes['css'] ) ) {
			$classes[] = 'gb-loop-item-' . $unique_id;
		}

		$query_type = $block->context['generateblocks/queryType'] ?? null;

		if ( 'WP_Query' === $query_type ) {
			$classes = array_merge( $classes, get_post_class() );
		}

		$tag_name = $attributes['tagName'] ?? 'div';

		// Add styles to this block if needed.
		$output = generateblocks_maybe_add_block_css(
			'',
			[
				'class_name' => __CLASS__,
				'attributes' => $attributes,
				'block_ids' => self::$block_ids,
			]
		);

		$html_attributes = generateblocks_with_html_attributes(
			[
				'id'    => $attributes['anchor'] ?? null,
				'class' => implode( ' ', $classes ),
			],
			$attributes
		);

		$output .= sprintf(
			'<%1$s %2$s>%3$s</%1$s>',
			$tag_name,
			generateblocks_attr(
				'loop-item',
				$html_attributes,
				$attributes,
				$block
			),
			$block_content
		);

		return $output;
	}
}
