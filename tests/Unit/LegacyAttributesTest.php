<?php

namespace GenerateBlocks\Tests\Unit;
use \GenerateBlocks\Tests\GBTestCase;

final class LegacyAttributesTest extends GBTestCase {
	public function testOldButtonDefaults() {
		$css = new \GenerateBlocks_Dynamic_CSS();

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

		if ( $attributes['blockVersion'] < 4 ) {
			$settings = \GenerateBlocks_Legacy_Attributes::get_settings( '1.8.0', 'button', $settings, $attributes );
		}

		$actual = [
			'gradientDirection' => $settings['gradientDirection'],
			'gradientColorOne' => $settings['gradientColorOne'],
			'gradientColorOneOpacity' => $settings['gradientColorOneOpacity'],
			'gradientColorTwo' => $settings['gradientColorTwo'],
			'gradientColorTwoOpacity' => $settings['gradientColorTwoOpacity'],
			'iconPaddingRight' => $settings['iconPaddingRight' ],
		];

		$expected = [
			'gradientDirection' => 90,
			'gradientColorOne' => '#ffffff',
			'gradientColorOneOpacity' => 0.1,
			'gradientColorTwo' => '#000000',
			'gradientColorTwoOpacity' => 0.3,
			'iconPaddingRight' => '0.5',
		];

		$this->assertEquals( $expected, $actual );
	}

	public function testOldContainerDefaults() {
		$css = new \GenerateBlocks_Dynamic_CSS();

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
		$css = new \GenerateBlocks_Dynamic_CSS();

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

	public function testOldHeadlineDefaults() {
		$css = new \GenerateBlocks_Dynamic_CSS();

		$defaults = generateblocks_get_block_defaults();

		$attributes = [
			'blockVersion' => 1,
		];

		$settings = wp_parse_args(
			$attributes,
			$defaults['headline']
		);

		if ( $attributes['blockVersion'] < 3 ) {
			$settings = \GenerateBlocks_Legacy_Attributes::get_settings( '1.8.0', 'headline', $settings, $attributes );
		}

		$actual = [
			'iconPaddingRight' => $settings['iconPaddingRight'],
		];

		$expected = [
			'iconPaddingRight' => '0.5',
		];

		$this->assertEquals( $expected, $actual );
	}
}
