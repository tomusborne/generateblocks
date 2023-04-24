<?php

use Mockery\Adapter\Phpunit\MockeryPHPUnitIntegration;
use PHPUnit\Framework\TestCase;
use Brain\Monkey;

final class Dynamic_CSS_Test extends TestCase {

	use MockeryPHPUnitIntegration;

	protected function setUp(): void {
		parent::setUp();
		Monkey\setUp();
	}

	protected function tearDown(): void {
		Monkey\tearDown();
		parent::tearDown();
	}

	public function testOutputCss() {
		$css = new GenerateBlocks_Dynamic_CSS();
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
		$css = new GenerateBlocks_Dynamic_CSS();
		$css->set_selector( '.test-class' );
		$css->add_property( 'padding', [ '10', '20', '30', '40' ], 'px' );
		$css->add_property( 'margin', [ '10', '0', '10', '0' ], 'px' );

		$actual = $css->css_output();
		$expected_css = 'padding:10px 20px 30px 40px;margin:10px 0;';

		$this->assertArrayHasKey( '.test-class', $actual );
		$this->assertEquals( $expected_css, $actual['.test-class'][0] );
	}

	public function testLonghandValues() {
		$css = new GenerateBlocks_Dynamic_CSS();
		$css->set_selector( '.test-class' );
		$css->add_property( 'padding', [ '10', '', '30', '40' ], 'px' );

		$actual = $css->css_output();
		$expected_css = 'padding-top:10px;padding-bottom:30px;padding-left:40px;';

		$this->assertArrayHasKey( '.test-class', $actual );
		$this->assertEquals( $expected_css, $actual['.test-class'][0] );
	}

	public function testSelector() {
		$css = new GenerateBlocks_Dynamic_CSS();
		$selector = generateblocks_get_css_selector( 'container', [ 'uniqueId' => '72478d91' ] );
		$css->set_selector( $selector );
		$css->add_property( 'background', '#000' );
		$actual = $css->css_output();
		$this->assertArrayHasKey( '.gb-container-72478d91', $actual );
	}
}
