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
	$defaults = array();

	$container_width = 1100;

	if ( function_exists( 'generate_get_option' ) ) {
		$container_width = generate_get_option( 'container_width' );
	}

	$defaults['container'] = array(
		'isGrid' => false,
		'containerWidth' => $container_width,
		'outerContainer' => 'full',
		'innerContainer' => 'contained',
		'minHeight' => false,
		'minHeightUnit' => 'px',
		'minHeightTablet' => false,
		'minHeightUnitTablet' => 'px',
		'minHeightMobile' => false,
		'minHeightUnitMobile' => 'px',
		'paddingTop' => 40,
		'paddingRight' => 40,
		'paddingBottom' => 40,
		'paddingLeft' => 40,
		'paddingUnit' => 'px',
		'paddingTopTablet' => '',
		'paddingRightTablet' => '',
		'paddingBottomTablet' => '',
		'paddingLeftTablet' => '',
		'paddingTopMobile' => '',
		'paddingRightMobile' => '',
		'paddingBottomMobile' => '',
		'paddingLeftMobile' => '',
		'marginTop' => '',
		'marginRight' => '',
		'marginBottom' => '',
		'marginLeft' => '',
		'marginUnit' => 'px',
		'marginTopTablet' => '',
		'marginRightTablet' => '',
		'marginBottomTablet' => '',
		'marginLeftTablet' => '',
		'marginTopMobile' => '',
		'marginRightMobile' => '',
		'marginBottomMobile' => '',
		'marginLeftMobile' => '',
		'borderSizeTop' => '',
		'borderSizeRight' => '',
		'borderSizeBottom' => '',
		'borderSizeLeft' => '',
		'borderSizeTopTablet' => '',
		'borderSizeRightTablet' => '',
		'borderSizeBottomTablet' => '',
		'borderSizeLeftTablet' => '',
		'borderSizeTopMobile' => '',
		'borderSizeRightMobile' => '',
		'borderSizeBottomMobile' => '',
		'borderSizeLeftMobile' => '',
		'borderRadiusTopRight' => '',
		'borderRadiusBottomRight' => '',
		'borderRadiusBottomLeft' => '',
		'borderRadiusTopLeft' => '',
		'borderRadiusUnit' => 'px',
		'borderRadiusTopRightTablet' => '',
		'borderRadiusBottomRightTablet' => '',
		'borderRadiusBottomLeftTablet' => '',
		'borderRadiusTopLeftTablet' => '',
		'borderRadiusTopRightMobile' => '',
		'borderRadiusBottomRightMobile' => '',
		'borderRadiusBottomLeftMobile' => '',
		'borderRadiusTopLeftMobile' => '',
		'borderColor' => '',
		'borderColorOpacity' => 1,
		'backgroundColor' => '',
		'backgroundColorOpacity' => 1,
		'gradient' => false,
		'gradientDirection' => 90,
		'gradientColorOne' => '#ffffff',
		'gradientColorOneOpacity' => 0.1,
		'gradientColorStopOne' => '',
		'gradientColorTwo' => '#000000',
		'gradientColorTwoOpacity' => 0.3,
		'gradientColorStopTwo' => '',
		'gradientOverlay' => false,
		'textColor' => '',
		'linkColor' => '',
		'linkColorHover' => '',
		'bgImage' => '',
		'bgOptions' => array(
			'selector' => 'element',
			'opacity' => 1,
			'overlay' => false,
			'position' => 'center center',
			'size' => 'cover',
			'repeat' => 'no-repeat',
			'attachment' => '',
		),
		'featuredImageBg' => false,
		'bgImageSize' => 'full',
		'width' => 50,
		'widthTablet' => '',
		'widthMobile' => 100,
		'verticalAlignment' => '',
		'verticalAlignmentTablet' => 'inherit',
		'verticalAlignmentMobile' => 'inherit',
		'zindex' => '',
		'removeVerticalGap' => false,
		'removeVerticalGapTablet' => false,
		'removeVerticalGapMobile' => false,
		'orderTablet' => false,
		'orderMobile' => false,
		'alignment' => '',
		'alignmentTablet' => '',
		'alignmentMobile' => '',
		'showAdvancedTypography' => false,
		'fontFamily' => '',
		'fontFamilyFallback' => '',
		'googleFont' => false,
		'googleFontVariants' => '',
		'fontWeight' => '',
		'fontSize' => '',
		'fontSizeTablet' => '',
		'fontSizeMobile' => '',
		'fontSizeUnit' => 'px',
		'textTransform' => '',
	);

	$defaults['buttonContainer'] = array(
		'alignment' => '',
		'alignmentTablet' => '',
		'alignmentMobile' => '',
		'marginTop' => '',
		'marginRight' => '',
		'marginBottom' => '',
		'marginLeft' => '',
		'marginTopTablet' => '',
		'marginRightTablet' => '',
		'marginBottomTablet' => '',
		'marginLeftTablet' => '',
		'marginTopMobile' => '',
		'marginRightMobile' => '',
		'marginBottomMobile' => '',
		'marginLeftMobile' => '',
		'marginUnit' => 'px',
		'stack' => false,
		'stackTablet' => false,
		'stackMobile' => false,
		'fillHorizontalSpace' => false,
		'fillHorizontalSpaceTablet' => false,
		'fillHorizontalSpaceMobile' => false,
	);

	$defaults['button'] = array(
		'backgroundColor' => false,
		'backgroundColorOpacity' => 1,
		'textColor' => false,
		'backgroundColorHover' => false,
		'backgroundColorHoverOpacity' => 1,
		'textColorHover' => false,
		'showAdvancedTypography' => false,
		'fontFamily' => '',
		'fontFamilyFallback' => '',
		'googleFont' => false,
		'googleFontVariants' => '',
		'fontWeight' => '',
		'fontSize' => false,
		'fontSizeTablet' => false,
		'fontSizeMobile' => false,
		'fontSizeUnit' => 'px',
		'textTransform' => '',
		'letterSpacing' => '',
		'letterSpacingTablet' => '',
		'letterSpacingMobile' => '',
		'marginTop' => '',
		'marginRight' => '',
		'marginBottom' => '',
		'marginLeft' => '',
		'marginTopTablet' => '',
		'marginRightTablet' => '',
		'marginBottomTablet' => '',
		'marginLeftTablet' => '',
		'marginTopMobile' => '',
		'marginRightMobile' => '',
		'marginBottomMobile' => '',
		'marginLeftMobile' => '',
		'marginUnit' => 'px',
		'paddingTop' => '',
		'paddingRight' => '',
		'paddingBottom' => '',
		'paddingLeft' => '',
		'paddingTopTablet' => '',
		'paddingRightTablet' => '',
		'paddingBottomTablet' => '',
		'paddingLeftTablet' => '',
		'paddingTopMobile' => '',
		'paddingRightMobile' => '',
		'paddingBottomMobile' => '',
		'paddingLeftMobile' => '',
		'paddingUnit' => 'px',
		'borderSizeTop' => '',
		'borderSizeRight' => '',
		'borderSizeBottom' => '',
		'borderSizeLeft' => '',
		'borderSizeTopTablet' => '',
		'borderSizeRightTablet' => '',
		'borderSizeBottomTablet' => '',
		'borderSizeLeftTablet' => '',
		'borderSizeTopMobile' => '',
		'borderSizeRightMobile' => '',
		'borderSizeBottomMobile' => '',
		'borderSizeLeftMobile' => '',
		'borderRadiusTopRight' => '',
		'borderRadiusBottomRight' => '',
		'borderRadiusBottomLeft' => '',
		'borderRadiusTopLeft' => '',
		'borderRadiusTopRightTablet' => '',
		'borderRadiusBottomRightTablet' => '',
		'borderRadiusBottomLeftTablet' => '',
		'borderRadiusTopLeftTablet' => '',
		'borderRadiusTopRightMobile' => '',
		'borderRadiusBottomRightMobile' => '',
		'borderRadiusBottomLeftMobile' => '',
		'borderRadiusTopLeftMobile' => '',
		'borderRadiusUnit' => 'px',
		'borderColor' => false,
		'borderColorOpacity' => 1,
		'borderColorHover' => false,
		'borderColorHoverOpacity' => 1,
		'icon' => '',
		'hasIcon' => false,
		'iconLocation' => 'left',
		'removeText' => false,
		'ariaLabel' => '',
		'gradient' => false,
		'gradientDirection' => 90,
		'gradientColorOne' => '#ffffff',
		'gradientColorOneOpacity' => 0.1,
		'gradientColorStopOne' => '',
		'gradientColorTwo' => '#000000',
		'gradientColorTwoOpacity' => 0.3,
		'gradientColorStopTwo' => '',
		'iconPaddingTop' => '',
		'iconPaddingRight' => '0.5',
		'iconPaddingBottom' => '',
		'iconPaddingLeft' => '',
		'iconPaddingTopTablet' => '',
		'iconPaddingRightTablet' => '',
		'iconPaddingBottomTablet' => '',
		'iconPaddingLeftTablet' => '',
		'iconPaddingTopMobile' => '',
		'iconPaddingRightMobile' => '',
		'iconPaddingBottomMobile' => '',
		'iconPaddingLeftMobile' => '',
		'iconPaddingUnit' => 'em',
		'iconSize' => 1,
		'iconSizeTablet' => '',
		'iconSizeMobile' => '',
		'iconSizeUnit' => 'em',
	);

	$defaults['gridContainer'] = array(
		'horizontalGap' => 30,
		'verticalGap' => '',
		'verticalAlignment' => '',
		'horizontalGapTablet' => '',
		'verticalGapTablet' => '',
		'verticalAlignmentTablet' => 'inherit',
		'horizontalGapMobile' => '',
		'verticalGapMobile' => '',
		'verticalAlignmentMobile' => 'inherit',
		'horizontalAlignment' => '',
		'horizontalAlignmentTablet' => '',
		'horizontalAlignmentMobile' => '',
	);

	$defaults['headline'] = array(
		'element' => 'h2',
		'cssClasses' => '',
		'alignment' => false,
		'alignmentTablet' => false,
		'alignmentMobile' => false,
		'backgroundColor' => false,
		'backgroundColorOpacity' => 1,
		'textColor' => false,
		'linkColor' => false,
		'linkColorHover' => false,
		'borderColor' => false,
		'borderColorOpacity' => 1,
		'highlightTextColor' => false,
		'showAdvancedTypography' => false,
		'fontFamily' => '',
		'fontFamilyFallback' => '',
		'googleFont' => false,
		'googleFontVariants' => '',
		'fontWeight' => '',
		'fontSize' => '',
		'fontSizeTablet' => '',
		'fontSizeMobile' => '',
		'fontSizeUnit' => 'px',
		'textTransform' => '',
		'lineHeight' => '',
		'lineHeightTablet' => '',
		'lineHeightMobile' => '',
		'lineHeightUnit' => 'em',
		'letterSpacing' => '',
		'letterSpacingTablet' => '',
		'letterSpacingMobile' => '',
		'marginTop' => '',
		'marginRight' => '',
		'marginBottom' => '',
		'marginLeft' => '',
		'marginTopTablet' => '',
		'marginRightTablet' => '',
		'marginBottomTablet' => '',
		'marginLeftTablet' => '',
		'marginTopMobile' => '',
		'marginRightMobile' => '',
		'marginBottomMobile' => '',
		'marginLeftMobile' => '',
		'marginUnit' => 'px',
		'paddingTop' => '',
		'paddingRight' => '',
		'paddingBottom' => '',
		'paddingLeft' => '',
		'paddingTopTablet' => '',
		'paddingRightTablet' => '',
		'paddingBottomTablet' => '',
		'paddingLeftTablet' => '',
		'paddingTopMobile' => '',
		'paddingRightMobile' => '',
		'paddingBottomMobile' => '',
		'paddingLeftMobile' => '',
		'paddingUnit' => 'px',
		'borderSizeTop' => '',
		'borderSizeRight' => '',
		'borderSizeBottom' => '',
		'borderSizeLeft' => '',
		'borderSizeTopTablet' => '',
		'borderSizeRightTablet' => '',
		'borderSizeBottomTablet' => '',
		'borderSizeLeftTablet' => '',
		'borderSizeTopMobile' => '',
		'borderSizeRightMobile' => '',
		'borderSizeBottomMobile' => '',
		'borderSizeLeftMobile' => '',
		'icon' => '',
		'hasIcon' => false,
		'iconColor' => false,
		'iconColorOpacity' => 1,
		'iconLocation' => 'inline',
		'iconLocationTablet' => '',
		'iconLocationMobile' => '',
		'iconVerticalAlignment' => 'center',
		'iconVerticalAlignmentTablet' => '',
		'iconVerticalAlignmentMobile' => '',
		'iconPaddingTop' => '',
		'iconPaddingRight' => '0.5',
		'iconPaddingBottom' => '',
		'iconPaddingLeft' => '',
		'iconPaddingTopTablet' => '',
		'iconPaddingRightTablet' => '',
		'iconPaddingBottomTablet' => '',
		'iconPaddingLeftTablet' => '',
		'iconPaddingTopMobile' => '',
		'iconPaddingRightMobile' => '',
		'iconPaddingBottomMobile' => '',
		'iconPaddingLeftMobile' => '',
		'iconPaddingUnit' => 'em',
		'iconSize' => 1,
		'iconSizeTablet' => '',
		'iconSizeMobile' => '',
		'iconSizeUnit' => 'em',
		'inlineWidth' => false,
		'inlineWidthTablet' => false,
		'inlineWidthMobile' => false,
		'removeText' => false,
		'ariaLabel' => '',
	);

	return apply_filters( 'generateblocks_defaults', $defaults );
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
			'css_print_method' => 'file',
			'color_component_display' => 'palette',
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
			'paddingTop' => $defaults['button']['paddingTop'] ? $defaults['button']['paddingTop'] : '15',
			'paddingRight' => $defaults['button']['paddingRight'] ? $defaults['button']['paddingRight'] : '20',
			'paddingBottom' => $defaults['button']['paddingBottom'] ? $defaults['button']['paddingBottom'] : '15',
			'paddingLeft' => $defaults['button']['paddingLeft'] ? $defaults['button']['paddingLeft'] : '20',
		),
		'container' => array(
			'gridItemPaddingTop' => '0',
			'gridItemPaddingRight' => '0',
			'gridItemPaddingBottom' => '0',
			'gridItemPaddingLeft' => '0',
			'bgImageSize' => 'full',
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
