<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'enqueue_block_editor_assets', 'flexblocks_do_block_editor_assets' );
/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function flexblocks_do_block_editor_assets() {
	wp_enqueue_script(
		'flexblocks',
		FLEXBLOCKS_MODULE_DIR_URL . 'dist/blocks.build.js',
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		filemtime( FLEXBLOCKS_MODULE_DIR . 'dist/blocks.build.js' ),
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

add_action( 'init', 'flexblocks_register_meta' );
/**
 * Register post meta.
 *
 * @since 0.1
 */
function flexblocks_register_meta() {
	register_meta(
		'post',
		'_flexblocks_google_fonts',
		array(
			'show_in_rest'  => true,
			'single'		=> true,
			'auth_callback' => 'flexblocks_auth_callback',
		)
	);
}

/**
 * Build our list of Google fonts on this page.
 *
 * @since 0.1
 */
function flexblocks_get_google_fonts( $post_id = '' ) {
	if ( ! $post_id ) {
		$post_id = get_the_ID();
	}

	$meta = json_decode( get_post_meta( $post_id, '_flexblocks_google_fonts', true ), true );

	$fonts = array();

	foreach ( (array) $meta as $font ) {
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
 */
function flexblocks_get_google_fonts_uri( $post_id = '' ) {
	if ( ! $post_id ) {
		$post_id = get_the_ID();
	}

	$google_fonts = flexblocks_get_google_fonts( $post_id );

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

	$font_args = array(
		'family' => implode( '|', $data ),
		'subset' => apply_filters( 'flexblocks_google_font_subset', null ),
		'display' => apply_filters( 'flexblocks_google_font_display', 'swap' ),
	);

	return add_query_arg( $font_args, '//fonts.googleapis.com/css' );
}

add_action( 'wp_enqueue_scripts', 'flexblocks_do_google_fonts' );
add_action( 'enqueue_block_editor_assets', 'flexblocks_do_google_fonts' );
/**
 * Do Google Fonts.
 *
 * @since 0.1
 */
function flexblocks_do_google_fonts() {
	$fonts_url = flexblocks_get_google_fonts_uri( get_the_ID() );

	if ( $fonts_url ) {
		wp_enqueue_style( 'flexblocks-google-fonts', $fonts_url, array(), null, 'all' );
	}
}
