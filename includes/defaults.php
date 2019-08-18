<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Set our block defaults.
 *
 * @since 0.1
 *
 * @param string $block The name of our block.
 * @return array
 */
function flexblocks_get_block_defaults() {
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
		'paddingTop' => 10,
		'paddingRight' => 10,
		'paddingBottom' => 10,
		'paddingLeft' => 10,
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
		'marginTopTablet' => '',
		'marginRightTablet' => '',
		'marginBottomTablet' => '',
		'marginLeftTablet' => '',
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
			'overlay' => false,
			'position' => 'center center',
			'size' => 'cover',
			'repeat' => 'no-repeat',
			'attachment' => '',
		),
		'width' => 50,
		'widthTablet' => '',
		'widthMobile' => 100,
		'verticalAlignment' => '',
		'verticalAlignmentTablet' => 'inherit',
		'verticalAlignmentMobile' => 'inherit',
		'zindex' => '',
	);

	$defaults['buttonContainer'] = array(
		'alignment'	=> '',
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
	);

	$defaults['button'] = array(
		'backgroundColor' => '#0366d6',
		'textColor' => '#ffffff',
		'backgroundColorHover' => '#222222',
		'textColorHover' => '#ffffff',
		'fontSize' => false,
		'textTransform' => '',
		'marginTop' => '',
		'marginRight' => 20,
		'marginBottom' => '',
		'marginLeft' => '',
		'paddingTop' => 10,
		'paddingRight' => 15,
		'paddingBottom' => 10,
		'paddingLeft' => 15,
		'borderSizeTop' => '',
		'borderSizeRight' => '',
		'borderSizeBottom' => '',
		'borderSizeLeft' => '',
		'borderRadiusTopRight' => '',
		'borderRadiusBottomRight' => '',
		'borderRadiusBottomLeft' => '',
		'borderRadiusTopLeft' => '',
		'borderColor' => '#0366d6',
		'borderColorHover' => '#222222',
	);

	$defaults['gridContainer'] = array(
		'columns' => 0,
		'horizontalGap' => 30,
		'verticalGap' => 30,
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
		'element' => 'p',
		'alignment' => false,
		'alignmentTablet' => false,
		'alignmentMobile' => false,
		'color' => false,
		'fontFamily' => '',
		'googleFont' => false,
		'fontWeight' => '',
		'fontSize' => false,
		'fontSizeTablet' => false,
		'fontSizeMobile' => false,
		'textTransform' => '',
		'lineHeight' => '',
		'lineHeightTablet' => '',
		'lineHeightMobile' => '',
		'letterSpacing' => '',
		'letterSpacingTablet' => '',
		'letterSpacingMobile' => '',
		'marginTop' => '',
		'marginTopTablet' => '',
		'marginTopMobile' => '',
		'marginBottom' => '25',
		'marginBottomTablet' => '',
		'marginBottomMobile' => '',
	);

	return apply_filters( 'flexblocks_defaults', $defaults );
}
