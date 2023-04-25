<?php

namespace GenerateBlocks\Tests\Unit;
use \GenerateBlocks\Tests\GBTestCase;

final class LegacyAttributesTest extends GBTestCase {
	public function testOldPaddingDefaults() {
		$css = new \GenerateBlocks_Dynamic_CSS();

		$defaults = [
			'paddingTop' => '',
			'paddingRight' => '',
			'paddingBottom' => '',
			'paddingLeft' => '',
			'iconPaddingRight' => '',
		];

		$attributes = [
			'blockVersion' => 1,
		];

		$settings = wp_parse_args(
			$attributes,
			$defaults
		);

		if ( $attributes['blockVersion'] < 2 ) {
			$settings = \GenerateBlocks_Legacy_Attributes::get_settings( '1.4.0', 'container', $settings, $attributes );
		}

		if ( $attributes['blockVersion'] < 4 ) {
			$settings = \GenerateBlocks_Legacy_Attributes::get_settings( '1.8.0', 'button', $settings, $attributes );
		}

		$actual = [
			$settings['paddingTop'],
			$settings['paddingRight'],
			$settings['paddingBottom'],
			$settings['paddingLeft'],
			$settings['iconPaddingRight'],
		];

		$expected = [
			'40',
			'40',
			'40',
			'40',
			'0.5',
		];

		$this->assertEquals( $expected, $actual );
	}
}
