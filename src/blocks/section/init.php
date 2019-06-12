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
				if ( $blockName === $block['blockName'] ) {
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

				// Pass our grid container attributes to the grid.
				if ( 'generatepress/grid-container' === $block['blockName'] ) {
					foreach ( $block['attrs'] as $key => $val ) {
						if ( 'gap' === $key ) {
							$data['grid-container-gap'] = $val;
						}
					}
				}

				// Need to check for nested blocks.
				if ( $blockName !== $block['blockName'] && 'core/block' !== $block['blockName'] ) {
					$data = generate_get_nested_block_data( $block, $data, $blockName );
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

	$css = new GeneratePress_Blocks_Dynamic_CSS;

	$css->set_selector( '.gp-button' );
	$css->add_property( 'display', 'inline-flex' );
	$css->add_property( 'align-items', 'center' );
	$css->add_property( 'justify-content', 'center' );
	$css->add_property( 'padding', '.75em 1em' );
	$css->add_property( 'line-height', '1em' );
	$css->add_property( 'text-decoration', 'none !important' );
	$css->add_property( 'transition', '.2s background-color ease-in-out, .2s color ease-in-out, .2s border-color ease-in-out, .2s opacity ease-in-out, .2s box-shadow ease-in-out' );

	foreach ( $data as $atts ) {
		if ( ! isset( $atts['uniqueId'] ) ) {
			continue;
		}

		$settings = wp_parse_args(
			$atts,
			generate_get_block_defaults( 'button' )
		);

		$id = absint( $atts['uniqueId'] );

		$css->set_selector( 'a.gp-button-' . $id );
		$css->add_property( 'background-color', $settings['backgroundColor'] );
		$css->add_property( 'color', $settings['textColor'] );
		$css->add_property( 'border-radius', $settings['borderRadius'], 'px' );
		$css->add_property( 'font-size', $settings['fontSize'], 'em' );
		$css->add_property( 'margin-right', $settings['gap'], 'px' );
		$css->add_property( 'border-width', $settings['borderSize'], 'px' );
		$css->add_property( 'border-style', 'solid' );
		$css->add_property( 'border-color', $settings['borderColor'] );

		$css->set_selector( 'a.gp-button-' . $id . ':hover,a.gp-button-' . $id . ':active, a.gp-button-' . $id . ':focus' );
		$css->add_property( 'background-color', $settings['backgroundColorHover'] );
		$css->add_property( 'color', $settings['textColorHover'] );
		$css->add_property( 'border-color', $settings['borderColorHover'] );
	}

	return $css->css_output();
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

	$css = new GeneratePress_Blocks_Dynamic_CSS;

	$css->set_selector( '.gp-button-wrapper' );
	$css->add_property( 'display', 'flex' );
	$css->add_property( 'flex-wrap', 'wrap' );
	$css->add_property( 'align-items', 'flex-start' );
	$css->add_property( 'justify-content', 'flex-start' );
	$css->add_property( 'clear', 'both' );

	foreach ( $data as $atts ) {
		if ( ! isset( $atts['uniqueId'] ) ) {
			continue;
		}

		$settings = wp_parse_args(
			$atts,
			generate_get_block_defaults( 'button-container' )
		);

		$id = absint( $atts['uniqueId'] );

		$css->set_selector( '.gp-button-wrapper-' . $id );
		$css->add_property( 'padding-top', $settings['paddingTop'], 'px' );
		$css->add_property( 'padding-right', $settings['paddingRight'], 'px' );
		$css->add_property( 'padding-bottom', $settings['paddingBottom'], 'px' );
		$css->add_property( 'padding-left', $settings['paddingLeft'], 'px' );

		$css->start_media_query( apply_filters( 'generate_mobile_media_query', '(max-width:768px)' ) );
			$css->set_selector( '.gp-button-wrapper-' . $id );
			$css->add_property( 'padding-top', $settings['paddingTopMobile'], 'px' );
			$css->add_property( 'padding-right', $settings['paddingRightMobile'], 'px' );
			$css->add_property( 'padding-bottom', $settings['paddingBottomMobile'], 'px' );
			$css->add_property( 'padding-left', $settings['paddingLeftMobile'], 'px' );
		$css->stop_media_query();
	}

	return $css->css_output();
}

/**
 * Get our Heading block CSS.
 *
 * @since 0.1
 *
 * @return string
 */
function generate_get_heading_css() {
	$data = generate_get_block_data( 'generatepress/heading' );

	if ( empty( $data ) ) {
		return;
	}

	$css = new GeneratePress_Blocks_Dynamic_CSS;

	foreach ( $data as $atts ) {
		if ( ! isset( $atts['uniqueId'] ) ) {
			continue;
		}

		$settings = wp_parse_args(
			$atts,
			generate_get_block_defaults( 'heading' )
		);

		$id = absint( $atts['uniqueId'] );

		$css->set_selector( '.gp-heading-' . $id );
		$css->add_property( 'text-align', $settings['align'] );
		$css->add_property( 'color', $settings['color'] );
		$css->add_property( 'font-size', $settings['size'], 'px' );
	}

	return $css->css_output();
}

/**
 * Get our Grid column block CSS.
 *
 * @since 0.1
 *
 * @return string
 */
function generate_get_grid_column_css() {
	$data = generate_get_block_data( 'generatepress/grid-column' );

	if ( empty( $data ) ) {
		return;
	}

	$css = new GeneratePress_Blocks_Dynamic_CSS;

	$css->set_selector( '.gp-grid' );
	$css->add_property( 'box-sizing', 'border-box' );

	foreach ( $data as $atts ) {
		if ( ! isset( $atts['uniqueId'] ) ) {
			continue;
		}

		$settings = wp_parse_args(
			$atts,
			generate_get_block_defaults( 'grid-column' )
		);

		$container_defaults = generate_get_block_defaults( 'grid-container' );

		$id = absint( $atts['uniqueId'] );

		$gap = $container_defaults['gap'];

		if ( isset( $data['grid-container-gap'] ) ) {
			$gap = $data['grid-container-gap'];
		}

		$css->set_selector( '.gp-grid-' . $id );

		if ( $gap ) {
			$css->add_property( 'width', 'calc(' . $settings['width'] . '% - ' . $gap . 'px)' );
			$css->add_property( 'margin-left', $gap / 2, 'px' );
			$css->add_property( 'margin-right', $gap / 2, 'px' );
			$css->add_property( 'margin-bottom', $gap, 'px' );
		} else {
			$css->add_property( 'width', $settings['width'], '%' );
		}

		$css->start_media_query( apply_filters( 'generate_mobile_media_query', '(max-width:768px)' ) );
			$css->set_selector( '.gp-grid-' . $id );

			if ( $gap ) {
				$css->add_property( 'width', 'calc(' . $settings['mobileWidth'] . '% - ' . $gap . 'px)' );
			} else {
				$css->add_property( 'width', $settings['mobileWidth'], '%' );
			}
		$css->stop_media_query();
	}

	return $css->css_output();
}

function generate_get_grid_container_css() {
	$data = generate_get_block_data( 'generatepress/grid-container' );

	if ( empty( $data ) ) {
		return;
	}

	$css = new GeneratePress_Blocks_Dynamic_CSS;

	$css->set_selector( '.gp-grid-wrapper' );
	$css->add_property( 'display', 'flex' );
	$css->add_property( 'flex-wrap', 'wrap' );

	foreach ( $data as $atts ) {
		if ( ! isset( $atts['uniqueId'] ) ) {
			continue;
		}

		$settings = wp_parse_args(
			$atts,
			generate_get_block_defaults( 'grid-container' )
		);

		$id = absint( $atts['uniqueId'] );

		if ( $settings['gap'] ) {
			$css->set_selector( '.gp-grid-wrapper-' . $id );
			$css->add_property( 'margin-left', '-' . $settings['gap'] / 2 . 'px' );
			$css->add_property( 'margin-right', '-' . $settings['gap'] / 2 . 'px' );
		}
	}

	return $css->css_output();
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
	$heading_css = generate_get_heading_css();
	$grid_container_css = generate_get_grid_container_css();
	$grid_column_css = generate_get_grid_column_css();

	echo '<style>';
		echo $section_css . $button_container_css . $button_css . $heading_css . $grid_container_css . $grid_column_css;
	echo '</style>';
}

function generate_get_block_defaults( $block ) {
	if ( ! $block ) {
		return false;
	}

	if ( 'section' === $block ) {
		$defaults = array(
			'outer_container' => 'full',
			'inner_container' => 'contained',
			'padding_top' => 10,
			'padding_right' => 10,
			'padding_bottom' => 10,
			'padding_left' => 10,
			'padding_top_mobile' => '',
			'padding_right_mobile' => '',
			'padding_bottom_mobile' => '',
			'padding_left_mobile' => '',
			'background_color' => '',
			'text_color' => '',
			'link_color' => '',
			'link_color_hover' => '',
			'background_image' => '',
		);
	}

	if ( 'button-container' === $block ) {
		$defaults = array(
			'paddingTop' => false,
			'paddingRight' => false,
			'paddingBottom' => 25,
			'paddingLeft' => false,
			'paddingTopMobile' => false,
			'paddingRightMobile' => false,
			'paddingBottomMobile' => false,
			'paddingLeftMobile' => false,
		);
	}

	if ( 'button' === $block ) {
		$defaults = array(
			'backgroundColor' => '#0366d6',
			'textColor' => '#ffffff',
			'backgroundColorHover' => '#222222',
			'textColorHover' => '#ffffff',
			'borderRadius' => 2,
			'fontSize' => false,
			'gap' => 25,
			'borderSize' => 0,
			'borderColor' => false,
			'borderColorHover' => false,
		);
	}

	if ( 'grid-container' === $block ) {
		$defaults = array(
			'gap' => 30,
		);
	}

	if ( 'grid-column' === $block ) {
		$defaults = array(
			'width' => 50,
			'mobileWidth' => 100,
		);
	}

	if ( 'heading' === $block ) {
		$defaults = array(
			'align' => false,
			'color' => false,
			'size' => false,
		);
	}

	return apply_filters( 'generate_block_defaults', $defaults, $block );
}
