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
		GENERATEBLOCKS_MODULE_DIR_URL . 'dist/blocks.build.js',
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		filemtime( GENERATEBLOCKS_MODULE_DIR . 'dist/blocks.build.js' ),
		true
	);

	wp_enqueue_script(
		'generateblocks-dompurify',
		GENERATEBLOCKS_MODULE_DIR_URL . 'assets/js/purify.min.js',
		array( 'generateblocks' ),
		filemtime( GENERATEBLOCKS_MODULE_DIR . 'assets/js/purify.min.js' ),
		true
	);

	wp_enqueue_style(
		'generateblocks',
		GENERATEBLOCKS_MODULE_DIR_URL . 'dist/blocks.editor.build.css',
		array( 'wp-edit-blocks' ),
		filemtime( GENERATEBLOCKS_MODULE_DIR . 'dist/blocks.editor.build.css' )
	);

	if ( function_exists( 'generate_get_option' ) ) {
		$css = 'body.wp-admin .editor-styles-wrapper .grid-container {max-width: ' . generate_get_option( 'container_width' ) . 'px;margin-left: auto;margin-right:auto;}';

		if ( function_exists( 'generate_get_color_defaults' ) ) {
			$color_settings = wp_parse_args(
				get_option( 'generate_settings', array() ),
				generate_get_color_defaults()
			);

			$generatepressDefaultStyling = apply_filters( 'generateblocks_gp_default_styling', array(
				'buttonBackground' => $color_settings['form_button_background_color'],
				'buttonBackgroundHover' => $color_settings['form_button_background_color_hover'],
				'buttonText' => $color_settings['form_button_text_color'],
				'buttonTextHover' => $color_settings['form_button_text_color_hover'],
				'buttonPaddingTop' => '10px',
				'buttonPaddingRight' => '20px',
				'buttonPaddingBottom' => '10px',
				'buttonPaddingLeft' => '20px',
			) );

			$css .= '.gb-button.button {background-color:' . $generatepressDefaultStyling['buttonBackground'] . ';color:' . $generatepressDefaultStyling['buttonText'] . ';padding-top:' . $generatepressDefaultStyling['buttonPaddingTop'] . ';padding-right:' . $generatepressDefaultStyling['buttonPaddingRight'] . ';padding-bottom:' . $generatepressDefaultStyling['buttonPaddingBottom'] . ';padding-left:' . $generatepressDefaultStyling['buttonPaddingLeft'] . ';}';
			$css .= '.gb-button.button:active, .gb-button.button:hover, .gb-button.button:focus{background-color:' . $generatepressDefaultStyling['buttonBackgroundHover'] . ';color:' . $generatepressDefaultStyling['buttonTextHover'] . ';}';
		}

		wp_add_inline_style( 'generateblocks', $css );
	}

	wp_localize_script(
		'generateblocks',
		'generateBlocksDefaults',
		generateblocks_get_block_defaults()
	);

	$defaultBlockStyles = array(
		'button' => array(
			'backgroundColor' => '#0366d6',
			'textColor' => '#ffffff',
			'backgroundColorHover' => '#222222',
			'textColorHover' => '#ffffff',
			'paddingTop' => '15',
			'paddingRight' => '20',
			'paddingBottom' => '15',
			'paddingLeft' => '20',
		),
	);

	if ( function_exists( 'generate_get_default_fonts' ) ) {
		$font_settings = wp_parse_args(
			get_option( 'generate_settings', array() ),
			generate_get_default_fonts()
		);

		$defaultBlockStyles['headline'] = array(
			'paragraphMargin' => $font_settings['paragraph_margin'] . 'em',
			'h1Margin' => $font_settings['heading_1_margin_bottom'] . 'px',
			'h2Margin' => $font_settings['heading_2_margin_bottom'] . 'px',
			'h3Margin' => $font_settings['heading_3_margin_bottom'] . 'px',
			'h4Margin' => '20px',
			'h5Margin' => '20px',
			'h6Margin' => '20px',
		);
	}

	wp_localize_script(
		'generateblocks',
		'generateBlocksStyling',
		apply_filters( 'generateblocks_default_block_styles', $defaultBlockStyles )
	);
}

add_filter( 'block_categories', 'generateblocks_do_category' );
/**
 * Add GeneratePress category to Gutenberg.
 *
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
		wp_enqueue_style( 'generateblocks-google-fonts', $fonts_url, array(), null, 'all' );
	}
}

add_filter( 'generateblocks_google_font_variants', 'generateblocks_do_bold_google_fonts' );
/**
 * Add bold variants to Google fonts to account for bolded words.
 *
 * @since 0.1
 */
function generateblocks_do_bold_google_fonts( $variants ) {
	if ( ! in_array( '700', $variants ) ) {
		$variants[] = '700';
		$variants[] = '700i';
	}

	return $variants;
}
