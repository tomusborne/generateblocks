<?php
/**
 * Handles the Text block.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * The Text block.
 */
class GenerateBlocks_Block_Text {
	/**
	 * Render the text block.
	 *
	 * @param array  $attributes    The block attributes.
	 * @param string $block_content The block content.
	 */
	public static function render_block( $attributes, $block_content ) {
		$block_content = generateblocks_do_block_css( $block_content, [ 'attributes' => $attributes ] );

		return $block_content;
	}
}
