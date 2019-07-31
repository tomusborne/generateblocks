<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Retrive attributes from our blocks.
 *
 * @since 0.1
 *
 * @param string $blockName The name of the block to get attributes from.
 * @return array
 */
function flex_get_block_data( $blockName = 'flex-blocks/section' ) {
	if ( ! function_exists( 'has_blocks' ) ) {
		return;
	}

	if ( is_singular() && has_blocks( get_the_ID() ) ) {
		global $post;

		if ( ! is_object( $post ) ) {
			return;
		}

		if ( ! function_exists( 'parse_blocks' ) ) {
			return;
		}

		$blocks = parse_blocks( $post->post_content );

		if ( ! is_array( $blocks ) || empty( $blocks ) ) {
			return;
		}

		$data = array();

		foreach ( $blocks as $index => $block ) {
			if ( ! is_object( $block ) && is_array( $block ) && isset( $block['blockName'] ) ) {
				if ( $blockName === $block['blockName'] ) {
					$data[] = $block['attrs'];

					$data = flex_get_nested_block_data( $block, $data, $blockName );
				}

				if ( 'core/block' === $block['blockName'] ) {
					$atts = $block['attrs'];

					if ( isset( $atts['ref'] ) ) {
						$reusable_block = get_post( $atts['ref'] );

						if ( $reusable_block && 'wp_block' === $reusable_block->post_type ) {
							$blocks = parse_blocks( $reusable_block->post_content );

							foreach ( $blocks as $index => $block ) {
								if ( $blockName === $block['blockName'] ) {
									$data[] = $block['attrs'];

									$data = flex_get_nested_block_data( $block, $data, $blockName );
								}
							}
						}
					}
				}

				// Need to check for nested blocks.
				if ( $blockName !== $block['blockName'] && 'core/block' !== $block['blockName'] ) {
					$data = flex_get_nested_block_data( $block, $data, $blockName );
				}
			}
		}

		return $data;
	}
}

/**
 * Retrive attributes from our blocks when they're nested within eachother.
 *
 * @since 0.1
 *
 * @param array $block The current block.
 * @param array $data The current data.
 * @param string $blockName The name of the block we're targeting.
 * @return array
 */
function flex_get_nested_block_data( $block, $data, $blockName ) {
	if ( isset( $block['innerBlocks'] ) && ! empty( $block['innerBlocks'] ) && is_array( $block['innerBlocks'] ) ) {
		foreach ( $block['innerBlocks'] as $inner_block ) {
			if ( $blockName === $inner_block['blockName'] ) {
				$data[] = $inner_block['attrs'];
			}

			$data = flex_get_nested_block_data( $inner_block, $data, $blockName );
		}
	}

	return $data;
}
