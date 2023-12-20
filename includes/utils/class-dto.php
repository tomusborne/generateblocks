<?php
/**
 * The data transfer object class file.
 *
 * @package GenerateBlocks\Utils
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * The GenerateBlocks Data Transfer Object class.
 *
 * @since 1.9.0
 */
class GenerateBlocks_DTO implements JsonSerializable {
	/**
	 * The data.
	 *
	 * @var array The DTO data.
	 */
	protected $data = array();

	/**
	 * Returns the data values if exists.
	 *
	 * @param string $name The called name.
	 *
	 * @return string|null
	 */
	public function __get( string $name ): ?string {
		return $this->data[ $name ] ?? null;
	}

	/**
	 * Set a value for the DTO data.
	 *
	 * @param string $key The name.
	 * @param mixed  $value The value.
	 *
	 * @return GenerateBlocks_DTO
	 */
	public function set( string $key, $value ): GenerateBlocks_DTO {
		if ( isset( $this->data[ $key ] ) ) {
			$this->data[ $key ] = $value;
		}

		return $this;
	}

	/**
	 * Serialize this class.
	 *
	 * @return array
	 */
	public function serialize(): array {
		$result = array();

		foreach ( $this->data as $key => $value ) {
			$k = generateblocks_to_camel_case( $key );
			$result[ $k ] = $value;
		}

		return $result;
	}

	/**
	 * Unserialize this class.
	 *
	 * @param array $data The data.
	 *
	 * @return void
	 */
	public function unserialize( array $data ): void {
		foreach ( $data as $key => $value ) {
			$k = generateblocks_to_snake_case( $key );
			$this->data[ $k ] = $value;
		}
	}

	/**
	 * JSON serialize function.
	 *
	 * @return array
	 */
	public function JsonSerialize(): array {
		return $this->serialize();
	}
}
