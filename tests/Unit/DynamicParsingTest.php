<?php

namespace GenerateBlocks\Tests\Unit;
use \GenerateBlocks\Tests\GBTestCase;

final class DynamicParsingTest extends GBTestCase {
	private static $tags = [
		'post_title' => [
			'name' => 'post_title',
			'description' => 'Post title',
		],
		'term_list' => [
			'name' => 'term_list',
			'description' => 'Term list',
		],
	];

	public function testSimpleParsing() {
		$expected = [
			'tag_name' => 'post_title',
		];
		$parsed = \GenerateBlocks_Register_Dynamic_Tag::parse_options(
			'',
			'post_title'
		);
		$this->assertEquals( $expected, $parsed );
	}

	public function testParsing() {
		$expected = [
			'tag_name' => 'post_title',
			'id' => '23',
		];
		$parsed = \GenerateBlocks_Register_Dynamic_Tag::parse_options(
			'id:23',
			'post_title'
		);
		$this->assertEquals( $expected, $parsed );
	}

	public function testParsingWithMultipleOptions() {
		$expected = [
			'tag_name'   => 'post_title',
			'id'         => '23',
			'dateFormat' => 'Y-m-d',
		];
		$parsed = \GenerateBlocks_Register_Dynamic_Tag::parse_options(
			'id:23|dateFormat:Y-m-d',
			'post_title'
		);
		$this->assertEquals( $expected, $parsed );
	}

	public function testWithEscapedBars() {
		$expected = [
			'tag_name' => 'post_title',
			'sep'      => '|',
		];
		$parsed = \GenerateBlocks_Register_Dynamic_Tag::parse_options(
			'sep:\|',
			'post_title'
		);
		$this->assertEquals( $expected, $parsed );
	}

	public function testWithEscapedColons() {
		$expected = [
			'tag_name' => 'post_title',
			'format'   => 'Y:m:d',
		];
		$parsed = \GenerateBlocks_Register_Dynamic_Tag::parse_options(
			'format:Y\:m\:d',
			'post_title'
		);
		$this->assertEquals( $expected, $parsed );
	}

	public function testMatchFindingOne() {
		$content = '<p class="gb-text">{{term_list id:432|link:term|tax:category|sep: | }}</p>';
		$matches = \GenerateBlocks_Register_Dynamic_Tag::find_matches( $content, self::$tags );

		$this->assertEquals(
			[
				[
					0 => '{{term_list id:432|link:term|tax:category|sep: | }}',
					1 => 'term_list',
					2 => ' id:432|link:term|tax:category|sep: | ',
				],
			],
			$matches
		);
	}

	public function testMatchFindingMultiple() {
		$content = '<p class="gb-text">{{term_list id:432|link:term|tax:category|sep: | }} and {{post_title}}</p>';
		$matches = \GenerateBlocks_Register_Dynamic_Tag::find_matches( $content, self::$tags );
		$this->assertEquals(
			[
				[
					0 => '{{term_list id:432|link:term|tax:category|sep: | }}',
					1 => 'term_list',
					2 => ' id:432|link:term|tax:category|sep: | ',
				],
				[
					0 => '{{post_title}}',
					1 => 'post_title',
				],
			],
			$matches
		);
	}
}
