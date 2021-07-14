<?php
/**
 * Handles legacy defaults that have been changed.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Get old defaults that have been changed.
 */
class GenerateBlocks_Legacy_Defaults {
	/**
	 * Class instance.
	 *
	 * @access private
	 * @var $instance Class instance.
	 */
	private static $instance;

	/**
	 * Initiator
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Defaults that have changed in 1.4.0.
	 */
	public static function v_1_4_0() {
		return apply_filters(
			'generateblocks_defaults',
			array(
				'gridContainer' => array(
					'horizontalGap' => 30,
				),
			)
		);
	}
}
