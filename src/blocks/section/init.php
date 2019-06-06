<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'enqueue_block_editor_assets', 'generate_do_block_editor_assets' );
/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function generate_do_block_editor_assets() {
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

function generate_get_nested_block_data( $block, $data, $blockName ) {
	if ( isset( $block['innerBlocks'] ) && ! empty( $block['innerBlocks'] ) && is_array( $block['innerBlocks'] ) ) {
		foreach ( $block['innerBlocks'] as $inner_block ) {
			if ( $blockName === $inner_block['blockName'] ) {
				$data[] = $inner_block['attrs'];
			}

			$data = generate_get_nested_block_data( $inner_block, $data, $blockName );
		}
	}

	return $data;
}

function generate_get_block_data( $blockName = 'generatepress/section' ) {
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
				if ( $blockName === $block['blockName'] || 'generatepress/button-container' === $block['blockName'] ) {
					$data[] = $block['attrs'];

					$data = generate_get_nested_block_data( $block, $data, $blockName );
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

									$data = generate_get_nested_block_data( $block, $data, $blockName );
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

/**
 * Get our Section block CSS.
 *
 * @since 0.1
 *
 * @return string
 */
function generate_get_section_css() {
	$data = generate_get_block_data( 'generatepress/section' );

	if ( empty( $data ) ) {
		return;
	}

	$css = '';

	foreach ( $data as $atts ) {
		if ( ! isset( $atts['uniqueId'] ) ) {
			continue;
		}

		$id = 'section-' . absint( $atts['uniqueId'] );

		$values = array(
			'outer_container' => isset( $atts['outerContainer'] ) ? $atts['outerContainer'] : 'full',
			'inner_container' => isset( $atts['innerContainer'] ) ? $atts['innerContainer'] : 'contained',
			'background_color' => isset( $atts['backgroundColor'] ) ? 'background-color:' . $atts['backgroundColor'] . ';' : '',
			'text_color' => isset( $atts['textColor'] ) ? 'color:' . $atts['textColor'] . ';' : '',
			'padding_top' => isset( $atts['paddingTop'] ) ? 'padding-top:' . $atts['paddingTop'] . 'px;' : 'padding-top: 10px;',
			'padding_right' => isset( $atts['paddingRight'] ) ? 'padding-right:' . $atts['paddingRight'] . 'px;' : 'padding-right: 10px;',
			'padding_bottom' => isset( $atts['paddingBottom'] ) ? 'padding-bottom:' . $atts['paddingBottom'] . 'px;' : 'padding-bottom: 10px;',
			'padding_left' => isset( $atts['paddingLeft'] ) ? 'padding-left:' . $atts['paddingLeft'] . 'px;' : 'padding-left: 10px;',
			'padding_top_mobile' => isset( $atts['paddingTopMobile'] ) ? 'padding-top:' . $atts['paddingTopMobile'] . 'px;' : 'padding-top: 10px;',
			'padding_right_mobile' => isset( $atts['paddingRightMobile'] ) ? 'padding-right:' . $atts['paddingRightMobile'] . 'px;' : 'padding-right: 10px;',
			'padding_bottom_mobile' => isset( $atts['paddingBottomMobile'] ) ? 'padding-bottom:' . $atts['paddingBottomMobile'] . 'px;' : 'padding-bottom: 10px;',
			'padding_left_mobile' => isset( $atts['paddingLeftMobile'] ) ? 'padding-left:' . $atts['paddingLeftMobile'] . 'px;' : 'padding-left: 10px;',
			'column_gutter' => isset( $atts['columnGutter'] ) ? $atts['columnGutter'] : '',
			'column_gutter_mobile' => isset( $atts['columnGutterMobile'] ) ? $atts['columnGutterMobile'] : '',
			'link_color' => isset( $atts['linkColor'] ) ? 'color:' . $atts['linkColor'] . ';' : '',
			'link_color_hover' => isset( $atts['linkColorHover'] ) ? 'color:' . $atts['linkColorHover'] . ';' : '',
			'background_image' => isset( $atts['bgImage'] ) ? $atts['bgImage'] : '',
			'background_options' => isset( $atts['bgOptions'] ) ? $atts['bgOptions'] : '',
		);

		$container_width = 1100;

		if ( function_exists( 'generate_get_option' ) ) {
			$container_width = generate_get_option( 'container_width' );
		}

		if ( 'contained' === $values['outer_container'] ) {
			$css .= '.generate-section.' . $id . '{max-width: ' . absint( $container_width ) . 'px;margin-left: auto;margin-right: auto;}';
		}

		if ( 'contained' === $values['inner_container'] ) {
			$css .= '.generate-section.' . $id . ' .inside-section{max-width: ' . absint( $container_width ) . 'px;margin-left: auto;margin-right: auto;}';
		}

		if ( $values['background_color'] || $values['text_color'] ) {
			$css .= '.generate-section.' . $id . '{' . $values['background_color'] . $values['text_color'] . '}';
		}

		if ( $values['background_image'] ) {
			$url = $values['background_image']['image']['url'];

			$background_position = 'center center';
			$background_size = 'cover';
			$background_repeat = 'no-repeat';
			$background_attachment = '';

			if ( ! empty( $values['background_options']['position'] ) ) {
				$background_position = $values['background_options']['position'];
			}

			if ( ! empty( $values['background_options']['size'] ) ) {
				$background_size = $values['background_options']['size'];
			}

			if ( ! empty( $values['background_options']['repeat'] ) ) {
				$background_repeat = $values['background_options']['repeat'];
			}

			if ( ! empty( $values['background_options']['attachment'] ) ) {
				$background_attachment = 'background-attachment: ' . $values['background_options']['attachment'] . ';';
			}

			if ( $values['background_color'] && isset( $values['background_options']['overlay'] ) && $values['background_options']['overlay'] ) {
				$css .= '.generate-section.' . $id . '{background-image: linear-gradient(0deg, ' . $atts['backgroundColor'] . ', ' . $atts['backgroundColor'] . '), url(' . esc_url( $url ) . ');background-size: ' . $background_size . ';background-position: ' . $background_position . ';background-repeat: ' . $background_repeat . ';' . $background_attachment . '}';
			} else {
				$css .= '.generate-section.' . $id . '{background-image: url(' . esc_url( $url ) . ');background-size: ' . $background_size . ';background-position: ' . $background_position . ';background-repeat: ' . $background_repeat . ';' . $background_attachment . '}';
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

		if ( $values['column_gutter'] || 0 === $values['column_gutter'] ) {
			$css .= ".generate-section." . $id . " .wp-block-columns {margin-left: -" . $values['column_gutter'] . "px}";
			$css .= ".generate-section." . $id . " .wp-block-columns .wp-block-column {margin-left: " . $values['column_gutter'] . "px}";
		}

		if (
			$values['padding_top_mobile'] ||
			$values['padding_right_mobile'] ||
			$values['padding_bottom_mobile'] ||
			$values['padding_left_mobile'] ||
			$values['column_gutter_mobile']
		) {
			$media_query = apply_filters( 'generate_mobile_media_query', '(max-width:768px)' );
			$css .= "@media " . $media_query . " {";
				if (
					$values['padding_top_mobile'] ||
					$values['padding_right_mobile'] ||
					$values['padding_bottom_mobile'] ||
					$values['padding_left_mobile']
				) {
					$css .= ".generate-section." . $id . " > .inside-section{" . $values['padding_top_mobile'] . $values['padding_right_mobile'] . $values['padding_bottom_mobile'] . $values['padding_left_mobile'] . "}";
				}

				if ( $values['column_gutter_mobile'] || 0 === $values['column_gutter_mobile'] ) {
					$css .= ".generate-section." . $id . " .wp-block-columns .wp-block-column {margin-bottom: " . $values['column_gutter_mobile'] . "px}";
				}
			$css .= "}";
		}
	}

	$css .= '.inside-section > *:last-child {margin-bottom:0}';

	return $css;
}

/**
 * Get our Button block CSS.
 *
 * @since 0.1
 *
 * @return string
 */
function generate_get_button_css() {
	$data = generate_get_block_data( 'generatepress/button' );

	if ( empty( $data ) ) {
		return;
	}

	$css = '.gp-button-wrapper{display: flex;flex-wrap: wrap;align-items: flex-start;justify-content: flex-start;clear: both;}';
	$css .= '.gp-button {display: inline-flex;align-items: center;justify-content: center;padding: .75em 1em;line-height: 1em;text-decoration: none !important;transition: .2s background-color ease-in-out, .2s color ease-in-out, .2s border-color ease-in-out, .2s opacity ease-in-out, .2s box-shadow ease-in-out;}';

	foreach ( $data as $atts ) {
		if ( ! isset( $atts['uniqueId'] ) ) {
			continue;
		}

		$id = absint( $atts['uniqueId'] );

		$values = array(
			'background_color' => isset( $atts['backgroundColor'] ) ? 'background-color:' . $atts['backgroundColor'] . ';' : 'background-color: #0366d6;',
			'text_color' => isset( $atts['textColor'] ) ? 'color:' . $atts['textColor'] . ';' : 'color: #ffffff;',
			'background_color_hover' => isset( $atts['backgroundColorHover'] ) ? 'background-color:' . $atts['backgroundColorHover'] . ';' : 'background-color: #222222;',
			'text_color_hover' => isset( $atts['textColorHover'] ) ? 'color:' . $atts['textColorHover'] . ';' : 'color: #ffffff;',
			'border_radius' => isset( $atts['borderRadius'] ) ? 'border-radius:' . $atts['borderRadius'] . 'px;' : 'border-radius: 2px;',
			'font_size' => isset( $atts['fontSize'] ) ? 'font-size:' . $atts['fontSize'] . 'em;' : '',
			'gap' => isset( $atts['gap'] ) ? 'margin-right:' . $atts['gap'] . 'px;' : 'margin-right: 25px;',
		);

		if (
			$values['background_color'] ||
			$values['text_color'] ||
			$values['border_radius'] ||
			$values['font_size'] ||
			$values['gap']
		) {
			$css .= 'a.gp-button-' . $id . '{' . $values['background_color'] . $values['text_color'] . $values['border_radius'] . $values['font_size'] . $values['gap'] . '}';
		}

		if ( $values['background_color_hover'] || $values['text_color_hover'] ) {
			$css .= 'a.gp-button-' . $id . ':hover,a.gp-button-' . $id . ':active, a.gp-button-' . $id . ':focus{' . $values['background_color_hover'] . $values['text_color_hover'] . '}';
		}
	}

	return $css;
}

/**
 * Get our Button Container block CSS.
 *
 * @since 0.1
 *
 * @return string
 */
function generate_get_button_container_css() {
	$data = generate_get_block_data( 'generatepress/button-container' );

	if ( empty( $data ) ) {
		return;
	}

	$css = '';

	foreach ( $data as $atts ) {
		if ( ! isset( $atts['uniqueId'] ) ) {
			continue;
		}

		$id = absint( $atts['uniqueId'] );

		$values = array(
			'padding_top' => isset( $atts['paddingTop'] ) ? 'padding-top:' . $atts['paddingTop'] . 'px;' : '',
			'padding_right' => isset( $atts['paddingRight'] ) ? 'padding-right:' . $atts['paddingRight'] . 'px;' : '',
			'padding_bottom' => isset( $atts['paddingBottom'] ) ? 'padding-bottom:' . $atts['paddingBottom'] . 'px;' : 'padding-bottom: 25px;',
			'padding_left' => isset( $atts['paddingLeft'] ) ? 'padding-left:' . $atts['paddingLeft'] . 'px;' : '',
			'padding_top_mobile' => isset( $atts['paddingTopMobile'] ) ? 'padding-top:' . $atts['paddingTopMobile'] . 'px;' : '',
			'padding_right_mobile' => isset( $atts['paddingRightMobile'] ) ? 'padding-right:' . $atts['paddingRightMobile'] . 'px;' : '',
			'padding_bottom_mobile' => isset( $atts['paddingBottomMobile'] ) ? 'padding-bottom:' . $atts['paddingBottomMobile'] . 'px;' : 'padding-bottom: 25px;',
			'padding_left_mobile' => isset( $atts['paddingLeftMobile'] ) ? 'padding-left:' . $atts['paddingLeftMobile'] . 'px;' : '',
		);

		if ( $values['padding_top'] || $values['padding_right'] || $values['padding_bottom'] || $values['padding_left'] ) {
			$css .= ".gp-button-wrapper-" . $id . "{" . $values['padding_top'] . $values['padding_right'] . $values['padding_bottom'] . $values['padding_left'] . "}";
		}

		if (
			$values['padding_top_mobile'] ||
			$values['padding_right_mobile'] ||
			$values['padding_bottom_mobile'] ||
			$values['padding_left_mobile']
		) {
			$media_query = apply_filters( 'generate_mobile_media_query', '(max-width:768px)' );
			$css .= "@media " . $media_query . " {";
				if (
					$values['padding_top_mobile'] ||
					$values['padding_right_mobile'] ||
					$values['padding_bottom_mobile'] ||
					$values['padding_left_mobile']
				) {
					$css .= ".gp-button-wrapper-" . $id . " {" . $values['padding_top_mobile'] . $values['padding_right_mobile'] . $values['padding_bottom_mobile'] . $values['padding_left_mobile'] . "}";
				}
			$css .= "}";
		}
	}

	return $css;
}

add_action( 'wp_head', 'generate_do_section_block_frontend_css', 200 );
/**
 * Print our CSS for each section.
 *
 * @since 1.8
 */
function generate_do_section_block_frontend_css() {

	$section_css = generate_get_section_css();
	$button_container_css = generate_get_button_container_css();
	$button_css = generate_get_button_css();

	echo '<style>';
		echo $section_css . $button_container_css . $button_css;
	echo '</style>';
}
