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
				if ( isset( $block['innerHTML'] ) ) {
					if ( strpos( trim( $block['innerHTML'] ), '<div class="gb-headline-wrapper' ) === 0 ) {
						$block['attrs']['hasWrapper'] = true;
					}
				}

				$data['headline'][] = $block['attrs'];
			}

			if ( 'generateblocks/button-container' === $block['blockName'] ) {
				$data['button-container'][] = $block['attrs'];
			}

			if ( 'generateblocks/button' === $block['blockName'] ) {
				if ( ! isset( $block['attrs']['hasUrl'] ) && isset( $block['innerHTML'] ) ) {
					if ( strpos( trim( $block['innerHTML'] ), '<a' ) === 0 ) {
						$block['attrs']['hasUrl'] = true;
					}
				}

				$data['button'][] = $block['attrs'];
			}

			if ( 'core/block' === $block['blockName'] ) {
				if ( isset( $block['attrs'] ) && is_array( $block['attrs'] ) ) {
					$atts = $block['attrs'];

					if ( isset( $atts['ref'] ) && ( empty( $data['reusableBlockIds'] ) || ! in_array( $atts['ref'], (array) $data['reusableBlockIds'] ) ) ) {
						$reusable_block = get_post( $atts['ref'] );

						if ( $reusable_block && 'wp_block' === $reusable_block->post_type && 'publish' === $reusable_block->post_status ) {
							$reuse_data_block = parse_blocks( $reusable_block->post_content );

							if ( ! empty( $reuse_data_block ) ) {
								$data['reusableBlockIds'][] = $atts['ref'];
								$data = generateblocks_get_block_data( $reuse_data_block, $data );
							}
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
			'desktop'     => '(min-width: 1025px)',
			'tablet'      => '(max-width: 1024px)',
			'tablet_only' => '(max-width: 1024px) and (min-width: 768px)',
			'mobile'      => '(max-width: 767px)',
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

	return add_query_arg( $font_args, 'https://fonts.googleapis.com/css' );
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

	if ( 1 === $alpha || ! is_numeric( $alpha ) ) {
		return $hex;
	}

	// Make sure we're dealing with a hex value.
	if ( isset( $hex[0] ) && '#' !== $hex[0] ) {
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
 * Get the background-image value for our Container block.
 *
 * @param string $type Gradient or background image.
 * @param array  $settings Our background image settings.
 */
function generateblocks_get_background_image_css( $type, $settings ) {
	$gradient = '';

	if ( $settings['gradient'] ) {
		$gradientColorStopOneValue = '';
		$gradientColorStopTwoValue = '';
		$gradientColorOneValue = generateblocks_hex2rgba( $settings['gradientColorOne'], $settings['gradientColorOneOpacity'] );
		$gradientColorTwoValue = generateblocks_hex2rgba( $settings['gradientColorTwo'], $settings['gradientColorTwoOpacity'] );

		if ( $settings['gradientColorOne'] && '' !== $settings['gradientColorStopOne'] ) {
			$gradientColorStopOneValue = ' ' . $settings['gradientColorStopOne'] . '%';
		}

		if ( $settings['gradientColorTwo'] && '' !== $settings['gradientColorStopTwo'] ) {
			$gradientColorStopTwoValue = ' ' . $settings['gradientColorStopTwo'] . '%';
		}

		$gradient = 'linear-gradient(' . $settings['gradientDirection'] . 'deg, ' . $gradientColorOneValue . $gradientColorStopOneValue . ', ' . $gradientColorTwoValue . $gradientColorStopTwoValue . ')';
	}

	if ( 'gradient' === $type ) {
		return $gradient;
	}

	$backgroundImage = '';

	if ( $settings['bgImage'] ) {
		$url = '';

		if ( isset( $settings['bgImage']['id'] ) ) {
			$image_src = wp_get_attachment_image_src( $settings['bgImage']['id'], $settings['bgImageSize'] );

			if ( is_array( $image_src ) ) {
				$url = $image_src[0];
			} else {
				$url = $settings['bgImage']['image']['url'];
			}
		} else {
			$url = $settings['bgImage']['image']['url'];
		}

		$url = apply_filters( 'generateblocks_background_image_url', $url, $settings );

		// Old background image overlays mixed with our gradients.
		if (
			'element' === $settings['bgOptions']['selector'] &&
			( $settings['backgroundColor'] || $settings['gradient'] ) &&
			isset( $settings['bgOptions']['overlay'] ) &&
			$settings['bgOptions']['overlay']
		) {
			if ( $settings['gradient'] ) {
				$backgroundImage = $gradient . ', url(' . esc_url( $url ) . ')';
			} elseif ( $settings['backgroundColor'] ) {
				$settings['backgroundColor'] = generateblocks_hex2rgba( $settings['backgroundColor'], $settings['backgroundColorOpacity'] );
				$backgroundImage = 'linear-gradient(0deg, ' . $settings['backgroundColor'] . ', ' . $settings['backgroundColor'] . '), url(' . esc_url( $url ) . ')';
			}
		} else {
			$backgroundImage = 'url(' . esc_url( $url ) . ')';
		}
	}

	return $backgroundImage;
}

/**
 * Build list of attributes into a string and apply contextual filter on string.
 *
 * The contextual filter is of the form `generateblocks_attr_{context}_output`.
 *
 * @since 1.2.0
 *
 * @param string $context    The context, to build filter name.
 * @param array  $attributes Optional. Extra attributes to merge with defaults.
 * @param array  $settings   Optional. Custom data to pass to filter.
 * @return string String of HTML attributes and values.
 */
function generateblocks_attr( $context, $attributes = array(), $settings = array() ) {
	$attributes = generateblocks_parse_attr( $context, $attributes, $settings );

	$output = '';

	// Cycle through attributes, build tag attribute string.
	foreach ( $attributes as $key => $value ) {

		if ( ! $value ) {
			continue;
		}

		if ( true === $value ) {
			$output .= esc_html( $key ) . ' ';
		} else {
			$output .= sprintf( '%s="%s" ', esc_html( $key ), esc_attr( $value ) );
		}
	}

	$output = apply_filters( "generateblocks_attr_{$context}_output", $output, $attributes, $settings, $context );

	return trim( $output );
}

/**
 * Merge array of attributes with defaults, and apply contextual filter on array.
 *
 * The contextual filter is of the form `generateblocks_attr_{context}`.
 *
 * @since 1.2.0
 *
 * @param string $context    The context, to build filter name.
 * @param array  $attributes Optional. Extra attributes to merge with defaults.
 * @param array  $settings   Optional. Custom data to pass to filter.
 * @return array Merged and filtered attributes.
 */
function generateblocks_parse_attr( $context, $attributes = array(), $settings = array() ) {
	$defaults = array(
		'class' => sanitize_html_class( $context ),
	);

	$attributes = wp_parse_args( $attributes, $defaults );

	// Contextual filter.
	return apply_filters( "generateblocks_attr_{$context}", $attributes, $settings, $context );
}

/**
 * Generate our SVG shape dividers.
 *
 * @since 1.2.0
 */
function generateblocks_get_svg_shapes() {
	return apply_filters(
		'generateblocks_svg_shapes',
		array(
			'gb-waves' => array(
				'group' => esc_attr__( 'Waves', 'generateblocks' ),
				'svgs' => array(
					'gb-waves-1' => array(
						/* translators: Shape number */
						'label' => sprintf( __( 'Wave %s', 'generateblocks' ), '1' ),
						'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 194.3" preserveAspectRatio="none"><path d="M1200 133.3l-50 8.9c-50 8.6-150 26.9-250 31.1-100 4.2-200-4.2-300-26.7S400 89.2 300 62.2C200 35.8 100 17.5 50 8.9L0 0v194.3h1200v-61z"/></svg>',
					),
					'gb-waves-2' => array(
						/* translators: Shape number */
						'label' => sprintf( __( 'Wave %s', 'generateblocks' ), '2' ),
						'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 137.6" preserveAspectRatio="none"><path d="M0 137.6h1200V21.9l-66.7 26.7c-66.7 26.7-200 80-333.3 66.7S533.3 21.9 400 4.2C266.7-13.9 133.3 31.1 66.7 53L0 75.3v62.3z"/></svg>',
					),
					'gb-waves-3' => array(
						/* translators: Shape number */
						'label' => sprintf( __( 'Wave %s', 'generateblocks' ), '3' ),
						'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 96.2" preserveAspectRatio="none"><path d="M0 96.2h1200V72.9l-50-8.9c-50-8.6-150-26.9-250-22.2C800 46.2 700 72.9 600 64 500 55.4 400 10.4 300 1.8 200-7.1 100 19.5 50 32.9L0 46.2v50z"/></svg>',
					),
					'gb-waves-4' => array(
						/* translators: Shape number */
						'label' => sprintf( __( 'Wave %s', 'generateblocks' ), '4' ),
						'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 130.3" preserveAspectRatio="none"><path d="M0 107.9l40-22.2c40-21.9 120-66.9 200-62.2 80 4.4 160 57.8 240 53.3C560 72 640 10.4 720 1.2S880 37 960 59c80 22.3 160 22.3 200 22.3h40v49H0v-22.4z"/></svg>',
					),
					'gb-waves-5' => array(
						/* translators: Shape number */
						'label' => sprintf( __( 'Wave %s', 'generateblocks' ), '5' ),
						'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 218" preserveAspectRatio="none"><path d="M0 218h1200v-31.3l-40 4.4c-40 4.8-120 13.1-200 0-80-13.6-160-48.6-240-66.7-80-17.8-160-17.8-240-8.8-80 8.6-160 26.9-240 8.8-80-17.7-160-71.1-200-97.7L0 0v218z"/></svg>',
					),
					'gb-waves-6' => array(
						/* translators: Shape number */
						'label' => sprintf( __( 'Wave %s', 'generateblocks' ), '6' ),
						'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 234" preserveAspectRatio="none"><path d="M0 0l40 40c40 40 120 120 200 115.6 80-4.8 160-93.1 240-111.2C560 26.7 640 80 720 88.9c80 8.6 160-26.4 240-13.3 80 13.6 160 75.2 200 106.7l40 31.1V234H0V0z"/></svg>',
					),
					'gb-waves-7' => array(
						/* translators: Shape number */
						'label' => sprintf( __( 'Wave %s', 'generateblocks' ), '7' ),
						'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 217.3" preserveAspectRatio="none"><path d="M1200 195.6l-25-22.2c-25-21.9-75-66.9-125-75.5-50-8.9-100 17.8-150 26.7-50 8.6-100 .2-150-13.3-50-13.1-100-31.4-150-26.7-50 4.4-100 31.1-150 26.7-50-4.8-100-39.8-150-66.7C250 18.1 200-.2 150 0 100-.2 50 18.1 25 26.7L0 35.6v181.7h1200v-21.7z"/></svg>',
					),
					'gb-waves-8' => array(
						/* translators: Shape number */
						'label' => sprintf( __( 'Wave %s', 'generateblocks' ), '8' ),
						'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 230.8" preserveAspectRatio="none"><path d="M1200 179.5l-22.2-26.7c-22.2-26.7-66.9-80-111.1-75.6-44.4 4.8-89.2 66.4-133.3 102.2-44.4 35.8-89.2 44.2-133.3 8.9-44.4-35.6-89.2-115.6-133.3-155.6-44.4-40-89.2-40-133.3-17.8C488.9 37 444.2 82 400 81.7c-44.4.2-89.2-44.8-133.3-57.8-44.4-13.6-89.2 4.8-133.3 26.7-44.5 22.2-89.2 48.9-110.9 62.2L0 126.1v104.7H1199.7l.3-51.3z"/></svg>',
					),
				),
			),
			'gb-angles' => array(
				'group' => esc_attr__( 'Angles', 'generateblocks' ),
				'svgs' => array(
					'gb-angle-1' => array(
						/* translators: Shape number */
						'label' => sprintf( __( 'Angle %s', 'generateblocks' ), '1' ),
						'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 360" preserveAspectRatio="none"><path d="M1200 360H0V0l1200 348z"/></svg>',
					),
				),
			),
			'gb-curves' => array(
				'group' => esc_attr__( 'Curves', 'generateblocks' ),
				'svgs' => array(
					'gb-curve-1' => array(
						/* translators: Shape number */
						'label' => sprintf( __( 'Curve %s', 'generateblocks' ), '1' ),
						'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 350" preserveAspectRatio="none"><path d="M1200 336.7V350H0V0s22.4 276.4 1200 336.7z"/></svg>',
					),
					'gb-curve-2' => array(
						/* translators: Shape number */
						'label' => sprintf( __( 'Curve %s', 'generateblocks' ), '2' ),
						'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 350" preserveAspectRatio="none"><path d="M1200 350V0C22.4 60.3 0 336.7 0 336.7V350h1200z"/></svg>',
					),
					'gb-curve-3' => array(
						/* translators: Shape number */
						'label' => sprintf( __( 'Curve %s', 'generateblocks' ), '3' ),
						'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 211.2" preserveAspectRatio="none"><path d="M600 188.4C321.1 188.4 84.3 109.5 0 0v211.2h1200V0c-84.3 109.5-321.1 188.4-600 188.4z"/></svg>',
					),
					'gb-curve-4' => array(
						/* translators: Shape number */
						'label' => sprintf( __( 'Curve %s', 'generateblocks' ), '4' ),
						'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 211.2" preserveAspectRatio="none"><path d="M1200 188.4v22.8H0v-22.8C84.3 78.9 321.1 0 600 0s515.7 78.9 600 188.4z"/></svg>',
					),
				),
			),
			'gb-triangles' => array(
				'group' => esc_attr__( 'Triangles', 'generateblocks' ),
				'svgs' => array(
					'gb-triangle-1' => array(
						/* translators: Shape number */
						'label' => sprintf( __( 'Triangle %s', 'generateblocks' ), '1' ),
						'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100" preserveAspectRatio="none"><path d="M1200 100H0V0l400 77.2L1200 0z"/></svg>',
					),
					'gb-triangle-2' => array(
						/* translators: Shape number */
						'label' => sprintf( __( 'Triangle %s', 'generateblocks' ), '2' ),
						'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100" preserveAspectRatio="none"><path d="M1200 77.2L400 0 0 77.2V100h1200z"/></svg>',
					),
					'gb-triangle-3' => array(
						/* translators: Shape number */
						'label' => sprintf( __( 'Triangle %s', 'generateblocks' ), '3' ),
						'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 70" preserveAspectRatio="none"><path d="M1200 0v70H0V0h530l70 50 70-50z"/></svg>',
					),
					'gb-triangle-4' => array(
						/* translators: Shape number */
						'label' => sprintf( __( 'Triangle %s', 'generateblocks' ), '4' ),
						'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 70" preserveAspectRatio="none"><path d="M670 50L600 0l-70 50H0v20h1200V50z"/></svg>',
					),
					'gb-triangle-5' => array(
						/* translators: Shape number */
						'label' => sprintf( __( 'Triangle %s', 'generateblocks' ), '5' ),
						'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 50" preserveAspectRatio="none"><path d="M1200 0v50H0V0h560l40 30 40-30z"/></svg>',
					),
					'gb-triangle-6' => array(
						/* translators: Shape number */
						'label' => sprintf( __( 'Triangle %s', 'generateblocks' ), '6' ),
						'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 50" preserveAspectRatio="none"><path d="M640 30L600 0l-40 30H0v20h1200V30z"/></svg>',
					),
					'gb-triangle-7' => array(
						/* translators: Shape number */
						'label' => sprintf( __( 'Triangle %s', 'generateblocks' ), '7' ),
						'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 230" preserveAspectRatio="none"><path d="M1200 230H0V0l600 207.2L1200 0z"/></svg>',
					),
					'gb-triangle-8' => array(
						/* translators: Shape number */
						'label' => sprintf( __( 'Triangle %s', 'generateblocks' ), '8' ),
						'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 230" preserveAspectRatio="none"><path d="M1200 207.2L600 0 0 207.2V230h1200z"/></svg>',
					),
					'gb-triangle-9' => array(
						/* translators: Shape number */
						'label' => sprintf( __( 'Triangle %s', 'generateblocks' ), '9' ),
						'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 131" preserveAspectRatio="none"><path d="M1200 131H0V40l154.8 50L410 35l277 69L899 0l301 110z"/></svg>',
					),
					'gb-triangle-10' => array(
						/* translators: Shape number */
						'label' => sprintf( __( 'Triangle %s', 'generateblocks' ), '10' ),
						'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 131" preserveAspectRatio="none"><path d="M1200 0L899 110 687 6 410 75 154.8 20 0 70v61h1200z"/></svg>',
					),
					'gb-triangle-11' => array(
						/* translators: Shape number */
						'label' => sprintf( __( 'Triangle %s', 'generateblocks' ), '11' ),
						'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 176" preserveAspectRatio="none"><path d="M0 0l400 156 400-88 400 74v34H0z"/></svg>',
					),
					'gb-triangle-12' => array(
						/* translators: Shape number */
						'label' => sprintf( __( 'Triangle %s', 'generateblocks' ), '12' ),
						'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 176" preserveAspectRatio="none"><path d="M0 176h1200V14L800 88 400 0 0 156z"/></svg>',
					),
				),
			),
		)
	);
}
