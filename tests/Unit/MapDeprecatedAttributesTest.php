<?php

namespace GenerateBlocks\Tests\Unit;
use \GenerateBlocks\Tests\GBTestCase;

final class MapDeprecatedAttributesTest extends GBTestCase {
	public function testOldSpacingAttributes() {
		$defaults = generateblocks_get_block_defaults();

		$attributes = [
			'paddingTop' => '10',
			'paddingRight' => '20',
			'paddingBottomMobile' => '30',
			'paddingUnit' => 'em',
			'marginBottom' => '20',
			'marginUnit' => 'px',
		];

		$settings = wp_parse_args(
			$attributes,
			$defaults['button']
		);

		$settings = \GenerateBlocks_Map_Deprecated_Attributes::map_attributes( $settings );

		$expected = [
			'paddingTop' => '10em',
			'paddingRight' => '20em',
			'paddingBottomMobile' => '30em',
			'marginBottom' => '20px',
		];

		$this->assertArrayHasKey( 'spacing', $settings );
		$this->assertEquals( $expected, $settings['spacing'] );
	}

	public function testOldBorderAttributes() {
		$defaults = generateblocks_get_block_defaults();

		$attributes = [
			'borderRadiusTopLeft' => '10',
			'borderRadiusBottomRightMobile' => '20',
			'borderRadiusUnit' => '%',
			'borderSizeRight' => '1',
			'borderColor' => '#ffffff',
			'borderSizeBottomMobile' => '2',
		];

		$settings = wp_parse_args(
			$attributes,
			$defaults['button']
		);

		$settings = \GenerateBlocks_Map_Deprecated_Attributes::map_attributes( $settings );

		$expected = [
			'borderTopLeftRadius' => '10%',
			'borderBottomRightRadiusMobile' => '20%',
			'borderRightWidth' => '1px',
			'borderRightStyle' => 'solid',
			'borderRightColor' => '#ffffff',
			'borderBottomWidthMobile' => '2px',
			'borderBottomStyleMobile' => 'solid',
			'borderBottomColor' => '#ffffff',
		];

		$this->assertArrayHasKey( 'borders', $settings );
		$this->assertEquals( $expected, $settings['borders'] );
	}
}
