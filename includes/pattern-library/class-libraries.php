<?php
/**
 * The Libraries class file.
 *
 * @package GenerateBlocks\Pattern_Library
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class for handling with libraries.
 *
 * @since 1.9.0
 */
class GenerateBlocks_Libraries extends GenerateBlocks_Singleton {

	/**
	 * The default id.
	 *
	 * @var string The default library id.
	 */
	protected $default_library_id = 'gb_default_free_library';

	/**
	 * Returns all the registered libraries.
	 *
	 * @param bool $enabled_only Filter disabled libraries.
	 *
	 * @return array
	 */
	public function get_all( bool $enabled_only = true ): array {
		$libraries = get_option( 'generateblocks_pattern_libraries', array() );
		$libraries = apply_filters( 'generateblocks_default_pattern_libraries', $libraries );

		// Force to always have a default library registered.
		if ( ! self::exists( $libraries, $this->default_library_id ) ) {
			$default_library = self::get_default();
			$libraries = array_merge( array( $default_library ), $libraries );
		}

		return array_filter(
			$libraries,
			function( GenerateBlocks_Library_DTO $library ) use ( $enabled_only ) {
				if ( $enabled_only ) {
					return $library->is_enabled;
				}

				return true;
			}
		);
	}

	/**
	 * Returns a single library by id.
	 *
	 * @param string $id The id.
	 *
	 * @return GenerateBlocks_Library_DTO|null
	 */
	public function get_one( string $id ): ?GenerateBlocks_Library_DTO {
		$libraries = self::get_all( false );

		return array_reduce(
			$libraries,
			function( $result, GenerateBlocks_Library_DTO $library ) use ( $id ) {
				if ( $id === $library->id ) {
					return $library;
				}

				return $result;
			},
			null
		);
	}

	/**
	 * Creates a library from array.
	 *
	 * @param array $data The library in array format.
	 *
	 * @return GenerateBlocks_Library_DTO
	 */
	public function create( array $data ): GenerateBlocks_Library_DTO {
		return ( new GenerateBlocks_Library_DTO() )
			->set( 'id', $data['id'] )
			->set( 'name', $data['name'] )
			->set( 'domain', $data['domain'] )
			->set( 'public_key', $data['publicKey'] )
			->set( 'is_enabled', $data['isEnabled'] )
			->set( 'is_default', $data['isDefault'] )
			->set( 'is_local', $data['isLocal'] );
	}

	/**
	 * Return the default library.
	 *
	 * @return GenerateBlocks_Library_DTO
	 */
	protected function get_default(): GenerateBlocks_Library_DTO {
		return ( new GenerateBlocks_Library_DTO() )
			->set( 'id', $this->default_library_id )
			->set( 'name', __( 'Free', 'generateblocks' ) )
			->set( 'domain', 'https://patterns.generateblocks.com' )
			->set( 'public_key', 'GxroZpidKoLZ2ofWNJdXtanAK9ZozWKo' )
			->set( 'is_enabled', true )
			->set( 'is_default', true );
	}

	/**
	 * Checks if exists the library.
	 *
	 * @param array  $libraries Array of libraries.
	 * @param string $id The library id.
	 *
	 * @return bool
	 */
	public function exists( array $libraries, string $id ): bool {
		return array_reduce(
			$libraries,
			function( $result, GenerateBlocks_Library_DTO $library ) use ( $id ) {
				if ( $id === $library->id ) {
					return true;
				}

				return $result;
			},
			false
		);
	}
}
