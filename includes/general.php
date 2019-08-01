<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'enqueue_block_editor_assets', 'flex_do_block_editor_assets' );
/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function flex_do_block_editor_assets() {
	wp_enqueue_script(
		'flex-blocks',
		FLEX_BLOCKS_MODULE_DIR_URL . 'dist/blocks.build.js',
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		filemtime( FLEX_BLOCKS_MODULE_DIR . 'dist/blocks.build.js' ),
		true
	);

	wp_enqueue_style(
		'flex-blocks',
		FLEX_BLOCKS_MODULE_DIR_URL . 'dist/blocks.editor.build.css',
		array( 'wp-edit-blocks' ),
		filemtime( FLEX_BLOCKS_MODULE_DIR . 'dist/blocks.editor.build.css' )
	);

	if ( function_exists( 'generate_get_option' ) ) {
		$css = 'body.wp-admin .editor-styles-wrapper .grid-container {max-width: ' . generate_get_option( 'container_width' ) . 'px;margin-left: auto;margin-right:auto;';
		wp_add_inline_style( 'generatepress-section-block', $css );
	}

	wp_localize_script(
		'flex-blocks',
		'flexBlocksDefaults',
		flex_get_block_defaults()
	);
}

add_filter( 'block_categories', 'flex_blocks_do_category' );
/**
 * Add GeneratePress category to Gutenberg.
 *
 * @since 0.1
 */
function flex_blocks_do_category( $categories ) {
	return array_merge(
		array(
			array(
				'slug'  => 'flex-blocks',
				'title' => __( 'Flex Blocks', 'flex-blocks' ),
			),
		),
		$categories
    );
}
