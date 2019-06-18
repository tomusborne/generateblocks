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
 * Build our grid container CSS.
 *
 * @since 0.1
 *
 * @return string
 */
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

		$css->set_selector( '.gp-grid-wrapper-' . $id );
		$css->add_property( 'align-items', $settings['verticalAlignment'] );

		if ( $settings['horizontalGap'] ) {
			$css->add_property( 'margin-left', '-' . $settings['horizontalGap'] / 2 . 'px' );
			$css->add_property( 'margin-right', '-' . $settings['horizontalGap'] / 2 . 'px' );
		}


		$css->set_selector( '.gp-grid-wrapper-' . $id . ' > .gp-grid-column' );

		if ( $settings['horizontalGap'] ) {
			$css->add_property( 'box-sizing', 'border-box' );
			$css->add_property( 'padding-left', $settings['horizontalGap'] / 2, 'px' );
			$css->add_property( 'padding-right', $settings['horizontalGap'] / 2, 'px' );
		}

		$css->add_property( 'padding-bottom', $settings['verticalGap'], 'px' );
	}

	return $css->css_output();
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

	$css = new GeneratePress_Blocks_Dynamic_CSS;

	foreach ( $data as $atts ) {
		if ( ! isset( $atts['uniqueId'] ) ) {
			continue;
		}

		$settings = wp_parse_args(
			$atts,
			generate_get_block_defaults( 'section' )
		);

		$id = absint( $atts['uniqueId'] );

		// Open main container element.
		$css->set_selector( '.generate-section.section-' . $id );

		if ( 'contained' === $settings['outerContainer'] ) {
			$css->add_property( 'max-width', absint( $settings['containerWidth'] ), 'px' );
			$css->add_property( 'margin-left', 'auto' );
			$css->add_property( 'margin-right', 'auto' );
		}

		$css->add_property( 'background-color', $settings['backgroundColor'] );
		$css->add_property( 'color', $settings['textColor'] );

		if ( $settings['bgImage'] ) {
			$url = $settings['bgImage']['image']['url'];

			if ( $settings['backgroundColor'] && isset( $settings['bgOptions']['overlay'] ) && $settings['bgOptions']['overlay'] ) {
				$css->add_property( 'background-image', 'linear-gradient(0deg, ' . $settings['backgroundColor'] . ', ' . $settings['backgroundColor'] . '), url(' . esc_url( $url ) . ')' );
			} else {
				$css->add_property( 'background-image', 'url(' . esc_url( $url ) . ')' );
			}

			$css->add_property( 'background-repeat', $settings['bgOptions']['repeat'] );
			$css->add_property( 'background-position', $settings['bgOptions']['position'] );
			$css->add_property( 'background-size', $settings['bgOptions']['size'] );
			$css->add_property( 'background-attachment', $settings['bgOptions']['attachment'] );
		}

		$css->add_property( 'margin-top', $settings['marginTop'], 'px' );
		$css->add_property( 'margin-right', $settings['marginRight'], 'px' );
		$css->add_property( 'margin-bottom', $settings['marginBottom'], 'px' );
		$css->add_property( 'margin-left', $settings['marginLeft'], 'px' );

		if ( $settings['zindex'] ) {
			$css->add_property( 'position', 'relative' );
			$css->add_property( 'z-index', $settings['zindex'] );
		}

		$css->set_selector( '.generate-section.section-' . $id . ' .inside-section' );

		if ( 'contained' === $settings['innerContainer'] ) {
			$css->add_property( 'max-width', absint( $settings['containerWidth'] ), 'px' );
			$css->add_property( 'margin-left', 'auto' );
			$css->add_property( 'margin-right', 'auto' );
		}

		$css->set_selector( '.generate-section.section-' . $id . ' > .inside-section' );

		$css->add_property( 'padding-top', $settings['paddingTop'], 'px' );
		$css->add_property( 'padding-right', $settings['paddingRight'], 'px' );
		$css->add_property( 'padding-bottom', $settings['paddingBottom'], 'px' );
		$css->add_property( 'padding-left', $settings['paddingLeft'], 'px' );

		$css->set_selector( '.generate-section.section-' . $id . ' a, .generate-section.section-' . $id . ' a:visited' );
		$css->add_property( 'color', $settings['linkColor'] );

		$css->set_selector( '.generate-section.section-' . $id . ' a:hover' );
		$css->add_property( 'color', $settings['linkColorHover'] );

		$css->set_selector( '.gp-grid-wrapper > .grid-column-' . $id );
		$css->add_property( 'width', $settings['width'], '%' );
		$css->add_property( 'align-self', $settings['verticalAlignment'] );

		$css->start_media_query( apply_filters( 'generate_mobile_media_query', '(max-width:768px)' ) );
			$css->set_selector( '.generate-section.section-' . $id );

			$css->add_property( 'margin-top', $settings['marginTopMobile'], 'px' );
			$css->add_property( 'margin-right', $settings['marginRightMobile'], 'px' );
			$css->add_property( 'margin-bottom', $settings['marginBottomMobile'], 'px' );
			$css->add_property( 'margin-left', $settings['marginLeftMobile'], 'px' );

			$css->set_selector( '.generate-section.section-' . $id . ' > .inside-section' );

			$css->add_property( 'padding-top', $settings['paddingTopMobile'], 'px' );
			$css->add_property( 'padding-right', $settings['paddingRightMobile'], 'px' );
			$css->add_property( 'padding-bottom', $settings['paddingBottomMobile'], 'px' );
			$css->add_property( 'padding-left', $settings['paddingLeftMobile'], 'px' );

			$css->set_selector( '.gp-grid-wrapper > .grid-column-' . $id );
			$css->add_property( 'width', $settings['mobileWidth'], '%' );
		$css->stop_media_query();
	}

	$css->set_selector( '.inside-section > *:last-child' );
	$css->add_property( 'margin-bottom', '0px' );

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

	echo '<style>';
		echo $section_css . $button_container_css . $button_css . $heading_css . $grid_container_css;
	echo '</style>';
}

/**
 * Set our block defaults.
 *
 * @since 0.1
 *
 * @param string $block The name of our block.
 * @return array
 */
function generate_get_block_defaults( $block ) {
	if ( ! $block ) {
		return false;
	}

	if ( 'section' === $block ) {
		$defaults = array(
			'containerWidth' => 1100,
			'outerContainer' => 'full',
			'innerContainer' => 'contained',
			'paddingTop' => 10,
			'paddingRight' => 10,
			'paddingBottom' => 10,
			'paddingLeft' => 10,
			'paddingTopMobile' => '',
			'paddingRightMobile' => '',
			'paddingBottomMobile' => '',
			'paddingLeftMobile' => '',
			'marginTop' => '',
			'marginRight' => '',
			'marginBottom' => '',
			'marginLeft' => '',
			'marginTopMobile' => '',
			'marginRightMobile' => '',
			'marginBottomMobile' => '',
			'marginLeftMobile' => '',
			'backgroundColor' => '',
			'textColor' => '',
			'linkColor' => '',
			'linkColorHover' => '',
			'bgImage' => '',
			'bgOptions' => array(
				'position' => 'center center',
				'size' => 'cover',
				'repeat' => 'no-repeat',
				'attachment' => '',
			),
			'width' => 50,
			'mobileWidth' => 100,
			'verticalAlignment' => '',
			'zindex' => '',
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
			'horizontalGap' => 30,
			'verticalGap' => 30,
			'verticalAlignment' => '',
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
