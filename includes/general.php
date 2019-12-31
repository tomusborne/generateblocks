<?php
/**
 * General actions and filters.
 *
 * @package FlexBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

add_action( 'enqueue_block_editor_assets', 'flexblocks_do_block_editor_assets' );
/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 0.1
 */
function flexblocks_do_block_editor_assets() {
	wp_enqueue_script(
		'flexblocks',
		FLEXBLOCKS_MODULE_DIR_URL . 'dist/blocks.build.js',
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		filemtime( FLEXBLOCKS_MODULE_DIR . 'dist/blocks.build.js' ),
		true
	);

	wp_enqueue_script(
		'flexblocks-dompurify',
		FLEXBLOCKS_MODULE_DIR_URL . 'dist/js/purify.min.js',
		array( 'flexblocks' ),
		filemtime( FLEXBLOCKS_MODULE_DIR . 'dist/js/purify.min.js' ),
		true
	);

	wp_enqueue_style(
		'flexblocks',
		FLEXBLOCKS_MODULE_DIR_URL . 'dist/blocks.editor.build.css',
		array( 'wp-edit-blocks' ),
		filemtime( FLEXBLOCKS_MODULE_DIR . 'dist/blocks.editor.build.css' )
	);

	if ( function_exists( 'generate_get_option' ) ) {
		$css = 'body.wp-admin .editor-styles-wrapper .grid-container {max-width: ' . generate_get_option( 'container_width' ) . 'px;margin-left: auto;margin-right:auto;';
		wp_add_inline_style( 'flexblocks', $css );
	}

	wp_localize_script(
		'flexblocks',
		'flexBlocksDefaults',
		flexblocks_get_block_defaults()
	);
}

add_filter( 'block_categories', 'flexblocks_do_category' );
/**
 * Add GeneratePress category to Gutenberg.
 *
 * @since 0.1
 */
function flexblocks_do_category( $categories ) {
	return array_merge(
		array(
			array(
				'slug'  => 'flexblocks',
				'title' => __( 'FlexBlocks', 'flexblocks' ),
			),
		),
		$categories
    );
}

add_action( 'wp_enqueue_scripts', 'flexblocks_do_google_fonts' );
add_action( 'enqueue_block_editor_assets', 'flexblocks_do_google_fonts' );
/**
 * Do Google Fonts.
 *
 * @since 0.1
 */
function flexblocks_do_google_fonts() {
	$fonts_url = flexblocks_get_google_fonts_uri();

	if ( $fonts_url ) {
		wp_enqueue_style( 'flexblocks-google-fonts', $fonts_url, array(), null, 'all' );
	}
}
