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
function generate_get_block_defaults() {
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
		'borderRadius' => 2,
		'fontSize' => false,
		'gap' => 25,
		'borderSize' => 0,
		'borderColor' => '#0366d6',
		'borderColorHover' => false,
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
		'size' => false,
		'lineHeight' => '',
		'letterSpacing' => '',
		'marginTop' => '',
		'marginBottom' => '25',
	);

	return apply_filters( 'generate_block_defaults', $defaults );
}
