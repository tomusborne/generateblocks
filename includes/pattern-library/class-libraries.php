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

	/**
	 * Get our cached library data by collection.
	 *
	 * @param string $cache_key The key to look up.
	 * @param array  $query_args Args to filter the results with.
	 * @param string $collection The collection to check.
	 */
	public static function get_cached_data( $cache_key = '', $query_args = [], $collection = '' ) {
		if ( ! $cache_key ) {
			return [];
		}

		if ( 'patterns' !== $collection ) {
			return get_transient( $cache_key );
		}

		$cached_data = [];
		$has_cache = false;
		$index = 0;

		while ( true ) {
			$option_key = $cache_key . '_' . $index;
			$chunk = get_transient( $option_key );

			if ( false === $chunk ) {
				// No more chunks found, exit the loop.
				break;
			}

			// Merge the chunk into the cached data.
			$cached_data += $chunk;
			$has_cache = true;

			// Increment the index for the next iteration.
			$index++;
		}

		// If we have no cache, return false.
		// This allows empty arrays to be cached.
		if ( ! $has_cache ) {
			return false;
		}

		if ( ! empty( $query_args['categoryId'] ) ) {
			$cached_data = array_filter(
				$cached_data,
				function( $data ) use ( $query_args ) {
					return in_array( $query_args['categoryId'], $data['categories'] );
				}
			);
		}

		if ( ! empty( $query_args['search'] ) ) {
			$cached_data = array_filter(
				$cached_data,
				function( $data ) use ( $query_args ) {
					foreach ( $data as $key => $value ) {
						if ( is_string( $value ) && stripos( $value, $query_args['search'] ) !== false ) {
							return true;
						}

						continue;
					}

					return false;
				}
			);
		}

		$cached_data = array_values( $cached_data );
		return $cached_data;
	}

	/**
	 * Set the collection cache expiry.
	 */
	public static function get_cache_expiry() {
		return 86400;
	}

	/**
	 * Set our cached data. This function will split our patterns into chunks.
	 *
	 * @param array  $data The data to cache.
	 * @param string $cache_key The key to set.
	 * @param string $collection The collection to check.
	 */
	public static function set_cached_data( $data = [], $cache_key = '', $collection = '' ) {
		if ( ! $cache_key ) {
			return;
		}

		$expiration = self::get_cache_expiry();

		if ( 'patterns' === $collection ) {
			if ( ! empty( $data ) ) {
				$chunks = array_chunk( $data, 20, true );

				foreach ( $chunks as $index => $chunk ) {
					$option_key = $cache_key . '_' . $index;
					set_transient( $option_key, $chunk, $expiration );
				}
			} else {
				set_transient( $cache_key . '_0', $data, $expiration );
			}
		} else {
			set_transient( $cache_key, $data, $expiration );
		}
	}
}
