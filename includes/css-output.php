<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
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

		$defaults = generate_get_block_defaults();

		$settings = wp_parse_args(
			$atts,
			$defaults['grid-container']
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

		$defaults = generate_get_block_defaults();

		$settings = wp_parse_args(
			$atts,
			$defaults['section']
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

		$defaults = generate_get_block_defaults();

		$settings = wp_parse_args(
			$atts,
			$defaults['button-container']
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

		$defaults = generate_get_block_defaults();

		$settings = wp_parse_args(
			$atts,
			$defaults['button']
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
 * Get our Text block CSS.
 *
 * @since 0.1
 *
 * @return string
 */
function generate_get_text_css() {
	$data = generate_get_block_data( 'generatepress/text' );

	if ( empty( $data ) ) {
		return;
	}

	$css = new GeneratePress_Blocks_Dynamic_CSS;

	foreach ( $data as $atts ) {
		if ( ! isset( $atts['uniqueId'] ) ) {
			continue;
		}

		$defaults = generate_get_block_defaults();

		$settings = wp_parse_args(
			$atts,
			$defaults['text']
		);

		$id = absint( $atts['uniqueId'] );

		$css->set_selector( '.gp-text-' . $id );
		$css->add_property( 'text-align', $settings['align'] );
		$css->add_property( 'color', $settings['color'] );
		$css->add_property( 'font-size', $settings['size'], 'px' );
		$css->add_property( 'line-height', $settings['lineHeight'], 'em' );
		$css->add_property( 'letter-spacing', $settings['letterSpacing'], 'em' );
		$css->add_property( 'margin-top', $settings['marginTop'], 'px' );
		$css->add_property( 'margin-bottom', $settings['marginBottom'], 'px' );
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
	$heading_css = generate_get_text_css();
	$grid_container_css = generate_get_grid_container_css();

	echo '<style>';
		echo $section_css . $button_container_css . $button_css . $heading_css . $grid_container_css;
	echo '</style>';
}
