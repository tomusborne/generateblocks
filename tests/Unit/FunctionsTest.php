<?php

namespace GenerateBlocks\Tests\Unit;
use \GenerateBlocks\Tests\GBTestCase;

final class FunctionsTest extends GBTestCase {
	public function testToCamelCase() {
		$this->assertEquals( 'isLocal', generateblocks_to_camel_case('is_local') );
		$this->assertEquals( 'isDefault', generateblocks_to_camel_case('is_default') );
		$this->assertEquals( 'multiCasesWorks', generateblocks_to_camel_case('multi_cases_works') );
		$this->assertEquals( 'numbers1Something', generateblocks_to_camel_case('numbers_1_something') );
	}

	public function testToSnakeCase() {
		$this->assertEquals( 'is_local', generateblocks_to_snake_case('isLocal') );
		$this->assertEquals( 'is_default', generateblocks_to_snake_case('isDefault') );
		$this->assertEquals( 'multi_cases_works', generateblocks_to_snake_case('multiCasesWorks') );
		$this->assertEquals( 'numbers_1_something', generateblocks_to_snake_case('numbers1Something') );
	}
}
