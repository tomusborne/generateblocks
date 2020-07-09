<?php
/**
 * Functions used throughout the plugin.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Retrive attributes from our blocks.
 *
 * @since 0.1
 * @param array $content The content of our page.
 * @param array $data Data used to loop through the function as needed.
 * @param int   $depth Keep track of how deep we are in nested blocks.
 *
 * @return array
 */
function generateblocks_get_block_data( $content, $data = array(), $depth = 0 ) {
	if ( ! is_array( $content ) || empty( $content ) ) {
		return;
	}

	foreach ( $content as $index => $block ) {
		if ( ! is_object( $block ) && is_array( $block ) && isset( $block['blockName'] ) ) {
			if ( 'generateblocks/grid' === $block['blockName'] ) {
				$data['grid'][] = $block['attrs'];
				$depth++;
				$data[ 'tempGridId-' . $depth ] = $block['attrs']['uniqueId'];
			}

			if ( 'generateblocks/container' === $block['blockName'] ) {
				if ( isset( $block['attrs']['isGrid'] ) && $block['attrs']['isGrid'] && isset( $data[ 'tempGridId-' . $depth ] ) ) {
					$block['attrs']['gridId'] = $data[ 'tempGridId-' . $depth ];
				}

				$data['container'][] = $block['attrs'];
			}

			if ( 'generateblocks/headline' === $block['blockName'] ) {
				$data['headline'][] = $block['attrs'];
			}

			if ( 'generateblocks/button-container' === $block['blockName'] ) {
				$data['button-container'][] = $block['attrs'];
			}

			if ( 'generateblocks/button' === $block['blockName'] ) {
				$data['button'][] = $block['attrs'];
			}

			if ( 'core/block' === $block['blockName'] ) {
				if ( isset( $block['attrs'] ) && is_array( $block['attrs'] ) ) {
					$atts = $block['attrs'];

					if ( isset( $atts['ref'] ) ) {
						$reusable_block = get_post( $atts['ref'] );

						if ( $reusable_block && 'wp_block' === $reusable_block->post_type ) {
							$reuse_data_block = parse_blocks( $reusable_block->post_content );
							$data = generateblocks_get_block_data( $reuse_data_block, $data );
						}
					}
				}
			}

			if ( isset( $block['innerBlocks'] ) && ! empty( $block['innerBlocks'] ) && is_array( $block['innerBlocks'] ) ) {
				$data = generateblocks_get_block_data( $block['innerBlocks'], $data, $depth );
			}
		}
	}

	return $data;
}

/**
 * Parse our content for blocks.
 *
 * @param string $content Optional content to parse.
 * @since 1.1
 */
function generateblocks_get_parsed_content( $content = '' ) {
	if ( ! function_exists( 'has_blocks' ) ) {
		return;
	}

	if ( ! $content && has_blocks( get_the_ID() ) ) {
		global $post;

		if ( ! is_object( $post ) ) {
			return;
		}

		$content = $post->post_content;
	}

	$content = apply_filters( 'generateblocks_do_content', $content );

	if ( ! function_exists( 'parse_blocks' ) ) {
		return;
	}

	$content = parse_blocks( $content );

	return $content;
}

/**
 * Shorthand CSS values (padding, margin, border etc..).
 *
 * @since 0.1
 *
 * @param int    $top The first value.
 * @param int    $right The second value.
 * @param int    $bottom The third value.
 * @param int    $left The fourth value.
 * @param string $unit The unit we're adding.
 *
 * @return string The shorthand value.
 */
