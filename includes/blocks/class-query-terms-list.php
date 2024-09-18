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

		$html_attributes = generateblocks_get_processed_html_attributes( $block_content );

		// If our processing returned nothing, let's try to build our attributes from the block attributes.
		if ( empty( $html_attributes ) ) {
			$html_attributes = generateblocks_get_backup_html_attributes( 'gb-query-terms-list', $attributes );
		}

		$tag_name = $attributes['tagName'] ?? 'div';

		$content = get_the_term_list(
			get_the_ID(),
			$taxonomy,
			$attributes['before'] ?? '',
			$attributes['separator'] ?? ', ',
			$attributes['after'] ?? ''
		);

		// Add styles to this block if needed.
		$output = generateblocks_maybe_add_block_css(
			'',
			[
				'class_name' => __CLASS__,
				'attributes' => $attributes,
				'block_ids' => self::$block_ids,
			]
		);

		$output .= sprintf(
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

		return $output;
	}
}
