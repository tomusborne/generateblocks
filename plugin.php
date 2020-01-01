<?php
/**
 * Plugin Name: FlexBlocks
 * Plugin URI: https://flexblocks.com
 * Description: A small but powerful collection of flexible blocks to help you design your content.
 * Author: tomusborne
 * Author URI: https://tomusborne.com
 * Version: 0.1
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package FlexBlocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'FLEXBLOCKS_MODULE_DIR', plugin_dir_path( __FILE__ ) );
define( 'FLEXBLOCKS_MODULE_DIR_URL', plugin_dir_url( __FILE__ ) );

// Load necessary files.
require_once plugin_dir_path( __FILE__ ) . 'includes/functions.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/general.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/defaults.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/css-output.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/class-do-css.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/dashboard.php';
/**
 * Adds a redirect option during plugin activation on non-multisite installs.
 *
 * @since 0.1
 *
 * @param bool $network_wide Whether or not the plugin is being network activated.
 */
function flexblocks_do_activate( $network_wide = false ) {
	// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Only used to do a redirect. False positive.
	if ( ! $network_wide && ! isset( $_GET['activate-multi'] ) ) {
		update_option( 'flexblocks_do_activation_redirect', true );
	}
}
register_activation_hook( __FILE__, 'flexblocks_do_activate' );