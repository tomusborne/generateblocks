<?php
/**
 * General actions and filters.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

add_action( 'enqueue_block_editor_assets', 'generateblocks_do_block_editor_assets' );
/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 0.1
 */
function generateblocks_do_block_editor_assets() {
	global $pagenow;

	$generateblocks_deps = array( 'wp-blocks', 'wp-i18n', 'wp-editor', 'wp-element', 'wp-compose', 'wp-data' );

	if ( 'widgets.php' === $pagenow ) {
		unset( $generateblocks_deps[2] );
	}

	$assets_file = GENERATEBLOCKS_DIR . 'dist/blocks.asset.php';
	$compiled_assets = file_exists( $assets_file )
		? require $assets_file
		: false;

	$assets =
		isset( $compiled_assets['dependencies'] ) &&
		isset( $compiled_assets['version'] )
		? $compiled_assets
		: [
			'dependencies' => $generateblocks_deps,
			'version' => filemtime( GENERATEBLOCKS_DIR . 'dist/blocks.js' ),
		];

	wp_enqueue_script(
		'generateblocks',
		GENERATEBLOCKS_DIR_URL . 'dist/blocks.js',
		$assets['dependencies'],
		$assets['version'],
		true
	);

	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'generateblocks', 'generateblocks' );
	}

	wp_enqueue_style(
		'generateblocks',
		GENERATEBLOCKS_DIR_URL . 'dist/blocks.css',
		array( 'wp-edit-blocks' ),
		filemtime( GENERATEBLOCKS_DIR . 'dist/blocks.css' )
	);

	$image_sizes = get_intermediate_image_sizes();
	$image_sizes = array_diff( $image_sizes, array( '1536x1536', '2048x2048' ) );
	$image_sizes[] = 'full';

	wp_localize_script(
		'generateblocks',
		'generateBlocksInfo',
		array(
			'imageSizes' => $image_sizes,
			'svgShapes' => generateblocks_get_svg_shapes(),
			'syncResponsivePreviews' => generateblocks_get_option( 'sync_responsive_previews' ),
			'excerptLength' => apply_filters( 'excerpt_length', 55 ), // phpcs:ignore -- Core filter.
			'excerptMore' => apply_filters( 'excerpt_more', ' ' . '[&hellip;]' ), // phpcs:ignore -- Core filter.
			'imagePlaceholders' => array(
				'standard' => GENERATEBLOCKS_DIR_URL . 'assets/images/image-placeholder.png',
				'square' => GENERATEBLOCKS_DIR_URL . 'assets/images/square-image-placeholder.png',
			),
		)
	);

	if ( function_exists( 'generate_get_color_defaults' ) ) {
		$color_settings = wp_parse_args(
			get_option( 'generate_settings', array() ),
			generate_get_color_defaults()
		);

		$generatepressDefaultStyling = apply_filters(
			'generateblocks_gp_default_styling',
			array(
				'buttonBackground' => $color_settings['form_button_background_color'],
				'buttonBackgroundHover' => $color_settings['form_button_background_color_hover'],
				'buttonText' => $color_settings['form_button_text_color'],
				'buttonTextHover' => $color_settings['form_button_text_color_hover'],
				'buttonPaddingTop' => '10px',
				'buttonPaddingRight' => '20px',
				'buttonPaddingBottom' => '10px',
				'buttonPaddingLeft' => '20px',
			)
		);

		$css = sprintf(
			'.gb-button.button {
				background-color: %1$s;
				color: %2$s;
				padding-top: %3$s;
				padding-right: %4$s;
				padding-bottom: %5$s;
				padding-left: %6$s;
			}',
			$generatepressDefaultStyling['buttonBackground'],
			$generatepressDefaultStyling['buttonText'],
			$generatepressDefaultStyling['buttonPaddingTop'],
			$generatepressDefaultStyling['buttonPaddingRight'],
			$generatepressDefaultStyling['buttonPaddingBottom'],
			$generatepressDefaultStyling['buttonPaddingLeft']
		);

		$css .= sprintf(
			'.gb-button.button:active, .gb-button.button:hover, .gb-button.button:focus {
				background-color: %1$s;
				color: %2$s;
			}',
			$generatepressDefaultStyling['buttonBackgroundHover'],
			$generatepressDefaultStyling['buttonTextHover']
		);

		wp_add_inline_style( 'generateblocks', $css );
	}

	$defaults = generateblocks_get_block_defaults();

	wp_localize_script(
		'generateblocks',
		'generateBlocksDefaults',
		$defaults
	);

	wp_localize_script(
		'generateblocks',
		'generateBlocksStyling',
		generateblocks_get_default_styles()
	);

	wp_localize_script(
		'generateblocks',
		'generateBlocksLegacyDefaults',
		array(
			'v_1_4_0' => GenerateBlocks_Legacy_Attributes::get_defaults( '1.4.0' ),
		)
	);
}

