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
