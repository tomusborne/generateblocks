<?php

namespace GenerateBlocks\Tests\Unit;
use \GenerateBlocks\Tests\GBTestCase;

final class LegacyAttributesTest extends GBTestCase {
	public function testOldButtonDefaults() {
		$defaults = generateblocks_get_block_defaults();

		$attributes = [
			'blockVersion' => 1,
		];

		$settings = wp_parse_args(
			$attributes,
			$defaults['button']
		);

		if ( $attributes['blockVersion'] < 2 ) {
			$settings = \GenerateBlocks_Legacy_Attributes::get_settings( '1.4.0', 'button', $settings, $attributes );
		}

		$actual = [
			'gradientDirection' => $settings['gradientDirection'],
			'gradientColorOne' => $settings['gradientColorOne'],
			'gradientColorOneOpacity' => $settings['gradientColorOneOpacity'],
			'gradientColorTwo' => $settings['gradientColorTwo'],
			'gradientColorTwoOpacity' => $settings['gradientColorTwoOpacity'],
		];

		$expected = [
			'gradientDirection' => 90,
			'gradientColorOne' => '#ffffff',
			'gradientColorOneOpacity' => 0.1,
			'gradientColorTwo' => '#000000',
			'gradientColorTwoOpacity' => 0.3,
		];

		$this->assertEquals( $expected, $actual );
	}

	public function testOldContainerDefaults() {
		$defaults = generateblocks_get_block_defaults();

		$attributes = [
			'blockVersion' => 1,
		];

		$settings = wp_parse_args(
			$attributes,
			$defaults['container']
		);

		if ( $attributes['blockVersion'] < 2 ) {
			$settings = \GenerateBlocks_Legacy_Attributes::get_settings( '1.4.0', 'container', $settings, $attributes );
		}

		$actual = [
			'paddingTop' => $settings['paddingTop'],
			'paddingRight' => $settings['paddingRight'],
			'paddingBottom' => $settings['paddingBottom'],
			'paddingLeft' => $settings['paddingLeft'],
			'width' => $settings['width'],
			'widthMobile' => $settings['widthMobile'],
			'gradientDirection' => $settings['gradientDirection'],
			'gradientColorOne' => $settings['gradientColorOne'],
			'gradientColorOneOpacity' => $settings['gradientColorOneOpacity'],
			'gradientColorTwo' => $settings['gradientColorTwo'],
			'gradientColorTwoOpacity' => $settings['gradientColorTwoOpacity'],
		];

		$expected = [
			'paddingTop' => '40',
			'paddingRight' => '40',
			'paddingBottom' => '40',
			'paddingLeft' => '40',
			'width' => 50,
			'widthMobile' => 100,
			'gradientDirection' => 90,
			'gradientColorOne' => '#ffffff',
			'gradientColorOneOpacity' => 0.1,
			'gradientColorTwo' => '#000000',
			'gradientColorTwoOpacity' => 0.3,
		];

		$this->assertEquals( $expected, $actual );
	}

	public function testOldGridDefaults() {
		$defaults = generateblocks_get_block_defaults();

		$attributes = [
			'blockVersion' => 1,
		];

		$settings = wp_parse_args(
			$attributes,
			$defaults['gridContainer']
		);

		if ( $attributes['blockVersion'] < 2 ) {
			$settings = \GenerateBlocks_Legacy_Attributes::get_settings( '1.4.0', 'grid', $settings, $attributes );
		}

		$actual = [
			'horizontalGap' => $settings['horizontalGap'],
		];

		$expected = [
			'horizontalGap' => 30,
		];

		$this->assertEquals( $expected, $actual );
	}
}
