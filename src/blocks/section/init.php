<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'enqueue_block_editor_assets', 'generate_enqueue_section_block_scripts' );
/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function generate_enqueue_section_block_scripts() {
	wp_enqueue_script(
		'generatepress-blocks',
		GENERATE_BLOCK_MODULE_DIR_URL . 'dist/blocks.build.js',
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		filemtime( GENERATE_BLOCK_MODULE_DIR . 'dist/blocks.build.js' ),
		true
	);

	wp_enqueue_style(
		'generatepress-blocks',
		GENERATE_BLOCK_MODULE_DIR_URL . 'dist/blocks.editor.build.css',
		array( 'wp-edit-blocks' ),
		filemtime( GENERATE_BLOCK_MODULE_DIR . 'dist/blocks.editor.build.css' )
	);

	if ( function_exists( 'generate_get_option' ) ) {
		$css = 'body.wp-admin .editor-styles-wrapper .grid-container {max-width: ' . generate_get_option( 'container_width' ) . 'px;margin-left: auto;margin-right:auto;';
		wp_add_inline_style( 'generatepress-section-block', $css );
	}
}

function generate_get_nested_section_block_data( $block, $data ) {
	if ( isset( $block['innerBlocks'] ) && ! empty( $block['innerBlocks'] ) && is_array( $block['innerBlocks'] ) ) {
		foreach ( $block['innerBlocks'] as $inner_block ) {
			if ( 'generatepress/section' === $inner_block['blockName'] ) {
				$data[] = $inner_block['attrs'];
			}

			$data = generate_get_nested_section_block_data( $inner_block, $data );
		}
	}

	return $data;
}

function generate_get_section_block_data() {
	if ( ! function_exists( 'has_blocks' ) ) {
		return;
	}

	if ( is_singular() && has_blocks( get_the_ID() ) ) {
		global $post;

		if ( ! is_object( $post ) ) {
			return;
		}

		if ( ! function_exists( 'parse_blocks' ) ) {
			return;
		}

		$blocks = parse_blocks( $post->post_content );

		if ( ! is_array( $blocks ) || empty( $blocks ) ) {
			return;
		}

		$data = array();

		foreach ( $blocks as $index => $block ) {
			if ( ! is_object( $block ) && is_array( $block ) && isset( $block['blockName'] ) ) {
				if ( 'generatepress/section' === $block['blockName'] ) {
					$data[] = $block['attrs'];

					$data = generate_get_nested_section_block_data( $block, $data );
				}

				if ( 'core/block' === $block['blockName'] ) {
					$atts = $block['attrs'];

					if ( isset( $atts['ref'] ) ) {
						$reusable_block = get_post( $atts['ref'] );

						if ( $reusable_block && 'wp_block' === $reusable_block->post_type ) {
							$blocks = parse_blocks( $reusable_block->post_content );

							foreach ( $blocks as $index => $block ) {
								if ( 'generatepress/section' === $block['blockName'] ) {
									$data[] = $block['attrs'];

									$data = generate_get_nested_section_block_data( $block, $data );
								}
							}
						}
					}
				}
			}
		}

		return $data;
	}
}

add_action( 'wp_enqueue_scripts', 'generate_do_section_block_frontend_css', 200 );
/**
 * Print our CSS for each section.
 *
 * @since TBA
 */
function generate_do_section_block_frontend_css() {

	$data = generate_get_section_block_data();

	if ( empty( $data ) ) {
		return;
	}

	wp_register_script(
		'generatepress-sections-parallax',
		plugins_url( 'parallax.min.js', __FILE__ ),
		array()
	);

	wp_localize_script(
		'generatepress-sections-parallax',
		'sectionParallaxArgs',
		array(
			'speed' => apply_filters( 'generate_sections_parallax_speed', 6 ),
		)
	);

	$css = '';

	foreach ( $data as $atts ) {
		if ( ! isset( $atts['uniqueID'] ) ) {
			continue;
		}

		$id = 'section-' . $atts['uniqueID'];

		$values = array(
			'background_color' => isset( $atts['backgroundColor'] ) ? 'background-color:' . $atts['backgroundColor'] . ';' : '',
			'text_color' => isset( $atts['textColor'] ) ? 'color:' . $atts['textColor'] . ';' : '',
			'padding_top' => isset( $atts['paddingTop'] ) ? 'padding-top:' . $atts['paddingTop'] . 'px;' : '',
			'padding_right' => isset( $atts['paddingRight'] ) ? 'padding-right:' . $atts['paddingRight'] . 'px;' : '',
			'padding_bottom' => isset( $atts['paddingBottom'] ) ? 'padding-bottom:' . $atts['paddingBottom'] . 'px;' : '',
			'padding_left' => isset( $atts['paddingLeft'] ) ? 'padding-left:' . $atts['paddingLeft'] . 'px;' : '',
			'link_color' => isset( $atts['linkColor'] ) ? 'color:' . $atts['linkColor'] . ';' : '',
			'link_color_hover' => isset( $atts['linkColorHover'] ) ? 'color:' . $atts['linkColorHover'] . ';' : '',
			'background_image' => isset( $atts['bgImage'] ) ? $atts['bgImage'] : '',
			'background_options' => isset( $atts['bgOptions'] ) ? $atts['bgOptions'] : '',
		);

		if ( isset( $values['background_options']['parallax'] ) && $values['background_options']['parallax'] ) {
			wp_enqueue_script( 'generatepress-sections-parallax' );
		}

		if ( $values['background_color'] || $values['text_color'] ) {
			$css .= '.generate-section.' . $id . '{' . $values['background_color'] . $values['text_color'] . '}';
		}

		if ( $values['background_image'] ) {
			$url = $values['background_image']['image']['url'];

			$background_position = 'center center';

			if ( isset( $values['background_options']['parallax'] ) && $values['background_options']['parallax'] ) {
				$background_position = 'center top';
			}

			if ( $values['background_color'] && isset( $values['background_options']['overlay'] ) && $values['background_options']['overlay'] ) {
				$css .= '.generate-section.' . $id . '{background-image: linear-gradient(0deg, ' . $atts['customBackgroundColor'] . ', ' . $atts['customBackgroundColor'] . '), url(' . $url . ');background-size: cover;background-position: ' . $background_position . ';}';
			} else {
				$css .= '.generate-section.' . $id . '{background-image: url(' . $url . ');background-size: cover;background-position: ' . $background_position . ';}';
			}
		}

		if ( $values['padding_top'] || $values['padding_right'] || $values['padding_bottom'] || $values['padding_left'] ) {
			$css .= ".generate-section." . $id . " > .inside-section{" . $values['padding_top'] . $values['padding_right'] . $values['padding_bottom'] . $values['padding_left'] . "}";
		}

		if ( $values['link_color'] ) {
			$css .= ".generate-section." . $id . " a, .generate-section." . $id . " a:visited{" . $values['link_color'] . "}";
		}

		if ( $values['link_color_hover'] ) {
			$css .= ".generate-section." . $id . " a:hover{" . $values['link_color_hover'] . "}";
		}
	}

	$css .= '.inside-section > *:last-child {margin-bottom:0}';

	wp_add_inline_style( 'generate-style', $css );
}
