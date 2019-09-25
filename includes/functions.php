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
function flexblocks_get_block_data( $blockName = 'flexblocks/container', $content = '' ) {
	if ( ! function_exists( 'has_blocks' ) ) {
		return;
	}

	if ( ! $content && is_singular() && has_blocks( get_the_ID() ) ) {
		global $post;

		if ( ! is_object( $post ) ) {
			return;
		}

		$content = $post->post_content;
	}

	if ( ! $content ) {
		return;
	}

	if ( ! function_exists( 'parse_blocks' ) ) {
		return;
	}

	$blocks = parse_blocks( $content );

	if ( ! is_array( $blocks ) || empty( $blocks ) ) {
		return;
	}

	$data = array();

	foreach ( $blocks as $index => $block ) {
		if ( ! is_object( $block ) && is_array( $block ) && isset( $block['blockName'] ) ) {
			if ( $blockName === $block['blockName'] ) {
				$data[] = $block['attrs'];

				$data = flexblocks_get_nested_block_data( $block, $data, $blockName );
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

								$data = flexblocks_get_nested_block_data( $block, $data, $blockName );
							}
						}
					}
				}
			}

			// Need to check for nested blocks.
			if ( $blockName !== $block['blockName'] && 'core/block' !== $block['blockName'] ) {
				$data = flexblocks_get_nested_block_data( $block, $data, $blockName );
			}
		}
	}

	return $data;
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
function flexblocks_get_nested_block_data( $block, $data, $blockName ) {
	if ( isset( $block['innerBlocks'] ) && ! empty( $block['innerBlocks'] ) && is_array( $block['innerBlocks'] ) ) {
		foreach ( $block['innerBlocks'] as $inner_block ) {
			if ( $blockName === $inner_block['blockName'] ) {
				$data[] = $inner_block['attrs'];
			}

			$data = flexblocks_get_nested_block_data( $inner_block, $data, $blockName );
		}
	}

	return $data;
}

/**
 * Return our necessary permission to register a meta entry.
 *
 * @since 0.1
 */
function flexblocks_auth_callback() {
	return current_user_can( 'edit_posts' );
}

/**
 * Shorthand CSS values (padding, margin, border etc..).
 *
 * @since 0.1
 *
 * @param int $top The first value.
 * @param int $right The second value.
 * @param int $bottom The third value.
 * @param int $left The fourth value.
 *
 * @return string The shorthand value.
 */
function flexblocks_get_shorthand_css( $top, $right, $bottom, $left, $unit ) {
	if ( '' === $top && '' === $right && '' === $bottom && '' === $left ) {
		return;
	}

	$top = ( intval( $top ) <> 0 ) ? intval( $top ) . $unit . ' ' : '0 ';
	$right = ( intval( $right ) <> 0 ) ? intval( $right ) . $unit . ' ' : '0 ';
	$bottom = ( intval( $bottom ) <> 0 ) ? intval( $bottom ) . $unit . ' ' : '0 ';
	$left = ( intval( $left ) <> 0 ) ? intval( $left ) . $unit . ' ' : '0 ';

	if ( $right === $left ) {
		$left = '';
		if ( $top === $bottom ) {
			$bottom = '';
			if ( $top === $right ) {
				$right = '';
			}
		}
	}

	return trim( $top . $right . $bottom . $left );
}
