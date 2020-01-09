<?php
/**
 * Functions used throughout the plugin.
 *
 * @package FlexBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Retrive attributes from our blocks.
 *
 * @since 0.1
 * @param string $blockName The name of the block to get attributes from.
 *
 * @return array
 */
function flexblocks_get_block_data( $blockName = 'flexblocks/container', $content = '' ) {
	if ( ! is_array( $content ) || empty( $content ) ) {
		return;
	}

	$data = array();

	foreach ( $content as $index => $block ) {
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
 * @param array $block The current block.
 * @param array $data The current data.
 * @param string $blockName The name of the block we're targeting.
 *
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

	$top = ( floatval( $top ) <> 0 ) ? floatval( $top ) . $unit . ' ' : '0 ';
	$right = ( floatval( $right ) <> 0 ) ? floatval( $right ) . $unit . ' ' : '0 ';
	$bottom = ( floatval( $bottom ) <> 0 ) ? floatval( $bottom ) . $unit . ' ' : '0 ';
	$left = ( floatval( $left ) <> 0 ) ? floatval( $left ) . $unit . ' ' : '0 ';

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

/**
 * Get our media query.
 *
 * @since 0.1
 * @param string $type The media query we're getting.
 *
 * @return string
 */
function flexblocks_get_media_query( $type ) {
	$queries = apply_filters( 'flexblocks_media_query', array(
		'mobile' => '(max-width: 767px)',
		'tablet' => '(max-width: 1024px)',
	) );

	return $queries[ $type ];
}

/**
 * Build our list of Google fonts on this page.
 *
 * @since 0.1
 *
 * @return array
 */
function flexblocks_get_google_fonts( $content = '' ) {
	if ( ! function_exists( 'has_blocks' ) ) {
		return;
	}

	if ( ! $content && has_blocks( get_the_ID() ) ) {
		global $post;

		if ( ! is_object( $post ) ) {
			return;
		}

		$content = $post->post_content;

		if ( ! function_exists( 'parse_blocks' ) ) {
			return;
		}

		$content = parse_blocks( $content );
	}

	if ( ! $content ) {
		return;
	}

	$button_data = flexblocks_get_block_data( 'flexblocks/button', $content );
	$headline_data = flexblocks_get_block_data( 'flexblocks/headline', $content );
	$defaults = flexblocks_get_block_defaults();
	$font_data = array();

	if ( ! empty( $button_data ) ) {
		foreach ( $button_data as $atts ) {
			$button_settings = wp_parse_args(
				$atts,
				$defaults['button']
			);

			if ( $button_settings['googleFont'] ) {
				$id = $atts['uniqueId'];
				$font_data[ $id ] = array(
					'name' => $button_settings['fontFamily'],
					'variants' => $button_settings['fontWeight'],
				);
			}
		}
	}

	if ( ! empty( $headline_data ) ) {
		foreach ( $headline_data as $atts ) {
			$headline_settings = wp_parse_args(
				$atts,
				$defaults['headline']
			);

			if ( $headline_settings['googleFont'] ) {
				$id = $atts['uniqueId'];
				$font_data[ $id ] = array(
					'name' => $headline_settings['fontFamily'],
					'variants' => $headline_settings['fontWeight'],
				);
			}
		}
	}

	$fonts = array();

	foreach ( (array) $font_data as $font ) {
		$id = str_replace( ' ', '', strtolower( $font['name'] ) );

		$fonts[ $id ]['name'] = $font['name'];

		if ( ! empty( $font['variants'] ) ) {
			$fonts[ $id ]['variants'][] = $font['variants'];
		}
	}

	return apply_filters( 'flexblocks_google_fonts', $fonts );
}

/**
 * Build the Google Font request URI.
 *
 * @since 0.1
 * @param int $post_id The post ID we're checking.
 *
 * @return string The request URI to Google Fonts.
 */
function flexblocks_get_google_fonts_uri() {
	$google_fonts = flexblocks_get_google_fonts();

	if ( ! $google_fonts ) {
		return;
	}

	$data = array();

	foreach( $google_fonts as $font ) {
		$variants = array();

		if ( ! empty( $font['variants'] ) ) {
			foreach( $font['variants'] as $variant ) {
				$variants[] = $variant;
				$variants[] = $variant . 'i';
			}
		}

		$name = str_replace( ' ', '+', $font['name'] );

		if ( $variants ) {
			$data[] = $name . ':' . implode( ',', $variants );
		} else {
			$data[] = $name;
		}
	}

	$font_args = apply_filters( 'flexblocks_google_font_args', array(
		'family' => implode( '|', $data ),
		'subset' => null,
		'display' => 'swap',
	) );

	return add_query_arg( $font_args, '//fonts.googleapis.com/css' );
}

function flexblocks_hex2rgba( $hex, $alpha ) {
	if ( 1 === $alpha ) {
		return $hex;
	}

	$hex = str_replace( '#', '', $hex );

	if ( strlen( $hex ) == 3 ) {
		$r = hexdec( substr( $hex, 0, 1 ) . substr( $hex, 0, 1 ) );
		$g = hexdec( substr( $hex, 1, 1 ) . substr( $hex, 1, 1 ) );
		$b = hexdec( substr( $hex, 2, 1 ) . substr( $hex, 2, 1 ) );
	} else {
		$r = hexdec( substr( $hex, 0, 2 ) );
		$g = hexdec( substr( $hex, 2, 2 ) );
		$b = hexdec( substr( $hex, 4, 2 ) );
	}

	$rgba = 'rgba(' . $r . ', ' . $g . ', ' . $b . ', ' . $alpha . ')';

	return $rgba;
}
