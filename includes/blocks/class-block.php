<?php
/**
 * Handles block functionality.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * The Block class.
 */
class GenerateBlocks_Block {
	/**
	 * Keep track of all blocks of this type on the page.
	 *
	 * @var array $block_ids The current block id.
	 */
	protected static $block_ids = [];

	/**
	 * Store our block name.
	 *
	 * @var string $block_name The block name.
	 */
	public static $block_name = '';

	/**
	 * Store our block ID in memory.
	 *
	 * @param string $id The block ID to store.
	 */
	public static function store_block_id( $id ) {
		static::$block_ids[] = $id;
	}

	/**
	 * Check if our block ID exists.
	 *
	 * @param string $id The block ID to check.
	 */
	public static function block_id_exists( $id ) {
		return in_array( $id, (array) static::$block_ids );
	}

	/**
	 * Render the block.
	 *
	 * @param array  $attributes    The block attributes.
	 * @param string $block_content The block content.
	 * @param array  $block         The block.
	 */
	public static function render_block( $attributes, $block_content, $block ) {
		return $block_content;
	}

	/**
	 * Get the block CSS.
	 *
	 * @param array $attributes The block attributes.
	 */
	public static function get_css( $attributes ) {
		$id = $attributes['uniqueId'] ?? '';

		if ( ! $id ) {
			return '';
		}

		// Store this block ID in memory.
		static::store_block_id( $id );

		return apply_filters(
			'generateblocks_block_css',
			$attributes['css'] ?? '',
			[
				'attributes' => $attributes ?? [],
				'block_name' => static::$block_name ?? '',
			]
		);
	}
}
