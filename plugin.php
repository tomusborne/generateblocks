<?php
/**
 * Plugin Name: GenerateBlocks
 * Plugin URI: https://generateblocks.com
 * Description: A small collection of lightweight WordPress blocks that can accomplish nearly anything.
 * Author: Tom Usborne
 * Author URI: https://tomusborne.com
 * Version: 1.8.2
 * Requires at least: 5.9
 * Requires PHP: 7.2
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: generateblocks
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'GENERATEBLOCKS_VERSION', '1.8.2' );
define( 'GENERATEBLOCKS_DIR', plugin_dir_path( __FILE__ ) );
define( 'GENERATEBLOCKS_DIR_URL', plugin_dir_url( __FILE__ ) );

// Load necessary files.
require_once GENERATEBLOCKS_DIR . 'includes/functions.php';
require_once GENERATEBLOCKS_DIR . 'includes/general.php';
require_once GENERATEBLOCKS_DIR . 'includes/defaults.php';
require_once GENERATEBLOCKS_DIR . 'includes/class-do-css.php';
require_once GENERATEBLOCKS_DIR . 'includes/class-enqueue-css.php';
require_once GENERATEBLOCKS_DIR . 'includes/dashboard.php';
require_once GENERATEBLOCKS_DIR . 'includes/class-settings.php';
require_once GENERATEBLOCKS_DIR . 'includes/class-plugin-update.php';
require_once GENERATEBLOCKS_DIR . 'includes/class-query-loop.php';
require_once GENERATEBLOCKS_DIR . 'includes/class-dynamic-content.php';
require_once GENERATEBLOCKS_DIR . 'includes/class-render-blocks.php';
require_once GENERATEBLOCKS_DIR . 'includes/class-rest.php';
require_once GENERATEBLOCKS_DIR . 'includes/class-legacy-attributes.php';
require_once GENERATEBLOCKS_DIR . 'includes/class-map-deprecated-attributes.php';

// Blocks.
require_once GENERATEBLOCKS_DIR . 'includes/blocks/class-button.php';
require_once GENERATEBLOCKS_DIR . 'includes/blocks/class-container.php';
require_once GENERATEBLOCKS_DIR . 'includes/blocks/class-button-container.php';
require_once GENERATEBLOCKS_DIR . 'includes/blocks/class-grid.php';
require_once GENERATEBLOCKS_DIR . 'includes/blocks/class-headline.php';
require_once GENERATEBLOCKS_DIR . 'includes/blocks/class-image.php';
require_once GENERATEBLOCKS_DIR . 'includes/blocks/class-query-loop.php';

add_action( 'plugins_loaded', 'generateblocks_load_plugin_textdomain' );
/**
 * Load GenerateBlocks textdomain.
 *
 * @since 1.0
 */
function generateblocks_load_plugin_textdomain() {
	load_plugin_textdomain( 'generateblocks' );
}

/**
 * Adds a redirect option during plugin activation on non-multisite installs.
 *
 * @since 0.1
 *
 * @param bool $network_wide Whether or not the plugin is being network activated.
 */
function generateblocks_do_activate( $network_wide = false ) {
	// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Only used to do a redirect. False positive.
	if ( ! $network_wide && ! isset( $_GET['activate-multi'] ) ) {
		update_option( 'generateblocks_do_activation_redirect', true );
	}
}
register_activation_hook( __FILE__, 'generateblocks_do_activate' );
