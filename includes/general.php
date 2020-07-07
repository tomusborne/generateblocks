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
	wp_enqueue_script(
		'generateblocks',
		GENERATEBLOCKS_DIR_URL . 'dist/blocks.build.js',
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-compose', 'wp-data' ),
		filemtime( GENERATEBLOCKS_DIR . 'dist/blocks.build.js' ),
		true
	);

	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'generateblocks', 'generateblocks' );
	}

	wp_enqueue_script(
		'generateblocks-dompurify',
		GENERATEBLOCKS_DIR_URL . 'assets/js/purify.min.js',
		array( 'generateblocks' ),
		filemtime( GENERATEBLOCKS_DIR . 'assets/js/purify.min.js' ),
		true
	);

	wp_enqueue_style(
		'generateblocks',
		GENERATEBLOCKS_DIR_URL . 'dist/blocks.editor.build.css',
		array( 'wp-edit-blocks' ),
		filemtime( GENERATEBLOCKS_DIR . 'dist/blocks.editor.build.css' )
	);

	wp_localize_script(
		'generateblocks',
		'generateBlocksInfo',
		array(
			'isGeneratePress' => defined( 'GENERATE_VERSION' ),
			'hasCustomFields' => post_type_supports( get_post_type(), 'custom-fields' ),
			'hasWideAlignSupport' => current_theme_supports( 'align-wide' ),
			'colorComponentDiplay' => generateblocks_get_option( 'color_component_display' ),
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
}

add_filter( 'block_categories', 'generateblocks_do_category' );
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

add_action( 'init', 'generateblocks_register_meta' );
/**
 * Register our post meta.
 *
 * @since 0.1
 */
function generateblocks_register_meta() {
	register_meta(
		'post',
		'_generate-full-width-content',
		array(
			'show_in_rest' => true,
			'auth_callback' => '__return_true',
			'single' => true,
		)
	);
}

add_filter( 'generateblocks_css_print_method', 'generateblocks_set_css_print_method' );
/**
 * Set our CSS print method.
 *
 * @param string $method Existing method.
 */
function generateblocks_set_css_print_method( $method ) {
	return generateblocks_get_option( 'css_print_method' );
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
