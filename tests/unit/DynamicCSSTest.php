<?php

namespace GenerateBlocks\Tests\Unit;
use \GenerateBlocks\Tests\GBTestCase;

final class DynamicCSSTest extends GBTestCase {
	public function testOutputCss() {
		$css = new \GenerateBlocks_Dynamic_CSS();
		$css->set_selector( '.test-class' );
		$css->add_property( 'background', '#000' );
		$css->add_property( 'color', '#fff' );
		$css->add_property( 'padding', '10px 20px 30px 40px' );

		$actual = $css->css_output();
		$expected_css = 'background:#000;color:#fff;padding:10px 20px 30px 40px;';

		$this->assertArrayHasKey( '.test-class', $actual );
		$this->assertEquals( $expected_css, $actual['.test-class'][0] );
	}

	public function testShorthandValues() {
		$css = new \GenerateBlocks_Dynamic_CSS();
		$css->set_selector( '.test-class' );
		$css->add_property( 'padding', [ '10', '20', '30', '40' ], 'px' );
		$css->add_property( 'margin', [ '10', '0', '10', '0' ], 'px' );

		$actual = $css->css_output();
		$expected_css = 'padding:10px 20px 30px 40px;margin:10px 0;';

		$this->assertArrayHasKey( '.test-class', $actual );
		$this->assertEquals( $expected_css, $actual['.test-class'][0] );
	}

	public function testShorthandValuesWithUnits() {
		$css = new \GenerateBlocks_Dynamic_CSS();
		$css->set_selector( '.test-class' );
		$css->add_property( 'padding', [ '10px', '20em', '30px', '40ch' ], '%' );
		$css->add_property( 'margin', [ '10em', '0px', '10em', '0px' ] );

		$actual = $css->css_output();
		$expected_css = 'padding:10px 20em 30px 40ch;margin:10em 0;';

		$this->assertArrayHasKey( '.test-class', $actual );
		$this->assertEquals( $expected_css, $actual['.test-class'][0] );
	}

	public function testLonghandValues() {
		$css = new \GenerateBlocks_Dynamic_CSS();
		$css->set_selector( '.test-class' );
		$css->add_property( 'padding', [ '10', '', '30', '40' ], 'px' );

		$actual = $css->css_output();
		$expected_css = 'padding-top:10px;padding-bottom:30px;padding-left:40px;';

		$this->assertArrayHasKey( '.test-class', $actual );
		$this->assertEquals( $expected_css, $actual['.test-class'][0] );
	}

	public function testLonghandValuesWithUnits() {
		$css = new \GenerateBlocks_Dynamic_CSS();
		$css->set_selector( '.test-class' );
		$css->add_property( 'padding', [ '10px', '', '30px', '40em' ], '%' );

		$actual = $css->css_output();
		$expected_css = 'padding-top:10px;padding-bottom:30px;padding-left:40em;';

		$this->assertArrayHasKey( '.test-class', $actual );
		$this->assertEquals( $expected_css, $actual['.test-class'][0] );
	}

	public function testNumberValues() {
		$css = new \GenerateBlocks_Dynamic_CSS();
		$css->set_selector( '.test-class' );
		$css->add_property( 'font-size', '10px' );
		$css->add_property( 'letter-spacing', '1', 'px' );

		$actual = $css->css_output();
		$expected_css = 'font-size:10px;letter-spacing:1px;';

		$this->assertArrayHasKey( '.test-class', $actual );
		$this->assertEquals( $expected_css, $actual['.test-class'][0] );
	}

	public function testMappedAttributes() {
		$css = new \GenerateBlocks_Dynamic_CSS();
		$defaults = generateblocks_get_block_defaults();

		$attributes = [
			'paddingTop' => '20',
			'paddingRight' => '30',
			'paddingUnit' => 'px',
			'marginBottom' => '10',
			'marginRight' => 'auto',
			'marginLeft' => 'auto',
			'marginUnit' => 'em',
			'fontFamily' => 'Arial',
			'fontFamilyFallback' => 'sans-serif',
			'fontSize' => 12,
			'fontSizeUnit' => 'px',
			'borderSizeTop' => '1',
			'borderColor' => '#ffffff',
		];

		$settings = wp_parse_args(
			$attributes,
			$defaults['button']
		);

		$settings = \GenerateBlocks_Map_Deprecated_Attributes::map_attributes( $settings );

		$css->set_selector( '.test-padding' );
		generateblocks_add_spacing_css( $css, $settings );

		$css->set_selector( '.test-typography' );
		generateblocks_add_typography_css( $css, $settings );

		$css->set_selector( '.test-border' );
		generateblocks_add_border_css( $css, $settings );

		$actual = $css->css_output();
		$expected_padding_css = 'padding-top:20px;padding-right:30px;margin-right:auto;margin-bottom:10em;margin-left:auto;';

		$this->assertArrayHasKey( '.test-padding', $actual );
		$this->assertEquals( $expected_padding_css, $actual['.test-padding'][0] );

		$expected_typography_css = 'font-family:Arial, sans-serif;font-size:12px;';
		$this->assertArrayHasKey( '.test-typography', $actual );
		$this->assertEquals( $expected_typography_css, $actual['.test-typography'][0] );

		$expected_border_css = 'border-top:1px solid #ffffff;';
		$this->assertArrayHasKey( '.test-border', $actual );
		$this->assertEquals( $expected_border_css, $actual['.test-border'][0] );
	}

	public function testSelector() {
		$css = new \GenerateBlocks_Dynamic_CSS();
		$selector = generateblocks_get_css_selector( 'container', [ 'uniqueId' => '72478d91' ] );
		$css->set_selector( $selector );
		$css->add_property( 'background', '#000' );
		$actual = $css->css_output();
		$this->assertArrayHasKey( '.gb-container-72478d91', $actual );
	}

	public function testOuterContainerPadding() {
		$css = new \GenerateBlocks_Dynamic_CSS();
		$defaults = generateblocks_get_block_defaults();

		$attributes = [
			'useInnerContainer' => true,
			'spacing' => [
				'paddingTop' => '20px',
				'marginLeft' => 'auto',
				'marginRight' => 'auto',
			],
		];

		$settings = wp_parse_args(
			$attributes,
			$defaults['container']
		);

		$css->set_selector( '.test-padding' );
		generateblocks_add_spacing_css( $css, $settings );

		$actual = $css->css_output();
		$expected_padding_css = 'margin-right:auto;margin-left:auto;';
		$this->assertArrayHasKey( '.test-padding', $actual );
		$this->assertEquals( $expected_padding_css, $actual['.test-padding'][0] );
	}
}