if ( version_compare( $GLOBALS['wp_version'], '5.8-alpha-1', '<' ) ) {
	add_filter( 'block_categories', 'generateblocks_do_category' );
} else {
	add_filter( 'block_categories_all', 'generateblocks_do_category' );
}
/**
 * Add GeneratePress category to Gutenberg.
 *
 * @param array $categories Existing categories.
 * @since 0.1
 */
function generateblocks_do_category( $categories ) {
	return array_merge(
		array(
			array(
				'slug'  => 'generateblocks',
				'title' => __( 'GenerateBlocks', 'generateblocks' ),
			),
		),
		$categories
	);
}

add_action( 'wp_enqueue_scripts', 'generateblocks_do_google_fonts' );
add_action( 'enqueue_block_editor_assets', 'generateblocks_do_google_fonts' );
/**
 * Do Google Fonts.
 *
 * @since 0.1
 */
function generateblocks_do_google_fonts() {
	$fonts_url = generateblocks_get_google_fonts_uri();

	if ( $fonts_url ) {
		wp_enqueue_style( 'generateblocks-google-fonts', $fonts_url, array(), null, 'all' ); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
	}
}

add_filter( 'generateblocks_css_print_method', 'generateblocks_set_css_print_method' );
/**
 * Set our CSS print method.
 *
 * @param string $method Existing method.
 */
function generateblocks_set_css_print_method( $method ) {
	$method = generateblocks_get_option( 'css_print_method' );

	if ( is_single() ) {
		$method = 'inline';
	}

	return $method;
}

add_filter( 'excerpt_allowed_blocks', 'generateblocks_set_excerpt_allowed_blocks' );
/**
 * Add blocks that can be displayed in post excerpts.
 *
 * @param array $allowed Existing allowed blocks.
 * @since 1.0
 */
function generateblocks_set_excerpt_allowed_blocks( $allowed ) {
	$allowed[] = 'generateblocks/headline';
	$allowed[] = 'generateblocks/container';

	return $allowed;
}

add_filter( 'excerpt_allowed_wrapper_blocks', 'generateblocks_set_excerpt_allowed_wrapper_blocks' );
/**
 * Allows excerpts to be generated from the `innerBlocks` of these wrappers.
 *
 * @param array $allowed Existing allowed wrapper blocks.
 * @since 1.5.0
 */
function generateblocks_set_excerpt_allowed_wrapper_blocks( $allowed ) {
	$allowed[] = 'generateblocks/container';

	return $allowed;
}

add_filter( 'generateblocks_before_container_close', 'generateblocks_do_shape_divider', 10, 2 );
/**
 * Add shape divider to Container.
 *
 * @since 1.2.0
 * @param string $output The current block output.
 * @param array  $attributes The current block attributes.
 */
function generateblocks_do_shape_divider( $output, $attributes ) {
	$defaults = generateblocks_get_block_defaults();

	$settings = wp_parse_args(
		$attributes,
		$defaults['container']
	);

	if ( ! empty( $settings['shapeDividers'] ) ) {
		$shapes = generateblocks_get_svg_shapes();
		$shape_values = array();

		foreach ( $shapes as $group => $data ) {
			if ( ! empty( $data['svgs'] ) && is_array( $data['svgs'] ) ) {
				foreach ( $data['svgs'] as $key => $shape ) {
					$shape_values[ $key ] = $shape['icon'];
				}
			}
		}

		$output .= '<div class="gb-shapes">';

		foreach ( (array) $settings['shapeDividers'] as $index => $option ) {
			if ( ! empty( $option['shape'] ) ) {
				if ( isset( $shape_values[ $option['shape'] ] ) ) {
					$shapeNumber = $index + 1;

					$output .= sprintf(
						'<div class="gb-shape gb-shape-' . $shapeNumber . '">%s</div>',
						$shape_values[ $option['shape'] ]
					);
				}
			}
		}

		$output .= '</div>';
	}

	return $output;
}

add_filter( 'generateblocks_do_content', 'generateblocks_do_widget_styling' );
/**
 * Process all widget content for potential styling.
 *
 * @since 1.3.4
 * @param string $content The existing content to process.
 */
function generateblocks_do_widget_styling( $content ) {
	$widget_blocks = get_option( 'widget_block' );

	foreach ( (array) $widget_blocks as $block ) {
		if ( isset( $block['content'] ) ) {
			$content .= $block['content'];
		}
	}

	return $content;
}

add_filter( 'generateblocks_attr_container', 'generateblocks_set_inline_background_style', 10, 2 );
/**
 * Add our background image attribute to the Container.
 *
 * @since 1.5.0
 * @param array $attributes Existing attributes.
 * @param array $settings Block settings.
 */
function generateblocks_set_inline_background_style( $attributes, $settings ) {
	if ( generateblocks_has_background_image( $settings ) && $settings['bgImageInline'] ) {
		$url = generateblocks_get_background_image_url( $settings );

		if ( $url ) {
			$attribute_name = 'background-image';

			if ( 'element' !== $settings['bgOptions']['selector'] ) {
				$attribute_name = '--' . $attribute_name;
			}

			$attributes['style'] = $attribute_name . ': url(' . esc_url( $url ) . ');';
		}
	}

	return $attributes;
}
