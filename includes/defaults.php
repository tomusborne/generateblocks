<?php
/**
 * Set our block attribute defaults.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Set our block defaults.
 *
 * @since 0.1
 *
 * @return array
 */
function generateblocks_get_block_defaults() {
	$use_cache = apply_filters( 'generateblocks_use_block_defaults_cache', false );

	if ( $use_cache ) {
		$cached_data = wp_cache_get(
			'generateblocks_defaults_cache',
			'generateblocks_cache_group'
		);

		if ( $cached_data ) {
			return $cached_data;
		}
	}

	$defaults = apply_filters(
		'generateblocks_defaults',
		[
			'container' => generateblocks_with_global_defaults( GenerateBlocks_Block_Container::defaults() ),
			'buttonContainer' => generateblocks_with_global_defaults( GenerateBlocks_Block_Button_Container::defaults() ),
			'button' => generateblocks_with_global_defaults( GenerateBlocks_Block_Button::defaults() ),
			'gridContainer' => generateblocks_with_global_defaults( GenerateBlocks_Block_Grid::defaults() ),
			'headline' => generateblocks_with_global_defaults( GenerateBlocks_Block_Headline::defaults() ),
			'image' => generateblocks_with_global_defaults( GenerateBlocks_Block_Image::defaults() ),
		]
	);

	if ( $use_cache ) {
		wp_cache_set(
			'generateblocks_defaults_cache',
			$defaults,
			'generateblocks_cache_group'
		);
	}

	return $defaults;
}

/**
 * Get defaults for our general options.
 *
 * @since 0.1
 */
function generateblocks_get_option_defaults() {
	return apply_filters(
		'generateblocks_option_defaults',
		array(
			'container_width' => 1100,
			'css_print_method' => 'file',
			'sync_responsive_previews' => true,
			'disable_google_fonts' => false,
		)
	);
}

/**
 * Styles to use in the editor/font-end when needed.
 *
 * @since 1.0
 */
function generateblocks_get_default_styles() {
	$defaults = generateblocks_get_block_defaults();

	$defaultBlockStyles = array(
		'button' => array(
			'backgroundColor' => $defaults['button']['backgroundColor'] ? $defaults['button']['backgroundColor'] : '#0366d6',
			'textColor' => $defaults['button']['textColor'] ? $defaults['button']['textColor'] : '#ffffff',
			'backgroundColorHover' => $defaults['button']['backgroundColorHover'] ? $defaults['button']['backgroundColorHover'] : '#222222',
			'textColorHover' => $defaults['button']['textColorHover'] ? $defaults['button']['textColorHover'] : '#ffffff',
			'spacing' => [
				'paddingTop' => $defaults['button']['paddingTop'] ? $defaults['button']['paddingTop'] : '15px',
				'paddingRight' => $defaults['button']['paddingRight'] ? $defaults['button']['paddingRight'] : '20px',
				'paddingBottom' => $defaults['button']['paddingBottom'] ? $defaults['button']['paddingBottom'] : '15px',
				'paddingLeft' => $defaults['button']['paddingLeft'] ? $defaults['button']['paddingLeft'] : '20px',
			],
			'display' => 'inline-flex',
		),
		'container' => array(
			'gridItemPaddingTop' => '',
			'gridItemPaddingRight' => '',
			'gridItemPaddingBottom' => '',
			'gridItemPaddingLeft' => '',
			'bgImageSize' => 'full',
			'shapeDividers' => array(
				'shape' => 'gb-waves-1',
				'location' => 'bottom',
				'height' => 200,
				'heightTablet' => '',
				'heightMobile' => '',
				'width' => 100,
				'widthTablet' => '',
				'widthMobile' => '',
				'flipHorizontally' => false,
				'zindex' => '',
				'color' => '#000000',
				'colorOpacity' => 1,
			),
		),
	);

	if ( function_exists( 'generate_get_default_fonts' ) ) {
		$font_settings = wp_parse_args(
			get_option( 'generate_settings', array() ),
			generate_get_default_fonts()
		);

		$defaultBlockStyles['headline'] = array(
			'p' => array(
				'marginBottom' => $font_settings['paragraph_margin'],
				'marginBottomTablet' => '',
				'marginBottomMobile' => '',
				'marginUnit' => 'em',
				'fontSize' => $font_settings['body_font_size'],
				'fontSizeTablet' => '',
				'fontSizeMobile' => '',
				'fontSizeUnit' => 'px',
			),
			'h1' => array(
				'marginBottom' => $font_settings['heading_1_margin_bottom'],
				'marginBottomTablet' => '',
				'marginBottomMobile' => '',
				'marginUnit' => 'px',
				'fontSize' => $font_settings['heading_1_font_size'],
				'fontSizeTablet' => '',
				'fontSizeMobile' => $font_settings['mobile_heading_1_font_size'],
				'fontSizeUnit' => 'px',
			),
			'h2' => array(
				'marginBottom' => $font_settings['heading_2_margin_bottom'],
				'marginBottomTablet' => '',
				'marginBottomMobile' => '',
				'marginUnit' => 'px',
				'fontSize' => $font_settings['heading_2_font_size'],
				'fontSizeTablet' => '',
				'fontSizeMobile' => $font_settings['mobile_heading_1_font_size'],
				'fontSizeUnit' => 'px',
			),
			'h3' => array(
				'marginBottom' => $font_settings['heading_3_margin_bottom'],
				'marginBottomTablet' => '',
				'marginBottomMobile' => '',
				'marginUnit' => 'px',
				'fontSize' => $font_settings['heading_3_font_size'],
				'fontSizeTablet' => '',
				'fontSizeMobile' => '',
				'fontSizeUnit' => 'px',
			),
			'h4' => array(
				'marginBottom' => '20',
				'marginBottomTablet' => '',
				'marginBottomMobile' => '',
				'marginUnit' => 'px',
				'fontSize' => '',
				'fontSizeTablet' => '',
				'fontSizeMobile' => '',
				'fontSizeUnit' => 'px',
			),
			'h5' => array(
				'marginBottom' => '20',
				'marginBottomTablet' => '',
				'marginBottomMobile' => '',
				'marginUnit' => 'px',
				'fontSize' => '',
				'fontSizeTablet' => '',
				'fontSizeMobile' => '',
				'fontSizeUnit' => 'px',
			),
			'h6' => array(
				'marginBottom' => '20',
				'marginBottomTablet' => '',
				'marginBottomMobile' => '',
				'marginUnit' => 'px',
				'fontSize' => '',
				'fontSizeTablet' => '',
				'fontSizeMobile' => '',
				'fontSizeUnit' => 'px',
			),
		);
	}

	return apply_filters( 'generateblocks_default_block_styles', $defaultBlockStyles );
}
