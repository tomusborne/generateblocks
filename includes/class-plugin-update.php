<?php
/**
 * Handles option changes on plugin updates.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Process option updates if necessary.
 */
class GenerateBlocks_Plugin_Update extends GenerateBlocks_Singleton {
	/**
	 * Constructor
	 */
	public function init() {
		add_action( 'admin_init', [ $this, 'updates' ], 5 );
	}

	/**
	 * Implement plugin update logic.
	 *
	 * @since 1.1.0
	 */
	public function updates() {
		if ( is_customize_preview() ) {
			return;
		}

		$saved_version = get_option( 'generateblocks_version', false );

		if ( false === $saved_version ) {
			update_option( 'generateblocks_version', sanitize_text_field( GENERATEBLOCKS_VERSION ) );

			// Not an existing install, so no need to proceed further.
			return;
		}

		if ( version_compare( $saved_version, GENERATEBLOCKS_VERSION, '=' ) ) {
			return;
		}

		if ( version_compare( $saved_version, '2.0.0-alpha.1', '<' ) ) {
			self::v_2_0_0();
		}

		// Force regenerate our static CSS files.
		update_option( 'generateblocks_dynamic_css_posts', array() );

		// Last thing to do is update our version.
		update_option( 'generateblocks_version', sanitize_text_field( GENERATEBLOCKS_VERSION ) );
	}

	/**
	 * Update options for version 2.0.0.
	 */
	public static function v_2_0_0() {
		$settings = get_option( 'generateblocks', [] );

		// `disable_google_fonts` use to be false by default.
		// If the user has come from 1.x and they haven't set this option,
		// set it back to false.
		if ( empty( $settings['disable_google_fonts'] ) ) {
			$settings['disable_google_fonts'] = false;
		}

		update_option( 'generateblocks', $settings );

		// Turn on v1 blocks by default for users coming from 1.x.
		update_option( 'gb_use_v1_blocks', true, false );
	}
}

GenerateBlocks_Plugin_Update::get_instance()->init();
