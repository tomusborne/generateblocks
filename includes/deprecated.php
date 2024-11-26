<?php
/**
 * Deprecated functions.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Redirect to the Dashboard page on single plugin activation.
 *
 * @since 0.1
 * @deprecated 2.0.0
 */
function generateblocks_dashboard_redirect() {
	$do_redirect = apply_filters( 'generateblocks_do_activation_redirect', get_option( 'generateblocks_do_activation_redirect', false ) );

	if ( $do_redirect ) {
		delete_option( 'generateblocks_do_activation_redirect' );
		wp_safe_redirect( esc_url( admin_url( 'admin.php?page=generateblocks' ) ) );
		exit;
	}
}

/**
 * Adds a redirect option during plugin activation on non-multisite installs.
 *
 * @since 0.1
 * @deprecated 2.0.0
 *
 * @param bool $network_wide Whether or not the plugin is being network activated.
 */
function generateblocks_do_activate( $network_wide = false ) {
	// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Only used to do a redirect. False positive.
	if ( ! $network_wide && ! isset( $_GET['activate-multi'] ) ) {
		update_option( 'generateblocks_do_activation_redirect', true );
	}
}
