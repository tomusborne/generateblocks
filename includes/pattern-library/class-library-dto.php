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
 * Library data transfer object.
 *
 * @property string id The library id.
 * @property string name The library name.
 * @property string domain The library domain.
 * @property string public_key The library public key.
 * @property bool is_default The library is default.
 * @property bool is_local The library is local.
 * @property bool is_enabled The library is enabled.
 *
 * @since 1.9
 */
class GenerateBlocks_Library_DTO extends GenerateBlocks_DTO {
	/**
	 * The data.
	 *
	 * @var array The library data.
	 */
	protected $data = array(
		'id' => '',
		'name' => '',
		'domain' => '',
		'public_key' => '',
		'is_enabled' => false,
		'is_default' => false,
		'is_local' => false,
	);

	/**
	 * Set the status for a library.
	 *
	 * @param boolean $newStatus The status to set.
	 */
	public function setStatus( $newStatus ) {
		$this->data['is_enabled'] = $newStatus;
	}
}
