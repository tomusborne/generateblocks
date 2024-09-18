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
class GenerateBlocks_Block_Looper extends GenerateBlocks_Block {
	/**
	 * Keep track of all blocks of this type on the page.
	 *
	 * @var array $block_ids The current block id.
	 */
	protected static $block_ids = [];

	/**
	 * Render the repeater items for the Looper block.
	 *
	 * @param  array    $attributes Block attributes.
	 * @param  WP_Block $block The block instance.
	 * @return string  The rendered content.
	 */
	public static function render_loop_items( $attributes, $block ) {
		$query      = $block->context['generateblocks/queryData'] ?? null;
		$query_type = $block->context['generateblocks/queryType'] ?? null;

		if ( 'WP_Query' !== $query_type || ! $query ) {
			return '';
		}

		$content = '';
		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();

				$block_content = (
					new WP_Block(
						$block->parsed_block['innerBlocks'][0],
						array(
							'postType'                 => get_post_type(),
							'postId'                   => get_the_ID(),
							'generateblocks/queryType' => $query_type,
						)
					)
				)->render( array( 'dynamic' => false ) );

				$content .= $block_content;
			}

			wp_reset_postdata();
		}

		return $content;
	}

	/**
	 * Render the Query block.
	 *
	 * @param array  $attributes    The block attributes.
	 * @param string $block_content The block content.
	 * @param array  $block         The block.
	 */
	public static function render_block( $attributes, $block_content, $block ) {
		$html_attributes = generateblocks_get_processed_html_attributes( $block_content );

		// If our processing returned nothing, let's try to build our attributes from the block attributes.
		if ( empty( $html_attributes ) ) {
			$html_attributes = generateblocks_get_backup_html_attributes( 'gb-looper', $attributes );
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

		$output .= sprintf(
			'<%1$s %2$s>%3$s</%1$s>',
			$tag_name,
			generateblocks_attr(
				'looper',
				$html_attributes,
				$attributes,
				$block
			),
			self::render_loop_items( $attributes, $block )
		);

		return $output;
	}
}