function generateblocks_get_shorthand_css( $top, $right, $bottom, $left, $unit ) {
	if ( '' === $top && '' === $right && '' === $bottom && '' === $left ) {
		return;
	}

	$top = ( floatval( $top ) <> 0 ) ? floatval( $top ) . $unit . ' ' : '0 '; // phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison
	$right = ( floatval( $right ) <> 0 ) ? floatval( $right ) . $unit . ' ' : '0 '; // phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison
	$bottom = ( floatval( $bottom ) <> 0 ) ? floatval( $bottom ) . $unit . ' ' : '0 '; // phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison
	$left = ( floatval( $left ) <> 0 ) ? floatval( $left ) . $unit . ' ' : '0 '; // phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison

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
function generateblocks_get_media_query( $type ) {
	$queries = apply_filters(
		'generateblocks_media_query',
		array(
			'mobile' => '(max-width: 767px)',
			'tablet' => '(max-width: 1024px)',
		)
	);

	return $queries[ $type ];
}

/**
 * Build our list of Google fonts on this page.
 *
 * @since 0.1
 * @param string $content Optional content to parse.
 * @return array
 */
function generateblocks_get_google_fonts( $content = '' ) {
	$content = generateblocks_get_parsed_content( $content );

	if ( ! $content ) {
		return;
	}

	$data = generateblocks_get_block_data( $content );

	$defaults = generateblocks_get_block_defaults();
	$font_data = array();

	if ( ! empty( $data ) ) {
		foreach ( $data as $name => $blockData ) {
			if ( 'button' === $name ) {
				foreach ( $blockData as $atts ) {
					$button_settings = wp_parse_args(
						$atts,
						$defaults['button']
					);

					if ( $button_settings['googleFont'] ) {
						$id = $atts['uniqueId'];

						$variants = $button_settings['googleFontVariants'];

						if ( $variants ) {
							$variants = str_replace( ' ', '', $variants );
							$variants = explode( ',', $variants );
						}

						$font_data[ $id ] = array(
							'name' => $button_settings['fontFamily'],
							'variants' => $variants,
						);
					}
				}
			}

			if ( 'headline' === $name ) {
				foreach ( $blockData as $atts ) {
					$headline_settings = wp_parse_args(
						$atts,
						$defaults['headline']
					);

					if ( $headline_settings['googleFont'] ) {
						$id = $atts['uniqueId'];
						$variants = $headline_settings['googleFontVariants'];

						if ( $variants ) {
							$variants = str_replace( ' ', '', $variants );
							$variants = explode( ',', $variants );
						}

						$font_data[ $id ] = array(
							'name' => $headline_settings['fontFamily'],
							'variants' => $variants,
						);
					}
				}
			}

			if ( 'container' === $name ) {
				foreach ( $blockData as $atts ) {
					$container_settings = wp_parse_args(
						$atts,
						$defaults['container']
					);

					if ( $container_settings['googleFont'] ) {
						$id = $atts['uniqueId'];
						$variants = $container_settings['googleFontVariants'];

						if ( $variants ) {
							$variants = str_replace( ' ', '', $variants );
							$variants = explode( ',', $variants );
						}

						$font_data[ $id ] = array(
							'name' => $container_settings['fontFamily'],
							'variants' => $variants,
						);
					}
				}
			}
		}
	}

	$fonts = array();

	foreach ( (array) $font_data as $font ) {
		$id = str_replace( ' ', '', strtolower( $font['name'] ) );

		$fonts[ $id ]['name'] = $font['name'];

		if ( ! empty( $font['variants'] ) ) {
			foreach ( $font['variants'] as $variant ) {
				if ( isset( $fonts[ $id ]['variants'] ) ) {
					if ( in_array( $variant, (array) $fonts[ $id ]['variants'] ) ) {
						continue;
					}
				}

				$fonts[ $id ]['variants'][] = $variant;
			}
		}
	}

	return apply_filters( 'generateblocks_google_fonts', $fonts );
}

/**
 * Build the Google Font request URI.
 *
 * @since 0.1
 *
 * @return string The request URI to Google Fonts.
 */
function generateblocks_get_google_fonts_uri() {
	$google_fonts = generateblocks_get_google_fonts();

	if ( ! $google_fonts ) {
		return;
	}

	$data = array();

	foreach ( $google_fonts as $font ) {
		$variants = array();

		if ( ! empty( $font['variants'] ) ) {
			foreach ( $font['variants'] as $variant ) {
				$variants[] = $variant;
			}
		}

		$variants = apply_filters( 'generateblocks_google_font_variants', $variants, $font['name'] );

		$name = str_replace( ' ', '+', $font['name'] );

		if ( $variants ) {
			$data[] = $name . ':' . implode( ',', $variants );
		} else {
			$data[] = $name;
		}
	}

	$font_args = apply_filters(
		'generateblocks_google_font_args',
		array(
			'family' => implode( '|', $data ),
			'subset' => null,
			'display' => 'swap',
		)
	);

	return add_query_arg( $font_args, '//fonts.googleapis.com/css' );
}

/**
 * Convert hex to RGBA
 *
 * @since 0.1
 * @param string $hex The hex value.
 * @param int    $alpha The opacity value.
 *
 * @return string The RGBA value.
 */
function generateblocks_hex2rgba( $hex, $alpha ) {
	if ( ! $hex ) {
		return;
	}

	if ( 1 === $alpha ) {
		return $hex;
	}

	$hex = str_replace( '#', '', $hex );

	if ( strlen( $hex ) == 3 ) { // phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison
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

/**
 * Return old flexblocks values for old browsers.
 *
 * @since 0.1
 * @param string $value The value to convert.
 *
 * @return string The old browser value.
 */
function generateblocks_get_vendor_prefix( $value ) {
	if ( 'flex-start' === $value || 'left' === $value ) {
		return 'start';
	}

	if ( 'flex-end' === $value || 'right' === $value ) {
		return 'end';
	}

	return $value;
}

/**
 * Return flexbox alignment values from left/right.
 *
 * @since 0.1
 * @param string $value The value to convert.
 *
 * @return string The flexbox alignment value.
 */
function generateblocks_get_flexbox_alignment( $value ) {
	if ( 'left' === $value || 'top' === $value ) {
		return 'flex-start';
	}

	if ( 'right' === $value || 'bottom' === $value ) {
		return 'flex-end';
	}

	return $value;
}

/**
 * Get an option from the database.
 *
 * @param string $option The option to get.
 * @since 0.1
 */
function generateblocks_get_option( $option ) {
	$defaults = generateblocks_get_option_defaults();

	if ( ! isset( $defaults[ $option ] ) ) {
		return;
	}

	$options = wp_parse_args(
		get_option( 'generateblocks', array() ),
		$defaults
	);

	return $options[ $option ];
}

/**
 * Checks whether a value exists, even if it's a 0.
 *
 * @param int|string $value The value to check.
 * @since 1.0
 */
function generateblocks_has_number_value( $value ) {
	if ( $value || 0 === $value || '0' === $value ) {
		return true;
	}

	return false;
}

/**
 * Get the background-image value.
 *
 * @param array $settings Our background image settings.
 * @param array $custom_args Custom args that will overwrite the settings.
 */
function generateblocks_get_background_image_css( $settings, $custom_args = array() ) {
	$args = array(
		'backgroundColor' => $settings['backgroundColor'],
		'backgroundColorOpacity' => $settings['backgroundColorOpacity'],
		'gradient' => $settings['gradient'],
		'gradientDirection' => $settings['gradientDirection'],
		'gradientColorOne' => $settings['gradientColorOne'],
		'gradientColorOneOpacity' => $settings['gradientColorOneOpacity'],
		'gradientColorStopOne' => $settings['gradientColorStopOne'],
		'gradientColorTwo' => $settings['gradientColorTwo'],
		'gradientColorTwoOpacity' => $settings['gradientColorTwoOpacity'],
		'gradientColorStopTwo' => $settings['gradientColorStopTwo'],
		'bgImage' => $settings['bgImage'],
		'bgOptions' => $settings['bgOptions'],
	);

	$args = wp_parse_args(
		$args,
		$custom_args
	);

	$background_image = false;
	$gradientColorStopOneValue = '';
	$gradientColorStopTwoValue = '';

	$args['backgroundColor'] = generateblocks_hex2rgba( $args['backgroundColor'], $args['backgroundColorOpacity'] );
	$args['gradientColorOne'] = generateblocks_hex2rgba( $args['gradientColorOne'], $args['gradientColorOneOpacity'] );
	$args['gradientColorTwo'] = generateblocks_hex2rgba( $args['gradientColorTwo'], $args['gradientColorTwoOpacity'] );

	if ( $args['gradient'] ) {
		if ( $args['gradientColorOne'] && '' !== $args['gradientColorStopOne'] ) {
			$gradientColorStopOneValue = ' ' . $args['gradientColorStopOne'] . '%';
		}

		if ( $args['gradientColorTwo'] && '' !== $args['gradientColorStopTwo'] ) {
			$gradientColorStopTwoValue = ' ' . $args['gradientColorStopTwo'] . '%';
		}
	}

	if ( $args['bgImage'] && 'element' === $args['bgOptions']['selector'] ) {
		$url = $args['bgImage']['image']['url'];

		if ( ( $args['backgroundColor'] || $args['gradient'] ) && isset( $args['bgOptions']['overlay'] ) && $args['bgOptions']['overlay'] ) {
			if ( $args['gradient'] ) {
				$background_image = 'linear-gradient(' . $args['gradientDirection'] . 'deg, ' . $args['gradientColorOne'] . $gradientColorStopOneValue . ', ' . $args['gradientColorTwo'] . $gradientColorStopTwoValue . '), url(' . esc_url( $url ) . ')';
			} elseif ( $args['backgroundColor'] ) {
				$background_image = 'linear-gradient(0deg, ' . $args['backgroundColor'] . ', ' . $args['backgroundColor'] . '), url(' . esc_url( $url ) . ')';
			}
		} else {
			$background_image = 'url(' . esc_url( $url ) . ')';
		}
	} elseif ( $args['gradient'] ) {
		$background_image = 'linear-gradient(' . $args['gradientDirection'] . 'deg, ' . $args['gradientColorOne'] . $gradientColorStopOneValue . ', ' . $args['gradientColorTwo'] . $gradientColorStopTwoValue . ')';
	}

	return $background_image;
}
