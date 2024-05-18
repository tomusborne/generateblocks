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
class GenerateBlocks_Block_Element {
	/**
	 * Render the Element block.
	 *
	 * @param array  $attributes    The block attributes.
	 * @param string $block_content The block content.
	 */
	public static function render_block( $attributes, $block_content ) {
		$block_content = generateblocks_do_block_css( $block_content, [ 'attributes' => $attributes ] );

		return $block_content;
	}
}
