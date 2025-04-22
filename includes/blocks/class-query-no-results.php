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
class GenerateBlocks_Block_Query_No_Results extends GenerateBlocks_Block {
	/**
	 * Store our block name.
	 *
	 * @var string $block_name The block name.
	 */
	public static $block_name = 'generateblocks/query-no-results';

	/**
	 * Render the Shape block.
	 *
	 * @param array  $attributes    The block attributes.
	 * @param string $block_content The block content.
	 * @param array  $block         The block.
	 */
	public static function render_block( $attributes, $block_content, $block ) {
		$no_results = $block->context['generateblocks/queryData']['noResults'] ?? false;

		if ( ! $no_results ) {
			return '';
		}

		return $block_content;
	}
}
