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
function flex_get_block_defaults() {
	$defaults = array();

	$container_width = 1100;

	if ( function_exists( 'generate_get_option' ) ) {
		$container_width = generate_get_option( 'container_width' );
	}

	$defaults['section'] = array(
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
		'paddingTop' => false,
		'paddingRight' => false,
		'paddingBottom' => 25,
		'paddingLeft' => false,
		'paddingTopMobile' => false,
		'paddingRightMobile' => false,
		'paddingBottomMobile' => false,
		'paddingLeftMobile' => false,
	);

	$defaults['button'] = array(
		'backgroundColor' => '#0366d6',
		'textColor' => '#ffffff',
		'backgroundColorHover' => '#222222',
		'textColorHover' => '#ffffff',
		'fontSize' => false,
		'textTransform' => '',
		'gap' => 25,
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
	);

	$defaults['headline'] = array(
		'element' => 'p',
		'align' => false,
		'color' => false,
		'fontFamily' => '',
		'googleFont' => false,
		'fontWeight' => '',
		'size' => false,
		'textTransform' => '',
		'lineHeight' => '',
		'letterSpacing' => '',
		'marginTop' => '',
		'marginBottom' => '25',
	);

	return apply_filters( 'flex_block_defaults', $defaults );
}
