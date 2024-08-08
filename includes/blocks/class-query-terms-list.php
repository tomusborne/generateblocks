<?php
/**
 * Handles the No Results block.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * The No Results block.
 */
class GenerateBlocks_Block_Query_Terms_List extends GenerateBlocks_Block {
	/**
	 * Render the Shape block.
	 *
	 * @param array  $attributes    The block attributes.
	 * @param string $block_content The block content.
	 * @param array  $block         The block.
	 */
	public static function render_block( $attributes, $block_content, $block ) {
		$taxonomy = $attributes['taxonomy'] ?? '';

		if ( ! $taxonomy ) {
			return '';
		}

		$classes = [];

		if ( isset( $attributes['className'] ) ) {
			$classes[] = $attributes['className'];
		}

		if ( ! empty( $attributes['globalClasses'] ) ) {
			$classes = array_merge( $classes, $attributes['globalClasses'] );
		}

		$unique_id = $attributes['uniqueId'] ?? '';

		if ( $unique_id && ! empty( $attributes['css'] ) ) {
			$classes[] = 'gb-query-terms-list-' . $unique_id;
		}

		$tag_name = $attributes['tagName'] ?? 'div';

		$html_attributes = generateblocks_with_html_attributes(
			array(
				'id'    => $attributes['anchor'] ?? null,
				'class' => implode( ' ', $classes ),
			),
			$attributes
		);

		$content = get_the_term_list(
			get_the_ID(),
			$taxonomy,
			$attributes['before'] ?? '',
			$attributes['separator'] ?? ', ',
			$attributes['after'] ?? ''
		);

		$output = sprintf(
			'<%1$s %2$s>%3$s</%1$s>',
			$tag_name,
			generateblocks_attr(
				'query-terms-list',
				$html_attributes,
				$attributes,
				$block
			),
			$content
		);

		// Add styles to this block if needed.
		$output = generateblocks_maybe_add_block_css(
			$output,
			[
				'class_name' => __CLASS__,
				'attributes' => $attributes,
				'block_ids' => self::$block_ids,
			]
		);

		return $output;
	}
}
